import { Router } from 'express';
import axios from 'axios';

const router = new Router();

// Remove this
import fakeDB from '../fakeDB.js'

router.get('/scores', (req, res) => {
  // every 30 seconds, hit spreadsheet
  // format data
  // check whether the scores have differed
  // update current stored spreadsheet
  // return data
});

router.get('/score/:id', (req, res) => {
  // hit spreadsheet by ID
  //

  const index = fakeDB.findIndex(el => el.slug === req.params.slug)

  if (index < 0) {
    res.status(404).json({
      error: 'Post does not exist in db'
    })
  }

  setTimeout(() => {
    res.status(200).json(fakeDB[index])
  }, 300)
})

module.exports = router
