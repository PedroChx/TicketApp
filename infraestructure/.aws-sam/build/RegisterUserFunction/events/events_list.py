from boto3.dynamodb.conditions import Key
from shared.db import table
from shared.responses import response, success, error, no_content

def lambda_handler(event, context):
    method = event.get("requestContext", {}).get("http", {}).get("method", "")

    if method == "OPTIONS":
        return no_content()
    
    if method != "GET":
        return error("Método no permitido", 405)

    try:
        query = table.query(
            IndexName="EntityTypeIndex",
            KeyConditionExpression=Key("entityType").eq("EVENT"),
        )

        items = query.get("Items", []) or []

        events = [
            {
                "eventId": item.get("eventId"), # Ojo: Frontend espera eventId, no id
                "title": item.get("title"),
                "description": item.get("description", ""),
                "location": item.get("location", ""),
                "start": item.get("start"),
                "end": item.get("end"),
                "image_url": item.get("image_url"),
            }
            for item in items
        ]

        return success({"events": events})

    except Exception as e:
        print("List events error:", e)
        return error("Error al listar eventos", 500)