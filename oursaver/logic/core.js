const Redis = require('ioredis');

let redisClient
this.redisMap

async function startRedisClient() {
    let redisURL = process.env.REDIS_URL
    if (redisURL) {
        try {
            this.redisClient = new Redis(redisURL)
            return this.redisClient
        } catch (e) {
            console.log(`Connection to Redis failed with error: `, e);
            return 1;
        }
    }else{
        console.log("redis url not found")
        return 1;
    }
}


async function saveRedis(){
    
    let redisClient = await this.startRedisClient();
    redisClient.on("connect", async () => {
        console.log("connected successfully to redis instance")
        
        const keys = await this.redisClient.keys('*')
        const values = await this.redisClient.mget(keys);

        let map = new Map()
        for(let h=0; h<=keys.length-1; h++){
            map.set(keys[h], values[h])
        }

        this.redisMap = map

        await this.redisClient.disconnect()
        console.log("Closed Redis connection")

        saveToMongo()
    })
    redisClient.on("error", ()=> {
        this.redisClient.disconnect()
        console.log("redis instance is not accessible, so no saving")
    })

}

async function saveToMongo(){
    console.log(this.redisMap)
}

module.exports ={
    saveRedis
}