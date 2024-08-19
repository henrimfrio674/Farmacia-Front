import { ReactNode, createContext, useState } from "react";
import UserLogin from "../models/UserLogin";
import { login } from "../services/Services";

interface AuthContextProps {
    user: UserLogin;
    handleLogout(): void;
    handleLogin(user: UserLogin): Promise<void>;
    isLoading: boolean;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserLogin>({
        id: 0,
        name: "",
        user: "",
        password: "",
        photo: "",
        token: ""
    });

    const [isLoading, setIsLoading] = useState(false);

    async function handleLogin(userLogin: UserLogin) {
        setIsLoading(true);
        try {
            await login(`/users/login`, userLogin, setUser);
            toastAlert('Você está logado', 'info');
        } catch (error) {
            console.log(error);
            toastAlert('Erro ao tentar logar', 'error');
        } finally {
            setIsLoading(false);
        }
    }

    function handleLogout() {
        setUser({
            id: 0,
            name: "",
            user: "",
            password: "",
            photo: "",
            token: ""
        });
    }

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

// Substitua esta função por sua implementação real de toastAlert ou importe-a corretamente
function toastAlert(message: string, type: string) {
    console.log(`Toast Message: ${message}, Type: ${type}`);
}
