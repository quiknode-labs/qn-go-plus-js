const axios = require('axios');
const AccessToken = require('./access_token');

class BaseGoPlus {
  static url = null;

  constructor(access_token, chain_id) {
    this.access_token =  access_token;
    this.chain_id = chain_id;
  }

  static async init(access_token, chain_id) {
    // if no auth token, grab one from service
    if (typeof(access_token) === undefined) {
      let sdk = new AccessToken();
      try {
        let token_info = await sdk.renew();  
      } catch (e) {
        throw('Unable to initialize Malicious Address object, missing token');
      }
      let access_token = token_info.token;
    }

    return new this(access_token, chain_id);
  }

  buildURL(address) {
    throw('Not yet implemented, add to subclass');
  }

  async request(url) {
    let headers = { 'Authorization': this.access_token };
    let response = await axios.get(url, headers);

    if (response.status !== 200) {
      return { error: response.data.message };
    }

    return response.data.result;
  }
}

module.exports = BaseGoPlus