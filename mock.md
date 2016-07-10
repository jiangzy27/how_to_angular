###接口模拟工具
我们在前端开发时，经常会遇到跟后端接口并行的情况，后端接口因为涉及到很多复杂的业务，
时间上如果等待后端完成，那给我们前端的时间就会少得可怜，其实我们依赖的只是后端接口的
一些字段名。
我们可以要求后端人员先出一份这样的json标准字段数据接口，然后我们有3种方式请求这份假数据接口，
我们以java的servlet接口为例：

    1. 安装nginx，通过分发请求，连接后端人员的机器，要求后端人员一直开启tomcat服务。

    2. 前端人员本机搭建servlet环境，请求自己机器的服务。

    3. 自己拿到json数据，自己搭建apache环境并放在www目录下，或用nodejs。

上述几种方法，第一种应该是最优雅也是最省事的，但是，java的web环境毕竟相当复杂，总是会出现宕机的现象，
我们如果重度依赖对方的机器，就会出现延误工时的现象，而自己搭建服务器的方式也是有些工作量的，有没有更简单
的方式呢？
今天我们就介绍一种这样的工具：**ssr** <br />
ssr就是一个静态服务器，因为是nodejs的一个插件，所以我们需要先安装nodejs，然后：

```
npm install -g ssr

常用命令:
  --help, -h         Show help
  --version, -V, -v  Show version number
  --port, -p         Set the port!
  --cors, -c         allows cross origin access serving

```
使用方法非常简单：
    1.建立目录文件dir1
    2.在dir1下建立一个index.html，进入这个目录，然后运行ssr -cp 9999
    3.打开浏览器，运行http://localhost:9999/

就是这么简单！<br />

好的，我们以上介绍了一种便捷搭建静态服务器的方法，但如果你不想搭建服务器，也不想安装什么nodejs，
我们还有一种方法介绍。

我们先看一下模拟数据会遇到的问题：

    1. 数据太长了，将数据写在js文件里，完成后挨个改url。

    2. 某些逻辑复杂的代码，加入或去除模拟数据时得小心翼翼。

    3. 想要尽可能还原真实的数据，要么编写更多代码，要么手动修改模拟数据。

    4. 特殊的格式，例如IP,随机数，图片，地址，需要去收集。

    5. 超烂的破网速…

比如，我们需要请求一个列表页数据，这个数据一般是很多的，我们可以用复制粘贴的方式写json，
但是，这毕竟还是份很枯燥无味的工作，能否有个自动的方式生成呢？
答曰：有之，他的名字叫**mock.js** <br/>

```
<script src="http://mockjs.com/dist/mock.js"></script>
<script>
// 使用 Mock
var data = Mock.mock({
    'list|1-10': [{
        'id|+1': 1
    }]
});
$('<pre>').text(JSON.stringify(data, null, 4))
.appendTo('body')
</script>
```
下面介绍一下语法，mock.js语法规范包含两部分：

    1. 数据模板定义（Data Temaplte Definition，DTD）

    2. 数据占位符定义（Data Placeholder Definition，DPD）

####数据模板定义
    数据模板中的每个属性由 3 部分构成：属性名、生成规则、属性值：

```
// 属性名   name
// 生成规则 rule
// 属性值   value
'name|rule': value

```

属性名 和 生成规则 之间用 | 分隔。<br />
生成规则 是可选的。<br />
生成规则 有 7 种格式：

    1. 'name|min-max': value

    2. 'name|count': value


    3. 'name|min-max.dmin-dmax': value
    4. 'name|min-max.dcount': value

    5. 'name|count.dmin-dmax': value

    6. 'name|count.dcount': value

    7. 'name|+step': value

