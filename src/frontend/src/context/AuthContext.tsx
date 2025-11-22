import React, { createContext, useContext, useState, useEffect } from "react";

type AuthContextType = {
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem("scann-token");
        if (stored) setToken(stored);
    }, []);

    const login = (newToken: string) => {
        setToken(newToken);
        localStorage.setItem("scann-token", newToken);
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem("scann-token");
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return ctx;
}
