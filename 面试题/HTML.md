#### 1. Doctype 的作用？

```js
IE 5.5 引入了文档模式的概念，而这个概念是通过使用文档类型（DOCTYPE）切换实现的。
<!Doctype> 声明位于 HTML 文档中的第一行，处于 <html> 标签之前，是为了告知浏览器的解析器用什么文档标准解析这个文档。
当 DOCTPYE 不存在时或格式不正确会导致文档以兼容模式呈现。
```

#### 2. 标准模式与兼容模式各有什么区别？

```js
标准模式的渲染方式和 JS 引擎的解析方式都是以该浏览器的最高标准运行。在兼容模式中，页面以宽松的向后兼容兼容的方式显示，模拟老式浏览器的行为以防止站点无法工作。
```

#### 3. HTML5 为什么只需要写 `<!DOCTYPE HTML>`?

```js
HTML5 不基于 SGML，因此不需要对 DTD 进行引用，但是需要 doctype 来规范浏览器的行为（让浏览器按照它们的应该的方式来运行）；
而 HTML4.01 基于 SGML，所以需要对 DTD 进行引用，才能告知浏览器文档所使用的文档类型；
```

#### 补： SGML、HTML、XML 和 XHTML 的区别？

```
SGML 是标准通用标记语言，是一种定义电子文档结构和描述其内容的国际标准语言，是所有电子文档标记语言的起源。
HTML 是超文本标记语言，主要是用于规定怎么显示网页。
XML 是可扩展标记语言，是未来网页语言的发展方向，XML 和 HTML 的最大区别就在于 XML 的标签是可以自己创建的，数量无限多，而 HTML 的标签都是固定的而且数量有限。
XHTML 也是现在基本上所有网页都在用的标记语言，它其实和 HTML 没什么本质的区别，标签都一样，用法也都一样，就是比 HTML 更严格，比如标签必须都用小写，标签都必须有闭合标签等。
```

#### 补：DTD 介绍

```
DTD（Document Type Definition 文档定义类型）是一组机器可读的规则，它们定义 XML 或 HTML 的特定版本中所有允许元素及它们的属性和层次关系的定义。在解析网页时，浏览器将使用这些规则检查页面的有效性并且采取相应的措施。
DTD 是对 HTML 文档的声明，还会影响浏览器的渲染模式（工作模式）。
```



#### 4. 行内元素有哪？ 块级元素有哪些？ 空(void)元素有哪些？

```
首先：CSS 规范规定，每个元素都有 display 属性，用来确定该元素的类型，每个元素都有默认的 display 值，如 div 的 display 值为 "block"
1. 行内元素有：a b span img input select strong(强调)
2. 块级元素有：div ul ol li dl dt dd h1 h2 h3 ... p
3. 常见的空元素：
	<br> 换行符 <hr> 分割线 <img> <input> <meta>
	鲜为人知的是：
  	<area> <base> <col> <command> <embed> <keygen> <param> <source> <track> <wbr>
```

#### 5. 页面导入样式时，使用 link 和 @import 有什么区别？

```
1. link 属于 XHTML 标签，除了加载 CSS 外，还能用与定义 RSS，定义 rel 连接属性等作用；而 @import 是 CSS 所提供的，只能用与加载 CSSS；
2. 页面被加载时，link 会同时被加载，而 @import 引用的 CSS 会等到页面加载完后再加载；
3. import 是 CSS2.1 提出的，只在 IE5 以上才能被识别，而 link 是 XHTML 标签，无兼容问题；
4. link 支持使用 js 控制 DOM 去改变样式，而 @import 不支持；
```

#### 6. 介绍一下你对浏览器内核的理解？

```
主要分成两部分：渲染引擎（layout engineer 或 Rendering Engine）和 JS 引擎。
	渲染引擎：负责取得网页的内容（HTML、XML、图像等等）、整理讯息（例如加入 CSS 等），以及计算网页的显示方式，然后回输出至显示器或打印机。浏览器的内核的不同对于网页的语法解释会有不同，所以渲染的效果也不相同。所有网页浏览器、电子邮件客户端以及其他需要编辑、显示网络内容的应用程序都需要内核。
	JS 引擎：解析和执行 JavaScript 来实现网页的动态交互。
最开始渲染引擎和 JS 引擎并没有区分的很明确，后来 JS 引擎越来越独立，内核就倾向于只指渲染引擎。
```

#### 7. 常见的浏览器内核有哪些？

```
Trident内核：IE,MaxThon,TT,The World,360,搜狗浏览器等。[又称MSHTML]
Gecko内核：Netscape6及以上版本，FF,MozillaSuite/SeaMonkey等
Presto内核：Opera7及以上。      [Opera内核原为：Presto，现为：Blink;]
Webkit内核：Safari,Chrome等。   [ Chrome的：Blink（WebKit的分支）]
```

