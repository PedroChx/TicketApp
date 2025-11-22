// src/frontend/src/pages/MyTicketsPage.tsx
import React, { useEffect, useState } from "react";
import { listMyTickets } from "../api/client";
import type { ApiTicket } from "../api/client";

const MyTicketsPage: React.FC = () => {
    const [tickets, setTickets] = useState<ApiTicket[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                setLoading(true);
                const data = await listMyTickets();
                setTickets(data);
            } catch (err) {
                console.error(err);
                setError("No se pudieron cargar tus tickets.");
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
    }, []);

    return (
        <div className="min-h-screen bg-slate-100">
            <main className="mx-auto max-w-4xl px-4 py-10">
                <h1 className="mb-6 text-2xl font-bold text-slate-900">
                    Mis tickets
                </h1>

                {loading && <p className="text-slate-600">Cargando…</p>}
                {error && <p className="text-sm text-red-600">{error}</p>}

                {!loading && !error && tickets.length === 0 && (
                    <p className="text-slate-600">
                        Todavía no tienes tickets.
                    </p>
                )}

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                    {tickets.map((t) => (
                        <article
                            key={t.ticketId}
                            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                        >
                            <p className="text-xs font-mono text-slate-400">
                                Ticket:{" "}
                                <span className="font-semibold text-slate-700">
                                    {t.ticketId}
                                </span>
                            </p>
                            <p className="mt-2 text-sm text-slate-700">
                                Evento:{" "}
                                <span className="font-semibold">
                                    {t.eventTitle}
                                </span>
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                                Estado:{" "}
                                <span className="font-semibold">
                                    {t.used ? "Usado" : "No usado"}
                                </span>
                            </p>
                            {t.createdAt && (
                                <p className="mt-1 text-xs text-slate-400">
                                    Creado: {new Date(t.createdAt).toLocaleString()}
                                </p>
                            )}
                        </article>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default MyTicketsPage;
