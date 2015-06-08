(function($) {
    $(function() {
        console.log(12345);
        var socket = io.connect('http://localhost:3030');

        $("#exampleModal").modal({keyboard:false});
        socket.on('news', function (data) {
            console.log(data);
            socket.emit('anotherNews', { my: 'data' });
        });

        function checkUsername(username) {
            var username = $("#recipient-name").val();
            if( username == null || username == '' ) {
                return false;
            } else {
                $('#exampleModal').modal('hide');
                return true;
            }
        }

        $("#recipient-name").on("keypress", function() {
            if ( !checkUsername() ) {
                alert("请输入用户名~~~");
                return false;
            }


        });

        $(".input-username").on('click',function() {
            if ( !checkUsername() ) {
                    alert("请输入用户名~~~");
                    return false;
            }

        });
    });
})(jQuery);