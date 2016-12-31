/*
在这个组件中写一个方便跨域的服务,方便其他模块也使用

因为默认angualr提供的异步请求对象不支持自定义函数名
 而angular随机分配的回调函数douban不支持
*/

'use strict';
(function(angular){

    var http = angular.module('myApp.services.http',[]);

    http.service('HttpService',['$window','$document',function($window,$document){

        //url:https://api.douban.com/v2/movie/in_theaters放在<script>中再放在html中
        this.jsonp = function(url, data, callback){
            //1、处理url地址中的回调参数
            //2、创建一个script标签
            //3、挂载回调函数，放在全局作用域中让回调的时候执行
            //4、将script放在html中

            var cbFuncName = 'my_json_cb_' + Math.random().toString().replace('.', '');
            // 不推荐，我们推荐angular的方式
            $window[cbFuncName] = callback;//$window就是window对象

            var querystring = url.indexOf('?') == -1 ? '?' : '&';
            for (var key in data) {
                querystring += key + '=' + data[key] + '&';
            }

            querystring += 'callback=' + cbFuncName;

            //document对象是$document对象的数组成员
            var scriptElement = $document[0].createElement('script');
            scriptElement.src = url + querystring;
            $document[0].body.appendChild(scriptElement);
        }
        //$window.$jsonp = jsonp;
    }])
})(angular)
