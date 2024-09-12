var axios = require('axios')

async function call_namer(){
  try{
    var name = await axios.get('http://'+process.env.NAMER_URL+'/gen',{ timeout: 7000})
  }catch(e){
    console.log('failed to connect to microservice namer')
    return '-'
  }

  if(name.data == undefined || name.data.name == undefined || name.data.color == undefined){
    return '-'
  }
  return name.data
}

module.exports = {
    call_namer
}