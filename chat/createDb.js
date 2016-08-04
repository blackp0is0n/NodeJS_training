var User = require('./models/user').User;

var async = require('assync');
var mongoose = require('./libs/mongoose');

var db = mongoose.connection.db;

mongoose.connection.on('open', function(){
   var db = mongoose.connection.db;

    console.log(mongoose.connection.readyState);
    db.dropDatabase(function(err){
        if (err) throw err;

        var vasya = new User({username: 'Vasya', password: 'supervasya'});
        var petya = new User({username: 'Petya', password: '123'});
        var admin = new User({username: 'admin', password: 'thetruehero'});

        console.log('OK');
        mongoose.disconnect();
    });
});

