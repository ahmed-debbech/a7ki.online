var util_ip = require("../util/ip")
var ips = require("../logic/ip")

function check(req, res, next){
    let ip = util_ip.v6Tov4(req.ip)
    console.log(ip)
    if(ips.check(ip)){
        next()
        return
    }
    res.status(403)
    res.send("FORBIDDEN")
}

module.exports = {
    check
}