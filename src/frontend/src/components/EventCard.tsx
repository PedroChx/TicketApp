// src/frontend/src/components/EventCard.tsx
import React from "react";
import type { ApiEvent } from "../api/client";

type Props = {
    event: ApiEvent;
    onSubscribe?: (eventId: string) => void;
};

export const EventCard: React.FC<Props> = ({ event, onSubscribe }) => {
    return (
        <div className="border rounded p-4 flex flex-col gap-2">
            <h3 className="font-bold text-lg">{event.title}</h3>
            {event.description && (
                <p className="text-sm text-gray-700">{event.description}</p>
            )}
            {event.location && (
                <p className="text-xs text-gray-500">Lugar: {event.location}</p>
            )}
            {event.start && (
                <p className="text-xs text-gray-500">
                    Inicio: {new Date(event.start).toLocaleString()}
                </p>
            )}

            {onSubscribe && (
                <button
                    className="mt-2 bg-blue-600 text-white text-sm rounded px-3 py-1"
                    onClick={() => onSubscribe(event.id)}
                >
                    Suscribirme
                </button>
            )}
        </div>
    );
};
