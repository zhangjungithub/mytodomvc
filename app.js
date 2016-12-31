
(function(angular){
  'use strict';

  /*创建一个主module，并且注入子模块*/

  //var myApp = angular.module('myApp',['ngRoute','myApp.in_theaters','myApp.coming_soon','myApp.top250']);
  var myApp = angular.module('myApp',['ngRoute','myApp.movie_detail','myApp.movie_list']);


  /*给主模块配置路由，如果路由地址找不到就跳转到主模块中*/
  myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider.otherwise({
      redirectTo:'/in_theaters/1'
    });
  }]);


  /*给主模块一个控制器*/
  myApp.controller('IndexController',['$scope','$location',function($scope,$location){

    /*处理切换栏位，这个也可以写一个自定义自动去处理*/
    $scope.location = $location;
    //监视数据变化，因为他不执行一次，监视以后会触发再次执行(注意只能监视$scope的值)
    $scope.$watch('location.path()',function(newVal,oldVal){
      console.log(newVal);
      console.log(oldVal);
      if(newVal.slice(0,12)=='/in_theaters'){
        $scope.type = 'in_theaters';
      }else if(newVal.slice(0,12)=='/coming_soon'){
        $scope.type = 'coming_soon';
      }else if(newVal.slice(0,7)=='/top250'){
        $scope.type = 'top250';
      }else{
        $scope.type = '';
      }
    });
  }]);

  /*处理搜索*/
  myApp.controller('SearchController',['$scope','$route','$location','$routeParams',
    function($scope,$route,$location,$routeParams){
    $scope.content = "周星驰";
    $scope.SearchMovie = function(){
     /* console.log($route.updateParams);
      //http://localhost:63342/www/13formwork/moviecatzj02/index.html#/search/3?q=%E5%91%A8%E6%98%9F%E9%A9%B0
      $route.updateParams({category:'search',q:$scope.content});此方法无法测底呈现url*/
      $location.path('/search/1');
      $location.search('q', $scope.content);
      console.log($routeParams);
    }
  }])

})(angular);