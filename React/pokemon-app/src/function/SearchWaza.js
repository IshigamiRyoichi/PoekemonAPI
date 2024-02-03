import React, { useState } from "react";
import { useTable } from "react-table";
import axios from "axios";

function delete_childElement(){
    while(document.getElementById("waza-data-table").firstChild){
        document.getElementById("waza-data-table").removeChild(document.getElementById("waza-data-table").firstChild);
    }
}

function CreateWazaTable(h, obj) {
    // ステータス
    var waza_table = document.createElement("table");
    waza_table.className = "infotable";
    waza_table.id = "waza_table";
    var waza_tr = document.createElement("tr");
    for (var c = 0; c < 10; c++){
        // カラム
        if (c == 0){
            var waza_th = document.createElement("th");
            waza_th.textContent = "技名";
            waza_tr.appendChild(waza_th);
        }else if (c == 1){
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
            waza_th.textContent = "直接攻撃か";
            waza_tr.appendChild(waza_th);
        }
        else if (c == 7){
            var waza_th = document.createElement("th");
            waza_th.textContent = "守れるか";
            waza_tr.appendChild(waza_th);
        }
        else if (c == 8){
            var waza_th = document.createElement("th");
            waza_th.textContent = "攻撃範囲";
            waza_tr.appendChild(waza_th);
        }
        else if (c == 9){
            var waza_th = document.createElement("th");
            waza_th.textContent = "効果";
            waza_tr.appendChild(waza_th);
        }
    }
    waza_table.appendChild(waza_tr);
    // var keyList = Object.keys(obj[h].覚える技.レベルアップで覚える技)
    // for (var k in keyList){
    var waza_tr = document.createElement("tr");
    for (var c = 0; c < 10; c++){
        // カラム
        if (c == 0){
            var waza_td = document.createElement("td");
            waza_td.textContent = obj[h]["技名"];
            waza_tr.appendChild(waza_td);
        }
        else if (c == 1){
            var waza_td = document.createElement("td");
            waza_td.textContent = obj[h]["タイプ"];
            waza_tr.appendChild(waza_td);
        }
        else if (c == 2){
            var waza_td = document.createElement("td");
            waza_td.textContent = obj[h]["分類"];
            waza_tr.appendChild(waza_td);
        }
        else if (c == 3){
            var waza_td = document.createElement("td");
            waza_td.textContent = obj[h]["威力"];
            waza_tr.appendChild(waza_td);
        }
        else if (c == 4){
            var waza_td = document.createElement("td");
            waza_td.textContent = obj[h]["命中"];
            waza_tr.appendChild(waza_td);
        }
        else if (c == 5){
            var waza_td = document.createElement("td");
            waza_td.textContent = obj[h]["PP"];
            waza_tr.appendChild(waza_td);
        }
        else if (c == 6){
            var waza_td = document.createElement("td");
            waza_td.textContent = obj[h]["直接攻撃か"];
            waza_tr.appendChild(waza_td);
        }
        else if (c == 7){
            var waza_td = document.createElement("td");
            waza_td.textContent = obj[h]["守れるか"];
            waza_tr.appendChild(waza_td);
        }
        else if (c == 8){
            var waza_td = document.createElement("td");
            waza_td.textContent = obj[h]["攻撃範囲"];
            waza_tr.appendChild(waza_td);
        }
        else if (c == 7){
            var waza_td = document.createElement("td");
            waza_td.textContent = obj[h]["効果"];
            waza_tr.appendChild(waza_td);
        }
        waza_table.appendChild(waza_tr);
    }
    document.getElementById("waza-data-table").appendChild(waza_table);

}

function SearchWaza() {  
    const [waza_name, setwaza_name] = useState("");
    const [waza_type, setwaza_type] = useState("");
    const [waza_class, setwaza_class] = useState("");
    const [hit, setHit] = useState(1);

    const handleWazaSubmit = (e) => {
        e.preventDefault();
        console.log("hoge");
        var url = "http://localhost:8080/waza_serch/?";
        if (waza_name != ""){
            url += "waza_name=" + waza_name + "&";
        }
        if (waza_type != ""){
            url += "waza_type=" + waza_type + "&";
        }
        if (waza_class != ""){
            url += "waza_class=" + waza_class + "&";
        }

        if (url != "localhost:8080/waza_serch/?"){
            axios.get(url).then((res) => {
                const convert_json = JSON.stringify(res.data);
                const obj = JSON.parse(convert_json);
                console.log(obj);
                console.log(obj.length);
                delete_childElement();
                setHit(obj.length);
                for (var h = 0; h < hit; h++){
                    CreateWazaTable(h, obj);
                }
            });
        }
    };

    const handleWazaName = (e) => {
        setwaza_name(e.target.value);
    };
    const handleWazaType = (e) => {
        setwaza_type(e.target.value);
    };
    const handleWazaClass = (e) => {
        setwaza_class(e.target.value);
    };

    return (
        <form onSubmit={handleWazaSubmit}>
            <input
                value={waza_name}
                onChange={handleWazaName}
                type="text"
                placeholder="技の名前"
            />

            <input
                value={waza_type}
                onChange={handleWazaType}
                type="text"
                placeholder="技のタイプ"
            />

            <input
                value={waza_class}
                onChange={handleWazaClass}
                type="text"
                placeholder="技の種類"
            />
            <button type="submit">送信</button>
            <br />
            <div id="waza-data-table"></div>
        </form>
    );
}

export default SearchWaza;