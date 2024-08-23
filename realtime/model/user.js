class User{
    constructor(ws, ip){
        this.id = Math.floor(Math.random() * (999999 - 100000) + 100000);
        this.ws = ws;
        this.ip = ip;
        this.name = "-";
    }
}

module.exports = User;