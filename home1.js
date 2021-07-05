
// initialize socket variable on client
const socket = io();
let er1, er3, er4;

var yoff = 0.0;

// let serial;
let latestData = "waiting for data";
let yricordo;
let ycontatto;
let yconversazione;

var colorricordo;
var colorcontatto;
var colorconversazione;

var risultatoricordo = 0;
var risultatocontatto = 0 ;
var risultatoconversazione = 0;
var rosso = false;
let messaggio1 ;


socket.on('sensor', (message) => {
  latestData = message
});

function setup() {
  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.id('canvasFeedback');
  angleMode(DEGREES);

  risultatoconversazione = getItem('risultatoconversazione')
  yconversazione = map(risultatoconversazione,0,100,0,200 )
  select('#risultatoconversazione').html(risultatoconversazione + '/100')
  if(risultatoconversazione>20 && risultatoconversazione <101){
    colorconversazione = "#2c2cff"
  }
  else{colorconversazione = 'red'}


  risultatoricordo = getItem('risultatoricordo')
  yricordo = floor(map(risultatoricordo,0,100,0,200 ))
  select('#risultatoricordo').html(risultatoricordo + '/100')
  if(risultatoricordo>20 && risultatoricordo <101){
    colorricordo = "#2c2cff"
  }
  else{colorricordo = 'red'}


  risultatocontatto = getItem('risultatocontatto')
  ycontatto = map(risultatocontatto,0,100,0,200 )
  select('#risultatocontatto').html(risultatocontatto + '/100')
  if(risultatocontatto>20 && risultatocontatto <101){
    colorcontatto = "#2c2cff"
  }
  else{colorcontatto = 'red'}

  manda()
  setTimeout(mostra, 3000)
}

function draw() {
console.log(latestData);

er2 = new EggRing(width*0.6, height*0.45+100, 180, 300, colorricordo, width/40, yricordo);
er3 = new EggRing(width*0.49, height*0.58+100, 300, 300, colorconversazione, width/40, yconversazione);
er4 = new EggRing(width*0.49, height*0.3+100, 60, 300, colorcontatto, width/40,ycontatto);

  er2.transmit();
  er3.transmit();
  er4.transmit();

    // blendMode(MULTIPLY)

    if (frameCount>20){
      if(latestData === 2){
      console.log(latestData)
      window.open('ricordo.html', '_self')
      }

      if(latestData === 3){
      console.log(latestData)
      window.open('conversazione.html', '_self')
      }

      if(latestData === 1){
      console.log(latestData)
      window.open('contatto.html', '_self')
      }
    }


      gg = day() + " . ";
      if(month()<9){
     mm = '0'+ month() + " . ";
      }
      else{
        mm = month() + " . ";
      }

      aaaa = year();
      if(day()<=9){
      datagiusta = '0'+gg +mm + aaaa;
      }
    else{
        datagiusta = gg + mm + aaaa;
      }
      select('#data').html(datagiusta)
}

function manda(){

  socket.emit('saluto', messaggio1);

  if(colorconversazione == 'red' || colorricordo == 'red' || colorcontatto == 'red' ){
    if (colorconversazione == 'red' && colorricordo == 'red' && colorcontatto == 'red' ){
      messaggio1 = '4';
      socket.emit('saluto', messaggio1);}
  else {
    messaggio1 = '7';
    socket.emit('saluto', messaggio1);}
}

 if(colorconversazione == '#2c2cff' && colorricordo == '#2c2cff' && colorcontatto == '#2c2cff' ){
   messaggio1 = '5';
   socket.emit('saluto', messaggio1);}

}

function mouseClicked(){
  document.getElementById("risultatoricordo").style.display = "block"
  document.getElementById("risultatocontatto").style.display = "block"
  document.getElementById("risultatoconversazione").style.display = "block"

  if(colorconversazione == 'red' || colorricordo == 'red' || colorcontatto == 'red' ){
    if (colorconversazione == 'red' && colorricordo == 'red' && colorcontatto == 'red' ){
      messaggio1 = '4';
      socket.emit('saluto', messaggio1);}
  else {
    messaggio1 = '7';
    socket.emit('saluto', messaggio1);}
}

 if(colorconversazione == '#2c2cff' && colorricordo == '#2c2cff' && colorcontatto == '#2c2cff' ){
   messaggio1 = '5';
   socket.emit('saluto', messaggio1);}

  setTimeout(mostra, 3000)
}

function mostra(){
    document.getElementById("risultatoricordo").style.display = "none"
    document.getElementById("risultatocontatto").style.display = "none"
    document.getElementById("risultatoconversazione").style.display = "none"
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
    vertex(width/40, 0);
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
