import json
import os
import datetime
import uuid

import boto3
import bcrypt

from shared.responses import success, error, no_content

TABLE_NAME = os.environ["TABLE_NAME"]
dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(TABLE_NAME)


def lambda_handler(event, context):
    method = (
        event.get("requestContext", {})
        .get("http", {})
        .get("method", "")
    )

    # Preflight CORS
    if method == "OPTIONS":
        # 204 sin body, sólo headers CORS
        return no_content()

    if method != "POST":
        return error("Método no permitido", 405)

    try:
        body = json.loads(event.get("body") or "{}")
    except json.JSONDecodeError:
        return error("JSON inválido", 400)

    name = body.get("name")
    email = body.get("email")
    password = body.get("password")

    if not email or not password:
        return error("Faltan campos obligatorios", 400)

    pk = f"USER#{email}"
    sk = "PROFILE"

    # ¿usuario ya existe?
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

    # De momento sólo devolvemos un mensaje; el login emitirá el token
    return success({"message": "Usuario creado correctamente"}, status_code=201)
