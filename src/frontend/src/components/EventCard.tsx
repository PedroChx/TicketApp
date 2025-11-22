import "./EventCard.css";
import type { ApiEvent } from "../api/client";
import { Link } from "react-router-dom";

interface Props {
  event: ApiEvent;
  onSubscribe?: (eventId: string) => void;
}

function EventCard({ event, onSubscribe }: Props) {
  const handleSubscribe = () => {
    if (onSubscribe) onSubscribe(event.eventId);
  };

  return (
    <article className="event-card">
      <div className="event-card-image-wrapper">
        {event.image_url ? (
          <img
            src={event.image_url}
            alt={event.title}
            className="event-card-image"
          />
        ) : (
          <div className="event-card-image placeholder">
            {event.title.substring(0, 2).toUpperCase()}
          </div>
        )}
      </div>

      <div className="event-card-body">
        <h3>{event.title}</h3>
        {event.location && (
          <p className="event-card-location">{event.location}</p>
        )}
        <div className="event-card-dates">
          {event.start && (
            <span>Inicio: {new Date(event.start).toLocaleString()}</span>
          )}
          {event.end && (
            <span> · Fin: {new Date(event.end).toLocaleString()}</span>
          )}
        </div>

        {event.description && (
          <p className="event-card-description">{event.description}</p>
        )}

        <div className="event-card-actions">
          <Link to={`/events/${event.eventId}`} className="btn-secondary">
            Detalles
          </Link>
          <button className="btn-primary" onClick={handleSubscribe}>
            Obtener ticket
          </button>
        </div>
      </div>
    </article>
  );
}

export default EventCard;
