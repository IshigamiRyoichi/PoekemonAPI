import React, { useState } from "react";
import { useTable } from "react-table";
import axios from "axios";

function delete_childElement(){
    while(document.getElementById("data-table").firstChild){
        document.getElementById("data-table").removeChild(document.getElementById("data-table").firstChild);
    }
}

function CreateInfoTable(h, obj){
    // 基本情報
    var info_table = document.createElement("table");
    info_table.className = "infotable";
    info_table.id = "info_table"
    for (var i = 0; i < 2; i++){
        var info_tr = document.createElement("tr");
        for (var c = 0; c < 4; c++){
            // カラム
            if (i == 0 && c == 0){
                var info_th = document.createElement("th");
                info_th.textContent = "図鑑番号";
                info_tr.appendChild(info_th);
            }else if (i == 0 && c == 1){
                var info_th = document.createElement("th");
                info_th.textContent = "ポケモン名";
                info_tr.appendChild(info_th);
            }else if (i == 0 && c == 2){
                var info_th = document.createElement("th");
                info_th.textContent = "タイプ1";
                info_tr.appendChild(info_th);
            }
            else if (i == 0 && c == 3){
                var info_th = document.createElement("th");
                info_th.textContent = "タイプ2";
                info_tr.appendChild(info_th);
            }

            // データ
            else if (c == 0){
                var info_td = document.createElement("td");
                info_td.textContent = obj[h].基本情報.図鑑番号;
                info_tr.appendChild(info_td);
            }else if (c == 1){
                var info_td = document.createElement("td");
                info_td.textContent = obj[h].基本情報.ポケモン名;
                info_tr.appendChild(info_td);
            }else if (c == 2){
                var info_td = document.createElement("td");
                info_td.textContent = obj[h].基本情報.タイプ1;
                info_tr.appendChild(info_td);
            }
            else if (c == 3){
                var info_td = document.createElement("td");
                info_td.textContent = obj[h].基本情報.タイプ2;
                info_tr.appendChild(info_td);
            }
        }
        info_table.appendChild(info_tr);
    }
    document.getElementById("data-table").appendChild(info_table);  
    }  


function CreateStatusTable(h, obj) {
    // ステータス
    var status_table = document.createElement("table");
    status_table.className = "infotable";
    status_table.id = "status_table";
    for (var i = 0; i < 2; i++){
        var status_tr = document.createElement("tr");
        for (var c = 0; c < 6; c++){
            // カラム
            if (i == 0 && c == 0){
                var status_th = document.createElement("th");
                status_th.textContent = "HP";
                status_tr.appendChild(status_th);
            }
            else if (i == 0 && c == 1){
                var status_th = document.createElement("th");
                status_th.textContent = "攻撃";
                status_tr.appendChild(status_th);
            }
            else if (i == 0 && c == 2){
                var status_th = document.createElement("th");
                status_th.textContent = "防御";
                status_tr.appendChild(status_th);
            }
            else if (i == 0 && c == 3){
                var status_th = document.createElement("th");
                status_th.textContent = "特殊";
                status_tr.appendChild(status_th);
            }
            else if (i == 0 && c == 4){
                var status_th = document.createElement("th");
                status_th.textContent = "特防";
                status_tr.appendChild(status_th);
            }
            else if (i == 0 && c == 5){
                var status_th = document.createElement("th");
                status_th.textContent = "素早さ";
                status_tr.appendChild(status_th);
            }

            // データ
            else if (c == 0){
                var status_td = document.createElement("td");
                status_td.textContent = obj[h].ステータス.h;
                status_tr.appendChild(status_td);
            }
            else if (c == 1){
                var status_td = document.createElement("td");
                status_td.textContent = obj[h].ステータス.a;
                status_tr.appendChild(status_td);
            }
            else if (c == 2){
                var status_td = document.createElement("td");
                status_td.textContent = obj[h].ステータス.b;
                status_tr.appendChild(status_td);
            }
            else if (c == 3){
                var status_td = document.createElement("td");
                status_td.textContent = obj[h].ステータス.c;
                status_tr.appendChild(status_td);
            }
            else if (c == 4){
                var status_td = document.createElement("td");
                status_td.textContent = obj[h].ステータス.d;
                status_tr.appendChild(status_td);
            }
            else if (c == 5){
                var status_td = document.createElement("td");
                status_td.textContent = obj[h].ステータス.s;
                status_tr.appendChild(status_td);
            }  
        }
        status_table.appendChild(status_tr);
    }
    document.getElementById("data-table").appendChild(status_table);
}


