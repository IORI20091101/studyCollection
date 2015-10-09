//用来进行mocha测试的 index文件

var db = [];

exports.save = function(doc, cb) {
    db.push(doc);
    if(cb) {
        setTimeout(function() {
            cb();
        }, 3000);
    }
}

exports.first = function(obj) {
    return db.filter(function(doc) {
        for( var key in obj ) {
            if( doc[key] != obj[key] ) {
                return false;
            }
        }
        return true;
    }).shift();
}

exports.clear = function() {
    db =[];
}


exports.addPercentageToEach = function(prices, percentage) {
    return prices.map(function(total) {
        total = parseFloat(total);
        return total + (total*percentage);
    })
}

exports.sum = function(prices) {
    return prices.reduce(function(currentSum, currentValue) {
       return parseFloat(currentSum) + parseFloat(currentValue);
    });
}

exports.percentFormat = function(percentage) {
    return parseFloat(percentage)*100 + '%';
}

exports.dollarFormat = function(number) {
    return '$' + parseFloat(number).toFixed(2);
}