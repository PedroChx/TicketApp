import os
import boto3

dynamodb = boto3.resource("dynamodb")
table_name = os.environ.get("TABLE_NAME", "TicketAppTable")
table = dynamodb.Table(table_name)
