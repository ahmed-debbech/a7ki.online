var redis = require("../redis/impl")

async function getNewMessages(){
   console.log("getting new messages")
    let msgs = await redis.getMessages();
    console.log(msgs)
}

module.exports = {
    getNewMessages
}