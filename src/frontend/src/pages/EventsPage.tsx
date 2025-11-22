import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listEvents } from "../api/client";
import type { ApiEvent } from "../api/client";

function EventsPage() {
  const [events, setEvents] = useState<ApiEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await listEvents();
        setEvents(data);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los eventos.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Cargando eventos...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold text-slate-900">Eventos</h1>
          <div className="space-x-3 text-sm">
            <Link
              to="/events/create"
              className="inline-flex items-center rounded-md bg-indigo-600 text-white px-3 py-1.5 font-semibold hover:bg-indigo-500"
            >
              Crear evento
            </Link>
            <Link
              to="/my-tickets"
              className="inline-flex items-center rounded-md border border-slate-300 px-3 py-1.5 font-semibold text-slate-700 hover:bg-slate-100"
            >
              Mis tickets
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {events.length === 0 ? (
          <p className="text-sm text-slate-500">
            Aún no hay eventos creados. Crea uno nuevo.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {events.map((ev) => (
              <Link
                key={ev.eventId}
                to={`/events/${ev.eventId}`}
                className="group block rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:border-indigo-400 hover:shadow-md transition"
              >
                <h2 className="text-lg font-semibold text-slate-900 group-hover:text-indigo-600">
                  {ev.title}
                </h2>
                {ev.location && (
                  <p className="mt-1 text-xs text-slate-500">{ev.location}</p>
                )}
                {ev.start && (
                  <p className="mt-1 text-xs text-slate-400">
                    Inicio: {ev.start}
                  </p>
                )}
                <p className="mt-2 text-sm text-slate-700 line-clamp-2">
                  {ev.description || "Sin descripción."}
                </p>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default EventsPage;
