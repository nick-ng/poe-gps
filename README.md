# poe-gps

Show where your team mates are during league start

## Instructions

- Install Docker Desktop
  - Windows: https://hub.docker.com/editions/community/docker-ce-desktop-windows/

## client.js

Forwards PoE `Client.txt` log entries after apply filters to configured log entry handler.

### Runnning

`node start <log file path> <handler> <remote endpoint>`

Example: `node start "H:\SteamLibrary\steamapps\common\Path of Exile\logs\Client.txt"`

Available handlers:

- `console` forwards log entries to current console (Default).
- `wss` forwards log entries to remote wss server. Provide `<remote endpoint>` when using this option
- `http` forwards log entries to remote http server. Provide `<remote endpoint>` when using this option