function CreateWazaTable(h, obj) {
    // ステータス
    var waza_table = document.createElement("table");
    waza_table.className = "infotable";
    waza_table.id = "waza_table";
    var waza_tr = document.createElement("tr");
    for (var c = 0; c < 8; c++){
        // カラム
        if (c == 0){
            var waza_th = document.createElement("th");
            waza_th.textContent = "技名";
            waza_tr.appendChild(waza_th);
        }else if (c == 1){
            var waza_th = document.createElement("th");
            waza_th.textContent = "必要なレベル";
            waza_tr.appendChild(waza_th);
        }
        else if (c == 2){
            var waza_th = document.createElement("th");
            waza_th.textContent = "タイプ";
            waza_tr.appendChild(waza_th);
        }
        else if (c == 3){
            var waza_th = document.createElement("th");
            waza_th.textContent = "分類";
            waza_tr.appendChild(waza_th);
        }
        else if (c == 4){
            var waza_th = document.createElement("th");
            waza_th.textContent = "威力";
            waza_tr.appendChild(waza_th);
        }
        else if (c == 5){
            var waza_th = document.createElement("th");
            waza_th.textContent = "命中";
            waza_tr.appendChild(waza_th);
        }
        else if (c == 6){
            var waza_th = document.createElement("th");
            waza_th.textContent = "PP";
            waza_tr.appendChild(waza_th);
        }
        else if (c == 7){
            var waza_th = document.createElement("th");
            waza_th.textContent = "効果";
            waza_tr.appendChild(waza_th);
        }
    }
    waza_table.appendChild(waza_tr);
    var keyList = Object.keys(obj[h].覚える技.レベルアップで覚える技)
    for (var k in keyList){
        var waza_tr = document.createElement("tr");
        for (var c = 0; c < 8; c++){
            // カラム
            if (c == 0){
                var waza_td = document.createElement("td");
                waza_td.textContent = keyList[k];
                waza_tr.appendChild(waza_td);
            }
            else if (c == 1){
                var waza_td = document.createElement("td");
                waza_td.textContent = obj[h]["覚える技"]["レベルアップで覚える技"][keyList[k]]["必要なLV"];
                waza_tr.appendChild(waza_td);
            }
            else if (c == 2){
                var waza_td = document.createElement("td");
                waza_td.textContent = obj[h]["覚える技"]["レベルアップで覚える技"][keyList[k]]["技詳細"]["タイプ"];
                waza_tr.appendChild(waza_td);
            }
            else if (c == 3){
                var waza_td = document.createElement("td");
                waza_td.textContent = obj[h]["覚える技"]["レベルアップで覚える技"][keyList[k]]["技詳細"]["分類"];
                waza_tr.appendChild(waza_td);
            }
            else if (c == 4){
                var waza_td = document.createElement("td");
                waza_td.textContent = obj[h]["覚える技"]["レベルアップで覚える技"][keyList[k]]["技詳細"]["威力"];
                waza_tr.appendChild(waza_td);
            }
            else if (c == 5){
                var waza_td = document.createElement("td");
                waza_td.textContent = obj[h]["覚える技"]["レベルアップで覚える技"][keyList[k]]["技詳細"]["命中"];
                waza_tr.appendChild(waza_td);
            }
            else if (c == 6){
                var waza_td = document.createElement("td");
                waza_td.textContent = obj[h]["覚える技"]["レベルアップで覚える技"][keyList[k]]["技詳細"]["PP"];
                waza_tr.appendChild(waza_td);
            }
            else if (c == 7){
                var waza_td = document.createElement("td");
                waza_td.textContent = obj[h]["覚える技"]["レベルアップで覚える技"][keyList[k]]["技詳細"]["効果"];
                waza_tr.appendChild(waza_td);
            }
        }
        waza_table.appendChild(waza_tr);
    }
    document.getElementById("data-table").appendChild(waza_table);

    var waza_table = document.createElement("table");
    waza_table.className = "infotable";
    waza_table.id = "waza_table";
    var waza_tr = document.createElement("tr");
    for (var c = 0; c < 8; c++){
        // カラム
        if (c == 0){
            var waza_th = document.createElement("th");
            waza_th.textContent = "技名";
            waza_tr.appendChild(waza_th);
        }else if (c == 1){
            var waza_th = document.createElement("th");
            waza_th.textContent = "マシーン番号";
            waza_tr.appendChild(waza_th);
        }
        else if (c == 2){
            var waza_th = document.createElement("th");
            waza_th.textContent = "タイプ";
            waza_tr.appendChild(waza_th);
        }
        else if (c == 3){
            var waza_th = document.createElement("th");
            waza_th.textContent = "分類";
            waza_tr.appendChild(waza_th);
        }
        else if (c == 4){
            var waza_th = document.createElement("th");
            waza_th.textContent = "威力";
            waza_tr.appendChild(waza_th);
        }
        else if (c == 5){
            var waza_th = document.createElement("th");
            waza_th.textContent = "命中";
            waza_tr.appendChild(waza_th);
        }
        else if (c == 6){
            var waza_th = document.createElement("th");
            waza_th.textContent = "PP";
            waza_tr.appendChild(waza_th);
        }
        else if (c == 7){
            var waza_th = document.createElement("th");
            waza_th.textContent = "効果";
            waza_tr.appendChild(waza_th);
        }
    }
    waza_table.appendChild(waza_tr);
    var keyList = Object.keys(obj[h].覚える技.技マシーンで覚える技)
    for (var k in keyList){
        var waza_tr = document.createElement("tr");
        for (var c = 0; c < 8; c++){
            // カラム
            if (c == 0){
                var waza_td = document.createElement("td");
                waza_td.textContent = keyList[k];
                waza_tr.appendChild(waza_td);
            }
            else if (c == 2){
                var waza_td = document.createElement("td");
                waza_td.textContent = obj[h]["覚える技"]["技マシーンで覚える技"][keyList[k]]["技マシーン番号"];
                waza_tr.appendChild(waza_td);
            }
            else if (c == 2){
                var waza_td = document.createElement("td");
                waza_td.textContent = obj[h]["覚える技"]["技マシーンで覚える技"][keyList[k]]["技詳細"]["タイプ"];
                waza_tr.appendChild(waza_td);
            }
            else if (c == 3){
                var waza_td = document.createElement("td");
                waza_td.textContent = obj[h]["覚える技"]["技マシーンで覚える技"][keyList[k]]["技詳細"]["分類"];
                waza_tr.appendChild(waza_td);
            }
            else if (c == 4){
                var waza_td = document.createElement("td");
                waza_td.textContent = obj[h]["覚える技"]["技マシーンで覚える技"][keyList[k]]["技詳細"]["威力"];
                waza_tr.appendChild(waza_td);
            }
            else if (c == 5){
                var waza_td = document.createElement("td");
                waza_td.textContent = obj[h]["覚える技"]["技マシーンで覚える技"][keyList[k]]["技詳細"]["命中"];
                waza_tr.appendChild(waza_td);
            }
            else if (c == 6){
                var waza_td = document.createElement("td");
                waza_td.textContent = obj[h]["覚える技"]["技マシーンで覚える技"][keyList[k]]["技詳細"]["PP"];
                waza_tr.appendChild(waza_td);
            }
            else if (c == 7){
                var waza_td = document.createElement("td");
                waza_td.textContent = obj[h]["覚える技"]["技マシーンで覚える技"][keyList[k]]["技詳細"]["効果"];
                waza_tr.appendChild(waza_td);
            }
        }
        waza_table.appendChild(waza_tr);
    }
    document.getElementById("data-table").appendChild(waza_table);


    var waza_table = document.createElement("table");
    waza_table.className = "infotable";
    waza_table.id = "waza_table";
    var waza_tr = document.createElement("tr");
    for (var c = 0; c < 7; c++){
        // カラム
        if (c == 0){
            var waza_th = document.createElement("th");
            waza_th.textContent = "技名";
            waza_tr.appendChild(waza_th);
        }
        else if (c == 1){
            var waza_th = document.createElement("th");
            waza_th.textContent = "タイプ";
            waza_tr.appendChild(waza_th);
        }
        else if (c == 2){
            var waza_th = document.createElement("th");
            waza_th.textContent = "分類";
            waza_tr.appendChild(waza_th);
        }
        else if (c == 3){
            var waza_th = document.createElement("th");
            waza_th.textContent = "威力";
            waza_tr.appendChild(waza_th);
        }
        else if (c == 4){
            var waza_th = document.createElement("th");
            waza_th.textContent = "命中";
            waza_tr.appendChild(waza_th);
        }
        else if (c == 5){
            var waza_th = document.createElement("th");
            waza_th.textContent = "PP";
            waza_tr.appendChild(waza_th);
        }
        else if (c == 6){
            var waza_th = document.createElement("th");
            waza_th.textContent = "効果";
            waza_tr.appendChild(waza_th);
        }
    }
    waza_table.appendChild(waza_tr);
    var keyList = Object.keys(obj[h].覚える技.タマゴ技)
    for (var k in keyList){
        var waza_tr = document.createElement("tr");
        for (var c = 0; c < 7; c++){
            // カラム
            if (c == 0){
                var waza_td = document.createElement("td");
                waza_td.textContent = keyList[k];
                waza_tr.appendChild(waza_td);
            }
            else if (c == 1){
                var waza_td = document.createElement("td");
                waza_td.textContent = obj[h]["覚える技"]["タマゴ技"][keyList[k]]["技詳細"]["タイプ"];
                waza_tr.appendChild(waza_td);
            }
            else if (c == 2){
                var waza_td = document.createElement("td");
                waza_td.textContent = obj[h]["覚える技"]["タマゴ技"][keyList[k]]["技詳細"]["分類"];
                waza_tr.appendChild(waza_td);
            }
            else if (c == 3){
                var waza_td = document.createElement("td");
                waza_td.textContent = obj[h]["覚える技"]["タマゴ技"][keyList[k]]["技詳細"]["威力"];
                waza_tr.appendChild(waza_td);
            }
            else if (c == 4){
                var waza_td = document.createElement("td");
                waza_td.textContent = obj[h]["覚える技"]["タマゴ技"][keyList[k]]["技詳細"]["命中"];
                waza_tr.appendChild(waza_td);
            }
            else if (c == 5){
                var waza_td = document.createElement("td");
                waza_td.textContent = obj[h]["覚える技"]["タマゴ技"][keyList[k]]["技詳細"]["PP"];
                waza_tr.appendChild(waza_td);
            }
            else if (c == 6){
                var waza_td = document.createElement("td");
                waza_td.textContent = obj[h]["覚える技"]["タマゴ技"][keyList[k]]["技詳細"]["効果"];
                waza_tr.appendChild(waza_td);
            }
        }
        waza_table.appendChild(waza_tr);
    }
    document.getElementById("data-table").appendChild(waza_table);
}



