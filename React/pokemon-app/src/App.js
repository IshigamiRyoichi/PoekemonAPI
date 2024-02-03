import logo from './logo.svg';
import './App.css';
import React from "react";
import SearchPokemon from "./function/SearchPokemon";
import SearchWaza from './function/SearchWaza';
import MathDamage from './function/MathDamage';
// import { useCallback, useEffect, useState } from "react";

function App() {  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <body>
        <div class="tab-wrap">
            <input id="TAB-01" type="radio" name="TAB" class="tab-switch" checked="checked" /><label class="tab-label" for="TAB-01">ポケモン検索機能</label>
            <div class="tab-content">
              <SearchPokemon />
            </div>
            <input id="TAB-02" type="radio" name="TAB" class="tab-switch" /><label class="tab-label" for="TAB-02">技検索機能</label>
            <div class="tab-content">
              <SearchWaza />
            </div>
            <input id="TAB-03" type="radio" name="TAB" class="tab-switch" /><label class="tab-label" for="TAB-03">ダメージ計算機能</label>
            <div class="tab-content">
              <MathDamage />
            </div>
        </div>
      </body>
    </div>
  );
}

export default App;
