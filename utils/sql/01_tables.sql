BEGIN;

CREATE TABLE IF NOT EXISTS usuario_base (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    login VARCHAR(30) NOT NULL,
    password CHAR(32) NOT NULL,
    UNIQUE(login)
);

CREATE TABLE IF NOT EXISTS desenvolvedor (
    id INTEGER,
    lucro FLOAT NOT NULL DEFAULT 0,
    rank FLOAT NOT NULL DEFAULT 0,
    PRIMARY KEY(id),
    FOREIGN KEY(id) REFERENCES usuario_base(id)
);

CREATE TABLE IF NOT EXISTS gerenciador (
    id INTEGER,
    PRIMARY KEY(id),
    FOREIGN KEY(id) REFERENCES usuario_base(id)
);

CREATE TABLE IF NOT EXISTS usuario (
    id INTEGER,
    saldo FLOAT NOT NULL DEFAULT 0,
    rank FLOAT NOT NULL DEFAULT 0,
    PRIMARY KEY(id),
    FOREIGN KEY(id) REFERENCES usuario_base(id)
);

CREATE TABLE IF NOT EXISTS tags (
    tag VARCHAR(20),
    PRIMARY KEY(tag)
);

CREATE TABLE IF NOT EXISTS jogo_pendente (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_dev INTEGER NOT NULL,
    nome VARCHAR(80) NOT NULL,
    preco FLOAT NOT NULL,
    descricao VARCHAR(512) NOT NULL,
    link_imagens VARCHAR(512) NOT NULL,
    link_trailer VARCHAR(512),
    FOREIGN KEY(id_dev) REFERENCES desenvolvedor(id),
    UNIQUE(nome)
);

CREATE TABLE IF NOT EXISTS jogo_aceito (
    id INTEGER,
    id_gerenciador INTEGER NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(id) REFERENCES jogo_pendente(id),
    FOREIGN KEY(id_gerenciador) REFERENCES gerenciador(id)
);

CREATE TABLE IF NOT EXISTS jogo_removido (
    id_jogo INTEGER,
    justificativa VARCHAR(512),
    PRIMARY KEY(id_jogo),
    FOREIGN KEY(id_jogo) REFERENCES jogo_pendente(id)
);

CREATE TABLE IF NOT EXISTS jogo_instanciado (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_jogo INTEGER NOT NULL, 
    chave CHAR(64) NOT NULL,
    data TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(id_jogo) REFERENCES jogo_aceito(id),
    UNIQUE(chave)
);

CREATE TABLE IF NOT EXISTS jogo_tags (
    id_jogo INTEGER NOT NULL,
    tag VARCHAR(20) NOT NULL,
    FOREIGN KEY(id_jogo) REFERENCES jogo_pendente(id),
    FOREIGN KEY(tag) REFERENCES tags(tag),
    UNIQUE(id_jogo, tag)
);

CREATE TABLE IF NOT EXISTS avaliacao (
    id_usuario INTEGER NOT NULL,
    id_jogo INTEGER NOT NULL,
    nota SMALLINT NOT NULL CHECK(nota >= 0 AND nota <= 10),
    resenha VARCHAR(512),
    FOREIGN KEY(id_usuario) REFERENCES usuario(id),
    FOREIGN KEY(id_jogo) REFERENCES jogo_aceito(id),
    UNIQUE(id_usuario, id_jogo)
);

CREATE TABLE IF NOT EXISTS biblioteca_jogos (
    id_chave INTEGER NOT NULL,
    id_usuario INTEGER NOT NULL,
    PRIMARY KEY(id_chave),
    FOREIGN KEY(id_chave) REFERENCES jogo_instanciado(id),
    FOREIGN KEY(id_usuario) REFERENCES usuario(id),
    UNIQUE(id_chave, id_usuario)
);

CREATE TABLE IF NOT EXISTS ofertas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_usuario INTEGER NOT NULL,
    id_chave INTEGER NOT NULL,
    valor FLOAT NOT NULL CHECK(valor > 0),
    data TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(id_usuario) REFERENCES usuario(id),
    FOREIGN KEY(id_chave) REFERENCES jogo_instanciado(id),
    UNIQUE(id_usuario, id_chave)
);

CREATE TABLE IF NOT EXISTS oferta_concluida (
    id INTEGER PRIMARY KEY,
    id_user_vendeu INTEGER NOT NULL,
    id_user_comprou INTEGER NOT NULL,
    id_chave INTEGER NOT NULL,
    valor FLOAT NOT NULL,
    data TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(id_user_vendeu) REFERENCES usuario(id),
    FOREIGN KEY(id_user_comprou) REFERENCES usuario(id),
    FOREIGN KEY(id_chave) REFERENCES jogo_instanciado(id),
    CHECK(id_user_comprou != id_user_vendeu)
);

CREATE TABLE IF NOT EXISTS trocas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_usuario INTEGER NOT NULL,
    id_chave INTEGER NOT NULL,
    data TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(id_usuario) REFERENCES usuario(id),
    FOREIGN KEY(id_chave) REFERENCES jogo_instanciado(id),
    UNIQUE(id_usuario, id_chave)
);

CREATE TABLE IF NOT EXISTS proposta_contraparte (
    id_troca INTEGER NOT NULL,
    id_usuario INTEGER NOT NULL,
    id_chave INTEGER NOT NULL,
    PRIMARY KEY(id_chave),
    FOREIGN KEY(id_troca) REFERENCES trocas(id),
    FOREIGN KEY(id_usuario) REFERENCES usuario(id),
    FOREIGN KEY(id_chave) REFERENCES jogo_instanciado(id)
);

CREATE TABLE IF NOT EXISTS troca_concluida (
    id INTEGER PRIMARY KEY,
    id_user_iniciou INTEGER NOT NULL,
    id_user_aceitou INTEGER NOT NULL,
    id_chave_proposto INTEGER NOT NULL,
    id_chave_aceito INTEGER NOT NULL,
    data TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(id_user_iniciou) REFERENCES usuario(id),
    FOREIGN KEY(id_user_aceitou) REFERENCES usuario(id),
    FOREIGN KEY(id_chave_proposto) REFERENCES jogo_instanciado(id),
    FOREIGN KEY(id_chave_aceito) REFERENCES jogo_instanciado(id),
    CHECK(id_user_iniciou != id_user_aceitou)
);

COMMIT;