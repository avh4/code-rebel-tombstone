var processJobs = require('./processJobs');
var Firebase = require('firebase');

var pocket = require('./jobs/pocket');

processJobs(new Firebase('https://rebel-tombstone-dev.firebaseio.com/integrations/pocket'), pocket);
