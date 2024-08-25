var network = require('../network/namer')
const WebSocket = require('ws');
var Message = require('../model/Message')

let connected_users = []

function chooseGreetingMsg(){
    let arr = [
        ", d5al taw taw!!",
        ", galkom salem!",
        ", ysalem 3likom"
    ]
    let g = Math.floor(Math.random() * ((arr.length) - 0) + 0);
    return arr[g];
} 

async function onConnected(user){
    console.log("connecting new user with id: ", user.id);
    //let naming = await network.call_namer();
    let naming = "hello world"
    user.name = naming;
    if(naming != '-'){
        connected_users.push(user)
        let greeting = chooseGreetingMsg()
        for(let i =0; i<=connected_users.length-1; i++){
            if(connected_users[i].ws.readyState == WebSocket.OPEN){
                if(connected_users[i].id != user.id){
                    let msg = new Message("SYSTEM" , JSON.stringify({greet: user.name + greeting}), Date.now());
                    connected_users[i].ws.send(JSON.stringify(msg).toString());
                }else{
                    let msg = new Message("SYSTEM" , JSON.stringify({id: user.id, name: user.name}), Date.now());
                    user.ws.send(JSON.stringify(msg).toString())
                }
            }
        }
    }
}

function onMessage(user, message){
    console.log("user with id ", user.id ," sent a message")
    
    for(let i =0; i<=connected_users.length-1; i++){
        if(connected_users[i].ws.readyState == WebSocket.OPEN){
            let msg = new Message(user.name , message, Date.now());
            connected_users[i].ws.send(JSON.stringify(msg).toString());
        }
    }
}

function onDisconnected(user){
    console.log("user with id ", user.id ," has existed")

    for(let i =0; i<=connected_users.length-1; i++){
        if(connected_users[i].id == user.id){
            connected_users.splice(i, 1)
            break
        }
    }
}

module.exports = {
    onConnected,
    onMessage,
    onDisconnected,
    connected_users
}