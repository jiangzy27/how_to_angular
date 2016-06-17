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
