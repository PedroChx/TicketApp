# src/lambda/shared/auth_utils.py
import os
import base64
import hashlib

def hash_password(password: str, salt: str | None = None) -> tuple[str, str]:
    """
    Devuelve (salt, hash_hex). Si no se pasa salt, genera uno nuevo.
    """
    if salt is None:
        salt_bytes = os.urandom(16)
        salt = base64.b64encode(salt_bytes).decode("utf-8")
    data = (salt + password).encode("utf-8")
    digest = hashlib.sha256(data).hexdigest()
    return salt, digest

def verify_password(password: str, salt: str, expected_hash: str) -> bool:
    _, digest = hash_password(password, salt)
    return digest == expected_hash

def user_pk(email: str) -> str:
    return f"USER#{email.lower()}"
