# git 工作流

`test ->master -> pre-production -> production`

- xxx —— 开发本机分支 = 独立环境

- test —— 本地环境分支

- master —— 主分支
- pre-production —— dep(线测)环境分支
- production —— 生产环境分支

## git commit 规范

规范的主要类型如下：

- feat：新功能或功能变更相关
- fix：修复bug相关
- docs：改动了文档，注释相关
- style：修改了代码格式化相关，如删除空格、改变缩进、单双引号切换、增删分号等，并不会影响代码逻辑
- refactor：重构代码，代码结构的调整相关（理论上不影响现有功能）
- perf：性能改动，性能、页面等优化相关
- test：增加或更改测试用例，单元测试相关
- build： 影响编译的更改相关，比如打包路径更改、npm过程更改等
- ci：持续集成方面的更改。现在有些build系统喜欢把ci功能使用yml描述。如有这种更改，建议使用ci
- chore：其它改动相关，比如文件的删除、构建流程修改、依赖库工具更新增加等
- revert：回滚版本相关