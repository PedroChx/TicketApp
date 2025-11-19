// frontend/src/api/client.ts
import axios from "axios";

// Cambia esto por la URL de tu API HTTP de SAM cuando la tengas;
// mientras desarrollas con `sam local start-api`, normalmente será http://127.0.0.1:3000
const baseURL =
    import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:3000";

export const api = axios.create({
    baseURL,
    timeout: 10000,
});

// ==== Tipos que usaremos en el frontend ====

export type ApiUser = {
    id: string;
    email: string;
};

export type ApiEvent = {
    id: string;
    title: string;
    description?: string;
    location?: string;
    start?: string;
    end?: string;
    image_url?: string;
};

export type ApiTicket = {
    ticketId: string;
    eventId: string;
    eventTitle: string;
    status: string; // "valid" | "used" | "expired" | etc.
};

// ==== Funciones de alto nivel para tu API ====

export async function loginUser(
    email: string,
    password: string
): Promise<ApiUser> {
    const res = await api.post("/login", { email, password });

    const data = res.data ?? {};
    const user: ApiUser = {
        id: data.userId ?? data.id ?? "",
        email: data.email ?? data.email_address ?? email,
    };

    return user;
}

export async function listEvents(): Promise<ApiEvent[]> {
    const res = await api.get("/events");
    const data = res.data ?? {};
    // backend devuelve { events: [...] } o directamente [...]
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.events)) return data.events;
    return [];
}

export async function subscribeToEvent(
    userId: string,
    eventId: string
): Promise<void> {
    await api.post("/tickets/subscribe", { userId, eventId });
}

export async function listMyTickets(
    userId: string
): Promise<ApiTicket[]> {
    const res = await api.get("/tickets/mine", {
        params: { userId },
    });
    const data = res.data ?? {};
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.tickets)) return data.tickets;
    return [];
}
