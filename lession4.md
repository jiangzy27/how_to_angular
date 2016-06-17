>问题：
通过前几课的学习，我们知道了什么是数据绑定，也知道怎么声明一个controller。<br />
我们不妨跟artTemplate做一个对比。<br />
我们用angularjs如何遍历一个数据呢？又如何达到数据修饰的目的？不用急，一切都有办法<br />

```
<!DOCTYPE html>
<html lang="en" ng-app="myMod">
<head>
    <meta charset="UTF-8">
    <title>MVVM</title>
</head>

<body ng-controller="myCtrl">
    <ul>
        <li ng-repeat="val in data">
            {{val["name"] | uppercase}}
        </li>
    </ul>
</body>
</html>
<script src="./lib/angular/angular.js"></script>
<script>
    angular.module('myMod',[])
            .controller('myCtrl',function($scope){
                $scope.data = [{id:1,name:"lovejoy"},{id:2,name:"sugar"},{id:2,name:"candy"}];
            });
</script>

```

我们在要循环的li标签上追加ng-repeat，然后通过val即可拿到每个值，而数据修饰符这里我们成为过滤器，uppercase是angular内置的过滤器，那我们如何自定义一个过滤器呢？
其实很简单。

```
<!DOCTYPE html>
<html lang="en" ng-app="myMod">
<head>
    <meta charset="UTF-8">
    <title>MVVM</title>
</head>

<body ng-controller="myCtrl">
    path:{{imgPath | imageFilter}} <br />
    <img src="{{imgPath | imageFilter}}" />
</body>
</html>
<script src="./lib/angular.js"></script>
<script>
    var mod =  angular.module('myMod',[]);
    mod.controller('myCtrl',function($scope){
        $scope.imgPath = "mypic.jpg@abc.com";
    });
    mod.filter('imageFilter',function(){
        return function(input){
            if(!input)
                return '';
            else{
                var arr = input.split('@');
                return "file/binary/view/"+arr[0];
            }
        };
    });
</script>

```
我们在同一个module下面，挂载这个自定义filter即可。这里要注意filter的书写方法：

```
module.filter('myFilter',function(){
    return function(inputValue){
        return inpuptValue + "hello";
    }
});

```
在回调函数里面，又返回了一个函数。而这个函数的形参里面，才是捕获到的输入值，如果传入多个参数，就是对应的dom里面的冒号后面的值，这一点跟artTemplate是一致的。



