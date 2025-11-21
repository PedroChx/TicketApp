// src/context/AuthContext.tsx
import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    type ReactNode,
} from "react";
import type { ApiUser } from "../api/client";

interface AuthState {
    user: ApiUser | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (user: ApiUser, token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<ApiUser | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const savedToken = localStorage.getItem("ticketapp_token");
        const savedUser = localStorage.getItem("ticketapp_user");
        if (savedToken && savedUser) {
            setToken(savedToken);
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const login = (u: ApiUser, t: string) => {
        setUser(u);
        setToken(t);
        localStorage.setItem("ticketapp_token", t);
        localStorage.setItem("ticketapp_user", JSON.stringify(u));
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("ticketapp_token");
        localStorage.removeItem("ticketapp_user");
    };

    return (
        <AuthContext.Provider
            value={{ user, token, isAuthenticated: !!token, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
    return ctx;
}
