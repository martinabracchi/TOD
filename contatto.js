var yoff = 0.0;
// initialize socket variable on client
const socket = io();

// let serial;
let latestData = "waiting for data";
var timer = 0;
var bonus = 0;
var punteggio;



function setup() {
  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.id('canvasBlob');
  setInterval(timerup, 1000)
}

socket.on('sensor', (message) => {
  latestData = message
});







function draw() {

  messaggio1 = '7'
  socket.emit('saluto', messaggio1);

  background(0)
  console.log(latestData)

  // console.log(d)

  if(latestData == 57 || latestData == 55 || latestData == 54 || latestData == 59 || latestData == 52 || latestData == 51|| latestData == 53 || latestData == 56 || latestData == 58){
  bonus = bonus + 0.01 }


 translate(width / 2, height / 2)
 var radius = 120;

  beginShape();
  if(latestData == 51){
  radius = radius + 20;
  fill(color("#2c2cff"));
  }
  if (latestData == 61) {
  radius = radius + 50;
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
    xoff += 0.2;
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
    xoff += 0.2;
  }
  yoff += 0.005;
  endShape();


  if(timer<60){
  punteggio = timer/2 + bonus;}
  if(timer> 60 && timer > 20){
    punteggio = timer/2 - bonus
  }


  console.log("PUNTEGGIO: " + floor(punteggio))
  console.log("BONUS: " + bonus)

  if (frameCount > 300) {
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

function timerup(){
  timer = timer + 1;
}

function aumento(){
  bouns = bonus + 0.1;

}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
