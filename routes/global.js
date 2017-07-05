var Parse = require('parse/node');
Parse.initialize("freedomshaoId");
Parse.serverURL = 'http://localhost:2337/parse';
exports.Parse = Parse
