import { FileText, Clock, Link, FolderHeart } from "lucide-react"
import useMeditationActions from "../../aplication/meditation/useMeditationActions"
import { useState } from "react"

export default function AdminPage() {
    const { meditations, addMeditation } = useMeditationActions();
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [time, setTime] = useState("");
    const [audioUrl, setAudioUrl] = useState("");

    const onsSubmitAddSesion = async (e: React.FormEvent) => {
        e.preventDefault();

        const meditationSesion = await addMeditation(id, title, time, audioUrl);

        if (!meditationSesion) {
            alert(`No se pudo insertar la sesión con el ${id} `);
            return false;
        } else {
            alert("Se inserto correctamente la session");
        }

        setId("");
        setTitle("");
        setAudioUrl("");
        setTime("");
    }

    return (
        <div className="w-full max-w-md p-8 border border-current border-opacity-5 backdrop-blur-sm bg-transparent flex flex-col">
            <div className="text-center mb-10">
                <h2 className="text-sm uppercase tracking-widest font-medium opacity-90">
                    Panel de Administración
                </h2>
                <p className="text-[10px] uppercase tracking-wider opacity-50 mt-1">
                    Nueva Sesión de Contemplación
                </p>
            </div>

            <form className="w-full flex flex-col gap-6" onSubmit={onsSubmitAddSesion}>
                <div className="form-control w-full">
                    <label className="label pt-0">
                        <span className="label-text text-x uppercase tracking-widest opacity-75 font-medium flex items-center gap-2">
                            <FolderHeart className="w-3.5 h-3.5" /> Seleccionar Paquete
                        </span>
                    </label>
                    <select
                        required
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        className="select select-bordered rounded-none w-full bg-transparent text-xs focus:outline-none focus:border-current border-opacity-20 font-sans uppercase tracking-wider h-11 min-h-11"
                    >
                        <option value="" disabled className="bg-[#121212] text-white opacity-50">
                            -- Selecciona un paquete --
                        </option>
                        {
                            meditations.map((meditation) => (
                                <option
                                    key={meditation.id}
                                    value={meditation.id}
                                    className="bg-[#121212] text-white"
                                >
                                    {meditation.title}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div className="form-control w-full">
                    <label className="label pt-0">
                        <span className="label-text text-x uppercase tracking-widest opacity-75 font-medium flex items-center gap-2">
                            <FileText className="w-3.5 h-3.5" /> Título de la Sesión
                        </span>
                    </label>
                    <input
                        type="text"
                        placeholder="Ej. Respiración Consciente"
                        required
                        className="input input-bordered rounded-none w-full bg-transparent text-xs focus:outline-none focus:border-current border-opacity-20"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-control w-full">
                    <label className="label pt-0">
                        <span className="label-text text-x uppercase tracking-widest opacity-75 font-medium flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5" /> Duración
                        </span>
                    </label>
                    <input
                        type="text"
                        placeholder="Ej. 10:00 o 5 Min"
                        required
                        className="input input-bordered rounded-none w-full bg-transparent text-xs focus:outline-none focus:border-current border-opacity-20"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />
                </div>
                <div className="form-control w-full">
                    <label className="label pt-0">
                        <span className="label-text text-x uppercase tracking-widest opacity-75 font-medium flex items-center gap-2">
                            <Link className="w-3.5 h-3.5" /> URL del Archivo de Audio
                        </span>
                    </label>
                    <input
                        type="text"
                        placeholder="https://firebasestorage.googleapis.com/..."
                        required
                        className="input input-bordered rounded-none w-full bg-transparent text-xs focus:outline-none focus:border-current border-opacity-20 font-sans"
                        onChange={(e) => setAudioUrl(e.target.value)}
                        value={audioUrl}
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-outline rounded-none w-full text-x uppercase tracking-widest mt-2 hover:bg-[#474646] hover:text-white"
                >
                    Registrar Sesión
                </button>
            </form>
        </div>
    );
}