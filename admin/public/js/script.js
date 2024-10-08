
const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
  
    const options = {
      day: '2-digit',
      month: 'short', // Use 'long' for full month names
      hour: '2-digit',
      minute: '2-digit',
      hour12: false // Use 24-hour format. Set to true for 12-hour format
    };
  
    return new Intl.DateTimeFormat('en-GB', options).format(date);
};

function createRecMsg(username, color, text, time){
    return '<div id="m'+time+'" class="message rec canBan"><div class="message-text"><b style="color: '+color+'">'+username+': </b> '+text+'</div><div class="message-time">'+formatTimestamp(time)+'</div></div>';
}
 
function createRecMsgBanned(username, color, text, time){
    return '<div id="m'+time+'" class="message rec banned"><div class="message-text"><b style="color: '+color+'">'+username+': </b> '+text+'</div><div class="message-time">'+formatTimestamp(time)+'</div></div>';
}

function banMessage(id){
    console.log(id)
    fetch(`/banMsg/${id}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data) {
                console.log(data)
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function msgExists(json){
    let idd = ("m" + (json.time))
    let dv = document.getElementById(idd)
    if(dv == null) return false

    if(idd == dv.id){
        if(json.banned){
            document.getElementById(idd).classList.add("banned")
        }
        return true
    }
    return false
}

const popup = document.getElementById('popup');
const popupClose = document.getElementById('popup-close');

// Function to show the popup
function showPopup(message) {
    const popupMessage = document.getElementById('popup-message');
    popupMessage.textContent = message;
    popup.style.display = 'flex';
}

// Function to hide the popup
function hidePopup() {
    popup.style.display = 'none';
}

// Close popup when the close button is clicked
popupClose.addEventListener('click', hidePopup);

document.getElementById("send").disabled = true
