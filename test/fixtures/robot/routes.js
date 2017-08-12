'use strict';

const ChatRobot = require('../../../');
const robotConfig = {
  baseUrl: 'https://oapi.dingtalk.com/robot/send',
  accessToken: 'xxxxxx'
};
const robot = new ChatRobot(robotConfig);

module.exports = [
  {
    method: 'GET',
    path: '/sendText',
    handler: function(res, reply) {
      return robot.text(res.query)
      .then(data => {
        reply(data.data);
      }).catch(err => {
        reply(err);
      });
    }
  },
  {
    method: 'GET',
    path: '/sendLink',
    handler: function(res, reply) {
      return robot.link(res.query)
      .then(data => {
        reply(data.data);
      }).catch(err => {
        reply(err);
      });
    }
  },
  {
    method: 'GET',
    path: '/sendMarkdown',
    handler: function(res, reply) {
      return robot.markdown(res.query)
      .then(data => {
        reply(data.data);
      }).catch(err => {
        reply(err);
      });
    }
  },
  {
    method: 'GET',
    path: '/sendActionCard',
    handler: function(res, reply) {
      return robot.actionCard(res.query)
      .then(data => {
        reply(data.data);
      }).catch(err => {
        reply(err);
      });
    }
  },
  {
    method: 'GET',
    path: '/sendFeedCard',
    handler: function(res, reply) {
      return robot.feedCard(res.query)
      .then(data => {
        reply(data.data);
      }).catch(err => {
        reply(err);
      });
    }
  },
];
