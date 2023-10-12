import mysql.connector

def connect_db():
    cnx = mysql.connector.connect(
        user="docker",
        password="docker",
        host="db",
        port="3306",
        db="pokemon_database"
    )
    return cnx
    # cnx.cursor()
    # select_cmd = "select * from pokemon_database.pokemon_status"
    # cursor.execute(select_cmd)
    # return cursor

def create_tables(cnx):
    cursor = cnx.cursor()
    create_cmd = '''
        CREATE TABLE pokemon_database.pokemon_status (
            pokemon_id integer primary key,
            pokemon_name char(25),
            type1 char(10),
            type2 char(10),
            h integer,
            a integer,
            b integer,
            c integer,
            d integer,
            s integer,
            ando bool
        )'''
    cursor.execute(create_cmd)

    create_cmd = '''
        CREATE TABLE pokemon_database.pokemon_learn_waza (
            id integer auto_increment primary key,
            pokemon_id integer,
            pokemon_name char(25),
            waza_name char(25),
            waza_how char(2),
            waza_num integer,
            ando bool
        )'''
    cursor.execute(create_cmd)

    create_cmd = '''
        CREATE TABLE pokemon_database.pokemon_waza_info (
            id integer auto_increment primary key,
            waza_name char(25),
            waza_type char(10),
            waza_class char(2),
            waza_power integer,
            waza_hit integer,
            waza_pp integer,
            waza_direct bool,
            waza_guard bool,
            waza_target char(10),
            waza_effect text,
            ando bool
        )'''
    cursor.execute(create_cmd)

def test_select(cursor):
    select_cmd = "select * from pokemon_database.pokemon_status"
    cursor.execute(select_cmd)

if __name__ == "__main__":
    cnx = connect_db()
    # print(cursor)
    create_tables(cnx)
    # test_select(cursor)
    # cursor.close()