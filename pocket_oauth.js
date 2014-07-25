var q = require('q');
var callbackDefer = q.defer();
var pocket = require('./src/main/js/server/jobs/pocket/service');
var app = require('express')();
var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});

app.get('/', function() {
  callbackDefer.resolve();
});

var redirect_uri = 'http://localhost:3000';

var request_token;
pocket.auth(redirect_uri, function(auth_url) {
  console.log(auth_url);
  return callbackDefer.promise;
}).then(function(auth_response) {
  console.log(auth_response);
}).done();
