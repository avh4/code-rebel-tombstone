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
    var list = [];
    this.state.projects.forEach(function(project) {
      project.tasks.forEach(function(task) {
        list.push(<li className="list-group-item">{task.description}</li>);
      });
    });
    return <ul className="list-group">{list}</ul>;
  }
});
