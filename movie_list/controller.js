(function(angular){
    'use strict';
    /*1、创建正在热映的模块*/
    var module = angular.module('myApp.movie_list',['ngRoute','myApp.services.http']);

    /*2、配置模块的路由,模块自己管理自己，只要引用我的模块就可以使用路由*/
    module.config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/:category/:page',{
            templateUrl: 'movie_list/view.html',
            controller: 'MovieListController'
        });
    }]);


    /*3、设置页面的控制器，对页面逻辑操作
    * 操作分为两步走：一是设计暴露数据,二是设计暴露行为*/
    module.controller('MovieListController', ['$scope','$route','$routeParams','HttpService',
        function($scope,$route,$routeParams,HttpService){
            /*处理分页
        https://api.douban.com/v2/movie/in_theaters?start=0&count=3&callback=my_json_cb_0015410700270274136*/
            var count = 3;//一页显示多少条
            //console.log($routeParams);
            var page = parseInt($routeParams.page);//获取是第几页
            var start = (page-1)*count;//从第几条开始显示
            $scope.currentPage = page;//当前页

            /*jsonp请求数据*/
            $scope.subjects = [];//获取的电影信息数组
            $scope.message = '';
            $scope.title = '';//模块标题
            $scope.totalNum = 0;//总条数
            $scope.totalpages = 0;//总页数
               // console.log($routeParams.category);
        var doubanApiAddress = 'https://api.douban.com/v2/movie/'+$routeParams.category;

            /*请求数据，处理数据*/
            /*$routePaeams数据有两个地方1、路由匹配的2、路由中的？参数”*/
        HttpService.jsonp(doubanApiAddress, {start:start,count:count,q:$routeParams.q}, function(res){

            if(res){
                $scope.subjects = res.subjects;
                $scope.title = res.title;
                $scope.totalNum = res.total;
                $scope.totalpages = Math.ceil($scope.totalNum/count);

                //调用自己写的服务返回的数据要通知angular对数据进行监视并同步
                //$scope.$apply('subjects');
                $scope.$apply();//也可以不指定值，只要它调用一下就自动同步所有数据到angualr
            }else{
                $scope.message = '哎呀，获取数据失败了2!'+err.statusText;
            }
        });


           /* 处理页面的切换的行为*/
            $scope.goPage = function(pageNum){
                if(pageNum>=1 && pageNum<=$scope.totalpages){
                    /*路由中的这个函数用来更新url地址的参数*/
                    $route.updateParams({page:pageNum});
                }else{
                    return;
                }
            }
    }]);

})(angular)