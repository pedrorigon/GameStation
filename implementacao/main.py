from DBManager.DBManager import DBManager
from DBManager.helper import md5sum

# Usado para teste

def print_select_tabbed(res):
    if res is None:
        print(None)
        return

    for line in res:
        for item in line:
            print(item, end='\t')
        print()

def print_select_markdown(res):
    if res is None:
        print(None)
        return

    print('|'.join(res[0]))
    print('|'.join(['-' for i in range(len(res[0]))]))

    for line in res[1:]:
        print('|'.join([str(l) for l in line]))

if __name__ == '__main__':
    db = DBManager(filenames=['sql/tables.sql', 'sql/views.sql', 'sql/triggers.sql', 'sql/population.sql'])

    while True:
        sql_statement = input('(q=quit) > ')

        if sql_statement.lower() == 'q':
            break

        ret = db.exec(sql_statement)

        if ret[0]:
            print("Sucesso")
            print_select_tabbed(ret[1])
        else:
            print("Erro:", ret[1])

        print()

    db.close()
