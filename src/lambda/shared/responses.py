import json
from typing import Any, Dict, Optional

CORS_HEADERS = {
    "Access-Control-Allow-Origin": "http://localhost:5173",
    "Access-Control-Allow-Headers": "Content-Type,Authorization",
    "Access-Control-Allow-Methods": "OPTIONS,GET,POST",
}

def _serialize(body: Optional[Dict[str, Any]] = None) -> str:
    if body is None:
        return ""
    return json.dumps(body)

def success(body: Optional[Dict[str, Any]] = None, status_code: int = 200) -> Dict[str, Any]:
    return {
        "statusCode": status_code,
        "headers": CORS_HEADERS,
        "body": _serialize(body),
    }

def error(message: str, status_code: int = 400) -> Dict[str, Any]:
    return {
        "statusCode": status_code,
        "headers": CORS_HEADERS,
        "body": json.dumps({"message": message}),
    }

def no_content() -> Dict[str, Any]:
    return {
        "statusCode": 204,
        "headers": CORS_HEADERS,
        "body": "",
    }
