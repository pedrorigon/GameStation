from django.db import connections
from rest_framework.response import Response
from rest_framework.decorators import api_view
from db.wrapper import command_wrapper, commands
from datetime import datetime
from django.contrib.sessions.backends.db import SessionStore
from rest_framework.exceptions import AuthenticationFailed

@api_view(['GET', 'POST', 'DELETE'])
def api_generic(request):
    # Tenta obter informações sobre a sessão
    try:
        session = SessionStore(session_key=request.session['session_key'])

        # Adiciona id_usuario e permission conforme está na sessão
        request.data['id_usuario'] = int(session['id_usuario'])
        request.data['permission'] = session['permission']
    except KeyError:
        pass

    # Usa conexão com 'data.sqlite3'
    with connections['data'].cursor() as cursor:
        return Response(command_wrapper(cursor, request.path, request.method, request.data))

# Login
@api_view(['POST', 'DELETE'])
def session(request):
    # Se for DELETE irá remover a sessão
    if request.method == 'DELETE':
        try:
            # Não removerá a sessão de 'db.sqlite3', em servidor real deveria ter um cronjob
            s = SessionStore(session_key=request.session['session_key'])
            s.expire_date = datetime.now()

            # Remove sessão do cliente
            del request.session['session_key']
        except KeyError:
            pass

        return Response((True, None))
    else:
        with connections['data'].cursor() as cursor:
            ret = command_wrapper(cursor, request.path, request.method, request.data)

    # Login falhou
    if not ret[0]:
        raise AuthenticationFailed(detail=ret[1])

    # Cria sessão
    s = SessionStore()
    s.create()

    # Usa id e permissão que estavam no banco de dados
    s['id_usuario'] = ret[1][0]
    s['permission'] = ret[1][1]
    s.save()

    # Retorna token para cliente
    request.session['session_key'] = s.session_key

    return Response((True, None))
