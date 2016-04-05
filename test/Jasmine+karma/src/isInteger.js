function isInteger(num) {

    if(typeof num !=="number") return false;

    var pattern = /^[1-9]\d*$/g;

    return pattern.test(num);

}