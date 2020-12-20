var yoff = 0.0;
// initialize socket variable on client
const socket = io();

// let serial;
var cosadetta;
let latestData = "waiting for data";
var bonus = 0;
var punteggio;
var timer = 0;
var aggiunto = false;

socket.on('sensor', (message) => {
  latestData = message
});



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

  setInterval(timerup, 1000)
}





function gotSpeech() {
  if (speechRec.resultValue) {
    cosadetta = speechRec.resultString
    console.log(cosadetta)
  }
}



function draw() {

  messaggio1 = '7'
  socket.emit('saluto', messaggio1);
  
  background(0)
  const micLevel = mic.getLevel();
  var d = map(micLevel, 0, 1, 0, 300)

  var radius = d + 100;
  translate(width / 2, height / 2)

  if (cosadetta === "bene" || cosadetta === "veramente" || cosadetta === "cuore" || cosadetta === "ieri" || cosadetta === "io" || cosadetta === "molto"){
  if (!aggiunto){
  bonus = bonus + 0.1;
  aggiunto = true;}
  }
  aggiunto = false;


  if(timer < 20){
  punteggio = timer + bonus}
  if(timer> 20 & timer < 60){
    punteggio = timer + bonus/2
  }
  if(timer > 60){
    punteggio = timer - bonus;
  }
  console.log("PUNTEGGIO: " + punteggio);


  beginShape();
  if (cosadetta === "bene" || cosadetta === "veramente" || cosadetta === "cuore" || cosadetta === "ieri" || cosadetta === "io" || cosadetta === "molto") {
    fill(color("#2c2cff"));
  } else {
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

  if (frameCount > 300) {
    document.getElementById("pictotask").style.display = "none"
    document.getElementById("picto1").style.display = "none"
    document.getElementById("home").style.display = "none"
    document.getElementById("istruzione").style.display = "none"
    if (latestData === 3) {
      console.log(latestData)
      storeItem('risultatoconversazione', punteggio)
      window.open('elaborazioneconv.html', '_self')
    }
  }


}

function timerup(){
  timer = timer + 1
  console.log("SECONDI PASSATI: " + timer)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
