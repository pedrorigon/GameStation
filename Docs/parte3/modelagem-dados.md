# Modelagem de dados

- [Modelagem de dados](#modelagem-de-dados)
  - [Introdução](#introdução)
  - [Diagrama ER](#diagrama-er)
  - [Alterações em entidades que já existiam](#alterações-em-entidades-que-já-existiam)
  - [Novas restrições ocultas](#novas-restrições-ocultas)
  - [Novas entidades](#novas-entidades)
  - [Novos relacionamentos](#novos-relacionamentos)
  - [Novos triggers](#novos-triggers)
  - [Alterações nas visões](#alterações-nas-visões)

<div style="page-break-after: always;"></div>

## Introdução

Segue neste documento as modificações feitas no diagrama entidade-relacionamento e seu mapeamento.

## Diagrama ER

![Print](modelo_er.png "Imagem")

Novo modelo.

## Alterações em entidades que já existiam

### proposta-contraparte

Antes a entidade não tinha o campo `id` e sua chave primária era `id_chave`, agora seu há o campo `id` que serve como chave primária.

#### Mapeamento

Seu novo mapeamento é:

```SQL
CREATE TABLE IF NOT EXISTS proposta_contraparte (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_troca INTEGER NOT NULL,
    id_usuario INTEGER NOT NULL,
    id_chave INTEGER NOT NULL,
    FOREIGN KEY(id_troca) REFERENCES trocas(id),
    FOREIGN KEY(id_usuario) REFERENCES usuario(id),
    FOREIGN KEY(id_chave) REFERENCES jogo_instanciado(id)
);
```

## Novas restrições ocultas

* (E) historico: CHECK(id_usuario != id_usuario_participou);
* (E) historico: CHECK(tipo IN ('C', 'T', 'O'));
* (E) historico: CHECK(direcao IN ('I', 'O');

## Novas entidades

A entidade `historico` foi adicionada.

### Mapeamento

Foi mapeada como segue:

```SQL
CREATE TABLE IF NOT EXISTS historico (
    id_transacao INTEGER PRIMARY KEY AUTOINCREMENT,
    id_usuario INTEGER NOT NULL,
    -- Usuário que participou da oferta/troca
    id_usuario_participou INTEGER,
    id_chave INTEGER NOT NULL,
    valor FLOAT,
    tipo CHAR(1) NOT NULL,
    direcao CHAR(1) NOT NULL,
    data TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(id_usuario) REFERENCES usuario(id),
    FOREIGN KEY(id_usuario_participou) REFERENCES usuario(id),
    FOREIGN KEY(id_chave) REFERENCES jogo_instanciado(id),
    CHECK(id_usuario != id_usuario_participou),
    -- Tipo de transação: Compra, Troca ou Oferta
    CHECK(tipo IN ('C', 'T', 'O')),
    -- Sentido do movimento da chave: In ou Out
    CHECK(direcao IN ('I', 'O'))
);
```

## Novos relacionamentos

### usuario_transacao

Foi mapeada como chave externa na tabela `historico`;

### segundo_usuario

Foi mapeada como chave externa na tabela `historico`;

### chave_transacao

Foi mapeada como chave externa na tabela `historico`;

## Novos triggers


### T28: Registra ofertas concluídas na tabela de histórico

```SQL
CREATE TRIGGER IF NOT EXISTS t28_historico_compra AFTER INSERT ON oferta_concluida
BEGIN
    -- Usuário que vendeu
    INSERT INTO historico(id_usuario, id_usuario_participou, id_chave, valor, tipo, direcao)
        VALUES(NEW.id_user_vendeu, NEW.id_user_comprou, NEW.id_chave, NEW.valor, 'O', 'O');
    -- Usuário que comprou
    INSERT INTO historico(id_usuario, id_usuario_participou, id_chave, valor, tipo, direcao)
        VALUES(NEW.id_user_comprou, NEW.id_user_vendeu, NEW.id_chave, NEW.valor, 'O', 'I');
END;
```

### T29: Registra trocas concluídas na tabela de histórico

```SQL
CREATE TRIGGER IF NOT EXISTS t29_historico_troca AFTER INSERT ON troca_concluida
BEGIN
    -- Usuário original enviou
    INSERT INTO historico(id_usuario, id_usuario_participou, id_chave, tipo, direcao)
        VALUES(NEW.id_user_iniciou, NEW.id_user_aceitou, NEW.id_chave_proposto, 'T', 'O');
    -- Usuário original recebeu
    INSERT INTO historico(id_usuario, id_usuario_participou, id_chave, tipo, direcao)
        VALUES(NEW.id_user_iniciou, NEW.id_user_aceitou, NEW.id_chave_aceito, 'T', 'I');

    -- Usuário participou enviou
    INSERT INTO historico(id_usuario, id_usuario_participou, id_chave, tipo, direcao)
        VALUES(NEW.id_user_aceitou, NEW.id_user_iniciou, NEW.id_chave_aceito, 'T', 'O');
    -- Usuário participou recebeu
    INSERT INTO historico(id_usuario, id_usuario_participou, id_chave, tipo, direcao)
        VALUES(NEW.id_user_aceitou, NEW.id_user_iniciou, NEW.id_chave_proposto, 'T', 'I');
END;
```

## Alterações nas visões

As visões modificadas foram:
* `unified_users`: Sofreu alterações e foi renomado para: `role_user`;
* `media_avaliacao`: Sofreu alterações e foi renomado para: `jogo_nota`;
* `listar_jogos_usuario`: Sofreu alterações e foi renomado para:  `jogos_usuario`;
* `loja_jogos`: Sofreu alterações e foi renomado para: `loja`;
* `listar_proposta`: Removido;
