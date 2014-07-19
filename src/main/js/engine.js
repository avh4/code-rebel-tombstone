'use strict';

var engine = require('code-zzy/src/main/js/engine')();

engine.add('tasks', { description: 'Bake cake'});
engine.add('tasks', { description: 'Wake snake'});
engine.add('tasks', { description: 'Take rake to the lake'});

module.exports = engine;
