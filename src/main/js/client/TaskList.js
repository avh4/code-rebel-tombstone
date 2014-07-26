"use strict";

var m = require('mithril');
var dao = require('./dao');
var TaskListItem = require('./TaskListItem');

module.exports = {
  controller: function() {
    this.projectsSnap = m.prop();
    dao.bindProjects(function(projects) {
      this.projectsSnap(projects);
      m.redraw();
    }.bind(this));
  },
  view: function(ctrl) {
    var list = [];
    if (ctrl.projectsSnap()) {
      ctrl.projectsSnap().forEach(function(p) {
        p.child('tasks').forEach(function(t) {
          var tctrl = new TaskListItem.controller(p, t);
          list.push(TaskListItem.view(tctrl));
        }.bind(this));
      }.bind(this));
    }
    return m('ul.list-group', list);
  }
}
