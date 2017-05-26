## 效果例子

> 阮一峰的ES6：http://es6.ruanyifeng.com/?search=s&x=13&y=3

## html + css

```html
  <style type="text/css">
    #loading-progress{
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background-color: #0A74DA;
        z-index: 100;
    }
  </style>
  <div id="loading-progress"></div>
```

## jquery监听滚动事件

```javascript

  $(document).ready(function() {
    // 监听内容的滚动事件
    $("#content").scroll(function() {
      var progress =
        $(this).context.scrollTop / ($(this).context.scrollHeight - $(this).context.offsetHeight);
      if (progress >= 1) {
        progress = 1;
      }
      var width = document.body.clientWidth * progress;
      console.log(width);
      // 设置 加载条 的宽度
      $("#loading-progress").width(width);
    });
  });
```
