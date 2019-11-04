# Dingtalk Robot

[![download](https://img.shields.io/npm/v/dingtalk-robot-sender.svg?style=flat-square)](https://npmjs.org/package/dingtalk-robot-sender) [![](https://travis-ci.org/x-cold/dingtalk-robot.svg?branch=master)](https://travis-ci.org/x-cold/dingtalk-robot) [![codecov](https://codecov.io/gh/x-cold/dingtalk-robot/branch/master/graph/badge.svg)](https://codecov.io/gh/x-cold/dingtalk-robot) [![download](https://badgen.net/npm/dt/dingtalk-robot-sender)](https://npmjs.org/package/dingtalk-robot-sender)

钉钉机器人Node.js SDK，基于官方提供的文档稍微抽象封装了一层，方便调用。

官网链接：https://open-doc.dingtalk.com/microapp/serverapi3/iydd5h

## 1. 用法

### 1.0 安装模块

```
npm i dingtalk-robot-sender --save
```

### 1.1 创建机器人实例

```js
const ChatBot = require('dingtalk-robot-sender');
// 直接使用 webhook
const robot = new ChatBot({
  webhook: 'https://oapi.dingtalk.com/robot/send?access_token=xxxxxxxxx'
});

// 组合 baseUrl 和 accessToken
const robot = new ChatBot({
  baseUrl: 'https://oapi.dingtalk.com/robot/send',
  accessToken: 'xxxxxxxxx'
});

// 自定义 httpclient
const robot = new ChatBot({
  baseUrl: 'https://oapi.dingtalk.com/robot/send',
  accessToken: 'xxxxxxxxx',
  httpclient: require('urllib')
});
```

### 1.2 发送钉钉消息

```js
// 发送钉钉消息
let textContent = {
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
```

### 1.3 快速发送各种格式的消息(强烈建议阅读源码中的注释部分)

1.3.1 发送普通文本

```js
let content = '我就是我, 是不一样的烟火';
let at = {
   "atMobiles": [
    "156xxxx8827", 
    "189xxxx8325"
  ], 
  "isAtAll": false
};
// 快速发送文本消息
robot.text(content, at);
```

1.3.2 发送链接

```js
let link = {
  "text": "这个即将发布的新版本，创始人陈航（花名“无招”）称它为“红树林”。而在此之前，每当面临重大升级，产品经理们都会取一个应景的代号，这一次，为什么是“红树林”？", 
  "title": "时代的火车向前开", 
  "picUrl": "", 
  "messageUrl": "https://mp.weixin.qq.com/s?__biz=MzA4NjMwMTA2Ng==&mid=2650316842&idx=1&sn=60da3ea2b29f1dcc43a7c8e4a7c97a16&scene=2&srcid=09189AnRJEdIiWVaKltFzNTw&from=timeline&isappinstalled=0&key=&ascene=2&uin=&devicetype=android-23&version=26031933&nettype=WIFI"
};
robot.link(link);
```

1.3.3 发送Markdown

```js
let title = '杭州天气';
let text = "#### 杭州天气 @156xxxx8827\n" +
          "> 9度，西北风1级，空气良89，相对温度73%\n\n" +
          "> ![screenshot](http://image.jpg)\n"  +
          "> ###### 10点20分发布 [天气](http://www.thinkpage.cn/) \n";
let at2 = {
   "atMobiles": [
    "156xxxx8827", 
    "189xxxx8325"
  ], 
  "isAtAll": false
};
robot.markdown(title, text, at2);
```

1.3.4 发送actionCard

```js
let card = {
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
```

1.3.5 发送feedCard

```js
let links = [
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
```

## Examples

https://github.com/x-cold/dingtalk-robot/tree/master/examples

## Environment

+ Node.js > 6

## Test

### Units Test

```
npm test
```

### Coverage

```
npm run ci
```
