BEGIN;

/* T1: Aumento do saldo da conta do usuário eleva seu rank */
CREATE TRIGGER IF NOT EXISTS t1_update_user_rank AFTER UPDATE OF saldo ON usuario
WHEN (
    NEW.saldo > OLD.saldo
)
BEGIN
    UPDATE usuario
    SET rank = rank + (NEW.saldo - OLD.saldo)
    WHERE usuario.id=OLD.id;
END;

/* T2: Jogo recusado não pode ser aceito */
CREATE TRIGGER IF NOT EXISTS t2_jogo_recusado_nao_aceitavel BEFORE INSERT ON jogo_aceito
WHEN (
    NEW.id IN (SELECT jogo_removido.id_jogo FROM jogo_removido WHERE jogo_removido.id_jogo=NEW.id)
)
BEGIN
    SELECT RAISE(FAIL, "Jogo recusado não pode ser aceito.");
END;

/* T3: Impede que jogos sejam aceitos se não tem tags correspondentes */
CREATE TRIGGER IF NOT EXISTS t3_jogo_com_tags BEFORE INSERT ON jogo_aceito
WHEN (
    NEW.id NOT IN (SELECT id_jogo FROM jogo_tags WHERE (jogo_tags.id_jogo=NEW.id))
)
BEGIN
    SELECT RAISE(FAIL, "Jogo só pode ser aceito caso haja tags associadas a ele.");
END;

/* T4: Impede novas instâncias de jogos removidos de serem geradas */
CREATE TRIGGER IF NOT EXISTS t4_instancia_jogo BEFORE INSERT ON jogo_instanciado
WHEN (
    NEW.id_jogo IN (SELECT id_jogo FROM jogo_removido)
)
BEGIN
    SELECT RAISE(FAIL, "Jogo removido não pode ter novas instancias.");
END;

/* T5: Impede que instâncias de jogos ainda não aceitos sejam geradas */
CREATE TRIGGER IF NOT EXISTS t5_instancia_jogo_aceito BEFORE INSERT ON jogo_instanciado
WHEN (
    NEW.id_jogo NOT IN (SELECT id FROM jogo_aceito WHERE (jogo_aceito.id=NEW.id_jogo))
)
BEGIN
    SELECT RAISE(FAIL, "Jogo só pode ter instâncias geradas caso seja aceito.");
END;

/* T6: Atualiza rank do desenvolvedor assim que uma avaliação for criada */
CREATE TRIGGER IF NOT EXISTS t6_rank_dev_avaliacao_update AFTER INSERT ON avaliacao
BEGIN
    UPDATE desenvolvedor
        SET rank = (
            SELECT rank
            FROM ranking_dev
            WHERE id_dev=(
                SELECT desenvolvedor.id
                FROM jogo_pendente
                JOIN desenvolvedor ON (jogo_pendente.id_dev=desenvolvedor.id)
                WHERE (jogo_pendente.id=NEW.id_jogo)
            )
        )
        WHERE (desenvolvedor.id=(
            SELECT desenvolvedor.id
            FROM jogo_pendente
            JOIN desenvolvedor ON (jogo_pendente.id_dev=desenvolvedor.id)
            WHERE (jogo_pendente.id=NEW.id_jogo)
        ));
END;

/* T7: Atualiza rank do desenvolvedor assim que uma avaliação for apagada */
CREATE TRIGGER IF NOT EXISTS t7_rank_dev_avaliacao_update AFTER DELETE ON avaliacao
BEGIN
    UPDATE desenvolvedor
        SET rank = (
            SELECT rank
            FROM ranking_dev
            WHERE id_dev=(
                SELECT desenvolvedor.id
                FROM jogo_pendente
                JOIN desenvolvedor ON (jogo_pendente.id_dev=desenvolvedor.id)
                WHERE (jogo_pendente.id=OLD.id_jogo)
            )
        )
        WHERE (desenvolvedor.id=(
            SELECT desenvolvedor.id
            FROM jogo_pendente
            JOIN desenvolvedor ON (jogo_pendente.id_dev=desenvolvedor.id)
            WHERE (jogo_pendente.id=OLD.id_jogo)
        ));
