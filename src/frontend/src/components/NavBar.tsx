// src/components/NavBar.tsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function NavBar() {
    const { user, logout } = useAuth();

    return (
        <nav className="flex items-center justify-between px-4 py-3 bg-slate-900 text-white">
            <div className="font-bold text-xl">
                ScannMyTicket
            </div>

            <div className="flex gap-4 items-center">
                <Link to="/" className="hover:underline">
                    Eventos
                </Link>

                {user && (
                    <>
                        <Link to="/tickets" className="hover:underline">
                            Mis tickets
                        </Link>
                        <span className="text-sm opacity-80">{user.email}</span>
                        <button
                            onClick={logout}
                            className="px-3 py-1 rounded bg-red-600 hover:bg-red-500 text-sm"
                        >
                            Cerrar sesión
                        </button>
                    </>
                )}

                {!user && (
                    <Link
                        to="/login"
                        className="px-3 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-sm"
                    >
                        Iniciar sesión
                    </Link>
                )}
            </div>
        </nav>
    );
}

export default NavBar;
