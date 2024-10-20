function sendMessage(sock, text){
    if(text.length <= 0) return;
    //if(text.length > 256 ) {fail(); return;}
    sock.send(text);
}

function cooldown(){
    document.getElementById('cooldown').hidden = false;
    document.getElementById("numberCoolSec").innerText = "quelques"
    setTimeout(()=>{
        document.getElementById('cooldown').hidden = true
    }, 2000)
}

function fail(){
    document.getElementById('error_mesg').hidden = false
    setTimeout(()=> {
        document.getElementById('error_mesg').hidden = true
    },3000)
}
