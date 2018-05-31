'use strict';

const ChatBot = require('../');

const defaultOptions = {
  baseUrl: 'https://oapi.dingtalk.com/robot/send',
  accessToken: 'xxx',
};
const robot = new ChatBot(defaultOptions);

// 发送钉钉消息
const textContent = {
  "msgtype": "text", 
  "text": {
    "content": "我就是我, 是不一样的烟火"
  }, 
  "at": {
    "atMobiles": [
      "156xxxx8827", 
      "189xxxx8325"
    ], 
    "isAtAll": false
  }
}
robot.send(textContent)
  .then((res) => {
    // TODO
  });

const content = '我就是我, 是不一样的烟火';
const at = {
   "atMobiles": [
    "156xxxx8827", 
    "189xxxx8325"
  ], 
  "isAtAll": false
};
// 快速发送文本消息
robot.text(content, at);

const link = {
  "text": "这个即将发布的新版本，创始人陈航（花名“无招”）称它为“红树林”。而在此之前，每当面临重大升级，产品经理们都会取一个应景的代号，这一次，为什么是“红树林”？", 
  "title": "时代的火车向前开", 
  "picUrl": "", 
  "messageUrl": "https://mp.weixin.qq.com/s?__biz=MzA4NjMwMTA2Ng==&mid=2650316842&idx=1&sn=60da3ea2b29f1dcc43a7c8e4a7c97a16&scene=2&srcid=09189AnRJEdIiWVaKltFzNTw&from=timeline&isappinstalled=0&key=&ascene=2&uin=&devicetype=android-23&version=26031933&nettype=WIFI"
};
robot.link(link);

const title = '杭州天气';
const text = "#### 杭州天气 @156xxxx8827\n" +
          "> 9度，西北风1级，空气良89，相对温度73%\n\n" +
          "> ![screenshot](http://image.jpg)\n"  +
          "> ###### 10点20分发布 [天气](http://www.thinkpage.cn/) \n";
const at2 = {
   "atMobiles": [
    "156xxxx8827", 
    "189xxxx8325"
  ], 
  "isAtAll": false
};
robot.markdown(title, text, at2);

const card = {
  "title": "乔布斯 20 年前想打造一间苹果咖啡厅，而它正是 Apple Store 的前身",
  "text": `![screenshot](@lADOpwk3K80C0M0FoA) 
                ### 乔布斯 20 年前想打造的苹果咖啡厅 
                Apple Store 的设计正从原来满满的科技感走向生活化，而其生活化的走向其实可以追溯到 20 年前苹果一个建立咖啡馆的计划`,
  "hideAvatar": "0",
  "btnOrientation": "0",
  "btns": [
    {
      "title": "内容不错",
      "actionURL": "https://www.dingtalk.com/"
    },
    {
      "title": "不感兴趣",
      "actionURL": "https://www.dingtalk.com/"
    }
  ]
};
robot.actionCard(card);

const links = [
  {
    "title": "时代的火车向前开",
    "messageURL": "https://mp.weixin.qq.com/s?__biz=MzA4NjMwMTA2Ng==&mid=2650316842&idx=1&sn=60da3ea2b29f1dcc43a7c8e4a7c97a16&scene=2&srcid=09189AnRJEdIiWVaKltFzNTw&from=timeline&isappinstalled=0&key=&ascene=2&uin=&devicetype=android-23&version=26031933&nettype=WIFI",
    "picURL": "https://www.dingtalk.com/"
  },
  {
    "title": "时代的火车向前开2",
    "messageURL": "https://mp.weixin.qq.com/s?__biz=MzA4NjMwMTA2Ng==&mid=2650316842&idx=1&sn=60da3ea2b29f1dcc43a7c8e4a7c97a16&scene=2&srcid=09189AnRJEdIiWVaKltFzNTw&from=timeline&isappinstalled=0&key=&ascene=2&uin=&devicetype=android-23&version=26031933&nettype=WIFI",
    "picURL": "https://www.dingtalk.com/"
  }
]
robot.feedCard(links);
