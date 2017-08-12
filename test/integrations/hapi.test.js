'use strict';

const request = require('supertest');
const assert = require('assert');
const server = require('../fixtures/robot/server');

describe('ChatBot & Hapi test for integrations', () => {
  describe('Single robot', () => {
    before(function () {
      server.start(err => {
        if (err) {
          throw err;
        }
        console.log('Server running at:', server.info.uri);
      });
    });

    after(function () {
      server.stop();
    });

    it('should sendText success', function(done) {
      request(server.listener)
        .get('/sendText')
        .expect(200)
        .end(done);
    });

    it('should sendMarkdown success', function(done) {
      request(server.listener)
        .get('/sendMarkdown')
        .expect(200)
        .end(done);
    });

    it('should sendLink success', function(done) {
      request(server.listener)
        .get('/sendLink')
        .expect(200)
        .end(done);
    });

    it('should sendActionCard success', function(done) {
      request(server.listener)
        .get('/sendActionCard')
        .expect(200)
        .end(done);
    });

    it('should sendFeedCard success', function(done) {
      request(server.listener)
        .get('/sendFeedCard')
        .expect(200)
        .end(done);
    });
  });
});