END;

/* T8: Atualiza rank do desenvolvedor assim que uma avaliação for atualizada */
CREATE TRIGGER IF NOT EXISTS t8_rank_dev_avaliacao_update AFTER INSERT ON avaliacao
BEGIN
    UPDATE desenvolvedor
        SET rank = (
            SELECT rank
            FROM ranking_dev
            WHERE id_dev=(
                SELECT desenvolvedor.id
                FROM jogo_pendente
                JOIN desenvolvedor ON (jogo_pendente.id_dev=desenvolvedor.id)
                WHERE (jogo_pendente.id=NEW.id_jogo)
            )
        )
        WHERE (desenvolvedor.id=(
            SELECT desenvolvedor.id
            FROM jogo_pendente
            JOIN desenvolvedor ON (jogo_pendente.id_dev=desenvolvedor.id)
            WHERE (jogo_pendente.id=NEW.id_jogo)
        ));
END;

/* T9: Preço de venda do usuário deve estar entre 50% e 150% do preço original */
CREATE TRIGGER IF NOT EXISTS t9_oferta_preco_injusto BEFORE INSERT ON ofertas
WHEN (NEW.valor < 0.5*(
        SELECT jogo_pendente.preco
        FROM jogo_instanciado
        JOIN jogo_pendente ON (jogo_instanciado.id_jogo=jogo_pendente.id)
        WHERE (jogo_instanciado.id=NEW.id_chave)
    ) OR 
        NEW.valor > 1.5*(
        SELECT jogo_pendente.preco
        FROM jogo_instanciado
        JOIN jogo_pendente ON (jogo_instanciado.id_jogo=jogo_pendente.id)
        WHERE (jogo_instanciado.id=NEW.id_chave)
    ))
BEGIN
    SELECT RAISE(FAIL, "Oferta com preço abusivo.");
END;

/* T10: Oferta apenas jogos da biblioteca */
CREATE TRIGGER IF NOT EXISTS t10_jogo_na_biblioteca BEFORE INSERT ON ofertas
WHEN (
    NEW.id_chave NOT IN (SELECT biblioteca_jogos.id_chave FROM biblioteca_jogos WHERE biblioteca_jogos.id_usuario=NEW.id_usuario)
)
BEGIN
    SELECT RAISE(FAIL, "Jogo não faz parte da biblioteca do usuário.");
END;

/* T11: Remove da biblioteca a chave que será usada em oferta */
CREATE TRIGGER IF NOT EXISTS t11_cria_oferta_remove_chave AFTER INSERT ON ofertas
BEGIN
    DELETE FROM biblioteca_jogos WHERE NEW.id_chave=biblioteca_jogos.id_chave;
END;

/* T12: Readiciona chave à biblioteca do usuário */
CREATE TRIGGER IF NOT EXISTS t12_readiciona_chave_biblioteca AFTER DELETE ON ofertas
BEGIN
    INSERT INTO biblioteca_jogos(id_chave, id_usuario) VALUES(OLD.id_chave, OLD.id_usuario);
END;

/* T13: Permite que oferta seja concluída paenas se usuário tem saldo suficiente */
CREATE TRIGGER IF NOT EXISTS t13_valida_saldo_oferta BEFORE INSERT ON oferta_concluida
WHEN (
    NEW.valor > (SELECT usuario.saldo FROM usuario WHERE (NEW.id_user_comprou=usuario.id))
)
BEGIN
    SELECT RAISE(FAIL, "Usuário não tem saldo suficiente para comprar oferta.");
END;

/* T14: Garante que a oferta existe e é válida */
CREATE TRIGGER IF NOT EXISTS t14_valida_oferta BEFORE INSERT ON oferta_concluida
WHEN (
    (NEW.id, NEW.id_user_vendeu, NEW.id_chave, NEW.valor)
    IS NOT
    (SELECT id, id_usuario, id_chave, valor
        FROM ofertas
        WHERE (ofertas.id=NEW.id))
)
BEGIN
    SELECT RAISE(FAIL, "Oferta com dados inconsistentes.");
