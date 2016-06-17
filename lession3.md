#什么是双向绑定？
##有关ng-model
在说双向绑定的概念之前，我们先说一下ng-model。ng-model不同于直接{{name}}这种方式，先看一段代码：<br />
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>MVVM</title>
    <script src="./lib/angular.js"></script>
</head>
<body ng-app>
    {{name}}
<input type="text" ng-model="name"/>
</body>
</html>
```
我在input里面输入内容，发现改变了{{name}}的值，是不是很神奇？<br />
我这里没有声明任何的controller，其实angular会给我们默认分配一个根作用域，就是$rootscope。name尽管没有声明，但会默认分配一个空值：

```
$rootScope.name = "";
```

双向绑定的含义其实是model和view两个层面。<br />
view就是我们的dom，而model是我们的数据模型。<br />
我们声明一个$scope.name="zhangsan",这个name就是一个数据模型。<br />
而体现到dom中，就是{{name}}，那就是dom值。<br />
input输入框声明为ng-model，也就是它的变化会直接影响到dom值，scope上的值和view值都更新了，这就是双向绑定。


