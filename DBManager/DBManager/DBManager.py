from .Commands import Commands
from .helper import gen_key, md5sum
from Common.Permission import Permission
from dataclasses import dataclass
from typing import Tuple
from os import path
import sqlite3

class DBManager:
    def __init__(self, db_file: str=":memory:", filenames: list[str]=[]):
        # Conecta com o banco de dados
        self.con = sqlite3.connect(db_file)
        # Cria funções que poderão ser usadas pelo banco de dados
        self.con.create_function("md5", 1, md5sum)
        self.con.create_function("gen_key", 0, gen_key)
        # Obtém o cursor e indica que conexão foi estabelecida
        self.cur = self.con.cursor()
        self.open = True

        # Por padrão as restrições de chaves externas não são aplicadas
        self.cur.execute("PRAGMA foreign_keys = ON;")
        self.commit()

        # Executa os scripts
        for filename in filenames:
            with open(filename, 'r') as f:
                print('[FILE]', filename)
                self.cur.executescript(f.read())

        self.commit()

    # Retorna uma matriz com os resultados do último SELECT, None caso não tenha nada a buscar
    def _get_results(self, header: bool=True) -> None|list[list[str]]:
        ret = None
        column_names = self.cur.description

        if column_names is not None:
            if header:
                ret = [[column_name[0] for column_name in column_names]]
                records = self.cur.fetchall()
                ret.extend([row for row in records])
            else:
                ret = self.cur.fetchall()

        return ret

    # Verifica se a chave existe na tabela de chaves
    def _chave_existe(self, chave: str) -> bool:
        if not self.open:
            return False

        self.cur.execute(Commands.ID_CHAVE, (chave,))

        return self.cur.fetchone() is not None

    # Verifica se a tag existe na tabela de tags
    def _tag_valida(self, tag:str) -> bool:
        if not self.open:
            return False

        self.cur.execute(Commands.TAG_EXISTE, (tag,))

        return self.cur.fetchone() is not None

    # Operações que usam apenas select acabam por sempre repetir os mesmos passos
    def _common_select(self, command: str, args: Tuple[any, ...]) -> None|list[list[str]]:
        if not self.open:
            return (False, "Conexão fechada")

        self.cur.execute(command, args)

        return self._get_results()

    # Operações que usam apenas update, insert ou delete acabam por sempre repetir os mesmos passos
    def _common_up_in_del(self, command: str, args: Tuple[any, ...]) -> Tuple[bool, None|str]:
        if not self.open:
            return (False, "Conexão fechada")

        try:
            self.cur.execute(command, args)
        except sqlite3.IntegrityError as e:
            return (False, str(e))

        return (True, None)

    # Indica se banco conexão está aberta
    def isopen(self) -> bool:
        return self.open

    # Commit
    def commit(self) -> bool:
        if not self.open:
            return False

        self.con.commit()
        return True

    # Executa comando arbitrário
    def exec(self, command: str, header: bool=True) -> Tuple[bool, None|str|list[list[str]]]:
        if not self.open:
            return (False, "Conexão fechada")

        if not sqlite3.complete_statement(command):
            return (False, "Não é um statement completo")

        try:
            self.cur.execute(command)
        except sqlite3.OperationalError as e:
            return (False, str(e))
        except sqlite3.IntegrityError as e:
            return (False, str(e))

        return (True, self._get_results())

    # Valida que a tripla(id, login, password) existe e indica seu papel
    def papel_usuario(self, id_usuario: int, login: str, password: str) -> Tuple[bool, None|str|Permission]:
        if not self.open:
            return (False, "Conexão fechada")

        self.cur.execute(Commands.PERMISSAO_USUARIO, (id_usuario, login, password))
        ret = self.cur.fetchone()

        return (False, "Dados inconsistentes") if ret is None else (True, Permission.MAP_TIPO[ret[0]])

    # UC1 - Insere nova avaliação
    def avaliar_jogo(self, id_usuario: int, id_jogo: int, nota: int, resenha: str|None=None) -> Tuple[bool, None|str]:
        return self._common_up_in_del(Commands.AVALIACAO, (id_usuario, id_jogo, nota, resenha))

    # UC2a - Coloca jogo em oferta
    def colocar_jogo_em_oferta(self, id_usuario: int, id_chave: int, valor: float) -> Tuple[bool, None|str]:
        return self._common_up_in_del(Commands.INSERIR_OFERTAS, (id_usuario, id_chave, valor))

    # UC2b - Tira jogo de oferta
    def remove_oferta(self, id_oferta: int) -> Tuple[bool, None|str]:
        return self._common_up_in_del(Commands.REMOVE_OFERTA, (id_oferta, ))

    # UC2c - Comprar jogo ofertado
    def comprar_jogo_ofertado(self, id_usuario_comprando: int, id_oferta: int) -> Tuple[bool, None|str]:
        return self._common_up_in_del(Commands.COMPRA_OFERTA, (id_oferta, id_oferta, id_usuario_comprando, id_oferta, id_oferta))

    # UC2d - Anuncia jogo para troca (usuário inicial)
    def anunciar_jogo_troca(self, id_usuario_inicial: int, id_chave: int) -> Tuple[bool, None|str]:
        return self._common_up_in_del(Commands.ANUNCIA_TROCA, (id_usuario_inicial, id_chave))

    # UC2e - Propor jogo em troca de jogo anunciado (usuário que propôs)
    def propor_troca(self, id_troca: int, id_usuario_propos: int, id_chave: int) -> Tuple[bool, None|str]:
        return self._common_up_in_del(Commands.PROPOR_CONTRAPARTE, (id_troca, id_usuario_propos, id_chave))

    # UC2f - Visualiza as propostas feitas (usuário inicial)
    def listar_propostas_recebidas(self, id_usuario_inicial: int) -> None|list[list[str]]:
        return self._common_select(Commands.LISTAR_PROPOSTAS_RECEBIDAS, (id_usuario_inicial, ))

    # UC2g/UC2i - Remove proposta de troca (usuário inicial)/Retira proposta de troca (usuário que propôs)
    def remover_proposta(self, id_troca: int, id_usuario_propos: int, id_chave: int) -> Tuple[bool, None|str]:
        return self._common_up_in_del(Commands.REMOVE_PROPOSTA, (id_troca, id_usuario_propos, id_chave))

    # UC2h - Aceita proposta de troca (usuário inicial)
    def aceitar_troca(self, id_troca: int, id_user_iniciou: int, id_user_aceitou: int, id_chave_proposto: int, id_chave_aceito: int) -> Tuple[bool, None|str]:
        return self._common_up_in_del(Commands.ACEITAR_TROCA, (id_troca, id_user_iniciou, id_user_aceitou, id_chave_proposto, id_chave_aceito))

    # UC3 - Compra jogo da loja
    def comprar_jogo(self, id_usuario: int, id_jogo: int) -> Tuple[bool, None|str]:
        if not self.open:
            return (False, "Conexão fechada")

        # Obtém saldo do usuário
        self.cur.execute(Commands.COMPRAR_JOGO['SALDO_USUARIO'], (id_usuario,))
        saldo = self.cur.fetchone()

        if saldo is None:
            return (False, "saldo is None")

        saldo = saldo[0]

        # Obtém preço do jogo
        self.cur.execute(Commands.COMPRAR_JOGO['PRECO_JOGO'], (id_jogo,))
        preco = self.cur.fetchone()

        if preco is None:
            return (False, "preco is None")

        preco = preco[0]

        # Verifica saldo
        if saldo < preco:
            return (False, "saldo < preco")

        # Gera uma nova chave
        new_key = gen_key()

        while self._chave_existe(new_key):
            new_key = gen_key()

        # Jogo removido não pode ter novas instâncias
        try:
            self.cur.execute(Commands.COMPRAR_JOGO['CRIA_INSTANCIA'], (id_jogo, new_key))
        except sqlite3.IntegrityError as e:
            return (False, str(e))

        # Obtém ID da nova chave
        self.cur.execute(Commands.ID_CHAVE, (new_key,))

        id_chave = self.cur.fetchone()[0]

        # Adiciona jogo na biblioteca, altera saldo e lucro
        self.cur.execute(Commands.COMPRAR_JOGO['CHAVE_BIBLIOTECA'], (id_usuario, id_chave))
        # 30% de taxa do sistema
        self.cur.execute(Commands.COMPRAR_JOGO['AUMENTA_LUCRO'], (0.7*preco, id_jogo))
        self.cur.execute(Commands.COMPRAR_JOGO['DIMINUI_SALDO'], (preco, id_usuario))

        return (True, None)

    # UC4/UC6 - Gerenciador aceita jogo
    def aceitar_jogo(self, id_gerenciador: int, id_jogo: int) -> Tuple[bool, None|str]:
        return self._common_up_in_del(Commands.ACEITAR_JOGO, (id_jogo, id_gerenciador))

    # UC5 - Remove/recusa jogo da loja
    def remover_jogo(self, id_jogo: int, justificativa: str|None=None) -> Tuple[bool, None|str]:
        return self._common_up_in_del(Commands.REMOVER_JOGO, (id_jogo, justificativa))

    # UC7 - Adiciona jogo pendente
    def adicionar_jogo(self, id_desenvolvedor: int, nome: str, preco: float, descricao: str, link_imagem: str,
        tags: list[str], link_trailer: str|None=None) -> Tuple[bool, None|str]:
        if not self.open:
            return (False, "Conexão fechada")

        # Tags iguais quebram check de unicidade (id_jogo, tag)
        tags = list(set(tags))

        if len(tags) == 0:
            return (False, "Para um jogo ser adicionado deve ter tags")

        # Verifica se todas as tags existem
        for tag in tags:
            if not self._tag_valida(tag):
                return (False, "A tag '%s' não foi encontrada." % tag)

        # Adiciona jogo com pendente
        try:
            self.cur.execute(Commands.ADICIONA_JOGO, (id_desenvolvedor, nome, preco, descricao, link_imagem, link_trailer))
        except sqlite3.IntegrityError as e:
            return (False, str(e))

        # Obtém id do jogo pendente
        self.cur.execute(Commands.ID_JOGO, (nome,))
        id_jogo = self.cur.fetchone()[0]

        # Atribui as tags
        try:
            self.cur.executemany(Commands.JOGO_TAG, [(id_jogo, tag) for tag in tags])
        except sqlite3.IntegrityError as e:
            return (False, str(e))

        return (True, None)

    # UC8 - Lista lucros do desenvolvedor
    def listar_lucro(self, id_desenvolvedor: int) -> None|list[list[str]]:
        return self._common_select(Commands.LISTAR_LUCRO, (id_desenvolvedor, ))

    # UC9 - Lista para o desenvolvedor as avaliações que recebeu
    def listar_avaliacoes(self, id_desenvolvedor: int) -> None|list[list[str]]:
        return self._common_select(Commands.LISTAR_AVALIACOES, (id_desenvolvedor, ))

    # UC10a - Pesquisa jogos por nome
    def pesquisar_jogos_nome(self, nome: str) -> None|list[list[str]]:
        return self._common_select(Commands.PESQUISAR_JOGO_NOME, ('%'+nome+'%', ))

    # UC10b - Pesquisa jogos por tag
    def pesquisar_jogos_tag(self, tag: str) -> None|list[list[str]]:
        return self._common_select(Commands.PESQUISAR_JOGO_TAG, ('%'+tag+'%', ))

    # UC11 - Lista todos os jogos do usuário
    def listar_jogos_usuario(self, id_usuario: int) -> None|list[list[str]]:
        return self._common_select(Commands.LISTAR_JOGOS_USUARIO, (id_usuario, ))

    # UC12 - Dado login e password retorna id do usuário e permissão
    def login(self, login: str, password: str) -> Tuple[bool, str|Tuple[int, Permission]]:
        if not self.open:
            return (False, "Conexão fechada")

        # Obtém id do usuário
        self.cur.execute(Commands.ID_LOGIN, (login, ))
        ret = self.cur.fetchone()

        if ret is None:
            return (False, "Usuário não encontrado")

        # Com o id, login e password obtém a permissão
        id_usuario = ret[0]
        ret = self.papel_usuario(id_usuario, login, password)

        # papel_usuario retorna Tuple[bool, str|Permission], ajusta retorno
        return (True, (id_usuario, ret[1])) if ret[0] else ret

    # C. d) - Pesquisa jogos por avaliação
    def pesquisar_jogos_avaliacao(self, nota: float) -> None|list[list[str]]:
        return self._common_select(Commands.PESQUISAR_JOGO_AVALIACAO, (nota, ))

    # Soma saldo ao saldo do usuário
    def aumentar_saldo(self, id_usuario: int, saldo: float) -> Tuple[bool, None|str]:
        return self._common_up_in_del(Commands.AUMENTAR_SALDO, (saldo, id_usuario))

    # Lista todos os jogos que estão em aguardo
    def listar_jogos_em_aguardo(self) -> None|list[list[str]]:
        return self._common_select(Commands.LISTAR_JOGOS_EM_AGUARDO, ())

    # Lista todos as ofertas disponíveis
    def listar_ofertas(self) -> None|list[list[str]]:
        return self._common_select(Commands.EXIBE_OFERTAS, ())

    # Lista todos as trocas disponíveis
    def listar_trocas(self) -> None|list[list[str]]:
        return self._common_select(Commands.EXIBE_TROCAS, ())

    # Lista saldo do usuário
    def listar_saldo(self, id_usuario: int) -> None|list[list[str]]:
        return self._common_select(Commands.LISTAR_SALDO, (id_usuario, ))

    # Lista todos os jogos da loja
    def listar_jogos(self) -> None|list[list[str]]:
        return self._common_select(Commands.EXIBE_JOGOS_LOJA, ())

    def close(self) -> None:
        self.con.close()
        self.open = False
