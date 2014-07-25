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
  },
  doMakeTaskFromInboxItem: function(inboxItemSnap, projectOrName) {
    var projectsRef = new Firebase('https://rebel-tombstone-dev.firebaseio.com/projects');
    var inboxRef = new Firebase('https://rebel-tombstone-dev.firebaseio.com/inbox');
    var item = inboxItemSnap.val();
    var projectRef;
    if (typeof projectOrName === 'string') {
      projectRef = projectsRef.push();
      projectRef.set({title: projectOrName});
    } else {
      projectRef = projectsRef.child(projectOrName.id);
    }
    var newTask = projectRef.child('tasks').push();
    newTask.set(item, function(error) {
      if (error) alert(error);
      else {
        inboxRef.child(inboxItemSnap.name()).remove();
      }
    });
  },
  getTaskRef: function(projectId, taskId) {
    var completionsRef = new Firebase('https://rebel-tombstone-dev.firebaseio.com/jobs/completions');
    var projectsRef = new Firebase('https://rebel-tombstone-dev.firebaseio.com/projects');
    return {
      doComplete: function(b) {
        var taskRef = projectsRef.child(projectId).child('tasks').child(taskId);
        taskRef.child('completed').set(b, function() {
          taskRef.once('value', function(taskSnap) {
            var pocketId = taskSnap.child('pocket__item_id').val();
            if (pocketId) {
              completionsRef.child('pocket').child('pocket:' + pocketId).set(taskSnap.val());
            }
          });
        });
      }
    };
  }
};

module.exports = dao;
