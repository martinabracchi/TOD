var HTMLcanvas = document.getElementById("my-canvas");
var HTMLcontext = HTMLcanvas.getContext("2d");
var yoff = 0.0;
let mic;

function preload() {
  myFont = loadFont('assets/whyteBook.otf');

  /////////////PICTO PIENI
  pic1 = loadImage('assets/PITTOGRAMMI/PIENI/ATTIVITA.png');
  pic2 = loadImage('assets/PITTOGRAMMI/PIENI/CONTATTO.png');
  pic3 = loadImage('assets/PITTOGRAMMI/PIENI/CONVERSAZIONE.png');
  pic4 = loadImage('assets/PITTOGRAMMI/PIENI/HOME.png');
  pic5 = loadImage('assets/PITTOGRAMMI/PIENI/NUCLEO.png');
  pic6 = loadImage('assets/PITTOGRAMMI/PIENI/RICORDO.png');


  /////////////////PICTO VUOTI
  pic7 = loadImage('assets/PITTOGRAMMI/VUOTI/ATTIVITA.png');
  pic8 = loadImage('assets/PITTOGRAMMI/VUOTI/CONTATTO.png');
  pic9 = loadImage('assets/PITTOGRAMMI/VUOTI/CONVERSAZIONE.png');
  pic10 = loadImage('assets/PITTOGRAMMI/VUOTI/HOME.png');
  pic11 = loadImage('assets/PITTOGRAMMI/VUOTI/NUCLEO.png');
  pic12 = loadImage('assets/PITTOGRAMMI/VUOTI/RICORDO.png');
}

function setup() {

}

function draw() {
  // var canvas1 = createCanvas(windowWidth, windowHeight);
  var canvas1 = createCanvas(400, 400);
  canvas1.hide();
  // canvas1.hide();

  if (mic) {
    const micLevel = mic.getLevel();
    var d = map(micLevel, 0, 1, 10, 50)
    ellipse(width / 2, height / 2, d);
  }



  var real_canvas = canvas1.canvas;
  background(0);
  // let x1 = map(mouseX, 0, windowWidth, 0, 150 );
  // let y1 = map(mouseY, -200, windowHeight, 0, 3);


  // let x1 = mouseX;
  // let y1 = -mouseY;
  // let x2 = map(x1, 0, windowWidth, 0, 150)
  // let y2 = map(y1, 0, windowHeight, 30, 0)
  //
  //
  //   translate(x2, y2  );

  translate(width / 6, height / 9.5)

  var radius = d;

  beginShape();
  fill(color('red'));
  noStroke();
  var xoff = 0;
  for (var b = 0; b < TWO_PI; b += 0.2) {
    var offset = map(noise(xoff, yoff), 0, 1, -30, 30);
    var r = radius + offset;
    var x = r * cos(b);
    var y = r * sin(b);
    vertex(x, y);
    xoff += 0.2;
    // ellipse(x  , y , 4, 4);
  }
  yoff += 0.005;
  endShape();



  beginShape();
  fill(color('blue'));
  noStroke();
  var xoff = 0;
  for (var a = 0; a < TWO_PI; a += 0.1) {
    var offset = map(noise(xoff, yoff), 0, 1, -30, 30);
    var r = radius + offset;
    var x = r * cos(a);
    var y = r * sin(a);
    vertex(x, y);
    xoff += 0.2;
    // ellipse(x  , y , 4, 4);
  }
  yoff += 0.005;
  endShape();



  HTMLcontext.filter = 'blur(12px)';
  HTMLcontext.drawImage(real_canvas, 0, 0);

}

function mousePressed() {
  userStartAudio();
  mic = new p5.AudioIn();
  mic.start();
}




let sketch = function(p) {
  p.setup = function() {

    cnv2 = p.createCanvas(2400, 1080);
    cnv2.position(0, 0);
    cnv2.style('position', 'absolute')


  }

  p.draw = function() {

home = p.image(pic4, 30, 950, 90, 90);
nucleo = p.image(pic11, 160, 950, 90, 90);
attivita = p.image(pic7, 290, 950, 90, 90)

nome = p.text('SILVIA', 30, 50)
p.textFont(myFont);
p.textSize(40);
p.fill('white')

data = p.text('30/11/2020', 2100, 50);
p.textFont(myFont);
p.textSize(40);
p.fill('white')

indicatore = p.text('HOME', 2180, 1025);
p.textFont(myFont);
p.textSize(40);
p.fill('white')


  }
}

let p = new p5(sketch);
