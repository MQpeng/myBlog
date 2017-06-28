var express = require('express');
var fs = require("fs");
var Parse = require('parse/node');
var iconv = require('iconv-lite');
var router = express.Router();

Parse.initialize("freedomshaoId");
Parse.serverURL = 'http://localhost:2337/parse';

var Teacher = Parse.Object.extend("Teacher");
var majorsOptions = Parse.Object.extend("majorsOptions");
var departmentOptions = Parse.Object.extend("departmentOptions");

var queryTeacher = new Parse.Query(Teacher);
var teachers = [];
var queryMajorsOptions = new Parse.Query(majorsOptions);
var majorsOptions = [];
var queryDepartmentOptions = new Parse.Query(departmentOptions);
var departmentOptions = [];
var waitePromise;

queryTeacher.addDescending("createdAt").limit(100).find().then((data) => {
  data.forEach(value => {
    teachers.push(value.toJSON())
  })
  return queryMajorsOptions.addDescending("createdAt").limit(200).find().then((data) => {
    data.forEach(value => {
      majorsOptions.push(value.toJSON())
    })
    return queryDepartmentOptions.addDescending("createdAt").limit(200).find().then((data) => {
      data.forEach(value => {
        departmentOptions.push(value.toJSON())
      })
    })
  })
}).then(data => {
  console.log("完成初始化")
  return router.get('/', function(req, res, next) {
    res.render('teachers', {
      teachers: teachers,
      majorsOptions: majorsOptions,
      departmentOptions: departmentOptions
    })
  });
})

router.post('/', function(req, res) {
  // console.log("req进来了", req.body)
  // console.log("req", req.body)
  console.log("req", req.body.major)
  console.log("req", req.body.depart)
  var major = req.body.major
  var depart = req.body.depart
  let queryTeacher = new Parse.Query(Teacher);
  if (major.length != 0) {
    console.log(major.indexOf("("))
    if (major.indexOf("(") != -1) {
      major = major.substring(0, major.indexOf("("))
    }
    console.log("major", major)
    queryTeacher.equalTo("englishMajor", convertToPinyin(major))
  } else if (depart.length != 0) {
    console.log("depart", depart)
    queryTeacher.equalTo("englishDepart", convertToPinyin(depart))
  } else {
    res.redirect("/huanan");
  }
  queryTeacher.addDescending("createdAt").limit(100).find().then((data) => {
    teachers = [];
    data.forEach(value => {
      teachers.push(value.toJSON())
    })
    // console.log("进来了1", teachers.length)
  }).then(data => {
    res.redirect("/huanan");
  })
})


function convertToPinyin(data) {
  console.log("文字：", data)
  var result = encodeURI(data)
  console.log("en", result)
  return result
}

module.exports = router;
