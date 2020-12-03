[Vue Loader](https://vue-loader.vuejs.org/zh/)

## 介绍

### Vue Loader 是什么？

Vue Loader 是一个 [webpack](https://webpack.js.org/) 的 loader，它允许你以一种名为[单文件组件 (SFCs)](https://vue-loader.vuejs.org/zh/spec.html)的格式撰写 Vue 组件：

```vue
<template>
  <div class="example">{{ msg }}</div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello world!'
    }
  }
}
</script>

<style>
.example {
  color: red;
}
</style>
```

`vue-loader` 会解析文件，提取每个语言块，如有必要会通过其它 loader 处理，最后将他们组装成一个 ES Module，它的默认导出是一个 Vue.js 组件选项的对象。

`vue-loader` 支持使用非默认语言，比如 CSS 预处理器，预编译的 HTML 模版语言，通过设置语言块的 `lang` 属性。例如，你可以像下面这样使用 Sass 语法编写样式：

```vue
<style lang="sass">
  /* write Sass! */
</style>
```

Vue Loader 还提供了很多酷炫的特性：

- 允许为 Vue 组件的每个部分使用其它的 webpack loader，例如在 `<style>` 的部分使用 Sass 和在 `<template>` 的部分使用 Pug；
- 允许在一个 `.vue` 文件中使用自定义块，并对其运用自定义的 loader 链；
- 使用 webpack loader 将 `<style>` 和 `<template>` 中引用的资源当作模块依赖来处理；
- 为每个组件模拟出 scoped CSS；
- 在开发过程中使用热重载来保持状态。