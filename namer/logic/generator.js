var db = require('./database')
var colorGen = require("randomcolor")

function generateName(){
    let finalName = ''

    let index = Math.floor(Math.random() * (db.Name.length - 0) + 0)
    if(db.Name[index].s == 'F'){
        let index1 = Math.floor(Math.random() * (db.FAdj.length - 0) + 0)
        finalName = db.Name[index].n + " " + db.FAdj[index1]
    }
    if(db.Name[index].s == 'M'){
        let index1 = Math.floor(Math.random() * (db.MAdj.length - 0) + 0)
        finalName = db.Name[index].n + " " + db.MAdj[index1]
    }
    return finalName
}

function generateColor(){
    let rand
    if(Math.round(Math.random()) == 1)
        rand = colorGen.randomColor({luminosity: "dark"})
    else
        rand = colorGen.randomColor({luminosity: "bright"})

    console.log(rand)
    return rand;
}

module.exports = {
    generateName,
    generateColor
}