/** @jsx React.DOM */

"use strict";

var React = require('react');
var ReactFireMixin = require('reactfire');
var TaskListItem = require('./TaskListItem');

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
        var taskRef = this.firebaseRefs.projects.child(p.name()).child('tasks').child(t.name());
          list.push(<TaskListItem key={t.name()} task={t.val()} taskRef={taskRef}/>);
      }.bind(this));
      projects.push(<div key={p.name()}>
        <h2>{p.val().title}</h2>
        <ul className="list-group">{list}</ul>
      </div>)
    }.bind(this));
    return <div>{projects}</div>;
  }
});
