function isMessage(s){
    if(s[0] == "m") return true
    return false
}

function extractMsgTime(s){
    let json = JSON.parse(s)
    return Number(json.time)
}

function isUser(s){
    if(s[0] == "u") return true
    return false
}

function extractUserEnterTime(s){
    let json = JSON.parse(s)
    return Number(json.firstEnter)
}

module.exports = {
    isMessage,
    extractMsgTime,
    extractUserEnterTime,
    isUser
}