var Message = require('../model/Message')

var cooldown_pool = {}

function checkCooldown(user){
    if(cooldown_pool[user.id]){
        let timest = cooldown_pool[user.id]
        const ellapsedMilli = Date.now() - timest
        if(Math.floor(ellapsedMilli / 1000) < 4){
            user.ws.send(JSON.stringify(new Message("SYSTEM" ,
                JSON.stringify( {cooldown : true}), Date.now())).toString())
            return false
        }
    }
    cooldown_pool[user.id] = Date.now()
    user.ws.send(JSON.stringify(new Message("SYSTEM" ,
        JSON.stringify( {cooldown : false}), Date.now())).toString())
    return true;
}

module.exports = {
    checkCooldown
}