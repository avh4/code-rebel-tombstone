var q = require('q');
var request = require('superagent');
var Firebase = require('firebase');

function objFor(obj, fn) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      fn(key, obj[key]);
    }
  }
}

var getPocket = function(consumer_key, access_token, since) {
  var p = q.defer();
  var r = request.post('https://getpocket.com/v3/get')
  .send({consumer_key: consumer_key, access_token: access_token});
  if (since) {
    r = r.send({since: since});
  }
  
  r.end(function(err, res) {
    
    var inboxRef = new Firebase('https://rebel-tombstone-dev.firebaseio.com/inbox');
    
    // var todo = [];
    // var promises = [];
    objFor(res.body.list, function(id, item) {
      inboxRef.child('pocket:' + item.item_id).set({
        description: item.resolved_title || item.given_title || item.given_url,
        type: 'pocket',
        href: item.resolved_url || item.given_url,
        notes: item.excerpt
      }, function(error) {
        // if (error) p.reject(error);
        // else p.resolve();
      });
      
      
      // if (!item) console.log("XXX", id);
      // p = p.then(function() { return insert(item); });
      // todo.push(function() { return insert(item); });
      // promises.push(insert(item));
    });
    
    // return p;
    p.resolve({ since: res.body.since });
    // p.resolve(q.all(promises));
  });
  return p.promise;
}

module.exports = function(job) {
  return getPocket(job.consumer_key, job.access_token, job.state ? job.state.since : null);
};
