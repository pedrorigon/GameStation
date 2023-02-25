BEGIN;

/* Média de avaliações */
CREATE VIEW IF NOT EXISTS jogo_nota AS
    SELECT jogo_aceito.id AS id_jogo, AVG(nota) AS nota
    FROM jogo_aceito
    JOIN avaliacao ON (avaliacao.id_jogo=jogo_aceito.id)
    GROUP BY jogo_aceito.id;

/* Exibe todos os jogos que o usuário pode obter */
CREATE VIEW IF NOT EXISTS loja AS
    SELECT id AS id_jogo
    FROM jogo_aceito
    WHERE (jogo_aceito.id NOT IN (
        SELECT id_jogo
        FROM jogo_removido));

/* Mostra todos os jogos do usuário 
 *   B -> Biblioteca
 *   O -> Oferta
 *   T -> Troca
 *   C -> Contraparte
 */
CREATE VIEW IF NOT EXISTS jogos_usuario AS
    SELECT usuario.id AS id_usuario, jogo_instanciado.id_jogo, jogo_instanciado.id AS id_chave, avaliacao.nota AS avaliacao_usuario, 'B' AS disponibilidade
    FROM usuario
    JOIN biblioteca_jogos ON (usuario.id=biblioteca_jogos.id_usuario)
    JOIN jogo_instanciado ON (biblioteca_jogos.id_chave=jogo_instanciado.id)
    JOIN jogo_pendente ON (jogo_pendente.id=jogo_instanciado.id_jogo)
    LEFT JOIN avaliacao ON (usuario.id=avaliacao.id_usuario AND avaliacao.id_jogo=jogo_pendente.id)
    UNION
    SELECT usuario.id AS id_usuario, jogo_instanciado.id_jogo, jogo_instanciado.id AS id_chave, avaliacao.nota AS avaliacao_usuario, 'O'
    FROM usuario
    JOIN ofertas ON (ofertas.id_usuario=usuario.id)
    JOIN jogo_instanciado ON (ofertas.id_chave=jogo_instanciado.id)
    JOIN jogo_pendente ON (jogo_pendente.id=jogo_instanciado.id_jogo)
    LEFT JOIN avaliacao ON (usuario.id=avaliacao.id_usuario AND avaliacao.id_jogo=jogo_pendente.id)
    UNION
    SELECT usuario.id AS id_usuario, jogo_instanciado.id_jogo, jogo_instanciado.id AS id_chave, avaliacao.nota AS avaliacao_usuario, 'T'
    FROM usuario
    JOIN trocas ON (trocas.id_usuario=usuario.id)
    JOIN jogo_instanciado ON (trocas.id_chave=jogo_instanciado.id)
    JOIN jogo_pendente ON (jogo_pendente.id=jogo_instanciado.id_jogo)
    LEFT JOIN avaliacao ON (usuario.id=avaliacao.id_usuario AND avaliacao.id_jogo=jogo_pendente.id)
    UNION
    SELECT usuario.id AS id_usuario, jogo_instanciado.id_jogo, jogo_instanciado.id AS id_chave, avaliacao.nota AS avaliacao_usuario, 'C'
    FROM usuario
    JOIN proposta_contraparte ON (proposta_contraparte.id_usuario=usuario.id)
    JOIN jogo_instanciado ON (proposta_contraparte.id_chave=jogo_instanciado.id)
    JOIN jogo_pendente ON (jogo_pendente.id=jogo_instanciado.id_jogo)
    LEFT JOIN avaliacao ON (usuario.id=avaliacao.id_usuario AND avaliacao.id_jogo=jogo_pendente.id);

