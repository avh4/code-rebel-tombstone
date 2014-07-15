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
  doCheckItem: function(task) {
    // task.completed = true;
  },
  render: function() {
    var list = [];
    if (this.state.projectsSnap) {
      this.state.projectsSnap.forEach(function(p) {
        p.child('tasks').forEach(function(t) {
          var task = t.val();
          list.push(<li className="list-group-item">
          <input type="checkbox" onChange={this.doCheckItem.bind(null, task)}/> {task.description}</li>);
        }.bind(this));
      }.bind(this));
    }
    return <ul className="list-group">{list}</ul>;
  }
});
