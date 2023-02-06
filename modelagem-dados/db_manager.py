from typing import Tuple
import sqlite3
import hashlib
import string
import random

class DBManager:
    # Caracteres que podem ser usados em uma chave
    chave_letters: str = string.digits + string.ascii_letters

    def __init__(self, db_file: str=":memory:", filenames: list[str]=[], verbose=False):
        self.con = sqlite3.connect(db_file)
        self.con.create_function("md5", 1, DBManager.md5sum)
        self.con.create_function("gen_key", 0, DBManager.gen_key)
        self.cur = self.con.cursor()
        self.open: bool = True

        self.cur.execute("PRAGMA foreign_keys = ON;")
        self.commit()

        for filename in filenames:
            with open(filename, 'r') as f:
                print('[FILE]', filename)
                self.cur.executescript(f.read())
                self.commit()

    def gen_key() -> str:
        return ''.join(random.choices(DBManager.chave_letters, k=64))

    def md5sum(t: str) -> str:
        return str(hashlib.md5(t.encode('utf-8')).hexdigest())

    def commit(self) -> bool:
        if not self.open:
            return False

        self.con.commit()
        return True

    def exec(self, command: str) -> Tuple[bool, None|list[list[str]]]:
        if not self.open:
            return (False, "Conexão fechada")

        if not sqlite3.complete_statement(command):
            return (False, "Não é um statement completo")

        mat = None

        try:
            res = self.cur.execute(command)
            column_names = self.cur.description

            if column_names is not None:
                mat = [[column_name[0] for column_name in column_names]]
                records = self.cur.fetchall()
                mat.extend([row for row in records])
        except sqlite3.OperationalError as e:
            return (False, e)
        except sqlite3.IntegrityError as e:
            return (False, e)

        return (True, mat)

    def close(self) -> None:
        self.con.close()
        self.open = False


if __name__ == '__main__':
    # db = DBManager("dump.db")
    db = DBManager(filenames=['sql/tables.sql', 'sql/views.sql', 'sql/triggers.sql', 'sql/population.sql'])

    while True:
        s = input('(q=quit) > ')

        if s.lower() == 'q':
            break

        ret = db.exec(s)

        if ret[0]:
            print("Sucesso")

            if ret[1] is not None:
                for line in ret[1]:
                    for item in line:
                        print(item, end='\t')
                    print()
        else:
            print("Erro:", ret[1])

        print()

    db.close()