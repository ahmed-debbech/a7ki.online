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
        } catch (e) {
            console.log(`Connection to Redis failed with error:` + e);
        }
    }else{
        console.log("redis url not found")
    }
}

function getRedis(){
    if(redisClient)
    return redisClient;
    return null;
}

module.exports = {
    startRedisClient,
    getRedis
}