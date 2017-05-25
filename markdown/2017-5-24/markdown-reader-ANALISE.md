## markdown-reader

- 项目名称：markdown-reader
- 项目功能：拖拽上传markdown文件，自动转换成html
- 项目地址：https://github.com/hjzheng/markdown-reader
- 分析时间：2017/5/24

## 依赖的库

+ marked

  - 将markdown文件转换成html

+ codemirror

  - 代码编辑框样式，很友好的代码页面编辑
  - 引入codemirror相关css和js既可以使用
  - 设置textarea的id为editor,即可得到codemirror的效果

## 功能实现

- 拖拽上传

> 采用了html5的drag和drop
> 1. 响应控件的drop方法：通过event.originalEvent.dataTransfer.files[0]获取所拖拽的文件
> 2. 创建FormData对象，并实现ajax的POST请求
> 3. express的路由响应ajax的POST请求，并在上传成功后返回文件的地址：res.send(newPath);
> 4. 客户端响应success方法，并得到传来的newPath,实现相关功能

## 精彩部分

- settings.properties

> 文件包含界面的一些设置参数，可以通过properties-parser进行修改。
> 值的类型很简单：变量=值

- connect-multiparty

> node的后台上传模块
> 在expres 4.0 中，req.files不再是默认参数，需要使用multipart-handing中间件，才能使用req.files
