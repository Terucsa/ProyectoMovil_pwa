import { useParams, Link, useLocation } from 'react-router-dom';
import { useState, useRef } from 'react';
import { Play, Pause, ChevronLeft } from 'lucide-react';

export default function PlayerPage() {
    const { id } = useParams();
    const location = useLocation();

    const { urlAudio, title } = location.state || {};

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);


    if (!urlAudio || !title || !id) {
        return (
            <div className="w-full max-w-sm p-8 flex flex-col items-center justify-center min-h-[50vh] text-center">
                <p className="text-xs uppercase tracking-widest opacity-60 mb-4">
                    La sesión se recargó
                </p>
                <Link to="/" className="btn btn-outline btn-sm rounded-none text-[10px] uppercase tracking-widest">
                    Volver a elegir meditación
                </Link>
            </div>
        );
    }

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            const newTime = parseFloat(e.target.value);
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const formatTime = (timeInSeconds: number) => {
        if (isNaN(timeInSeconds)) return "00:00";
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="w-full max-w-sm p-8 flex flex-col items-center bg-transparent">
            <audio
                ref={audioRef}
                src={urlAudio}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
            />

            <div className="w-full flex justify-start mb-12">
                <Link
                    to="/"
                    className="flex items-center gap-2 text-[10px] uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity"
                >
                    <ChevronLeft className="w-4 h-4" /> Volver
                </Link>
            </div>

            <div className="w-48 h-48 border border-current border-opacity-10 flex items-center justify-center mb-8 rounded-none bg-transparent shadow-sm">
                <div className={`w-40 h-40 border border-current border-opacity-5 flex items-center justify-center ${isPlaying ? 'animate-spin [animation-duration:20s]' : ''}`}>
                    <div className="w-4 h-4 border border-current border-opacity-40 rounded-full"></div>
                </div>
            </div>

            <div className="text-center mb-10">
                <p className="text-[9px] uppercase tracking-widest opacity-40 font-sans mb-1">
                    Sesión activa
                </p>
                <h2 className="text-sm uppercase tracking-widest font-medium opacity-90">
                    {title}
                </h2>
            </div>

            <div className="w-full flex flex-col gap-2 mb-8">
                <input
                    type="range"
                    min="0"
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleSliderChange}
                    className="w-full h-[2px] bg-current bg-opacity-10 appearance-none cursor-pointer accent-current outline-none opacity-70 hover:opacity-100 transition-opacity"
                    style={{
                        background: `linear-gradient(to right, currentColor 0%, currentColor ${(currentTime / (duration || 1)) * 100}%, rgba(255,255,255,0.1) ${(currentTime / (duration || 1)) * 100}%, rgba(255,255,255,0.1) 100%)`
                    }}
                />
                <div className="flex justify-between text-[9px] opacity-40 font-sans">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                </div>
            </div>

            <div className="flex items-center gap-8 text-current">
                <button
                    onClick={togglePlay}
                    className="btn btn-circle btn-outline border-opacity-20 rounded-none w-14 h-14 min-h-14 hover:bg-current hover:text-base-100 transition-colors cursor-pointer"
                >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 translate-x-[1px]" />}
                </button>
            </div>
        </div>
    );
}