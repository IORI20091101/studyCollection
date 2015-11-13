/**
 * Created by sundongzhi on 15/11/9.
 */
define([],function() {

    return {
        "admin.user": {
            url: "/user",
            views: {
                "viewCon": {
                    templateUrl: 'app/user/tmpl/user.html'
                }
            }
        },
        "admin.user.list":{
            url: "/list",
            views: {
                "viewConInner": {
                    templateUrl: 'app/user/tmpl/list.html'
                }
            }

        },
        "admin.user.bankcard":{
            url: "/bankcard",
            views: {
                "viewConInner": {
                    templateUrl: 'app/user/tmpl/bankcard.html'
                }
            }

        },
        "admin.user.sync": {
            url: "/sync",
            views: {
                "viewConInner": {
                    templateUrl: 'app/user/tmpl/sync.html'
                }
            }
        }
    }
})