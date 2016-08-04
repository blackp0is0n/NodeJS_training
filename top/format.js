var util = require('util');

var str = util.format("My %s %d %j", "string", 666, {obj: "Say hello to the bad guy"});

console.log(str);