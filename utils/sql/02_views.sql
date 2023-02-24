BEGIN;

/* Todos usuarios com especificação no sistema
 *   G -> Gerenciador
 *   D -> Desenvolvedor
 *   U -> Usuário
 */
CREATE VIEW IF NOT EXISTS unified_users AS
    SELECT gerenciador.id, usuario_base.login, usuario_base.password, 'G' AS tipo, NULL AS saldo, NULL AS lucro, NULL AS rank
    FROM gerenciador
    JOIN usuario_base ON (gerenciador.id=usuario_base.id)
    UNION
    SELECT desenvolvedor.id, usuario_base.login, usuario_base.password, 'D', NULL, lucro, rank
    FROM desenvolvedor
    JOIN usuario_base ON (desenvolvedor.id=usuario_base.id)
    UNION
    SELECT usuario.id, usuario_base.login, usuario_base.password, 'U', saldo, NULL, rank
    FROM usuario
    JOIN usuario_base ON (usuario.id=usuario_base.id);

/* Média de avaliações */
CREATE VIEW IF NOT EXISTS media_avaliacao AS
    SELECT jogo_pendente.id_dev, usuario_base.login, jogo_pendente.id, jogo_pendente.nome, AVG(nota) AS nota
    FROM jogo_aceito
    JOIN avaliacao ON (avaliacao.id_jogo=jogo_aceito.id)
    JOIN jogo_pendente ON (jogo_aceito.id=jogo_pendente.id)
    JOIN usuario_base ON (jogo_pendente.id_dev=usuario_base.id)
    GROUP BY jogo_aceito.id;

/* Gera ranking de desenvolvedores */
CREATE VIEW IF NOT EXISTS ranking_dev AS
    SELECT jogo_pendente.id_dev, usuario_base.login, AVG(nota) AS rank
    FROM jogo_aceito
    JOIN avaliacao ON (avaliacao.id_jogo=jogo_aceito.id)
    JOIN jogo_pendente ON (jogo_aceito.id=jogo_pendente.id)
    JOIN usuario_base ON (jogo_pendente.id_dev=usuario_base.id)
    GROUP BY jogo_pendente.id_dev;

/* Tabela de ofertas visível ao usuário */
CREATE VIEW IF NOT EXISTS exibe_ofertas AS
    SELECT ofertas.id AS id_oferta, usuario.id AS id_usuario, usuario.rank, jogo_pendente.nome, media_avaliacao.nota, jogo_pendente.preco, ofertas.valor AS preco_oferta, ofertas.data
    FROM ofertas
    JOIN jogo_instanciado ON (jogo_instanciado.id=ofertas.id_chave)
    JOIN jogo_pendente ON (jogo_pendente.id=jogo_instanciado.id_jogo)
    JOIN usuario ON (ofertas.id_usuario=usuario.id)
    LEFT JOIN media_avaliacao ON (jogo_pendente.id=media_avaliacao.id)
    ORDER BY usuario.rank DESC;

/* Tabela de trocas visível ao usuário */
CREATE VIEW IF NOT EXISTS exibe_trocas AS
    SELECT trocas.id AS id_troca, usuario.id AS id_usuario, usuario.rank, jogo_pendente.nome, media_avaliacao.nota, jogo_pendente.preco, trocas.data
    FROM trocas
    JOIN jogo_instanciado ON (jogo_instanciado.id=trocas.id_chave)
    JOIN jogo_pendente ON (jogo_pendente.id=jogo_instanciado.id_jogo)
    JOIN usuario ON (trocas.id_usuario=usuario.id)
    LEFT JOIN media_avaliacao ON (jogo_pendente.id=media_avaliacao.id)
    ORDER BY usuario.rank DESC;

/* Chaves de jogos removidos */
CREATE VIEW IF NOT EXISTS chaves_zumbis AS
    SELECT jogo_removido.id_jogo, jogo_instanciado.id AS id_chave
    FROM jogo_removido
    JOIN jogo_pendente ON (jogo_removido.id_jogo=jogo_pendente.id)
    JOIN jogo_instanciado ON (jogo_removido.id_jogo=jogo_instanciado.id_jogo);

