var cp = require("child_process");
//child_process.exec 的默认配置对象如下
/*var options = {
    encoding: 'utf8',
    timeout: 0,
    maxBuffer: 200*1024,
    killSignal:'SIGTERM',
    setsid: false,
    cwd: null,
    env: null
}


cp.exec('ls -l', function( e, stdout, stderr ) {
    if( !e ) {
        console.log('----------');
        console.log(stdout);
        console.log(stderr);
    }
})*/


//spawn
var cp = require("child_process");
var cat = cp.spawn('cat');
cat.stdout.on('data', function(d) {
    console.log(d.toString());
})

cat.on('exit', function() {
    console.log("it's end");
})

cat.stdin.write("nihaobalabl~~~"); //cat中输入内容，cat会复制打印出来
cat.stdin.end();