END;

/* T15: Insere a chave do jogo comprado na oferta na biblioteca do usuário que comprou */
CREATE TRIGGER IF NOT EXISTS t15_realiza_oferta AFTER INSERT ON oferta_concluida
BEGIN
    -- Remove oferta antiga
    DELETE FROM ofertas WHERE(NEW.id=ofertas.id);

    -- Move chave
    -- T8 leva chave de volta à biblioteca
    DELETE FROM biblioteca_jogos WHERE (
        NEW.id_user_vendeu=biblioteca_jogos.id_usuario AND
        NEW.id_chave=biblioteca_jogos.id_chave);
    INSERT INTO biblioteca_jogos(id_usuario, id_chave) VALUES(NEW.id_user_comprou, NEW.id_chave);

    -- Altera saldos
    UPDATE usuario
        SET saldo = saldo - NEW.valor
        WHERE (usuario.id=NEW.id_user_comprou);
    UPDATE usuario
        SET saldo = saldo + 0.75*NEW.valor
        WHERE (usuario.id=NEW.id_user_vendeu);
END;

/* T16: Altera lucro do desenvolvedor no caso de oferta de jogo não removido */
CREATE TRIGGER IF NOT EXISTS t16_propaga_lucro AFTER INSERT ON oferta_concluida
WHEN(
    NEW.id_chave NOT IN (SELECT id_chave FROM chaves_zumbis)
)
BEGIN
    UPDATE desenvolvedor
        -- 30% de taxa do sistema, 25% do valor da oferta
        SET lucro = lucro + 0.7*0.25*NEW.valor
        WHERE (desenvolvedor.id=(
            SELECT jogo_pendente.id_dev
            FROM jogo_pendente
            JOIN jogo_instanciado ON (jogo_pendente.id=jogo_instanciado.id_jogo)
            WHERE (NEW.id_chave=jogo_instanciado.id)
        ));
END;

/* T17: Impede que o usuário ofereça como contraparte um jogo que não está em sua biblioteca */
CREATE TRIGGER IF NOT EXISTS t17_proposta_na_biblioteca BEFORE INSERT ON proposta_contraparte
WHEN (
    NEW.id_chave NOT IN (SELECT id_chave FROM biblioteca_jogos WHERE id_usuario=NEW.id_usuario)
)
BEGIN
    SELECT RAISE(FAIL, "Jogo só pode ser colocado como contraparte se estiver na biblioteca do usuário.");
END;

/* T18: Impede que o usuário faça uma proposta para si mesmo */
CREATE TRIGGER IF NOT EXISTS t18_impede_autotroca BEFORE INSERT ON proposta_contraparte
WHEN (
    NEW.id_usuario IN (SELECT id_usuario FROM trocas WHERE id=NEW.id_troca)
)
BEGIN
    SELECT RAISE(FAIL, "Contraparte só podem ser propostas pelos usuários que não criaram a troca.");
END;

/* T19: Jogo que não está mais sendo proposto para troca deve voltar à biblioteca do usuário */
CREATE TRIGGER IF NOT EXISTS t19_reinsere_biblioteca AFTER DELETE ON proposta_contraparte
BEGIN
    INSERT INTO biblioteca_jogos(id_chave, id_usuario) VALUES(OLD.id_chave, OLD.id_usuario);
END;

/* T20: Remove jogo da biblioteca do usuário após ter sido proposto para troca */
CREATE TRIGGER IF NOT EXISTS t20_remove_biblioteca AFTER INSERT ON proposta_contraparte
BEGIN
    DELETE FROM biblioteca_jogos WHERE (
        NEW.id_usuario=biblioteca_jogos.id_usuario AND
        NEW.id_chave=biblioteca_jogos.id_chave);
END;

/* T21: Troca apenas jogos da biblioteca */
CREATE TRIGGER IF NOT EXISTS t21_jogo_na_biblioteca BEFORE INSERT ON trocas
WHEN (
    NEW.id_chave NOT IN (SELECT biblioteca_jogos.id_chave FROM biblioteca_jogos WHERE biblioteca_jogos.id_usuario=NEW.id_usuario)
)
BEGIN
    SELECT RAISE(FAIL, "Jogo não faz parte da biblioteca do usuário.");
