var yoff = 0.0;
// initialize socket variable on client
const socket = io();

const url_string = window.location.href
let url = new URL(url_string);
let parametro = url.searchParams.get("punt");


// let serial;
let latestData = "waiting for data";



function setup() {
  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.id('canvasBlob');

  userStartAudio();
  mic = new p5.AudioIn();
  mic.start();
  setInterval(manda,1000);

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
    var d = map(micLevel, 0,1, 10,500)
  fill(color('#2c2cff'));
  noStroke()
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

function manda(){
  let messaggio1 = '4';
  socket.emit('saluto', messaggio1);
}


function mouseClicked(){
      window.open('benvenuto.html', '_self')
}




function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
