'use strict';

require.config({
    baseUrl: './',
    paths: {
        "jquery": 'vender/jquery-1.11.2',
        "angular":'vender/angular',
        "angularRoute":'vender/angular-route',
        "angularResource": 'vender/angular-resource',
        "angularAnimate":'vender/angular-animate',
        "domReady":'vender/domReady',
        "bootstrap":'vender/bootstrap'
    },
    shim:{
        "jquery":{
            exports:"jquery"
        },
        "angular":{
            deps:[
                'jquery',
                'bootstrap'
            ],
            exports:'angular'
        },
        "bootstrap":{
            deps:[
                'jquery'
            ],
            exports:'bootstrap'
        },
        "angularResource":{
            deps:[
                'angular'
            ]
        },
        "angularRoute":{
            deps:[
                'angular'
            ]
        }
    }
});

require([
  'angular',
  'scripts/phoneApp'
  ], function(angular,app) {

    'use strict';

    var $html = angular.element(document.getElementsByTagName('html')[0]);

    angular.element().ready(function() {
      // bootstrap the app manually
      angular.bootstrap(document, ['phonecatApp']);
    });

});
