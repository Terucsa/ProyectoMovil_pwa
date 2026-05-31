import { Play } from 'lucide-react'
import type {MeditationType} from "../../../domain/meditation/meditation.type";

type Props = {
    meditation: MeditationType;
    onListMedition: (id: string) => void;
}

export default function CardItemMeditation({ meditation, onListMedition }: Props) {

    return (
        <>
            <div
                key={meditation.id}
                className="card rounded-none border border-current border-opacity-5 bg-transparent w-full transition-all hover:border-opacity-20"
            >
                <div className="card-body p-6 flex flex-row items-center justify-between gap-4">
                    <div className="flex flex-col gap-1">
                        <h4 className="text-sm uppercase tracking-wider font-medium opacity-90">
                            {meditation.title}
                        </h4>
                        <p className="text-[10px] uppercase tracking-widest opacity-50 font-sans">
                            {meditation.meditationSesion.length} Sesiones • {meditation.type}
                        </p>
                    </div>
                    <label
                        htmlFor="playlist-modal"
                        className="btn btn-circle btn-outline border-opacity-20 rounded-none w-10 h-10 min-h-10 cursor-pointer "
                        onClick={() => {onListMedition(meditation.id)}}
                    >
                        <Play className="w-4 h-4" />
                    </label>
                </div>
            </div>
        </>
    )
}