const path = require('path');

require('dotenv').config();

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_PROJECT_ID,
  GOOGLE_AUTH_URI,
  GOOGLE_TOKEN_URI,
  GOOGLE_AUTH_PROVIDER_CERT_URL,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URIS,
  GOOGLE_SPREADSHEET_KEY,
  GOOGLE_SCOPES,
} = process.env;

const config = {
  nodeEnv: process.env.NODE_ENV,
  webConcurrency: process.env.WEB_CONCURRENCY || 1,
  port: process.env.PORT || 5000,
  timeout: 29000,
  scraperInterval: '* * * * *',
  googleClientId: GOOGLE_CLIENT_ID,
  googleProjectId: GOOGLE_PROJECT_ID,
  googleAuthURI: GOOGLE_AUTH_URI,
  googleTokenURI: GOOGLE_TOKEN_URI,
  googleAuthProviderCertURL: GOOGLE_AUTH_PROVIDER_CERT_URL,
  googleClientSecret: GOOGLE_CLIENT_SECRET,
  googleRedirectURIs: GOOGLE_REDIRECT_URIS.split(' '),
  googleScopes: GOOGLE_SCOPES.split(' '),
  googleSpreadsheetKey: GOOGLE_SPREADSHEET_KEY,
  googleTokenPath: path.join(process.cwd(), 'secret', 'token.json'),
  scoresFilePath: path.join(process.cwd(), 'build', 'scores.json'),
};

module.exports = config;
