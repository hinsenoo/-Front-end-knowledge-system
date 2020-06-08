#### 1. 介绍一下标准的 CSS 的盒子模型？低版本 IE 的盒子模型有什么不同？

```
1. 有两种：W3C 盒模型（标准盒模型）和 IE 盒模型（怪异盒模型）
2. 盒模型：内容(content)、填充(padding)、边界(margin)、边框(border);
3. 区别：IE 盒模型的 content 部分包括了 border 和 padding，也就是说盒子的宽高为 content + padding + border;
浏览器默认使用标准盒模型
IE 盒模型用： box-sizing: border-box 来设置
```

#### 2. CSS 选择符有哪些？哪些属性可以继承?

```
-	1. id选择器（# id）
  	2. 类选择器（. className）
  	3. 标签选择器（div, h1, p）
  	4. 相邻选择器（h1 + p）
  	5. 子选择器（ul > li）
  	6. 后代选择器（li a）
    7. 通配符选择器（ * ）
    8. 属性选择器（a[rel = 'xxx']）
    9. 伪类选择器（a:hover, li:nth-child） （伪类表示一种状态）
    10. 伪元素选择器 （::after ::before）（伪元素生成的是"表现"）

- 可继承样式：font-size font-family color
- 不可继承样式：border padding margin width height
```

#### 3. CSS 优先级算法如何计算？

```
- 优先级就近原则，同权重情况下样式定义最近者为准；
- 载入样式以最后载入的定义为准；
优先级为：
	同权重：内联样式表（标签内部）> 嵌入样式表（当前文件中）> 外部样式表（外部文件中）
	!important > id(100) > class > tag
	important 比内联(1000)优先级高
	权重值：
	1、!important，加在样式属性值后，权重值为 10000
    2、内联样式，如：style=””，权重值为1000
    3、ID 选择器，如：#content，权重值为100
    4、类，伪类和属性选择器，如： content、:hover 权重值为10
    5、标签选择器和伪元素选择器，如：div、p、:before 权重值为1
    6、通用选择器（*）、子选择器（>）、相邻选择器（+）、同胞选择器（~）、权重值为0
```

#### 4. CSS3 新增伪类有哪些？

```
例如：
	p:first-of-type 选择属于其父元素的首个 <p> 元素的每个 <p> 元素
	p:last-of-type	选择属于其父元素的最后 <p> 元素的每个 <p> 元素
 	p:only-of-type	选择属于其父元素唯一的 <p> 元素的每个 <p> 元素
 	p:only-child	选择属于其父元素的唯一子元素的每个 <p> 元素。
  	p:nth-child(2)	选择属于其父元素的第二个子元素的每个 <p> 元素
  	
	伪元素：
    ::after			在元素之前添加内容,也可以用来做清除浮动。
  	::before		在元素之后添加内容
    :enabled  		匹配每个已启用的元素（大多用在表单元素上）
  	:disabled 		控制表单控件的禁用状态。
  	:checked        单选框或复选框被选中。
```

#### 5. 如何水平/垂直居中？

##### 内联元素水平居中：

设置 `text-align: center `

##### 内联元素垂直居中:

**单行内联元素**

设置上下内边距（**padding**）相等或者设置内联元素高度（**height**）和行高（**line-height**）相等：

```css
.element {
    padding-top: 30px;
    padding-bottom: 30px;
}
// 或者设置内联元素高度（height）和行高（line-height）相等
.element {
    height: 30px;
    line-height: 30px;
}
```

**多行内联元素**

**1. 利用表布局（table）**

利用表布局的 `vertical-align: middle` 可以实现子元素的垂直居中。

```css
.table-center{
    display: table;
}
.child {
    display: table-cell;
    vertical-align: middle;
}
```

**2. 利用"精灵元素"(ghost element)**

利用"精灵元素"(ghost element)技术实现，即在父容器内放一个100%高度的伪元素，让文本和伪元素垂直对齐(vertical-align)，从而达到垂直居中的目的。

```css
.ghost-center {
    position: relative;
}
.ghost-center::before {
    content: " ";
    display: inline-block;
    height: 100%;
    width:1%;
    vertical-align: middle;
}
.ghost-center p {
    display: inline-block;
    vertical-align: middle;
    width: 20rem;
}
```



##### 块级元素水平居中：

###### 1. （需定宽）margin: 0 auto;

```
.block-box{
	width: 100px;		// 需定宽
	margin: 0 auto;
}
```

###### 2. 绝对定位 absolute + transform; (CSS3，有兼容性问题)

```
.parent{
	position: relative;
}
.child{
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
}
```

###### 3.（需定宽）绝对定位 absolute + 负margin 

```css
.parent {
    position: relative;
}
.child {
    position: absolute;
    width: 100px;
    left: 50%;
    /* 向左偏移元素高度的一半 */
    margin-left: -50px;
}
```

###### 4. (可用百分比宽度) 绝对定位 absolute + margin: 0 auto; 

```css
.parent {
    position: relative;
}
.child {
    position: absolute;
    width: 50%;
    height: 50%;
    left: 0;
    right: 0;
    /*水平居中*/
    margin: 0 auto;
}
```

##### 块级元素垂直居中:

###### 1. (需定宽) 绝对定位 + 负margin

```css
.parent {
    position: relative;
}
.child {
    position: absolute;
    top: 50%;
    height: 100px;
    margin-top: -50px;
}
```

###### 2. 绝对定位 absolute + margin-top/bottom: auto (可用百分比宽度)

