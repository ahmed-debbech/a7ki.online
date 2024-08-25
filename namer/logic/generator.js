var db = require('./database')

function generate(){
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

module.exports = {
    generate
}