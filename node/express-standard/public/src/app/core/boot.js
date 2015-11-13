/**
 * Created by sundongzhi on 15/11/3.
 */
requirejs.config({
    baseUrl:'/',
    paths:{
        'jquery':'/vendor/jquery-1.10.2.min',
        'underscore':'/vendor/underscore/underscore-min',
        'angular':'/vendor/angular.min',
        'uiRouter':'/vendor/angular-ui-router/release/angular-ui-router.min',
        'ngResource':'/vendor/angular-resource/angular-resource.min',
        'ngRequire':'/vendor/angular-require/angular-require.min',
        'mainRouter':'/app/core/mainRouter',
        'settingsRouter':'/app/settings/settingsRouter',
        'dashboardRouter':'/app/dashboard/dashboardRouter',
        'capitalRouter':'/app/capital/capitalRouter',
        'creditRouter':'/app/credit/creditRouter',
        'loanRouter':'/app/loan/loanRouter',
        'operateRouter':'/app/operate/operateRouter',
        'oricreditRouter':'/app/oricredit/oricreditRouter',
        'statisticsRouter':'/app/statistics/statisticsRouter',
        'systemRouter':'/app/system/systemRouter',
        'userRouter':'/app/user/userRouter',
        'app':'/app/core/app'
    },
    shim: {
        'angular': {'exports' : 'angular'},
        'uiRouter':['angular'],
        'ngResource':['angular'],
        'ngRequire':['angular'],
        'bootstrap': {
            deps: ['jquery']
        }
    },
    priority: [
        "angular"
    ]
});


require(['angular','app','mainRouter'],function(angular) {
    'use strict';

    var $html = angular.element(document.getElementsByTagName('html')[0]);
    angular.element().ready(function() {
        // bootstrap the app manually
        angular.bootstrap(document, ['app']);
    });


});