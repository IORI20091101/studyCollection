'use strict';


    angular.module('phonecatApp',[
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

    /*var $html = angular.element(document.getElementsByTagName('html')[0]);

    angular.element().ready(function() {
      // bootstrap the app manually
      angular.bootstrap(document, ['phonecatApp']);
    });*/



