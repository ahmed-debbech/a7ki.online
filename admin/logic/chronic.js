var cron = require('node-cron')
var events = require('./event_impl')
var Message = require('../model/Message')

function updateOnlineNumber(){
    const users = events.connected_users
    if(users.length <= 0) return;

    for(let i=0; i<=users.length-1; i++){
        //if(users[i].ws.readyState == WebSocket.OPEN){
            let msg = new Message("SYSTEM", JSON.stringify({numberOn: users.length}), Date.now());
            users[i].ws.send(JSON.stringify(msg))
        //}
    }
}

cron.schedule('*/5 * * * * *', updateOnlineNumber)