import { Router } from 'express';
import fs from 'fs';

import config from '../config';
import logger from '../log';

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
  return new Date();
}

router.get('/scores', (req, res) => {
  readScoresFile((data) => {
    res.status(200).json({
      scores: JSON.parse(data),
      lastUpdated: getTimestamp(),
    });
  }, (err) => {
    logger.log('info', err);
    res.status(500).json({
      error: 'unexpected error',
    });
  });
});

router.get('/score/:id', (req, res) => {
  readScoresFile((data) => {
    const score = getOneScore(JSON.parse(data), req.params.id);

    if (score.id === 'not found') {
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
    logger.log('info', err);
    res.status(500).json({
      error: 'unexpected error',
    });
  });
});

export default router;
