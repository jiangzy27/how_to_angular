我们回想一下之前的代码出现的ng-repeat，ng-click等，其实都是修饰型指令。但这都是内置指令，我们只需拿过来用就ok。
类似的内置指令还有ng-if，ng-show和ng-hide等等，这种内置指令的特点比较明显，就是前面都加了ng-开头。<br />
好的，我们继续。<br />
我们前面学过了service的概念，也了解了这个服务员不挑人，谁都能注入使用它。
一段指令不可能总是一段干巴巴的html静态标签，这毫无意义。我们起码还是要进行数据渲染的对吧。那，我们看一下如何在指令里面使用service。

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>MVVM</title>
</head>
<body ng-app="myMod">
    <redclick myattr1="hello" myattr2="hello2"></redclick>
</body>
</html>
<script src="./lib/angular.js"></script>
<script>
    angular.module('myMod',[])
            //定义一个指令，指令名字，指令定义
            .directive('redclick',function($http){
                return {
                    restrict:'E',
                    scope:{},
                    link:function(scope,ele,attrs){//这个形参不做要求,名字随便起，但顺序要对。
                        console.log(ele);console.log(attrs);
                        $http({
                            url:'test.json',
                            method:'get'
                        }).success(function(data){
                            ele.html(JSON.stringify(data));
                        });
                    }
                }
            });
</script>
```

在声明指令的时候，我在回调函数的形参里注入了$http这个内置服务。下面重点讲一下link参数：<br />
link首先是个函数，他有这么几个形参：<br />
1. scope：指令作用域。属于指令自己的作用域。
2. ele: 指令对应的这个元素本身。
3. attrs：指令上的属性值。

也就是说，我们可以在link里面进行各种jquery的dom操作了，其实说到底，我们并没有完全摆脱jquery，
因为jquery实在太强大了，社区里那么多年来贡献了那么多的插件，能一棒子说打死就打死么。<br />
最后再讲一点，不知大家注意了没有，在link的上头，还声明了一个空的scope，这是干啥用的呢？<br />
其实这就涉及到指令的生态环境的问题。我们秉承的原则是高内聚低耦合，所以，指令本身最好是不依赖父元素的东西。比如这样的代码：

```
<div ng-controller="myCtrl">
    <hello></hello>
</div>
```
我们看到，这个hello的指令上面还有个controller，我们知道，controller也有个scope作用域，那么，父级的scope，是否会影响到hello指令的scope呢？<br />
答案是可以的。如果我们不声明这个scope:{},默认就是完全继承了父元素的scope属性和方法的，这样做很明显违背了我们的低耦合的原则，拿出来一个指令不能复用，那我声明了有啥用？
但是在有些场景下，也不能完全割裂与父级的关系啊，所以，我们引入了继承的概念，对于不得不依赖的地方，我们单独声明一下，这个，我们下节课再讲。