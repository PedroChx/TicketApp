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

        title = body.get("title")
        if not title:
            return error("El campo 'title' es obligatorio", 400)

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
        return success({"event": item}, 201)

    except Exception as e:
        print("Create event error:", e)
        return error("Error al crear evento", 500)