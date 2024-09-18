const redis = require('./redis');
const mongo = require("./mongo")

async function core(){
    redis.saveRedis().then(async (res) => {
        if(res != null){
            await mongo.saveToMongo(res)
        }
    })
    .catch((err) => {
        console.log("could not run cron job due to a problem!")
    })
}



module.exports = core