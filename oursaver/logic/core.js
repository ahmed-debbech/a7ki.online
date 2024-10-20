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
        list = await mongo.getUsersWithTimeAndIp(start_time, end_time, ip)
    }else{
        list = await mongo.getUsersWithTime(start_time, end_time)
    }
    console.log(list)
    return list
} 

async function getMessages(start_time, end_time, occ, uid){
    let list = []
    let filters = []
    if(start_time) filters.push({"start_time" : start_time})
    if(end_time) filters.push({"end_time" : end_time})
    if(occ) filters.push({"occ" : occ})
    if(uid) filters.push({"uid" : uid})
    list = mongo.getMessagesWithFilter(filters)
    return list
} 

module.exports = {
    core,
    getUsers,
    getMessages
}