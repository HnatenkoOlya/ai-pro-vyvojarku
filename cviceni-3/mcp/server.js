// Jednoduchý WebSocket MCP server pro testování komunikace s hrou
// Spuštění: node server.js

const WebSocket = require("ws");
const port = process.env.PORT || 8081;

const wss = new WebSocket.Server({ port });

let clientId = 0;

wss.on("connection", (ws) => {
  const id = ++clientId;
  console.log(`Client #${id} connected`);

  ws.send(JSON.stringify({ type: "welcome", id }));

  ws.on("message", (message) => {
    try {
      const msg = JSON.parse(message);
      console.log(`Received from #${id}:`, msg);

      // Echo back with server timestamp
      ws.send(
        JSON.stringify({
          type: "echo",
          from: id,
          serverTime: Date.now(),
          payload: msg,
        })
      );
    } catch (err) {
      console.warn("Invalid message:", message);
      ws.send(JSON.stringify({ type: "error", message: "Invalid JSON" }));
    }
  });

  ws.on("close", () => {
    console.log(`Client #${id} disconnected`);
  });
});

console.log(`MCP WebSocket server running on ws://localhost:${port}`);
