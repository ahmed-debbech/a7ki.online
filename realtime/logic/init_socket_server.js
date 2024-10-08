const WebSocket = require('ws');
const SocketHandler = require('./socket_handler')
const User = require("../model/user");
var redis = require('../redis/impl')

async function assign(){
    return await redis.assignNewUserId();
}

function initSocketServer() {

    // Create a WebSocket server
    const wss = new WebSocket.Server({
        port: 6061
    });

    wss.on('connection', async function connection(ws) {

        let user = new User(await assign() ,ws, ws._socket.remoteAddress);
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
            SocketHandler.onDisconnected(user);
        });

    });
}

module.exports = initSocketServer
