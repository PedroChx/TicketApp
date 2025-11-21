import json
from typing import Any, Dict


def response(status_code: int, body: Dict[str, Any]) -> Dict[str, Any]:
    """
    Helper para respuestas JSON con CORS básico.
    """
    return {
        "statusCode": status_code,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        "body": json.dumps(body, default=str),
    }
