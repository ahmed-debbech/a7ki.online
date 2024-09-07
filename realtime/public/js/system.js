function processSystemReq(json, page){
    let json1 = JSON.parse(json.text);
    if(json1.id && json1.name){
        page.getElementById('greeting').innerText= '3aslema, ' + json1.name +'!';
        
        if(localStorage.getItem("userid") == null){
            showPopup("Marhba bik fl chat room anonyme, tnejem tahki taht esm mosta3ar, m3a twensa zeda kifek kifhom." + 
                "'a7ki.online' houwa site web sna3tou ana Ahmed Debbech."
            )
        }
        localStorage.setItem("userid", json1.id)
        return;
    }
    if(json1.greet){
        let div = page.getElementById('msgs')
        div.innerHTML += createSystemMsg("[SYSTEM]", json1.greet, json.time)
        div.scrollTop = div.scrollHeight;
        return; 
    }
    if(json1.numberOn){
        let num = page.getElementById("numOn")
        num.innerText = json1.numberOn 
    }
    if(json1.messages){
        for(let i=0; i<=json1.messages.length-1; i++){
            console.log(json1.messages[i])
            publishMsg(json1.messages[i])
        }
        document.getElementById("send").disabled = false
        areRedisMessagesReady = true;
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
    }
    if(json1.error){
        showPopup(json1.error.toString())
    }
}