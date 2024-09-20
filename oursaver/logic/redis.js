const Redis = require('ioredis');
const redisUtils = require('./utils/redis_utils')

let redisClient
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
    lastSync.messages = Date.now()
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
    lastSync.users = Date.now()
    return newmap
}

function filterData(map){
    let msgMap = new Map()
    let usrMap = new Map()
    msgMap = filterMessages(map)
    usrMap = filterUsers(map)
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
    console.log(lastSync)
}


module.exports = {
    saveRedis,
    filterData,
    getLastSync,
    setLastSync
}