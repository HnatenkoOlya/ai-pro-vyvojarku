MCP (WebSocket) test server + client

- server.js: jednoduchý Node.js WebSocket server (echo + timestamp)
- client.html: jednoduchý prohlížečový klient pro odesílání vzorových zpráv

Jak spustit server:

```bash
npm install ws --no-audit --no-fund
node cviceni-3/mcp/server.js
```

Jak použít klienta:

- Otevřete `cviceni-3/mcp/client.html` v prohlížeči (nebo přes jednoduchý static server) a připojte se na uvedený WebSocket server.
- Stiskněte `Send ping` nebo `Send sample state` pro odeslání zpráv a sledujte echo od serveru.
