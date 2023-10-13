import requests
import bs4
import re
import pandas as pd
import io
import mysql.connector
import time

status_list = ["HP", "こうげき", "ぼうぎょ", "とくこう", "とくぼう", "すばやさ"]

def sv_pokemon_list(url: str):
    headers = {"User-Agent": "hoge"}
    res_race = requests.get(url, timeout=5, headers=headers)
    # エラーチェック
    res_race.raise_for_status()
    soup_race = bs4.BeautifulSoup(res_race.content, "lxml")
    pokemon_list = []
    li_list = soup_race.select(".haszukan")
    for li in li_list:
        elems = li.select("a")
        for elem in elems:
            href = elem.get("href")
            # print(href)
            if href is not None and "sv/zukan/n" in href:
                pokemon_list.append("https://yakkun.com" + href)
    return pokemon_list

def get_pokemon_status(soup_race, pokemon_id :str, pokemon_name :str):
    table = soup_race.select("table")[1]
    type_tr = soup_race.select(".type")[0]
    type_list = type_tr.find_all("img")
    pokemon_type1 = type_list[0].get("alt")

    if len(type_list) == 2:
        pokemon_type2 = type_list[1].get("alt")
    else:
        pokemon_type2 = "なし"

    pokemon_status = []
    for status in status_list:
        table_str = str(table)
        a_status = re.findall(status+".*<span", table_str)[0]
        pokemon_status.append(int(re.findall("/>.*", a_status)[0][3:-5]))
    return [pokemon_id, pokemon_name, pokemon_type1, pokemon_type2, pokemon_status[0], pokemon_status[1], pokemon_status[2], pokemon_status[3], pokemon_status[4], pokemon_status[5], True]

def check_waza_how(waza :str):
    if "Lv" in waza:
        return "lv"
    elif "マシン" in waza:
        return "wm"
    else:
        return "eg"
    
def check_waza_num(waza :str):
    return int(re.sub(r"\D", "", waza).zfill(3))

def get_waza_list(soup_race, pokemon_id :str , pokemon_name :str):
    table_move = soup_race.find_all("table", id="move_list")[0]
    table_move = re.sub('<tr class="move_head" data-label="技マシン" id="machine_move">.*</tr>', '', str(table_move))
    table_move = re.sub('<tr class="move_head" data-label="タマゴ技" id="egg_move">.*</tr>', '', str(table_move))
    table_move = re.sub('<span class="needless space_left">.*遺伝経路</a>]</span>', '', str(table_move))
    table_move = re.sub('<tr><td colspan="7"><span class="small im">※性別不明や遺伝経路がないタマゴ技は<a href="/bw/tamago.htm#copy">ものまねハーブでコピー</a>できます。</span></td></tr>', '', str(table_move))
    table_move = re.sub('<tr class="move_head" data-label="レベル技" id="level_move"><th class="left" colspan="7">.*</th></tr>', '', table_move)
    table_move = re.sub('<th class="c1">タイプ</th>', '<th class="c1">覚え方</th><th class="c1">技名</th><th class="c1">タイプ</th>', str(table_move))
    table_move = re.sub('<tr class="move_head partition" id="past_move">(.|\s)*?</table>', '</table>',str(table_move))
    table_move = table_move.replace('</tr>\n<tr class="move_detail_row">', '').replace('colspan="7"', "").replace('基本', 'Lv.<span class="value">1</span>')
    # print(table_move)

    with io.StringIO(table_move) as f:
        df = pd.read_html(f)[0]

    df.drop(df.loc[pd.isnull(df["覚え方"]) | pd.isnull(df["技名"])].index, inplace=True)
    df = df.reset_index(drop=True).copy()
    df["waza_how"] = df["覚え方"].map(lambda x: check_waza_how(x))
    df["waza_num"] = df["覚え方"].map(lambda x: check_waza_num(x))

    pokemon_learn_waza = []

    for i in range(len(df)):
        pokemon_learn_waza.append([pokemon_id, pokemon_name, df.at[i,"技名"], df.at[i,"waza_how"], str(df.at[i,"waza_num"]), True])
    # print(pokemon_learn_waza)
    return pokemon_learn_waza

def get_pokemon_info(pokemon_url :str):
    pokemon_id = pokemon_url.replace("https://yakkun.com/sv/zukan/n", "")
    print("====pokemon ID====")
    print(pokemon_id)
    headers = {"User-Agent": "hoge"}
    res_race = requests.get(pokemon_url, timeout=5, headers=headers)
    # エラーチェック
    res_race.raise_for_status()
    soup_race = bs4.BeautifulSoup(res_race.content, "lxml")
    pokemon_name = soup_race.select("tr")[1].find("img").get("alt")
    pokemon_status = get_pokemon_status(soup_race, pokemon_id, pokemon_name)
    pokemon_learn_waza = get_waza_list(soup_race, pokemon_id, pokemon_name)
    return pokemon_status, pokemon_learn_waza

