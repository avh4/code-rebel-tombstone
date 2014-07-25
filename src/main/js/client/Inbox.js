/** @jsx React.DOM */

"use strict";

var React = require('react');
var Typeahead = require('./Typeahead');
var dao = require('./dao');

var ProcessCard = React.createClass({
  getInitialState: function() {
    return { projects: [], next: undefined };
  },
  componentWillMount: function() {
    dao.bindProjects(function(projects) {
      this.setState({ projectsSnap: projects});
    }.bind(this));
    dao.bindNextInboxItem(function(inboxItem) {
      this.setState({ next: inboxItem });
    }.bind(this));
  },
  doSubmit: function() {
    var p = this.refs.project.value();
    dao.doMakeTaskFromInboxItem(this.state.next, p || this.refs.project.text());
    return false;
  },
  doDone: function() {
    dao.doCompleteInbox(this.state.next);
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
          <button className="btn btn-default" onClick={this.doDone}>Done</button>
        </form>
      </div>
    </div>;
  }
});

module.exports = React.createClass({
  getInitialState: function() {
    return { inboxCount: null };
  },
  componentWillMount: function() {
    dao.bindInboxCount(function(count) {
      this.setState({ inboxCount: count });
    }.bind(this));
  },
  render: function() {
    var message = "It's clean!";
    if (this.state.inboxCount == null) return <div><ProcessCard/></div>;
    if (this.state.inboxCount == 0) return <div className="jumbotron"><h1>{message}</h1></div>;
    
    return <div>
      <ProcessCard/>
      <p>{this.state.inboxCount - 1} more</p>
    </div>;
  }
})