END;

/* T22: Remove da biblioteca a chave que será usada na troca */
CREATE TRIGGER IF NOT EXISTS t22_cria_troca_remove_chave AFTER INSERT ON trocas
BEGIN
    DELETE FROM biblioteca_jogos WHERE(NEW.id_chave=biblioteca_jogos.id_chave);
END;

/* T23: Readiciona chave à biblioteca do usuário */
CREATE TRIGGER IF NOT EXISTS t23_readiciona_chave_biblioteca AFTER DELETE ON trocas
BEGIN
    INSERT INTO biblioteca_jogos(id_chave, id_usuario) VALUES(OLD.id_chave, OLD.id_usuario);
    DELETE FROM proposta_contraparte WHERE(proposta_contraparte.id_troca=OLD.id);
END;

/* T24: Garante que a troca existe e é válida */
CREATE TRIGGER IF NOT EXISTS t24_valida_troca BEFORE INSERT ON troca_concluida
WHEN (
    (NEW.id, NEW.id_user_iniciou, NEW.id_chave_proposto)
    IS NOT
    (SELECT id, id_usuario, id_chave
        FROM trocas
        WHERE (trocas.id=NEW.id))
)
BEGIN
    SELECT RAISE(FAIL, "Troca com dados inconsistentes.");
END;

/* T25: Jogo aceito pela troca deve estar na lista de proposta */
CREATE TRIGGER IF NOT EXISTS t25_jogo_aceito_foi_proposto BEFORE INSERT ON troca_concluida
WHEN (
    NEW.id_chave_aceito NOT IN (SELECT proposta_contraparte.id_chave FROM proposta_contraparte WHERE proposta_contraparte.id_troca=NEW.id)
)
BEGIN
    SELECT RAISE(FAIL, "Jogo aceito para troca não está na lista de propostas.");
END;

/* T26: Faz swap das chaves que fazem parte da troca */
CREATE TRIGGER IF NOT EXISTS t26_realiza_troca AFTER INSERT ON troca_concluida
BEGIN
    -- Remove troca antiga
    DELETE FROM trocas WHERE(NEW.id=trocas.id);

    -- T23 leva chave de volta à biblioteca do usuário que iniciou troca
    DELETE FROM biblioteca_jogos WHERE (
        NEW.id_user_iniciou=biblioteca_jogos.id_usuario AND
        NEW.id_chave_proposto=biblioteca_jogos.id_chave);

    -- T23 desencadeia T19 para todas as propostas, retornando a chave aceita para a biblioteca
    DELETE FROM biblioteca_jogos WHERE (
        NEW.id_user_aceitou=biblioteca_jogos.id_usuario AND
        NEW.id_chave_aceito=biblioteca_jogos.id_chave);

    -- Insere as chaves nas bibliotecas desejadas
    INSERT INTO biblioteca_jogos(id_usuario, id_chave) VALUES(NEW.id_user_iniciou, NEW.id_chave_aceito);
    INSERT INTO biblioteca_jogos(id_usuario, id_chave) VALUES(NEW.id_user_aceitou, NEW.id_chave_proposto);
END;

/* T27: Verifica se usuário tem jogo na biblioteca antes de avaliá-lo */
CREATE TRIGGER IF NOT EXISTS t27_avaliacao_biblioteca BEFORE INSERT ON avaliacao
WHEN (
    NEW.id_jogo NOT IN (
        SELECT jogo_pendente.id
        FROM biblioteca_jogos
        JOIN jogo_instanciado ON (biblioteca_jogos.id_chave=jogo_instanciado.id)
        JOIN jogo_pendente ON (jogo_pendente.id=jogo_instanciado.id_jogo)
        WHERE(biblioteca_jogos.id_usuario=NEW.id_usuario AND jogo_pendente.id=NEW.id_jogo))
)
BEGIN
    SELECT RAISE(FAIL, "Usuário não pode avaliar jogo que não esteja em sua biblioteca.");
END;

COMMIT;