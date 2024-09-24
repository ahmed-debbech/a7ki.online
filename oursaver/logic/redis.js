const Redis = require('ioredis');
const redisUtils = require('./utils/redis_utils')

let redisClient
const numberOfShownMessages = 5;
let redisMap = null
let lastSync = {
    users : -1,
    messages : -1
}

function filterMessages(map){
    let newmap = new Map()

    for(let [key, value] of map){
        if(redisUtils.isMessage(key)){
            let keynum = redisUtils.extractMsgTime(value)
            if(keynum > lastSync.messages){
                newmap.set(key, value)
            }
        }
    }
    return newmap
}

function filterUsers(map){
    let newmap = new Map()

    for(let [key, value] of map){
        if(redisUtils.isUser(key)){
            let keynum = redisUtils.extractUserEnterTime(value)
            if(keynum > lastSync.users){
                newmap.set(key, value)
            }
        }
    }
    return newmap
}

function filterData(map){
    let msgMap = new Map()
    let usrMap = new Map()
    msgMap = filterMessages(map)
    lastSync.messages = Date.now()
    usrMap = filterUsers(map)
    lastSync.users = Date.now()

    return {
        messages: msgMap,
        users: usrMap
    };
}

async function saveRedis(){

    return new Promise(async (resolve, reject) => {
        redisClient = await startRedisClient();
        redisClient.on("connect", async () => {
            console.log("connected successfully to redis instance")
            
            const keys = await redisClient.keys('*')
            if(keys.length == 0) {await closeRedis();  resolve(null); return;}

            const values = await redisClient.mget(keys);

            let map = new Map()
            for(let h=0; h<=keys.length-1; h++){
                map.set(keys[h], values[h])
            }

            redisMap = map

            await closeRedis()

            resolve(redisMap)
        })
        redisClient.on("error", ()=> {
            closeRedis()
            reject(null)
        })
    })
}

async function startRedisClient() {
    let redisURL = process.env.REDIS_URL
    if (redisURL) {
        try {
            redisClient = new Redis(redisURL)
            return redisClient
        } catch (e) {
            console.log(`Connection to Redis failed with error: `, e);
            return 1;
        }
    }else{
        console.log("redis url not found")
        return 1;
    }
}

async function closeRedis(){
    if(redisClient != undefined)
    await redisClient.disconnect()
    console.log("Closed Redis connection")
}

function getLastSync(){
    return lastSync
}

function setLastSync(lasts){
    try{
        lastSync.messages = lasts.filter((e) => e._id == "m")[0].last
        lastSync.users = lasts.filter((e) => e._id == "u")[0].last
    }catch(e){
        console.log("unecessary error catched when setting last sync")
    }
    console.log("last sync was: ", lastSync)
}

async function modifyRedisEntries(valuesToAdd, valuesToDelete){
    //console.log(valuesToAdd)
    //console.log(valuesToDelete)

    redisClient = await startRedisClient();
    if(valuesToDelete != null){
        for(let [key, value] of valuesToDelete){
            await redisClient.del(key ,JSON.stringify(value));
        }
    }
    if(valuesToAdd != null){
        for(let [key, value] of valuesToAdd){
            await redisClient.set(key ,JSON.stringify(value));
        }
    }
    await closeRedis()
}

async function updateRedis(){
    //sort all messages in redis
    console.log("updating redis...")
    if(redisMap == null || redisClient.size == 0) return

    let messagesOnly = []
    let usersOnly = []

    for(let [key, value] of redisMap){
        if(redisUtils.isMessage(key)){
            messagesOnly.push(value)
        }
        if(redisUtils.isUser(key)){
            usersOnly.push(value)
        }
    }

    messagesOnly = messagesOnly.sort((a, b) => JSON.parse(a).time - JSON.parse(b).time)
    // remove all the first untill we have numberOfShownMessages left
    messagesOnly.splice(0, Math.abs(messagesOnly.length-numberOfShownMessages))

    //update redis
    //convert to maps
    //if(messagesOnly.length==0 || usersOnly.length==0) return
   
    const messagesMap = new Map();
    const usersMap = new Map();
    messagesOnly.map((ob) => {
        let j = JSON.parse(ob)
        messagesMap.set("m"+j.time, j)
    })
    usersOnly.map((ob) => {
        let j = JSON.parse(ob)
        usersMap.set("u"+j.id, j)
    })
    let addd= new Map(); addd.set(":;", 3)
    try{
        await modifyRedisEntries(null, new Map([...usersMap, ...messagesMap]))
    }catch(e){
        console.log(e)
    }
}

module.exports = {
    saveRedis,
    filterData,
    getLastSync,
    setLastSync,
    updateRedis
}