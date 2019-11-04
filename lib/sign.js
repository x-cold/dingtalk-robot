'use strict';
const crypto = require('crypto');

module.exports = (secret, content) => {
  const str = crypto.createHmac('sha256', secret).update(content)
    .digest()
    .toString('base64');
  return encodeURIComponent(str);
}