```css
.parent {
    position: relative;
}
.child {
    position: absolute;
    top: 0;
    bottom: 0;
    height: 100px;
    margin: auto 0;
}
```

###### 3. table-cell+vertical-align

将父元素转化为一个表格单元格显示，再通过设置 `vertical-align`属性，使表格单元格内容垂直居中。

```css
.parent {
    display: table-cell;
    vertical-align: middle;
}
.child{}
```

###### ！！！！万能方法：下面的 flex布局 以及 CSS3 的 transform

##### 多块级元素水平居中

###### 1. 父:text-align: center + 子:inline-block

将需要水平排列的块级元素的 **display** 修改为 **inline-block** 属性，父级元素设置行内居中 **text-align: center**

```css
.parent {
    text-align: center;
}
.child {
    display: inline-block;
}
```

- 注：**如果一行中有两个或两个以上的块级元素，也可以通过这个方法从而使多个块级元素水平居中。**

###### 2. flex 布局

##### 浮动元素水平居中 

###### 1. 需定宽 relative + 负margin

![](assets/1576419207546.png)

```css
.float-element {
    width: 100px;
    height: 50px;
    float: left;
    position: relative;
    left: 50%;
    /* 向左偏移元素宽度的一半 */
    margin-left: -50px;
}
```

###### 2. 不定宽 父元素left: 50% 子元素 right: 50%

![1576419548475](assets/1576419548475.png)

需要清除浮动，给外部元素（父元素）加上 float

```js
.parent {
    float: left;
    position: relative;
    left: 50%;
}
.child {
    float: left;
    position: relative;
   	left: -50%;
}
```

###### 3. 不论宽度 flex 布局

```js
.parent {
    float: left;
    display:flex;
    justify-content:center;
}
.child {
    /*有无宽度都行*/
    float: left;
}
```



#### 6. 如何水平垂直居中？

##### 固定宽高：

###### 1. 绝对定位 + 负 margin

绝对定位居中，通过margin 平移元素整体宽度和高度的一半。

```css
.parent {
    position: relative;
}
.child {
    width: 100px;
    height: 100px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -50px;
    margin-top: -50px;
}
```

- 优点：有良好的跨浏览器特性，兼容 IE6-IE7。
- 缺点：灵活性差，不能自适应，宽高不支持百分比尺寸和 min-/max-width/height 属性

###### 2. 绝对定位 + margin: auto

通过定位设置各个方向的距离都是0，此时再将margin设为auto

```css
.parent {
    position: relative;
}
.child {
    /*可用百分比*/
    width: 100px;
    height: 100px;
    position: absolute;;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}
```

- 优点：
  - 不仅可以实现在正中间，还可以在正左方，正右方。
  - 元素的宽高支持百分比 % 属性值和 min-/max-width/height 属性。
  - 可以封装成一个弹出层。
  - 浏览器支持性好。

###### 3. 绝对定位 + calc（计算属性）

使用 CSS3 的计算属性 calc，top 的百分比是基于元素的左上角，再减去宽度的一半就好了(有点类似于绝对定位+负边距)

```css
.parent {
    position: relative;
}
.child {
    width: 100px;
    height: 100px;
    position: absolute;
    top: calc(50% - 50px);
    left: calc(50% - 50px);
}
```

- 缺点：兼容性、需要知道子元素的具体宽高

###### 4. 父: table-cell + vertical-align 子：inline/inline-block

适用于子元素为 **inline-block**, **inline** 类型的元素

```
.parent {
    display: table-cell;
    vertical-align: middle;/*垂直居中*/
    text-align: center; /*水平居中*/
    width: 200px;
    height: 200px;
}
.child {
    width: 100px;
    height: 100px;
    display: inline-block;
}
```



##### 不定宽高:

###### 1. 绝对定位 + transform

利用 2D 变换，在水平和垂直两个方向都反向平移自身宽高的一半，从而使元素水平垂直居中。

```css
.parent {
    position: relative;
}
.child {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```

- 优点：内容可自适应，可以封装成一个弹出层。
- 缺点：部分浏览器存在兼容性问题，可能干扰其他 transform 效果

###### 2. css-table

css新增的table属性，可以让我们把普通元素，变为table元素的现实效果，通过这个特性也可以实现水平垂直居中

```css
.parent {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
}
.child {
    display: inline-block;
}
```

###### 3. flex布局

利用CSS3 新增的 flex 弹性盒子布局，其中`justify-content` 用于设置或检索弹性盒子元素在主轴（默认横轴）方向上的对齐方式；而`align-items`属性定义flex子项在flex容器的当前行的侧轴（默认纵轴）方向上的对齐方式。

```css
.flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}
```

- 优点：移动端可以完全使用，PC端需要看兼容情况。CSS 布局未来的趋势，设计初中就是为了解决像垂直居中这样的常见的布局问题。

###### 4. grid布局

CSS3 新增的网格布局，兼容性不好不如flex，不推荐使用

```js
.parent {
    display: gird;
}
.box {
    align-self: center;
    justify-self: center;
}
```

###### 5. flex/grid + margin:auto

父元素必须有高度，容器元素设为 flex 布局或是grid布局，子元素只要写 margin: auto 即可,不能兼容低版本的IE浏览器。

```css
.parent {
  height: 100vh;
  display: flex;  / grid
}
.child {
  margin: auto;
}
```



##### 总结：

- PC端有兼容性要求，宽高固定，推荐absolute + 负margin
- PC端有兼容要求，宽高不固定，推荐css-table
- PC端无兼容性要求，推荐flex
- 移动端推荐使用flex



