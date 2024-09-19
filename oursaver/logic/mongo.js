let mongo = require("./db")
let redis = require("./redis")

async function saveToMongo(map){
    //console.log(map)
    let updatedMap = redis.filterData(map)
    try{
        let toSaveArr = Array.from(updatedMap, ([id, body]) => ({ id, body }));
        //const res = await mongo.database().collection("users").insertMany(toSaveArr);
        console.log(res)
    }catch(e){
        console.log(e)
    }
}

module.exports = {
    saveToMongo
}