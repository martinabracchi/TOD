
const socket = io();
socket.on('sensor', (message) => {
  latestData = message
});



function setup() {
  manda()
  setInterval(manda,10000)
}

function manda(){
messaggio1 = '9'
socket.emit('saluto', messaggio1);}



function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
