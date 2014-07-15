/** @jsx React.DOM */

"use strict";

var React = require('react');

module.exports = React.createClass({
  doCheckItem: function(prev) {
    this.props.taskRef.child('completed').set(!prev);
  },
  render: function() {
    var task = this.props.task;
    return <li className="list-group-item">
      <input type="checkbox" checked={task.completed} onChange={this.doCheckItem.bind(null, task.completed)}/> {task.description}
    </li>;
  }
});
