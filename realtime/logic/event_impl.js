var network = require('../network/namer')
const WebSocket = require('ws');

let connected_users = []

function chooseGreetingMsg(){
    let arr = [
        ", d5al taw taw!!",
        ", 9alkom salem!",
        ", yheb yahki m3akom"
    ]
    let g = Math.floor(Math.random() * ((arr.length-1) - 0) + 0);
    return arr[g];
} 

async function onConnected(user){
    console.log("connecting new user with id: ", user.id);
    //let naming = await network.call_namer();
    let naming = "hello world"
    user.name = naming;
    if(naming != '-'){
        connected_users.push(user)
        for(let i =0; i<=connected_users.length-1; i++){
            if(connected_users[i].ws.readyState == WebSocket.OPEN){
                if(connected_users[i].id != user.id){
                    connected_users[i].ws.send(user.name + chooseGreetingMsg());
                }else{
                    user.ws.send('3aslema, '+ user.name)
                }
            }
        }
    }
}

function onMessage(user, message){
    console.log("user with id ", user.id ," sent a message")
    
    for(let i =0; i<=connected_users.length-1; i++){
        if(connected_users[i].ws.readyState == WebSocket.OPEN){
            if(connected_users[i].id != user.id){
                connected_users[i].ws.send(message.toString());
            }
        }
    }

}

function onDisconnected(){

}

module.exports = {
    onConnected,
    onMessage,
    onDisconnected
}