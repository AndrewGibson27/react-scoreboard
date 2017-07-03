// https://developers.google.com/sheets/api/quickstart/nodejs
const fs = require('fs');
const readline = require('readline');
const GoogleAuth = require('google-auth-library');

const config = require('../config');
const logger = require('../log');

const {
  googleClientSecret: GOOGLE_CLIENT_SECRET,
  googleClientId: GOOGLE_CLIENT_ID,
  googleRedirectURIs: GOOGLE_REDIRECT_URIS,
  googleScopes: GOOGLE_SCOPES,
  googleTokenPath: GOOGLE_TOKEN_PATH,
} = config;

function storeToken(token) {
  fs.writeFile(GOOGLE_TOKEN_PATH, JSON.stringify(token), (err) => {
    if (err) {
      logger.log('info', err);
    }
  });
}

function getNewToken(oauth2Client) {
  const authURL = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: GOOGLE_SCOPES,
  });

  console.log(`Authorize this app by visiting this url: ${authURL}`);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();

    oauth2Client.getToken(code, (err, token) => {
      if (err) {
        console.log(`Error while trying to retrieve access token: ${err}`);
        logger.log('info', err);
      } else {
        storeToken(token);
      }
    });
  });
}

(function init() {
  const auth = new GoogleAuth();
  const oauth2Client = new auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URIS[0],
  );

  getNewToken(oauth2Client);
}());
