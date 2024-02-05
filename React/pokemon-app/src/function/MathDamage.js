import React, { useState } from "react";
import axios from "axios";

function delete_childElement(){
    while(document.getElementById("damage-data-table").firstChild){
        document.getElementById("damage-data-table").removeChild(document.getElementById("damage-data-table").firstChild);
    }
}

function CreateDamageTable(obj) {
    // ステータス
    var status_table = document.createElement("table");
    status_table.className = "infotable";
    status_table.id = "damage_table";
    for (var i = 0; i < 2; i++){
        var status_tr = document.createElement("tr");
        for (var c = 0; c < 2; c++){
            // カラム
            if (i == 0 && c == 0){
                var status_th = document.createElement("th");
                status_th.textContent = "最小ダメージ";
                status_tr.appendChild(status_th);
            }
            else if (i == 0 && c == 1){
                var status_th = document.createElement("th");
                status_th.textContent = "最大ダメージ";
                status_tr.appendChild(status_th);
            }

            // データ
            else if (c == 0){
                var status_td = document.createElement("td");
                status_td.textContent = obj.min_damege;
                status_tr.appendChild(status_td);
            }
            else if (c == 1){
                var status_td = document.createElement("td");
                status_td.textContent = obj.max_damege;
                status_tr.appendChild(status_td);
            }
        }
        status_table.appendChild(status_tr);
    }
    document.getElementById("damage-data-table").appendChild(status_table);
}

function MathDamage() {  
    const [attack_pokemon, setattack_pokemon] = useState("");
    const [attack_waza, setattack_waza] = useState("");
    const [attack_effort, setattack_effort] = useState("");
    const [deffense_pokemon, setdeffense_pokemon] = useState("");
    const [deffense_effort, setdeffense_effort] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("hoge");
        var url = "http://localhost:8080/math_damege/" + attack_pokemon + "/" + attack_waza + "/" + attack_effort + "/" + deffense_pokemon + "/" + deffense_effort;
        if (url != "localhost:8080/math_damege/"){
            axios.get(url).then((res) => {
                const convert_json = JSON.stringify(res.data);
                const obj = JSON.parse(convert_json);
                delete_childElement();
                CreateDamageTable(obj);
            });
        }
    };

    const handleAttackPokemon = (e) => {
        setattack_pokemon(e.target.value);
    };
    const handleAttackWaza = (e) => {
        setattack_waza(e.target.value);
    };
    const handleAttackEffort = (e) => {
        setattack_effort(e.target.value);
    };
    const handleDeffensePokemon = (e) => {
        setdeffense_pokemon(e.target.value);
    };
    const handleDeffenseEffort = (e) => {
        setdeffense_effort(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={attack_pokemon}
                onChange={handleAttackPokemon}
                type="text"
                placeholder="攻撃側のポケモン"
            />
            
            <input
                value={attack_waza}
                onChange={handleAttackWaza}
                type="text"
                placeholder="攻撃技"
            />

            <input
                value={attack_effort}
                onChange={handleAttackEffort}
                type="text"
                placeholder="攻撃の努力値"
            />

            <input
                value={deffense_pokemon}
                onChange={handleDeffensePokemon}
                type="text"
                placeholder="防御側のポケモン"
            />

            <input
                value={deffense_effort}
                onChange={handleDeffenseEffort}
                type="text"
                placeholder="防御の努力値"
            />
            <button type="submit">送信</button>
            <br />
            <div id="damage-data-table"></div>
        </form>
    );
}

export default MathDamage;