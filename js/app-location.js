(function (angular) {
	'use strict';//不允许使用不安全的语法，使用严格模式

	/*主模块*/

	var myApp = angular.module('MyToDoMvc', []);
	myApp.controller('MainController',['$scope','$location',function($scope,$location){
		/*安装数据的存贮划分模型*/
		//文本框需要一个模型
		$scope.text = '';

		//任务列表需要一个模型
		//每一个任务的结构,像列表都加一个id｛id:1，text:'学习'，completed:ture｝
		$scope.todos = [
			{id:1,text:'学习',completed:true},
			{id:2,text:'睡觉',completed:true},
			{id:3,text:'玩',completed:false}
		];

		//添加函数
		$scope.add = function(){
			if(!$scope.text){
				return;
			}
			//这里面给todost添加元素
			$scope.todos.push({
				/*id: $scope.todos.length+1,这里这样会写出现BUG，
				如果删除后再新增会造成id重复，我们这里使用随机数或者当前时间*/
				id: Math.random(),
				text: $scope.text,
				completed: false
			});
			$scope.text = '';
		}

		//删除函数(根据id进行删除，这里就体现了删除的重要性)
		/*注意比较的时候要这样写if(1===a){},尽量写三个等号，数字写前面*/
		$scope.remove = function(id){
			for(var i=0;i<$scope.todos.length;i++){
				if($scope.todos[i].id===id){
					$scope.todos.splice(i,1);//删除数组从第i个开始，删除1个
					break;//跳出循环
				}
			}
		}

		//清除已完成的
		/*$scope.clear = function(){
			for(var i= 0;i<$scope.todos.length;i++){
				if(true === $scope.todos[i].completed){
					$scope.todos.splice(i,1);//这里的i会加1，而长度会变化，所有这个方法有BUG
				}
			}
		}*/
		$scope.clear = function() {
			var result = [];
			for (var i = 0; i < $scope.todos.length; i++) {
				if (!$scope.todos[i].completed) {
					result.push($scope.todos[i]);
				}
			}
			$scope.todos = result;
		}

		/*是否显示清除按钮*/
		$scope.isShowClearBtn = function(){
			for(var i=0;i<$scope.todos.length;i++){
				if($scope.todos[i].completed){
					return true;
				}
			}
			return false;
		}



		//标识当前那个在编辑
		$scope.currentEditingId = -1;
		//双击去编辑
		$scope.goEditing = function(id){
			for(var i=0;i<$scope.todos.length;i++){
				if(false===$scope.todos[i].completed&&$scope.todos[i].id===id){
					$scope.currentEditingId = id;
				}
			}
		}
		$scope.saveEditing = function(){
			$scope.currentEditingId = -1;
		}


		//全选切换
		$scope.isCheck = true;
		$scope.toggleAll = function(){
			for(var i=0;i<$scope.todos.length;i++){
				$scope.todos[i].completed = $scope.isCheck;
			}
			$scope.isCheck = !$scope.isCheck;
		}

		//筛选
		/*有DOM操作不合适
		$scope.currentFilter = '';
		$scope.filterAll = function(){
			$scope.currentFilter = '';
			return $scope.currentFilter;
		}
		$scope.filterActive = function(){
			$scope.currentFilter = false;
			return $scope.currentFilter;
		}
		$scope.filterCompleted = function(){
			$scope.currentFilter = true;
			return $scope.currentFilter;
		}*/
		/*拿到锚点值,但是这里必须要有window对象，
		在angular的小作用域环境中如果要使用外部的
		对象就必须要注入放方式，避免环境污染，这里注入
		$location服务
		var hash = window.location.hash;
		console.log(hash);*/

		/*因为函数hase值变化后不会对页面进行操作，我们需要监控
		于是我们使用$watch，他只能监视$scope的东西*/
		$scope.$location = $location;
		$scope.selector = {};
		console.log($scope.$location);
		console.log($scope.$location.path());//使用.path出现乱码无法解决

		$scope.$watch('$location.$$hash',function(now,old){

			//1、根据锚点值对selector做变换
			console.log(now);
			switch (now){
				case '/active':
					$scope.selector = {completed:false};
					break;
				case '/completed':
					$scope.selector = {completed:true};
					break;
				default:
					$scope.selector = {}
					break;
			}

		})





	}])
})(angular);
