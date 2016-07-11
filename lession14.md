###作用域嵌套
有时候，我们并非一定要依赖指令，指令的最大用处在于复用性，
而对于一些复用性不强的页面，我们可以摒弃指令而只用controller即可。
简单的页面，一个controller可以完全hold住的，
而较复杂的页面，我们可以用多controller分层实现，这样较容易管理。
controller之间可以有父子关系，也可以互不影响，而事件之间也有其独特的传播机制。
下面是一个嵌套作用域的例子：

```
<!DOCTYPE html>
<html lang="en" ng-app="myMod">
<head>
    <meta charset="UTF-8">
    <title>MVVM</title>
</head>
<body ng-controller="parentCtrl"><!--rootScope-->

<div ng-controller="myCtrl">
    <!--子域、父域-->
    {{name}}---{{age}}------{{$parent.age}}
</div>

<input type="text" ng-model="name"/>
<!--ng-开头的指令，都在scope上定义-->
<input type="button" value="change" ng-click="change()"/>
</body>
</html>
<script src="./lib/angular.js"></script>
<script>
//嵌套作用域，一级一级往上找
        angular.module('myMod',[])
                .controller('myCtrl',function($scope){
                    console.log($scope);
                    $scope.age = 100;//子域的age
                    $scope.change = function(){
                        $scope.name = 'hello';
                    }
                }).controller('parentCtrl',function($scope){
                    $scope.age = 19;//父域的age
                });
 </script>
```
不形成嵌套关系的作用域之间是互不影响的，比如下面这个例子：

```
<!DOCTYPE html>
<html lang="en" ng-app="myMod">
<head>
    <meta charset="UTF-8">
    <title>MVVM</title>
</head>
<!--rootScope-->
<body>

<div ng-controller="myCtrl1">
    {{count}}
    <input type="button" value="add" ng-click="add()"/>
</div>




<div ng-controller="myCtrl2">
    {{count}}
    <input type="button" value="add" ng-click="add()"/>
</div>
</body>
</html>
<script src="./lib/angular.js"></script>
<script>
/*
* 一个视图一个控制器
* 控制器有相同逻辑，可以封装service注入共用。
* */
//重复代码需要消除
 angular.module('myMod',[])
        .controller('myCtrl1',function($scope){
            $scope.count = 0;
            $scope.add = function(){
                $scope.count++;
            }

        })
        .controller('myCtrl2',function($scope){
            $scope.count = 0;
            $scope.add = function(){
                $scope.count++;
            }
        });

</script>
```
我们看到，两个作用域的add方法，只会在本域下自增其count变量值，而不会互相影响。

我们再看一个事件传播机制的例子。我们通过原生js知道，事件有冒泡和捕获两种类型，
其中冒泡是从下到上的传播，而捕获则反之，在angularjs中，我们将这两种方式都做了进一步的封装，
向上向下，随心所欲控制。

```

<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
</head>
<body ng-app="myMod">
<div ng-controller="parentCtrl">
    parent:{{count}}
    <div ng-controller="childCtrl">
        <!--$emit都是scope下的属性方法-->
        <input type="button" ng-click="$emit('add')" value="向上传播"/>
        <input type="button" ng-click="$broadcast('add')" value="向下传播"/>
        child:{{count}}
        <div ng-controller="grandCtrl">
            grand:{{count}}
        </div>
    </div>

</div>
</body>
</html>
<script src="./lib/angular.js"></script>
<script>
    //scope可以传播事件，类似dom的冒泡捕获。

    var module = angular.module('myMod',[]);
    module.controller('parentCtrl',function($scope){
            $scope.count = 0;
            $scope.$on('add',function(event){
                $scope.count++;
            });

    });
    module.controller('childCtrl',function($scope){
            $scope.count = 0;
            $scope.$on('add',function(event){
                $scope.count++;
            });

    });
    module.controller('grandCtrl',function($scope){
        $scope.count = 0;
        $scope.$on('add',function(event){
            $scope.count++;
        });
    });
</script>
```
动手玩一下吧。

