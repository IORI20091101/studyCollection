/**
 * Created by sundongzhi on 16/6/23.
 */
require("./style.css");

require('./lib.js')
console.log("has into index~~~");
document.write("It works.");

document.write("111");

// require.ensure(["./a",'./b'], function(require) {
//     var a = require('./a.js');
//     console.log(a);
// })