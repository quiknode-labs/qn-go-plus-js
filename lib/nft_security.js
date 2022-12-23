const axios = require('axios');
const BaseGoPlus = require('./base');

class NFTSecurity extends BaseGoPlus {
  static url = 'https://api.gopluslabs.io/api/v1/nft_security/'

  buildURL(address) {
    let baseURL = new URL(this.constructor.url + this.chain_id);
    baseURL.searchParams.append('contract_addresses', address);

    return baseURL.toString();
  }

  async check(address) {
    let url = this.buildURL(address);
    let results = await this.request(url);

    return results;
  }
}

module.exports = NFTSecurity