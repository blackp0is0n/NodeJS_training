var fs = require('fs');

fs.readFile('dasda', function(err, data){
   if(err){
       console.error(err);
   } else {
       console.log(data.toString());
   }
});