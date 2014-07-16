/** @jsx React.DOM */

"use strict";

var React = require('react');
var ReactFireMixin = require('reactfire');

var Typeahead = require('./Typeahead');

var ProcessCard = React.createClass({
  mixins: [ReactFireMixin],
  getInitialState: function() {
    return { projects: [], next: undefined };
  },
  componentWillMount: function() {
    this.bindAsArray(new Firebase('https://rebel-tombstone-dev.firebaseio.com/projects'), 'projects');
    
    this.inbox = new Firebase('https://rebel-tombstone-dev.firebaseio.com/inbox');
    
    this.inbox.startAt().limit(1).on('value', function(v) {
      v.forEach(function(c) {
        this.setState({ next: c });
      }.bind(this));
    }.bind(this));
  },
  doSubmit: function() {
    var item = this.state.next.val();
    var p = this.refs.project.value();
    var projectRef;
    if (p) {
      projectRef = this.firebaseRefs.projects.child(p.id);
    } else {
      projectRef = this.firebaseRefs.projects.push();
      projectRef.set({title: this.refs.project.text()});
    }
    var newTask = projectRef.child('tasks').push();
    newTask.set(item, function(error) {
      if (error) alert(error);
      else {
        this.inbox.child(this.state.next.name()).remove();
      }
    }.bind(this));
    return false;
  },
  render: function() {
    var projects = [];
    if (this.state.projectsSnap) {
      this.state.projectsSnap.forEach(function(p) {
        projects.push({ title: p.val().title, id: p.name() });
      });
    }
    
    if (!this.state.next) return <div>...</div>;
    
    var next = this.state.next.val();
    var title = next.description;
    if (next.href) {
      title = <a href={next.href} target="_new">{next.description}</a>;
    }
    var icons = [];
    if (next.type === 'pocket') {
      icons.push(<img src="pocket.png" width="16"/>)
    }

    return <div className="panel panel-default">
      <div className="panel-heading">
        <h3 className="panel-title">{icons} {title}</h3>
      </div>
      <div className="panel-body">
        <p>{next.notes}</p>
        <form onSubmit={this.doSubmit}>
          <Typeahead ref="project" placeholder="Project" options={projects} displayKey="title"/>
          <button className="btn btn-primary">Make Action</button>
        </form>
      </div>
    </div>;
  }
});

module.exports = React.createClass({
  mixins: [ReactFireMixin],
  getInitialState: function() {
    return { inbox: [] };
  },
  componentWillMount: function() {
    this.bindAsArray(new Firebase('https://rebel-tombstone-dev.firebaseio.com/inbox'), 'inbox');
  },
  render: function() {
    var message = "It's clean!";
    if (this.state.inbox.length == 0) return <div className="jumbotron"><h1>{message}</h1></div>;
    
    return <div>
      <ProcessCard/>
      <p>{this.state.inbox.length - 1} more</p>
    </div>;
  }
})
