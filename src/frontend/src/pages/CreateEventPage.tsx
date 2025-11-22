// src/frontend/src/pages/CreateEventPage.tsx
import { useState } from "react";
import type { FormEvent } from "react";           // 👈 IMPORT SOLO DE TIPO
import { createEvent } from "../api/client";
import { useNavigate } from "react-router-dom";

const CreateEventPage: React.FC = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const navigate = useNavigate();

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true);

        try {
            await createEvent({
                title,
                description,
                location,
                start,
                end,
            });

            setSuccess("Evento creado correctamente 🎉");
            // opcional: limpiar formulario
            setTitle("");
            setDescription("");
            setLocation("");
            setStart("");
            setEnd("");
            // opcional: navegar a /events
            // navigate("/events");
        } catch (err) {
            console.error(err);
            setError("No se pudo crear el evento");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
            <div className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-8">
                <h1 className="text-2xl font-bold text-slate-900 mb-6">
                    Crear nuevo evento
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Título
                        </label>
                        <input
                            type="text"
                            required
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Nombre del evento"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Descripción
                        </label>
                        <textarea
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe brevemente tu evento"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Lugar
                        </label>
                        <input
                            type="text"
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Ubicación del evento"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Inicio
                            </label>
                            <input
                                type="datetime-local"
                                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                                value={start}
                                onChange={(e) => setStart(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Fin
                            </label>
                            <input
                                type="datetime-local"
                                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                                value={end}
                                onChange={(e) => setEnd(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && (
                        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                            {error}
                        </p>
                    )}

                    {success && (
                        <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
                            {success}
                        </p>
                    )}

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => navigate("/events")}
                            className="px-4 py-2 text-sm rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 text-sm rounded-lg bg-sky-600 text-white font-semibold hover:bg-sky-700 disabled:opacity-60"
                        >
                            {loading ? "Creando..." : "Crear evento"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateEventPage;
