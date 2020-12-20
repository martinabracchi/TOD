var yoff = 0.0;
// initialize socket variable on client
const socket = io();
const url_string = window.location.href
let url = new URL(url_string);

// let serial;
let latestData = "waiting for data";
let timer = 0;
let malus = 0;
let punteggio;







function setup() {
  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.id('canvasBlob');


  userStartAudio();
  mic = new p5.AudioIn();
  mic.start();
  setInterval(timerup, 1000)
  setInterval(riduzione, 2000)
}

socket.on('sensor', (message) => {
  latestData = message
});



function draw() {

  messaggio1 = '7'
  socket.emit('saluto', messaggio1);

  background(0)

  translate(width / 2, height / 2)
  const micLevel = mic.getLevel();
  var d = map(micLevel, 0,1, 10,200)

  if(d>20){
    messaggio1 = '4';
    socket.emit('saluto', messaggio1);
  }
  // console.log(d)

  var radius = d+100;


  beginShape();
  fill(color('#ff0000'));
  noStroke();
  var xoff = 0;
  for (var b = 0; b < TWO_PI; b += 0.2) {
    var offset = map(noise(xoff, yoff), 0, 1, -150, 100);
    var r = radius + offset;
    var x = r * cos(b);
    var y = r * sin(b);
    vertex(x, y);
    xoff += 0.2;
  }
  yoff += 0.005;
  endShape();



  beginShape();
    var d = map(micLevel, 0,1, 10,500)
  if(latestData === 4 || d>15){
    fill(color('#ff0000'));
    setInterval(riduzione, 2000)
  }
  else{
  fill(color('#2c2cff'));}
  noStroke();
  var xoff = 0;
  for (var a = 0; a < TWO_PI; a += 0.1) {
    var offset = map(noise(xoff, yoff), 0, 1, -150, 100);
    var r = radius + offset;
    var x = r * cos(a);
    var y = r * sin(a);
    vertex(x, y);
    xoff += 0.2;
  }
  yoff += 0.005;
  endShape();



if(timer<40){
punteggio = timer - malus;}
if(timer>40){
  punteggio = timer + malus
}

if(punteggio < 0){
  punteggio = 0
}

if(timer> 200){
  punteggio = 150;
}
console.log("PUNTEGGIO: " + punteggio)

if(frameCount>300){

document.getElementById("pictotask").style.display = "none"
document.getElementById("picto1").style.display = "none"
document.getElementById("home").style.display = "none"
document.getElementById("istruzione").style.display = "none"

  if(latestData === 2){
  console.log(latestData);
  storeItem('risultatoricordo', punteggio)
  window.open("elaborazioneric.html", '_self')
  }
}

}


function timerup(){
  timer = timer + 1
  console.log("SECONDI PASSATI: " + timer)
}

function riduzione(){

  const micLevel = mic.getLevel();
  var d = map(micLevel, 0,1, 10,500)
  if(latestData === 4 || d>15){
  malus = malus+0.01}
}



function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
