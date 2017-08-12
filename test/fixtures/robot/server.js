'use strict';

const Hapi = require('hapi');
const server = new Hapi.Server();
const routes = require('./routes');

server.connection({
  host: 'localhost',
  port: 9001
});

server.route(routes);

module.exports = server;