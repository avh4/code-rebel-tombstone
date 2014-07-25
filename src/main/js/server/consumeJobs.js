var Firebase = require('firebase');
var moment = require('moment');

function processJobs(firebaseRef, fn) {
  firebaseRef.startAt().limit(1).on('value', function(snap) {
    snap.forEach(function(jobSnap) {
      var job = jobSnap.val();
      if (job.working) return;
      var jobRef = firebaseRef.child(jobSnap.name());
      jobRef.child('working').set({ hostname: 'selene', start: new Date().toISOString() },  function(error) {
        if (error) throw error;
        fn(job).then(function(state) {
          jobRef.remove();
        }).done();
      });
    });
  });
}

module.exports = processJobs;