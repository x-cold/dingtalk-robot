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
    handler: function(res, h) {
      return robot.text(res.query)
      .then(data => {
        return h.response(data.data);
      }).catch(err => {
        return h.response(err);
      });
    }
  },
  {
    method: 'GET',
    path: '/sendLink',
    handler: function(res, h) {
      return robot.link(res.query)
      .then(data => {
        return h.response(data.data);
      }).catch(err => {
        return h.response(err);
      });
    }
  },
  {
    method: 'GET',
    path: '/sendMarkdown',
    handler: function(res, h) {
      return robot.markdown(res.query)
      .then(data => {
        return h.response(data.data);
      }).catch(err => {
        return h.response(err);
      });
    }
  },
  {
    method: 'GET',
    path: '/sendActionCard',
    handler: function(res, h) {
      return robot.actionCard(res.query)
      .then(data => {
        return h.response(data.data);
      }).catch(err => {
        return h.response(err);
      });
    }
  },
  {
    method: 'GET',
    path: '/sendFeedCard',
    handler: function(res, h) {
      return robot.feedCard(res.query)
      .then(data => {
        return h.response(data.data);
      }).catch(err => {
        return h.response(err);
      });
    }
  },
];
