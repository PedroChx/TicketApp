import json
import uuid
from datetime import datetime

from shared.db import table
from shared.responses import response


def lambda_handler(event, context):
    """
    Crea un nuevo evento.

    Body esperado:
    {
      "title": "Concierto X",
      "description": "...",
      "location": "CDMX",
      "start": "2025-01-01T20:00:00Z",
      "end": "2025-01-01T23:00:00Z",
      "image_url": "https://..."
    }
    """
    try:
        body = json.loads(event.get("body") or "{}")

        title = body.get("title")
        if not title:
            return response(400, {"message": "El campo 'title' es obligatorio"})

        description = body.get("description") or ""
        location = body.get("location") or ""
        start = body.get("start") or datetime.utcnow().isoformat()
        end = body.get("end") or start
        image_url = body.get("image_url") or ""

        event_id = str(uuid.uuid4())

        item = {
            "pk": f"EVENT#{event_id}",
            "sk": f"EVENT#{event_id}",
            "entityType": "EVENT",
            "eventId": event_id,
            "title": title,
            "description": description,
            "location": location,
            "start": start,
            "end": end,
            "image_url": image_url,
            "createdAt": datetime.utcnow().isoformat(),
        }

        table.put_item(Item=item)

        return response(201, {"event": item})

    except Exception as e:
        print("Create event error:", e)
        return response(500, {"message": "Error al crear evento"})
