// frontend/src/pages/MyTicketsPage.tsx
import { useEffect, useState } from "react";
import { listMyTickets, type ApiTicket } from "../api/client";
import { useAuth } from "../context/AuthContext";
import TicketCard from "../components/TicketCard";

export default function MyTicketsPage() {
    const { user } = useAuth();
    const [tickets, setTickets] = useState<ApiTicket[]>([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            if (!user) {
                setMessage("Debes iniciar sesión para ver tus tickets.");
                setLoading(false);
                return;
            }
            try {
                const data = await listMyTickets(user.id);
                setTickets(data);
            } catch (err) {
                console.error("Error listando tickets", err);
                setMessage("No se pudieron cargar tus tickets.");
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [user]);

    if (loading) return <p>Cargando tickets...</p>;

    if (!user) return <p>Inicia sesión para ver tus tickets.</p>;

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Mis tickets</h1>
            {message && (
                <p className="text-sm text-slate-700 bg-slate-100 border rounded px-2 py-1">
                    {message}
                </p>
            )}

            {tickets.length === 0 ? (
                <p>No tienes tickets aún.</p>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {tickets.map((t) => (
                        <TicketCard key={t.ticketId} ticket={t} />
                    ))}
                </div>
            )}
        </div>
    );
}