# def create_direct_flag(direct :str):
#     if "直○" == direct:
#         return True
#     return False

# def create_guard_flag(guard :str):
#     if "守○" == guard:
#         return True
#     return False

def get_pokemon_waza(waza_url :str):
    headers = {"User-Agent": "hoge"}
    res_race = requests.get(waza_url, timeout=1, headers=headers)
    # エラーチェック
    res_race.raise_for_status()
    soup_race = bs4.BeautifulSoup(res_race.content, "lxml")
    waza_table = soup_race.select('[class="center stupidtable stupidtable_common stupidtable_move_list"]')[0]
    waza_table = re.sub('</tr>\n<tr class="no_sticky">', "", str(waza_table))
    waza_table = re.sub('</tr>\n<tr class="sort_tr_next">', "", str(waza_table))
    with io.StringIO(waza_table) as f:
        df = pd.read_html(f)[0]
    # df.to_csv("./check.csv")
    df["威力"] = df["威力"].map(lambda x: 0 if "-" == x else x)
    df["命中"] = df["命中"].map(lambda x: 0 if "-" == x else x)
    df["waza_direct"] = df["直接"].map(lambda x: True if "直○" == x else False)
    df["waza_guard"] = df["守る"].map(lambda x: True if "守○" == x else False)
    waza_data = [[df.at[i,"名前"], df.at[i,"タイプ"], df.at[i,"分類"], str(df.at[i,"威力"]), str(df.at[i,"命中"]), str(df.at[i,"PP"]), bool(df.at[i,"waza_direct"]), bool(df.at[i,"waza_guard"]), df.at[i,"対象"], df.at[i,"効果"], True] for i in range(len(df))]
    return waza_data

def connect_db():
    cnx = mysql.connector.connect(
        user="docker",
        password="docker",
        host="db",
        port="3306",
        db="pokemon_database"
    )
    return cnx

def insert_table_to_pokemon_status(cnx, pokemon_status_data :list):
    cursor = cnx.cursor()
    insert_cmd = "insert into pokemon_database.pokemon_status(pokemon_id, pokemon_name, type1, type2, h, a, b, c, d, s, ando) values(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
    # "insert into pokemon_database.pokemon_status(pokemon_id, pokemon_name, type1, type2, h, a, b, c, d, s, ando) values(906, "ニャオハ", "くさ", "", 40, 61, 54, 45, 45, 65, True)
    cursor.executemany(insert_cmd, pokemon_status_data)
    cnx.commit()
    cursor.close()

def insert_table_to_pokemon_learn_waza(cnx, pokemon_learn_waza_data :list):
    cursor = cnx.cursor()
    insert_cmd = "insert into pokemon_database.pokemon_learn_waza(pokemon_id, pokemon_name, waza_name, waza_how, waza_num, ando) values(%s, %s, %s, %s, %s, %s);"
    for pokemon_learn_waza in pokemon_learn_waza_data:
        print(pokemon_learn_waza)
        cursor.executemany(insert_cmd, pokemon_learn_waza)
        cnx.commit()
    cursor.close()

def insert_table_to_pokemon_waza_info(cnx, waza_data :list):
    cursor = cnx.cursor()
    insert_cmd = "insert into pokemon_database.pokemon_waza_info(waza_name, waza_type, waza_class, waza_power, waza_hit, waza_pp, waza_direct, waza_guard, waza_target, waza_effect, ando) values(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
    cursor.executemany(insert_cmd, waza_data)
    cnx.commit()
    cursor.close()

if __name__ == "__main__":
    pokemon_list = sv_pokemon_list("https://yakkun.com/sv/zukan/")
    pokemon_status_data = []
    pokemon_learn_waza_data = []
    for pokemon_url in pokemon_list:
    # for pokemon_url in ["https://yakkun.com/sv/zukan/n187"]:
        # try:
        pokemon_status, pokemon_learn_waza = get_pokemon_info(pokemon_url)
        pokemon_status_data.append(pokemon_status)
        pokemon_learn_waza_data.append(pokemon_learn_waza)
        # except:
        #     print("アクセスエラー")
        time.sleep(0.5)
    waza_data = get_pokemon_waza("https://yakkun.com/sv/move_list.htm")
    cnx = connect_db()
    insert_table_to_pokemon_status(cnx, pokemon_status_data)
    insert_table_to_pokemon_learn_waza(cnx, pokemon_learn_waza_data)
    insert_table_to_pokemon_waza_info(cnx, waza_data)