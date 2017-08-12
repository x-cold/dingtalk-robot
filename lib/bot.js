'use strict';

const axios = require('axios');

/**
 * 钉钉机器人WebHook：用于支撑钉钉机器人和NLP.ai机器人的消息发送
 * 
 * 官方文档：https://open-doc.dingtalk.com/docs/doc.htm?spm=a219a.7629140.0.0.ywTLIl&treeId=257&articleId=105735&docType=1#s4
 */
class ChatBot {
  /**
   * 机器人工厂，所有的消息推送项目都会调用 this.webhook 接口进行发送
   * 
   * @param {Object} options.webhook 完整的接口地址
   * @param {Object} options.baseUrl 接口地址
   * @param {Object} options.accessToken
   */
  constructor(options) {
    options = options || {};
    if (!options.webhook && !(options.accessToken && options.baseUrl)) {
      throw new Error('Lack for arguments!');
    }
    // 如果options.webook存在，则直接使用options.webhook
    // 否则将由options.baseUrl和options.accessToken拼接
    this.webhook = options.webhook || `${options.baseUrl}?access_token=${options.accessToken}`;
  }

  /**
   * 发送钉钉消息
   * 
   * @param {Object} content 发动的消息对象
   * @return {Promise} 
   */
  send(content) {
    return axios(this.webhook, {
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
        content: content
      },
      at: at
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
      link: link
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
        title: title,
        text: text
      },
      at: at
    });
  }

  /**
   * 发送actionCard(动作卡片)
   * Ps: 支持多个按钮，支持Markdown
   * 
   * @param {String} card.title 标题
   * @param {String} card.text 消息内容
   * @param {String} card.hideAvatar 隐藏发送者头像(1隐藏，0显示，默认为0)
   * @param {String} card.btnOrientation 按钮排列的方向(0竖直，1横向，默认为0)
   * @param {String} card.btn.title 某个按钮标题
   * @param {String} card.btn.actionURL 某个按钮链接
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
   * @param {String} link.text 消息内容
   * @param {String} link.messageUrl 跳转的Url
   * @param {String} link.picUrl 图片的链接
   * @return {Promise}
   */
  feedCard(links) {
    return this.send({
      msgtype: 'feedCard',
      feedCard: {
        links: links
      }
    });
  }
}

module.exports = ChatBot;
