/** @jsx React.DOM */

"use strict";

var React = require('react');
var ReactFireMixin = require('reactfire');

module.exports = React.createClass({
  mixins: [ReactFireMixin],
  getInitialState: function() {
    return { projects: [] };
  },
  componentWillMount: function() {
    this.bindAsArray(new Firebase('https://rebel-tombstone-dev.firebaseio.com/projects'), 'projects');
  },
  doCheckItem: function(projectSnap, taskSnap, prev) {
    this.firebaseRefs.projects.child(projectSnap.name()).child('tasks').child(taskSnap.name()).child('completed').set(!prev);
  },
  render: function() {
    var list = [];
    if (this.state.projectsSnap) {
      this.state.projectsSnap.forEach(function(p) {
        p.child('tasks').forEach(function(t) {
          var task = t.val();
          list.push(<li className="list-group-item">
          <input type="checkbox" checked={task.completed} onChange={this.doCheckItem.bind(null, p, t, task.completed)}/> {task.description}</li>);
        }.bind(this));
      }.bind(this));
    }
    return <ul className="list-group">{list}</ul>;
  }
});
