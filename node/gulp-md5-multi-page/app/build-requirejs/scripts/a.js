define(['scripts/b'], function (b) {
    alert('success get b');
    b.b();
    function a() {
        console.log("this is scripts a~~~");
    }


    return {
        a: a
    }
});