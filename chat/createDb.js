var mongoose = require('./libs/mongoose');
var async = require('async');
var User = require('./models/user').User;
async.series([
    open,
    dropDatabase,
    requireModels,
    createUsers,
    showAllUsers
], function(err) {
    console.log(arguments);
    mongoose.disconnect();
    process.exit(err ? 255 : 0);
});

function open(callback) {
    mongoose.connection.on('open', callback);
}

function dropDatabase(callback) {
    var db = mongoose.connection.db;
    db.dropDatabase(callback);
}

function requireModels(callback) {
    require('./models/user');

    async.each(Object.keys(mongoose.models), function(modelName, callback) {
        mongoose.models[modelName].ensureIndexes(callback);
    }, callback);
}

function createUsers(callback) {


}

function showAllUsers(callback) {
    User.find({}, function(err, users) {
        if (err) throw err;
        console.log(users);
    });
}