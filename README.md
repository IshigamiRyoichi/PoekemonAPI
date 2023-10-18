# PoekemonAPI

## Docker

* build
```shell
$ docker compose up --build
```

* コンテナの停止は`Ctrl` + `D`

## 実行

* Pythonのコンテナに移動
```shell
$ docker exec -it pokemon-server bash
```

* DBの作成
```shell
$ python3 create-pokemon-db.py
```

* データ収集
```shell
$ python3 collection-pokemon-data.py
```

* APIの起動(build時に自動実行される)
```shell
$ uvicorn main:app --reload 
```

* http://127.0.0.1:8080/items/5?q=somequery でJSONレスポンスを確認可能

* http://127.0.0.1:8080/docs にアクセス

## mysql

* dockerコンテナの起動
```shell
$ docker exec -it pokemon-mysql3.0 bash
```

* mysqlに接続
```shell
$ mysql -u root -p
```

* dockerコンテナの停止
```shell
$ docker stop pokemon-mysql bash
```

* 停止したdockerコンテナの起動
```shell
$ docker start pokemon-mysql
```

### pokemon_database > pokemon_status

|colum|type|supplement|
|---|---|---|
|pokemon_id|char(10) primary key|図鑑番号 主キー|
|pokemon_name|char(25)|ポケモンの名前|
|type1|char(10)|ポケモンのタイプ|
|type1|char(10)|ポケモンのタイプ|
|h|integer|HP|
|a|integer|攻撃|
|b|integer|防御|
|c|integer|特攻|
|d|integer|特防|
|s|integer|素早さ|
|ando|bool|削除したかのFlag(Falseだと削除されている)|

### pokemon_database > pokemon_learn_waza

|colum|type|supplement|
|---|---|---|
|id|integer auto_increment primary key|主キー|
|pokemon_id|char(10)|図鑑番号|
|pokemon_name|char(25)|ポケモンの名前|
|waza_name|char(25)|技名|
|waza_how|char(2)|lv(レベル技), wm(技マシーン), eg(たまご技)|
|waza_num|integer|覚えるLvや技マシーンの番号|
|ando|bool|削除したかのFlag(Falseだと削除されている)|

### pokemon_database > pokemon_waza_info

|colum|type|supplement|
|---|---|---|
|id|integer auto_increment primary key|主キー|
|waza_name|char(25)|技名|
|waza_type|char(10)|技のタイプ|
|waza_class|char(2)|分類|
|waza_power|integer|威力|
|waza_hit|integer|命中|
|waza_pp|integer|pp|
|waza_direct|bool|直接攻撃か(trueが直接攻撃)|
|waza_guard|bool|守れるか(trueが守れる)|
|waza_target|char(10)|全体攻撃か単体攻撃か見方に何かをするのか|
|waza_effect|tynytext|技の効果|
|ando|bool|削除したかのFlag(Falseだと削除されている)|