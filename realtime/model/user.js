
class User{
    constructor(id, ws, ip, color){
        //this.id = Math.floor(Math.random() * (999999 - 100000) + 100000);
        this.id = id
        this.ws = ws;
        this.color = color;
        this.ip = ip;
        this.name = "-";
        this.firstEnter = Date.now()
    }
}

module.exports = User;