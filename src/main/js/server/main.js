var processJobs = require('./processJobs');
var consumeJobs = require('./consumeJobs');
var Firebase = require('firebase');

var pocket = require('./jobs/pocket');


var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Firebase secret: ", function(secret) {
  var FirebaseTokenGenerator = require("firebase-token-generator");
  var tokenGenerator = new FirebaseTokenGenerator(secret);
  var token = tokenGenerator.createToken({ host: require('os').hostname() });
  new Firebase('https://rebel-tombstone-dev.firebaseio.com').auth(token, function(err) {
    if (err) {
      console.log(err);
    } else {
      processJobs(new Firebase('https://rebel-tombstone-dev.firebaseio.com/integrations/pocket'), pocket);

      consumeJobs(new Firebase('https://rebel-tombstone-dev.firebaseio.com/jobs/completions/pocket'), require('./jobs/pocket/completions'));
    }
  });

  rl.close();
});
