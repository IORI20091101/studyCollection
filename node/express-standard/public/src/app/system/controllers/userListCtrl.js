/**
 * Created by sundongzhi on 15/11/13.
 */
define(['angular','app'], function(angular,app) {

    app.controller('UserListController',['$scope','$http',function($scope,$http) {
        //Menus.query();
        $scope.users="";
        $http.get('/system/users').success(function(data, status, headers,config) {
            $scope.users = data;
        }).error(function(data, status, headers,config) {
            throw new Error("请求发生错误！");
        })
    }])
})