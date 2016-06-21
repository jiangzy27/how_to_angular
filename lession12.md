上节课的watch，大家玩的还开心吗？其实也很简单，就是一个监听函数。那我们今天再来看一个好玩的东西**$apply** <br />
apply函数并不是我们原生js中的apply，这个首先要从概念上区分开来。
apply函数的原始作用就是负责定时更新视图，保证所有变化都反映到视图上，
比如我一个ajax请求延时更新scope上的data值，视图也会相应的延时更新。
这个工作其实我们不需要手工去做，框架底层已经帮我们封装好了。
但是，有一些情况他并不会自动执行这个动作，比如来自外部发生的调用。这里大家会问了，啥叫外部的？<br />
外部的就是不是自己家的意思。我们看一个例子吧：<br />

```
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>自定义指令</title>
</head>
<body ng-app="myMod">
    <div ng-controller="myCtrl">

        {{myName}}
        <hello my-name="myName"></hello>
    </div>


</body>
</html>
<script src="./lib/angular.js"></script>
<script>

    var module = angular.module('myMod',[]);
    module.controller('myCtrl',function($scope){
        $scope.myName = "tommy";

    });
    module.directive('hello',function(){
        return {

            scope:{
                myName:'=myName'
            },

            link:function(scope,ele,attrs){
                setTimeout(function(){
                        scope.myName = 'john';

                },1000);



            }

        };
    });
</script>
```
介个例子可谓是炒鸡简单吧。我在指令里面双向继承了myName，然后，我使用了延时函数，1s后更新一下myName的值，那，是否也更新到父scope上呢？
大家通过实际动手试试就知道了，这是不可以的。因为setTimeout这个函数就不是angular自家人，是外人！谁是自家人？**$timeout**。这时大家应该明白我们之前为啥提倡使用angular提供的这个服务了吧？
那，我们可以使用$timeout解决这个问题，如果坚持使用外人setTimeout，那就得使用$apply手工更新一下了。我们这样使用：

```
 setTimeout(function(){
    scope.$apply(function(){
      scope.myName = 'john';
   });
},1000);
```
试试看，是否ok了？但这个apply函数可别乱用啊，比如使用了$timeout，又加上了$apply就会报错。这个应当注意。<br />
使用场景比较高的外部调用，就是jquery插件了，比如pager这个分页插件，大家感兴趣可以试试看，能否正确封装一个有效的插件指令。

