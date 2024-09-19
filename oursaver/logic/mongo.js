let mongo = require("./db")
let redis = require("./redis")

async function saveToMongo(map){
    //console.log(map)
    let updatedMap = redis.filterData(map)
    try{
        let toSaveArr = Array.from(updatedMap.messages, ([id, body]) => ({ id, body }));
        if(toSaveArr.length == 0) return

        const res = await mongo.database().collection("messages").insertMany(toSaveArr);
        console.log(res)
    }catch(e){
        console.log(e)
    }
    try{
        let toSaveArr = Array.from(updatedMap.users, ([id, body]) => ({ id, body }));
        if(toSaveArr.length == 0) return

        const res = await mongo.database().collection("users").insertMany(toSaveArr);
        console.log(res)
    }catch(e){
        console.log(e)
    }
}

module.exports = {
    saveToMongo
}