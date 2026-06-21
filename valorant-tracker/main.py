from api.henrik import get_player, get_matches
from parsers.match import parse_match
from collections import defaultdict

name = input("Enter your VALORANT username: ")
tag = input("Enter your tag: ")

player = get_player(name, tag)
matches = get_matches(name, tag, count=10)

print(f"\nPlayer: {player['name']}#{player['tag']}\n")

parsed = [parse_match(m, player["puuid"]) for m in matches]

stats = defaultdict(lambda: defaultdict(lambda: {"wins": 0, "losses": 0}))

for m in parsed:
    map_name = m["map"]
    agent = m["agent"]
    if m["won"]:
        stats[map_name][agent]["wins"] += 1
    else:
        stats[map_name][agent]["losses"] += 1

for map_name, agents in sorted(stats.items()):
    print(f"\n{map_name}")
    print("-" * 30)
    ranked = []
    for agent, s in agents.items():
        total = s["wins"] + s["losses"]
        winrate = (s["wins"] / total) * 100
        ranked.append((agent, s["wins"], s["losses"], winrate, total))
    ranked.sort(key=lambda x: (x[3], x[4]), reverse=True)
    for agent, wins, losses, winrate, total in ranked:
        sample = "⚠ low sample" if total < 3 else ""
        print(f"  {agent:15} {wins}W {losses}L — {winrate:.0f}% WR ({total} games) {sample}")