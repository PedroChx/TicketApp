from boto3.dynamodb.conditions import Key

from shared.db import table
from shared.responses import response


def lambda_handler(event, context):
    """
    Lista los tickets de un usuario.

    GET /tickets/mine?userId=XXXX
    """
    try:
        qs = event.get("queryStringParameters") or {}
        user_id = qs.get("userId")

        if not user_id:
            return response(400, {"message": "Falta el parámetro 'userId'"})

        user_pk = f"USER#{user_id}"

        result = table.query(
            KeyConditionExpression=Key("pk").eq(user_pk),
        )

        items = result.get("Items", []) or []

        tickets = [
            {
                "ticketId": item.get("ticketId"),
                "eventId": item.get("eventId"),
                "status": item.get("status"),
                "createdAt": item.get("createdAt"),
                "eventTitle": item.get("eventTitle"),
                "eventLocation": item.get("eventLocation"),
                "eventStart": item.get("eventStart"),
                "eventEnd": item.get("eventEnd"),
            }
            for item in items
            if item.get("entityType") == "TICKET"
        ]

        return response(200, {"tickets": tickets})

    except Exception as e:
        print("Tickets mine error:", e)
        return response(500, {"message": "Error al obtener los tickets del usuario"})
