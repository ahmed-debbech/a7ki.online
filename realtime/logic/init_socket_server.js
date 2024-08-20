const WebSocket = require('ws');

function initSocketServer() {

    // Create a WebSocket server
    const wss = new WebSocket.Server({
        port: 6061
    });

    wss.on('connection', function connection(ws) {
        console.log('A new client connected');

        // Handle incoming messages from clients
        ws.on('message', function incoming(message) {
            console.log('received: %s', message);

            // Broadcast the message to all connected clients
            wss.clients.forEach(function each(client) {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(message.toString());
                }
            });
        });

        ws.on('close', function close() {
            wss.clients.forEach(function each(client) {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send("STOPPED");
                }
            });
        });

        ws.send('Welcome to the WebSocket server');
    });

    console.log('WebSocket server is running on ws://localhost:8080');

}

module.exports = initSocketServer
