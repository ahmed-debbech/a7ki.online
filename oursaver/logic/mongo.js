let mongo = require("./db")

async function saveToMongo(map){
    //console.log(map)
    try{
        const res = await mongo.database().collection("users").insertOne({rr: "rr"});
        console.log(res)
    }catch(e){
        console.log(e)
    }
}

module.exports = {
    saveToMongo
}