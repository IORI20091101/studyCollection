var myModule = angular.module("myModule", []);
myModule.controller('MyCtrl', ['$scope','$rootScope',
    function($scope,$rootScope) {
        $rootScope.isLoading = true;

        $scope.age = 3;
        $scope.$watch("age", function(val) {
            console.log($scope.age);
        });
    }
]);

angular.element(document).ready(function() {
    angular.bootstrap(document, ['myModule']);
});
