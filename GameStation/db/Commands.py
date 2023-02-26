from .Common.Permission import Permission

class SQLCommand:
    JOGO_INFO = """SELECT nome, preco, descricao, link_imagens, link_trailer, nota
        FROM jogo_pendente
        LEFT JOIN jogo_nota ON (jogo_nota.id_jogo=jogo_pendente.id)
        WHERE(id_jogo=:id_jogo);"""
    TAGS_JOGO = "SELECT tag FROM jogo_tags WHERE(id_jogo=:id_jogo);"
    BIBLIOTECA = "SELECT id_jogo, id_chave, avaliacao_usuario, disponibilidade FROM jogos_usuario WHERE(id_usuario=:id_usuario);"
    LOJA = "SELECT id_jogo FROM loja;"
    COMPRAR_JOGO = {
        "SALDO_USUARIO": "SELECT saldo FROM usuario WHERE(usuario.id=:id_usuario);",
        "PRECO_JOGO": "SELECT preco FROM jogo_pendente WHERE(id=:id_jogo);",
        "CRIA_INSTANCIA": "INSERT INTO jogo_instanciado(id_jogo, chave) VALUES(:id_jogo, :key);",
        "ID_CHAVE": "SELECT id FROM jogo_instanciado WHERE(jogo_instanciado.chave=:key);",
        "CHAVE_BIBLIOTECA": "INSERT INTO biblioteca_jogos(id_usuario, id_chave) VALUES(:id_usuario, :id_chave);",
        "AUMENTA_LUCRO": "UPDATE desenvolvedor SET lucro = desenvolvedor.lucro + :lucro WHERE desenvolvedor.id=(SELECT id_dev FROM jogo_pendente WHERE jogo_pendente.id=:id_jogo);",
        "DIMINUI_SALDO": "UPDATE usuario SET saldo = usuario.saldo - :preco_jogo WHERE usuario.id=(SELECT id FROM usuario_base WHERE id=:id_usuario);",
        "HISTORICO_COMPRA": "INSERT INTO historico(id_usuario, id_chave, valor, tipo, direcao) VALUES(:id_usuario, :id_chave, :valor, 'C', 'I');"
    }
    OFERTAS = "SELECT * FROM exibe_ofertas;"
    TROCAS = "SELECT * FROM exibe_trocas;"
    INSERIR_OFERTAS = "INSERT INTO ofertas(id_usuario, id_chave, valor) VALUES(:id_usuario, :id_chave, :valor);"
    REMOVE_OFERTA = "DELETE FROM ofertas WHERE(id=:id_oferta AND id_usuario=:id_usuario);"
    ANUNCIA_TROCA = "INSERT INTO trocas(id_usuario, id_chave) VALUES(:id_usuario, :id_chave);"
    REMOVE_TROCA = "DELETE FROM trocas WHERE(id=:id_troca AND id_usuario=:id_usuario);"
    LISTAR_PROPOSTAS = "SELECT id_proposta, id_jogo FROM proposta_contraparte JOIN jogo_instanciado ON (id_chave=jogo_instanciado.id) WHERE(id_troca=:id_troca);"
    PROPOR_CONTRAPARTE = "INSERT INTO proposta_contraparte(id_troca, id_usuario, id_chave) VALUES(:id_troca, :id_usuario, :id_chave);"
    REMOVE_PROPOSTA = "DELETE FROM proposta_contraparte WHERE(id_proposta=:id_proposta);"
    COMPRA_OFERTA = """INSERT INTO oferta_concluida(id, id_user_vendeu, id_user_comprou, id_chave, valor) VALUES(:id_oferta, (SELECT id_usuario FROM ofertas WHERE(id=:id_oferta)), :id_usuario, (SELECT id_chave ROM ofertas WHERE(id=:id_oferta)), (SELECT valor FROM ofertas WHERE(id=:id_oferta)));"""
    LOGIN = {
        "PERMISSAO_USUARIO": "SELECT tipo FROM user_role JOIN usuario_base ON (usuario_base.id=user_role.id) WHERE(usuario_base.id=:id AND password=:password);",
        "ID_LOGIN": "SELECT id FROM usuario_base WHERE(login=:login);"
    }
    LISTAR_JOGOS_EM_AGUARDO = "SELECT * FROM aguardando_aprovacao;"
    ACEITAR_JOGO = "INSERT INTO jogo_aceito(id, id_gerenciador) VALUES(:id_jogo, :id_usuario);"
    REMOVER_JOGO = "INSERT INTO jogo_removido(id_jogo, justificativa) VALUES(:id_jogo, :justificativa);"
    JOGO = "SELECT id AS id_jogo FROM jogo_pendente;"
    ADICIONA_JOGO = {
        "ADICIONA_JOGO": "INSERT INTO jogo_pendente (id_dev, nome, preco, descricao, link_imagens, link_trailer) VALUES(:id_usuario, :nome, :preco, :descricao, :link_imagens, :link_trailer);",
        "TAG_EXISTE": "SELECT tag FROM tags WHERE(tag=:tag);",
        "JOGO_TAG": "INSERT INTO jogo_tags(id_jogo, tag) VALUES(:id_jogo, :tag);",
        "ID_JOGO": "SELECT id FROM jogo_pendente WHERE(nome=:nome);"
    }
    USER_INFO = {
        Permission.USER: "SELECT login, saldo, rank FROM usuario JOIN usuario_base ON (usuario_base.id=usuario.id) WHERE(usuario_base.id=:id_usuario);",
        Permission.DEV: "SELECT login, lucro, rank FROM desenvolvedor JOIN usuario_base ON (usuario_base.id=desenvolvedor.id)  WHERE(usuario_base.id=:id_usuario);",
    }
    INSERE_AVALIACAO = "INSERT INTO avaliacao(id_usuario, id_jogo, nota, resenha) VALUES(:id_usuario, :id_jogo, :nota, :resenha);"
    AVALIACOES = {
        Permission.USER: "SELECT id_jogo, avaliacao_usuario, resenha FROM listar_avaliacoes WHERE(id_usuario=:id_usuario);",
        Permission.DEV: "SELECT id_jogo, avaliacao_usuario, resenha FROM listar_avaliacoes WHERE(id_dev=:id_usuario);",
    }
    ACEITAR_TROCA = """INSERT INTO troca_concluida(id, id_user_iniciou, id_user_aceitou, id_chave_proposto, id_chave_aceito)
        VALUES(:id_troca,
        (SELECT id_usuario FROM trocas WHERE(id=:id_troca)),
        (SELECT id_usuario FROM proposta_contraparte WHERE(id=:id_proposta)),
        (SELECT id_chave FROM trocas WHERE(id=:id_troca)),
        (SELECT id_chave FROM proposta_contraparte WHERE(id=:id_proposta)));"""
    AUMENTAR_SALDO = "UPDATE usuario SET saldo = usuario.saldo + :acrescimo WHERE(usuario.id=:id_usuario);"
    HISTORICO = {
        Permission.USER: "SELECT * FROM historico WHERE(id_usuario=:id_usuario);",
        Permission.DEV: "SELECT id_transacao, id_usuario, id_chave, valor, historico.data FROM historico JOIN jogo_instanciado ON (jogo_instanciado.id=historico.id_chave) JOIN jogo_pendente ON (jogo_pendente.id=jogo_instanciado.id_jogo) WHERE(id_dev=:id_usuario AND direcao='I' AND tipo != 'T');",
        Permission.ADMIN: "SELECT * FROM historico;"
    }

# sql_statement: Comando(s) SQL
# function: Função a ser chamada
# permissiom: Permissão necesśaria
# args: Argumentos necessários
# returns_table: Retorna tabela?
class CommandInfo:
    def __init__(self, sql_statement: SQLCommand|dict[str: SQLCommand], function, permission: None|tuple[Permission]=None, args: dict[str: any]={}, returns_table: bool=False):
        self.sql_statement = sql_statement
        self.function = function
        self.permission = permission
        self.args = args
        self.returns_table = returns_table

    # Verifica se os argumentos em 'args' estão corretos comparados com self.args
    def verify_args(self, args: dict[str: any]) -> tuple[bool, None|str]:
        for (key, value) in self.args.items():
            # Verifica se chave existe
            if key not in args.keys():
                return (False, "Missing key: " + str(key))

            # Verifica tipo
            if type(args[key]) != value:
                # Caso especial: list[str]
                if value == list[str]:
                    if all(type(item) == str for item in args[key]):
                        continue

                    return (False, str(key) + ": Expected: " + str(value))

                return (False, str(key) + ": Invalid type: " + str(type(args[key])) + ", expected: " + str(value))

        return (True, None)
