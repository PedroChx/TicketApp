import { Link, NavLink, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { useAuth } from "../context/AuthContext";

function NavBar() {
    const { email, logout, token } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const isLoggedIn = Boolean(token);

    return (
        <header className="nav">
            <Link to="/" className="nav-logo">
                ScannMyTicket
            </Link>

            <nav className="nav-links">
                <NavLink to="/events" className="nav-link">
                    Eventos
                </NavLink>
                <NavLink to="/tickets" className="nav-link">
                    Mis tickets
                </NavLink>
                <NavLink to="/events/new" className="nav-link">
                    Crear evento
                </NavLink>
            </nav>

            <div className="nav-right">
                {isLoggedIn ? (
                    <>
                        <span className="nav-user">{email}</span>
                        <button className="nav-button" onClick={handleLogout}>
                            Cerrar sesión
                        </button>
                    </>
                ) : (
                    <Link to="/login" className="nav-button">
                        Iniciar sesión
                    </Link>
                )}
            </div>
        </header>
    );
}

export default NavBar;
