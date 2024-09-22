const Redis = require('ioredis');
const redisUtils = require('./utils/redis_utils')

let redisClient
const numberOfShownMessages = 25;
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
        let redisClient = await startRedisClient();
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
    lastSync.messages = lasts.filter((e) => e._id == "m")[0].last
    lastSync.users = lasts.filter((e) => e._id == "u")[0].last
    console.log("last sync was: ", lastSync)
}


async function updateRedis(){
    //sort all messages in redis
    console.log("updating redis...")
    if(redisMap == null || redisClient.size == 0) return

    let messagesOnly = []

    for(let [key, value] of redisMap){
        if(redisUtils.isMessage(key)){
            messagesOnly.push(value)
        }
    }

    messagesOnly = messagesOnly.sort((a, b) => JSON.parse(a).time - JSON.parse(b).time)
    // remove all the first untill we have 25 left
    messagesOnly.splice(0, messagesOnly.length-numberOfShownMessages)

    //and remove all users
    
    //update redis 
}

module.exports = {
    saveRedis,
    filterData,
    getLastSync,
    setLastSync,
    updateRedis
}