/* Tabela de ofertas visível ao usuário */
CREATE VIEW IF NOT EXISTS exibe_ofertas AS
    SELECT ofertas.id AS id_oferta, rank AS usuario_rank, jogo_pendente.id AS id_jogo, ofertas.data, ofertas.valor AS preco_oferta
    FROM ofertas
    JOIN jogo_instanciado ON (jogo_instanciado.id=ofertas.id_chave)
    JOIN jogo_pendente ON (jogo_pendente.id=jogo_instanciado.id_jogo)
    JOIN usuario ON (ofertas.id_usuario=usuario.id)
    ORDER BY usuario.rank DESC;

/* Tabela de trocas visível ao usuário */
CREATE VIEW IF NOT EXISTS exibe_trocas AS
    SELECT trocas.id AS id_troca, rank AS usuario_rank, jogo_pendente.id AS id_jogo, trocas.data
    FROM trocas
    JOIN jogo_instanciado ON (jogo_instanciado.id=trocas.id_chave)
    JOIN jogo_pendente ON (jogo_pendente.id=jogo_instanciado.id_jogo)
    JOIN usuario ON (trocas.id_usuario=usuario.id)
    ORDER BY usuario.rank DESC;

/* Gera ranking de desenvolvedores */
CREATE VIEW IF NOT EXISTS ranking_dev AS
    SELECT jogo_pendente.id_dev, AVG(nota) AS rank
    FROM jogo_aceito
    JOIN avaliacao ON (avaliacao.id_jogo=jogo_aceito.id)
    JOIN jogo_pendente ON (jogo_aceito.id=jogo_pendente.id)
    JOIN usuario_base ON (jogo_pendente.id_dev=usuario_base.id)
    GROUP BY jogo_pendente.id_dev;

/* Exibe jogos que ainda não foram aprovado e não foram removidos */
CREATE VIEW IF NOT EXISTS aguardando_aprovacao AS
    SELECT rank AS rank_dev, jogo_pendente.id AS id_jogo
    FROM jogo_pendente
    JOIN desenvolvedor ON (jogo_pendente.id_dev=desenvolvedor.id)
    WHERE (jogo_pendente.id NOT IN (SELECT id FROM jogo_aceito) AND
        jogo_pendente.id NOT IN (SELECT id_jogo FROM jogo_removido))
    ORDER BY rank DESC;

/* Todos usuarios com especificação no sistema
 *   A -> ADMIN
 *   D -> DEV
 *   U -> USER
 */
CREATE VIEW IF NOT EXISTS user_role AS
    SELECT gerenciador.id, 'A' AS tipo
    FROM gerenciador
    JOIN usuario_base ON (gerenciador.id=usuario_base.id)
    UNION
    SELECT desenvolvedor.id, 'D'
    FROM desenvolvedor
    JOIN usuario_base ON (desenvolvedor.id=usuario_base.id)
    UNION
    SELECT usuario.id, 'U'
    FROM usuario
    JOIN usuario_base ON (usuario.id=usuario_base.id);

/* Chaves de jogos removidos */
CREATE VIEW IF NOT EXISTS chaves_zumbis AS
    SELECT jogo_removido.id_jogo, jogo_instanciado.id AS id_chave
    FROM jogo_removido
    JOIN jogo_pendente ON (jogo_removido.id_jogo=jogo_pendente.id)
    JOIN jogo_instanciado ON (jogo_removido.id_jogo=jogo_instanciado.id_jogo);

/* Exibe avaliações */
CREATE VIEW IF NOT EXISTS listar_avaliacoes AS
    SELECT jogo_pendente.id_dev, jogo_aceito.id AS id_jogo, usuario.id AS id_usuario, nota AS avaliacao_usuario, resenha
    FROM jogo_aceito
    JOIN avaliacao ON (avaliacao.id_jogo=jogo_aceito.id)
    JOIN jogo_pendente ON (jogo_aceito.id=jogo_pendente.id)
    JOIN usuario ON (avaliacao.id_usuario=usuario.id)
    JOIN usuario_base AS base_dev ON (jogo_pendente.id_dev=base_dev.id)
    JOIN usuario_base AS base_user ON (avaliacao.id_usuario=base_user.id);

COMMIT;