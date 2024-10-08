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

function setWaitingUsersToBeNotified(timeout, userid, clientRes){
    usersWaitingToBeNotified.push({timeout: timeout, userid: userid, clientRes: clientRes})
}

function freeUser(userid){
    usersWaitingToBeNotified.filter((e) => e.userid == userid)[0].clientRes.json({update: null})
    usersWaitingToBeNotified = usersWaitingToBeNotified.filter((e) => e.userid != userid)
}

function _updateWaitingUsers(){

    for(let i=0; i<=usersWaitingToBeNotified.length-1; i++){
        usersWaitingToBeNotified[i].clientRes.json({update: latestPolledMsgs})
        clearTimeout(usersWaitingToBeNotified[i].timeout)
    }
    usersWaitingToBeNotified = []
}

async function banMessage(messageId){
    return await redis.banMessage(messageId)
}

module.exports = {
    getNewMessages,
    setPolledMsgs,
    setWaitingUsersToBeNotified,
    freeUser,
    banMessage
}