/* Mostra todos os jogos do usuário 
 *   B -> Biblioteca
 *   O -> Oferta
 *   T -> Troca
 *   C -> Contraparte
 */
CREATE VIEW IF NOT EXISTS listar_jogos_usuario AS
    SELECT usuario.id, usuario_base.login, jogo_instanciado.id_jogo, jogo_pendente.nome, jogo_instanciado.id AS id_chave, 'B' AS disponibilidade
    FROM usuario
    JOIN usuario_base ON (usuario.id=usuario_base.id)
    JOIN biblioteca_jogos ON (usuario.id=biblioteca_jogos.id_usuario)
    JOIN jogo_instanciado ON (biblioteca_jogos.id_chave=jogo_instanciado.id)
    JOIN jogo_pendente ON (jogo_pendente.id=jogo_instanciado.id_jogo)
    UNION
    SELECT usuario.id, usuario_base.login, jogo_instanciado.id_jogo, jogo_pendente.nome, jogo_instanciado.id AS id_chave, 'O'
    FROM usuario
    JOIN usuario_base ON (usuario.id=usuario_base.id)
    JOIN ofertas ON (ofertas.id_usuario=usuario.id)
    JOIN jogo_instanciado ON (ofertas.id_chave=jogo_instanciado.id)
    JOIN jogo_pendente ON (jogo_pendente.id=jogo_instanciado.id_jogo)
    UNION
    SELECT usuario.id, usuario_base.login, jogo_instanciado.id_jogo, jogo_pendente.nome, jogo_instanciado.id AS id_chave, 'T'
    FROM usuario
    JOIN usuario_base ON (usuario.id=usuario_base.id)
    JOIN trocas ON (trocas.id_usuario=usuario.id)
    JOIN jogo_instanciado ON (trocas.id_chave=jogo_instanciado.id)
    JOIN jogo_pendente ON (jogo_pendente.id=jogo_instanciado.id_jogo)
    UNION
    SELECT usuario.id, usuario_base.login, jogo_instanciado.id_jogo, jogo_pendente.nome, jogo_instanciado.id AS id_chave, 'C'
    FROM usuario
    JOIN usuario_base ON (usuario.id=usuario_base.id)
    JOIN proposta_contraparte ON (proposta_contraparte.id_usuario=usuario.id)
    JOIN jogo_instanciado ON (proposta_contraparte.id_chave=jogo_instanciado.id)
    JOIN jogo_pendente ON (jogo_pendente.id=jogo_instanciado.id_jogo);

/* Exibe avaliações com informações sobre o desenvolvedor */
CREATE VIEW IF NOT EXISTS listar_avaliacoes AS
    SELECT jogo_pendente.id_dev, base_dev.login AS login_dev, jogo_aceito.id AS id_jogo, jogo_pendente.nome, usuario.id AS id_usuario, base_user.login AS login_user, nota, resenha
    FROM jogo_aceito
    JOIN avaliacao ON (avaliacao.id_jogo=jogo_aceito.id)
    JOIN jogo_pendente ON (jogo_aceito.id=jogo_pendente.id)
    JOIN usuario ON (avaliacao.id_usuario=usuario.id)
    JOIN usuario_base AS base_dev ON (jogo_pendente.id_dev=base_dev.id)
    JOIN usuario_base AS base_user ON (avaliacao.id_usuario=base_user.id);

