var fs = require('fs');
console.log(process.cwd() +'/watchFile.js');
fs.watchFile(process.cwd() + '/watchFile.js', function() {
    console.log('fs has changeed');
});
