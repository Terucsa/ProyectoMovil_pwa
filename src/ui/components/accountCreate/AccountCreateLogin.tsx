import {useState} from "react"
import { Mail, Lock, User, UserPlus } from 'lucide-react';
import { useNavigate } from "react-router-dom"

type Props = {
    onAccountCreate: (
        email: string,
        password: string,
        userName: string,
        age: number,
    ) => Promise<boolean>;
}

export default function AccountCreateLogin({onAccountCreate}: Props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const [username, setUserName] = useState("");
    const navigate = useNavigate()

    const onAccountCreateSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const create = await onAccountCreate(
            email, password, username,  parseInt(age)
        )

        if (create) {
            alert("El usuario fue creado corretamente");
        }
        setEmail("");
        setPassword("");
        setUserName("");
        setAge("");
        navigate('/');
    }

    return (
        <>
            <form className="w-full flex flex-col gap-6" onSubmit={onAccountCreateSubmit}>
                <div className="form-control w-full">
                    <label className="label pt-0">
                    <span className="label-text text-x uppercase tracking-widest opacity-75 font-medium flex items-center gap-2">
                        <User className="w-3.5 h-3.5" /> Nombre de Usuario
                    </span>
                    </label>
                    <input
                        type="text"
                        placeholder="Belter Vásquez"
                        className="input input-bordered rounded-none w-full bg-transparent text-xs focus:outline-none focus:border-current border-opacity-20"
                        onChange={(e) => setUserName(e.target.value)}
                        value={username}
                    />
                </div>
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
                        <UserPlus className="w-3.5 h-3.5" /> Edad
                    </span>
                    </label>
                    <input
                        type="text"
                        placeholder="18"
                        className="input input-bordered rounded-none w-full bg-transparent text-xs focus:outline-none focus:border-current border-opacity-20"
                        onChange={(e) => setAge(e.target.value)}
                        value={age}
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
                    className="btn btn-outline rounded-none w-full text-x uppercase tracking-widest mt-2 hover:bg-[#474646] hover:text-white transition-colors"
                >
                    Entrar
                </button>

            </form>
        </>
    )
}