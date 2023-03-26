# API Rest

- [API Rest](#api-rest)
  - [Retorno](#retorno)
    - [Dados retornados](#dados-retornados)
  - [end-points](#end-points)
    - [biblioteca](#biblioteca)
    - [loja](#loja)
    - [comprar\_jogo](#comprar_jogo)
    - [ofertas](#ofertas)
    - [trocas](#trocas)
    - [propostas](#propostas)
    - [comprar\_oferta](#comprar_oferta)
    - [aceitar\_troca](#aceitar_troca)
    - [session](#session)
    - [validar\_jogo](#validar_jogo)
    - [jogo](#jogo)
    - [user\_info](#user_info)
    - [avaliacoes](#avaliacoes)
    - [aumentar\_saldo](#aumentar_saldo)
    - [historico](#historico)
    - [gerenciar\_jogos](#gerenciar_jogos)

## Retorno

A API sempre retorna uma tupla `(bool, None|str|{}|[{}])`, sendo o primeiro elemento usado para indicar se a execução foi bem sucedida, o segundo elemento ou retorna motivo do erro, caso algum erro tenha ocorrido, ou conforme especificado abaixo.

### Dados retornados

* `BIBLIO_INFO`: {"id_chave": int, "avaliacao_usuario": float, "disponibilidade": str, ...JOGO};
* `JOGO`: {"id_jogo": int, "nome": str, "descricao": str, "avaliacao": float, "preco": float, "tags": list\[str\], "link_imagens": str, "link_trailer": str};
* `OFERTA`: {"id_oferta": int, "data": timestamp, "usuario_rank": float, "preco_oferta": float, ...JOGO};
* `TROCA`: {"id_troca": int, "data": timestamp, "usuario_rank": float, ...JOGO};
* `PROPOSTA`: {"id_proposta": int, ...JOGO};
* `JOGO_PENDENTE`: {"rank_dev": "float": int, ...JOGO};
* `AVALIACAO`: {"avaliacao_usuario": float, "resenha": str, ...JOGO};
* `HISTORICO`: {"id_transacao": int, "id_usuario": int, "id_usuario_participou": int, "id_chave": int, "valor": float, "tipo": char, "direcao": char, "data": timestamp};

## end-points

### biblioteca

Método|Argumentos|Resposta|Descrição|Restrição
-|-|-|-|-
GET|`{}`|`[BIBLIO_INFO, ...]`|Obtém uma lista com todos os jogos pertencem ao usuário|Deve estar logado, usa sessão para inferir id do usuário

### loja

Método|Argumentos|Resposta|Descrição|Restrição
-|-|-|-|-
GET|`{}`|`[JOGO, ...]`|Obtém uma lista com todos os jogos que podem ser comprados diretamente da loja|-

### comprar_jogo

Método|Argumentos|Resposta|Descrição|Restrição
-|-|-|-|-
PUT|`{"id_jogo": int}`|`{}`|Compra jogado diretamente da loja|Deve estar logado, usa sessão para inferir id do usuário 

### ofertas

Método|Argumentos|Resposta|Descrição|Restrição
-|-|-|-|-
GET|`{}`|`[OFERTA, ...]`|Obtém uma lista com todos os jogos que foram colocados em oferta|-
PUT|`{"id_chave": int, "preco": float}`|`{}`|Coloca um jogo da biblioteca para oferta com o preço `preco`|Deve estar logado, usa sessão para inferir id do usuário
DELETE|`{"id_oferta": int}`|`{}`|Remove um jogo ofertado|Deve estar logado, usa sessão para verificar se usuário é o criador da oferta

### trocas

Método|Argumentos|Resposta|Descrição|Restrição
-|-|-|-|-
GET|`{}`|`[TROCA, ...]`|Obtém uma lista com todas as trocas disponíveis|-
PUT|`{"id_chave": int}`|`{}`|Coloca um jogo para troca|Deve estar logado, usa sessão para inferir id do usuário
DELETE|`{"id_troca": int}`|`{}`|Remove a troca|Deve estar logado, usa sessão para verificar se usuário é o criador da troca

### propostas

Método|Argumentos|Resposta|Descrição|Restrição
-|-|-|-|-
GET|`{"id_troca": int}`|`[PROPOSTA, ...]`|Obtém uma lista com todas as propostas recebidas para determinada troca|Deve estar logado, usa sessão para verificar se usuário é o criador da troca
PUT|`{"id_chave": int, "id_troca": int}`|`{}`|Coloca um jogo como contrapartida|Deve estar logado
DELETE|`{"id_proposta": int}`|`{}`|Remove a contrapartida|Deve estar logado, usa sessão para verificar se usuário é o criador da troca ou da proposta

### comprar_oferta

Método|Argumentos|Resposta|Descrição|Restrição
-|-|-|-|-
PUT|`{"id_oferta": int}`|`{}`|Compra jogo ofertado|Deve estar logado como usuário

### aceitar_troca

Método|Argumentos|Resposta|Descrição|Restrição
-|-|-|-|-
PUT|`{"id_troca": int, "id_proposta": int}`|`{}`|Aceita que uma troca seja feita com determinada contrapartida|Deve estar logado, usa sessão para verificar se usuário é o criador da troca

### session

Método|Argumentos|Resposta|Descrição|Restrição
-|-|-|-|-
PUT|`{"login": str, "password": str}`|`{}`|Cria nova sessão|-
DELETE|`{}`|`{}`|Encerra sessão|-

### validar_jogo

Método|Argumentos|Resposta|Descrição|Restrição
-|-|-|-|-
GET|`{}`|`[JOGO_PENDENTE, ...]`|Obtém lista de jogos pendentes|Deve estar logado como gerenciador
PUT|`{"id_jogo": int}`|`{}`|Aceita jogo|Deve estar logado como gerenciador
DELETE|`{"id_jogo": int, "justificativa": str}`|`{}`|Recusa/cancela um jogo|Deve estar logado, se desenvolvedor justificativa pode estar vazia, se gerenciador não pode estar vazio

### jogo

Método|Argumentos|Resposta|Descrição|Restrição
-|-|-|-|-
GET|`{"id_jogo": int}`|`JOGO`|Obtém informações sobre o jogo|-
PUT|`JOGO`*|`{}`|Cria jogo|Deve estar logado como desenvolvedor
DELETE|`{"id_jogo": int, "justificativa": str}`|`{}`|Remove/recusa um jogo|Deve estar logado, se desenvolvedor justificativa pode estar vazia, se gerenciador não pode estar vazio

\* Não deve conter o campo `id_jogo`;

### user_info

Método|Argumentos|Resposta|Descrição|Restrição
-|-|-|-|-
GET|`{}`|`{"login": str, "saldo": float, "rank": float}`, caso usuário;<br/>`{"login": str, "lucro": float, "rank": float}`, caso desenvolvedor;|Retorna informação do usuário|Deve estar logado como usuário ou desenvolvedor

### avaliacoes

Método|Argumentos|Resposta|Descrição|Restrição
-|-|-|-|-
GET|`{}`|`[AVALIACAO, ...]`|Recebe todas as avaliações feitas, caso usuário;<br/>Recebe todas as avaliações recebidas, caso desenvolvedor;|-
PUT|`{"id_jogo": int, "nota": float, "resenha": str}`|`{}`|Faz uma avaliação para um jogo|Deve estar logado como usuário

### aumentar_saldo

Método|Argumentos|Resposta|Descrição|Restrição
-|-|-|-|-
PUT|`{"acrescimo": float}`|`{}`|Aumenta saldo do usuário|Deve estar logado como usuário

### historico

Método|Argumentos|Resposta|Descrição|Restrição
-|-|-|-|-
GET|`{}`|`[HISTORICO, ...]`|Caso usuário, retornas todas transações que fez parte;<br/>Caso desenvolvedor, retorna todos transações em que seu jogo foi comprado;<br/>Caso gerenciador, retorna todas transações concluídas no sistema;|Deve estar logado

### gerenciar_jogos

Método|Argumentos|Resposta|Descrição|Restrição
-|-|-|-|-
GET|`{}`|`[JOGO, ...]`|Retorna todos os jogo do desenvolvedor que estão atualmente na loja.|Deve estar logado como desenvolvedor
