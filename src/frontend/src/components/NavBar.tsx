// src/components/NavBar.tsx
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function NavBar() {
    const { isAuthenticated, user, logout } = useAuth();

    return (
        <header className="nav">
            <div className="nav-inner">
                <Link to="/" className="nav-brand">
                    <span className="nav-logo-circle">🎫</span>
                    <span className="nav-title">
                        Ticket<span>App</span>
                    </span>
                </Link>

                <nav className="nav-links">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? "nav-link nav-link-active" : "nav-link"
                        }
                    >
                        Eventos
                    </NavLink>

                    {isAuthenticated && (
                        <NavLink
                            to="/my-tickets"
                            className={({ isActive }) =>
                                isActive ? "nav-link nav-link-active" : "nav-link"
                            }
                        >
                            Mis tickets
                        </NavLink>
                    )}
                </nav>

                <div className="nav-right">
                    {isAuthenticated && user ? (
                        <>
                            <div className="nav-user">
                                <span className="nav-avatar">
                                    {user.name?.[0]?.toUpperCase() ??
                                        user.email[0]?.toUpperCase()}
                                </span>
                                <span className="nav-user-info">
                                    <span className="nav-user-name">{user.name ?? "Usuario"}</span>
                                    <span className="nav-user-email">{user.email}</span>
                                </span>
                            </div>
                            <button className="btn-secondary" onClick={logout}>
                                Cerrar sesión
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="btn-primary">
                            Iniciar sesión
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
