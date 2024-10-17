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

async function getUsers(start_time, end_time, ip){
    let list = []
    if(ip && ip != ""){
        console.log("d")
        list = await mongo.getUsersWithTimeAndIp(start_time, end_time, ip)
    }else{
        console.log("pm")
        list = await mongo.getUsersWithTime(start_time, end_time)
    }
    console.log(list)
    return list
} 

module.exports = {
    core,
    getUsers
}