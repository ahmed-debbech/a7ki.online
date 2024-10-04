var util_file = require("../util/file")

let white_listed_ips = []

function load(){
    let white_ip = process.env.WHITE_IP_LIST
    let whited_ips = util_file.readFileAndSplitNewLines(white_ip)   
    white_listed_ips = whited_ips
}

function check(ip){
    for(let i=0; i<=white_listed_ips.length-1; i++){

        if(white_listed_ips[i] == ip){
            console.log("ip is white listed")
            return true
        }
    }
    return false
}

module.exports = {
    load,
    check
}