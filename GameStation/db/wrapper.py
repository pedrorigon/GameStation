from .Commands import Command, SQLCommand
from .Common.Permission import Permission
from .functions import generic, comprar_jogo, adicionar_jogo, login

api_command = {
    # UC1 - Insere nova avaliação
    '/avaliar_jogo/': {'function': generic, 'method': 'POST', 'command': Command(SQLCommand.AVALIACAO, {'id_usuario': int, 'id_jogo': int, 'nota': int, 'resenha': str}), 'permission': (Permission.USER, )},
    # UC4/UC6 - Gerenciador aceita jogo
    '/aceitar_jogo/': {'function': generic, 'method': 'POST', 'command': Command(SQLCommand.ACEITAR_JOGO, {'id_gerenciador': int, 'id_jogo': int}), 'permission': (Permission.ADMIN, )},
    # UC2a - Coloca jogo em oferta
    '/colocar_jogo_em_oferta/': {'function': generic, 'method': 'POST', 'command': Command(SQLCommand.INSERIR_OFERTAS, {'id_usuario': int, 'id_chave': int, 'valor': float}), 'permission': (Permission.USER, )},
    # UC2b - Tira jogo de oferta
    '/remove_oferta/': {'function': generic, 'method': 'DELETE', 'command': Command(SQLCommand.REMOVE_OFERTA, {'id_oferta': int}), 'permission': (Permission.USER, )},
    # UC2c - Comprar jogo ofertado
    '/comprar_jogo_ofertado/': {'function': generic, 'method': 'POST', 'command': Command(SQLCommand.COMPRA_OFERTA, {'id_usuario_comprando': int, 'id_oferta': int}), 'permission': (Permission.USER, )},
    # UC2d - Anuncia jogo para troca (usuário inicial)
    '/anunciar_jogo_troca/': {'function': generic, 'method': 'POST', 'command': Command(SQLCommand.ANUNCIA_TROCA, {'id_usuario_inicial': int, 'id_chave': int}), 'permission': (Permission.USER, )},
    # UC2e - Propor jogo em troca de jogo anunciado (usuário que propôs)
    '/propor_troca/': {'function': generic, 'method': 'POST', 'command': Command(SQLCommand.PROPOR_CONTRAPARTE, {'id_troca': int, 'id_usuario_propos': int, 'id_chave': int}), 'permission': (Permission.USER, )},
    # UC2f - Visualiza as propostas feitas (usuário inicial)
    '/listar_propostas_recebidas/': {'function': generic, 'method': 'GET', 'command': Command(SQLCommand.LISTAR_PROPOSTAS_RECEBIDAS, {'id_usuario_inicial': int}, True), 'permission': (Permission.USER, )},
    # UC2g/UC2i - Remove proposta de troca (usuário inicial)/Retira proposta de troca (usuário que propôs)
    '/remover_proposta/': {'function': generic, 'method': 'DELETE', 'command': Command(SQLCommand.REMOVE_PROPOSTA, {'id_troca': int, 'id_usuario_propos': int, 'id_chave': int}), 'permission': (Permission.USER, )},
    # UC2h - Aceita proposta de troca (usuário inicial)
    '/aceitar_troca/': {'function': generic, 'method': 'POST', 'command': Command(SQLCommand.ACEITAR_TROCA, {'id_troca': int, 'id_user_iniciou': int, 'id_user_aceitou': int, 'id_chave_proposto': int, 'id_chave_aceito': int}), 'permission': (Permission.USER, )},
    # UC5 - Remove/recusa jogo da loja
    '/remover_jogo/': {'function': generic, 'method': 'DELETE', 'command': Command(SQLCommand.REMOVER_JOGO, {'id_jogo': int, 'justificativa': str}), 'permission': (Permission.DEV, Permission.ADMIN)},
    # UC8 - Lista lucros do desenvolvedor
    '/listar_lucro/': {'function': generic, 'method': 'GET', 'command': Command(SQLCommand.LISTAR_LUCRO, {'id_desenvolvedor': int}, True), 'permission': (Permission.DEV, )},
    # UC9 - Lista para o desenvolvedor as avaliações que recebeu
    '/listar_avaliacoes/': {'function': generic, 'method': 'GET', 'command': Command(SQLCommand.LISTAR_AVALIACOES, {'id_desenvolvedor': int}, True), 'permission': (Permission.DEV, )},
    # UC10a - Pesquisa jogos por nome
    '/pesquisar_jogos_nome/': {'function': generic, 'method': 'GET', 'command': Command(SQLCommand.PESQUISAR_JOGO_NOME, {'nome': str}, True), 'permission': (Permission.USER, )},
    # UC10b - Pesquisa jogos por tag
    '/pesquisar_jogos_tag/': {'function': generic, 'method': 'GET', 'command': Command(SQLCommand.PESQUISAR_JOGO_TAG, {'tag': str}, True), 'permission': (Permission.USER, )},
    # UC11 - Lista todos os jogos do usuário
    '/listar_jogos_usuario/': {'function': generic, 'method': 'GET', 'command': Command(SQLCommand.LISTAR_JOGOS_USUARIO, {'id_usuario': int}, True), 'permission': (Permission.USER, )},
    # C. d) - Pesquisa jogos por avaliação
    '/pesquisar_jogos_avaliacao/': {'function': generic, 'method': 'GET', 'command': Command(SQLCommand.PESQUISAR_JOGO_AVALIACAO, {'nota': float}, True), 'permission': (Permission.USER, )},
    # Soma saldo ao saldo do usuário
    '/aumentar_saldo/': {'function': generic, 'method': 'POST', 'command': Command(SQLCommand.AUMENTAR_SALDO, {'id_usuario': int, 'saldo': float}), 'permission': (Permission.USER, )},
    # Lista todos os jogos que estão em aguardo
    '/listar_jogos_em_aguardo/': {'function': generic, 'method': 'GET', 'command': Command(SQLCommand.LISTAR_JOGOS_EM_AGUARDO, {}, True), 'permission': (Permission.DEV, )},
    # Lista todos as ofertas disponíveis
    '/listar_ofertas/': {'function': generic, 'method': 'GET', 'command': Command(SQLCommand.EXIBE_OFERTAS, {}, True), 'permission': (Permission.USER, )},
    # Lista todos as trocas disponíveis
    '/listar_trocas/': {'function': generic, 'method': 'GET', 'command': Command(SQLCommand.EXIBE_TROCAS, {}, True), 'permission': (Permission.USER, )},
    # Lista saldo do usuário
    '/listar_saldo/': {'function': generic, 'method': 'GET', 'command': Command(SQLCommand.LISTAR_SALDO, {'id_usuario': int}, True), 'permission': (Permission.USER, )},
    # Lista todos os jogos da loja
    '/listar_jogos/': {'function': generic, 'method': 'GET', 'command': Command(SQLCommand.EXIBE_JOGOS_LOJA, {}, True), 'permission': (Permission.USER, )},
    # UC3 - Compra jogo da loja
    '/comprar_jogo/': {'function': comprar_jogo, 'method': 'POST', 'command': Command(SQLCommand.COMPRAR_JOGO, {'id_usuario': int, 'id_jogo': int}), 'permission': (Permission.USER, )},
    # UC7 - Adiciona jogo pendente
    '/adicionar_jogo/': {'function': adicionar_jogo, 'method': 'POST', 'command': Command(SQLCommand.ADICIONA_JOGO, {'id_desenvolvedor': int, 'nome': str, 'preco': float, 'descricao': str, 'link_imagens': str, 'tags': list[str], 'link_trailer': str}), 'permission': (Permission.DEV, )},
    # UC12 - Dado login e password retorna id do usuário e permissão
    '/login/': {'function': login, 'method': 'POST', 'command': Command(SQLCommand.LOGIN, {'login': str, 'password': str}), 'permission': (Permission.NONE, Permission.USER, Permission.DEV, Permission.ADMIN)},
}

def exec_database(cursor, url: str, method:str, arg: dict) -> tuple[bool, str|dict]:
    if url not in api_command.keys():
        return (False, "Invalid URL")

    if method != api_command[url]['method']:
        return (False, "Invalid method")

    # TODO
    # if current_permission not in api_command[url]['permission']:
    #     return (False, "Invalid permission")

    ret = api_command[url]['command'].verify_args(arg)

    if not ret[0]:
        return ret

    return api_command[url]['function'](cursor, api_command[url]['command'], arg)
