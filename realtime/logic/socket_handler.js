var events = require('./event_impl')

class SocketHandler {

    constructor(){}

    static onConnected(user){
        events.onConnected(user)
    }

    static onMessage(user, message){
        events.onMessage(user, message)
    }

    static onDisconnected(user){
        events.onDisconnected(user)
    }

    static onUpdateMessage(messageDescision){
        events.onUpdateMessage(messageDescision)
    }
}

module.exports = SocketHandler;