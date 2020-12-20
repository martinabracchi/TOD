var yoff = 0.0;
// initialize socket variable on client
const socket = io();

// let serial;
var salutorec;
let latestData = "waiting for data";

socket.on('sensor', (message) => {
  latestData = message
});



function setup() {
  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.id('canvasBlob');
  userStartAudio();
  mic = new p5.AudioIn();
  mic.start();
 speechRec = new p5.SpeechRec('IT', gotSpeech);


}

function mouseClicked(){

  let continuous = false;
  // If you want to try partial recognition (faster, less accurate)
  let interim = false;
  speechRec.start(continuous, interim);
  document.getElementById("istruzpiccola").style.display = "none"
  document.getElementById("istruzione").style.display = "none"

}



function gotSpeech() {
  if (speechRec.resultValue) {
    salutorec = speechRec.resultString
    console.log(salutorec)
    speechRec.stop();
    select('#saluto').html('"' + salutorec + '"')
    storeItem("salutorec", salutorec)
    document.getElementById("conferma").style.display = "block"
    document.getElementById("si").style.display = "block"
  }
}



function draw() {

  background(0)

  let messaggio1 = '5';
  socket.emit('saluto', messaggio1);
  const micLevel = mic.getLevel();
  var d = map(micLevel, 0, 1, 0, 300)

  var radius = d + 100;
  translate(width / 2, height / 2)

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


}



function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
