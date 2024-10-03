class Message{
    constructor(userName, text, time, userid, userColor){
        this.userName = userName
        this.text = text.toString()
        this.time = time
        this.userid = userid
        this.userColor = userColor
    }
}



module.exports = Message