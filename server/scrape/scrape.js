import schedule from 'node-schedule';
import google from 'googleapis';
import fs from 'fs';

import getAuth from '../auth/getAuth';
import config from '../config';
import logger from '../log';

const {
  scraperInterval: SCRAPER_INTERVAL,
  googleSpreadsheetKey: GOOGLE_SPREADSHEET_KEY,
  scoresFilePath,
} = config;

function checkForScoreUpdate(oldScore, newScore) {
  let didUpdate = false;

  if (oldScore.homeScore !== newScore.homeScore) {
    didUpdate = true;
  } else if (oldScore.awayScore !== newScore.awayScore) {
    didUpdate = true;
  } else if (oldScore.timeLeft !== newScore.timeLeft) {
    didUpdate = true;
  } else if (oldScore.quarter !== newScore.quarter) {
    didUpdate = true;
  } else if (oldScore.final !== newScore.final) {
    didUpdate = true;
  }

  return didUpdate;
}

function compareScores(oldScores, newScores) {
  const oldScoresRef = {};

  oldScores.forEach((score, index) => {
    oldScoresRef[score.id] = index;
  });

  newScores.forEach((score) => {
    const currScore = score;

    if (Object.hasOwnProperty.call(oldScoresRef, currScore.id)) {
      const oldScore = oldScores[oldScoresRef[currScore.id]];
      const didUpdate = checkForScoreUpdate(oldScore, currScore);

      currScore.didJustUpdate = didUpdate;
    }
  });

  return newScores;
}

function writeScoresFile(newScores) {
  fs.writeFile(scoresFilePath, JSON.stringify(newScores), (err) => {
    if (err) {
      logger.log('info', err);
    }
  });
}

function getExistingScores(newScores) {
  fs.readFile(scoresFilePath, (err, data) => {
    if (err) {
      logger.log('info', err);
    } else {
      const oldScores = JSON.parse(data);
      const newScoresCompared = compareScores(oldScores, newScores);

      writeScoresFile(newScoresCompared);
    }
  });
}

function ensureProperScoresTypes(scores) {
  scores.forEach((score) => {
    const currScore = score;

    Object.keys(currScore).forEach((key) => {
      if (key === 'homeScore' || key === 'awayScore') {
        currScore[key] = parseInt(currScore[key], 10);
      } else if (key === 'final') {
        currScore[key] = currScore[key] === 'true';
      }
    });
  });

  return scores;
}

function checkIfScoresFileExists(newScores) {
  const newScoresTyped = ensureProperScoresTypes(newScores);

  fs.access(scoresFilePath, (err) => {
    if (err) {
      writeScoresFile(newScoresTyped);
    } else {
      getExistingScores(newScoresTyped);
    }
  });
}

function scoresDataToObject(scoresRaw) {
  const headers = scoresRaw[0];
  const scores = [];

  for (let i = 1; i < scoresRaw.length; i += 1) {
    const score = {};

    for (let j = 0; j < scoresRaw[i].length; j += 1) {
      score[headers[j]] = scoresRaw[i][j];
      score.didJustUpdate = false;
    }

    scores.push(score);
  }

  return scores;
}

function buildScoresData(data) {
  const scoresRaw = data.values;
  const scores = scoresDataToObject(scoresRaw);

  checkIfScoresFileExists(scores);
}

function getScoresFromSpreadsheet(auth) {
  const sheets = google.sheets('v4');

  sheets.spreadsheets.values.get({
    auth,
    range: 'A1:J',
    spreadsheetId: GOOGLE_SPREADSHEET_KEY,
  }, (err, data) => {
    if (err) {
      logger.log('info', err);
    } else {
      buildScoresData(data);
    }
  });
}

schedule.scheduleJob(SCRAPER_INTERVAL, () => {
  getScoresFromSpreadsheet(getAuth());
});
