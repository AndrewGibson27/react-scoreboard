import path from 'path';

/**
  You probably want to make the Google paths different
  in production so they're not publicly visible.
*/

const config = {
  nodeEnv: process.env.NODE_ENV,
  webConcurrency: process.env.WEB_CONCURRENCY || 1,
  port: process.env.PORT || 5000,
  timeout: 29000,
  googleScopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  googleTokenDir: process.cwd(),
  googleTokenPath: path.join(process.cwd(), 'sheets.googleapis.com-react-scoreboard-oauth-other.json'),
  googleClientSecretDir: process.cwd(),
  googleClientSecretPath: path.join(process.cwd(), 'client_secret.json'),
  scraperInterval: 60000
};

module.exports = config;
