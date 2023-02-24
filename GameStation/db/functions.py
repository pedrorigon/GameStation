from .Common.helper import gen_key, md5sum
from .Common.Permission import Permission
from .Commands import Command
from django.db.utils import IntegrityError

# Valida que a tripla(id, login, password) existe e indica seu papel
def _permissao_usuario(cursor, sql_statement:str, arg:dict) -> tuple[bool, None|str|Permission]:
    cursor.execute(sql_statement, arg)
    ret = cursor.fetchone()

    return (False, "Dados inconsistentes") if ret is None else (True, Permission.MAP_TIPO[ret[0]])

def _gen_new_key(cursor, sql_statement: str) -> str:
    while True:
        new_key = gen_key()
        cursor.execute(sql_statement, {"key": new_key})

        if cursor.fetchone() is None:
            return new_key

# TODO: verificar se funciona
def _get_return_table(cursor) -> str|dict:
    ret = []

    column_names = cursor.description

    if column_names is None:
        return ""

    column_names = [column_name[0] for column_name in column_names]
    n_columns = len(column_names)
    records = cursor.fetchall()

    for row in records:
        d = {}
        for i in range(n_columns):
            d[column_names[i]] = row[i]
        ret.append(d)

    return (True, ret)

def generic(cursor, command: Command, arg: dict) -> tuple[bool, str|dict]:
    try:
        cursor.execute(command.sql_statement, arg)
    except IntegrityError as e:
        return (False, str(e))

    if command.returns_table:
        return _get_return_table(cursor)

    return (True, "success")

# UC7 - Adiciona jogo pendente
def adicionar_jogo(cursor, command: Command, arg: dict) -> tuple[bool, str|dict]:
    # Tags iguais quebram check de unicidade (id_jogo, tag)
    tags = list(set(arg["tags"]))

    # listas geram exceção no binding mesmo que não sejam usadas
    del arg["tags"]

    if len(tags) == 0:
        return (False, "Para um jogo ser adicionado deve ter tags")

    # Verifica se todas as tags existem
    for tag in tags:
        cursor.execute(command.sql_statement["TAG_EXISTE"], {"tag": tag})

        if cursor.fetchone() is None:
            return (False, "A tag '%s' não foi encontrada." % tag)

    # Adiciona jogo com pendente
    try:
        cursor.execute(command.sql_statement["ADICIONA_JOGO"], arg)
    except IntegrityError as e:
        return (False, str(e))

    # Obtém id do jogo pendente
    cursor.execute(command.sql_statement["ID_JOGO"], arg)
    id_jogo = cursor.fetchone()[0]

    # Atribui as tags
    try:
        cursor.executemany(command.sql_statement["JOGO_TAG"], [{"id_jogo": id_jogo, "tag": tag} for tag in tags])
    except IntegrityError as e:
        return (False, str(e))

    return (True, "success")

# UC3 - Compra jogo da loja
def comprar_jogo(cursor, command: Command, arg: dict) -> tuple[bool, str|dict]:
    # Obtém saldo do usuário
    cursor.execute(command.sql_statement['SALDO_USUARIO'], arg)
    saldo = cursor.fetchone()

    if saldo is None:
        return (False, "saldo is None")

    saldo = saldo[0]

    # Obtém preço do jogo
    cursor.execute(command.sql_statement['PRECO_JOGO'], arg)
    preco = cursor.fetchone()

    if preco is None:
        return (False, "preco is None")

    preco = preco[0]

    # Verifica saldo
    if saldo < preco:
        return (False, "saldo < preco")

    # Gera uma nova chave
    new_key = _gen_new_key(cursor, command.sql_statement['ID_CHAVE'])

    # Jogo removido não pode ter novas instâncias
    try:
        cursor.execute(command.sql_statement['CRIA_INSTANCIA'], {"id_jogo": arg["id_jogo"], "key": new_key})
    except IntegrityError as e:
        return (False, str(e))

    # Obtém ID da nova chave
    cursor.execute(command.sql_statement['ID_CHAVE'], {"key": new_key})
    id_chave = cursor.fetchone()[0]

    # Adiciona jogo na biblioteca, altera saldo e lucro
    cursor.execute(command.sql_statement['CHAVE_BIBLIOTECA'], {"id_usuario": arg["id_usuario"], "id_chave": id_chave})
    # 30% de taxa do sistema
    cursor.execute(command.sql_statement['AUMENTA_LUCRO'], {"lucro": 0.7*preco, "id_jogo": arg["id_jogo"]})
    cursor.execute(command.sql_statement['DIMINUI_SALDO'], {"preco_jogo": preco, "id_usuario": arg["id_usuario"]})

    return (True, "success")

# UC12 - Dado login e password retorna id do usuário e permissão
def login(cursos, command: Command, arg: dict) -> tuple[bool, str|tuple[int, Permission]]:
    # Obtém id do usuário
    cursor.execute(command.sql_statement['ID_LOGIN'], arg)
    ret = cursor.fetchone()

    if ret is None:
        return (False, "Usuário não encontrado")

    # Com o id, login e password obtém a permissão
    id_usuario = ret[0]
    ret = _permissao_usuario(cursor, command.sql_statement['PERMISSAO_USUARIO'], {'id': id_usuario, 'login': arg['login'], 'password': arg['password']})

    # papel_usuario retorna tuple[bool, str|Permission], ajusta retorno
    return (True, (id_usuario, ret[1])) if ret[0] else ret
