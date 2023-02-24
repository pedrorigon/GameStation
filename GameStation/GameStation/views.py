from django.db import connections
from rest_framework.response import Response
from rest_framework.decorators import api_view
from db.wrapper import exec_database

def api_generic(request):
    with connections['data'].cursor() as cursor:
        return Response(exec_database(cursor, request.path, request.method, request.data))

@api_view(['GET'])
def api_get(request):
    return api_generic(request)

@api_view(['POST'])
def api_post(request):
    return api_generic(request)

@api_view(['DELETE'])
def api_delete(request):
    return api_generic(request)
