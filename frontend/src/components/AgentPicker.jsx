function AgentPicker({ player, matches, setSelectedAgent }) {
  // get unique agents from match history
  const agentStats = {};

  matches.forEach(match => {
    const me = match.players.all_players.find(p => p.puuid === player.puuid);
    if (!me) return;
    const agent = me.character;
    if (!agentStats[agent]) agentStats[agent] = { wins: 0, losses: 0, image: me.assets.agent.small };
    if (match.teams[me.team.toLowerCase()].has_won) {
      agentStats[agent].wins += 1;
    } else {
      agentStats[agent].losses += 1;
    }
  });

  const agents = Object.entries(agentStats).map(([name, stats]) => ({
    name,
    ...stats,
    total: stats.wins + stats.losses,
    winrate: Math.round((stats.wins / (stats.wins + stats.losses)) * 100)
  })).sort((a, b) => b.total - a.total);

  return (
    <div style={{ minHeight: "100vh", background: "#0f1923", color: "white", padding: "40px" }}>
      <h1 style={{ color: "#ff4655", textAlign: "center", marginBottom: "8px" }}>
        {player.name}#{player.tag}
      </h1>
      <p style={{ color: "#aaa", textAlign: "center", marginBottom: "40px" }}>
        Pick an agent to see your map breakdown
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
        {agents.map(agent => (
          <div
            key={agent.name}
            onClick={() => setSelectedAgent(agent.name)}
            style={{ background: "#1f2731", borderRadius: "8px", padding: "20px", width: "150px", textAlign: "center", cursor: "pointer", border: "2px solid transparent", transition: "border 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.border = "2px solid #ff4655"}
            onMouseLeave={e => e.currentTarget.style.border = "2px solid transparent"}
          >
            <img src={agent.image} alt={agent.name} style={{ width: "80px", height: "80px", borderRadius: "50%" }} />
            <h3 style={{ margin: "12px 0 4px" }}>{agent.name}</h3>
            <p style={{ color: agent.winrate >= 50 ? "#4ade80" : "#ff4655", margin: "0", fontSize: "14px" }}>
              {agent.winrate}% WR
            </p>
            <p style={{ color: "#aaa", margin: "4px 0 0", fontSize: "12px" }}>
              {agent.wins}W {agent.losses}L
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AgentPicker;