import GoogleAuth from 'google-auth-library';

import config from '../config';

const {
  googleClientSecret: GOOGLE_CLIENT_SECRET,
  googleClientId: GOOGLE_CLIENT_ID,
  googleRedirectURIs: GOOGLE_REDIRECT_URIS,
  googleAccessToken: GOOGLE_ACCESS_TOKEN,
  googleRefreshToken: GOOGLE_REFRESH_TOKEN,
  googleTokenType: GOOGLE_TOKEN_TYPE,
  googleTokenExpiry: GOOGLE_TOKEN_EXPIRY,
} = config;

export default function getAuth() {
  const auth = new GoogleAuth();

  const oauth2Client = new auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URIS[0],
  );

  const token = {
    access_token: GOOGLE_ACCESS_TOKEN,
    refresh_token: GOOGLE_REFRESH_TOKEN,
    expiry_date: GOOGLE_TOKEN_EXPIRY,
    token_type: GOOGLE_TOKEN_TYPE,
  };

  oauth2Client.credentials = token;

  return oauth2Client;
}
