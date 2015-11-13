/**
 * Created by sundongzhi on 15/11/9.
 */
define([],function() {

    return {
        "admin.credit": {
            url: "/credit",
            views: {
                "viewCon": {
                    templateUrl: 'app/credit/tmpl/credit.html'
                }
            }
        },
        "admin.credit.loan":{
            url: "/loan",
            views: {
                "viewConInner": {
                    templateUrl: 'app/credit/tmpl/loan.html'
                }
            }

        },
        "admin.credit.repayment": {
            url: "/repayment",
            views: {
                "viewConInner": {
                    templateUrl: 'app/credit/tmpl/repayment.html'
                }
            }
        }
    }
})