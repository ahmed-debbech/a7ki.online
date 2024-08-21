var axios = require('axios')

async function call_namer(){
    axios.get('ip')
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
    });
}

module.exports = {
    call_namer
}