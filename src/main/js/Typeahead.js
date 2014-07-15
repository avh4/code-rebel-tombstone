/** @jsx React.DOM */

"use strict";

var React = require('react');

module.exports = React.createClass({
  componentDidMount: function() {
    var source = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace(this.props.displayKey),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      local: this.props.options
    });
    source.initialize();
    
    $(this.getDOMNode()).typeahead({
      hint: true,
      highlight: true,
      minLength: 1
    },
    {
      displayKey: this.props.displayKey,
      source: source.ttAdapter()
    }).on('typeahead:selected', function (obj, datum) {
      this._v = datum;
    }.bind(this)).on('typeahead:autocompleted', function (obj, datum) {
      this._v = datum;
    }.bind(this));
  },
  value: function() {
    return this._v;
  },
  text: function() {
    return this.refs.input.getDOMNode().value;
  },
  render: function() {
    return <input ref="input" className="form-control" type="text" placeholder={this.props.placeholder}/>;
  }
});
