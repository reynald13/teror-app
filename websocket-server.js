const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 0 }); // Port 0 akan memilih port yang tersedia secara otomatis

wss.on('listening', () => {
  console.log(`WebSocket server started on port ${wss.options.port}`);
});

wss.on('connection', (ws) => {
  console.log('Client connected');
  
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
