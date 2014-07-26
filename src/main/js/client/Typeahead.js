"use strict";

var m = require('mithril');

module.exports = {
  controller: function() {
    this.value = m.prop();
    this.doChange = function(v) {
      this.value(v);
    }.bind(this);
    this.clear = function() {
      this.value(null);
    }.bind(this);
  },
  view: function(ctrl, placeholder, choices, displayKey) {
    return m('input.form-control', {type: 'text', placeholder: placeholder,
    onchange: m.withAttr('value', ctrl.doChange),
    config: function(element, isInitialized) {
      if (!isInitialized) {
        var source = new Bloodhound({
          datumTokenizer: Bloodhound.tokenizers.obj.whitespace(displayKey),
          queryTokenizer: Bloodhound.tokenizers.whitespace,
          local: choices
        });
        source.initialize();

        $(element).typeahead({
          hint: true,
          highlight: true,
          minLength: 1
        },
        {
          displayKey: displayKey,
          source: source.ttAdapter()
        }).on('typeahead:selected', function (obj, datum) {
          m.startComputation();
          ctrl.value(datum);
          m.endComputation();
        }.bind(this)).on('typeahead:autocompleted', function (obj, datum) {
          m.startComputation();
          ctrl.value(datum);
          m.endComputation();
        }.bind(this));
      } else if (!ctrl.value()) {
        $(element).typeahead('val', null);
      }
    }});
  }
}
