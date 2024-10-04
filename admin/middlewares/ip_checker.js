var util_ip = require("../util/ip")
var util_file = require("../util/file")

function check(req, res, next){
    let ip = util_ip.v6Tov4(req.ip)
    console.log(ip)
    let white_ip = process.env.WHITE_IP_LIST
    let whited_ips = util_file.readFileAndSplitNewLines(white_ip)   
    for(let i=0; i<=whited_ips.length-1; i++){
        console.log(whited_ips[i])
        if(whited_ips[i] == ip){
            console.log("ip is white listed")
            next()
            return
        }
    }
    res.status(403)
    res.send("FORBIDDEN")
}

module.exports = {
    check
}