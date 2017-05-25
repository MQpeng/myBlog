var express = require('express');
var fs = require("fs");
var marked = require('marked');

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: true,
  sanitize: true,
  smartLists: true,
  smartypants: true
});

var router = express.Router();

var path = 'markdown';
var search = [];
var files = [];
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(path);
  var dirs = fs.readdirSync(path);

  for (let i = 0; i < dirs.length; i++) {
    let dir = {};
    let searchDir = {
      files: []
    };
    dir.name = dirs[i];
    dir.id = i;
    searchDir.name = dirs[i];
    var temps = fs.readdirSync(path + '/' + dirs[i]);
    var arrays = [];
    for (let j = 0; j < temps.length; j++) {
      let temp = {};
      temp.name = temps[j];
      temp.id = j;
      arrays[j] = temp;
      searchDir.files[j] = temps[j];
    }
    dir.files = arrays;
    files[i] = dir;
    search[i] = searchDir;
  }

  // console.log(search);

  var mdFile = fs.readFileSync(path + '/' + search[0].name + '/' + search[0].files[0], "utf-8");
  var html = marked(mdFile);
  res.render('index', {
    files: files,
    mdContent: html
  });

});

router.get('/test', function(req, res, next) {
  var dirId = req.query.id;
  var fileId = req.query.fileId;
  var newPath = path + '/' + search[dirId].name + '/' + search[dirId].files[fileId];
  console.log(newPath);
  var mdFile = fs.readFileSync(newPath, "utf-8");
  var html = marked(mdFile);
  console.log(html);
  res.render('index', {
    files: files,
    mdContent: html
  })
});

module.exports = router;
