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
    SELECT jogo_pendente.id_dev, usuario_base.login, jogo_aceito.id, jogo_pendente.nome, AVG(nota) AS nota
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
    SELECT ofertas.id AS id_oferta, usuario.id AS id_usuario, usuario.rank, jogo_pendente.nome, media_avaliacao.nota, ofertas.valor, ofertas.data
    FROM ofertas
    JOIN jogo_instanciado ON (jogo_instanciado.id=ofertas.id_chave)
    JOIN jogo_pendente ON (jogo_pendente.id=jogo_instanciado.id_jogo)
    JOIN media_avaliacao ON (jogo_pendente.id=media_avaliacao.id)
    JOIN usuario ON (ofertas.id_usuario=usuario.id)
    ORDER BY usuario.rank;

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
CREATE VIEW IF NOT EXISTS mostra_jogos AS
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

COMMIT;