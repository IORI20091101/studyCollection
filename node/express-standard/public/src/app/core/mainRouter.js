/**
 * Created by sundongzhi on 15/11/3.
 */
define([
    'app',
    'dashboardRouter',
    'settingsRouter',
    'capitalRouter',
    'creditRouter',
    'loanRouter',
    'operateRouter',
    'oricreditRouter',
    'statisticsRouter',
    'systemRouter',
    'userRouter'
    ], function (
        app,
        dashboardRouter,
        settingsRouter,
        capitalRouter,
        creditRouter,
        loanRouter,
        operateRouter,
        oricreditRouter,
        statisticsRouter,
        systemRouter,
        userRouter
    ) {
    'use strict';

    var routerArr = [];
    routerArr.push(
        dashboardRouter,
        settingsRouter,
        capitalRouter,
        creditRouter,
        loanRouter,
        operateRouter,
        oricreditRouter,
        statisticsRouter,
        systemRouter,
        userRouter
    );


    return app.config(function ($stateProvider, $urlRouterProvider,$requireProvider) {

        $urlRouterProvider.otherwise("/admin");

        $stateProvider.state("admin", {
            url: "/admin",
            views: {
                "viewLeft": {
                    templateUrl: "app/core/tmpl/nav-left.html",
                    controller:'MenuController',
                    resolve:{
                        deps:$requireProvider.requireJS([
                            '/app/core/controllers/menuCtrl.js'
                        ])
                    }
                },
                "viewRightTop": {
                    templateUrl: "app/core/tmpl/nav-right.html",
                    resolve: {
                        deps: $requireProvider.requireJS([])
                    }
                },
                "viewRightCon": {
                    templateUrl: "app/core/tmpl/nav-con.html",
                    controller:'NavTopController',
                    resolve: {
                        deps: $requireProvider.requireJS([
                            '/app/core/controllers/navTopCtrl.js'
                        ])
                    }
                }
            }
        });

        $stateProvider.state("admin.page1", {
            url: "/page1",

                views: {
                    "viewCon": {
                        templateUrl: 'app/credit/tmpl/loan.html'
                    }
                }

        });


        angular.forEach(routerArr, function (routerItem) {

            angular.forEach(routerItem, function(urlInfo, state) {

                angular.forEach(urlInfo.views, function(viewInfo) {

                    if( viewInfo && viewInfo.resolve && viewInfo.resolve.deps  ) {
                        viewInfo.resolve.deps = $requireProvider.requireJS(viewInfo.resolve.deps)
                    }
                });
                $stateProvider.state(state, urlInfo);
            })

        })

    });
});