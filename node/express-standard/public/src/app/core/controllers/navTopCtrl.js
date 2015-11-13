/**
 * Created by sundongzhi on 15/11/12.
 */
define(['angular','app'], function(angular,app) {

    app.controller('NavTopController',['$rootScope', '$scope','$state', '$log', function ($rootScope,$scope ,$state, $log) {

        $log.log($state);


        var navArr = $state.current.name.split('.').slice(1);

        $scope.bread = navArr;

        var stateChangeSuccess = $rootScope.$on('$stateChangeSuccess', stateChangeSuccess);

        function stateChangeSuccess(event, toState, toParams, fromState, fromParams) {

            var navArr = toState.name.split('.').slice(1);

            $scope.bread = navArr;
        }



    }])
})