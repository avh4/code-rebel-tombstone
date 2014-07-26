"use strict";

var m = require('mithril');
var dao = require('./dao');

module.exports = {
  controller: function(projectSnap, taskSnap) {
    this.task = taskSnap.val();
    this.completeItem = function(b) {
      dao.getTaskRef(projectSnap.name(), taskSnap.name()).doComplete(b);
    }.bind(this);
  },
  view: function(ctrl) {
    var task = ctrl.task;
    var taskRef = ctrl.taskRef;
    return m('li.list-group-item', [
      m('input[type=checkbox]', {
        checked: task.completed,
        onchange: m.withAttr('checked', ctrl.completeItem)
      }),
      ' ', task.description
    ]);
  }
}