#### 8. HTML5   有哪些新特性、移除了哪些元素？如何处理 HTML5 新标签的浏览器兼容问题？如何区分 HTML 和 HTML5？

```
- HTML5 现在已经不是 SGML 的子集，主要是关于图像、位置、存储、多任务等功能的增加。
    绘画 canvas；
    用于媒介播放的 video audio；
    本地离线存储 localStorage：长期存储数据，浏览器关闭后数据不丢失；
    sessionStorage 的数据在浏览器关闭后自动删除；
    语义化更好的内容元素，比如 article、footer、header、nav、section;
    表单控件：calendar、date、time、email、url、search;
    新的技术 webWorker, webSocket,Geolocation;
    
- 移除的元素：
    纯表现的元素：basefont，big，center，font, s，strike，tt，u;
    对可用性产生负面影响的元素：frame，frameset，noframes;
    
- 支持 HTML5 新标签:
    IE8/IE7/IE6 支持通过 document.createElement 方法产生的标签，可以利用这一特性让这些浏览器支持 HTML5 标签，浏览器支持新标签后，还需要添加标签的默认样式。
    当然也可以直接使用成熟的框架、比如 html5shim;
    <!--[if lt IE 9]>
  		<script> src="http://html5shim.googlecode.com/svn/trunk/html5.js"</script>
  	<![endif]-->
  	
- 如何区分 HTML5: DOCTYPE 声明、新增的结构元素、功能元素
```

#### 9. 简述一下你对 HTML 语义化的理解？

```
用正确的标签做正确的事情，html 语义化让页面的内容结构化，
优点：
	1. 结构更清晰，便于对浏览器、搜索引擎解析，搜索引擎的爬虫也依赖于 HTML 标记来确定上下文和各个关键字的权重，利于 SEO；
	2. 便于盲人浏览网页，即使在没有样式 CSS 情况下也以一种文档格式显示，并且是容易阅读的；
	3. 使阅读源代码的人对网站更容易将网站分块，便于阅读维护理解。
```

#### 10. HTML5的离线储存怎么使用，工作原理能不能解释一下？

```
所谓的离线存储就是将一些资源文件保存在本地，这样后续的页面加载将使用本地的资源文件，在
离线的情况下可以继续访问web应用。

原理：HTML5 的离线存储是基于一个新建的.appcache 文件的缓存机制（不是存储技术），通过这个文
件上的解析清单离线存储资源，这些资源就会像cookie一样被存储了下来。
```

#### 11. 浏览器是怎么对HTML5的离线储存资源进行管理和加载的呢？

```
（1）html5是使用一个manifest文件来标明那些文件是需要被存储，对于manifest文件，文件的
mime-type必须是text/cache-manifest类型。
（2）cache manifest下直接写需要缓存的文件，这里指明文件被缓存到浏览器本地；在network下指明
的文件，强制必须通过网络资源获取的；在failback下指明是一种失败的回调方案，比如无法访问，就
发出404.htm请求。
```

#### 12. 请描述一下 cookies，sessionStorage 和 localStorage 的区别？

```
共同点：都是保存在浏览器端，且是同源的。
区别：
	1. cookie 数据始终在同源的 http 请求中携带（即使不需要），即会在浏览器和服务器间来回传递。
sessionStorage 和 localStorage 不会自动把数据发送给服务器，仅在本地保存（浏览器端）。
	cookie 是网站为了标识用户身份而存储在用户本地终端（Client Side）上的数据（通常经过加密）。
	
	2. 存储大小：
        cookie 数据大小不能超过 4K.
        sessionStorage 和 localStorage 也有存储大小的限制，但是比 cookie 大得多，可以达到 5M 或者更大
有效时间：

	3. 数据有效期
	localStorge 	存储持久数据，在本地中存储，浏览器关闭后数据不会丢失除非主动删除数据；
	sessionStorge 	在内存中存储，是一种会话技术，数据在当前浏览器窗口关闭后自动删除；
	cookie 		    设置的 cookie 过期时间之前一直有效，即使窗口或浏览器关闭，过期自动销毁；
	
	4. 作用域不同。cookie在所有的同源窗口都是共享；不同浏览器无法共享`localStorage`或`sessionStorage`中的信息。- localStorage 在所有同源窗口都是共享的。- sessionStorage 在不同页面或标签页间无法共享。

路径：Cookie 有路径限制，Storage 只存储在域名下
API：Cookie 没有特定的 API，Storage 有对应的 API
sessionStorage 和 localStorage 操作方法：setItem、getItem 以及 removeItem。
```

#### 13. cookies 和 session 的区别？

