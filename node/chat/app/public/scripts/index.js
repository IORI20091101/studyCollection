(function($) {
    $(function() {

        function ChatApp() {
            this.localUser = false;
            this.$examplModel = $("#exampleModal");
            this.$welcom = $(".userName");
            this.$name = $("#recipient-name");
            this._init();
        }
        _.extend(ChatApp.prototype, {
            _init: function() {
                var self = this;
                self.socket = io.connect('http://localhost:3030');

                self.utils.showLogDialog(self.$examplModel);

                self._socketOnEvent(self.socket);

                self._domEvent(self.socket);
            },
            //socket监听事件
            _socketOnEvent: function(socket) {
                var self = this;

                socket.on('serverNews', function (data) {
                    console.log(data);
                    if( data.isConnect ) {
                        self.utils.logColor("Socket 已经连接");
                        return false;
                    }

                    //用户名已存在
                    if( data.hasExist ) {
                        self.utils.logColor( data.user +" 已经加入过对话，该用户名被占用请换名重试");
                        self.utils.showErrTips(data.user + "已经加入过对话，该用户名被占用请换名重试");
                        return false;
                    }
                });
                socket.on("broadNews", function(data) {
                    //未登录收不到任何消息
                    if( !self.localUser ) {
                        return false;
                    }
                    //有人新加入聊天室
                    if( data.isAdd ) {
                        self.utils.logColor( data.user +"加入聊天室！");
                        self.utils.showInfoTips(data.user + "加入聊天室！");

                        self.utils.onlineChanges(data.users);
                        return false;
                    }

                    if( data.logOut ) {
                        self.utils.logColor( data.user +"离开聊天室！");
                        self.utils.showInfoTips(data.user + "离开聊天室！");
                        self.utils.onlineChanges(data.users);
                        return false;
                    }

                    //有新的聊天消息
                    if( data.user != null && data.user != "") {
                        self.utils.addChatItem(data);
                    }
                })
            },
            //登录时，向服务器添加新用户
            addUser: function addUser(socket) {
                var self = this;
                if( self.localUser == "" ) {
                    return false;
                }
                socket.emit('login', { user: self.localUser });
                $(".userName").text(self.localUser);

                self.utils.onlineChanges([self.localUser]);
            },
            //当向服务器发送消息时
            sendNews: function sendNews(opts) {
                var self = this;
                self.socket.emit('webNews', opts);
            },
            //页面dom元素增加绑定事件
            _domEvent: function(socket) {
                var self = this;
                var $formInput = $("#formGroupInputLarge");


                //顶部点击用户名 提示根据登录状态显示逻辑
                self.$welcom.on('click', function() {
                    if( self.localUser == "" ) {
                        self.utils.showLogDialog(self.$examplModel);
                    } else {
                        self.utils.showInfoTips("您已经登录无需重复登录")
                        return false;
                    }

                });

                //对登录弹出框监听回车事件
                self.$name.on("keypress", function(e) {
                    if( e.which && e.which == 13 ) {
                        self.localUser = self.$name.val();
                        if ( !self.utils.checkUsername(self.localUser,self.addUser(socket)) ) {
                            alert("请输入用户名~~~");
                            return false;
                        }
                    }
                });

                //对登录弹出框监听按钮点击事件
                $(".input-username").on('click',function() {
                    self.localUser = self.$name.val();
                    if ( !self.utils.checkUsername(self.localUser,self.addUser(socket)) ) {
                        alert("请输入用户名~~~");
                        return false;
                    }

                });

                //向消息输入框绑定回车事件
                $formInput.on("keypress", function(e) {
                    if( e.which && e.which == 13 ) {
                        var msg = $(this).val();
                        var d = new Date();

                        if( self.localUser == "" ) {
                            alert("请先登录");
                             self.$examplModel.modal({keyboard:false});
                            return false;
                        }


                        if( $.trim(msg) == "" ) {
                            return false;
                        }
                        var opts = {
                            user: self.localUser,
                            info: msg,
                            date: d.getFullYear() + "/" + self.utils.addZero(d.getMonth() + 1) + "/" + self.utils.addZero(d.getDate()) + " " + self.utils.addZero(d.getHours())+":"+self.utils.addZero(d.getMinutes())
                        }

                        self.sendNews(opts);
                        $(this).val("");
                        self.utils.addChatItem(_.extend(opts, {localUser: self.localUser}));


                    }
                });

                //向消息发送按钮绑定点击事件
                $("#send-msg").on('click', function() {
                    var msg = $("#formGroupInputLarge").val();

                    if( self.localUser == "" ) {
                        alert("请先登录");
                        self.$examplModel.modal({keyboard:false});
                        return false;
                    }

                    if( $.trim(msg) == "" ) {
                            return false;
                        }
                    var d = new Date();
                    var opts = {
                        user: self.localUser,
                        info: msg,
                        date: d.getFullYear() + "/" + self.utils.addZero(d.getMonth() + 1) + "/" + self.utils.addZero(d.getDate()) + " " + self.utils.addZero(d.getHours())+":"+self.utils.addZero(d.getMinutes())
                    }

                    self.sendNews(opts);
                    $formInput.val("");
                    self.utils.addChatItem(_.extend(opts, {localUser: self.localUser}));

                });
            },
            //工具类方法
            utils: {
                //彩色打印消息
                logColor: function(msg){
                    if( _.isObject(console) ) {
                        console.log('%c' + msg, 'background-image:-webkit-gradient( linear, left top, right top, color-stop(0, #f22), color-stop(0.15, #f2f), color-stop(0.3, #22f), color-stop(0.45, #2ff), color-stop(0.6, #2f2),color-stop(0.75, #2f2), color-stop(0.9, #ff2), color-stop(1, #f22) );color:transparent;-webkit-background-clip: text;font-size:5em;');
                        return false;
                    }
                    alert(msg);

                },
                //显示dialog对话框
                showLogDialog: function showLogDialog($examplModel) {
                    $examplModel.modal({keyboard:false});
                },
                //显示错误提示
                showErrTips: function showErrTips(msg) {
                    $('.err-tips-con p').slideDown(800,function() {
                        $(this).fadeOut(5000);
                    });
                    $(".err-tips").text(msg);
                },
                //显示消息提示
                showInfoTips: function showErrTips(msg) {
                    $('.top-welcom-con p').slideDown(800,function() {
                        $(this).fadeOut(5000);
                    });
                    $(".welcom-user").text(msg);
                },
                //为小于10的数字加0 ==》 01,02
                addZero : function addZero(num) {
                    if( num >= 0 && num < 10 ) {
                        return "0" + num;
                    } else {
                        return num;
                    }
                },
                //有新消息时向聊天内容容器中增加chat-item
                addChatItem: function addChatItem(opts) {
                    var tmpl = [
                        '<div class="chat-item">',
                            '<h4 class="chat-user {@if user == localUser}chat-self{@/if}">【${user}】${date}</h4>',
                            '<p class="chat-info">${info}</p>',
                        '</div>'
                    ].join("");

                    var tmplHtml = juicer(tmpl, opts);
                    $(".chat-detail").append(tmplHtml);


                    var hei = 0;
                    $(".chat-item").each(function(i, item) {
                        var $item = $(item);
                        hei = hei + $item.height();
                    });

                    var throttled = _.throttle(function() {
                        $(".chat-detail").animate({scrollTop: (hei + 500)+'px'}, 100);
                    }, 200);

                    throttled();


                },
                //如果用户自己进入则boo为false否则为true
                onlineChanges: function onlineChanges(users) {
                    console.log(users);
                    $(".online-num").text(users.length);
                    var tmplHTML = [
                        '{@each users as user}',
                            '<a href="#" class="list-group-item">${user}</a>',
                        '{@/each}'
                    ].join("");
                    var html = juicer(tmplHTML, {users : users});
                    $(".list-group").html(html);

                },
                //检测用户名是否存在
                checkUsername: function checkUsername(localUser,fn) {
                    if( !localUser ) {
                        return false;
                    } else {
                        if( _.isFunction(fn) ) {
                            fn(localUser)
                        }
                        $('#exampleModal').modal('hide');
                        return true;
                    }
                }
            }
        })


        function initialization() {
            new ChatApp();
        }

        initialization();

    });
})(jQuery);