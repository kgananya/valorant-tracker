import { useState } from "react";
import Login from "./components/Login";
import AgentPicker from "./components/AgentPicker";
import MapStats from "./components/MapStats";

function App() {
  const [player, setPlayer] = useState(null);
  const [matches, setMatches] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);

  return (
    <div className="App">
      {!player && <Login setPlayer={setPlayer} setMatches={setMatches} />}
      {player && !selectedAgent && (
        <AgentPicker player={player} matches={matches} setSelectedAgent={setSelectedAgent} />
      )}
      {player && selectedAgent && (
        <MapStats player={player} matches={matches} selectedAgent={selectedAgent} setSelectedAgent={setSelectedAgent} />
      )}
    </div>
  );
}

export default App;