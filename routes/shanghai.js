var express = require('express');
var fs = require("fs");
var Global = require('./global');
var Parse = Global.Parse;
var iconv = require('iconv-lite');
var router = express.Router();


var Teacher = Parse.Object.extend("ShangHai");

var queryTeacher = new Parse.Query(Teacher);
var teachers = [];

queryTeacher.addDescending("createdAt").limit(100).find().then((data) => {
  data.forEach(value => {
    teachers.push(value.toJSON())
  })
}).then(data => {
  // var test = [1,2,3,4,5,6]
  console.log("完成初始化",teachers.length)
  return router.get('/', function(req, res, next) {
    res.render('shanghai', {teachers:teachers})
  });
})

module.exports = router;
