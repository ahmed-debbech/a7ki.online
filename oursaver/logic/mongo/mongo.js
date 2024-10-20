let mongo = require("../db")
let redis = require("../redis/redis")
let modeler = require("./modeler")

async function updateLastSync(lastsync, which){
    try{
        if(which == "m"){
            await mongo.database().collection("last_sync").deleteOne({_id: "m"})
            const res = await mongo.database().collection("last_sync").insertOne({_id: "m", last: lastsync.messages});
        }
        if(which == "u"){
            await mongo.database().collection("last_sync").deleteOne({_id: "u"})
            const res1 = await mongo.database().collection("last_sync").insertOne({_id: "u", last: lastsync.users});
        }
    }catch(e){
        console.log(e)
    }
}

async function getLastSyncFromMongo(){

    let res = await mongo.database().collection("last_sync").find({}).toArray()
    if(res.length == 0)  return [{_id: "m", last: -1}, {_id: "u", last: -1}]
    return res
}

async function saveToMongo(map){
    //console.log(map)
    redis.setLastSync(await getLastSyncFromMongo())
    let filterData = redis.filterData(map)

    if(filterData.messages.size > 0){
        try{
            let toSaveArr = Array.from(filterData.messages, ([id, body]) => ({ id, body }));
            if(toSaveArr.length == 0) return
            
            const res = await mongo.database().collection("messages").insertMany(modeler.deserializeAndModel(toSaveArr));
            console.log(res)

            await updateLastSync(redis.getLastSync(), "m")
        }catch(e){
            console.log(e)
        }
    }
    if(filterData.users.size > 0){
        try{
            let toSaveArr = Array.from(filterData.users, ([id, body]) => ({ id, body }));
            if(toSaveArr.length == 0) return
            
            const res = await mongo.database().collection("users").insertMany(modeler.deserializeAndModel(toSaveArr));
            console.log(res)

            await updateLastSync(redis.getLastSync(), "u")
        }catch(e){
            console.log(e)
        }
    }
}

async function getUsersWithTimeAndIp(start, end, ip){

    const pipeline = [
         { $match: { firstEnter: { $gt: parseInt(start), $lt: parseInt(end) } } },
         { $match: { ip: {$regex: ip}} }
        ] 

    var h = []
    try{
        var cursor = await mongo.database().collection("users").aggregate(pipeline).toArray()
        await cursor.forEach(doc => {
            h.push(doc)
        });
    }catch(e){
        console.log(e)
    }
    return h
}

async function getUsersWithTime(start, end){
    const pipeline = [
        { $match: { firstEnter: { $gt: parseInt(start), $lt: parseInt(end) } } }
    ] 
    var h = []
    try{
        var cursor = await mongo.database().collection("users").aggregate(pipeline).toArray()
        await cursor.forEach(doc => {
            h.push(doc)
        });
    }catch(e){
        console.log(e)
    }
    return h
}
async function getMessagesWithFilter(filters){
    
    let pipeline = []
    for(let i =0; i<=filters.length-1; i++){
        let e = filters[i] 
        if(e.start_time) pipeline.push({ $match: { time: { $gt: parseInt(e.start_time) } } })
        if(e.end_time) pipeline.push({ $match: { time: { $lt: parseInt(e.end_time) } } })
        if(e.uid) pipeline.push({ $match: { userid: parseInt(e.uid)} })
        if(e.occ) pipeline.push({ $match: { text: {$regex : e.occ } } })
    }
    var h = []
    try{
        var cursor = await mongo.database().collection("messages").aggregate(pipeline).toArray()
        await cursor.forEach(doc => {
            h.push(doc)
        });
    }catch(e){
        console.log(e)
    }
    return h
}

module.exports = {
    saveToMongo,
    getLastSyncFromMongo,
    getUsersWithTimeAndIp,
    getUsersWithTime,
    getMessagesWithFilter
}