# 解决express异步获取数据后渲染页面

> 自己在编写express项目时，当异步从数据库获取数据时，遇到异步相关的问题
> 1. res.render()无法在异步中执行，页面会出现server超时
> 2. 难以监听promise的结束
> 3. 将异步转换成同步太过复杂

## 问题代码

> 我自己采用的时Parse + mongodb

- 问题1：导致res.render()传入的值为空

```js
router.get('/', function(req, res, next) {
  var articles;
  // parse查询开始
  var query = new Parse.Query(Article);
  query.find().then((data) => {
    articles = data.toJSON();
  })
  // parse查询结束
  res.render('index',{articles:articles})
});
```

上面这段代码会一直导致传入index模板的articles为空值，因为query.find()时异步操作，而res.render()会先执行，因此会出现articles为undefined的现象

- 问题2：res.render()无法异步执行

```js
router.get('/', function(req, res, next) {
  var articles;
  // parse查询开始
  var query = new Parse.Query(Article);
  query.find().then((data) => {
    articles = data.toJSON();
    res.render('index',{articles:articles})
  })
  // parse查询结束
});
```

上面代码会出现“页面连接超时”，也就是"SERVER ERROR"的错误，因为query.find()为异步执行，该语句后router.get()没有找到res.render(),因此会出现“服务错误”的问题

## 解决方法

> 参考博客：http://www.jianshu.com/p/43fc67a0e526

> 在此十分感谢博客主

采用递归调用方法取出异步效果

> 参考代码

```js
var query = new Parse.Query(Article);
query.find().then((data) => {
  // console.log("data", data)
  var articles = [];
  data.forEach(article => {
    articles.push(article.toJSON())
  })
  // console.log('articles', articles)
  return router.get('/', function(req, res, next) {
    res.render('index', {
      articles: articles
    })
  })
})
```

说明：直接把router.get()放在异步过程中，这种情况下，在express响应到get('/')前，一定时完成了数据获取工作的。
