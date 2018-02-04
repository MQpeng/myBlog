var express = require('express');
var fs = require("fs");
var Global = require('./global');
var Parse = Global.Parse;
var iconv = require('iconv-lite');
var router = express.Router();


var Teacher = Parse.Object.extend("ShangHai");

var professor = [];
var teachers = [];
var queryTeacher = new Parse.Query(Teacher);
queryTeacher.descending("createdAt").descending("teacherJob").limit(500).find().then((data) => {
  data.forEach(value => {
    if(value.get('tag')){
      professor.push(value.toJSON())
    }else{
      teachers.push(value.toJSON())
    }
  })
}).then(data => {
  // var test = [1,2,3,4,5,6]
  console.log("完成初始化",teachers.length+'/'+professor.length)
  router.get('/teachers', function(req, res, next) {
    res.render('shanghai', {datas:teachers})
  });
  router.get('/', function(req, res, next) {
    res.render('shanghai', {datas:professor})
  });
})

module.exports = router;
