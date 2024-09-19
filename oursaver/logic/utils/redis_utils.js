function isMassage(s){
    if(s[0] == "m") return true
    return false
}

function extractMsgIdNum(s){
    return Number(s.substring(1, s.length))
}

function sortWhat(type, map){
    let map = new Map()
    let arr = Array.from(map, ([name, value]) => ({ name, value }));
    arr = arr.filter(va => isMessage(va.name));

    let min = arr[0]
    for(let i =1; i<=arr.length-1; i++){
        if(arr[i].name > min.name){
            min = arr[i]
        }
    }
}

module.exports = {
    isMassage,
    extractMsgIdNum
}