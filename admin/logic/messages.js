var redis = require("../redis/impl")

let latestPolledMsgs = []
let usersWaitingToBeNotified = []

async function getNewMessages(){
    console.log("getting new messages")
    let msgs = await redis.getMessages();
    console.log(msgs)
    return msgs
}

function setPolledMsgs(polledMessage){
   latestPolledMsgs =[]
   latestPolledMsgs.push(polledMessage)
   _updateWaitingUsers()
}

function setWaitingUsersToBeNotified(clientRes){
    usersWaitingToBeNotified.push(clientRes)
}

function _updateWaitingUsers(){

    for(let i=0; i<=usersWaitingToBeNotified.length-1; i++){
        usersWaitingToBeNotified[i].json({update: latestPolledMsgs})
    }
    usersWaitingToBeNotified = []
}

module.exports = {
    getNewMessages,
    setPolledMsgs,
    setWaitingUsersToBeNotified
}