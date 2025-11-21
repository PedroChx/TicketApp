// src/api/client.ts
import axios from "axios";

export interface ApiEvent {
    id: string;
    title: string;
    description?: string;
    location?: string;
    start?: string;
    end?: string;
    image_url?: string;
}

export interface ApiUser {
    id: string;
    email: string;
    name?: string;
}

const baseURL =
    import.meta.env.VITE_API_BASE_URL ??
    "https://tu-endpoint-de-api.execute-api.us-east-2.amazonaws.com"; // cambia esto cuando tengas la URL real

export const api = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

// ---- Auth ----
export async function loginUser(email: string, password: string) {
    const res = await api.post("/login", { email, password });
    // Ajusta esto según la respuesta real de tu Lambda
    return res.data as { token: string; user: ApiUser };
}

// ---- Events ----
export async function listEvents() {
    const res = await api.get("/events");
    const events = (res.data?.events ?? []) as ApiEvent[];
    return events;
}

// ---- Tickets (placeholder para después) ----
export async function listMyTickets(token: string) {
    const res = await api.get("/tickets/mine", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data?.tickets ?? [];
}
