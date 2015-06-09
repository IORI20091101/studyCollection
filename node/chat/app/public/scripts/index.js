(function($) {
    $(function() {
        console.log(12345);
        var socket = io.connect('http://localhost:3030');

        var localUser = "";

        $("#exampleModal").modal({keyboard:false});

        socket.on('serverNews', function (data) {
            console.log(data);
            if( data.isConnect ) {
                console.log('%cSocket 已经连接', 'background-image:-webkit-gradient( linear, left top, right top, color-stop(0, #f22), color-stop(0.15, #f2f), color-stop(0.3, #22f), color-stop(0.45, #2ff), color-stop(0.6, #2f2),color-stop(0.75, #2f2), color-stop(0.9, #ff2), color-stop(1, #f22) );color:transparent;-webkit-background-clip: text;font-size:5em;');
                return false;
            }
            if( data.isAdd ) {
                console.log('%c'+ data.user +" 已经加入对话", 'background-image:-webkit-gradient( linear, left top, right top, color-stop(0, #f22), color-stop(0.15, #f2f), color-stop(0.3, #22f), color-stop(0.45, #2ff), color-stop(0.6, #2f2),color-stop(0.75, #2f2), color-stop(0.9, #ff2), color-stop(1, #f22) );color:transparent;-webkit-background-clip: text;font-size:5em;');
                return false;
            }

            if( data.hasExist ) {
                console.log('%c'+ data.user +" 已经加入过对话，该用户名被占用请换名重试", 'background-image:-webkit-gradient( linear, left top, right top, color-stop(0, #f22), color-stop(0.15, #f2f), color-stop(0.3, #22f), color-stop(0.45, #2ff), color-stop(0.6, #2f2),color-stop(0.75, #2f2), color-stop(0.9, #ff2), color-stop(1, #f22) );color:transparent;-webkit-background-clip: text;font-size:5em;');
                return false;
            }



        });

        socket.on("broad news", function(data) {
            if( data.user != null && data.user != "") {
                addChatItem(data);
            }
        })


        /*var is_asked = false;
        window.onbeforeunload = function (ev) {
                var e = ev || window.event;
                window.focus();
                if (!is_asked){
                    is_asked = true;
                    var showstr = "CUSTOM_MESSAGE";
                    if (e) { //for ie and firefox
                        e.returnValue = showstr;
                    }
                    return showstr; //for safari and chrome
                }
        };
        window.onfocus = function (ev){
            if (is_asked){
                alert("离开前先删除服务器的" + localUser);
                if(localUser != "") {
                    onLeave(localUser);
                }
                window.location.href = "http://www.google.com";
            }
        }*/



        function addUser(user) {
            socket.emit('addUser', { user: localUser });
            $('.top-welcom-con p').slideDown(800);
            $(".welcom-user").text(localUser);
        }

        function sendNews(opts) {
            socket.emit('webNews', opts);
        }

        function checkUsername() {
            localUser = $("#recipient-name").val();
            if( localUser == null || localUser == '' ) {
                return false;
            } else {

                addUser(localUser);
                $('#exampleModal').modal('hide');
                return true;
            }
        }

        $("#recipient-name").on("keypress", function(e) {
            if( e.which && e.which == 13 ) {
                if ( !checkUsername() ) {
                    alert("请输入用户名~~~");
                    return false;
                }
            }
        });

        $(".input-username").on('click',function() {
            if ( !checkUsername() ) {
                    alert("请输入用户名~~~");
                    return false;
            }

        });


        $("#formGroupInputLarge").on("keypress", function(e) {
            if( e.which && e.which == 13 ) {
                var msg = $(this).val();
                var d = new Date();
                var opts = {
                    user: localUser,
                    info: msg,
                    date: d.getFullYear() + "/" + addZero(d.getMonth() + 1) + "/" + addZero(d.getDate()) + " " + addZero(d.getHours())+":"+addZero(d.getMinutes())
                }
                sendNews(opts);
                $(this).val("");
                addChatItem(_.extend(opts, {localUser: localUser}));
            }
        });

        $("#send-msg").on('click', function() {
            var msg = $("#formGroupInputLarge").val();
            var d = new Date();
            var opts = {
                user: localUser,
                info: msg,
                date: d.getFullYear() + "/" + addZero(d.getMonth() + 1) + "/" + addZero(d.getDate()) + " " + addZero(d.getHours())+":"+addZero(d.getMinutes())
            }

            sendNews(opts);
            $("#formGroupInputLarge").val("");
            addChatItem(_.extend(opts, {localUser: localUser}));
        });

        function addChatItem(opts) {
            opts.localUser = localUser;
            var tmpl = [
                '<div class="chat-item">',
                    '<h4 class="chat-user {@if user == localUser}chat-self{@/if}">【${user}】${date}</h4>',
                    '<p class="chat-info">${info}</p>',
                '</div>'
            ].join("");

            var tmplHtml = juicer(tmpl, opts);
            $(".chat-detail").append(tmplHtml);
        }

        function addZero(num) {
            if( num >= 0 && num < 10 ) {
                return "0" + num;
            } else {
                return num;
            }
        }
    });
})(jQuery);