/** @jsx React.DOM */

"use strict";

var React = require('react');
var zzy = require('./engine');

module.exports = React.createClass({
  getInitialState: function() {
    return { tasks: [] };
  },
  componentWillMount: function() {
    zzy.subscribe('tasks', function(tasks) {
      this.setState({tasks: tasks || []});
    }.bind(this));
  },
  render: function() {
    var list = this.state.tasks.toArray().map(function(task) {
      return <li className="list-group-item">{task.description}</li>;
    })
    return <div>
      <h2>Tasks</h2>
      <ul className="list-group">{list}</ul>
    </div>;
  }
});
