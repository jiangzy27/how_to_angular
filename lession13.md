####一个小插曲
有关延时函数**$timeout**，这里有个小小的技巧传授给大家。我们看一下这段代码：

```
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>自定义指令</title>
</head>
<body ng-app="myMod">
    <div ng-controller="myCtrl">


        <hello my-name="myName" say-name="sayName()"></hello>
    </div>


</body>
</html>
<script src="./lib/angular.js"></script>
<script>

    var module = angular.module('myMod',[]);
    module.controller('myCtrl',function($scope){
        $scope.myName = "tommy";
        $scope.sayName =function(){
            console.log($scope.myName);
        }
    });
    module.directive('hello',function(){
        return {

            scope:{
                myName:'=myName',
                sayName:'&sayName'
            },
            template:'<button ng-click="testName()">testValue</button>',
            link:function(scope,ele,attrs){
                scope.testName = function(){
                    scope.myName = 'john';
                    scope.sayName();
                }

            }
        };
    });
</script>
```
大家运行一下，会发现一个有趣的问题，我明明是双向继承的myName，而我在指令的方法里面改变了myName的值，第一次却没生效，等第二次点击才能生效。这是为啥呢？<br />
是不是要调用上节课的$apply进行脏值更新呢？大家可以动手试一下，发现会报错，报错的信息为：apply已经在队列内执行了，不必要再次声明。这种方法被fire掉了。<br />
其实我们的方法是追加到scope下面的，是自家的方法声明，所以不需要apply。发生这种情况的唯一解释是，myName在指令下虽然执行了，但是sayName()方法因为跟它都是同步执行的，
在方法执行的时候，myName值还没来得及更新到上一级。那如果我把这个方法移到异步队列里面，降低其优先级看看是否ok呢？代码整理如下：

```
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>自定义指令</title>
</head>
<body ng-app="myMod">
    <div ng-controller="myCtrl">


        <hello my-name="myName" say-name="sayName()"></hello>
    </div>


</body>
</html>
<script src="./lib/angular.js"></script>
<script>

    var module = angular.module('myMod',[]);
    module.controller('myCtrl',function($scope){
        $scope.myName = "tommy";
        $scope.sayName =function(){
            console.log($scope.myName);
        }
    });
    module.directive('hello',function($timeout){
        return {

            scope:{
                myName:'=myName',
                sayName:'&sayName'
            },
            template:'<button ng-click="testName()">testValue</button>',
            link:function(scope,ele,attrs){
                scope.testName = function(){
                    scope.myName = 'john';
                    $timeout(function(){
                        scope.sayName();
                    },0);
                }

            }
        };
    });
</script>
```
bingo！ok了！这也算是一种小小技巧吧。有关这一点我再多追加几句，抛开angular，我们看一段原生代码：
```
    console.log('a');
    setTimeout(function(){console.log('b');},0);
    console.log('c');
```
这段代码的打印顺序是啥？动手测试一下。<br />
答案是a,c,b。虽然我延迟0s执行，但是由于使用了延时函数，打印b的动作就降级到异步队列了。
代码执行顺序是先同步再异步，同步对应一个队列，异步对应一个队列，
总是先执行完同步队列里面的之后再执行异步的。