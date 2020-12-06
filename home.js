var yoff = 0.0;
// initialize socket variable on client
const socket = io();

// let serial;
let latestData = "waiting for data";


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



  if(latestData === 11){
  console.log(latestData)
  window.open('ricordo.html', '_self')
  }

  if(latestData === 2){
  console.log(latestData)
  window.open('conversazione.html', '_self')
  }

  if(latestData === 3){
  console.log(latestData)
  window.open('contatto.html', '_self')
  }



  gg = day() + " · ";
  mm = month() + " · ";
  aaaa = year();
  if(day()<=9){
  datagiusta = '0'+gg +mm + aaaa;
  }

else{
    datagiusta = gg + mm + aaaa;
  }

  select('#data').html(datagiusta)
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
