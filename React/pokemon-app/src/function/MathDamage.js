function MathDamage() {  
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

export default MathDamage;