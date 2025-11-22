import json
import os
import datetime
import uuid
import boto3
import bcrypt
from shared.responses import success, error, no_content # Asegúrate de importar no_content

TABLE_NAME = os.environ["TABLE_NAME"]
dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(TABLE_NAME)

def lambda_handler(event, context):
    # Obtenemos el método
    method = event.get("requestContext", {}).get("http", {}).get("method", "")

    # 1. MANEJO EXPLÍCITO DE OPTIONS (Para matar el error de CORS)
    if method == "OPTIONS":
        # Retornamos 204 con los headers CORS que están en shared.responses
        return no_content()

    # 2. Si no es OPTIONS ni POST, rechazamos
    if method != "POST":
        return error("Método no permitido", 405)

    try:
        body = json.loads(event.get("body") or "{}")
    except json.JSONDecodeError:
        return error("JSON inválido", 400)

    # --- Resto de tu lógica sigue igual ---
    name = body.get("name")
    email = body.get("email")
    password = body.get("password")

    if not email or not password:
        return error("Faltan campos obligatorios", 400)

    pk = f"USER#{email}"
    sk = "PROFILE"

    existing = table.get_item(Key={"pk": pk, "sk": sk}).get("Item")
    if existing:
        return error("El usuario ya existe", 409)

    password_hash = bcrypt.hashpw(
        password.encode("utf-8"), bcrypt.gensalt()
    ).decode("utf-8")

    now = datetime.datetime.utcnow().isoformat()

    table.put_item(
        Item={
            "pk": pk,
            "sk": sk,
            "entityType": "USER",
            "userId": str(uuid.uuid4()),
            "name": name or "",
            "email": email,
            "passwordHash": password_hash,
            "createdAt": now,
        }
    )

    return success({"message": "Usuario creado correctamente"}, status_code=201)