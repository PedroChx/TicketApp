import json
import uuid

from shared.db import table
from shared.responses import response


def lambda_handler(event, context):
    """
    Login muy simple:
      - Recibe { "email": "...", "name": "..." }
      - Si el usuario ya existe (USER#email / PROFILE), lo devuelve.
      - Si no existe, lo crea.
    """
    try:
        body = json.loads(event.get("body") or "{}")

        email = body.get("email")
        name = body.get("name") or "Usuario"

        if not email:
            return response(400, {"message": "El campo 'email' es obligatorio"})

        user_pk = f"USER#{email}"
        user_sk = "PROFILE"

        # Intentar recuperar usuario existente
        existing = table.get_item(Key={"pk": user_pk, "sk": user_sk})
        item = existing.get("Item")

        if item:
            user_id = item["userId"]
            name = item.get("name", name)
        else:
            # Crear nuevo usuario
            user_id = str(uuid.uuid4())
            item = {
                "pk": user_pk,
                "sk": user_sk,
                "entityType": "USER",
                "userId": user_id,
                "email": email,
                "name": name,
            }
            table.put_item(Item=item)

        return response(
            200,
            {
                "userId": user_id,
                "email": email,
                "name": name,
            },
        )

    except Exception as e:
        print("Login error:", e)
        return response(500, {"message": "Error en login"})
