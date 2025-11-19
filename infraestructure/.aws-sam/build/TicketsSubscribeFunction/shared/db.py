import os
import boto3

TABLE_NAME = os.environ.get("TABLE_NAME")

if not TABLE_NAME:
    # Si esto pasa, es problema de configuración del template
    raise RuntimeError("No se encontró la variable de entorno TABLE_NAME")

_dynamodb = boto3.resource("dynamodb")
table = _dynamodb.Table(TABLE_NAME)
