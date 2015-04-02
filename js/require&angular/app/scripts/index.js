define(['jquery','angular'],function($, angular) {

   angular.element(document).ready(function() {
        var myApp = angular.module('myApp', []);


        myApp.controller('logController', function ($scope) {
          $scope.phones = [
            {'name': 'Nexus S',
             'snippet': 'Fast just got faster with Nexus S.'},
            {'name': 'Motorola XOOM™ with Wi-Fi',
             'snippet': 'The Next, Next Generation tablet.'},
            {'name': 'MOTOROLA XOOM™',
             'snippet': 'The Next, Next Generation tablet.'}
          ];

          $scope.name="dongzhi";
        });

        angular.bootstrap(document,['myApp']);


/*做最小化必须明确标明依赖关系有两种方法方法一
function PhoneListCtrl($scope, $http) {...}
    PhoneListCtrl.$inject = ['$scope', '$http'];
    phonecatApp.controller('PhoneListCtrl', PhoneListCtrl);
*/
/*方法二
function PhoneListCtrl($scope, $http) {...}
    phonecatApp.controller('PhoneListCtrl', ['$scope', '$http', PhoneListCtrl]);
*/
        console.log('-------------------');
        console.log($);
        console.log(angular);
        console.log('-------------------');


        init();
   })






    function init() {
        //alert('index~~~');
        console.log('-----$$$$$$$$-----');
        console.log($);
    }

})