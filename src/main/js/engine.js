'use strict';

var engine = require('code-zzy/src/main/js/engine')();

engine.add('actions', { description: 'Bake cake'});
engine.add('actions', { description: 'Wake snake'});
engine.add('actions', { description: 'Take rake to the lake'});

module.exports = engine;
