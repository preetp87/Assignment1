var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var app = express();
var server = http.Server(app);
var io = socketIO(server);
app.set('port', 5000);
app.use('/static', express.static(path.join(__dirname, '/static')));// Routing
app.get('/', function(request, response) 
{response.sendFile(path.join(__dirname, 'index.html'));
});// Starts the server.

server.listen(5000, function() {
  console.log('Starting server on port 5000');
});

const user={}


io.on('connection', function(socket) {

  socket.on('new-user', name=> {
    user[socket.id] = name
    socket.broadcast.emit('players',{name:user})
  })
  

  socket.on('send-message', message=>{
    socket.broadcast.emit('messages', message)
    console.log(message)
  })

  socket.on('send-name', players=>{
    socket.broadcast.emit('name-sent', players)
    console.log(players)
  })

  socket.on('send-results', outcome=>{
    socket.broadcast.emit('send-update', outcome)
  })

  socket.on('score1', scoreOne=>{
    socket.broadcast.emit('score1-send',scoreOne)
  })
  socket.on('score2', scoreTwo=>{
    socket.broadcast.emit('score2-send',scoreTwo)
  })
  
});


