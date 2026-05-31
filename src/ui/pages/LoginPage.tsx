import {useState} from "react"
import LoginForm from "../components/login/LoginForm"
import AccountCreateLogin from "../components/accountCreate/AccountCreateLogin.tsx"
import useLoginActions from "../../aplication/login/useLoginActions";

export default function LoginPage() {
    const [isCreateAccount, setIsCreateAccount] = useState(false);
    const { onLogin, onAccountCreate } = useLoginActions();

    return (
        <div className="w-full max-w-sm p-8 border border-current border-opacity-5 backdrop-blur-sm">
            <div className="text-center mb-8">
                <h2 className="text-sm uppercase tracking-widest font-medium opacity-90">
                    Conexión
                </h2>
                <p className="text-[10px] uppercase tracking-wider opacity-50 mt-1">
                    Ingresa al espacio de Nada
                </p>
                <a className="text-[10px] uppercase tracking-wider  mt-1 cursor-pointer hover:underline"
                    onClick={() => setIsCreateAccount(!isCreateAccount)}
                >
                    {
                        !isCreateAccount ? (
                            <>Crear Cuenta</>

                        ) : (
                            <>Iniciar Sesión</>
                        )
                    }
                </a>
            </div>
            {
                !isCreateAccount ? (
                    <>
                        <LoginForm onLogin={onLogin} />

                    </>
                ) : (
                    <>
                        <AccountCreateLogin onAccountCreate={onAccountCreate} />
                    </>
                )
            }
        </div>
    );
}