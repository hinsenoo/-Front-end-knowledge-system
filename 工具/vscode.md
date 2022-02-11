## @ 路径自动补齐

- 插件：`Path Intellisense`

- 配置：

  ```json
  "path-intellisense.mappings": {
      "@": "${workspaceRoot}/src"
  }
  ```

- 在项目 package.json 所在同级目录下创建文件`jsconfig.json`：

  ```json
  {
      "compilerOptions": {
          "target": "ES6",
          "module": "commonjs",
          "allowSyntheticDefaultImports": true,
          "baseUrl": "./",
          "paths": {
            "@/*": ["src/*"]
          }
      },
      "exclude": [
          "node_modules"
      ]
  }
  ```

  # 插件

## css 样式定位

- 插件：css Peek （Vue 项目中下载 vue css peek）



## 爆炸果实（Power Mode）

```json
"powermode.enabled": true,
"powermode.shakeIntensity": 0,
"powermode.presets": "particles"
```

`powermode.presets`表示爆炸皮肤，通过逛网介绍，我们可以修改`presets`值设置不同的皮肤

如果不想要抖动效果，也是可以通过`powermode.shakeIntensity`配置去除的

## npm Intellisense

可自动完成导入语句中的npm模块

## Image preview

鼠标悬浮在链接上可及时预览图片

## ESLint

规范js代码书写规则，如果觉得太过严谨，可自定义规则

## Code Spell Checker

是拼写检查程序，检查不常见的单词，如果单词拼写错误，会给出警告提示