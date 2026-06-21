function MapStats({ player, matches, selectedAgent, setSelectedAgent }) {
  const mapStats = {};

  matches.forEach(match => {
    const me = match.players.all_players.find(p => p.puuid === player.puuid);
    if (!me || me.character !== selectedAgent) return;

    const map = match.metadata.map;
    if (!mapStats[map]) mapStats[map] = { wins: 0, losses: 0, kills: 0, deaths: 0, assists: 0, games: 0 };

    const won = match.teams[me.team.toLowerCase()].has_won;
    mapStats[map].wins += won ? 1 : 0;
    mapStats[map].losses += won ? 0 : 1;
    mapStats[map].kills += me.stats.kills;
    mapStats[map].deaths += me.stats.deaths;
    mapStats[map].assists += me.stats.assists;
    mapStats[map].games += 1;
  });

  const maps = Object.entries(mapStats).map(([name, stats]) => ({
    name,
    ...stats,
    winrate: Math.round((stats.wins / stats.games) * 100),
    kda: ((stats.kills + stats.assists) / Math.max(stats.deaths, 1)).toFixed(2)
  })).sort((a, b) => b.winrate - a.winrate);

  return (
    <div style={{ minHeight: "100vh", background: "#0f1923", color: "white", padding: "40px" }}>
      <button
        onClick={() => setSelectedAgent(null)}
        style={{ background: "transparent", border: "1px solid #ff4655", color: "#ff4655", padding: "8px 16px", borderRadius: "4px", cursor: "pointer", marginBottom: "24px" }}
      >
        ← Back
      </button>
      <h1 style={{ color: "#ff4655", textAlign: "center", marginBottom: "8px" }}>
        {selectedAgent} on each map
      </h1>
      <p style={{ color: "#aaa", textAlign: "center", marginBottom: "40px" }}>
        Based on your last 10 matches
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
        {maps.map(map => (
          <div key={map.name} style={{ background: "#1f2731", borderRadius: "8px", padding: "24px", width: "200px", textAlign: "center", border: `2px solid ${map.winrate >= 50 ? "#4ade80" : "#ff4655"}` }}>
            <h2 style={{ margin: "0 0 16px", fontSize: "1.2rem" }}>{map.name}</h2>
            <p style={{ fontSize: "2rem", fontWeight: "bold", margin: "0", color: map.winrate >= 50 ? "#4ade80" : "#ff4655" }}>
              {map.winrate}%
            </p>
            <p style={{ color: "#aaa", margin: "4px 0 12px", fontSize: "14px" }}>Win Rate</p>
            <p style={{ margin: "4px 0", fontSize: "14px" }}>{map.wins}W {map.losses}L</p>
            <p style={{ margin: "4px 0", fontSize: "14px", color: "#aaa" }}>KDA: {map.kda}</p>
            <p style={{ margin: "4px 0", fontSize: "12px", color: "#666" }}>{map.games} game{map.games > 1 ? "s" : ""}</p>
          </div>
        ))}
        {maps.length === 0 && (
          <p style={{ color: "#aaa" }}>No data for {selectedAgent} in your recent matches.</p>
        )}
      </div>
    </div>
  );
}

export default MapStats;