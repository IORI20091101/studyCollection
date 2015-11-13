/**
 * Created by sundongzhi on 15/11/9.
 */
define([],function() {


    return {
        "admin.oricredit": {
            url: "/oricredit",
            views: {
                "viewCon": {
                    templateUrl: 'app/oricredit/tmpl/oricredit.html'
                }
            }
        },
        "admin.oricredit.loan":{
            url: "/loan",
            views: {
                "viewConInner": {
                    templateUrl: 'app/oricredit/tmpl/loan.html'
                }
            }

        },
        "admin.oricredit.repayment": {
            url: "/repayment",
            views: {
                "viewConInner": {
                    templateUrl: 'app/oricredit/tmpl/repayment.html'
                }
            }
        }
    }
})