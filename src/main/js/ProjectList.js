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
    var projects = this.state.projects.map(function(project) {
      var list = project.tasks.map(function(task) {
        return <li className="list-group-item">{task.description}</li>;
      });
      return <div>
        <h2>{project.title}</h2>
        <ul className="list-group">{list}</ul>
      </div>;
    });
    return <div>{projects}</div>;
  }
});