#### 7. display 有哪些值? 说明他们的作用。

```
    none			元素不显示，并从文档流中移除。
    block			块类型。默认宽度为父元素宽度。可设置宽高，换行显示。
    inline			行内元素类型。默认宽度为内容宽度，不可设置宽高，同行显示。
    inline-block	默认宽度为内容宽度，可以设置宽高，同行显示。
    list-item		像块类型元素一样显示，并添加样式列表标记。
    table			此元素会作为块级表格来显示。
    inherit			规定应该从父元素继承 display 属性的值。
```

#### 8. position 的值 relative 和 absolute 定位原点是？

```
	static
		默认值，元素出现在文档流中。
    relative
		（正常文档流）生成相对定位的元素，相对于其正常位置进行定位。
	absolute	
		（脱离文档流）生成绝对定位的元素，相对于值非 static 的第一个父元素进行定位。
	fixed（老 IE 不支持）
		（脱离文档流）生成绝对定位的元素，相对于浏览器窗口进行定位。
	inherit
		规定从父元素继承 position 属性的值。
```

#### 9. CSS3 有哪些新特性？

```
	RGBA和透明度	
	word-wrap（对长的不可分割单词换行）word-wrap：break-world
	边框图片：border-image:url(border.png) 30 30 round;
	盒子大小：background-size(图片尺寸大小)：63px 100px；background-repeat：no-repeat；（设置百分比是拉伸）；
	媒体查询：定义两套css，当浏览器的尺寸变化时会采用不同的属性。
	圆角			 (border-radius: 8px)
	多列布局		(multi-column layout)
	阴影和反射	   (box-shadow \ box-reflect)
	文字特性	   （text-shadow)
	文字渲染        (text-decoration)
	线性渐变		(gradient)
	2d3d变换		 (transform)
	缩放，定位，倾斜，动画，多背景
	例如:transform:\scale(0.85,0.90)\ translate(0px,-30px)\ skew(-9deg,0deg)\Animation:
```

#### 10. CSS3 的 FlexBox（弹性盒布局模型），以及适用场景？

```
	答：称为弹性盒布局模型是css3规范中的一种新的布局方式，该布局模型的目的是提供一种更加高效的
    方式来对容器中的条目进行布局、对齐和分配空间。在传统的布局方式中，block 布局是把块在垂直方
    向从上到下依次排列的；而 inline 布局则是在水平方向来排列。弹性盒布局并没有这样内在的方向限
    制，可以由开发人员自由操作。
    试用场景：弹性布局适合于移动前端开发，在Android和ios上也完美支持。
	
	一个用于页面布局的全新 CSS3 功能，Flexbox 可以把列表放在同一个方向（从上到下排列，从左到右），并让列表能延伸到占用可用的空间。
	较为复杂的布局还可以通过嵌套一个伸缩容器（flex container）来实现。
	利用 flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。
	它的所有子元素自动成为容器成员，称为 flex 项目（flex item)，简称“项目”。
	常规布局是基于块和内联流方向的，而 flex 布局是基于 flex-flow 流，可以很方便的用来做居中，能对不同屏幕大小自适应。
	在布局上有了比以前更加灵活的空间。
	
   具体：http://www.w3cplus.com/css3/flexbox-basics.html
```

#### 11. 纯 CSS 创建一个三角形的原理是什么？

把上、左、右 三条边隐藏掉（颜色设为 transparent——透明)

```css
#demo {
    width: 0;
    height: 0;
    border-width: 20px;
    border-style: solid;
    border-color: transparent transparent red transparent;
}
```

#### 12. 一个满屏 品 字布局 如何设计?

```
  简单的方式：
  	上面的div宽100%，
  	下面的两个div分别宽50%，
  	然后用float或者inline使其不换行即可
```

#### 13. css 多列等高如何实现？

1. ##### **真实等高布局 flex**

   **技术点：弹性盒子布局 flex，默认值就是自带等高布局的特点**

   定义 flex 布局时，有一些默认值：

   - `flex--direction` 属性定义主轴的方向。默认值为 `row` ，一般是水平显示。flex 容器的主轴被定义为与文本方向相同，主轴的起点和主轴的终点与内容方向相同。
   - `align-item` 属性定义 flex 子项在 flex 容器的当前行的侧轴（纵轴，或者说交叉轴）方向上的对齐方式。默认值为 `stretch`，元素被拉伸以适应容器。

2. **真实等高布局 table-cell**

   **技术点：table 布局天然就具有等高的特性。**

   子元素的`display` 设置为 `table-cell`，则元素会作为一个表格单元格显示。类似于使用标签 `<td>` 或 `<th>` 

3. **假等高多列布局，内外底边距互为正负值**

   **实现：设置父容器的 overflow 属性为 hidden。给每列设置比较大的底内边距，然后用数值相同的负外边距消除这个高度。**

   - 不考虑可扩展性，只需要将 padding-bottom/margin-bottom ，设置为最高列与最低列相差高度值，就可以得到等高效果。
   - 考虑扩展性，为了防止将来可能某列高度大量的增加或减少，所以，我们设置了一个比较大的值。

   **技术点**：

   1. background 会填充内边距 padding，而不会填充外边距 margin。margin 具有坍塌性，可以设置负值。
   2. float:left。使用float，元素会脱离文档流，使其浮动至最近的文档流元素。在这里的作用是，将三个div元素并排。
   3. overflow:hidden; 设置overflow属性为hidden，这样会让父容器产生BFC（Block Fromatting Context块级格式化上下文）效果，消除float带来的影响。同时，根据需要，会截取内容以适应填充框，将超出容器的部分隐藏。

    ```
        利用 padding-bottom | margin-bottom 正负值相抵；
        设置父容器超出隐藏（overflow: hidden)，这样子父容器的高度就还是它里面的列没有设定 padding-bottom 时的高度，
        当它里面的任一列高度增加了，则父容器的高度会被撑到里面最高的那列的高度，
        其他比这列矮的列会用它们的 padding-bottom 补偿这部分高度差。
    ```

