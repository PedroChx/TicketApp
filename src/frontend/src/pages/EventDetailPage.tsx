// src/frontend/src/pages/EventDetailPage.tsx
import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { useParams } from "react-router-dom";
import { getEventById, subscribeToEvent, type ApiEvent, type ApiTicket } from "../api/client";

const EventDetailPage: React.FC = () => {
    const { eventId } = useParams<{ eventId: string }>();

    const [event, setEvent] = useState<ApiEvent | null>(null);
    const [ticket, setTicket] = useState<ApiTicket | null>(null);
    const [loading, setLoading] = useState(true);
    const [subscribing, setSubscribing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Cargar detalles del evento
    useEffect(() => {
        if (!eventId) {
            setError("ID de evento no válido");
            setLoading(false);
            return;
        }

        (async () => {
            try {
                const data = await getEventById(eventId);  // 👈 eventId ya no es undefined
                setEvent(data);
            } catch (err) {
                console.error(err);
                setError("No se pudo cargar la información del evento");
            } finally {
                setLoading(false);
            }
        })();
    }, [eventId]);

    async function handleSubscribe(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setError(null);

        if (!eventId) {
            setError("ID de evento no válido");
            return;
        }

        try {
            setSubscribing(true);
            const newTicket = await subscribeToEvent(eventId); // 👈 igual, ya validado
            setTicket(newTicket);
        } catch (err) {
            console.error(err);
            setError("No se pudo generar el ticket");
        } finally {
            setSubscribing(false);
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-100">
                <p className="text-slate-600">Cargando evento...</p>
            </div>
        );
    }

    if (error || !event) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-100">
                <div className="bg-white rounded-2xl shadow-lg px-6 py-4">
                    <p className="text-red-600 font-medium">
                        {error ?? "No se encontró el evento"}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100 px-4 py-8 flex justify-center">
            <div className="w-full max-w-3xl space-y-6">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h1 className="text-2xl font-bold text-slate-900 mb-2">
                        {event.title}
                    </h1>
                    {event.location && (
                        <p className="text-sm text-slate-500 mb-1">
                            📍 {event.location}
                        </p>
                    )}
                    {(event.start || event.end) && (
                        <p className="text-sm text-slate-500 mb-4">
                            {event.start && (
                                <span>
                                    Inicio:{" "}
                                    <span className="font-mono">
                                        {new Date(event.start).toLocaleString()}
                                    </span>
                                </span>
                            )}
                            {event.start && event.end && " · "}
                            {event.end && (
                                <span>
                                    Fin:{" "}
                                    <span className="font-mono">
                                        {new Date(event.end).toLocaleString()}
                                    </span>
                                </span>
                            )}
                        </p>
                    )}
                    {event.description && (
                        <p className="text-sm text-slate-700 leading-relaxed">
                            {event.description}
                        </p>
                    )}

                    <button
                        onClick={handleSubscribe}
                        disabled={subscribing}
                        className="mt-6 inline-flex items-center justify-center rounded-lg bg-sky-600 text-white px-4 py-2 text-sm font-semibold hover:bg-sky-700 disabled:opacity-60"
                    >
                        {subscribing ? "Generando ticket..." : "Suscribirme al evento"}
                    </button>
                </div>

                {ticket && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
                        <h2 className="text-lg font-semibold text-emerald-900 mb-2">
                            Ticket generado ✅
                        </h2>
                        <p className="text-sm text-emerald-800">
                            <span className="font-semibold">ID:</span>{" "}
                            <span className="font-mono">{ticket.ticketId}</span>
                        </p>
                        <p className="text-sm text-emerald-800">
                            <span className="font-semibold">Evento:</span>{" "}
                            {ticket.eventTitle}
                        </p>
                        {ticket.createdAt && (
                            <p className="text-sm text-emerald-800">
                                <span className="font-semibold">Creado:</span>{" "}
                                {new Date(ticket.createdAt).toLocaleString()}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventDetailPage;
