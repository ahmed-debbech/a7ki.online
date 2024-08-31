var axios = require('axios')

async function call_namer(){
  try{
    var name = await axios.get('http://192.168.1.9:6062/gen',{ timeout: 7000})
  }catch(e){
    console.log('failed to connect to microservice namer')
    return '-'
  }

  if(name.data == undefined || name.data.name == undefined){
    return '-'
  }
  return name.data.name
}

module.exports = {
    call_namer
}