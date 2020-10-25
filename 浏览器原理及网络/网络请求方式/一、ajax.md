## 原生 Ajax 的用法

这里主要分析 `XMLHttpRequest` 对象，下面是它的一段基础使用：

```js
var xhr = new XMLHttpRequest();
// true 表示异步，默认值
xhr.open('get', 'xxxxx.com',true);
xhr.onreadystatechange = function(){
    if(xhr.readyState === 4) {
        // 200 - 成功，304 - 查找本地缓存
        if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
            console.log(xhr.responseText);
        }
    }
}
xhr.send();
```

post:

```js
var xhr = new XMLHttpRequest();
// true 表示异步，默认值
xhr.open('get', 'xxxxx.com',true);
// 处理请求参数
postData = {"name1":"value1","name2":"value2"};
postData = (function(value){
    var dataString = "";
    for(var key in value){
         dataString += key+"="+value[key]+"&";
    };
    return dataString;
}(postData));
xhr.onreadystatechange = function(){
    if(xhr.readyState === 4) {
        // 200 - 成功，304 - 查找本地缓存
        if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
            console.log(xhr.responseText);
        }
    }
}
// 使用 Post 提交数据，必须设置请求体
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
// 异常处理
xhr.onerror = function() {
   console.log('Network request failed')
}
// 跨域携带cookie
xhr.withCredentials = true;
// 发送请求
xhr.send(postData);
```

