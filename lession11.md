##进阶篇
今天我们开始讲点进阶的内容。我们先看一下这段代码，先复习一下前面的知识，也是为下面的内容起到抛砖引玉的作用。

```
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>自定义指令</title>
</head>
<body ng-app="myMod">
    <div ng-controller="myCtrl">
        父级：{{myName}}<input type="text" ng-model="myName"/><br/>

        <hello my-name="myName"></hello>
    </div>


</body>
</html>
<script src="./lib/angular.js"></script>
<script>

    var module = angular.module('myMod',[]);
    module.controller('myCtrl',function($scope,$timeout){
        $timeout(function(){
            $scope.myName = "zhangsan";
        },2000);

    });
    module.directive('hello',function(){
        return {

            scope:{
                myName:'=myName'
            },
            template:'<div ng-click="test()">{{myName}}</div>',
            link:function(scope,ele,attrs){
                console.log(scope.myName);

                scope.test = function(){
                    scope.myName = 'wangxiaowu';
                }
            }
        };
    });
</script>
```
这段代码大家运行一下试试。我们双向继承了myName这个属性，然后我们在父controller里面引入了一个延时函数，也就说，我们的myName值是延时写入的，
但在实际运行时我们发现，视图一开始虽然啥都没有，但2s后照样写出了数据，然后双向修改数据，一切都是那么perfect对吧？<br />
但是。。。。。
一说但是，下面就要有料了哈哈。<br />
大家注意到没有，我们在link函数一开始，打印了一个scope.myName的值，这个值大家在控制台看一下，应该是undefined的，为啥呢？
这个很简单，myName因为是2s后写入的，我们的指令可没有智能到2s后才执行，所以指令执行时拿到的是空数据。我们把代码精简一下再看：<br />

```
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>自定义指令</title>
</head>
<body ng-app="myMod">
    <div ng-controller="myCtrl">

        <hello my-name="myName"></hello>
    </div>


</body>
</html>
<script src="./lib/angular.js"></script>
<script>

    var module = angular.module('myMod',[]);
    module.controller('myCtrl',function($scope,$timeout){
        $timeout(function(){
            $scope.myName = "zhangsan";
        },2000);

    });
    module.directive('hello',function(){
        return {

            scope:{
                myName:'=myName'
            },

            link:function(scope,ele,attrs){
                console.log(scope.myName);

            }
        };
    });
</script>
```
我把混淆视听的东西都统统干掉了，我们单纯的就是想：
####如果你父controller里面有延迟写入，我也能监听到，我等你写完后，我再读。
那就引入我们今天的第一个知识点：**$watch** <br />
watch这个函数，就是提供这个的作用，它是scope下面提供的一个方法，我们直接上例子。

```
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>自定义指令</title>
</head>
<body ng-app="myMod">
<div ng-controller="myCtrl">

    <hello my-name="myName"></hello>
</div>


</body>
</html>
<script src="./lib/angular.js"></script>
<script>

    var module = angular.module('myMod',[]);
    module.controller('myCtrl',function($scope,$timeout){
        $timeout(function(){
            $scope.myName = "zhangsan";
        },2000);

    });
    module.directive('hello',function(){
        return {

            scope:{
                myName:'=myName'
            },

            link:function(scope,ele,attrs){
                scope.$watch("myName",function(newValue,oldValue){
                    //console.log(newValue);console.log(oldValue);
                    if(newValue && (newValue!=oldValue)){
                        console.log(scope.myName);
                    }
                });

            }
        };
    });
</script>
```
watch函数的用法：<br />
```
$watch("监控的值",function(新值，旧值){});
```
试试看，是否达到目的了？

