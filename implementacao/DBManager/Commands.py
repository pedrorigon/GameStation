from dataclasses import dataclass

@dataclass
class Commands:
    COMPRAR_JOGO = {
        "SALDO_USUARIO": "SELECT saldo FROM usuario WHERE(usuario.id=?);", # (id_usuario)
        "PRECO_JOGO": "SELECT preco FROM jogo_pendente WHERE(id=?);", # (id_jogo)
        "CRIA_INSTANCIA": "INSERT INTO jogo_instanciado(id_jogo, chave) VALUES(?, ?);", # (id_jogo, gen_key())
        "CHAVE_BIBLIOTECA": "INSERT INTO biblioteca_jogos(id_usuario, id_chave) VALUES(?, ?);", # (id_jogo, #id(last_gen_key()))
        "AUMENTA_LUCRO": "UPDATE desenvolvedor SET lucro = desenvolvedor.lucro + ? WHERE desenvolvedor.id=(SELECT id_dev FROM jogo_pendente WHERE jogo_pendente.id=?);", #(PRECO_JOGO, id_jogo)
        "DIMINUI_SALDO": "UPDATE usuario SET saldo = usuario.saldo - ? WHERE usuario.id=(SELECT id FROM usuario_base WHERE id=?);" #(PRECO_JOGO, id_usuario)
    }
    ID_CHAVE = "SELECT id FROM jogo_instanciado WHERE(jogo_instanciado.chave=?);"
    ID_LOGIN = "SELECT id FROM usuario_base WHERE(login=?);"
    PERMISSAO_USUARIO = "SELECT tipo FROM unified_users WHERE((?, ?, ?) IS (id, login, password));"
    AVALIACAO = "INSERT INTO avaliacao(id_usuario, id_jogo, nota, resenha) VALUES(?, ?, ?, ?);"
    ACEITAR_JOGO = "INSERT INTO jogo_aceito(id, id_gerenciador) VALUES(?, ?);"
    REMOVER_JOGO = "INSERT INTO jogo_removido(id_jogo, justificativa) VALUES(?, ?);"
    ADICIONA_JOGO = "INSERT INTO jogo_pendente (id_dev, nome, preco, descricao, link_imagens, link_trailer) VALUES(?, ?, ?, ?, ?, ?);"
    TAG_EXISTE = "SELECT tag FROM tags WHERE(tag=?);"
    JOGO_TAG = "INSERT INTO jogo_tags(id_jogo, tag) VALUES(?, ?);"
    ID_JOGO = "SELECT id FROM jogo_pendente WHERE(nome=?);"
    LISTAR_AVALIACOES = "SELECT * FROM listar_avaliacoes WHERE(id_dev=?);"
    LISTAR_JOGOS_USUARIO = "SELECT * FROM listar_jogos_usuario WHERE(id=?);"
    PESQUISAR_JOGO_NOME = "SELECT * FROM loja_jogos WHERE(nome LIKE ?)"
    PESQUISAR_JOGO_TAG = "SELECT * FROM loja_jogos WHERE(id_jogo IN (SELECT id_jogo FROM jogo_tags WHERE tag LIKE ?))"
    PESQUISAR_JOGO_AVALIACAO = "SELECT * FROM loja_jogos WHERE(nota >= ?)"
    LISTAR_LUCRO = "SELECT desenvolvedor.id, login, lucro, rank FROM desenvolvedor JOIN usuario_base ON (usuario_base.id=desenvolvedor.id) WHERE(desenvolvedor.id=?);"
    LISTAR_SALDO = "SELECT usuario.id, login, saldo, rank FROM usuario JOIN usuario_base ON (usuario_base.id=usuario.id) WHERE(usuario.id=?);"
    LISTAR_PROPOSTAS_RECEBIDAS = "SELECT * FROM listar_proposta WHERE (id_usuario=?);"
    INSERIR_OFERTAS = "INSERT INTO ofertas(id_usuario, id_chave, valor) VALUES(?, ?, ?);"
    REMOVE_OFERTA = "DELETE FROM ofertas WHERE(id=?);"
    COMPRA_OFERTA = """INSERT INTO oferta_concluida(id, id_user_vendeu, id_user_comprou, id_chave, valor)
        VALUES(?, (SELECT id_usuario FROM ofertas WHERE(id=?)), ?, (SELECT id_chave FROM ofertas WHERE(id=?)), (SELECT valor FROM ofertas WHERE(id=?)));""" # (id_oferta, id_oferta, id_usuario, id_oferta, id_oferta)
    ANUNCIA_TROCA = "INSERT INTO trocas(id_usuario, id_chave) VALUES(?, ?);"
    PROPOR_CONTRAPARTE = "INSERT INTO proposta_contraparte(id_troca, id_usuario, id_chave) VALUES(?, ?, ?);"
    ACEITAR_TROCA = "INSERT INTO troca_concluida(id, id_user_iniciou, id_user_aceitou, id_chave_proposto, id_chave_aceito) VALUES(?, ?, ?, ?, ?);"
    REMOVE_PROPOSTA = "DELETE FROM proposta_contraparte WHERE(id_troca=? AND id_usuario=? AND id_chave=?);"
    AUMENTAR_SALDO = "UPDATE usuario SET saldo = usuario.saldo + ? WHERE(usuario.id=?);"
    LISTAR_JOGOS_EM_AGUARDO = "SELECT * FROM aguardando_aprovacao;"
    EXIBE_OFERTAS="SELECT * FROM exibe_ofertas;"
    EXIBE_TROCAS="SELECT * FROM exibe_trocas;"
    EXIBE_JOGOS_LOJA="SELECT * FROM loja_jogos;"
