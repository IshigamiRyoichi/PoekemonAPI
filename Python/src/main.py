from fastapi import FastAPI
import mysql.connector
# from pydantic import BaseModel
import math
import pandas as pd

app = FastAPI()

def connect_db():
    cnx = mysql.connector.connect(
        user="docker",
        password="docker",
        host="db",
        port="3306",
        db="pokemon_database"
    )
    return cnx

def get_waza_info(cnx, waza_name: str):
    cursor = cnx.cursor()
    select_cmd = "select waza_type, waza_class, waza_power, waza_hit, waza_pp, waza_effect from pokemon_waza_info where ando = 1 and waza_name = '" + waza_name + "'"
    cursor.execute(select_cmd)
    try:
        waza_data = cursor.fetchall()[0]
        # print(cursor.fetchall())
        return {"タイプ":waza_data[0], "分類":waza_data[1],"威力":waza_data[2],"命中":waza_data[3],"PP":waza_data[4],"効果":waza_data[5]}
    except:
        return "error"

def get_leran_waza(cnx, pokemon_id: str):
    cursor = cnx.cursor()
    leran_waza_dic = {}
    leran_waza_lv = {}
    leran_waza_wm = {}
    leran_waza_eg = {}
    select_lv_cmd = "select waza_name, waza_num from pokemon_learn_waza where ando = 1 and waza_how = 'lv' and pokemon_id = '" + pokemon_id + "'"
    select_wm_cmd = "select waza_name, waza_num from pokemon_learn_waza where ando = 1 and waza_how = 'wm' and pokemon_id = '" + pokemon_id + "'"
    select_eg_cmd = "select waza_name, waza_num from pokemon_learn_waza where ando = 1 and waza_how = 'eg' and pokemon_id = '" + pokemon_id + "'"
    cursor.execute(select_lv_cmd)
    for waza_data in cursor.fetchall():
        leran_waza_lv[waza_data[0]] = {"必要なLV":waza_data[1], "技詳細":get_waza_info(cnx, waza_data[0])}
    cursor.execute(select_wm_cmd)
    for waza_data in cursor.fetchall():
        leran_waza_wm[waza_data[0]] = {"技マシーン番号":waza_data[1], "技詳細":get_waza_info(cnx, waza_data[0])}
    cursor.execute(select_eg_cmd)
    for waza_data in cursor.fetchall():
        leran_waza_eg[waza_data[0]] = {"技詳細":get_waza_info(cnx, waza_data[0])}
    leran_waza_dic["レベルアップで覚える技"] = leran_waza_lv
    leran_waza_dic["技マシーンで覚える技"] = leran_waza_wm
    leran_waza_dic["タマゴ技"] = leran_waza_eg
    return leran_waza_dic

def get_pokemon_status(cnx, pokemon_id: str, pokemon_name: str, type1: str, type2: str):
    cursor = cnx.cursor()
    where_cmd = "ando = 1"
    if pokemon_id != None:
        where_cmd += " and pokemon_id = {0}".format(pokemon_id)
    if pokemon_name != None:
        where_cmd += " and pokemon_name = '{0}'".format(pokemon_name)
    if type1 != None:
        where_cmd += " and (type1 = '{0}' or type2 = '{0}')".format(type1)
    if type2 != None:
        where_cmd += " and (type1 = '{0}' or type2 = '{0}')".format(type2)
    select_cmd = "select pokemon_id, pokemon_name, type1, type2, h, a,b, c, d, s from pokemon_database.pokemon_status where {0}".format(where_cmd)
    cursor.execute(select_cmd)
    pokemon_dic = {}
    for i, pokemon_data in enumerate(cursor.fetchall()):
        pokemon_dic["hit"+str(i+1)] = {"基本情報":{"図鑑番号":pokemon_data[0] ,"ポケモン名":pokemon_data[1], "タイプ1":pokemon_data[2], "タイプ2":pokemon_data[3]}, "ステータス":{ "h":pokemon_data[4], "a":pokemon_data[5], "b":pokemon_data[6], "c":pokemon_data[7], "d":pokemon_data[8], "s":pokemon_data[9]}, "覚える技":get_leran_waza(cnx, pokemon_data[0])}
    return pokemon_dic

