// https://developers.google.com/sheets/api/quickstart/nodejs

import fs from 'fs';
import readline from 'readline';
import googleAuth from 'google-auth-library';

import config from '../config';

const {
  googleScopes: GOOGLE_SCOPES,
  googleTokenDir: GOOGLE_TOKEN_DIR,
  googleTokenPath: GOOGLE_TOKEN_PATH,
  googleClientSecretPath: GOOGLE_CLIENT_SECRET_PATH,
  nodeEnv: NODE_ENV,
} = config;

export default function initAuth(callback) {
  fs.readFile(GOOGLE_CLIENT_SECRET_PATH, (err, content) => {
    if (err) {
      console.log(`Error loading client secret file: ${err}`);
      return;
    }

    authorizeApp(JSON.parse(content), callback);
  });
}

function authorizeApp(credentials, callback) {
  const clientSecret = credentials.installed.client_secret;
  const clientID = credentials.installed.client_id;
  const redirectURL = credentials.installed.redirect_uris[0];
  const auth = new googleAuth();
  const oauth2Client = new auth.OAuth2(clientID, clientSecret, redirectURL);

  fs.readFile(GOOGLE_TOKEN_PATH, (err, token) => {
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
    }
  });
}

function getNewToken(oauth2Client, callback) {
  const authURL = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: GOOGLE_SCOPES
  });

  console.log(`Authorize this app by visiting this url: ${authURL}`);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Enter the code from that page here: ', code => {
    rl.close();

    oauth2Client.getToken(code, (err, token) => {
      if (err) {
        console.log(`Error while trying to retrieve access token: ${err}`);
        return;
      }

      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
}

function storeToken(token) {
  if (NODE_ENV === 'production') {
    try {
      fs.mkdirSync(GOOGLE_TOKEN_DIR);
    } catch (err) {
      if (err.code != 'EEXIST') {
        throw err;
      }
    }
  }

  fs.writeFile(GOOGLE_TOKEN_PATH, JSON.stringify(token));
  console.log(`Token stored to ${GOOGLE_TOKEN_PATH}`);
}
