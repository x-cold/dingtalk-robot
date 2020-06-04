'use strict';

const axios = require('axios');
const sign = require('./sign');

/**
 * 钉钉机器人 WebHook：用于支持钉钉机器人消息发送
 * 
 * 官方文档：https://open-doc.dingtalk.com/docs/doc.htm?treeId=257&articleId=105735&docType=1
 */
class ChatBot {
  /**
   * 机器人工厂，所有的消息推送项目都会调用 this.webhook 接口进行发送
   * 
   * @param {String} options.webhook 完整的接口地址
   * @param {String} options.baseUrl 接口地址
   * @param {String} options.accessToken accessToken
   * @param {String} options.secret secret
   * @param {*} options.httpclient 例如 urllib / axios
   */
  constructor(options) {
    options = options || {};
    if (!options.webhook && !(options.accessToken && options.baseUrl)) {
      throw new Error('Lack for arguments!');
    }
    this.httpclient = options.httpclient || axios;
    // 优先使用 options.webhook
    // 次之将由 options.baseUrl 和 options.accessToken 组合成一个 webhook 地址
    this.webhook = options.webhook || `${options.baseUrl}?access_token=${options.accessToken}`;
    this.secret = options.secret;
  }

  /**
   * 发送钉钉消息
   * 
   * @param {Object} content 发动的消息对象
   * @return {Promise} 
   */
  send(content) {
    const { httpclient } = this;
    let signStr = '';
    if (this.secret) {
      const timestamp = Date.now();
      signStr = '&timestamp=' + timestamp + '&sign=' + sign(this.secret, timestamp + '\n' + this.secret);
    }
    return httpclient.request(this.webhook + signStr, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(content)
    });
  }

  /**
   * 发送纯文本消息，支持@群内成员
   * 
   * @param {String} content 消息内容
   * @param {Object} at 群内@成员的手机号
   * @return {Promise}
   */
  text(content, at) {
    at = at || {};
    return this.send({
      msgtype: 'text',
      text: {
        content
      },
      at
    });
  }

  /**
   * 发送单个图文链接
   * 
   * @param {String} link.title 标题
   * @param {String} link.text 消息内容
   * @param {String} link.messageUrl 跳转的Url
   * @param {String} link.picUrl 图片的链接
   * @return {Promise}
   */
  link(link) {
    return this.send({
      msgtype: 'link',
      link
    });
  }

  /**
   * 发送Markdown消息
   * 
   * @param {String} title 标题
   * @param {String} text 消息内容(支持Markdown)
   * @return {Promise}
   */
  markdown(title, text, at) {
    at = at || {};
    return this.send({
      msgtype: 'markdown',
      markdown: {
        title,
        text
      },
      at
    });
  }

  /**
   * 发送actionCard(动作卡片)
   * Ps: 支持多个按钮，支持Markdown
   * 
   * @param {String} card.title 标题
   * @param {String} card.text 消息内容
   * @param {String} card.btnOrientation 按钮排列的方向(0竖直，1横向，默认为0)
   * @param {String} card.btns.title 某个按钮标题
   * @param {String} card.btns.actionURL 某个按钮链接
   * @return {Promise}
   */
  actionCard(card) {
    return this.send({
      msgtype: 'actionCard',
      actionCard: {
        title: card.title,
        text: card.text,
        hideAvatar: card.hideAvatar || 1,
        btnOrientation: card.btnOrientation || 0,
        btns: card.btns || []
      }
    });
  }

  /**
   * 发送feedCard，支持多图文链接
   * Ps: links可包含多个link，建议不要超过4个
   * 
   * @param {String} link.title 标题
   * @param {String} link.messageURL 跳转的Url
   * @param {String} link.picURL 图片的链接
   * @return {Promise}
   */
  feedCard(links) {
    return this.send({
      msgtype: 'feedCard',
      feedCard: {
        links
      }
    });
  }
}

module.exports = ChatBot;
