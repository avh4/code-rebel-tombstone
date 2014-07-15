/** @jsx React.DOM */

"use strict";

var React = require('react');
var ReactFireMixin = require('reactfire');

var Typeahead = require('./Typeahead');

module.exports = React.createClass({
  mixins: [ReactFireMixin],
  getInitialState: function() {
    return { projects: [], inbox: [] };
  },
  componentWillMount: function() {
    this.bindAsArray(new Firebase('https://rebel-tombstone-dev.firebaseio.com/projects'), 'projects');
    this.bindAsArray(new Firebase('https://rebel-tombstone-dev.firebaseio.com/inbox'), 'inbox');
    
    new Firebase('https://rebel-tombstone-dev.firebaseio.com/inbox').startAt().limit(1).on('value', function(v) {
      v.forEach(function(c) {
        this.setState({ next: c });
      }.bind(this));
    }.bind(this));
  },
  doSubmit: function() {
    var item = this.state.inbox[0];
    var p = this.refs.project.value();
    var newTask = this.firebaseRefs.projects.child(p.id).child('tasks').push();
    newTask.set(item, function(error) {
      if (error) alert(error);
      else {
        this.firebaseRefs.inbox.child(this.state.next.name()).remove();
      }
    }.bind(this));
  },
  render: function() {
    var projects = [];
    if (this.state.projectsSnap) {
      this.state.projectsSnap.forEach(function(p) {
        projects.push({ title: p.val().title, id: p.name() });
      });
    }

    var list = [];
    if (!this.state.next) return <div/>;
    return <div>
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">{this.state.next.val().description}</h3>
        </div>
        <div className="panel-body">
          <form onSubmit={this.doSubmit}>
            <Typeahead ref="project" placeholder="Project" options={projects} displayKey="title"/>
            <button className="btn btn-primary">Make Action</button>
          </form>
        </div>
      </div>
    <p>{this.state.inbox.length - 1} more</p>
    </div>;
  }
});
