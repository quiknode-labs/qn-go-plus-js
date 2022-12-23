const axios = require('axios');
const BaseGoPlus = require('./base');

class Phishing extends BaseGoPlus {
  static url = 'https://api.gopluslabs.io/api/v1/phishing_site'

  buildURL(url_to_check) {
    let baseURL = new URL(this.constructor.url);
    baseURL.searchParams.append('url', url_to_check);

    return baseURL.toString();
  }

  async check(address) {
    let url = this.buildURL(address);
    let results = await this.request(url);

    return results;
  }
}

module.exports = Phishing