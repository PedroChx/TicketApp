// frontend/src/pages/LoginPage.tsx
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setSubmitting(true);

        try {
            await login(email, password);
            navigate("/events");
        } catch (err) {
            console.error(err);
            setError("No se pudo iniciar sesión. Revisa tus datos.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl font-bold mb-4">
                Inicia sesión en ScannMyTicket
            </h1>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <label className="flex flex-col gap-1 text-sm">
                    Correo electrónico
                    <input
                        type="email"
                        className="border rounded px-2 py-1"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>

                <label className="flex flex-col gap-1 text-sm">
                    Contraseña
                    <input
                        type="password"
                        className="border rounded px-2 py-1"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>

                {error && (
                    <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-2 py-1">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    className="mt-2 px-3 py-2 rounded bg-indigo-600 text-white text-sm font-semibold disabled:bg-slate-400"
                    disabled={submitting}
                >
                    {submitting ? "Entrando..." : "Entrar"}
                </button>
            </form>
        </div>
    );
}
