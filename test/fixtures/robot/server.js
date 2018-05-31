'use strict';

const Hapi = require('hapi');
const server = new Hapi.Server({
  host: 'localhost',
  port: 9001
});
const routes = require('./routes');

server.route(routes);

module.exports = server;