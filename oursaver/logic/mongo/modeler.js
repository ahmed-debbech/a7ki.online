function deserializeAndModel(arrToSave){
    let finArr = []
    for(let i=0; i<=arrToSave.length-1; i++){
        finArr.push(deserializeToObject(arrToSave[i].body))
    }
    return finArr
}

function deserializeToObject(serialization){
    return JSON.parse(serialization)
}

module.exports = {
    deserializeAndModel
}