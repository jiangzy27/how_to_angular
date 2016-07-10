###如何安装karma-jasmine？
karma-jasmine是一款单元测试工具。安装步骤如下：

    1.安装nodejs
    2.npm install karma --save-dev
    3.npm install karma-jasmine karma-chrome-launcher --save-dev
    4.npm install -g karma-cli

完成以上步骤，没有报错的话，就是安装成功了。然后运行karma init,按照提示一步步走，一般是全回车就ok，
完事后，会生成一个配置文件，下面就可以使用了。
命令：
```
karma start karma.conf.js
```