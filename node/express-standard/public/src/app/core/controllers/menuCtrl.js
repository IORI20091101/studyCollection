/**
 * Created by sundongzhi on 15/11/9.
 */
define(['angular','app'], function(angular,app) {

    app.controller('MenuController',['$scope','$http',function($scope,$http) {
            //Menus.query();
            $scope.menus="";
            $http.get('/menu/get').success(function(data, status, headers,config) {
                $scope.menus = data;
            }).error(function(data, status, headers,config) {
                throw new Error("请求发生错误！");
            })
        }])
})