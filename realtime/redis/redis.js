const redis = require("redis");
const ioredis = require("ioredis");

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

async function listenToMessageEvents(){
    console.log("listenning to messages events...")
    
    let redisURL = process.env.REDIS_URL
    const subscriber = new ioredis.Redis(redisURL);

    subscriber.config('SET', 'notify-keyspace-events', 'KA');

    let targetKey="m*"
    subscriber.psubscribe(`__keyspace@0__:${targetKey}`, (err) => {
        if (err) {
            console.error('Failed to subscribe:', err);
        } else {
            console.log(`Subscribed to keyspace notifications for: ${targetKey}`);
        }
    });

    subscriber.on('pmessage', (pattern, channel, event) => {
        const key = channel.split(':').pop();
    
        // If the event is "set", fetch the new value
        if (event === 'set') {
            client.get(key).then(value => {
                console.log(`Key: ${key}, New Value: ${value}`);
            }).catch(err => {
                console.error('Error retrieving value:', err);
            });
        } else {
            console.log(`Event: ${event} on Key: ${key}`);
        }
    });
}

function decideMessageStatusAfterUpdate(){

}

module.exports = {
    startRedisClient,
    getRedis,
    listenToMessageEvents
}