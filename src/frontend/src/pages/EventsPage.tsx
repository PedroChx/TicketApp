// src/pages/EventsPage.tsx
import { useEffect, useState } from "react";
import { listEvents, type ApiEvent } from "../api/client";
import EventCard from "../components/EventCard";

export default function EventsPage() {
  const [events, setEvents] = useState<ApiEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await listEvents();
        setEvents(data);
      } catch (err) {
        console.error("Error al cargar eventos", err);
        setError("No se pudieron cargar los eventos. Mostrando ejemplo.");
        // Fallback visual mientras conectamos todo al 100%
        setEvents([
          {
            id: "demo-1",
            title: "Evento de ejemplo",
            description: "Este es un evento de ejemplo para probar el frontend.",
            location: "Querétaro, Qro.",
            start: new Date().toISOString(),
            end: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
            image_url: "https://picsum.photos/600/320",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  return (
    <section className="page">
      <header className="page-header">
        <h1 className="page-title">Eventos disponibles</h1>
        <p className="page-subtitle">
          Explora los eventos y genera tus tickets digitales.
        </p>
      </header>

      {loading && <p className="page-message">Cargando eventos…</p>}
      {error && <p className="page-message page-message-error">{error}</p>}

      <div className="cards-grid">
        {events.map((ev) => (
          <EventCard key={ev.id} event={ev} />
        ))}

        {!loading && events.length === 0 && (
          <p className="page-message">No hay eventos por ahora.</p>
        )}
      </div>
    </section>
  );
}
