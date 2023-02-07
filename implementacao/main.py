from DBManager.DBManager import DBManager
from DBManager.helper import md5sum
import sys

# Usado para teste

COMMANDS = (
    (DBManager.exec, "exec", "command: str"),
    (DBManager.papel_usuario, "papel_usuario", "id_usuario: int, login: str, password: str"),
    (DBManager.avaliar_jogo, "avaliar_jogo", "id_usuario: int, id_jogo: int, nota: int, resenha: str|None=None"),
    (DBManager.colocar_jogo_em_oferta, "colocar_jogo_em_oferta", "id_usuario: int, id_chave: int, valor: float"),
    (DBManager.remove_oferta, "remove_oferta", "id_oferta: int"),
    (DBManager.comprar_jogo_ofertado, "comprar_jogo_ofertado", "id_usuario_comprando: int, id_oferta: int"),
    (DBManager.anunciar_jogo_troca, "anunciar_jogo_troca", "id_usuario_inicial: int, id_chave: int"),
    (DBManager.propor_troca, "propor_troca", "id_troca: int, id_usuario_propos: int, id_chave: int"),
    (DBManager.listar_propostas_recebidas, "listar_propostas_recebidas", "id_usuario_inicial: int"),
    (DBManager.remover_proposta, "remover_proposta", "id_troca: int, id_usuario_propos: int, id_chave: int"),
    (DBManager.aceitar_troca, "aceitar_troca", "id_troca: int, id_user_iniciou: int, id_user_aceitou: int, id_chave_proposto: int, id_chave_aceito: int"),
    (DBManager.comprar_jogo, "comprar_jogo", "id_usuario: int, id_jogo: int"),
    (DBManager.aceitar_jogo, "aceitar_jogo", "id_gerenciador: int, id_jogo: int"),
    (DBManager.remover_jogo, "remover_jogo", "id_jogo: int, justificativa: str|None=None"),
    (DBManager.listar_lucro, "listar_lucro", "id_desenvolvedor: int"),
    (DBManager.listar_avaliacoes, "listar_avaliacoes", "id_desenvolvedor: int"),
    (DBManager.pesquisar_jogos_nome, "pesquisar_jogos_nome", "nome: str"),
    (DBManager.pesquisar_jogos_tag, "pesquisar_jogos_tag", "tag: str"),
    (DBManager.listar_jogos_usuario, "listar_jogos_usuario", "id_usuario: int"),
    (DBManager.login, "login", "login: str, password: str"),
    (DBManager.pesquisar_jogos_avaliacao, "pesquisar_jogos_avaliacao", "nota: float"),
    (DBManager.aumentar_saldo, "aumentar_saldo", "id_usuario: int, saldo: float"),
    (DBManager.listar_jogos_em_aguardo, "listar_jogos_em_aguardo", ""),
    (DBManager.listar_ofertas, "listar_ofertas", ""),
    (DBManager.listar_trocas, "listar_trocas", ""),
    (DBManager.listar_saldo, "listar_saldo", "id_usuario: int"),
    (DBManager.listar_jogos, "listar_jogos", "")
)

def print_select_tabbed(res, file_out=sys.stderr):
    if res is None:
        print(None, file=file_out)
        return

    for line in res:
        for item in line:
            print(item, end='\t', file=file_out)
        print(file=file_out)

def print_markdown(res, file_out=sys.stderr):
    if res is None:
        print(None, file=file_out)
        return

    print('|'.join(res[0]), file=file_out)
    print('|'.join(['-' for i in range(len(res[0]))]), file=file_out)

    for line in res[1:]:
        print('|'.join([str(l) for l in line]), file=file_out)

    print(file=file_out)

def print_ret(ret, print_select=print_markdown, code_markdown=True, file_out=sys.stderr):
    if type(ret) == tuple:
        print_ret(ret[0], print_select, code_markdown, file_out)
        ret = ret[1]

    if type(ret) != list:
        if code_markdown:
            print('```python\n' + str(ret) + '\n```\n', file=file_out)
        else:
            print(ret, file=file_out)
    else:
        print_select(ret, file_out)

if __name__ == '__main__':
    db = DBManager(filenames=['sql/tables.sql', 'sql/views.sql', 'sql/triggers.sql', 'sql/population.sql'])

    while True:
        for i in range(len(COMMANDS)):
            print(str(i) + ': ' + COMMANDS[i][1] + '(' + COMMANDS[i][2] + ')')

        try:
            option = int(input('>'))
        except ValueError:
            continue

        if option >= len(COMMANDS) or option < 0:
            continue

        nargs = [arg.strip() for arg in COMMANDS[option][2].split(',') if arg]
        args = []

        for i in range(len(nargs)):
            tipo = nargs[i].split(':')[-1].strip()
            args.append(input('arg: ' + nargs[i] + ': '))

            if nargs[i].split(':')[0].strip() == 'password':
                args[-1] = md5sum(args[-1])

            try:
                if tipo == 'int':
                    args[-1] = int(args[-1])
                elif tipo == 'float':
                    args[-1] = float(args[-1])
            except ValueError as e:
                print(e)

        print_ret(COMMANDS[option][0](db, *args))

    # while True:
    #     sql_statement = input('(q=quit) > ')

    #     if sql_statement.lower() == 'q':
    #         break

    #     ret = db.exec(sql_statement)

    #     if ret[0]:
    #         print("Sucesso")
    #         print_select_tabbed(ret[1])
    #     else:
    #         print("Erro:", ret[1])

    #     print()

    # db.close()
