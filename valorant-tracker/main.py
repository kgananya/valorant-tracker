from api.henrik import get_player, get_matches
from parsers.match import parse_match
from collections import defaultdict

name = "jiji"
tag  = "2608"

player  = get_player(name, tag)
matches = get_matches(name, tag, count=50)
print(f"Matches fetched: {len(matches)}")

print(f"Player: {player['name']}#{player['tag']}\n")

parsed = [parse_match(m, player["puuid"]) for m in matches]

# group by map AND agent
stats = defaultdict(lambda: defaultdict(lambda: {"wins": 0, "losses": 0}))

for m in parsed:
    map_name = m["map"]
    agent = m["agent"]
    if m["won"]:
        stats[map_name][agent]["wins"] += 1
    else:
        stats[map_name][agent]["losses"] += 1

# print best agents per map
for map_name, agents in sorted(stats.items()):
    print(f"\n{map_name}")
    print("-" * 30)
    ranked = []
    for agent, s in agents.items():
        total = s["wins"] + s["losses"]
        winrate = (s["wins"] / total) * 100
        ranked.append((agent, s["wins"], s["losses"], winrate, total))
    
    # sort by win rate, then by games played
    ranked.sort(key=lambda x: (x[3], x[4]), reverse=True)
    
    for agent, wins, losses, winrate, total in ranked:
        print(f"  {agent:15} {wins}W {losses}L — {winrate:.0f}% WR ({total} games)")