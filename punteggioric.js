let er1, er3, er4;

var yoff = 0.0;
// initialize socket variable on client
const socket = io();

// let serial;
let latestData = "waiting for data";
const urlString = window.location.href;

const url = new URL(urlString);
let punteggio = url.searchParams.get('punteggio');


function setup() {
  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.id('canvasFeedback');
  angleMode(DEGREES);


  er2 = new EggRing(width*0.6, height*0.5, 180, 300, color('#2c2cff'), width/40, 200);
  // er2 = new EggRing(width*0.5, height*0.5, 0, 350);
  // er3 = new EggRing(width*0.46, height*0.65, 300, 300, color('#2c2cff'), width/40, 300);
  // er4 = new EggRing(width*0.48, height*0.3, 60, 300, color('red'), width/40, 120);
}

socket.on('sensor', (message) => {
  latestData = message
});


function draw() {
// console.log(latestData)
console.log(punteggio)
  er2.transmit();
  // er3.transmit();
  // er4.transmit();
    // blendMode(MULTIPLY)

    if (frameCount>20){
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
    }


      gg = day() + " · ";
      if(month()<9){
     mm = '0'+ month() + " · ";
      }
      else{
        mm = month() + " · ";
      }

      aaaa = year();
      if(day()<=9){
      datagiusta = '0'+gg +mm + aaaa;
      }
    else{
        datagiusta = gg + mm + aaaa;
      }
      select('#data').html(datagiusta)

      if(frameCount > '500'){
          window.open('index.html', '_self')
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
