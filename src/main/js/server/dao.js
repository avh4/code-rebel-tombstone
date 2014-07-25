var dao = require('../dao');
var Firebase = require('firebase');

module.exports = new dao(new Firebase('https://rebel-tombstone-dev.firebaseio.com'));
