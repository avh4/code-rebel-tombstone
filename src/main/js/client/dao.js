var dao = require('../dao');

module.exports = new dao(new Firebase('https://rebel-tombstone-dev.firebaseio.com'));
