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

  



