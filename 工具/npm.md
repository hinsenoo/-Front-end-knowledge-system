# npm

[《package.json中文文档》](https://github.com/ericdum/mujiang.info/issues/6/)

## 常用命令

### npm install packagename

安装模块如果不指定版本号，默认会安装最新的版本；

### npm install packagename 0.0.1

安装指定版本的模块；

### npm init

该命令会在当前目录生成一个 `package.json` 文件，这个文件中会记录一些关于项目的信息，比如：项目的作者，**git** 地址，入口文件，命令设置、命令设置、项目名称和版本号等待，一般情况下这个文件必须要有的，方便后续的项目添加和其他开发人员的使用。

### npm install packagename --save 或 -S

`--save、-S` 参数意思是把模块的版本信息保存到 **dependencies（生产环境依赖）**中，即 `package.json` 文件中的 **dependencies** 字段中；

### npm install packagename --save-dev 或 -D

`--save-dev、-D` 参数意思是把模块版本信息保存到 **devDependencis（开发环境依赖）**中，即 `package.json` 文件的 **devDependencis** 字段中；

### npm install packagename --save-optional 或 -O

`--save-optional 、 -O`参数意思是把模块安装到**optionalDependencies**（可选环境依赖）中，即 `package.json `文件的**optionalDependencies**字段中。

### npm install packagename --save-exact 或 -E

`--save-exact 、 -E`参数的意思是精确的安装指定版本的模块，细心的同学会发现 **dependencies** 字段里每个模块版本号前面的^不见鸟。。。

### npm install packagename -g 或 --global

安装全局的模块（不加参数的时候默认安装本地模块）

### npm list 或 npm ll 或 npm la 或 npm ls

查看所有已经安装的模块 `ll` 、 `ls` 、 `la` 三个命令意思都一样 但是列表的展示方式不一样 

### npm uninstall packagename [options]

卸载已经安装的模块，后面的options参数意思与安装时候的意思一样,与这个命令相同的还有`npm remove `、`npm rm`、`npm r` 、 `npm un` 、 `npm unlink` 这几个命令功能和`npm uninstall`基本一样，个人觉得没什么区别。

### npm outdated

这个命令会列出所有已经过时了的模块，对于已经过时了的模块可以使用下面的命令去更新

### npm update [-g]

更新已经安装的模块(或全局的模块)

### npm help '命令'

查看某条命令的详细帮助

### npm root

查看命令的绝对路径

### npm config

设置npm命令的配置路径，这个命令一般用于设置代理，毕竟大部分都是国外的模块，不过个人还是比较喜欢用`cnpm` 这个命令是用的淘宝的镜像，用法与npm一样，速度还可以。

### 额外

除去以上的这些命令外，经常还能见到一些`npm start`、`npm deploy`、 `npm build`等等之类的命令，这些一般都是在package.json 中自定义的一些启动、重启、停止服务之类的命令。可以在package.json文件的scripts字段里自定义。例如：

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "start": "webpack-dev-server main.js,
    "deploy": "set NODE_ENV=production"
  }
```

### 总结

devDependencies 节点下的模块是我们在开发时需要用的，比如项目中使用的 gulp ，压缩css、js的模块。这些模块在我们的项目部署后是不需要的，所以我们可以使用 -save-dev 的形式安装。像 express 这些模块是项目运行必备的，应该安装在 dependencies 节点下，所以我们应该使用 -save 的形式安装。