var redis = require("./redis")

function saveToRedis(msg){
    redis.getRedis().set('m'+msg.time ,JSON.stringify(msg));
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
        msgs.push(JSON.parse(await redis.getRedis().get(keys[i])))
    }
    return msgs;
}

module.exports = {
    saveToRedis,
    getMessages
}