def get_waza_data_all(cnx, waza_name:str, waza_type:str, waza_class:str):
    cursor = cnx.cursor()
    where_cmd = "ando = 1"
    if waza_name != None:
        where_cmd += " and waza_name = '{0}'".format(waza_name)
    if waza_type != None:
        where_cmd += " and waza_type = '{0}'".format(waza_type)
    if waza_class != None:
        where_cmd += " and waza_class = '{0}'".format(waza_class)
    select_cmd = "select waza_name, waza_type, waza_class, waza_power, waza_hit, waza_pp, waza_direct, waza_guard, waza_target, waza_effect from pokemon_waza_info where {0}".format(where_cmd)
    cursor.execute(select_cmd)
    waza_dic = {}
    for i, waza_data in enumerate(cursor.fetchall()):
        waza_dic["hit"+str(i+1)] = {"技名":waza_data[0], "タイプ":waza_data[1], "分類":waza_data[2],"威力":waza_data[3],"命中":waza_data[4],"PP":waza_data[5],"直接攻撃か":waza_data[6], "守れるか":waza_data[7], "攻撃範囲":waza_data[8],"効果":waza_data[9]}
    return waza_dic

def get_waza_data(cnx, waza_name: str):
    cursor = cnx.cursor()
    select_cmd = "select waza_power, waza_class, waza_type from pokemon_database.pokemon_waza_info where ando = 1 and waza_name = '{0}'".format(waza_name)
    cursor.execute(select_cmd)
    waza = cursor.fetchone()
    return waza[0], waza[1], waza[2]

def get_atack_status(cnx, pokemon_name: str, waza_class: str):
    cursor = cnx.cursor()
    if waza_class == "物理":
        select_cmd = "select a, type1, type2 from pokemon_database.pokemon_status where ando = 1 and pokemon_name = '{0}'".format(pokemon_name)
    elif waza_class == "特殊":
        select_cmd = "select c, type1, type2  from pokemon_database.pokemon_status where ando = 1 and pokemon_name = '{0}'".format(pokemon_name)
    else:
        return 0
    cursor.execute(select_cmd)
    pokemon_data = cursor.fetchone() 
    return pokemon_data[0], pokemon_data[1], pokemon_data[2]

def get_defense_status(cnx, pokemon_name: str, waza_class: str):
    cursor = cnx.cursor()
    if waza_class == "物理":
        select_cmd = "select b, type1, type2 from pokemon_database.pokemon_status where ando = 1 and pokemon_name = '{0}'".format(pokemon_name)
    elif waza_class == "特殊":
        select_cmd = "select d, type1, type2 from pokemon_database.pokemon_status where ando = 1 and pokemon_name = '{0}'".format(pokemon_name)
    else:
        return 0
    cursor.execute(select_cmd)
    pokemon_data = cursor.fetchone()
    return pokemon_data[0], pokemon_data[1], pokemon_data[2]

def math_attribute_value(status: int, effort: int):
    # 正確補正はまだ
    return ((status * 2 + 31 + effort / 4) * 50 / 100 + 5)

def type_match(waza_type: str, atack_type1: str, atack_type2: str):
    if waza_type == atack_type1 or waza_type == atack_type2:
        return 1.5
    return 1

def type_compatibility(waza_type: str, defense_type1: str, defense_type2: str):
    type_list_df = pd.read_csv("./type_list.csv")
    type_index = type_list_df.loc[type_list_df["タイプ"] == waza_type].index[0]
    print(type_index)
    return type_list_df.loc[type_index, defense_type1] * type_list_df.loc[type_index, defense_type2]

@app.get("/")
def read_root():
    return {"Hello World"}

@app.get("/pokemon_serch/")
def search_pokemon(pokemon_id: str = None, pokemon_name: str = None, type1: str = None, type2: str = None, fields: str = None):
    cnx = connect_db()
    pokemon_dic = get_pokemon_status(cnx, pokemon_id, pokemon_name, type1, type2)
    return pokemon_dic

@app.get("/waza_serch/")
def search_pokemon(waza_name: str = None, waza_type: str = None, waza_class: str = None):
    cnx = connect_db()
    waza_dic = get_waza_data_all(cnx, waza_name, waza_type, waza_class)
    return waza_dic

@app.get("/math_damege/{atack_pokemon}/{waza_name}/{atack_effort}/{defense_pokemon}/{defense_effort}")
def math_damege(atack_pokemon: str, waza_name: str, atack_effort: int, defense_pokemon: str, defense_effort: int):
    cnx = connect_db()
    waza_power, waza_class, waza_type = get_waza_data(cnx, waza_name)
    atack, atack_type1, atack_type2 = get_atack_status(cnx, atack_pokemon, waza_class)
    defense, defense_type1, defense_type2= get_defense_status(cnx, defense_pokemon, waza_class)
    damege = math.floor(
                math.floor(
                    math.floor(50*2/5+2)* waza_power * math_attribute_value(atack,atack_effort) / math_attribute_value(defense,defense_effort)
                )
            / 50 + 2) * type_match(waza_type, atack_type1, atack_type2) * type_compatibility(waza_type, defense_type1, defense_type2)
    return {"min_damege":math.floor(damege*0.85), "max_damege":damege}