```
cookies：存储于浏览器端的数据。可以设置 cookies 的到期时间，如果不设置时间，则在浏览器关闭窗口的时候会消失。浏览器根据是否设置cookie的过期时间判断该cookie是会话cookie还是永久cookie，并将cookie存储在不同的位置（内存或本地）。
session：存储于服务器端的数据。session 存储特定用户会话所需的属性和配置信息。
```

#### 14. iframe 有哪些缺点？

```
作用：iframe来链接其他页面，会创建包含另外一个文档的内联框架，可以实现在本页面上显示其他页面内容的功能。
缺点：
- iframe 会阻塞主页面的 onload 事件；
- 搜索引擎的检索程序无法解读这种页面，不利于 SEO；
- iframe 和主页面共享连接池，而浏览器对相同的域的连接有限制，所以会影响页面的并行加载

使用 iframe 之前需要考虑这两个缺点，如果需要使用 iframe，最好是通过 javascript 动态给 iframe 添加 src 属性值，这样可以绕开以上两个问题。
```

#### 15. Label 的作用是什么？ 是怎么用的？

```
label 标签来定义表单控制间的关系，当用户选择该标签时，浏览器会自动将焦点转到和标签关联的表单控件上。
label 中有两个属性是非常有用的,一个是for、另外一个就是 accesskey 了。
for：表示label标签要绑定的HTML元素，你点击这个标签的时候，所绑定的元素将获取焦点。
accesskey：表示访问label标签所绑定的元素的热键，当您按下热键，所绑定的元素将获取焦点。

    <label for="Name">Number:</label>
    <input type=“text“name="Name" id="Name"/>
    
    <label>Date:<input type="text" name="B"/></label>
```

#### 16. HTML5的form如何关闭自动完成功能？

```
	HTML的输入框可以拥有自动完成的功能，当你往输入框输入内容的时候，浏览器会从你以前的同名
输入框的历史记录中查找出类似的内容并列在输入框下面，这样就不用全部输入进去了，直接选择列表
中的项目就可以了。
	但有时候我们希望关闭输入框的自动完成功能，例如当用户输入内容的时候，我们希望使用AJAX技术从
数据库搜索并列举而不是在用户的历史记录中搜索。

方法：1、在IE的internet选项菜单中里的内容--自动完成里面设置
	 2、设置form的autocomplete为on或者off来来开启输入框的自动完成功能。
	 3、设置输入框的autocomplete为on或者off来开启或者关闭输入框自动完成的功能。
```

#### 17. 如何实现浏览器内多个标签页之间的通信? (阿里)

```
webSocket、sharedWorker;
也可以调用 localStorage、cookies 等本地存储方式；

localStorge 另一个浏览上下文里被添加、修改或删除时，它都会触发一个事件，我们通过监听事件，控制它的值来进行页面信息通信；
```

#### 18. webSocket如何兼容低浏览器？(阿里)

```
Adobe Flash Socket 、
ActiveX HTMLFile (IE) 、
基于 multipart 编码发送 XHR 、
基于长轮询的 XHR
```

#### 19. 页面可见性（Page Visibility API） 可以有哪些用途？

```
通过 visibilityState 的值检测页面当前是否可见，以及打开网页的时间等;
在页面被切换到其他后台进程的时候，自动暂停音乐或视频的播放；
```

#### 20. 如何在页面上实现一个圆形的可点击区域？

```
1、map+area或者svg
2、border-radius
3、纯js实现 需要求一个点在不在圆上简单算法、获取鼠标坐标等等
```

#### 21. 实现不使用 border 画出1px高的线，在不同浏览器的标准模式与怪异模式下都能保持一致的效果。

```
  <div style="height:1px;overflow:hidden;background:red"></div>
```

#### 22. 网页验证码是干嘛的，是为了解决什么安全问题?

```
区分用户是计算机还是人的公共全自动程序。可以防止恶意破解密码、刷票、论坛灌水；
有效防止黑客对某一个特定注册用户用特定程序暴力破解方式进行不断的登陆尝试。
```

#### 23. title 与 h1 的区别、b 与 strong 的区别、i 与 em 的区别？

```
title 属性没有明确意义表示只是个标题，h1 则表示层次明确的标题，对页面信息的抓取也会有很大的影响；
strong 是标明重点内容，有语气加强的含义，使用阅读设备阅读网络时：<strong> 会重读，而 <b> 是展示强调内容。
i 内容展示为斜体，em 表示强调的文本；

Physical Style Elements -- 自然样式标签
    b, i, u, s, pre
Semantic Style Elements -- 语义样式标签
    strong, em, ins, del, code
应该准确使用语义样式标签，但是不能滥用，如果不确定时首选自然样式标签。
```



渐进增强 优雅降级