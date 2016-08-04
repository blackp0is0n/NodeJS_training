var domain = require('domain');
var fs = require('fs');
var serverDomain = domain.create();

var server = require('./server');

serverDomain.on('error', function(err){
    console.log('Catched exception: %s', err);
});

serverDomain.run(function(){
    setTimeout(function(){
        fs.readFile(__filename, function(){
            ERROR();
        });
    }, 1000);

});