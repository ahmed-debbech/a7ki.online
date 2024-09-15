const redis = require("redis");

let redisClient;


async function startRedisClient() {
    let redisURL = process.env.REDIS_URL
    if (redisURL) {
        redisClient = redis.createClient({ url: redisURL }).on("error", (e) => {
            console.log(`Failed to create the Redis client with error:`);
        });

        try {
            await redisClient.connect();
            console.log(`Connected to Redis successfully!`);
            return 0;
        } catch (e) {
            console.log(`Connection to Redis failed with error:` + e);
            return 1;
        }
    }else{
        console.log("redis url not found")
        return 1;
    }
}


async function saveRedis(){
    let err = await startRedisClient();
    if(err != 0) {
        redisClient.disconnect()
        console.log("redis instance is not accessible, so no saving")
        return;
    }


    redisClient.disconnect()
}



module.exports ={
    saveRedis
}