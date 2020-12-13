var yoff = 0.0;
// initialize socket variable on client
const socket = io();
const url_string = window.location.href
let url = new URL(url_string);

// let serial;
let latestData = "waiting for data";
let timer = 0;
let qualità = 100;
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
  background(0)

// console.log(latestData)

  translate(width / 2, height / 2)
  const micLevel = mic.getLevel();
  var d = map(micLevel, 0,1, 10,200)
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




punteggio = timer*10 + qualità/5;
console.log("PUNTEGGIO: " + punteggio)

if(frameCount>300){

document.getElementById("pictotask").style.display = "none"
document.getElementById("picto1").style.display = "none"
document.getElementById("home").style.display = "none"
document.getElementById("istruzione").style.display = "none"

  if(latestData === 11){
  let punteggio= timer + qualità/10;
  console.log(latestData);
  // let nuovapagina = "elaborazioneric.html";
  storeItem('punteggio', punteggio)
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
  qualità = qualità-0.01}
}





function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
