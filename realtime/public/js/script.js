
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
    return '<div class="message received"><div class="message-text"><b>'+username+': </b> '+text+'</div><div class="message-time">'+formatTimestamp(time)+'</div></div>';
}
  

function createSentMsg(username, text, time){
    return '<div class="message sent"><div class="message-text"><b>'+username+': </b> '+ text +'</div><div class="message-time">'+formatTimestamp(time)+'</div></div>'
}