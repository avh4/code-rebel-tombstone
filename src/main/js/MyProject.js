/** @jsx React.DOM */

"use strict";

var React = require('react');
var ReactFireMixin = require('reactfire');

module.exports = React.createClass({
  mixins: [ReactFireMixin],
  getInitialState: function() {
    return { tasks: [] };
  },
  componentWillMount: function() {
    this.bindAsArray(new Firebase('https://rebel-tombstone-dev.firebaseio.com/tasks'), 'tasks');
  },
  render: function() {
    var list = this.state.tasks.map(function(task) {
      return <li className="list-group-item">{task.description}</li>;
    })
    return <div>
      <h2>Tasks</h2>
      <ul className="list-group">{list}</ul>
    </div>;
  }
});
