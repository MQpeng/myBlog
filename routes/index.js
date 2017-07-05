var express = require('express');
var fs = require("fs");
var Global = require('./global');
var Parse = Global.Parse;
var iconv = require('iconv-lite');
var router = express.Router();

var htmlPath = 'markdownHTML';
var Article = Parse.Object.extend("Articles");

// 递归解决异步无法渲染的问题
var query = new Parse.Query(Article);
var articles = [];
query.addDescending("createdAt").find().then((data) => {
  // console.log("data", data)
  data.forEach(article => {
    articles.push(article.toJSON())
  })
  // console.log('articles', articles)
  return router.get('/', function(req, res, next) {
    var query = new Parse.Query(Article);
    query.addDescending("createdAt").find().then((data) => {
      if (articles.length != data.length) {
        articles = [];
        data.forEach(article => {
          articles.push(article.toJSON())
        });
      }
    });
    res.render('index', {
      articles: articles
    })
  })
})
/* GET home page. */


router.get('/test/:file', function(req, res, next) {

  var newPath = htmlPath + '/' + req.param('file');
  var html = fs.readFileSync(newPath, "utf-8");
  // console.log(html);
  res.render('index', {
    mdContent: html,
    detail: true
  })
});


module.exports = router;
