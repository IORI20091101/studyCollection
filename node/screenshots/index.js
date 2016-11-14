const Pageres = require('pageres');

const pageres = new Pageres({
        delay: 2,
        script: window.scrollTop =
    })
    .src('http://36kr.com/p/5056474.html', ['1280x1024'], {crop: true})
    .dest(__dirname)
    .run()
    .then(() => console.log('done'));