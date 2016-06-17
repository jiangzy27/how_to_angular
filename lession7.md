我们先来实现最简单的一个指令：<br />

```
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>自定义指令</title>
</head>
<body ng-app="myMod">
    <hello></hello>

</body>
</html>
<script src="./lib/angular.js"></script>
<script>

    var module = angular.module('myMod',[]);

    module.directive('hello',function(){
        return {
            restrict:'E',
            template:'<h1>你好呀，我是你创造出来第一个指令！</h1>'


        };
    });
</script>

```
运行一下，看看你的第一个指令是否创建成功了。
下面咱们来讲一下指令的使用方式。首先返回的还是一个对象，然后就是参数了。<br />
1. **restrict:** <br />
英文的意思是限制。常用的限制有E和A两种，分别是element和attribute的意思。<br />
element就是:

```
<hello></hello>
```
这样的声明方式，我们称之为组件式指令。<br />
还有一种就是attribute方式，我们这么写：

```
<div hello></div>
```
也就是说我把这条指令，也就是restrict的值为A，作为一个属性追加到div去。我们称之为修饰型指令。<br />
大家先把这两个概念记住，后面还会深入探讨两种指令的使用场景。
2. **template** <br />
这个名词不用多解释了吧，就是模板的意思。我们可以直接用这个关键字声明一段真实的dom标签，也就是说，指令其实本身还是一段html标签而已。<br />
3.**templateUrl** <br />
真实使用场景中，大段的dom肯定要单独引入的，我们通过这个参数，可以引入一个html文件。<br />
好了，我们把刚才学的用一下：<br />

```
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>自定义指令</title>
</head>
<body ng-app="myMod">
    <hello></hello>
    <div hello></div>

</body>
</html>
<script src="./lib/angular.js"></script>
<script>

    var module = angular.module('myMod',[]);

    module.directive('hello',function(){
        return {
            restrict:'EA',//两种方式可以同时声明，表示既可以当组件式，也可以当修饰型。
            templateUrl:'./templates/hello.html'

        };
    });
</script>
```
hello.html文件：

```
 <div>
    <h1>hello,我是单独一个模板文件。</h1>
 </div>

```
ok,今天先讲到这里了。

