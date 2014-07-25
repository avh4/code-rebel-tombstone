var processJobs = require('./processJobs');
var consumeJobs = require('./consumeJobs');
var Firebase = require('firebase');

var pocket = require('./jobs/pocket');

processJobs(new Firebase('https://rebel-tombstone-dev.firebaseio.com/integrations/pocket'), pocket);

consumeJobs(new Firebase('https://rebel-tombstone-dev.firebaseio.com/jobs/completions/pocket'), require('./jobs/pocket/completions'));