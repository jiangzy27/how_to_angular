##有关控制器controller
###controller其实就是规定了一个作用域。
```
<!DOCTYPE html>
<html lang="en" ng-app="myMod">
<head>
    <meta charset="UTF-8">
    <title>MVVM</title>
</head>
<body>
    <div ng-controller="myCtrl">
        {{name}}
    </div>
</body>
</html>
<script src="./lib/angular.js"></script>
<script>
    //控制器名字
    angular.module('myMod',[])
            .controller('myCtrl',function($scope){
                //控制器定义
                $scope.name = 'zhangsan';
            });
</script>

```
注意：<br />
1. 定义module时,后面的[]是指依赖项，不写的话会报错。<br />
2. 这里的$scope不能随便写，否则会报错。<br />
3. $scope.name就是声明这个controller下的某个变量，可以在dom中寻找到，但出了这个作用域就不可访问了。<br />

###controller的嵌套，就相当于函数闭包。

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
                    $scope.age = 100;
                    $scope.change = function(){
                        $scope.name = 'hello';
                    }
                }).controller('parentCtrl',function($scope){
                    $scope.age = 19;
                });
 </script>
```

