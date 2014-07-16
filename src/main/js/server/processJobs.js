var Firebase = require('firebase');
var moment = require('moment');

function processJobs(firebaseRef, fn) {
  var updateWindowLength = moment.duration(5, 'minutes');
  firebaseRef.startAt().limit(1).on('value', function(snap) {
    var updateWindow = moment().subtract(updateWindowLength);
    snap.forEach(function(jobSnap) {
      var job = jobSnap.val();
      if (job.working) return;
      if (job.lastUpdate && moment(job.lastUpdate).isAfter(updateWindow)) return; // TODO poll again after the time expires
      var jobRef = firebaseRef.child(jobSnap.name());
      jobRef.child('working').set({ hostname: 'selene', start: new Date().toISOString() },  function(error) {
        if (error) throw error;
        fn(job).then(function(state) {
          jobRef.update({working: null, lastUpdate: new Date().toISOString(), state: state});
          // TODO set priority from lastUpdate
        }).done();
      });
    });
  });
}

module.exports = processJobs;