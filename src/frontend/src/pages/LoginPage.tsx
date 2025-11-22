import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/client";
import { useAuth } from "../context/AuthContext";

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuth();

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const { token } = await loginUser(email, password);
            login(token);
            navigate("/events");
        } catch (err) {
            console.error(err);
            setError("No se pudo iniciar sesión");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <h1 className="text-2xl font-semibold mb-6 text-slate-900">
                    Iniciar sesión
                </h1>

                {error && (
                    <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Correo electrónico
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full inline-flex justify-center items-center rounded-lg bg-sky-600 text-white text-sm font-medium px-4 py-2.5 hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                        {loading ? "Entrando..." : "Iniciar sesión"}
                    </button>
                </form>

                <p className="mt-4 text-xs text-slate-600">
                    ¿No tienes cuenta?{" "}
                    <Link to="/register" className="text-sky-600 hover:underline">
                        Crear cuenta
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
