/** @jsx React.DOM */

"use strict";

var React = require('react');
var ReactFireMixin = require('reactfire');

module.exports = React.createClass({
  mixins: [ReactFireMixin],
  getInitialState: function() {
    return { projects: [], inbox: [] };
  },
  componentWillMount: function() {
    this.bindAsArray(new Firebase('https://rebel-tombstone-dev.firebaseio.com/projects'), 'projects');
    this.bindAsArray(new Firebase('https://rebel-tombstone-dev.firebaseio.com/inbox'), 'inbox');
  },
  render: function() {
    var list = [];
    if (this.state.inbox.length <= 0) return <div/>;
    return <div className="panel panel-default">
      <div className="panel-heading">
        <h3 className="panel-title">{this.state.inbox[0].description}</h3>
      </div>
      <div className="panel-body">
        Panel content
      </div>
    </div>;
  }
});
