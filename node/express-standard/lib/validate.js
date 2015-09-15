function parseField(field) {
    return field;
}

function getField(req, field) {
    var val = req.body;


    return val[field];
}

exports.required = function(field) {
    var field = parseField(field);
    return function(req, res, next) {
        if( getField(req, field) ) {
            next();
        } else {
            res.error(field.join(' ') + ' is required!');
            res.redirect('back');
        }
    }
}

exports.lengthAbove = function(field, len) {
    var field = parseField(field);

    return function(req, res, next) {
        if( getField(req, field).length > len ) {
            next();
        } else {
            res.error(field.join(' ') + ' must have more than ' + len + ' characters');
            res.redirect('back');
        }
    }
}