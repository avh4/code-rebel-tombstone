/** @jsx React.DOM */

"use strict";

var React = require('react');
var Label = require('./Label');
var zzy = require('./engine');

module.exports = React.createClass({
  getInitialState: function() {
    return { actions: [] };
  },
  componentWillMount: function() {
    zzy.subscribe('actions', function(actions) {
      this.setState({actions: actions || []});
    }.bind(this));
  },
  render: function() {
    var list = this.state.actions.toArray().map(function(action) {
      return <li>{action.description}</li>;
    })
    return <div>
      <Label>MyProject</Label>
      <ul>{list}</ul>
    </div>;
  }
});
