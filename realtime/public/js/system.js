function processSystemReq(json){
    let json1 = JSON.parse(json.text);
    if(json1.id && json1.name){
        document.getElementById('greeting').innerText= '3aslema, ' + json1.name +'!';
        
        if(localStorage.getItem("userid") == null){
            showPopup("Marhba bik fi chat room anonyme, tnejem tahki taht esm mosta3ar, m3a twensa kifek kifhom." + 
                " Brabi rodbelek m spamers w ma tenzel 3la hatta lien yab3thouh! enjooooy <3"
            )
        }
        localStorage.setItem("userid", json1.id)
        return;
    }
    if(json1.greet){
        json.text = json1.greet
        publishMsg(json)
        return; 
    }
    if(json1.numberOn){
        let num = document.getElementById("numOn")
        num.innerText = json1.numberOn 
    }
    if(json1.messages){
        areRedisMessagesReady = true;
        for(let i=0; i<=json1.messages.length-1; i++){
            console.log(json1.messages[i])
            publishMsg(json1.messages[i])
        }
        document.getElementById("send").disabled = false
        for(let o = 0; 0 <=pendindMsgs.length-1; o++){
            publishMsg(pendindMsgs[o]);
        }
    }
    if(json1.cooldown != undefined){
        if(json1.cooldown == true){
            cooldown()
        }else{
            document.getElementById("field").value = ""
        }
        document.getElementById("field").focus();
    }
    if(json1.error){
        showPopup(json1.error.toString())
    }
    if(json1.update){
        console.log(json1.update)
        let event = json1.update
        let msgIdInDom = event.key
        
        if(document.getElementById(msgIdInDom) == null) return

        if(event.event == "DELETED"){
            document.getElementById(msgIdInDom).remove()
        }
        if(event.event == "BANNED"){
            document.getElementById(msgIdInDom).innerHTML = "THIS MESSAGE WAS BANNED BY MODERATOR"
            document.getElementById(msgIdInDom).style.backgroundColor="#ff6666"
        }
    }
}