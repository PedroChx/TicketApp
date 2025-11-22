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
        qs = event.get("queryStringParameters") or {}
        # En MVP tomamos userId de query param. En prod sería del token.
        user_id = qs.get("userId")

        if not user_id:
            return error("Falta el parámetro 'userId'", 400)

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

        return success({"tickets": tickets})

    except Exception as e:
        print("Tickets mine error:", e)
        return error("Error al obtener los tickets", 500)