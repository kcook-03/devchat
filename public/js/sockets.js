var ws = new WebSocket('ws://localhost:8080');
function message(e){
    if(e.keyCode == 13){
        msg()
    }
}
function msg(){
    input = document.getElementsByClassName('chat-send')[0];
    send(input.value);
    input.value = '';
    return false
}
function send(data){
    if(ws.readyState == WebSocket.OPEN){
        ws.send(data)
    }else{
        throw 'No connection'
    }
}
function timeAgo(date){
  var seconds = Math.floor((new Date() - date) / 1000);
  var interval = Math.floor(seconds / 31536000);
  if(interval > 1) return interval + ' years';
  interval = Math.floor(seconds / 2592000);
  if(interval > 1) return interval + ' months';
  interval = Math.floor(seconds / 86400);
  if(interval > 1) return interval + 'd';
  interval = Math.floor(seconds / 3600);
  if(interval > 1) return interval + 'h';
  interval = Math.floor(seconds / 60);
  if(interval > 1) return interval + 'm';
  return Math.floor(seconds) + 's';
}
ws.addEventListener('open',  function(){})
ws.addEventListener('message', function(msg){
    var chat = document.getElementsByClassName('chatList')[0];
    var session = document.getElementById('session').value;
    var data = JSON.parse(msg.data);
    var clss = 'message';
    if(session.user == msg.author){
        clss = 'sentMessage';
    }
    chat.innerHTML += `<p class="p${clss}">${data.message}<span class="timestamp">${data.author} | ${timeAgo(data.madeAt)}</span><p>`
})