/* Exibe todos os jogos que o usuário pode obter */
CREATE VIEW IF NOT EXISTS loja_jogos AS
    SELECT jogo_pendente.id AS id_jogo, jogo_pendente.nome, jogo_pendente.id_dev, user_dev.login AS login_dev, jogo_pendente.preco, jogo_pendente.descricao, jogo_pendente.link_imagens, jogo_pendente.link_trailer, nota, 'N' AS modalidade, NULL AS rank, 'NA' AS id_chave
    FROM jogo_aceito
    JOIN jogo_pendente ON (jogo_pendente.id=jogo_aceito.id)
    JOIN usuario_base AS user_dev ON (user_dev.id=jogo_pendente.id_dev)
    LEFT JOIN media_avaliacao ON (media_avaliacao.id=jogo_pendente.id)
    WHERE (jogo_pendente.id NOT IN (
        SELECT id_jogo
        FROM jogo_removido))
    UNION
    SELECT jogo_pendente.id AS id_jogo, jogo_pendente.nome, jogo_pendente.id_dev, user_dev.login AS login_dev, ofertas.valor, jogo_pendente.descricao, jogo_pendente.link_imagens, jogo_pendente.link_trailer, nota, 'O' AS modalidade, rank, ofertas.id_chave
    FROM ofertas
    JOIN jogo_instanciado ON (ofertas.id_chave=jogo_instanciado.id)
    JOIN jogo_pendente ON (jogo_pendente.id=jogo_instanciado.id_jogo)
    JOIN usuario_base AS user_dev ON (user_dev.id=jogo_pendente.id_dev)
    JOIN usuario ON (ofertas.id_usuario=usuario.id)
    LEFT JOIN media_avaliacao ON (media_avaliacao.id=jogo_pendente.id)
    UNION
    SELECT jogo_pendente.id AS id_jogo, jogo_pendente.nome, jogo_pendente.id_dev, user_dev.login AS login_dev, 'NA', jogo_pendente.descricao, jogo_pendente.link_imagens, jogo_pendente.link_trailer, nota, 'T' AS modalidade, rank, trocas.id_chave
    FROM trocas
    JOIN jogo_instanciado ON (trocas.id_chave=jogo_instanciado.id)
    JOIN jogo_pendente ON (jogo_pendente.id=jogo_instanciado.id_jogo)
    JOIN usuario_base AS user_dev ON (user_dev.id=jogo_pendente.id_dev)
    JOIN usuario ON (trocas.id_usuario=usuario.id)
    LEFT JOIN media_avaliacao ON (media_avaliacao.id=jogo_pendente.id)
    ORDER BY rank DESC NULLS FIRST;

/* Exibe as propostas recebidas */
CREATE VIEW IF NOT EXISTS listar_proposta AS
    SELECT trocas.id AS id_troca, usuario_ibase.id AS id_usuario, jogo_pinicial.nome AS inome, jogo_pinicial.preco AS ipreco, jogo_pproposto.nome AS pnome, jogo_pproposto.preco AS ppreco, usuario_pbase.login AS usuario_propos, proposta_contraparte.id_chave AS id_proposta
    FROM trocas
    JOIN proposta_contraparte ON (proposta_contraparte.id_troca=trocas.id) 
    JOIN jogo_instanciado AS jogo_iinicial ON (jogo_iinicial.id=trocas.id_chave) 
    JOIN jogo_pendente AS jogo_pinicial ON (jogo_pinicial.id=jogo_iinicial.id_jogo) 
    JOIN jogo_instanciado AS jogo_iproposto ON (proposta_contraparte.id_chave=jogo_iproposto.id) 
    JOIN jogo_pendente AS jogo_pproposto ON (jogo_pproposto.id=jogo_iproposto.id_jogo) 
    JOIN usuario_base AS usuario_pbase ON (proposta_contraparte.id_usuario=usuario_pbase.id)
    JOIN usuario_base AS usuario_ibase ON (trocas.id_usuario=usuario_ibase.id);

/* Exibe jogos que ainda não foram aprovado e não foram removidos */
CREATE VIEW IF NOT EXISTS aguardando_aprovacao AS
    SELECT id_dev, usuario_base.login, rank, jogo_pendente.id, nome, preco, descricao, link_imagens, link_trailer
    FROM jogo_pendente
    JOIN desenvolvedor ON (jogo_pendente.id_dev=desenvolvedor.id)
    JOIN usuario_base ON (desenvolvedor.id=usuario_base.id)
    WHERE (jogo_pendente.id NOT IN (SELECT id FROM jogo_aceito) AND
        jogo_pendente.id NOT IN (SELECT id_jogo FROM jogo_removido))
    ORDER BY rank DESC;

COMMIT;