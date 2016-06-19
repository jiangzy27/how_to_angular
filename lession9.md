我们讲一下指令的继承。这块是非常重要的，不过也没必要有什么心理压力，其实也是很简单。<br />
继承一共分为两种类型：<br />
1.单向继承 <br />
2.双向继承 <br />
下面分别解释一下。<br />
>单向继承

单向继承就是指令从父级继承下来一个变量后，我可以改，但对我父级不产生任何影响。你是你我是我，你爱怎么折腾就可以，别影响你老子我就行。

>双向继承

双向继承正好相反。我从父级继承下来一个变量，我改了之后，老爹也跟着受影响。老爹改了儿子受影响，儿子改了老爹受影响，这就是双向继承。

好，那我们看一下具体怎么来做，咱们先看下**单向继承**：<br />

```
<!DOCTYPE html>
<html ng-app="myMod">
<head lang="en">
    <meta charset="UTF-8">
    <title>自定义指令</title>

</head>
<body ng-controller="myCtrl">
父ctrl: <input type="text" ng-model="zhangsan"/>
<br/>
指令：
<person namexx="{{zhangsan}}" greet="greet(myname,myword)"></person>
</body>
</html>
<script src="./lib/angular.js"></script>
<script>
    /*
     @:单向继承父scope的变量。
     &:单向继承父scope中的函数。

     */
    var module = angular.module('myMod',[]);
    module.controller('myCtrl',function($scope){
        $scope.zhangsan='张三';
        $scope.greet = function(name,word){
            alert(name+"===="+word);
        }
    });
    module.directive('person',function(){
        return {
                 scope: {//独立scope。
                            name:'@namexx',
                            greet:'&greet'
                        },
                 restrict:'E',
                 template:'<div>姓名：<input type="text" ng-model="name"/><div ng-click="greet({myname:name,myword:word})">click me</div></div>'

                };
            });
</script>
```
单向继承可以继承变量和方法，方法只能单向继承使用，无法双向继承。<br />
1.   @:单向继承父scope的变量。<br />
2.   &:单向继承父scope中的函数。<br />
这个例子的意思是，我从父级继承了一个name，然后在指令模板里面绑定了ng-model，然后我查验一下：改变了指令的这个input值，是否会影响父级？父级的又是否影响指令？<br />
再就是注意一下继承下来的方法的参数，以对象的方式传入。<br />

下面就是**双向继承**了：<br />

```
<!DOCTYPE html>
<html ng-app="myMod">
<head lang="en">
    <meta charset="UTF-8">
    <title>自定义指令</title>
</head>
<body ng-controller="myCtrl">
父ctrl:{{zhangsan}}<br/>
<input type="text" ng-model="zhangsan"/><br/>
指令: <br/>
<!--这里注意，就不用表达式{{}}，而是直接暴露出来字段名，意味着双向绑定之义。-->
<person namexx="zhangsan"></person>
</body>
</html>
<script src="./lib/angular.js"></script>
<script>
    /*

     =：与父scope中的属性进行双向绑定。

     */
    var module = angular.module('myMod',[]);
    //指令影响到父ctrl,而且父ctrl也会影响到指令。
    module.controller('myCtrl',function($scope){
        $scope.zhangsan='张三';

    });
    module.directive('person',function(){
                return {
                    scope:{
                        name:'=namexx'
                       },
                    restrict:'E',
                    template:'<div>姓名：{{name}}<input ng-model="name" type="text"/></div>'

                };
            });
</script>
```
试试看，子元素和父元素是否是互相影响的呢？

