const redis = require('./redis/redis');
const mongo = require("./mongo/mongo")

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

function getUsers(start_time, end_time, ip){
    if(ip && ip != ""){
        console.log("ip exists")
    }
    console.log("ip not existing")
    
} 

module.exports = {
    core,
    getUsers
}