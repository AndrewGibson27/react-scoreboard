import { Router } from 'express';
import fs from 'fs';

import config from '../config';

const { scoresFilePath } = config;
const router = new Router();

function readScoresFile(callback, errCallback) {
  fs.readFile(scoresFilePath, (err, data) => {
    if (err) {
      errCallback(err);
    } else {
      callback(data);
    }
  });
}

function getOneScore(scores, id) {
  return scores.find(score => score.id === id) || { id: 'not found' };
}

function getTimestamp() {
  const now = new Date();
  return now.toISOString();
}

router.get('/scores', (req, res) => {
  readScoresFile((data) => {
    res.status(200).json({
      scores: JSON.parse(data),
      lastUpdated: getTimestamp(),
    });
  }, (err) => {
    res.status(404).json({
      error: err,
    });
  });
});

router.get('/score/:id', (req, res) => {
  readScoresFile((data) => {
    const score = getOneScore(JSON.parse(data), req.params.id);

    if (score === 'not found') {
      res.status(404).json({
        error: 'record not found',
      });
    } else {
      res.status(200).json({
        score,
        lastUpdated: getTimestamp(),
      });
    }
  }, (err) => {
    res.status(200).json({
      error: err,
    });
  });
});

export default router;
