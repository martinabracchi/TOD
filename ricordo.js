var yoff = 0.0;
// initialize socket variable on client
const socket = io();

// let serial;
let latestData = "waiting for data";


function preload(){
  ricordo = loadImage("assets/PITTOGRAMMI/VUOTI/RICORDO.png")
}

function setup() {
  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.id('canvasBlob');
}

socket.on('sensor', (message) => {
  latestData = message
});



function draw() {

  // background(none);
console.log(latestData)

  translate(width / 2, height / 2)

  var radius = width/7;

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
  if(latestData === 4){
    fill(color('#ff0000'));
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


  if(frameCount>300){
  document.getElementById("picto4").style.display = "none"
}

}



function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
