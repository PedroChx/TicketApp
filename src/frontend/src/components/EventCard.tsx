// src/components/EventCard.tsx
import type { ApiEvent } from "../api/client";

interface Props {
  event: ApiEvent;
  onPrimaryAction?: (event: ApiEvent) => void;
}

export default function EventCard({ event, onPrimaryAction }: Props) {
  const start = event.start
    ? new Date(event.start).toLocaleString()
    : "Fecha por definir";

  const end = event.end ? new Date(event.end).toLocaleString() : "";

  return (
    <article className="card event-card">
      <div className="card-image-wrapper">
        <img
          src={event.image_url || "https://picsum.photos/600/320?blur=2"}
          alt={event.title}
          className="card-image"
        />
        <div className="card-badge">Evento</div>
      </div>

      <div className="card-body">
        <h3 className="card-title">{event.title}</h3>
        {event.description && (
          <p className="card-description">{event.description}</p>
        )}

        <div className="card-meta">
          <div>
            <span className="card-meta-label">Inicio</span>
            <span className="card-meta-value">{start}</span>
          </div>
          {end && (
            <div>
              <span className="card-meta-label">Fin</span>
              <span className="card-meta-value">{end}</span>
            </div>
          )}
          {event.location && (
            <div>
              <span className="card-meta-label">Lugar</span>
              <span className="card-meta-value">{event.location}</span>
            </div>
          )}
        </div>

        <div className="card-actions">
          <button
            className="btn-primary btn-full"
            onClick={() => onPrimaryAction?.(event)}
          >
            Ver detalles / Obtener ticket
          </button>
        </div>
      </div>
    </article>
  );
}
