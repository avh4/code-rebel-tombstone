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
    var list = [];
    if (this.state.projectsSnap) {
      this.state.projectsSnap.forEach(function(p) {
        p.child('tasks').forEach(function(t) {
          var taskRef = this.firebaseRefs.projects.child(p.name()).child('tasks').child(t.name());
          list.push(<TaskListItem key={p.name() + '.' + t.name()} task={t.val()} taskRef={taskRef}/>);
        }.bind(this));
      }.bind(this));
    }
    return <ul className="list-group">{list}</ul>;
  }
});
