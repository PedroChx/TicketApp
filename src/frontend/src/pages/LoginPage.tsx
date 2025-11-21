// src/pages/LoginPage.tsx
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/client";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { token, user } = await loginUser(email, password);
            login(user, token);
            navigate("/");
        } catch (err) {
            console.error(err);
            setError("Credenciales inválidas o error en el servidor.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="auth-page">
            <div className="auth-card">
                <div className="auth-header">
                    <div className="nav-logo-circle">🎫</div>
                    <h1>Iniciar sesión</h1>
                    <p>Accede para gestionar tus tickets y eventos.</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <label className="form-label">
                        Correo electrónico
                        <input
                            type="email"
                            className="form-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="tucorreo@ejemplo.com"
                        />
                    </label>

                    <label className="form-label">
                        Contraseña
                        <input
                            type="password"
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                        />
                    </label>

                    {error && <p className="form-error">{error}</p>}

                    <button className="btn-primary btn-full" type="submit" disabled={loading}>
                        {loading ? "Entrando…" : "Entrar"}
                    </button>
                </form>
            </div>
        </section>
    );
}
