var Global = require('./global');
var Parse = Global.Parse;
var express = require('express');
var fs = require("fs");
var marked = require('marked');
var multipart = require('connect-multiparty');
var router = express.Router();
var mdPath = 'markdown';
var htmlPath = 'markdownHTML';
var multipartMiddleware = multipart({
  uploadDir: "./tempDir"
});

var Article = Parse.Object.extend("Articles");

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});

router.get('/upload', function(req, res, next) {

  res.render('upload', {
    detail: false
  })
})

router.post('/upload', multipartMiddleware, function(req, res) {
  // console.log("req", req.body)
  var file = req.files.file;
  var fileName = file.originalFilename;
  var fileTmpPath = file.path;
  var newPath = mdPath + '/' + fileName;
  try {
    var newPath = mdPath + '/' + fileName
    fs.renameSync(fileTmpPath, newPath);
    fileName = fileName.substring(0, fileName.indexOf('.'));
    saveMarkdown(newPath, fileName, req.body);
    res.send(fileName);
  } catch (err) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message || "server error",
      error: err
    });
  }
})

function saveMarkdown(newPath, fileName, article) {
  // console.log("进来了", fileName)
  var mdFile = fs.readFileSync(newPath, "utf-8");
  var html = marked(mdFile);
  fs.writeFile(htmlPath + '/' + fileName + '.html', html, (err) => {
    if (err) throw err;
    console.log('The file has been saved to html!');
  })
  var object = new Article();
  for (var variable in article) {
    object.set(variable, article[variable])
  }
  object.set("html", fileName + ".html")
  object.save().then(data => {
    console.log("save success", data)
    Global.unshiftArticles(data.toJSON())
  }).catch(err => {
    console.log("Error save:", err)
  })
}

module.exports = router;
