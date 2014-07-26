"use strict";

var m = require('mithril');
var TaskList = require('./TaskList');
var ProjectList = require('./ProjectList');
var Inbox = require('./Inbox');

module.exports = {
  controller: function() {
    this.screen = m.prop('tasks');
    this.TaskList = new TaskList.controller();
    this.ProjectList = new ProjectList.controller();
    this.Inbox = new Inbox.controller();
    this.switchToTasks = function() {
      this.screen('tasks');
    }.bind(this);
    this.switchToProjects = function() {
      this.screen('projects');
    }.bind(this);
    this.switchToInbox = function() {
      this.screen('inbox');
    }.bind(this);
  },
  view: function(ctrl) {
    var screen = ctrl.screen();
    var is = {
      tasks: screen === 'tasks',
      projects: screen === 'projects',
      inbox: screen === 'inbox'
    };
    var tab;
    if (is.tasks) {
      tab = TaskList.view(ctrl.TaskList);
    } else if (is.projects) {
      tab = ProjectList.view(ctrl.ProjectList);
    } else if (is.inbox) {
      tab = Inbox.view(ctrl.Inbox);
    }
    return m('div', [
      m('ul.nav.nav-tabs', { role: 'tablist'}, [
        m(is.tasks ? 'li.active' : 'li', m('a', { href: '#', onclick: ctrl.switchToTasks }, 'Tasks')),
        m(is.projects ? 'li.active' : 'li', m('a', { onclick: ctrl.switchToProjects }, 'Projects')),
        m(is.inbox ? 'li.active' : 'li', m('a', {onclick: ctrl.switchToInbox }, 'Inbox'))
      ]), tab]);
  }
}
