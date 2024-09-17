const Redis = require('ioredis');

let redisClient
let redisMap = null

async function saveRedis(){

    return new Promise(async (resolve, reject) => {
        let redisClient = await startRedisClient();
        redisClient.on("connect", async () => {
            console.log("connected successfully to redis instance")
            
            const keys = await redisClient.keys('*')
            if(keys.length == 0) {await closeRedis();  resolve(redisMap); return;}

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

module.exports = {
    saveRedis
}