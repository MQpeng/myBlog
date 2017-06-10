## html5的drag和drop

- drag和drop基本介绍

> - drag：控件一开始拖的时候进行响应
> - drop：拖拽中的控件放下的时候进行响应
> - 具体可参考：http://www.w3school.com.cn/html5/html_5_draganddrop.asp

- html5实现拖拽响应

> 拖拽上传，我们拖拽的文件，并不需要它在拖拽前响应事件，只需要在拖拽后响应异步上传的事件，也就是实现drop方法，并在drop方法中将文件POST出去

```HTML
  <div class='dropzone'>You can drop markdown file anywhere to upload </div>

  <script type="text/javascript">
    /* 给控件绑定drop事件 */
    $('#dropzone').on('drop', function(event) {
      /* 获取文件 */
      var file = event.originalEvent.dataTransfer.files[0];
      /* 采用FormData接口 相关信息：自行查询*/
      var formData = new FormData();
      formData.append('file', file);

      $.ajax('/upload', {
        method: 'POST',
        contentType: false,
        processData: false,
        data: formData,
        error: function(xhr, error) {
          console.log('upload failed');
        },
        success: function(response) {
          console.log('upload success');
        }
      });

      return false;
    })；
  </script>
```

## express路由

- 构建响应POST方法的路由

```javascript
  var express = require('express');
  var multipart = require('connect-multiparty');
  var multipartMiddleware = multipart({
    uploadDir: "./upload_tmp"
  });
  /* express 4.0后req.files不是默认参数，需要添加 connect-multiparty等 ， 具体可看官网：http://www.expressjs.com.cn/4x/api.html#req*/
  var router = express.Router();

  /* 该router响应的是 '/' 页面所有的POST，应对应上面html展示的页面，才会响应 ajax 中的upload  */
  router.post('/', multipartMiddleware, function(req, res) {
    var file = req.files.file;
    var fileName = file.originalFilename;
    var fileTmpPath = file.path;
    if (file.ws.closed == true) {
      try {
        var newPath = path.join(mdPath, fileName);
        fs.renameSync(fileTmpPath, newPath);
      } catch (err) {
        res.status(err.status || 500);
        res.render('error', {
          message: err.message || "server error",
          error: err
        });
      }
      res.send(newPath);
    }
  });
```
