# GameStation

Trabalho desenvolvido durante a disciplina de Engenharia de Software - 2022/2

## Execução

Para executar a aplicação:

1. Abra um terminal na pasta raiz do projeto;
2. Degite o seguinte comando:
    ```bash
    sudo docker-compose up
    ```
3. Abra um navegador e acesse: `localhost:8000`;

## venv

* login: admin
* password: admin

```bash
virtualenv venv
. venv/bin/activate
pip install django
pip install djangorestframework

cd GameStation
python3 manage.py runserver
```

### Comandos usados na criação

Entre `pip install djangorestframework` e `cd GameStation` foram executados os seguintes comandos para criar o projeto:

```bash
django-admin startproject GameStation
python3 manage.py startapp api
python3 utils/create_database.py utils/sql GameStation/data.sqlite3
cd GameStation
python3 manage.py migrate
python3 manage.py createsuperuser
```

## Gerando o banco de dados

O banco de dados pode ser gerado com executando:

```bash
python3 utils/create_database.py utils/sql GameStation/data.sqlite3
```

## API Rest

* TODO: Usar permissões;
* TODO: login (via API);

Url|Descrição|Method|Args|Permission
-|-|-|-|-
/avaliar_jogo/|UC1 - Insere nova avaliação|POST|`{'id_usuario': int, 'id_jogo': int, 'nota': int, 'resenha': str}`|`(Permission.USER, )`
/aceitar_jogo/|UC4/UC6 - Gerenciador aceita jogo|POST|`{'id_gerenciador': int, 'id_jogo': int}`|`(Permission.ADMIN, )`
/colocar_jogo_em_oferta/|UC2a - Coloca jogo em oferta|POST|`{'id_usuario': int, 'id_chave': int, 'valor': float}`|`(Permission.USER, )`
/remove_oferta/|UC2b - Tira jogo de oferta|DELETE|`{'id_oferta': int}`|`(Permission.USER, )`
/comprar_jogo_ofertado/|UC2c - Comprar jogo ofertado|POST|`{'id_usuario_comprando': int, 'id_oferta': int}`|`(Permission.USER, )`
/anunciar_jogo_troca/|UC2d - Anuncia jogo para troca (usuário inicial)|POST|`{'id_usuario_inicial': int, 'id_chave': int}`|`(Permission.USER, )`
/propor_troca/|UC2e - Propor jogo em troca de jogo anunciado (usuário que propôs)|POST|`{'id_troca': int, 'id_usuario_propos': int, 'id_chave': int}`|`(Permission.USER, )`
/listar_propostas_recebidas/|UC2f - Visualiza as propostas feitas (usuário inicial)|GET|`{'id_usuario_inicial': int}`|`(Permission.USER, )`
/remover_proposta/|UC2g/UC2i - Remove proposta de troca (usuário inicial)/Retira proposta de troca (usuário que propôs)|DELETE|`{'id_troca': int, 'id_usuario_propos': int, 'id_chave': int}`|`(Permission.USER, )`
/aceitar_troca/|UC2h - Aceita proposta de troca (usuário inicial)|POST|`{'id_troca': int, 'id_user_iniciou': int, 'id_user_aceitou': int, 'id_chave_proposto': int, 'id_chave_aceito': int}`|`(Permission.USER, )`
/remover_jogo/|UC5 - Remove/recusa jogo da loja|DELETE|`{'id_jogo': int, 'justificativa': str}`|`(Permission.DEV, Permission.ADMIN)`
/listar_lucro/|UC8 - Lista lucros do desenvolvedor|GET|`{'id_desenvolvedor': int}`|`(Permission.DEV, )`
/listar_avaliacoes/|UC9 - Lista para o desenvolvedor as avaliações que recebeu|GET|`{'id_desenvolvedor': int}`|`(Permission.DEV, )`
/pesquisar_jogos_nome/|UC10a - Pesquisa jogos por nome|GET|`{'nome': str}`|`(Permission.USER, )`
/pesquisar_jogos_tag/|UC10b - Pesquisa jogos por tag|GET|`{'tag': str}`|`(Permission.USER, )`
/listar_jogos_usuario/|UC11 - Lista todos os jogos do usuário|GET|`{'id_usuario': int}`|`(Permission.USER, )`
/pesquisar_jogos_avaliacao/|C. d) - Pesquisa jogos por avaliação|GET|`{'nota': float}`|`(Permission.USER, )`
/aumentar_saldo/|Soma saldo ao saldo do usuário|POST|`{'id_usuario': int, 'saldo': float}`|`(Permission.USER, )`
/listar_jogos_em_aguardo/|Lista todos os jogos que estão em aguardo|GET|`{}`|`(Permission.DEV, )`
/listar_ofertas/|Lista todos as ofertas disponíveis|GET|`{}`|`(Permission.USER, )`
/listar_trocas/|Lista todos as trocas disponíveis|GET|`{}`|`(Permission.USER, )`
/listar_saldo/|Lista saldo do usuário|GET|`{'id_usuario': int}`|`(Permission.USER, )`
/listar_jogos/|Lista todos os jogos da loja|GET|`{}`|`(Permission.USER, )`
/comprar_jogo/|UC3 - Compra jogo da loja|POST|`{'id_usuario': int, 'id_jogo': int}`|`(Permission.USER, )`
/adicionar_jogo/|UC7 - Adiciona jogo pendente|POST|`{'id_desenvolvedor': int, 'nome': str, 'preco': float, 'descricao': str, 'link_imagens': str, 'tags': list[str], 'link_trailer': str}`|`(Permission.DEV, )`
/login/|UC12 - Loga usuário e retorna id do usuário e permissão|POST|`{'login': str, 'password': str}`|`(Permission.NONE, Permission.USER, Permission.DEV, Permission.ADMIN)`
