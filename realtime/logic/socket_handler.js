var events = require('./event_impl')

class SocketHandler {

    constructor(){}

    static onConnected(user){
        events.onConnected(ws)
    }

    static onMessage(user, message){
        events.onMessage(user, message)
    }

    static onDisconnected(){
        events.onDisconnected()
    }
}

module.exports = SocketHandler;