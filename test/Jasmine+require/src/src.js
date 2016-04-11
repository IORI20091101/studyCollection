define(['a'], function() {

    function reverse(name) {
        return name.split("").reverse().join("");
    }

    return {
        reverse: reverse
    }
});