#### 14.  经常遇到的浏览器的兼容性有哪些？原因，解决方法是什么，常用 hack 的技巧 ？

```
	- png24 位的图片在 IE6 浏览器上出现背景，解决方案是做成 PNG8。
	
	- 浏览器默认的 margin 和 padding 不同。解决方案是加一个全局的 *{margin:0;padding:0;} 来统一
	
	- IE 下，可以使用获取常规属性的方法来获取自定义属性，也可以使用 getAttribute() 获取自定义属性。
	  Firefox 下，只能使用 getAttribute() 获取自定义属性。
	  解决方法：统一通过 getAttribute() 获取自定义属性。
	
	- IE 下，event 对象有 x，y 属性，但是没有 pageX，pageY 属性。
	  Firefox 下，event 对象有 pageX，pageY 属性，但是没有 x，y 属性。
	  
	- Chrome 中文界面下默认会将小于 12px 的文本强制按照 12px 显示,
      可通过加入 CSS 属性 -webkit-text-size-adjust: none; 解决。
	 
	- 超链接访问过后hover样式就不出现了 被点击访问过的超链接样式不在具有hover和active了解决方法是改变CSS属性的排列顺序:
  	  L-V-H-A :  a:link {} a:visited {} a:hover {} a:active {}
```

#### 15. li 与 li 之间有看不见的空白间隔是什么原因引起的？有什么解决办法?

```
	行框的排列会受到中间空白（回车、空格）等的影响，因为空格也属于字符，这些空白也会被应用样式，占据空间，所以会有间隔，把字符大小设为 0，就没有空格了。
```

#### 16. 为什么要初始化 CSS 样式

```
	1. - 因为浏览器的兼容问题，不同浏览器对有些标签的默认值是不同的，如果没对 CSS 初始化往往会出现浏览器之间的页面显示差异。	- 当然，初始化样式会对 SEO 有一定的影响，但鱼和熊掌不可兼得，但力求影响最小的情况下初始化。
	
	2. 每一个html标签都有自己的默认样式，而css就是可以改变html的样式。但是对于大量div设置就很
    麻烦，所以初始化样式很重要。
	
	最简单的初始化方法： * {padding: 0; margin: 0;} （强烈不建议）

  	  淘宝的样式初始化代码：
      body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, dl, dt, dd, ul, ol, li, pre, form, fieldset, legend, button, input, textarea, th, td { margin:0; padding:0; }
      body, button, input, select, textarea { font:12px/1.5tahoma, arial, \5b8b\4f53; }
      h1, h2, h3, h4, h5, h6{ font-size:100%; }
      address, cite, dfn, em, var { font-style:normal; }
      code, kbd, pre, samp { font-family:couriernew, courier, monospace; }
      small{ font-size:12px; }
      ul, ol { list-style:none; }
      a { text-decoration:none; }
      a:hover { text-decoration:underline; }
      sup { vertical-align:text-top; }
      sub{ vertical-align:text-bottom; }
      legend { color:#000; }
      fieldset, img { border:0; }
      button, input, select, textarea { font-size:100%; }
      table { border-collapse:collapse; border-spacing:0; }
```

#### 17. absolute 的 containing block（容器块）计算方式跟正常流有什么不同？

```
	无论属于哪种，都要找到其祖先元素中最近的 position 值不为 static 的元素，然后再判断：
	1. 若此元素为 inline 元素，则 containing block 为能够包含这个元素生成的第一个和最后一个 inline box 的 padding box（除 margin，border 外的区域）的最小矩形；
	2. 否则，则由这个祖先元素的 padding box 构成。
	 如果都找不到，则为 initial containing block。
	 
	 补充：
      1. static(默认的)/relative：简单说就是它的父元素的内容框（即去掉padding的部分）
      2. absolute: 向上找最近的定位为absolute/relative的元素
      3. fixed: 它的containing block一律为根元素(html/body)，根元素也是initial containing block
```



#### 18. CSS 里的 visibility 属性有个 collapse 属性值是干嘛用的？在不同浏览器下有什么区别？

```
	对于普通元素 visibility: collapse; 会将元素完全隐藏，不占据页面布局空间，与 display: none; 表现相同。
	如果目标元素为 table, visibility: collapse; 将 table 隐藏，但是会占据页面布局空间，仅在 firefox 下起作用，IE 会显示元素，Chrome 会将元素隐藏，但是占据空间。
```

#### 19. position 跟 display、margin、collapse、overflow、float 这些特性相互叠加后会怎么样？

