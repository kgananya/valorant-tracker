def parse_match(match, puuid):
    meta = match["metadata"]
    teams = match["teams"]
    
    me = next(p for p in match["players"]["all_players"] 
              if p["puuid"] == puuid)
    
    stats = me["stats"]
    econ  = me["economy"]

    my_team = me["team"].lower()
    won = teams[my_team]["has_won"]
    
    return {
        "match_id":      meta["matchid"],
        "map":           meta["map"],
        "mode":          meta["mode"],
        "date":          meta["game_start"],
        "agent":         me["character"],
        "won":           won,
        "kills":         stats["kills"],
        "deaths":        stats["deaths"],
        "assists":       stats["assists"],
        "headshot_pct":  stats["headshots"] / max(stats["kills"], 1),
        "acs":           stats["score"] // meta["rounds_played"],
        "spent":         econ["spent"],
        "loadout_val":   econ["loadout_value"],
    }