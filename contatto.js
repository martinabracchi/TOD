var yoff = 0.0;
// initialize socket variable on client
const socket = io();

// let serial;
let latestData = "waiting for data";
var timer = 0;
var bonus = 0;
var punteggio;
let d;


function setup() {
  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.id('canvasBlob');
  setInterval(timerup, 1000)
 setInterval(manda, 4000)
}

socket.on('sensor', (message) => {
  latestData = message
});


function draw() {
  background(0)
  console.log(latestData)

  if(latestData == 51){
    d = 55
  bonus = bonus + 0.4 }

  else if(latestData == 61){
    d = 75
  bonus = bonus + 0.8}

  else if(latestData == 41){
  bonus = bonus + 0.2
  d = 25 }

  else{
    d = 0
  }

 translate(width / 2, height / 2)
 var radius = 80 +d;

  beginShape();
  if(latestData == 51 || latestData == 61 || latestData == 41 ){
  fill(color("#2c2cff"));
  }
  else {
    fill('red')
  }
  noStroke();
  var xoff = 0;
  for (var b = 0; b < TWO_PI; b += 0.5) {
    var offset = map(noise(xoff, yoff), 0, 1, -100, 100);
    var r = radius + offset;
    var x = r * cos(b);
    var y = r * sin(b);
    vertex(x, y);
    xoff += 0.1;
  }
  yoff += 0.005;
  endShape();



  beginShape();
  fill(color('#2c2cff'));
  noStroke();
  var xoff = 0;
  for (var a = 0; a < TWO_PI; a += 1) {
    var offset = map(noise(xoff, yoff), 0, 1, -100, 100);
    var r = radius + offset;
    var x = r * cos(a);
    var y = r * sin(a);
    vertex(x, y);
    xoff += 0.1;
  }
  yoff += 0.005;
  endShape();


  if(timer<60){
  punteggio = timer + bonus;}
  if(timer> 60 && timer > 20){
    punteggio = timer - bonus
  }

  if(timer> 150 || punteggio > 150){
    punteggio = 150;
  }


  console.log("PUNTEGGIO: " + floor(punteggio))
  console.log("BONUS: " + bonus)

  if (frameCount > 150) {
    document.getElementById("pictotask").style.display = "none"
    document.getElementById("picto1").style.display = "none"
    document.getElementById("home").style.display = "none"
    document.getElementById("istruzione").style.display = "none"

    if (latestData === 1) {
      console.log(latestData)
      window.open('elaborazionecont.html', '_self')
      storeItem("risultatocontatto" , punteggio )
    }
  }
}

function manda(){
  messaggio1 = '7'
  socket.emit('saluto', messaggio1);
}

function timerup(){
  timer = timer + 1;
}

function aumento(){
  bouns = bonus + 0.1;
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
