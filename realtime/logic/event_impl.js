var network = require('../network/namer')

let connected_users = []

async function onConnected(user){
    console.log("connecting new user with id: ", user.id);
    //let naming = await network.call_namer();
    let naming = "hello world"
    user.name = naming;
    if(naming != '-')
    connected_users.push(user)
}

function onMessage(user, message){
    console.log("user with id: ", user.id)
    if(user.ws.readyState == WebSocket.OPEN){
        
    }
}

function onDisconnected(){
}

module.exports = {
    onConnected,
    onMessage,
    onDisconnected
}