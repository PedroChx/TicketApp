import axios from "axios";

const api = axios.create({
    baseURL:
        import.meta.env.VITE_API_BASE_URL
});

// Tipos que usaremos en el frontend
export interface ApiEvent {
    eventId: string;
    title: string;
    description?: string;
    location?: string;
    start?: string;
    end?: string;
    image_url?: string;
}

export interface ApiTicket {
    ticketId: string;
    eventId: string;
    eventTitle: string;
    used?: boolean;
    createdAt?: string;
}

export interface RegisterResponse {
    token?: string;
    message?: string;
}

export async function loginUser(email: string, password: string) {
    const res = await api.post("/login", { email, password });
    return res.data as { token: string };
}

export async function listEvents() {
    const res = await api.get("/events");
    const data = res.data as { events: ApiEvent[] } | ApiEvent[];
    if (Array.isArray(data)) return data;
    return data.events;
}

export async function createEvent(payload: {
    title: string;
    description?: string;
    location?: string;
    start?: string;
    end?: string;
    image_url?: string;
}) {
    const res = await api.post("/events", payload);
    return res.data as ApiEvent;
}

export async function getEventById(eventId: string) {
    const res = await api.get(`/events/${eventId}`);
    return res.data as ApiEvent;
}

export async function subscribeToEvent(eventId: string) {
    const res = await api.post("/tickets/subscribe", { eventId });
    return res.data as ApiTicket;
}

export async function listMyTickets() {
    const res = await api.get("/tickets/mine");
    const data = res.data as { tickets: ApiTicket[] } | ApiTicket[];
    if (Array.isArray(data)) return data;
    return data.tickets;
}

export async function registerUser(payload: {
    name: string;
    email: string;
    password: string;
}) {
    const res = await api.post("/register", payload);
    return res.data as RegisterResponse;
}
