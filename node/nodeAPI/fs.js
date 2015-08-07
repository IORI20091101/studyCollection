var fs = require('fs'),
    stdin = process.stdin,
    stdout = process.stdout;

//同步读取文件路径
console.log(fs.readdirSync(__dirname));
console.log(fs.readdirSync(process.cwd()));

console.log(process.argv);
console.log(process.env);

var stats = [];
//异步读取文件路径 推荐
fs.readdir(process.cwd(), function(err, files) {
    console.log('');
    console.log(files.length);
    var files = files;
    if( !files.length ) {
        return console.log(' \033[31m No files to show!\33[39m\n');
    }

    console.log(' Select which file or directory you want to see\n');

    function file(i) {
        var filename = files[i];
        fs.stat(__dirname + '/' + filename, function(err, stat) {
            stats[i] = stat;
            if( stat.isDirectory() ) {
                console.log(' ' + i + ' \033[36m' + filename + '/\033[39m');
            } else {
                console.log(' ' + i + ' \033[90m' + filename + '\033[39m');
            }

            i++;
            if( i == files.length ) {
                read();
            } else {
                file(i);
            }
        })
    }

    function read() {
        console.log('');
        process.stdout.write(' \033[33mEnter your choice: \033[39m');
        process.stdin.resume();
        process.stdin.setEncoding('utf8');

        stdin.on('data', option);
    }

    function option(data) {
        var filename = files[Number(data)];
        if( !filename ) {
            stdout.write(' \033[31mEnter your choice: \033[39m');
        } else {
            if(stats[Number(data)].isDirectory()) {
                fs.readdir(__dirname + '/' + filename, function(err, files) {
                    console.log('');
                    console.log(' (' + files.length + ' files)');
                    files.forEach(function(file) {
                        console.log('    - ' + file);
                    })
                    console.log('');
                })
            } else {
                stdin.pause();
                fs.readFile(__dirname + '/' + filename, 'utf8', function(err, data) {
                    console.log('');
                    console.log('\033[39m' + data.replace(/(.*)/g, ' $1') + '\033[39m');
                });
            }


        }
    }


    file(0);
});





//console.log('hello world');
//process.stdout.write('hello world');