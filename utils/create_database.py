from os import listdir, path
from sys import argv, exit
import sqlite3

if __name__ == '__main__':
    if len(argv) != 3:
        print('Usage:\n\t%s SQL_FILES_DIR FILENAME' % argv[0])
        exit(1)

    # Conecta com o banco de dados
    con = sqlite3.connect(argv[2])
    cur = con.cursor()

    # Por padrão as restrições de chaves externas não são aplicadas
    cur.execute("PRAGMA foreign_keys = ON;")
    con.commit()

    # Executa os comandos SQL de arquivos que terminem com .sql
    for filename in sorted([path.join(argv[1], f) for f in listdir(argv[1]) if f.endswith('.sql')]):
        with open(filename, 'r') as f:
            print('[FILE]', filename)
            cur.executescript(f.read())

    con.commit()
    con.close()
    print('Database criada em:', argv[2])
