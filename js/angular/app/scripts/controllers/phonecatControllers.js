'use strict';

angular.module('phonecatControllers', [])
    .controller('PhoneListCtrl', ['$scope', '$http',
      function ($scope, $http) {
        $http.get('/phones.json').success(function(data) {
          $scope.phones = data;
        });

        $scope.orderProp = 'age';
    }])
    .controller('PhoneDetailCtrl', ['$scope', '$routeParams',
      function($scope, $routeParams) {
        $scope.phoneId = $routeParams.phoneId;
    }]);

