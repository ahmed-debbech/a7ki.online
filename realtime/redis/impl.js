var redis = require("./redis")

function saveToRedis(msg){
    redis.getRedis().set('m'+msg.time ,JSON.stringify(msg));
}

async function getMessages(){
    let keys = await redis.getRedis().keys("m*")
    //let msgs = await redis.getRedis().get("m*")
    let msgs = [];
    for(let i=0; i<=keys.length-1; i++){
        msgs.push(JSON.parse(await redis.getRedis().get(keys[i])))
    }
    console.log(msgs)
    return msgs;
}

module.exports = {
    saveToRedis,
    getMessages
}