# GoPlus JS SDK

A thin JS wrapper to interact with GoPlus, a gift from [QuickNode.com](https://www.quicknode.com?utm_source=gh&utm_campaign=go-plus-sdk). We recommend you save time and just use this via the relevant QuickNode marketplace add-on with Ethers.js or Web3.js.

Install it with: `npm install qn-go-plus-js`

## How to use

Importing / requiring.
```js
const {
  AccessToken,
  MaliciousAddress,
  NFTSecurity,
  TokenSecurity,
  ApprovalSecurity,
  PhishingSecurity,
} = require('qn-go-plus-js');

// or 
import {
  AccessToken,
  MaliciousAddress,
  NFTSecurity,
  TokenSecurity,
  ApprovalSecurity,
  PhishingSecurity,
} from 'qn-go-plus-js';
```

Getting an access token - make sure you have `APP_KEY` and `APP_SECRET` in a `.env` file.
```js
let token = new AccessToken(process.env.APP_KEY, process.env.APP_SECRET);
token.renew().then(console.log);
````

Checking an address for malicious activity.
```js
let token = new AccessToken(process.env.APP_KEY, process.env.APP_SECRET);
token.renew().then(async (refreshed_data) => {
  let address = MaliciousAddress.init(refreshed_data.token, CHAIN_ID_HERE);
  console.log(await address.check('ANY ADDRESS HERE'));
});
```

Checking an nft for security analysis.
```js
let token = new AccessToken(process.env.APP_KEY, process.env.APP_SECRET);
token.renew().then(async (refreshed_data) => {
  let nft = NFTSecurity.init(refreshed_data.token, CHAIN_ID_HERE);
  console.log(await nft.check('NFT CONTRACT ADDRESS HERE'));
});
```

Checking a token for security analysis.
```js
let token = new AccessToken(process.env.APP_KEY, process.env.APP_SECRET)
token.renew().then(async (refreshed_data) => {
  let token = TokenSecurity.init(refreshed_data.token, CHAIN_ID_HERE);
  console.log(await token.check('ERC20 TOKEN ADDRESS HERE'));
});
```

Checking what an approval may do.
```js
let token = new AccessToken(process.env.APP_KEY, process.env.APP_SECRET)
token.renew().then(async (refreshed_data) => {
  let approval = ApprovalSecurity.init(refreshed_data.approval, CHAIN_ID_HERE);
  console.log(await approval.check('ANY ADDRESS ASKING FOR APPROVAL HERE'));
});
```

Checking a website URL for known phishing activity.
```js
let token = new AccessToken(process.env.APP_KEY, process.env.APP_SECRET)
token.renew().then(async (refreshed_data) => {
  let website = PhishingSecurity.init(refreshed_data.approval, null);
  console.log(await website.check('A URL STARTING WITH HTTP'));
});
```