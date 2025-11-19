// frontend/src/context/AuthContext.tsx
import {
    createContext,
    useContext,
    useState,
    useEffect,
    type ReactNode,
} from "react";
import { loginUser, type ApiUser } from "../api/client";

type AuthContextValue = {
    user: ApiUser | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(
    undefined
);

const STORAGE_KEY = "ticketapp_user";

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<ApiUser | null>(null);
    const [loading, setLoading] = useState(true);

    // Cargar usuario guardado en localStorage
    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                setUser(JSON.parse(raw));
            }
        } catch {
            // ignore
        } finally {
            setLoading(false);
        }
    }, []);

    const login = async (email: string, password: string) => {
        const loggedUser = await loginUser(email, password);
        setUser(loggedUser);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem(STORAGE_KEY);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextValue {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth debe usarse dentro de AuthProvider");
    }
    return ctx;
}
