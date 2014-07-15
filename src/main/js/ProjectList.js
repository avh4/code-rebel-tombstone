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
  render: function() {
    var projects = [];
    if (!this.state.projectsSnap) return <div/>;
    this.state.projectsSnap.forEach(function(p) {
      var list = [];
      p.child('tasks').forEach(function(t) {
        var task = t.val();
        list.push(<li className="list-group-item">{task.description}</li>);
      });
      projects.push(<div>
        <h2>{p.val().title}</h2>
        <ul className="list-group">{list}</ul>
      </div>)
    });
    return <div>{projects}</div>;
  }
});
