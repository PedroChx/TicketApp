from boto3.dynamodb.conditions import Key

from shared.db import table
from shared.responses import response


def lambda_handler(event, context):
    """
    Lista todos los eventos usando el índice global EntityTypeIndex.
    """
    try:
        query = table.query(
            IndexName="EntityTypeIndex",
            KeyConditionExpression=Key("entityType").eq("EVENT"),
        )

        items = query.get("Items", []) or []

        events = [
            {
                "id": item.get("eventId"),
                "title": item.get("title"),
                "description": item.get("description", ""),
                "location": item.get("location", ""),
                "start": item.get("start"),
                "end": item.get("end"),
                "image_url": item.get("image_url"),
            }
            for item in items
        ]

        return response(200, {"events": events})

    except Exception as e:
        print("List events error:", e)
        return response(500, {"message": "Error al listar eventos"})
