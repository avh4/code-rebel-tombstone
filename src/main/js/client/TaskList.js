/** @jsx React.DOM */

"use strict";

var React = require('react');
var dao = require('./dao');
var TaskListItem = require('./TaskListItem');

module.exports = React.createClass({
  getInitialState: function() {
    return { projects: [] };
  },
  componentWillMount: function() {
    dao.bindProjects(function(projects) {
      this.setState({ projectsSnap: projects});
    }.bind(this));
  },
  render: function() {
    var list = [];
    if (this.state.projectsSnap) {
      this.state.projectsSnap.forEach(function(p) {
        p.child('tasks').forEach(function(t) {
          var taskRef = dao.getTaskRef(p.name(), t.name());
          list.push(<TaskListItem key={p.name() + '.' + t.name()} task={t.val()} taskRef={taskRef}/>);
        }.bind(this));
      }.bind(this));
    }
    return <ul className="list-group">{list}</ul>;
  }
});
