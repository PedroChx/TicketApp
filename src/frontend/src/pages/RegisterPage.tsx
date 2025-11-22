// src/frontend/src/pages/RegisterPage.tsx
import React, { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/client";
import { useAuth } from "../context/AuthContext";

const RegisterPage: React.FC = () => {
    const [name, setName] = useState("");
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
            const result = await registerUser({ name, email, password });

            if (result.token && typeof result.token === "string") {
                // Registro ok → guardamos token y mandamos a /events
                login(result.token);
                navigate("/events");
            } else {
                const message =
                    result.message ??
                    "Ocurrió un error al registrar. Inténtalo de nuevo.";
                setError(message);
            }
        } catch (err) {
            console.error(err);
            setError("Ocurrió un error al registrar. Inténtalo de nuevo.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <h1 className="text-2xl font-semibold mb-6 text-slate-900">
                    Crear cuenta
                </h1>

                {error && (
                    <div className="mb-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Nombre
                        </label>
                        <input
                            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Correo electrónico
                        </label>
                        <input
                            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Contraseña
                        </label>
                        <input
                            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-4 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? "Creando cuenta..." : "Registrarme"}
                    </button>
                </form>

                <p className="mt-4 text-sm text-slate-600">
                    ¿Ya tienes cuenta?{" "}
                    <Link
                        to="/login"
                        className="font-medium text-indigo-600 hover:underline"
                    >
                        Inicia sesión
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
