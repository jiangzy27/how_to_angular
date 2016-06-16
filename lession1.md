##有关angularjs的概述
angularjs是一种单页面应用的解决方案。大体使用结构如下：<br />
```

    <!doctype html>
    <html lang="en" ng-app="memberCenter">
    <head>
        <meta charset="UTF-8">
        <title>angularjs第一课：概览</title>
        <script src="jquery.js"></script>
        <script src="angular.js"></script>
    </head>
    <body>
        <div ng-controller="sidebarCtrl">
            <div menu-slide>
                <span>{{name | frozenStatusFilter:"active"}}</span>
            </div>
        </div>
    </body>
    </html>

```
>module

<pre>
 var appModule =  angular.module('memberCenter',[]);
</pre>
>controller

<pre>
 appModule.controller('sidebarCtrl',function($scope,sidebarService){
    var myName = "小王";
    $scope.name = "小明";
    $scope.func  = function(){
        alert($scope.name);
        alert(myName);
        alert(sidebarService.getData('/menu/'));
    }

});
</pre>

>directive

<pre>
appModule.directive('menuSlide',function(){
    return {
        restrict : "A",
        link : function(scope , element , attr){
            element.on("click",function(e) {
                alert(e);

            });
        }
    }
});

</pre>

>service

<pre>
appModule.factory('getDataService',function($http){
    return {
        getData:function(url){
            return url;
        }
    };

});
</pre>

>filter

<pre>

appModule.filter('frozenStatusFilter',function(){
     return function(input){
          var obj = {'active':'正常','cancel':'撤销','creditLine':'冻结'};
          return obj[input];
         }
     });
</pre>
