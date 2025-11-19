import json
import uuid
from datetime import datetime

from shared.db import table
from shared.responses import response


def lambda_handler(event, context):
    """
    Crea un "ticket" para un usuario sobre un evento.

    Body esperado:
    {
      "userId": "UUID del usuario",
      "email": "usuario@correo.com",   # opcional, solo para referencia
      "eventId": "UUID del evento"
    }
    """
    try:
        body = json.loads(event.get("body") or "{}")

        user_id = body.get("userId")
        event_id = body.get("eventId")

        if not user_id or not event_id:
            return response(
                400,
                {"message": "Campos 'userId' y 'eventId' son obligatorios"},
            )

        user_pk = f"USER#{user_id}"
        ticket_sk = f"TICKET#{event_id}"

        # Verificar si ya existe un ticket para ese evento
        existing = table.get_item(Key={"pk": user_pk, "sk": ticket_sk})
        if "Item" in existing:
            # Ya existe, devolvemos el mismo
            return response(200, {"ticket": existing["Item"]})

        # Recuperar info básica del evento (para guardar datos redundantes útiles)
        event_item_resp = table.get_item(
            Key={"pk": f"EVENT#{event_id}", "sk": f"EVENT#{event_id}"}
        )
        event_item = event_item_resp.get("Item")
        if not event_item:
            return response(404, {"message": "Evento no encontrado"})

        ticket_id = str(uuid.uuid4())
        now_iso = datetime.utcnow().isoformat()

        ticket_item = {
            "pk": user_pk,
            "sk": ticket_sk,
            "entityType": "TICKET",
            "ticketId": ticket_id,
            "userId": user_id,
            "eventId": event_id,
            "status": "ACTIVE",
            "createdAt": now_iso,
            # Datos redundantes del evento para no tener que hacer join en frontend
            "eventTitle": event_item.get("title"),
            "eventLocation": event_item.get("location"),
            "eventStart": event_item.get("start"),
            "eventEnd": event_item.get("end"),
        }

        table.put_item(Item=ticket_item)

        return response(201, {"ticket": ticket_item})

    except Exception as e:
        print("Subscribe ticket error:", e)
        return response(500, {"message": "Error al suscribirse al evento"})
