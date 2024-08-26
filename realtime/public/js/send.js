var sentAlready = 0

function sendMessage(sock, text){
    if(text.length <= 0) return;

    if(sentAlready > 0) {document.getElementById('cooldown').hidden = false; return;}

    if(text.length > 256 ) {fail(); return;}

    sock.send(text)
    sentAlready = 4
    document.getElementById("numberCoolSec").innerText = sentAlready
    document.getElementById('cooldown').hidden = true

    let t = setInterval(() => {
        document.getElementById("numberCoolSec").innerText = sentAlready
        sentAlready--
        if(sentAlready < 0){
            sentAlready = 0;
            document.getElementById("numberCoolSec").innerText = sentAlready
            document.getElementById('cooldown').hidden = true

            clearInterval(t)
        }
    }, 1000)
    document.getElementById("field").value = ""
}

function fail(){
    document.getElementById('error_mesg').hidden = false
    setTimeout(()=> {
        document.getElementById('error_mesg').hidden = true
    },3000)
}