```
        display属性规定元素应该生成的框的类型；position属性规定元素的定位类型；float属性是一种
    布局方式，定义元素在哪个方向浮动。类似于优先级机制：position：absolute/fixed优先级最高，有
    他们在时，float浮动不起作用，display值需要调整。浮动或者absolute定位的元素，只能是块元素或
    表格。
	
	- 如果元素的 display 为 none，那么元素不被渲染，position，float 不起作用；
	- 如果元素拥有 postion: absolute; 或者 position: fixed; 属性，那么元素将为绝对定位，float 不起作用；
	- 如果元素 float 属性不是 none，元素会脱离文档流，根据 float 属性值来显示；
	- 有浮动，绝对定位，inline-block 属性的元素，margin 不会和垂直方向上的其他元素 margin 折叠。
```

#### 20. 对 BFC 规范（块级格式化上下文：block formatting context）的理解？

```
	(W3C CSS 2.1 规范中的一个概念，它是一个独立容器，决定了元素如何对其内容进行定位，以及与其他元素的关系和相互作用。)
	一个页面是由很多个 Box 组成的，元素的类型和 display 属性，决定了这个 Box 的类型。
	文档流（normal flow）按照html中的先后位置至上而下布局，行内元素水平排列，当前行被占满后换行，块级元素会被渲染为完整的新行。
	BFC是属于文档流，因此对兄弟元素也不会造成什么影响。

    具有 BFC 的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并
    且 BFC 具有普通容器没有的一些特性。
    浮动元素，绝对定位元素，display，overflow会触发BFC。

    特性：（1）会阻止外边距折叠
    （2）会包含浮动元素
    （3）阻止元素被浮动元素覆盖
	简单来说：BFC 就是一个独立不干扰外界也不受外界干扰的盒子。
```

#### 21. 对 IFC 规范（行内格式化上下文：inline formatting contexts）的理解？

```
	IFC 由一个不包含块级盒子的块容器盒生成。
	- 生成：块级元素中仅包含行内级元素
	- 注：形成条件非常简单，需要注意的是当 IFC 中有块级元素插入时，会产生两个匿名行内盒子将父元素分割开来，产生两个IFC。
	作用：1. 行内元素按照 `text-align` 进行水平居中。
		 2. 行内元素撑开父元素高度，通过 `vertical-align` 属性进行垂直居中。
```

#### 22. css定义的权重

```
  以下是权重的规则：标签的权重为1，class的权重为10，id的权重为100，以下例子是演示各种定义的权重值：

  /*权重为1*/
  div{
  }
  /*权重为10*/
  .class1{
  }
  /*权重为100*/
  #id1{
  }
  /*权重为100+1=101*/
  #id1 div{
  }
  /*权重为10+1=11*/
  .class1 div{
  }
  /*权重为10+10+1=21*/
  .class1 .class2 div{
  }

  如果权重相同，则最后定义的样式会起作用，但是应该避免这种情况出现
```

#### 23. 请解释一下为什么需要清除浮动？清除浮动的方式？

​		在非IE浏览器（如Firefox）下，当容器的高度为auto，且容器的内容中有浮动（float为 left 或 right）的元素，在这种情况下，容器的高度不能自动伸长以适应内容的高度，使得内容溢出到容器外面而影响（甚至破坏）布局的现象。这个现象叫浮动溢出，为了防止这个现象的出现而进行的CSS处理，就叫CSS清除浮动。

​		清除浮动是为了清除使用浮动元素产生的影响。浮动的元素，父元素的高度会塌陷，而高度的塌陷使我们页面后面的布局不能正常显示。

```
  1、父级div定义height；
  2、父级div 也一起浮动（触发 BFC 的方法都可以，overflow: hidden;）；
  3、常规使用的一个 class，同时加入:before以解决现代浏览器上边距折叠的问题，display:table 本身并不会创建BFC，但是它会产生匿名框,而匿名框中的 `display:table-cell` 可以创建新的BFC
  		.clear-fix::before,
  		.clear-fix::after{
  			content: " ",
  			display: table;
  		}
  		.clear-fix::after{
  			clear: both;
  		}
  		.clearfix{
  			*zoom: 1;
  		}
  4、给父元素设置`overflow:auto`来简单的实现BFC清除浮动，但是为了兼容IE最好用`overflow:hidden`。但是这样元素阴影或下拉菜单会被截断，比较局限。
  5、SASS 编译时，浮动元素的父级 div 定义伪元素:after
  		&::after, &::before{
  			content: " ",
  			visibility: hidden,
  			display: block;
  			height: 0;
  			clear: both
  		}
  解析原理：
  1). display: block 使生成的元素以块级元素显示，占满剩余空间；
  2). height: 0; 避免生成内容破坏原有布局的高度;
  3). visibility: hidden 使生成的内容不可见，并允许可能被生成内容盖住的内容可以进行点击和交互；
  4). 通过 content: " " 生成内容作为最后一个元素，至于 content 里面是点还是其他都可以，例如oocss里面就有经典的 content:".",有些版本可能content 里面内容为空,是不推荐这样做的,firefox直到7.0 content:”" 仍然会产生额外的空隙；
  5). zoom: 1 触发 IE hasLayout;
  
  通过分析发现，除了 clear: both 用来闭合浮动的，其他代码无非都是为了隐藏掉 content 生成的内容，这也就是其他版本的闭合浮动为什么会有 font-size：0，line-height：0。
```

#### 24. 什么是外边距合并？

