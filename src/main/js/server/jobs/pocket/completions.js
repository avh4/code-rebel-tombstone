'use strict';

var pocket = require('./service');

module.exports = function(job) {
  return pocket.archive(job.pocket__item_id);
}