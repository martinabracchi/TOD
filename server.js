// Load HTTP module to create server, handle requests and send back static files (html, css, js)
const http = require('http');
// Load file system module to load files from computer
const fs = require('fs');
// Load path module to read paths from urls
const path = require('path');

// Load serialport module to communicate with arduino
const SerialPort = require('serialport');
// Open up connection with Arduino board
const serial = new SerialPort('COM6', {
        baudRate: 500000
    }, function() {
        console.log('Ready to communicate with Arduino on serial port');
})

// Define port on which the webpage will be served from
let port = process.env.PORT || 8001;
// list of possible extentions that the browser can serve
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm'
};

// Create a very basic HTTP server
const server = http.createServer((request,response) => {
    // console.log('request ', request.url);

    // parse url
    let filePath = '.' + request.url;
    if (filePath == './') {
        filePath = './index.html';
    }

    // extract extention from url and match it with proper mime type
    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    // send to client the correct file if it exists
    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT') {
                // ENOENT = Error NO ENTity (meaning the file does not exist)
                response.writeHead(404, { 'Content-Type': 'text/html' });
                response.end(`404: this page doesn't exist`, 'utf-8');
            }
            else {
                // file exists but it's probably protected. Sorry, can't send it to client
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
            }
        }
        else {
            // found the file, sending it to client
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });
});

// Load Socket IO module to allow instant double communication between client and Arduino
const io = require('socket.io')(server);
// do stuff when a client connects
io.on('connection', (socket) => {
    console.log('a new client connected');

    // when receiving data from Arduino, tell the client what to do accordingly
    serial.on('data', forwardMessage);

    socket.on('saluto', (messaggio1) => {
      console.log('mess to arduino: ' + messaggio1)
      serial.write(`${messaggio1}\n`, function(err) {
          if (err) {
            return console.log('Error on write: ', err.message)
          }
      })
  });

  socket.on('messaggio', (messaggio) => {
    console.log('mess to arduino: ' + messaggio)
    serial.write(`${messaggio}\n`, function(err) {
        if (err) {
          return console.log('Error on write: ', err.message)
        }
    })
});

    // log if an user disconnects
    socket.on('disconnect', () => {
        console.log('client disconnected');
        // remove listener from Node EventEmitter
        serial.removeListener('data', forwardMessage);
    });

    function forwardMessage(data) {
      console.log('mess from arduino: ' + data.toString().replace(/\n*/, ''))
        let message = +data.toString().replace(/\n*/, '');

        socket.emit('sensor', message);

    }

});

// Start the server and listen for any request on selected port
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
