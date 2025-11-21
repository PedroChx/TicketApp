// src/components/TicketCard.tsx

export interface UiTicket {
  id: string;
  eventTitle: string;
  status: "active" | "used" | "expired";
  usedAt?: string;
}

interface Props {
  ticket: UiTicket;
}

export default function TicketCard({ ticket }: Props) {
  const statusLabel: Record<UiTicket["status"], string> = {
    active: "Activo",
    used: "Usado",
    expired: "Expirado",
  };

  return (
    <article className="card ticket-card">
      <div className="ticket-header">
        <h3 className="card-title">{ticket.eventTitle}</h3>
        <span className={`ticket-pill ticket-pill-${ticket.status}`}>
          {statusLabel[ticket.status]}
        </span>
      </div>

      {ticket.usedAt && (
        <p className="ticket-subinfo">Usado el {ticket.usedAt}</p>
      )}

      <p className="ticket-hint">
        Escanea tu QR en el acceso del evento para validar este ticket.
      </p>
    </article>
  );
}
