define(['scripts/config.js'], function() {
    require(['a'], function(a) {
        alert("success get a");
        a.a();

    })

        function index() {
            console.log("you has enter index page");
        }


        return index;
});