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
    var projects = [];
    if (!this.state.projectsSnap) return <div/>;
    this.state.projectsSnap.forEach(function(p) {
      var list = [];
      p.child('tasks').forEach(function(t) {
        var taskRef = dao.getTaskRef(p.name(), t.name());
        list.push(<TaskListItem key={t.name()} task={t.val()} taskRef={taskRef}/>);
      });
      projects.push(<div key={p.name()}>
        <h2>{p.val().title}</h2>
        <ul className="list-group">{list}</ul>
      </div>)
    });
    return <div>{projects}</div>;
  }
});
