/** @jsx React.DOM */

"use strict";

var React = require('react');
var ReactFireMixin = require('reactfire');
var TaskList = require('./TaskList');

module.exports = React.createClass({
  getInitialState: function() {
    return { screen: 'tasks' };
  },
  doSwitchToProjects: function() {
    this.setState({ screen: 'projects' });
  },
  doSwitchToTasks: function() {
    this.setState({ screen: 'tasks'});
  },
  render: function() {
    return <div>
      <ul className="nav nav-tabs" role="tablist">
        <li className={this.state.screen === 'tasks' ? 'active' : null}><a href="#" onClick={this.doSwitchToTasks}>Tasks</a></li>
        <li className={this.state.screen === 'projects' ? 'active' : null}><a href="#" onClick={this.doSwitchToProjects}>Projects</a></li>
      </ul>
      { this.state.screen === 'tasks' ? <TaskList/> : null}
    </div>;
  }
});
