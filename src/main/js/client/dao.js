var dao = {
  bindProjects: function(fn) {
    var projectsRef = new Firebase('https://rebel-tombstone-dev.firebaseio.com/projects');
    projectsRef.on('value', function(projectsSnap) {
      fn(projectsSnap);
    });
  },
  bindInboxCount: function(fn) {
    var inboxRef = new Firebase('https://rebel-tombstone-dev.firebaseio.com/inbox');
    inboxRef.on('value', function(inboxSnap) {
      fn(inboxSnap.numChildren());
    });
  },
  bindNextInboxItem: function(fn) {
    var inboxRef = new Firebase('https://rebel-tombstone-dev.firebaseio.com/inbox');
    inboxRef.startAt().limit(1).on('value', function(inboxSnap) {
      inboxSnap.forEach(function(inboxItemSnap) {
        fn(inboxItemSnap);
      });
    });
  }
};

module.exports = dao;
