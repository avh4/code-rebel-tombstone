/** @jsx React.DOM */

"use strict";

var React = require('react');
var TaskList = require('./TaskList');
var ProjectList = require('./ProjectList');
var Inbox = require('./Inbox');

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
  doSwitchToInbox: function() {
    this.setState({ screen: 'inbox'});
  },
  render: function() {
    var tab;
    if (this.state.screen === 'tasks') {
      tab = <TaskList/>;
    } else if (this.state.screen === 'projects') {
      tab = <ProjectList/>;
    } else if (this.state.screen === 'inbox') {
      tab = <Inbox/>;
    }
    return <div>
      <ul className="nav nav-tabs" role="tablist">
        <li className={this.state.screen === 'tasks' ? 'active' : null}><a href="#" onClick={this.doSwitchToTasks}>Tasks</a></li>
        <li className={this.state.screen === 'projects' ? 'active' : null}><a href="#" onClick={this.doSwitchToProjects}>Projects</a></li>
        <li className={this.state.screen === 'inbox' ? 'active' : null}><a href="#" onClick={this.doSwitchToInbox}>Inbox</a></li>
      </ul>
      {tab}
    </div>;
  }
});
