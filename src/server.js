const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();

app.get('/akela', (request, response) => response.json({ message: 'Hello' }));
app.use('/', express.static('src/public'));

const port = 6969;
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) =>
  ws.on('message', (data) => {
    const message = data.toString();
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  })
);

server.listen(port, () =>
  console.log(`Server is listening on http://localhost:${port}!`)
);
