var q = require('q');

function dao(ref) {
  this.ref = ref;
  this.projectsRef = ref.child('projects');
  this.inboxRef = ref.child('inbox');
  this.completionsRef = this.ref.child('jobs').child('completions');

  var configRef = ref.child('integrations/pocket/aaa');

  this.pocket = {
    getConfig: function() {
      var p = q.defer();
      configRef.once('value', function(config) {
        p.resolve(config.val());
      });
      return p.promise;
    }
  }
}

dao.prototype.bindProjects = function(fn) {
  this.projectsRef.on('value', function(projectsSnap) {
    fn(projectsSnap);
  });
};

dao.prototype.bindInboxCount = function(fn) {
  this.inboxRef.on('value', function(inboxSnap) {
    fn(inboxSnap.numChildren());
  });
};

dao.prototype.bindNextInboxItem = function(fn) {
  this.inboxRef.startAt().limit(1).on('value', function(inboxSnap) {
    inboxSnap.forEach(function(inboxItemSnap) {
      fn(inboxItemSnap);
    });
  });
};

dao.prototype.doMakeTaskFromInboxItem = function(inboxItemSnap, projectOrName) {
  var item = inboxItemSnap.val();
  var projectRef;
  if (typeof projectOrName === 'string') {
    projectRef = this.projectsRef.push();
    projectRef.set({title: projectOrName});
  } else {
    projectRef = this.projectsRef.child(projectOrName.id);
  }
  var newTask = projectRef.child('tasks').push();
  newTask.set(item, function(error) {
    if (error) alert(error);
    else {
      this.inboxRef.child(inboxItemSnap.name()).remove();
    }
  }.bind(this));
};

dao.prototype.getTaskRef = function(projectId, taskId) {
  var completionsRef = this.completionsRef;
  return {
    doComplete: function(b) {
      var taskRef = this.projectsRef.child(projectId).child('tasks').child(taskId);
      taskRef.child('completed').set(b, function() {
        taskRef.once('value', function(taskSnap) {
          var pocketId = taskSnap.child('pocket__item_id').val();
          if (pocketId) {
            completionsRef.child('pocket').child('pocket:' + pocketId).set(taskSnap.val());
          }
        });
      });
    }.bind(this)
  };
};

dao.prototype.doCompleteInbox = function(inboxSnap) {
  var pocketId = inboxSnap.child('pocket__item_id').val();
  if (pocketId) {
    var val = inboxSnap.val();
    val.completed = true;
    this.completionsRef.child('pocket').child('pocket:' + pocketId).set(val);
  }
  inboxSnap.ref().remove();
};

module.exports = dao;
