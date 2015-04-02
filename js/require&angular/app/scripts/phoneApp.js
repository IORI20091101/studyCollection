'use strict';
define([
        'jquery',
        'angular',
        'angularRoute',
        'scripts/controllers/phonecatControllers'
    ],function($, angular) {

        return angular.module('phonecatApp',[
                'ngRoute',
                'phonecatControllers'
            ]).
            config(['$routeProvider',function($routeProvider) {
                    $routeProvider.
                      when('/phones', {
                        templateUrl: 'views/phone-list.html',
                        controller: 'PhoneListCtrl'
                      }).
                      when('/phones/:phoneId', {
                        templateUrl: 'views/phone-detail.html',
                        controller: 'PhoneDetailCtrl'
                      }).
                      otherwise({
                        redirectTo: '/phones'
                      });
                }
            ]);

});
