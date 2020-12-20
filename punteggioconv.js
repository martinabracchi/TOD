let er1, er3, er4;

var yoff = 0.0;
// initialize socket variable on client
const socket = io();

// let serial;
let latestData = "waiting for data";
let risultatoconversazione;
let yconversazione;
let colorconversazione;



function setup() {
  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.id('canvasFeedback');
  angleMode(DEGREES);


}

socket.on('sensor', (message) => {
  latestData = message
});


function draw() {

risultatoconversazione = getItem('risultatoconversazione');
yconversazione = map(risultatoconversazione,0,100,0,200 )
select('#risultatoconversazione').html(risultatoconversazione + '%')
if(risultatoconversazione>30 && risultatoconversazione <101){
colorconversazione = "#2c2cff"
}
else{colorconversazione = 'red'}


er3 = new EggRing(width*0.49, height*0.58+100, 300, 300, colorconversazione, width/40, yconversazione);

  er3.transmit();
  select('#risultatoconversazione').html(risultatoconversazione + '/100')

  if(frameCount > '300'){
    let risultatoconversazione = getItem('risultatoconversazione')
    storeItem('risultatoconversazione' ,risultatoconversazione)
    window.open('home.html', '_self')

  }
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
    bezierVertex(0, height/36, this.px, this.py, width/20,height/36);
    vertex(width/40, 0)
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
