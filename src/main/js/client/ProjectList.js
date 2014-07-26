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
    var projects = [];
    if (!ctrl.projectsSnap()) return m('div');
    ctrl.projectsSnap().forEach(function(p) {
      var list = [];
      p.child('tasks').forEach(function(t) {
        var tctrl = new TaskListItem.controller(p, t);
        list.push(TaskListItem.view(tctrl));
      });
      projects.push(m('div', [
        m('h2', p.val().title),
        m('ul.list-group', list)
      ]));
    });
    return m('div', projects);
  }
}
