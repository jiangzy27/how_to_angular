###有关service服务
服务这个概念，顾名思义，就是为人民服务的意思，也就是起到一些辅助的作用。<br />
比如我们在controller里面分配一个data数据，要往页面上遍历，
这个data肯定是通过ajax的方式从数据接口拉取的，
我们可以直接将$.ajax()这样的代码写在controller里面，但是数据请求一多，这个controller维护起来就是个麻烦，一坨又一坨，看着就恶心。
那么，能不能把数据请求这块想办法分离出来，然后通过注入的方式使用？<br />

```
    <!doctype html>
    <html lang="en" ng-app="memberCenter">
    <head>
        <meta charset="UTF-8">
        <title>angular</title>
    </head>
    <body>
        <div ng-controller="sidebarCtrl">
            <ul>
                <li ng-repeat="menu in data">{{menu["name"]}}</li>
            </ul>

        </div>
    </body>
    </html>
    <script src="./lib/angular.js"></script>
    <script>
        var appModule =  angular.module('memberCenter',[]);
        //注入sidebarService备用。
         appModule.controller('sidebarCtrl',function($scope,sidebarService){
            //得到的是延迟对象，使用then方法继续调用。
            sidebarService.getData('/menu/').then(function(menuData){
                $scope.data = menuData;
            },function(){console.log('error');});


        });
        //声明一个service，最常用的就是工厂方法。
        appModule.factory('getDataService',function($http){
        //这里的$http是内置服务，相当于jquery的ajax方法，服务之间也可以互相注入使用。
            return {
                getData:function(url){
                    //这里返回的是promise延迟对象。
                    return $http({
                        url:url
                    });
                }
        };

    });
    </script>
```
服务分内置服务和自定义服务，这个跟filter过滤器很类似。自定义服务返回的是一个对象不是function，这一点应该注意:

```
        appModule.factory('getDataService',function($http){

            return {
                getData:function(url){

                    return '';
                },
                postData:function(url,data){
                    return '';
                }
        };

    });
```
声明后就可以在controller里面注入调用，
服务可以在任意地方注入调用，因为它是服务者啊，要为全民服务而不能随便挑剔服务对象的哈哈。
在controller里面也可以直接注入$http服务使用。

