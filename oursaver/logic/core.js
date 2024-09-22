const redis = require('./redis');
const mongo = require("./mongo")

async function core(){
    redis.saveRedis().then(async (res) => {
        if(res != null){
            try{
                await mongo.saveToMongo(res)
            }catch(e){
                console.log("global problem in saveToMongo()")
                return;
            }
            try{
                await redis.updateRedis();
            }catch(e){
                console.log("global problem in updateRedis()")
                return;
            }
        }else{
            console.log("empty redis")
        }
    })
    .catch((err) => {
        console.log("could not run cron job due to a problem!")
    })
}



module.exports = core