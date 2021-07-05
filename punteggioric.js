let er1, er3, er4;

var yoff = 0.0;
// initialize socket variable on client
const socket = io();

// let serial;
let latestData = "waiting for data";
let yricordo;
let colorricordo;
let risultatoricordo;


function setup() {
  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.id('canvasFeedback');
  angleMode(DEGREES);
  
  risultatoricordo = getItem('risultatoricordo')
  yricordo = floor(map(risultatoricordo,0,100,0,200 ))
  if(risultatoricordo>20 && risultatoricordo <101){
    colorricordo = "#2c2cff"}
    else{
    colorricordo = 'red'
    }
  select('#risultatoricordo').html(risultatoricordo + '%')

  manda();

}

socket.on('sensor', (message) => {
  latestData = message
});


function draw() {

er2 = new EggRing(width*0.6, height*0.45+100, 180, 300, colorricordo, width/40, yricordo);

  er2.transmit();
  select('#risultatoricordo').html(risultatoricordo + '/100')

  if(frameCount > '170'){
    let risultatoricordo = getItem('risultatoricordo')
    storeItem('risultatoricordo' ,risultatoricordo)
    window.open('home.html', '_self')

  }
}

function manda(){
  if(risultatoricordo>20 && risultatoricordo <101){
    colorricordo = "#2c2cff"
    messaggio1 = '5';
    socket.emit('saluto', messaggio1);
  }
  else{colorricordo = 'red'
  messaggio1 = '4';
  socket.emit('saluto', messaggio1);}
}

class Egg {
  constructor(xpos, ypos, t, s, riempi, pxpos, pypos) {
    this.x = xpos;
    this.y = ypos;
    this.tilt = t;
    this.riempi = riempi;
    this.scalar = s / 100.0;
    this.px = pxpos;
    this.py = pypos;
  }


  display() {
    noStroke();
    fill(this.riempi);
    push();
    translate(this.x, this.y);
    rotate(this.tilt);
    scale(this.scalar);
    beginShape();
    vertex(0, height/36);
    // bezierVertex(25, -100, 50, -65, 50, -30);
    bezierVertex(0, height/36, this.px, this.py, width/20,height/36);
    vertex(width/40, 0)
    // bezierVertex(-25, 10, -40, -15, -50, -30);
    // bezierVertex(-50, -65, -25, -100, 0, -100);
    endShape();
    pop();
  }
}


class EggRing {
  constructor(x, y, t, sp, riempi, px, py) {
    this.x = x;
    this.y = y;
    this.t = t;
    this.sp = sp;
    this.riempi = riempi;
    this.px = px;
    this.py = py;
    this.ovoid = new Egg(this.x, this.y, this.t, this.sp, this.riempi, this.px, this.py);


  }

  transmit() {
    this.ovoid.display();
  }



}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
