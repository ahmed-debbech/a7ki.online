const User = require("../model/user");
var redis = require("./redis")
var MessageDecision = require("../model/MessageDecision");
var um = require("./update_msg")

function saveToRedis(msg){
    console.log("new message is getting saved with key m" + msg.time)
    redis.getRedis().set('m'+msg.time ,JSON.stringify(msg));
    um.updateLastTimestampMsg(msg)
}

function sortArray(array){
    let tonum = []
    array.forEach(element => {tonum.push(Number(element.substring(1, element.length)))});
    tonum = tonum.sort()
    let tochar = []
    tonum.forEach(e => {
        tochar.push("m" + e.toString())        
    })
    return tochar;
}

async function getMessages(){
    let keys = await redis.getRedis().keys("m*")
    //let msgs = await redis.getRedis().get("m*")
    keys = sortArray(keys) 
    let msgs = [];
    for(let i=0; i<=keys.length-1; i++){
        let mssg = JSON.parse(await redis.getRedis().get(keys[i]))
        msgs.push(mssg)
    }
    return msgs;
}

function isLegit(msg){
    if(msg.banned) return false
    // add bellow more conditions for futre checks 
    return true;
}
async function getLegitMessages(){
    let keys = await redis.getRedis().keys("m*")
    //let msgs = await redis.getRedis().get("m*")
    keys = sortArray(keys) 
    let msgs = [];
    for(let i=0; i<=keys.length-1; i++){
        let mssg = JSON.parse(await redis.getRedis().get(keys[i]))
        if(isLegit(mssg)){
            msgs.push(mssg)
        }
    }
    return msgs;
}


async function assignNewUserId(){
    let last_id = await redis.getRedis().incr("last_user_id");
    
    return last_id;
}

async function saveNewUser(user){
    let uuser = new User(user.id, undefined, user.ip, user.color)
    uuser.name = user.name
    await redis.getRedis().set("u" + user.id ,JSON.stringify(uuser))
}

async function banMessage(msgid){
    try{
        let msg = await redis.getRedis().get(msgid.toString())
        msg = JSON.parse(msg)
        console.log(msg)
        msg.banned = true
        await redis.getRedis().set(msgid, JSON.stringify(msg))
        return true
    }catch(e){
        console.log(e)
        return false
    }
}


module.exports = {
    saveToRedis,
    getMessages,
    getLegitMessages,
    assignNewUserId,
    saveNewUser,
    banMessage
}