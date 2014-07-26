"use strict";

var m = require('mithril');
var Typeahead = require('./Typeahead');
var dao = require('./dao');

var ProcessCard = {
  controller: function() {
    this.next = m.prop();
    this.projectsSnap = m.prop([]);
    this.Typeahead = new Typeahead.controller();
    this.doSubmit = function() {
      var p = this.Typeahead.value();
      dao.doMakeTaskFromInboxItem(this.next(), p);
      this.Typeahead.clear();
      return false;
    }.bind(this);
    this.doDone = function() {
      dao.doCompleteInbox(this.next());
      return false;
    }.bind(this);
    dao.bindProjects(function(projects) {
      this.projectsSnap(projects);
      m.redraw();
    }.bind(this));
    dao.bindNextInboxItem(function(inboxItem) {
      this.next(inboxItem);
      m.redraw();
    }.bind(this));
  },
  view: function(ctrl) {
    if (!ctrl.next()) return m('div', '...');

    var projects = [];
    if (ctrl.projectsSnap()) {
      ctrl.projectsSnap().forEach(function(p) {
        projects.push({ title: p.val().title, id: p.name() });
      });
    }

    var next = ctrl.next().val();
    var title = next.description;
    if (next.href) {
      title = m('a', { href: next.href, target: '_new'}, next.description);
    }
    var icons = [];
    if (next.type === 'pocket') {
      icons.push(m('img', { src: 'pocket.png', width: '16'}));
    }

    return m('div.panel.panel-default', [
      m('div.panel-heading', m('h3.panel-title', [ icons, ' ', title])),
      m('div.panel-body', [
        m('p', next.notes),
        m('form', {onsubmit: ctrl.doSubmit}, [
          Typeahead.view(ctrl.Typeahead, 'Project', projects, 'title'),
          m('button.btn.btn-primary', 'Make Action'),
          m('button.btn.btn-default', {onclick: ctrl.doDone}, 'Done')
        ])
      ])
    ]);
  }
}

module.exports = {
  controller: function() {
    this.inboxCount = m.prop();
    this.ProcessCard = new ProcessCard.controller();
    dao.bindInboxCount(function(count) {
      this.inboxCount(count);
      m.redraw();
    }.bind(this));
  },
  view: function(ctrl) {
    var message = "It's clean!";
    if (ctrl.inboxCount() == null) return ProcessCard.view(ctrl.ProcessCard);
    if (ctrl.inboxCount() == 0) return m('div.jumbotron', m('h1', message));

    return m('div', [
      ProcessCard.view(ctrl.ProcessCard),
      m('p', [ctrl.inboxCount() - 1, ' more'])
    ]);
  }
}
