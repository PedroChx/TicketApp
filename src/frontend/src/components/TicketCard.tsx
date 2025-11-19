// src/components/TicketCard.tsx
import type { ApiTicket } from "../api/client";

type Props = {
    ticket: ApiTicket;
};

const fallbackImage = "https://picsum.photos/400/240?blur=2";

const safeImg = (src?: string | null) => {
    if (!src) return fallbackImage;
    if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("/")) {
        return src;
    }
    return fallbackImage;
};

const fmt = (v?: string | null) =>
    v ? new Date(v).toLocaleString() : "—";

const TicketCard: React.FC<Props> = ({ ticket }) => {
    return (
        <div className="border rounded shadow p-3 flex flex-col bg-white">
            <h2 className="font-bold text-lg mb-2">{ticket.title}</h2>
            <img
                src={safeImg(ticket.image_url)}
                alt={ticket.title}
                className="w-full h-40 object-cover rounded mb-2"
            />
            <p className="text-sm text-gray-600 mb-1">
                Inicio: <span className="font-semibold">{fmt(ticket.start)}</span>
            </p>
            <p className="text-sm text-gray-600 mb-2">
                Fin: <span className="font-semibold">{fmt(ticket.end)}</span>
            </p>
            <p className="text-xs font-mono text-gray-500">
                Estado: <span className="font-semibold">{ticket.status ?? "desconocido"}</span>
            </p>
        </div>
    );
};

export default TicketCard;
