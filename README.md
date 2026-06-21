# VALORANT Agent Tracker

A full-stack VALORANT stats tool that helps you make smarter agent picks by showing your personal win rate by agent and map.

## What it does
- Log in with your Riot ID (name + tag)
- See all agents you've played recently with win rates
- Click an agent to see your win rate and KDA broken down by map
- Helps you answer "which agent should I pick on this map?" based on your own data

## Tech Stack
- **Frontend:** React
- **Backend:** Python
- **API:** Henrik's Unofficial VALORANT API

## Setup

### Frontend
```bash
cd frontend
npm install
npm start
```

### Backend (CLI version)
```bash
cd valorant-tracker
pip install requests python-dotenv
python main.py
```

### API Key
This project uses [Henrik's Unofficial VALORANT API](https://henrikdev.xyz).
Get a free API key from their Discord and add it to:
- `frontend/src/components/Login.jsx` → `const API_KEY = "your-key-here"`
- `valorant-tracker/api/henrik.py` → `API_KEY = "your-key-here"`

## Roadmap
- [ ] MongoDB integration for match history caching
- [ ] Track win rate trends over time
- [ ] Economy analysis (buy vs save decisions per round)
- [ ] Win probability predictor using match data

## Why I built this
I play VALORANT and wanted a tool that gives personalized agent recommendations based on my own stats rather than generic tier lists.
