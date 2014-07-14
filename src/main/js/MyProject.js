/** @jsx React.DOM */

"use strict";

var React = require('react');
var Label = require('./Label');

module.exports = React.createClass({
  render: function() {
    return <div><Label>MyProject</Label></div>;
  }
});
