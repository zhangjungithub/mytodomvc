(function(angular){
    'use strict';
    /*1、创建模块*/
    var module = angular.module('myApp.movie_detail',['ngRoute','myApp.services.http']);

    /*2、配置模块的路由,模块自己管理自己，只要引用我的模块就可以使用路由*/
    module.config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/movie_detail/:id',{
            templateUrl: 'movie_detail/view.html',
            controller: 'MovieDetailController'
        });
    }]);


    /*3、设置页面的控制器，对页面逻辑操作
    * 操作分为两步走：一是设计暴露数据,二是设计暴露行为*/
    module.controller('MovieDetailController', ['$scope','$routeParams','HttpService',
        function($scope,$routeParams,HttpService){
            $scope.movie = '';

            var doubanApiAddress = 'https://api.douban.com/v2/movie/subject/'+$routeParams.id;
            HttpService.jsonp(doubanApiAddress, {}, function(res){
                $scope.movie = res;
                //console.log( $scope.move );
                $scope.$apply();
        });

    }]);

})(angular)