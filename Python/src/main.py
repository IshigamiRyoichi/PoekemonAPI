from fastapi import FastAPI
import mysql.connector

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

@app.get("/")
def read_root():
    return {"Hello World"}

@app.get("/pokemon_serch/")
def search_pokemon(pokemon_id: int = None, pokemon_name: str = None):
    pokemon_dic = {}
    return 

@app.get("/waza_serch/")
def search_pokemon(waza_name: str = None):
    return {"hits": {"item_id": waza_name}}