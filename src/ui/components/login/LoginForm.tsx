import { Mail, Lock } from 'lucide-react';
import { useNavigate } from "react-router-dom"
import {useState} from "react";

type Props = {
    onLogin : (email: string, password: string) => Promise<boolean>;
}

export default function LoginForm({onLogin}: Props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const onLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const exit = await onLogin(email, password);
        if ( !exit ) {
           alert("Ingrese bien usuario y contraseña");
           return
        }
        navigate('/');
        setEmail('');
        setPassword('');
    }

    return (
        <>
            <form className="w-full flex flex-col gap-6" onSubmit={onLoginSubmit}>
                <div className="form-control w-full">
                    <label className="label pt-0">
                    <span className="label-text text-x uppercase tracking-widest opacity-75 font-medium flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5" /> Email
                    </span>
                    </label>
                    <input
                        type="email"
                        placeholder="tu@email.com"
                        className="input input-bordered rounded-none w-full bg-transparent text-xs focus:outline-none focus:border-current border-opacity-20"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>
                <div className="form-control w-full">
                    <label className="label pt-0">
                    <span className="label-text text-x uppercase tracking-widest opacity-75 font-medium flex items-center gap-2">
                        <Lock className="w-3.5 h-3.5" /> Contraseña
                    </span>
                    </label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        className="input input-bordered rounded-none w-full bg-transparent text-xs focus:outline-none focus:border-current border-opacity-20"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-outline rounded-none w-full text-x uppercase tracking-widest mt-2 hover:bg-[#474646] hover:text-white"
                >
                    Entrar
                </button>

            </form>
        </>
    );
}