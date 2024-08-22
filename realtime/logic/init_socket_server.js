const WebSocket = require('ws');
const SocketHandler = require('./socket_handler')
const User = require("../model/user");

function initSocketServer() {

    // Create a WebSocket server
    const wss = new WebSocket.Server({
        port: 6061
    });

    wss.on('connection', function connection(ws) {

        let user = new User(ws, ws._socket.remoteAddress);
        SocketHandler.onConnected(user);

        // Handle incoming messages from clients
        ws.on('message', function incoming(message) {
            SocketHandler.onMessage(user, message);

            // Broadcast the message to all connected clients
            /*wss.clients.forEach(function each(client) {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(message.toString());
                }
            });*/
        });

        ws.on('close', function close() {
            SocketHandler.onDisconnected();

            wss.clients.forEach(function each(client) {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send("STOPPED");
                }
            });
        });

    });

    console.log('WebSocket server is running on ws://localhost:8080');

}

module.exports = initSocketServer
