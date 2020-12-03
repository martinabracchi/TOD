var yoff = 0.0;
// initialize socket variable on client
const socket = io();

// let serial;
var cosadetta;
let latestData = "waiting for data";


function preload(){
  ricordo = loadImage("assets/PITTOGRAMMI/VUOTI/RICORDO.png")
}

function setup() {
  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.id('canvasBlob');

speechRec = new p5.SpeechRec('IT', gotSpeech);
let continuous = true;
// If you want to try partial recognition (faster, less accurate)
let interim = true;
speechRec.start(continuous, interim);

userStartAudio();
mic = new p5.AudioIn();
mic.start();

}

socket.on('sensor', (message) => {
  latestData = message
});



function gotSpeech() {
  if (speechRec.resultValue) {
   cosadetta= speechRec.resultString
   console.log(cosadetta)
  }
  }



function draw() {

  // background(none);
// console.log(latestData)


if (mic) {
  const micLevel = mic.getLevel();
  var d = map(micLevel, 0,1, 10,50)
}

  translate(width / 2, height / 2)

  var radius = width/7;

  beginShape();
  if (cosadetta === "bene" || cosadetta === "cammello"){
    fill(color('blue'));
}
else{fill('red')}
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


  fill(color('#2c2cff'));
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

}



function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}