class SQLCommand:
    AVALIACAO = "INSERT INTO avaliacao(id_usuario, id_jogo, nota, resenha) VALUES(:id_usuario, :id_jogo, :nota, :resenha);"
    ACEITAR_JOGO = "INSERT INTO jogo_aceito(id, id_gerenciador) VALUES(:id_jogo, :id_gerenciador);"
    LISTAR_JOGOS_EM_AGUARDO = "SELECT * FROM aguardando_aprovacao;"
    EXIBE_OFERTAS = "SELECT * FROM exibe_ofertas;"
    EXIBE_TROCAS = "SELECT * FROM exibe_trocas;"
    EXIBE_JOGOS_LOJA = "SELECT * FROM loja_jogos;"
    INSERIR_OFERTAS = "INSERT INTO ofertas(id_usuario, id_chave, valor) VALUES(:id_usuario, :id_chave, :valor);"
    REMOVE_OFERTA = "DELETE FROM ofertas WHERE(id=:id_oferta);"
    COMPRA_OFERTA = """INSERT INTO oferta_concluida(id, id_user_vendeu, id_user_comprou, id_chave, valor) VALUES(:id_oferta, (SELECT id_usuario FROM ofertas WHERE(id=:id_oferta)), :id_usuario, (SELECT id_chave ROM ofertas WHERE(id=:id_oferta)), (SELECT valor FROM ofertas WHERE(id=:id_oferta)));"""
    ANUNCIA_TROCA = "INSERT INTO trocas(id_usuario, id_chave) VALUES(:id_usuario_inicial, :id_chave);"
    PROPOR_CONTRAPARTE = "INSERT INTO proposta_contraparte(id_troca, id_usuario, id_chave) VALUES(:id_troca, :id_usuario_propos, :id_chave);"
    LISTAR_PROPOSTAS_RECEBIDAS = "SELECT * FROM listar_proposta WHERE (id_usuario=:id_usuario_inicial);"
    REMOVE_PROPOSTA = "DELETE FROM proposta_contraparte WHERE(id_troca=:id_troca AND id_usuario=:id_usuario_propos AND id_chave=:id_chave);"
    ACEITAR_TROCA = "INSERT INTO troca_concluida(id, id_user_iniciou, id_user_aceitou, id_chave_proposto, id_chave_aceito) VALUES(:id_troca, :id_user_iniciou, :id_user_aceitou, :id_chave_proposto, :id_chave_aceito);"
    REMOVER_JOGO = "INSERT INTO jogo_removido(id_jogo, justificativa) VALUES(:id_jogo, :justificativa);"
    LISTAR_LUCRO = "SELECT desenvolvedor.id, login, lucro, rank FROM desenvolvedor JOIN usuario_base ON (usuario_base.id=desenvolvedor.id) WHERE(desenvolvedor.id=:id_desenvolvedor);"
    LISTAR_AVALIACOES = "SELECT * FROM listar_avaliacoes WHERE(id_dev=:id_desenvolvedor);"
    PESQUISAR_JOGO_NOME = "SELECT * FROM loja_jogos WHERE(nome LIKE :nome)"
    PESQUISAR_JOGO_TAG = "SELECT * FROM loja_jogos WHERE(id_jogo IN (SELECT id_jogo FROM jogo_tags WHERE tag LIKE :tag))"
    LISTAR_JOGOS_USUARIO = "SELECT * FROM listar_jogos_usuario WHERE(id=:id_usuario);"
    PESQUISAR_JOGO_AVALIACAO = "SELECT * FROM loja_jogos WHERE(nota >= :nota)"
    AUMENTAR_SALDO = "UPDATE usuario SET saldo = usuario.saldo + :saldo WHERE(usuario.id=:id_usuario);"
    LISTAR_SALDO = "SELECT usuario.id, login, saldo, rank FROM usuario JOIN usuario_base ON (usuario_base.id=usuario.id) WHERE(usuario.id=:id_usuario);"

    ADICIONA_JOGO = {
        "ADICIONA_JOGO": "INSERT INTO jogo_pendente (id_dev, nome, preco, descricao, link_imagens, link_trailer) VALUES(:id_desenvolvedor, :nome, :preco, :descricao, :link_imagens, :link_trailer);",
        "TAG_EXISTE": "SELECT tag FROM tags WHERE(tag=:tag);",
        "JOGO_TAG": "INSERT INTO jogo_tags(id_jogo, tag) VALUES(:id_jogo, :tag);",
        "ID_JOGO": "SELECT id FROM jogo_pendente WHERE(nome=:nome);"
    }
    COMPRAR_JOGO = {
        "SALDO_USUARIO": "SELECT saldo FROM usuario WHERE(usuario.id=:id_usuario);",
        "PRECO_JOGO": "SELECT preco FROM jogo_pendente WHERE(id=:id_jogo);",
        "CRIA_INSTANCIA": "INSERT INTO jogo_instanciado(id_jogo, chave) VALUES(:id_jogo, :key);",
        "ID_CHAVE": "SELECT id FROM jogo_instanciado WHERE(jogo_instanciado.chave=:key);",
        "CHAVE_BIBLIOTECA": "INSERT INTO biblioteca_jogos(id_usuario, id_chave) VALUES(:id_usuario, :id_chave);",
        "AUMENTA_LUCRO": "UPDATE desenvolvedor SET lucro = desenvolvedor.lucro + :lucro WHERE desenvolvedor.id=(SELECT id_dev FROM jogo_pendente WHERE jogo_pendente.id=:id_jogo);",
        "DIMINUI_SALDO": "UPDATE usuario SET saldo = usuario.saldo - :preco_jogo WHERE usuario.id=(SELECT id FROM usuario_base WHERE id=:id_usuario);"
    }
    LOGIN = {
        "PERMISSAO_USUARIO": "SELECT tipo FROM unified_users WHERE((:id, :login, :password) IS (id, login, password));",
        "ID_LOGIN": "SELECT id FROM usuario_base WHERE(login=:login);"
    }

class Command:
    def __init__(self, sql_statement: SQLCommand|dict[str: SQLCommand], args: dict[str: any], returns_table: bool=False):
        self.sql_statement = sql_statement
        self.args = args
        self.returns_table = returns_table

    def verify_args(self, args: dict[str: any]) -> tuple[bool, None|str]:
        for key in self.args.keys():
            if key not in args.keys():
                return (False, "Missing key: " + str(key))

        for (key, value) in args.items():
            if key not in self.args.keys():
                return (False, "Unknown key: " + str(key))

            if type(value) != self.args[key]:
                # Caso especial: list[str]
                if self.args[key] == list[str]:
                    if all(type(item) == str for item in value):
                        continue

                    return (False, str(key) + ": Expected: " + str(list[str]))

                return (False, str(key) + ": Invalid type: " + str(type(value)) + ", expected: " + str(self.args[key]))

        return (True, None)
