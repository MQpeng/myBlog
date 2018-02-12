var express = require('express');
var fs = require("fs");
var Global = require('./global');
var Parse = Global.Parse;
var getArticles = Global.getArticles;
var Articles = Global.Articles;
var iconv = require('iconv-lite');
var router = express.Router();

var htmlPath = 'markdownHTML';

getArticles().then((data)=>{
  router.get('/', function(req, res, next) {
    console.log("articles",Articles.length)
    console.log("data",data.length)
    if(Articles.length !== data.length){
      res.render('index', {
        articles: Articles
      })
    }else{
      res.render('index', {
        articles: data
      })
    }
  })
})

// 递归解决异步无法渲染的问题

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

router.get('/lizery', function(req, res, next) {
  res.render('lizery',{hostPath:"http://mall.bj520.com"})
});


module.exports = router;
