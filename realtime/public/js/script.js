
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

function createRecMsg(username, text, time){
    return '<div class="message rec"><div class="message-text"><b>'+username+': </b> '+text+'</div><div class="message-time">'+formatTimestamp(time)+'</div></div>';
}
  
function createSystemMsg(username, text, time){
    return '<div class="message sys"><div class="message-text"><b>'+username+' </b> '+ text +'</div><div class="message-time">'+formatTimestamp(time)+'</div></div>'
}

function createOwnMsg(username, text, time){
    return '<div class="message own"><div class="message-text"><b>'+username+': </b> '+ text +'</div><div class="message-time">'+formatTimestamp(time)+'</div></div>'
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
