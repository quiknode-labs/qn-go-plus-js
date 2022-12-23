const sha1 = require('js-sha1');
const axios = require('axios');
try {
  require('dotenv').config();
} catch (e) {
  console.log('We recommend you install dotenv: npm install dotenv --save')
}

class AccessToken {
  static url = 'https://api.gopluslabs.io/api/v1/token';

  constructor(app_key, app_secret) {
    this.app_key = app_key || process.env.APP_KEY;
    this.app_secret = app_secret || process.env.APP_SECRET;
  }

  timestampInSeconds () {
    return Math.floor(Date.now() / 1000)
  }

  async renew() {
    let time = this.timestampInSeconds();
    let sign = sha1(this.app_key + time + this.app_secret);
    let args = { app_key: this.app_key, time, sign };
    let response = await axios.post(this.constructor.url, args);

    if (response.status !== 200) {
      throw('Non-200 response from server');
    }

    return {
      token: response.data.result.access_token,
      expiration: response.data.result.expires_in
    }
  }
}

module.exports = AccessToken