```
	外边距合并指的是：处于文档流中的两个或多个盒子（可能相邻或者嵌套）垂直外边距相遇时(其间没有任何非空内容、padding、border，或者clear)，它们将合并成一个外边距，合并后的外边距的高度等于两个发生合并的外边距的高度中的较大者。
	注: 自身的margin-botom和margin-top相邻时也会发生重叠,只有当自身内容为空,垂直方向上border,padding,均为空时,自身的margin-top与margin-bottom才会相邻.
	
	去除外边距折叠的方法:
	1. 相邻的元素
	只有在静态流的元素才会发生外边距合并，或者设置处于不同的 BFC 下，故设置 overflow：hidden；float, position: absolute; 都可以使得外边距在何种情况都不合并。
	inline-block 是个例外，它既没有脱离文档流，但是它的所有的外边距都不会合并。
	2. 父元素与子元素
	①给父元素定义上边框。②给父元素定义上内边距。（后面都是创建 BFC）③给父元素添加 overflow：hidden；④添加浮动 ⑤添加绝对定位
```

####  25. zoom:1 的清除浮动原理？

```
	清除浮动，触发 hasLayout;
	zoom 属性是 IE 浏览器的专有属性，它可以设置或检索对象的缩放比例。解决 ie 下比较奇葩的 bug。
	譬如外边距（margin）的重叠，浮动清除，触发 ie 的 hasLayout 属性等。
	
	大概原理：
	当设置了 zoom 的值后，所设置的元素就会扩大或者缩小，高度宽度就会重新计算了，这里一旦改变 zoom 值时其实也会发生重新渲染，运用这个原理，也就解决了 ie 下子元素浮动时父元素不随着自动扩大的问题。
	
	Zoom属是IE浏览器的专有属性，火狐和老版本的webkit核心的浏览器都不支持这个属性。然而，zoom现在已经被逐步标准化，出现在 CSS 3.0 规范草案中。

  目前非ie由于不支持这个属性，它们又是通过什么属性来实现元素的缩放呢？
  可以通过css3里面的动画属性scale进行缩放。
```

#### 26. 移动端的布局用过媒体查询吗？

```
假设你现在正用一台显示设备来阅读这篇文章，同时你也想把它投影到屏幕上，或者打印出来， 而显示设备、屏幕投影和打印等这些媒介都有自己的特点，CSS就是为文档提供在不同媒介上展示的适配方法

当媒体查询为真时，相关的样式表或样式规则会按照正常的级联规被应用。 当媒体查询返回假， 标签上带有媒体查询的样式表 仍将被下载 （只不过不会被应用）。

包含了一个媒体类型和至少一个使用 宽度、高度和颜色等媒体属性来限制样式表范围的表达式。 CSS3加入的媒体查询使得无需修改内容便可以使样式应用于某些特定的设备范围。
通过媒体查询可以为不同大小和尺寸的媒体定义不同的css，适应相应的设备的显示
<style> @media (min-width: 700px) and (orientation: landscape){ .sidebar { display: none; } } </style>
```

#### 27. CSS 优化、提高性能的方法有哪些？

```
	关键选择器（key selector)。选择器的最后面的部分为关键选择器（即用来匹配目标元素的部分）；
	如果规则拥有 ID 选择器作为其关键选择器，则不要为规则增加标签。过滤掉无关的规则（这样样式系统就不会浪费时间去匹配它们了）；
	提取项目的通用公有样式，增强可复用性，按模块编写组件；增强项目的协同开发性、可维护性和可扩展性；
	使用预处理工具或构建工具（gulp 对 css 进行语法检测、自动补前缀、打包压缩、自动优雅降级）；
	
	（1）避免过度约束
    // 糟糕
    ul#nav{..}
    // 好的
    #nav{..}

    （2）后代选择符不好
    html div tr td {..}

    （3）避免链式选择符
    // 糟糕
    .menu.left.icon {..}
    // 好的
    .menu-left-icon {..}
    
    （4）使用复合（紧凑）语法
    // 糟糕
    .someclass {
        padding-top: 20px;
        padding-bottom: 20px;
        padding-left: 10px;
        padding-right: 10px;
        background: #000;
        background-image: url(../imgs/carrot.png);
        background-position: bottom;
        background-repeat: repeat-x;
    }
    // 好的
    .someclass {
        padding: 20px 10px 20px 10px;
        background: #000 url(../imgs/carrot.png) repeat-x bottom;
    }
    
    （5）避免不必要的命名空间
    // 糟糕
    .someclass table tr.otherclass td.somerule {..}
    //好的
    .someclass .otherclass td.somerule {..}
    
    （6）避免不必要的重复
    .someclass {
        color: red;
        background: blue;
        font-size: 15px;
    }
    .otherclass {
        color: red;
        background: blue;
        font-size: 15px;
    }
    // 好的
    .someclass, .otherclass {
        color: red;
        background: blue;
        font-size: 15px;
    }
    （7）最好使用表示语义的名字。一个好的类名应该是描述他是什么而不是像什么
    （8）避免！important，可以选择其他选择器
    （9）尽可能的精简规则，你可以合并不同类里的重复规则
```

#### 28. 浏览器是怎么解析 CSS 选择器的？

```
	样式系统从关键选择器开始匹配，然后左移查找规则选择器的祖先元素。
	只要选择器的子树一直在工作，样式系统就会持续左移，直到和规则匹配，或者是因为不匹配而放弃该规则。
	
	补充: 而在 CSS 解析完毕后，需要将解析的结果与 DOM Tree 的内容一起进行分析建立一棵 Render
    Tree，最终用来进行绘图。在建立 Render Tree 时（WebKit 中的「Attachment」过程），浏览器就要
    为每个 DOM Tree 中的元素根据 CSS 的解析结果（Style Rules）来确定生成怎样的 renderer。
```

