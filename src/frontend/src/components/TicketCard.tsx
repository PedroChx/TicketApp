import "./TicketCard.css";
import type { ApiTicket } from "../api/client";
import { QRCodeCanvas } from "qrcode.react";

interface Props {
  ticket: ApiTicket;
}

function TicketCard({ ticket }: Props) {
  const label = `TICKET-${ticket.ticketId}`;

  return (
    <article className="ticket-card">
      <div className="ticket-card-left">
        <h3>{ticket.eventTitle}</h3>
        <p className="ticket-id">{label}</p>
        <p className="ticket-status">
          Estado: {ticket.used ? "Usado" : "Disponible"}
        </p>
        {ticket.createdAt && (
          <p className="ticket-date">
            Generado: {new Date(ticket.createdAt).toLocaleString()}
          </p>
        )}
      </div>
      <div className="ticket-card-right">
        <QRCodeCanvas value={label} size={96} includeMargin />
      </div>
    </article>
  );
}

export default TicketCard;
