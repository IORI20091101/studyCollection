var express = require("express");
var app = express();


/*var log4js = require('log4js');
log4js.configure({
  appenders: [
    { type: 'console' },{
      type: 'file',
      filename: 'logs/access.log',
      maxLogSize: 1024,
      backups:4,
      category: 'normal'
    }
  ],
  replaceConsole: true
});

app.use(log4js.connectLogger(this.logger('normal'), {level:'auto', format:':method :url'}));


function loggerFunc(name){
  var logger = log4js.getLogger(name);
  logger.setLevel('INFO');
  return logger;
}




var logger = loggerFunc("index~~");*/

console.log(__dirname);

app.use('/static', express.static(__dirname + '/public'));

app.use(express.bodyParser());

app.set('view engine','jade');
app.set('views',__dirname + '/views');
app.set('view options',{layout: false});



app.get('/', function(req, res){
    //logger.info("getLogger---------------");
  res.send('hello world');
});

app.listen(3030);
