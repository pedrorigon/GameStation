from .Commands import SQLCommand, CommandInfo
from .Permission import Permission
from .functions import generic, generic_jogo_info, comprar_jogo, remover_jogo, adicionar_jogo, generic_permission, login, remover_proposta
from rest_framework.exceptions import MethodNotAllowed, NotFound, PermissionDenied

# LINK:
#   MÉTODO1: CommandInfo
commands = {
    "/biblioteca/": {
        "GET": CommandInfo(SQLCommand.BIBLIOTECA, generic_jogo_info, (Permission.USER,), returns_table=True),
    },
    "/loja/": {
        "GET": CommandInfo(SQLCommand.LOJA, generic_jogo_info, returns_table=True),
    },
    "/comprar_jogo/": {
        "POST": CommandInfo(SQLCommand.COMPRAR_JOGO, comprar_jogo, (Permission.USER,), {"id_jogo": int}),
    },
    "/ofertas/": {
        "GET": CommandInfo(SQLCommand.OFERTAS, generic_jogo_info, returns_table=True),
        "POST": CommandInfo(SQLCommand.INSERIR_OFERTAS, generic, (Permission.USER,), {"id_chave": int, "preco": float}),
        "DELETE": CommandInfo(SQLCommand.REMOVE_OFERTA, generic, (Permission.USER,), {"id_oferta": int}),
    },
    "/trocas/": {
        "GET": CommandInfo(SQLCommand.TROCAS, generic_jogo_info, returns_table=True),
        "POST": CommandInfo(SQLCommand.ANUNCIA_TROCA, generic, (Permission.USER,), {"id_chave": int}),
        "DELETE": CommandInfo(SQLCommand.REMOVE_TROCA, generic, (Permission.USER,), {"id_troca": int}),
    },
    "/propostas/": {
        "GET": CommandInfo(SQLCommand.LISTAR_PROPOSTAS, generic_jogo_info, (Permission.USER,), {"id_troca": int}, returns_table=True),
        "POST": CommandInfo(SQLCommand.PROPOR_CONTRAPARTE, generic, (Permission.USER,), {"id_chave": int, "id_troca": int}),
        "DELETE": CommandInfo(SQLCommand.REMOVE_PROPOSTA, remover_proposta, (Permission.USER,), {"id_proposta": int}),
    },
    "/comprar_oferta/": {
        "POST": CommandInfo(SQLCommand.COMPRA_OFERTA, generic, (Permission.USER,), {"id_oferta": int}),
    },
    "/aceitar_troca/": {
        "POST": CommandInfo(SQLCommand.ACEITAR_TROCA, generic, (Permission.USER,), {"id_troca": int, "id_proposta": int}),
    },
    "/session/" : {
        "POST": CommandInfo(SQLCommand.LOGIN, login, args={"login": str, "password": str}),
        # DELETE é lidado diretamente em views.session
    },
    "/validar_jogo/": {
        "GET": CommandInfo(SQLCommand.LISTAR_JOGOS_EM_AGUARDO, generic_jogo_info, (Permission.ADMIN,), returns_table=True),
        "POST": CommandInfo(SQLCommand.ACEITAR_JOGO, generic, (Permission.ADMIN,), {"id_jogo": int}),
        "DELETE": CommandInfo(SQLCommand.REMOVER_JOGO, remover_jogo, (Permission.DEV, Permission.ADMIN), {"id_jogo": int, "justificativa": str}),
    },
    "/jogo/": {
        "GET": CommandInfo(SQLCommand.JOGO, generic_jogo_info, args={"id_jogo": int}, returns_table=True),
        "POST": CommandInfo(SQLCommand.ADICIONA_JOGO, generic, (Permission.DEV,), {"nome": str, "avaliacao": float, "preco": float, "tags": list[str], "link_imagens": str, "link_trailer": str}),
        "DELETE": CommandInfo(SQLCommand.REMOVER_JOGO, remover_jogo, (Permission.DEV, Permission.ADMIN), {"id_jogo": int, "motivo": str}),
    },
    "/user_info/": {
        "GET": CommandInfo(SQLCommand.USER_INFO, generic_permission, (Permission.USER, Permission.DEV), returns_table=True),
    },
    "/avaliacoes/": {
        "GET": CommandInfo(SQLCommand.AVALIACOES, generic_permission, (Permission.USER, Permission.DEV), returns_table=True),
        "POST": CommandInfo(SQLCommand.INSERE_AVALIACAO, generic, (Permission.USER,), {"id_jogo": int, "nota": float, "resenha": str}),
    },
    "/aumentar_saldo/": {
        "POST": CommandInfo(SQLCommand.AUMENTAR_SALDO, generic, (Permission.USER,), {"acrescimo": float}),
    },
    "/historico/": {
        "GET": CommandInfo(SQLCommand.HISTORICO, generic_permission, (Permission.USER, Permission.DEV,Permission.ADMIN), returns_table=True),
    },
    "/gerenciar_jogos/": {
        "GET": CommandInfo(SQLCommand.GERENCIAR_JOGOS, generic_jogo_info, (Permission.DEV, ), returns_table=True),
    },
}

# Executa um comando da api
def command_wrapper(cursor, url: str, method: str, arg: dict) -> tuple[bool, str|dict]:
    try:
        command = commands[url]
    except KeyError:
        raise NotFound

    try:
        command = command[method]
    except KeyError:
        raise MethodNotAllowed(method)

    # Comando precisa de permissão, verifica se quem requisitou tem
    if command.permission is not None:
        if 'permission' not in arg or arg['permission'] not in command.permission:
            raise PermissionDenied

    ret = command.verify_args(arg)

    if not ret[0]:
        return ret

    return command.function(cursor, command, arg)
