import { User, Mail, Calendar } from 'lucide-react'
import useLoginActions from "../../aplication/login/useLoginActions"

export default function UserPage() {
    const { user } = useLoginActions()

    if (!user) {
        return (
            <div className="w-full max-w-md p-8 border border-current border-opacity-5 flex items-center justify-center min-h-[20vh]">
                <p className="text-xs uppercase tracking-widest opacity-40">Cargando perfil...</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md p-8 border border-current border-opacity-5 backdrop-blur-sm bg-transparent flex flex-col items-center">
            <div className="w-24 h-24 border border-current border-opacity-10 flex items-center justify-center mb-8 rounded-full bg-transparent shadow-sm">
                <User className="w-10 h-10 opacity-40" />
            </div>
            <div className="text-center mb-10">
                <h2 className="text-sm uppercase tracking-widest font-medium opacity-90">
                    Tu Espacio
                </h2>
                <p className="text-[10px] uppercase tracking-wider opacity-50 mt-1">
                    Perfil de Contemplación
                </p>
            </div>
            <div className="w-full flex flex-col gap-5 border-t border-b py-6 border-current border-opacity-5 mb-8">
                <div className="flex items-center justify-between text-xs uppercase tracking-wider font-light">
                    <span className="opacity-40 flex items-center gap-2">
                        <User className="w-3.5 h-3.5" /> Usuario
                    </span>
                    <span className="font-medium opacity-80">{user.userName}</span>
                </div>
                <div className="flex items-center justify-between text-xs uppercase tracking-wider font-light">
                    <span className="opacity-40 flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5" /> Email
                    </span>
                    <span className="font-medium opacity-80 lowercase font-sans text-[11px]">{user.email}</span>
                </div>
                <div className="flex items-center justify-between text-xs uppercase tracking-wider font-light">
                    <span className="opacity-40 flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5" /> Edad
                    </span>
                    <span className="font-medium opacity-80 font-sans text-[11px]">{user.age} años</span>
                </div>
            </div>
        </div>
    );
}