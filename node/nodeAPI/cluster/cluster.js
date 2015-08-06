var cluster = require('cluster');

var http = require('http');
//获得cpu数量
var numCPUs = require('os').cpus().length;

var rssWarn = (12*1024*1024);
var heapWarn = (10*1024*1024);

console.log(numCPUs);
console.log(cluster.isMaster);


var workers = {};

if( cluster.isMaster ) {
    for( var i = 0; i < numCPUs.length; i++ ) {
        createWorker();
    }

    setInterval(function() {
        var time = new Date().getTime();
        for( pid in workers ) {
            if( workers.hasOwnProperty(pid) && workers[pid].lastCb + 5000 < time ) {
                console.log('Long running workder ' + pid + ' killed');
                workers[pid].worker.kill();
                delete workers[pid];
                createWorker();
            }
        }
    },1000)

    cluster.on('death', function(worker) {
        console.log('worker ' + worker.pid + ' died');
    });
} else {
    http.Server(function(req, res) {
        if( Math.floor(Math.random()*200) === 4 ) {
            console.log('Stopped ' + process.pid + ' from ever finishing');
            while(true) {
                continue;
            }
        }

        res.writeHead(200);
        res.end("hello world from" + process.pid +" \n");
    }).listen(3030);
//每秒报告一次状态
    setInterval(function report() {
        process.send({memory: process.memoryUsage(), process: process.pid});
    }, 1000);
}


function createWorker() {
    var worker = cluster.fork();

    console.log('Create worker: ' + worker.pid);

    workers[worker.pid] = {
        worker: worker,
        lastCb: new Date().getTime() - 1000
    }

    worker.on('message', function(m) {
        /*if( m.memory ) {
            if( m.memory.rss > rssWarn ) {
                console.log('Worker ' + m.process + ' using too much memeory');
            }
        }*/

        if(m.cmd === 'reportMem') {
            workers[m.process].lastCb = new Date().getTime();
            if(m.memory.rss > rssWarn) {
                console.log('Worker ' + m.process + ' using too much memeory');
            }
        }
    })
}