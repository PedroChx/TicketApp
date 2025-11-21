// src/pages/MyTicketsPage.tsx
import TicketCard, { type UiTicket } from "../components/TicketCard";
import { useAuth } from "../context/AuthContext";

export default function MyTicketsPage() {
    const { isAuthenticated } = useAuth();

    // Más adelante aquí usaremos listMyTickets(token)
    const demoTickets: UiTicket[] = [
        {
            id: "t1",
            eventTitle: "Concierto de ejemplo",
            status: "active",
        },
        {
            id: "t2",
            eventTitle: "Charla de tecnología",
            status: "used",
            usedAt: new Date().toLocaleString(),
        },
    ];

    if (!isAuthenticated) {
        return (
            <section className="page">
                <header className="page-header">
                    <h1 className="page-title">Mis tickets</h1>
                </header>
                <p className="page-message">
                    Debes iniciar sesión para ver tus tickets.
                </p>
            </section>
        );
    }

    return (
        <section className="page">
            <header className="page-header">
                <h1 className="page-title">Mis tickets</h1>
                <p className="page-subtitle">
                    Aquí verás el historial de tickets generados.
                </p>
            </header>

            <div className="cards-grid">
                {demoTickets.map((t) => (
                    <TicketCard key={t.id} ticket={t} />
                ))}
            </div>
        </section>
    );
}
