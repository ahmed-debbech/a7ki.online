var network = require('../network/namer')
const WebSocket = require('ws');
var Message = require('../model/Message')
var redis = require('../redis/impl')
var cool = require('../logic/cooldown')

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
    let naming = await network.call_namer();
    //let naming = "hello world"
    user.name = naming.name;
    user.color = naming.color; 
    if(naming != '-'){
        connected_users.push(user)
        redis.saveNewUser(user)
        let greeting = ", d5al taw l chat!"
        for(let i =0; i<=connected_users.length-1; i++){
            if(connected_users[i].ws.readyState == WebSocket.OPEN){
                if(connected_users[i].id != user.id){
                    let msg = new Message("SYSTEM" , JSON.stringify({greet: user.name + greeting}), Date.now());
                    connected_users[i].ws.send(JSON.stringify(msg).toString());
                }else{
                    let msg = new Message("SYSTEM" , JSON.stringify({id: user.id, name: user.name}), Date.now());
                    user.ws.send(JSON.stringify(msg).toString())

                    let msgs = await redis.getLegitMessages()
                    msg = new Message("SYSTEM" , JSON.stringify({messages: msgs}), Date.now());
                    user.ws.send(JSON.stringify(msg).toString())
                }
            }
        }
        console.log("user succesfully connected with id: ", user.id);
    }else{
        console.log("user failed to connect with id: ", user.id)
        let msg = new Message("SYSTEM" , JSON.stringify({error: 'oops!! saret mochkla ma tnejemch tconnecti, trah 3awed lansi el page.'}), Date.now());
        user.ws.send(JSON.stringify(msg).toString())
    }
}

function onMessage(user, message){

    if(!cool.checkCooldown(user)) return;

    console.log("user with id ", user.id ," sent a message")

    let msg = new Message(user.name , message, Date.now(), user.id, user.color);
    redis.saveToRedis(msg);    

    for(let i =0; i<=connected_users.length-1; i++){
        if(connected_users[i].ws.readyState == WebSocket.OPEN){
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

function onUpdateMessage(messageDecision){

    let msg = new Message("SYSTEM" , JSON.stringify({update: messageDecision}), Date.now());

    if(msg != undefined)
    for(let i =0; i<=connected_users.length-1; i++){
        if(connected_users[i].ws.readyState == WebSocket.OPEN){
            connected_users[i].ws.send(JSON.stringify(msg).toString());
        }
    }
}

module.exports = {
    onConnected,
    onMessage,
    onDisconnected,
    onUpdateMessage,
    connected_users
}