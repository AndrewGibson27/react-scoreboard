import fs from 'fs';
import GoogleAuth from 'google-auth-library';

import config from '../config';
import logger from '../log';

const {
  googleClientSecret: GOOGLE_CLIENT_SECRET,
  googleClientId: GOOGLE_CLIENT_ID,
  googleRedirectURIs: GOOGLE_REDIRECT_URIS,
  googleTokenPath: GOOGLE_TOKEN_PATH,
} = config;

export default function getAuth(callback) {
  const auth = new GoogleAuth();
  const oauth2Client = new auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URIS[0],
  );

  fs.readFile(GOOGLE_TOKEN_PATH, (err, token) => {
    if (err) {
      logger.log('info', err);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
    }
  });
}
