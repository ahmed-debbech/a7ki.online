
var MessageDecision = require("../model/MessageDecision");
var redis = require("./redis")

var lastMsgTimetampStored = Date.now()

async function getOneMessage(key){
    let m
    try{
        m = await redis.getRedis().get(key);
    }catch(e){
        console.log(`error in retreiving message with key ${key}`)
        return
    }
    if(m == null) return 

    let msg = JSON.parse(m)
    return msg;
}

async function decideMessageStatusAfterSignal(subscriber, pattern, channel, event){
    /*console.log(pattern)
    console.log(channel)
    console.log(event)*/
    const key = channel.split(':').pop();
    // If the event is "set", fetch the new value
    if (event == 'set') {
        return await getOneMessage(key)
    }
    return null
}


function updateLastTimestampMsg(lastmsg){
    lastMsgTimetampStored = lastmsg.time
}
module.exports = {
    decideMessageStatusAfterSignal,
    updateLastTimestampMsg
}