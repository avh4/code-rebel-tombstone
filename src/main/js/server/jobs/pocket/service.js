var q = require('q');
var Firebase = require('firebase');
var request = require('superagent');

var configRef = new Firebase('https://rebel-tombstone-dev.firebaseio.com/integrations/pocket/aaa');

function getConfig() {
  var p = q.defer();
  configRef.once('value', function(config) {
    p.resolve(config.val());
  });
  return p.promise;
}

var request_token = function(redirect_uri) {
  return getConfig().then(function(config) {
    var p = q.defer();
    request.post('https://getpocket.com/v3/oauth/request')
    .send({ consumer_key: config.consumer_key, redirect_uri: redirect_uri })
    .end(function(err, res) {
      if (err) p.reject(err);
      else {
        p.resolve(res.body);
      }
    });
    return p.promise;
  })
};

var auth_token = function(redirect_uri, request_token) {
  return getConfig().then(function(config) {
    var p = q.defer();
    request.post('https://getpocket.com/v3/oauth/authorize')
    .send({ consumer_key: config.consumer_key})
    .send({ code: request_token })
    .send({ redirect_uri: redirect_uri })
    .end(function(err, res) {
      p.resolve(res.body);
    });
    return p.promise;
  });
};

module.exports = {
  auth: function(redirect_uri, user_step) {
    var req_token;
    return request_token(redirect_uri).then(function(res) {
      req_token = res.code;
      return user_step('https://getpocket.com/auth/authorize?request_token=' + req_token + '&redirect_uri=' + redirect_uri);
    }).then(function() {
      return auth_token(redirect_uri, req_token);
    });
  },
  archive: function(item_id) {
    return getConfig().then(function(config) {
      var p = q.defer();
      var consumer_key = config.consumer_key;
      var access_token = config.access_token;
      var r = request.post('https://getpocket.com/v3/send')
      .send({consumer_key: consumer_key, access_token: access_token, actions: [
        { "action": "archive", "item_id": item_id }
        ]});
      r.end(function(err, res) {
        p.resolve();
      });
      return p.promise;
    });
  }
};