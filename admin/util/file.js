const fs = require('fs');

function readFileAndSplitNewLines(filename){
    const data = fs.readFileSync(filename, 'utf8');
    try {
        const data = fs.readFileSync(filename, 'utf8').split("\n");
        let arr = []
        for(let i=0; i<=data.length-1; i++){
            arr.push(data[i])
        }
        return arr
    } catch (err) {
        console.log(err);
    }
    return []
}

module.exports = {
    readFileAndSplitNewLines
}