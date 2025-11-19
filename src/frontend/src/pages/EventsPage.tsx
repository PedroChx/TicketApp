// src/pages/EventsPage.tsx
import { useEffect, useState } from "react";
import type { ApiEvent } from "../api/client";
import { listEvents } from "../api/client";
import EventCard from "../components/EventCard";

const EventsPage: React.FC = () => {
    const [events, setEvents] = useState<ApiEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                const data = await listEvents();
                setEvents(data);
            } catch (err) {
                console.error(err);
                setError("No se pudieron cargar los eventos");
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    if (loading) return <p>Cargando eventos...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!events.length) return <p>No hay eventos disponibles.</p>;

    return (
        <main className="min-h-screen p-4">
            <h1 className="text-2xl font-bold mb-4">Eventos disponibles</h1>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {events.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
        </main>
    );
};

export default EventsPage;
