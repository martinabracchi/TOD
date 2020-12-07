var yoff = 0.0;
// initialize socket variable on client
const socket = io();

// let serial;
let latestData = "waiting for data";



function setup() {
  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.id('canvasBlob');

  userStartAudio();
  mic = new p5.AudioIn();
  mic.start();
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


  // if(frameCount>200){
  // document.getElementById("pictotask").style.display = "none"
  // document.getElementById("picto1").style.display = "none"
  //   document.getElementById("home").style.display = "none"
  //   document.getElementById("istruzione").style.display = "none"}

    if(frameCount > 300){
    console.log(latestData)
    window.open('punteggioric.html', '_self')
    }


}




function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
