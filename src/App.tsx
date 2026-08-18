import { lazy, Suspense } from "react";
import Chat from "./components/Chat/Chat";
import Join from "./components/Join/Join";
import Info from "./components/Info/Info";
import GameController from "./components/GameController/GameController";
import Ranking from "./components/Ranking/Ranking";
import "./App.css";

const Graph = lazy(() => import("./components/Graph/Graph"));

const App = () => {
  return (
    <main className="app-shell" data-testid="app">
      <div className="container py-4 py-lg-5">
        <div className="app-header mb-4">
          <div>
            <p className="eyebrow mb-1">Real-time prediction game</p>
            <h1>Multiplier Arena</h1>
          </div>
          <span className="live-status">Live session</span>
        </div>

        <div className="row">
          <div className="col-12 col-lg-4 position-relative">
            <Join />
            <GameController />
          </div>

          <div className="col-12 col-lg-8">
            <Info />
            <Suspense fallback={<div className="graph-loading">Loading round data...</div>}>
              <Graph />
            </Suspense>
          </div>
        </div>

        <div className="row mt-3">
          <Ranking />
          <Chat />
        </div>
      </div>
    </main>
  );
};

export default App;
