var express = require('express');
var router = express.Router();
var Global = require('./global');
var Parse = Global.Parse;
var books = Parse.Object.extend("Books");
var queryBooks = new Parse.Query(books);
queryBooks.find().then((results,error)=>{
  if(error){
    console.log("获取book失败",error);
    return
  }
  var BooksData = []
  let temp = [];
  for(let i =0;i<results.length;i++){
    temp.push(results[i].toJSON())
    if(i === 0)
      continue;
    if(i%2 !== 0){
      BooksData.push(temp)
      temp = []
    }
  }
  // console.log("TEST",BooksData);
  router.get('/', function(req, res, next) {
    res.render('books',{datas:BooksData})
  });
})

module.exports = router;