#### 29. margin 和 padding 分别适合什么场景使用？

```
	margin 是用来隔开元素与元素的间距；padding 是用来隔开元素与内容的间隔。
	margin 用于布局分开元素，使元素与元素互不相干；
	padding 用于元素与内容之间的间隔，让内容（文字）与（包裹）元素之间有一段间隔。
```

#### 30. 在网页中的应该使用奇数还是偶数的字体？为什么呢？

```
	写偶数，在使用移动端布局，和百分比布局的时候，换算单位和数值更加的方便精准
```

#### 31. 元素竖向的百分比设定是相对于容器的高度吗？

```
	一般来说，子元素的百分比设定都是以父元素为依据；
	对于竖直方向的 margin 和 padding，是参照父元素的宽度。
	对于水平方向的margin和padding，也是参照父元素的宽度。
```

#### 32. 全屏滚动的原理是什么？用到了CSS的那些属性？

```
	类似于轮播图，整体的元素一直排列下去，假设有五个需要展示的全屏页面，那么高度是 500%，只是展示 100%，剩下的可以通过 transform 进行 y 轴定位，或者通过 负的 margin-top 实现。
	overflow: hidden; transition: all 1000ms ease
```

#### 33. 什么是响应式设计？响应式设计的基本原理是什么？如何兼容低版本的IE？

```
	一个网站能够兼容多个终端，智能的根据用户的行为以及使用的设备环境进行相对应的布局，页面能够自动切换分辨率、图片尺寸及相关脚本功能等，以适应不同设备。
	基本原理：通过媒体查询检测不同的设备屏幕尺寸做处理，页面头部必须有 meta 声明的 viewport
	IE的老版本即IE9以下都是不支持媒体查询的 —— 兼容 respond.min.js
```

#### 34. ::before 和 :after中双冒号和单冒号 有什么区别？解释一下这2个伪元素的作用。

```
	单冒号（:) 用于 CSS3 伪类，双冒号 (::) 用于 CSS3 伪元素。（伪元素由双冒号和伪元素名称组成）
	在css2之前用的是单冒号，之后css3使用时双冒号。目前除了IE外不兼容双冒号，其他的浏览器兼容双
冒号，建议还是使用单冒号。
	
    （2）::before就是以一个子元素的存在，定义在元素主体内容之前的一个伪元素。并不存在与dom之
    中，只存在在页面之中。同理，after是在主体内容之后显示的。
```

#### 35. 你对line-height是如何理解的?

```
	行高是指一行文字的高度，具体说是两行文字间基线的距离。
	css 中起高度作用的应该是 height 和 line-height，一个没有定义 height 属性，最终其表现作用一定是 line-height。
	单行文本垂直居中：把 line-height 值设置为 height 一样大小的值可以实现单行文字的垂直居中，其实也可以把 height 删除。
	多行文本垂直居中：需要设置 display 属性为 inline-block
```

#### 36. 设置元素浮动后，该元素的display值是多少？

```
	display：block
	IE 出现双边框的原因：浮动元素的浮动方向与 margin 方向一致会出现双边框。
	解决：
		1. 给浮动元素添加一个 display: inline;
		2. 给 IE6 写一个 hack，其值为正常值的一半。
```

#### 37. 怎么让Chrome支持小于12px 的文字？

```
	方法一：首先取消浏览器自动调整功能。
    .classstyle{ -webkit-text-size-adjust:none; font-size:9px; } （现在无效）
    方法二：现在可以使用css3里的一个属性：transform：scale（）
    p{font-size:10px;-webkit-transform:scale(0.8);}//0.8是缩放比例
  	用图片：如果是内容固定不变情况下，使用将小于12px文字内容切出做图片，这样不影响兼容也不影响美观。
```

#### 38. 让页面里的字体变清晰，变细用 CSS 怎么做？

```
    -webkit-font-smoothing在window系统下没有起作用，但是在IOS设备上起作用
    -webkit-font-smoothing：antialiased 是最佳的，灰度平滑。
```

#### **39. font-style属性可以让它赋值为“oblique” oblique是什么意思？**

```
	在css规范中这么描述的，让一种字体表示为斜体（oblique），如果没有这样样式，就可以使用 italic。oblique是一种倾斜的文字，不是斜体。
```

#### 40. position: fixed; 在安卓下无效怎么处理？

```
    fixed的元素是相对整个页面固定位置的，你在屏幕上滑动只是在移动这个所谓的viewport，
    原来的网页还好好的在那，fixed的内容也没有变过位置，所以说并不是iOS不支持fixed，只是fixed的元素不是相对手机屏幕固定的。
    解决：在头部添加：
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"/>
```

#### 41. 如果需要手动写动画，你认为最小时间间隔是多久，为什么？（阿里）

```
	多数显示器默认频率是60Hz，即1秒刷新60次，所以理论上最小间隔为1/60＊1000ms ＝ 16.7ms
```

#### 42. display:inline-block 什么时候会显示间隙？(携程)

```
	1. 有空格的时候会有间隙 解决：移除空格
	2. margin 正值的时候 解决：margin 使用负值
	3. 使用 font-size 时候 解决：font-size: 0 、 letter-spacing 、word-spacing
```

#### 43. overflow: scroll 时不能平滑滚动的问题怎么处理?

