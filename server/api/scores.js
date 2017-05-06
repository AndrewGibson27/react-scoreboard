import { Router } from 'express';
import fs from 'fs';

import config from '../config';

const { scoresFilePath } = config;
const router = new Router();

function readScoresFile(callback, errCallback) {
  fs.readFile(scoresFilePath, (err, data) => {
    if (err) {
      errCallback();
    } else {
      callback(data);
    }
  });
}

router.get('/scores', (req, res) => {
  const noScores = [];

  readScoresFile((data) => {
    res.status(200).json(JSON.parse(data));
  }, () => {
    res.status(200).json(noScores);
  });
});

router.get('/score/:id', (req, res) => {
  setTimeout(() => {
    res.status(200).json();
  }, 300);
});

export default router;
