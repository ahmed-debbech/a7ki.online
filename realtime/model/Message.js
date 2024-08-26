class Message{
    constructor(userName, text, time, userid){
        this.userName = userName
        this.text = text.toString()
        this.time = time
        this.userid = userid 
    }
}



module.exports = Message