var express = require("express");
var app = express();
var fs = require('fs');
var readline = require('readline');
var _ = require("underscore");
var util = require('util');

var ipUtil = require("./utils/ipAddr");

var ipData = ipUtil.ipData;
app.use(express.static(__dirname + '/public'));

app.use(express.bodyParser());

app.set('view engine','ejs');
app.set('views',__dirname + '/views');
app.set('view options',{layout: false});



var readStream = fs.createReadStream(__dirname+ '/tmp/test.txt', {encoding: 'utf8'});
var writeStream = fs.createWriteStream(__dirname+ '/tmp/data.json',{encoding: 'utf8'});
var rl = readline.createInterface({
    input: readStream,
    output:process.stdout,
    terminal: false
})


var jsonData = {
    "type": "line",
    "legend":{

    },
    "scale-x":{
        "zooming":true,
        "values":[]
    },
    "series": [
        {
            "text":"apple",
            "values": []
        }
    ]
}



var linNumZero = false;
var lablArr = [];
var xyArr = [];
rl.on('line', function(line) {
    if( !linNumZero ) {
        linNumZero  = true;
        lablArr = line.split(/\s+/g);
    } else {
        var dataTmplArr = line.split(/\s+/g);

        xyArr.push(dataTmplArr);
    }


    //writeStream.write(line + '\n');
    //console.log("---------------------");
}).on('close', function() {
    var unzipArr = _.unzip(xyArr);

    _.each(unzipArr, function(v, k) {
        if(  k > 0 ) {
            jsonData["series"].push({
                text:lablArr[k],
                values: v
            })
        }

    });

    jsonData["scale-x"]["values"] = unzipArr[0];


    //console.log(jsonData);

  console.log('Have a great day!');
  //process.exit(0);
});



Tail = require('tail').Tail;

tail = new Tail("./tmp/www.ezhe.com.log-20150811");

tail.on("line", function(data) {
  //console.log(data);
  var idstr = ipUtil.dealLine(data);

  if( !idstr ) {
    console.log("error ip address!");
    return false;
  }

  ipUtil.getIpInfo(idstr, function(err, msg) {
        ipData.forEach(function(v) {
            if( msg.province == v.name ) {
                v.count++;
            }
        });
      console.log('msg: ' + util.inspect(msg, true, 8));
      console.log(ipData);

    })
});

tail.on("error", function(error) {
  console.log('ERROR: ', error);
});



app.get('/', function(req, res){
  res.sendfile(__dirname +"/public/html/index.html");
});


app.get('/img2Code', function(req, res) {
    res.sendfile(__dirname +"/public/html/canvasToStr.html");
});

app.get('/canvas2img', function(req, res) {
    res.sendfile(__dirname +"/public/html/canvas2img.html");
});



app.get('/zingChart', function(req, res) {
    //res.sendfile(__dirname +"/public/html/zingChart.html");
    res.render("zingChart", {});
});

app.get('/zingChartJsonData', function(req, res) {
    res.json(200, jsonData);
});




app.get('/chinaMap', function(req, res) {
    res.sendfile(__dirname +"/public/html/chinaMap.html");
});
app.get('/china.json', function(req, res) {
    res.sendfile(__dirname +"/china.json");
});


app.listen(3030);




/*
var readStream = fs.createReadStream(__dirname+ '\\tmp\\test.txt', {encoding: 'utf8'});
var writeStream = fs.createWriteStream(__dirname+ '\\tmp\\data.json',{encoding: 'utf8'});

readStream.on('data', function(chunk) { // 当有数据流出时，写入数据
    if (writeStream.write(chunk) === false) { // 如果没有写完，暂停读取流
        readStream.pause();
    }
});

writeStream.on('drain', function() { // 写完后，继续读取
    readStream.resume();
});

readStream.on('end', function() { // 当没有数据时，关闭数据流
    writeStream.end();
});
*/
