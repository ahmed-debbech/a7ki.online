
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
        return await msgIsBannedFromChat(key)
    } else {
        if(event == 'del'){
            return await msgIsDeletedFromChat(key)
        }else{
            console.log(`Other Event: ${event} on Key: ${key}`);
        }
    }
    return await msgIsNone(key)
}


async function msgIsBannedFromChat(key){
    //check timestamp and see if msg has already been sent and update if needed
    const timest = key.substring(1);
    //if(timest < lastMsgTimetampStored){
        console.log("this needs to be reviewed to see if it is banned")
        let message = await getOneMessage(key)
        if(message.banned != undefined){
            // so the message is banned from admin
            return new MessageDecision("BANNED", key, undefined)
        }
    //}
}

async function msgIsDeletedFromChat(key){
    return new MessageDecision("DELETED", key, undefined)
}

async function msgIsNone(key){
    return new MessageDecision(null, null, undefined)
}

function updateLastTimestampMsg(lastmsg){
    lastMsgTimetampStored = lastmsg.time
}
module.exports = {
    msgIsBannedFromChat,
    msgIsDeletedFromChat,
    msgIsNone,
    decideMessageStatusAfterSignal,
    updateLastTimestampMsg
}