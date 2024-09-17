const redis = require('./redis');
const mongo = require("./mongo")

async function core(){
    redis.saveRedis().then((res) => {
        if(res != null){
            mongo.saveToMongo(res)
        }
    })
    .catch((err) => {
        console.log("could not run cron job due to redis problem!")
    })
}



module.exports = core