function processSystemReq(json, page){
    let json1 = JSON.parse(json.text);
    if(json1.id && json1.name){
        page.getElementById('greeting').innerText= '3aslema, ' + json1.name +'!';
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
    if(json1.error){
        showPopup(json1.error.toString())
    }
}