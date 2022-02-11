

# Linux Centos 7安装MongoDB（简单！详细！）

本安装教程系统版本为Linux Centos 7，使用Yum源安装MongoDB

[Linux 安装 MongoDB](https://juejin.cn/post/6844903828811153421)

## Yum源

**使用** 概括几个常用的：

```js
// 1 安装 
yum install package  // 安装指定的安装包package 

// 2 更新和升级 
yum update  // 全部更新 
yum update package  // 更新指定程序包package
yum check-update  // 检查可更新的程序 
yum upgrade package  // 升级指定程序包package 

// 3 查找和显示 
yum info // 列出所有可以安装或更新的包的信息
yum info package //显示安装包信息package 
yum list // 显示所有已经安装和可以安装的程序包 
yum list package  // 显示指定程序包安装情况package
yum search package // 搜索匹配特定字符的package的详细信息

// 4 删除程序 
yum remove | erase package  // 删除程序包package
yum deplist package  // 查看程序package依赖情况

// 5 清除缓存 
yum clean packages  // 清除缓存目录下的软件包 
yum clean headers // 清除缓存目录下的 headers 
yum clean oldheaders // 清除缓存目录下旧的 headers 
yum clean, yum clean all  // (= yum clean packages; yum clean oldheaders) 清除缓存目录下的软件包及旧的headers
复制代码
```

## 安装Mongodb

### 配置系统yum源

#### 1. 创建.repo文件，生成mongodb的源

```
vi /etc/yum.repos.d/mongodb-org-4.0.repo
复制代码
```

#### 2. 添加以下配置信息：

```
[mongodb-org-4.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/#releasever/mongodb-org/4.0/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-4.0.asc
复制代码
```

**详解：**

```
name         # 名称
baseurl      # 获得下载的路径
gpkcheck=1   # 表示对从这个源下载的rpm包进行校验；
enable=1     # 表示启用这个源。
gpgkey       # gpg验证
复制代码
```

#### 3. 保存退出

```
wq # 退出保存
复制代码
```

### 使用yum安装MongoDB

#### 1. 安装MongoDB

```
sudo yum install -y mongodb-org
复制代码
```

![安装MongoDB](https://user-gold-cdn.xitu.io/2019/4/23/16a47f5b28ccc7fe?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

#### 2. 验证安装结果

```
rpm -qa |grep mongodb
复制代码
rpm -ql mongodb-org-server
复制代码
```

![验证安装结果](https://user-gold-cdn.xitu.io/2019/4/23/16a47f602d81d242?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

#### 3. 启动MongoDB

启动MongoDB服务

```
systemctl start mongod.service
复制代码
```

MongoDB默认端口是27017，查看是否开启

```
netstat -natp | grep 27017
复制代码
```

检查数据库是否安装成功

```
ps -aux | grep mongod    # 查看数据库的进程是否存在
复制代码
```

![启动MongoDB](https://user-gold-cdn.xitu.io/2019/4/23/16a47f668d37fb57?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

#### 4. 验证服务开启

```
mongo
复制代码
```

![验证服务开启](https://user-gold-cdn.xitu.io/2019/4/23/16a47f6cfc44f347?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

### 常用命令清单

```js
// 1、开启MongoDB
sudo service mongod start  或者 systemctl start mongod.service  # 开启MongoDB
sudo chkconfig mongod on  # 加入开机启动
sudo service mongod restart # 重启MongoDB

// 2、关闭MongoDB
sudo service mongod stop  # 关闭防火墙

// 3、卸载MongoDB
sudo yum erase $(rpm -qa | grep mongodb-org)    # 卸载MongoDB
sudo rm -r /var/log/mongodb  # 删除日志文件
sudo rm -r /var/lib/mongo    # 删除数据文件
复制代码
```

## 远程连接Mongodb

### 1. 修改配置文件mongodb.conf

```
vi /etc/mongod.conf

# network interfaces
net:
  port: 27017
  bindIp: 0.0.0.0  # Enter 0.0.0.0,:: to bind to all IPv4 and IPv6 addresses or, alternatively, use the net.bindIpAll setting.
复制代码
```

**修改绑定ip默认127.0.0.1只允许本地连接， 所以修改为bindIp:0.0.0.0, 退出保存**

### 2. 重启mongodb服务

```
sudo service mongod restart 
复制代码
```

### 3. 开放对外端口

**方法一**

```
systemctl status firewalld  # 查看防火墙状态
firewall-cmd --zone=public --add-port=27017/tcp --permanent # mongodb默认端口号
firewall-cmd --reload  # 重新加载防火墙

firewall-cmd --zone=public --query-port=27017/tcp # 查看端口号是否开放成功，输出yes开放成功，no则失败
复制代码
```

**方法二**

```
iptables -A INPUT -p tcp -m state --state NEW -m tcp --dport 27017 -j ACCEPT
复制代码
```

### 4. 远程连接

**默认连接**

```
mongo 10.128.218.14:27017
复制代码
```

**连接到自定义的用户**

1. 创建用户，设置账号，密码，权限

```
// admin数据库
> use admin
switched to db admin
> db.createUser({ user:"root", pwd:"123456", roles:["root"] })
Successfully added user: { "user" : "root", "roles" : [ "root" ] }

// 其他数据库
> use test
switched to db test
> db.createUser({ user:"admin", pwd:"123456", roles:["readWrite", "dbAdmin"] })
Successfully added user: { "user" : "root", "roles" : [ "root" ] }
复制代码
```

1. 修改mongodb.conf文件，启用身份验证

```
vi /etc/mongod.conf

security:
  authorization: "enabled"   # disable or enabled
复制代码
```

1. 重启MongoDB

```
sudo service mongod restart 
复制代码
```

1. 用户认证

```
> use admin
switched to db admin
> db.auth("root", "123456")
1 // 授权成功
复制代码
// 其他常用命令
db.updateUser(user, writeConcern) # 更新用户
db.dropUser('test') # 删除用户
复制代码
```

1. 远程连接

```
// 终端连接
mongo 10.128.218.14:27017/database -u username -p password

// mongoose方式连接
mongoose.connect('mongodb://username:password@host:port/database?options...', {useNewUrlParser: true});

// 通过客户端连接
复制代码
```

### 用户权限角色说明

| 规则                 | 说明                                                         |
| -------------------- | ------------------------------------------------------------ |
| root                 | 只在admin数据库中可用。超级账号，超级权限                    |
| Read                 | 允许用户读取指定数据库                                       |
| readWrite            | 允许用户读写指定数据库                                       |
| dbAdmin              | 允许用户在指定数据库中执行管理函数，如索引创建、删除，查看统计或访问system.profile |
| userAdmin            | 允许用户向system.users集合写入，可以找指定数据库里创建、删除和管理用户 |
| clusterAdmin         | 只在admin数据库中可用，赋予用户所有分片和复制集相关函数的管理权限 |
| readAnyDatabase      | 只在admin数据库中可用，赋予用户所有数据库的读权限            |
| readWriteAnyDatabase | 只在admin数据库中可用，赋予用户所有数据库的读写权限          |
| userAdminAnyDatabase | 只在admin数据库中可用，赋予用户所有数据库的userAdmin权限     |
| dbAdminAnyDatabase   | 只在admin数据库中可用，赋予用户所有数据库的dbAdmin权限       |

# 参考文献

- [yum使用详解](https://blog.csdn.net/u011305680/article/details/52767230)
- [Install MongoDB Community Edition on Red Hat Enterprise or CentOS Linux](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-red-hat/)
- [CentOS 7上MongoDB数据库安装和卸载](https://www.linuxidc.com/Linux/2017-11/148495.htm)
- [ubuntu mongodb远程连接配置](https://www.jianshu.com/p/03aff57dfe46)
- [How to Enable Authentication on MongoDB](https://medium.com/mongoaudit/how-to-enable-authentication-on-mongodb-b9e8a924efac)
- [db.createUser()](https://docs.mongodb.com/manual/reference/method/db.createUser/)

### 阿里云服务器连接

```js
connectionStr: `mongodb://admin:${process.env.YUN_DB_PASS}@hinsenoo.top:27017/zhihuAPI?retryWrites=true&w=majority`,
```

### MoongoDB Atlas 连接:

- https://account.mongodb.com/account/login

- 837545254@qq.com 

```js
connectionStr: `mongodb+srv://hins:${process.env.DB_PASS}@hins.naxyu.mongodb.net/zhihuAPI?retryWrites=true&w=majority`,
```

[docs.mongodb.com](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-red-hat/)
去官网教程获取最新的源