/** @jsx React.DOM */

"use strict";

var React = require('react');
var Label = require('./Label');
var ReactFireMixin = require('reactfire');

module.exports = React.createClass({
  mixins: [ReactFireMixin],
  getInitialState: function() {
    return { actions: [] };
  },
  componentWillMount: function() {
    this.bindAsArray(new Firebase('https://rebel-tombstone-dev.firebaseio.com/actions'), 'actions');
  },
  render: function() {
    var list = this.state.actions.map(function(action) {
      return <li>{action.description}</li>;
    })
    return <div>
      <Label>MyProject</Label>
      <ul>{list}</ul>
    </div>;
  }
});
