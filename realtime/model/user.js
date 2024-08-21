class User{
    constructor(ws, ip){
        this.id = Math.floor(Math.random() * (9999 - 1) + 1);
        this.ws = ws;
        this.ip = ip;
        this.name = "-";
    }
}

module.exports = User;