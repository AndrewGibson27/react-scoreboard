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

function getOneScore(scores, id) {
  return scores.find(score => score.id === id) || 'not found';
}

router.get('/scores', (req, res) => {
  readScoresFile((data) => {
    res.status(200).json(JSON.parse(data));
  }, () => {
    res.status(200).json([]);
  });
});

router.get('/score/:id', (req, res) => {
  readScoresFile((data) => {
    const score = getOneScore(JSON.parse(data), req.params.id);

    if (score === 'not found') {
      res.status(404).send('Record not found');
    } else {
      res.status(200).json(score);
    }
  }, () => {
    res.status(200).json([]);
  });
});

export default router;
