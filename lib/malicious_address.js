const axios = require('axios');
const BaseGoPlus = require('./base');

class MaliciousAddress extends BaseGoPlus {
  static url = 'https://api.gopluslabs.io/api/v1/address_security/'

  buildURL(address) {
    let baseURL = new URL(this.constructor.url + address);
    baseURL.searchParams.append('chain_id', this.chain_id);

    return baseURL.toString();
  }

  async check(address) {
    let url = this.buildURL(address);
    let results = await this.request(url);

    return results;
  }
}

module.exports = MaliciousAddress