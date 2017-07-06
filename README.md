# React Scoreboard
A live-updating scoreboard powered by React and a Google Spreadsheet.

## Shout-out
This project is based on the `react-production` boilerplate, whose code lives in the commit history of this repository. That boilerplate has since become [razzle](https://github.com/jaredpalmer/razzle), but I like the original version so much that I decided to preserve it.

## Technology
+ [React Router 3.x](https://github.com/ReactTraining/react-router/tree/v3/docs)
+ [Redial](https://github.com/markdalgleish/redial)
+ [React Slick Carousel](https://github.com/akiran/react-slick)
+ [Redux](http://redux.js.org/) and [React Redux](https://github.com/reactjs/react-redux)
+ [Styled Components](https://github.com/styled-components/styled-components)

## Set-up
1. Create a Google Spreadsheet with the same format as [this one](https://docs.google.com/spreadsheets/d/1qn7Kxu4vnwWeP6mxJrCc8vAVHg6u4pZbFcDn2O9qtqc/).
2. Clone this repository.
3. `npm install` or `yarn`.
4. Create a subdirectory called `secret` in the root. Also create a file called `.env`. Both are ignored from version control.
5. Follow steps A-H under "Step 1" of this Node.js + Google Spreadsheets [tutorial](https://developers.google.com/sheets/api/quickstart/nodejs). Instead of putting `client_secret.json` in the root, put it in `secret/`.
6. Paste the following into `.env`. All of the values can be found in `client_secret.json` except for `GOOGLE_SPREADSHEET_KEY` and `GOOGLE_SCOPES`.

+ `GOOGLE_SPREADSHEET_KEY`: Can be found in your spreadsheet's URL
+ `GOOGLE_CLIENT_ID`
+ `GOOGLE_PROJECT_ID`
+ `GOOGLE_AUTH_URI`
+ `GOOGLE_TOKEN_URI`
+ `GOOGLE_AUTH_PROVIDER_CERT_URL`
+ `GOOGLE_CLIENT_SECRET`
+ `GOOGLE_REDIRECT_URIS`: In `client_secret.json`, this is an array with multiple elements. Make sure to include all of them here, separated by a spaces.
+ `GOOGLE_SCOPES`: Set to `https://www.googleapis.com/auth/spreadsheets.readonly`

7. Run `npm run token`. This will put `token.json` into `secret/`. Open it and fill in `.env` with the remaining values found in the file:
+ `GOOGLE_ACCESS_TOKEN`
+ `GOOGLE_REFRESH_TOKEN`
+ `GOOGLE_TOKEN_TYPE`
+ `GOOGLE_TOKEN_EXPIRY`
8. You're ready. These environment variables are pulled into `server/config.js` and dispersed into the application logic from there.

## Commands
+ `npm run token`: Generate a Google authorization token into `secret/`.
+ `npm start`: Start the development server.
+ `npm run start:prod`: Run the Node.js server in production.
+ `npm run scrape`: Start the scraper in development.
+ `npm run scrape:prod`: Start the scraper in production.
+ `npm run build`: Build for production
+ `npm run clean`: Empty out `build/` and `public/assets/`

## What's next
+ Unit tests
+ React Router 4.x
+ Better styles
+ More robust scores data
+ React Fiber
