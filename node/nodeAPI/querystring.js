var qs = require('querystring');
var parse1 = qs.parse('a=1&b=2&c=3');

console.log(parse1);

var myObj = {'a':1, 'b':2, 'c':'cats', 'func':"function() {console.log('dogs')}"}

var par2 = qs.encode(myObj);

console.log(par2);