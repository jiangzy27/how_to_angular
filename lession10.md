###写在前面的话

我们前面讲过的一些知识点，都是我们下面工作中常用的一些技巧，希望大家能切实掌握住，不懂的及时沟通解决。<br />
其实，我们还有很多其他的知识点没讲，比如watch和apply，比如服务的配置，比如指令嵌套等等，
但是在实际工作中我发现，一下知道很多知识点和技巧，反而不知道怎么去选择运用，很容易造成思维混乱无从下手。<br />
所谓大巧若拙，如果能用一些简单的方式解决问题的，就不需要更酷更炫的方法。
后者反而很容易会把事情搞的更复杂，甚至钻入一个怪圈无法自拔。
我们现在就是掌握最基本的技巧，以便能够尽快进入实际开发中。<br />
学武功注重的厚积薄发，前端15年这一年井喷了n多门派武功，各大派都有自己的独门秘籍，每门武功都学一点而不深入，就沾沾自喜认为自己是高手，这是极端让人bs的。<br />
好，那今天再讲一个指令的例子，angular的入门便告一段落。<br />
指令如何绑定事件，如何绑定数据？其实一旦进入指令内部，就都是jquery的世界了。看如下代码：<br />

```
<!DOCTYPE html>
<html ng-app="myMod">
<head lang="en">
    <meta charset="UTF-8">
    <title>自定义指令</title>
</head>
<body ng-controller="myCtrl">

时间的格式:  <input type="text" ng-model="format"/>
当前时间：   <span my-current-time formatxx="{{format}}"></span>


</body>
</html>
<script src="./lib/angular.js"></script>
<script>
    //改变时间格式，也会改变时钟显示方式。
    var module = angular.module('myMod',[]);
    module.controller('myCtrl',function($scope){
        $scope.format = 'MM/dd/yy h:mm:ss a';
    });
    module.directive('myCurrentTime',function($interval,dateFilter){//注入服务
        return {
            //scope:{},
            scope:{format:'@formatxx'},
            link:function(scope,ele,attrs){
                //alert(scope.format);
                //alert(attrs.formatxx);

                function updateTime(){
                    ele.text(dateFilter(new Date(),scope.format));
                };
                $interval(function(){updateTime();},1000);

            }
        };
    });
</script>
```
这个例子我们要注意这样几点：<br />
1. 指令命名要用驼峰命名法，而对应到dom里面，名字就要用中划线命名法。<br />
2. 指令内部可以使用ele.text()，这个方法跟jquery的text()方法是一样的，jquery有多少方法，在我们指令内部都可以尽情使用。<br />
3. 指令可以通过attrs参数获取属性值，也可以通过单向继承方式从scope中获取，而如果不设置scope选项，默认一级级从下而上获取。<br />
4. 使用了$interval和dateFilter两个服务，这两个服务都是内部服务不需重新声明。$interval跟setInterval有一些不一样的地方，我们尽量使用内部提供的服务。<br />
