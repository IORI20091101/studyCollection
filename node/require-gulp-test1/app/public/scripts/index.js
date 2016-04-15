requirejs(['/scripts/config.js'], function (common) {
    requirejs(['a'], function(a) {
        alert("success get a");
        a.a();
    });

    function index() {
        console.log("you has enter index page");
    }


    index();
});