```
	（1）高度尺寸不确定的时候，使用：overflow-y：scroll;
	（2）高度尺寸确定的，要么没有滚动条，要么直接出现，不会出现跳动。
	（3）css3计算calc和vw单位巧妙实现滚动条出现页面不跳动：
        .wrap-outer {
            margin-left: calc(100vw - 100%);
        }
        或.wrap-outer {
            padding-left: calc(100vw - 100%);
        }
        首先，.wrap-outer指的是居中定宽主体的父级，如果没有，创建一个
        然后，calc是css3的计算
        100vw是浏览器的内部宽度，而100%是可用宽度，不含滚动条
        calc（100vw-100%）是浏览器的滚动条的宽度
```

#### 44. 有一个高度自适应的div，里面有两个div，一个高度100px，希望另一个填满剩下的高度。

```
    （1）height：calc（100%-100px）
    （2）absolute position ：外层position：relative；
    百分百自适应元素 position: absolute; top: 100px; bottom: 0; left: 0
```

#### 45. **png、jpg、gif 这些图片格式解释一下，分别什么时候用。有没有了解过webp？**

```
    （1）png是便携式网络图片（Portable Network Graphics）是一种无损数据压缩位图文件格式，
    优点是：压缩比高，色彩好。 大多数地方都可以用。
    （2）jpg是一种针对相片使用的一种失真压缩方法，是一种破坏性的压缩，在色调及颜色平滑变化做的
    不错。在www上，被用来储存和传输照片的格式。
    （3）gif是一种位图文件格式，以8位色重现真色彩的图像。可以实现动画效果

    webp格式
    是谷歌在2010年推出的图片格式，压缩率只有jpg的2/3，大小比png小了45%，缺点是压缩的时间更久了
    。兼容性不好，目前谷歌和opera支持。
```

#### ??? 46. 什么是Cookie 隔离？（或者说：请求资源的时候不要让它带cookie怎么做） 

```
	  如果静态文件都放在主域名下，那静态文件请求的时候都带有的cookie的数据提交给server的，非常浪费流量，
      所以不如隔离开。

      因为cookie有域的限制，因此不能跨域提交请求，故使用非主要域名的时候，请求头中就不会带有cookie数据，
      这样可以降低请求头的大小，降低请求时间，从而达到降低整体请求延时的目的。

      同时这种方式不会将cookie传入Web Server，也减少了Web Server对cookie的处理分析环节，
      提高了webserver的http请求的解析速度。
```

#### 47. style标签写在body后与body前有什么区别？

```
	页面加载自上而下 当然是先加载样式。
```

#### 48. 什么是CSS 预处理器 / 后处理器？

```
  - 预处理器例如：LESS、Sass、Stylus，用来预编译Sass或less，增强了css代码的复用性，
    还有层级、mixin、变量、循环、函数等，具有很方便的UI组件模块化开发能力，极大的提高工作效率。

  - 后处理器例如：PostCSS，通常被视为在完成的样式表中根据CSS规范处理CSS，让其更有效；目前最常做的
    是给CSS属性添加浏览器私有前缀，实现跨浏览器兼容性的问题。
```

#### 49. rem布局的优缺点

```
1.rem的原理：
    （1）本质其实就是等比缩放
    （2）clientWidth/UI图宽度  这个是缩放比
    （3）dom宽高*clientWidth/UI图宽度  这个就是dom的实际宽高
但是这样每次都这么做很麻烦，不如直接找出一个单位来公用，于是rem就出现了


1. 响应式的优缺点
优点：兼容性好，@media在ie9以上是支持的，PC和MOBILE是同一套代码的，不用分开。
缺点：要写得css相对另外两个多很多，而且各个断点都要做好。css样式会稍微大点，更麻烦。

2. REM优缺点
优点：能维持能整体的布局效果，移动端兼容性好，不用写多个css代码，而且还可以利用@media进行优化。
缺点：开头要引入一段js代码，单位都要改成rem(font-size可以用px)，计算rem比较麻烦(可以引用预处理器，但是增加了编译过程，相对麻烦了点)。pc和mobile要分开。

3. 设置viewport中的width
优点：和REM相同，而且不用写rem，直接使用px，更加快捷。

缺点：效果可能没rem的好，图片可能会相对模糊，而且无法使用@media进行断点，不同size的手机上显示，高度间距可能会相差很大。
```

#### 50. **css属性overflow属性定义溢出元素内容区的内容会如何处理**

```
    参数是scroll时候，必会出现滚动条。
    参数是auto时候，子元素内容大于父元素时出现滚动条。
    参数是visible时候，溢出的内容出现在父元素之外。
    参数是hidden时候，溢出隐藏。
```

#### **51. 阐述一下CSS sprities？**

```
    它允许你将一个页面涉及到的所有零星图片都包含到一张大图中去，这样一来，当访问该页面时，载入
    的图片就不会像以前那样一幅一幅地慢慢显示出来了。
    利用CSS的“background-image”，“background- repeat”，“background-position”的组合进行背
    景定位，background-position可以用数字精确的定位出背景图片的位置。
    利用CSS Sprites能很好地减少网页的http请求，从而大大的提高页面的性能，这也是CSS Sprites最大
    的优点，也是其被广泛传播和应用的主要原因；
    CSS Sprites能减少图片的字节，曾经比较过多次3张图片合并成1张图片的字节总是小于这3张图片的字
    节总和。所以C错误
    解决了网页设计师在图片命名上的困扰，只需对一张集合的图片上命名就可以了，不需要对每一个小元
    素进行命名，从而提高了网页的制作效率。
    更换风格方便，只需要在一张或少张图片上修改图片的颜色或样式，整个网页的风格就可以改变。维护
    起来更加方便。
```

