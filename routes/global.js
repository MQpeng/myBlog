var Parse = require('parse/node');
var Promise = require('bluebird');
var Articles = [];
Parse.initialize("freedomshaoId");
// Parse.serverURL = 'http://localhost:2337/parse';
Parse.serverURL = 'http://182.254.141.159:2337/parse';

exports.Parse = Parse
exports.Articles = Articles
exports.pushArticles = function pushArticles(data){
  Articles.push(data);
}
exports.unshiftArticles = function unshiftArticles(data){
  Articles.unshift(data)
}

exports.getArticles = function getArticles(){
  var Article = Parse.Object.extend("Articles");
  var query = new Parse.Query(Article);
  return new Promise(function(resolve, reject) {
    query.addDescending("createdAt").find().then((data) => {
      for (variable of data) {
        Articles.push(variable.toJSON())
      }
      resolve(Articles)
    })
  })
}
