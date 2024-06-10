import React from "react";
import Chat from "./components/Chat/Chat";
import Join from "./components/Join/Join";
import Info from "./components/Info/Info";
import Graph from "./components/Graph/Graph";
import GameController from "./components/GameController/GameController";
import Ranking from "./components/Ranking/Ranking";
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="row mt-5">
          <div className="col-12 col-md-4 position-relative">
            <Join />
            <GameController />
          </div>

          <div className="col-12 col-md-8">
            <Info />
            <Graph />
          </div>
        </div>

        <div className="row mt-3">
          <Ranking />
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default App;
