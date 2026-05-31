import { useState } from "react";
import type { User, NewUser } from "../../domain/user/user.types";
import { useAuthStore } from "../../infrastructure/login/AuthToggleState"; // Asegúrate de que use el nombre correcto de tu store unificado
import { insertNewUser, getUser } from "../../infrastructure/login/userFirebase.db"
import generateId from "../../shared/generateId.util";

export default function useLoginActions() {
    const [user, setUser] = useState<User | null>(null);
    const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn)
    const setIsRole = useAuthStore((state) => state.setIsRoleUser)

    const globalUser = useAuthStore((state) => state.user);
    const setGlobalUser = useAuthStore((state) => state.setUser);
    const logoutGlobal = useAuthStore((state) => state.logout);
    const onLogin = async (email: string, password: string): Promise<boolean> => {
        const user = await getUser(email, password);
        if (user == null) {
            return false;
        }

        localStorage.setItem('auth_id', user.id);
        setIsLoggedIn(true)
        setIsRole(user.role)
        setUser(user);
        setGlobalUser(user);
        return true;
    };

    const onLogout = () => {
        logoutGlobal()
        localStorage.removeItem('auth_id');
    };

    const onAccountCreate = async (
        email: string, password: string, userName: string, age: number
    ): Promise<boolean> => {
        try {
            const newUser: NewUser = {
                id: generateId(),
                email: email,
                password: password,
                userName: userName,
                age: age,
                role: "usuario",
            };

            await insertNewUser(newUser);

            setUser(newUser);
            setGlobalUser(newUser);
            localStorage.setItem('auth_id', email);
            setIsLoggedIn(true);
            setIsRole("usuario");
            return true;
        } catch (error) {
            console.error("Error al crear la cuenta:", error);
            return false;
        }
    }

    return {
        user: user || globalUser,
        onLogin,
        onLogout,
        onAccountCreate,
        isLoggedIn: user !== null || globalUser !== null,
        isRoleUser: user !== null || globalUser !== null,
    };
}