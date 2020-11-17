# Git 

#### [git提交代码到远程仓库](https://www.cnblogs.com/xuemingyao/p/9496250.html)

1、仓库初始化

git init

2、连接仓库

git remote add origin 仓库地址

3、查看状态

git status

4、将文件添加到暂存区

git add 状态里的新文件

5、将文件添加到仓库

git commit -m'相关注释文字'

6、将本地代码提交到远程仓库

git push origin master

### 存储密码 - SSH 添加密钥

- 查看配置：git config --list
- 设置全局用户名：git config --global user.name "xxxx"
- 设置全局用户邮箱：git config --global user.email "xxx@xxx.com"
- 设置全局存储密码：git config --global credential.helper store
  - 设置为 store 即可存储账密码
  - 从 GitHub 克隆用 HTTPS 地址

- SSH 生成公钥私钥：ssh-keygen -t rsa -C "xxx@xx.com"
  - -t 加密类型： rsa 非对称加密 -C 地址
  - 使用 ssh 方式需要在服务器(Git)设置对应的公钥，本地存储私钥
  - 从 GitHub 克隆用 SSH 地址



- 提交变动：git commit -m "备注" -a
  - -a 为提交所有变动。
- 跟踪指定文件：git add <file>
  - 跟踪所有文件：git add .