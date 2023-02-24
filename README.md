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

## Gerando o banco de dados

O banco de dados pode ser gerado com executando:

```bash
python3 utils/create_database.py utils/sql GameStation/data.sqlite3
```
