import json
import uuid
from datetime import datetime
from shared.db import table
from shared.responses import response, success, error, no_content

def lambda_handler(event, context):
    method = event.get("requestContext", {}).get("http", {}).get("method", "")

    if method == "OPTIONS":
        return no_content()
    
    if method != "POST":
        return error("Método no permitido", 405)

    try:
        body = json.loads(event.get("body") or "{}")
        
        # Nota: En un sistema real sacaríamos el userId del token (event['requestContext']['authorizer'])
        # pero para este MVP lo tomamos del body como estaba diseñado.
        user_id = body.get("userId") 
        event_id = body.get("eventId")

        if not user_id or not event_id:
            return error("Campos 'userId' y 'eventId' son obligatorios", 400)

        user_pk = f"USER#{user_id}"
        ticket_sk = f"TICKET#{event_id}"

        # Verificar existencia
        existing = table.get_item(Key={"pk": user_pk, "sk": ticket_sk})
        if "Item" in existing:
            return success({"ticket": existing["Item"]})

        # Recuperar evento
        event_item_resp = table.get_item(
            Key={"pk": f"EVENT#{event_id}", "sk": f"EVENT#{event_id}"}
        )
        event_item = event_item_resp.get("Item")
        if not event_item:
            return error("Evento no encontrado", 404)

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
            "eventTitle": event_item.get("title"),
            "eventLocation": event_item.get("location"),
            "eventStart": event_item.get("start"),
            "eventEnd": event_item.get("end"),
        }

        table.put_item(Item=ticket_item)
        return success({"ticket": ticket_item}, 201)

    except Exception as e:
        print("Subscribe ticket error:", e)
        return error("Error al suscribirse al evento", 500)