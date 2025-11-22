import json
import bcrypt
import jwt  # si lo estás usando
from shared.db import table
from shared.responses import response

USERS_ENTITY = "USER"
JWT_SECRET = "cambia_esto_por_tu_secret"  # o sácala de env


def lambda_handler(event, context):
    method = event.get("requestContext", {}).get("http", {}).get("method", "POST")

    # ---- Preflight CORS ----
    if method == "OPTIONS":
        return response(200, {"ok": True})

    try:
        body_str = event.get("body") or "{}"
        data = json.loads(body_str)

        email = data.get("email")
        password = data.get("password")

        if not (email and password):
            return response(400, {"message": "email y password son obligatorios"})

        pk = f"USER#{email}"
        sk = "PROFILE"

        db_item = table.get_item(Key={"pk": pk, "sk": sk}).get("Item")
        if not db_item:
            return response(401, {"message": "Credenciales inválidas"})

        stored_hash = db_item.get("passwordHash", "").encode("utf-8")
        if not bcrypt.checkpw(password.encode("utf-8"), stored_hash):
            return response(401, {"message": "Credenciales inválidas"})

        # Aquí podrías generar JWT real; dejo un ejemplo genérico:
        token = jwt.encode({"sub": db_item["userId"], "email": email}, JWT_SECRET, algorithm="HS256")

        return response(200, {"token": token})

    except Exception as e:
        print("Error en login_user:", e)
        return response(500, {"message": "Error interno al iniciar sesión"})
