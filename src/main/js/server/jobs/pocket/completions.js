'use strict';

var pocket = require('./service');

module.exports = function(job) {
  if (job.completed) {
    return pocket.archive(job.pocket__item_id);
  } else {
    return pocket.readd(job.pocket__item_id);
  }
}