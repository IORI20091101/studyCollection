define(['a'],function() {

    alert('app');
    function add(arg1, arg2) {
        return arg1+arg2;
    }

    return {
        add: add
    };
});