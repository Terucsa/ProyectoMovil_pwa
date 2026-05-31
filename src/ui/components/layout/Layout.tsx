import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom'
import { Sun, Moon, Sparkles, LogIn, User, UserRoundX, NotebookText } from 'lucide-react'
import {useAuthStore} from "../../../infrastructure/login/AuthToggleState";
import useLoginActions from "../../../aplication/login/useLoginActions";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const isRoleUser = useAuthStore((state) => state.isRoleUser);
    const { onLogout } = useLoginActions();
    const themeClasses = isDarkMode
        ? "bg-[#1E232A] text-[#E2E8F0] selection:bg-[#7FA99B]/30"
        : "bg-[#F7F5F0] text-[#3A3835] selection:bg-[#8C867A]/20";

    const headerBorder = isDarkMode ? "border-[#E2E8F0]/5" : "border-[#3A3835]/5";
    const accentText = isDarkMode ? "text-[#7FA99B]" : "text-[#8C867A]";

    return (
        <div className={`min-h-screen flex flex-col transition-colors duration-700 ${themeClasses} ${accentText} pb-16 lg:pb-0`}>
            <header className={`w-full border-b ${headerBorder} z-40 sticky top-0 backdrop-blur-md  `}>
                <div className="max-w-5xl mx-auto navbar px-6 justify-between min-h-16">
                    <div className="flex-1">
                        <span className="text-x uppercase font-medium tracking-widest opacity-80">
                            <Link to={`/`}>
                                Nada
                            </Link>
                        </span>
                    </div>

                    <nav className="flex-none ">
                        <ul className="menu menu-horizontal p-0 gap-8 text-x uppercase tracking-wider font-light opacity-80 items-center">
                            <li className="hidden md:flex">
                                <Link
                                    to={'/'}
                                    className={`flex items-center gap-2 bg-transparent hover:bg-current/5 p-2 rounded-none cursor-pointer ${accentText}`}
                                >
                                    <Sparkles className="w-4 h-4" />
                                    <span>Meditaciones</span>
                                </Link>
                            </li>
                            <li className="hidden md:flex">
                                <>
                                {isLoggedIn ? (
                                        <Link to={`/user`}
                                              className={`flex items-center gap-2 bg-transparent hover:bg-current/5 p-2 rounded-none cursor-pointer ${accentText}`}
                                        >
                                            <User className="w-4 h-4" />
                                            Perfil
                                        </Link>
                                        ):(
                                            <Link to={`/login`}
                                                  className={`flex items-center gap-2 bg-transparent hover:bg-current/5 p-2 rounded-none cursor-pointer ${accentText}`}
                                            >
                                                <LogIn className="w-4 h-4" />
                                                Iniciar sesión
                                            </Link>
                                        )}
                                </>
                            </li>
                            <>
                            {isRoleUser === 'admin'  && (
                            <li className="hidden md:flex">

                                        <Link to={`/admin`}
                                              className={`flex items-center gap-2 bg-transparent hover:bg-current/5 p-2 rounded-none cursor-pointer ${accentText}`}
                                        >
                                            <NotebookText className="w-4 h-4" />
                                            Administrador
                                        </Link>
                            </li>
                            )}</>
                            <>
                                {
                                    isLoggedIn && (
                                    <li onClick={onLogout} className="hidden md:flex">
                                        <Link to={`/`}
                                              className={`flex items-center gap-2 bg-transparent hover:bg-current/5 p-2 rounded-none cursor-pointer ${accentText}`}
                                        >
                                            <UserRoundX className="w-4 h-4" />
                                            Cerra Sesión
                                        </Link>
                                        </li>
                                    )
                                }
                            </>
                            <li className="block">
                                <button
                                    onClick={() => setIsDarkMode(!isDarkMode)}
                                    className={`flex items-center gap-2 bg-transparent hover:bg-current/5 p-2 rounded-none cursor-pointer ${accentText}`}
                                >
                                    {isDarkMode ? (
                                        <>
                                            <Sun className="w-4 h-4" />
                                            <span>Día</span>
                                        </>
                                    ) : (
                                        <>
                                            <Moon className="w-4 h-4" />
                                            <span>Noche</span>
                                        </>
                                    )}
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <main className="flex-1 max-w-2xl w-full mx-auto px-6 py-3 lg:py-12 flex flex-col items-center justify-center lg:justify-start lg:py-12">
                {children}
            </main>
            <nav className={`dock fixed bottom-0 left-0 right-0 border-t ${themeClasses} ${headerBorder} backdrop-blur-md z-50 h-16 px-6 md:hidden`}>
                <button className="dock-item bg-transparent">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `flex flex-col items-center justify-between transition-opacity duration-300 ${
                                isActive ? `${accentText} opacity-100 font-medium` : 'text-current opacity-40'
                            }`
                        }
                    >
                        <Sparkles className="w-4 h-4" />
                        <span className="text-[9px] uppercase tracking-widest mt-1 font-sans">Meditaciones</span>
                    </NavLink>
                </button>
                <button className="dock-item bg-transparent">
                    <>
                        {isLoggedIn ? (
                            <NavLink to="/user"
                                 className={({ isActive }) =>
                                     `flex flex-col items-center justify-between transition-opacity duration-300 ${
                                         isActive ? `${accentText} opacity-100 font-medium` : 'text-current opacity-40'
                                     }`
                                 }
                            >
                                <User className="w-4 h-4" />
                                <span className="text-[9px] uppercase tracking-widest mt-1 font-sans">Perfil</span>
                            </NavLink>
                        ):(
                            <NavLink to="login"
                                 className={({ isActive }) =>
                                     `flex flex-col items-center justify-between transition-opacity duration-300 ${
                                         isActive ? `${accentText} opacity-100 font-medium` : 'text-current opacity-40'
                                     }`
                                 }
                            >
                                <LogIn className="w-3 h-4" />
                                <span className="text-[9px] uppercase tracking-widest mt-1 font-sans">Iniciar Sesión</span>
                            </NavLink>
                        )}
                    </>
                </button>
                <>
                    {
                        isRoleUser === "admin" && isLoggedIn &&(
                            <button className="dock-item bg-transparent"
                            >
                                <NavLink to="admin"
                                         className={({ isActive }) =>
                                             `flex flex-col items-center justify-between transition-opacity duration-300 ${
                                                 isActive ? `${accentText} opacity-100 font-medium` : 'text-current opacity-40'
                                             }`
                                         }
                                >
                                    <NotebookText className="w-4 h-4" />
                                    <span className="text-[9px] uppercase tracking-widest mt-1 font-sans">Admin</span>
                                </NavLink>
                            </button>
                        )
                    }
                    {
                        isLoggedIn && (
                            <button className="dock-item bg-transparent transition-opacity duration-300"
                                    onClick={onLogout}
                            >
                                <NavLink to="/"
                                 className={
                                     `flex flex-col items-center justify-between transition-opacity duration-300 text-current opacity-40 `}
                                >
                                    <UserRoundX className="w-4 h-4" />
                                    <span className="text-[9px] uppercase tracking-widest mt-1 font-sans">Cerrar Sesión</span>
                                </NavLink>
                            </button>
                        )
                    }
                </>
            </nav>
        </div>
    );
}