// function createDivList(hit) {
//     var div_list = [];
//     for (var i=1; i<=hit; i++){
//         var div_id = "stutaus-table" + i;
//         div_list.push(<div id={div_id}></div>)
//     }
//     return div_list
// }

function SearchPokemon() {  
    const [pokemon_id, setpokemon_id] = useState("");
    const [pokemon_name, setpokemon_name] = useState("");
    const [pokemon_type1, setpokemon_type1] = useState("");
    const [pokemon_type2, setpokemon_type2] = useState("");
    const [hit, setHit] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("hoge");
        var url = "http://localhost:8080/pokemon_serch/?";
        if (pokemon_id != ""){
            url += "pokemon_id=" + pokemon_id + "&";
        }
        if (pokemon_name != ""){
            url += "pokemon_name=" + pokemon_name + "&";
        }
        if (pokemon_type1 != ""){
            url += "type1=" + pokemon_type1 + "&";
        }
        if (pokemon_type2 != ""){
            url += "type2=" + pokemon_type2 + "&";
        }

        if (url != "localhost:8080/pokemon_serch/?"){
            axios.get(url).then((res) => {
                const convert_json = JSON.stringify(res.data);
                const obj = JSON.parse(convert_json);
                console.log(obj);
                console.log(obj.length);
                delete_childElement();
                setHit(1);
                for (var h = 0; h < hit; h++){
                    CreateInfoTable(h, obj);
                    CreateStatusTable(h, obj);
                    CreateWazaTable(h, obj);
                }
            });
        }
    };

    const handlePokemonID = (e) => {
        setpokemon_id(e.target.value);
    };
    const handlePokemonName = (e) => {
        setpokemon_name(e.target.value);
    };
    const handlePokemonType1 = (e) => {
        setpokemon_type1(e.target.value);
    };
    const handlePokemonType2 = (e) => {
        setpokemon_type2(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* <h2>pokemon_id:{pokemon_id}</h2>
            <h2>pokemon_name:{pokemon_name}</h2>
            <h2>pokemon_type1:{pokemon_type1}</h2>
            <h2>pokemon_type2:{pokemon_type2}</h2> */}
            <input
                value={pokemon_id}
                onChange={handlePokemonID}
                type="text"
                placeholder="図鑑番号"
            />
            
            <input
                value={pokemon_name}
                onChange={handlePokemonName}
                type="text"
                placeholder="ポケモンの名前"
            />

            <input
                value={pokemon_type1}
                onChange={handlePokemonType1}
                type="text"
                placeholder="ポケモンのタイプ1"
            />

            <input
                value={pokemon_type2}
                onChange={handlePokemonType2}
                type="text"
                placeholder="ポケモンのタイプ2"
            />
            <button type="submit">送信</button>
            <br />
            <div id="data-table"></div>
        </form>
    );
}

export default SearchPokemon;