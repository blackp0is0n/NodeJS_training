var EventEmitter = require('events').EventEmitter;

var server = new EventEmitter;

server.on('request', function(request){
    request.appoved = true;
});

server.on('request', function(request){
   console.log(request);
});

server.emit('request', {from: "Клиент"});
server.emit('request', {from: "Другой клиент"});