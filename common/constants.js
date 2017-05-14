/* scoresList

// state
// actions
{
  type: 'UPDATE_SCORES',
  data: []
}

*/

/* scoreDetail

// state
const scoreDetail = {
  id: '2',
  homeTeam: '',
  awayTeam: '',
  homeScore: 0,
  awayScore: 0,
  homeHighScorer: '',
  awayHighScorer: '',
  quarter: 1,
  final: false,
  timeLeft: '10:03',
  lastUpdated: false
};

// actions
{
  type: 'UPDATE_SCORE',
  data: {}
}

*/

// Posts
export const LOAD_SCORES_REQUEST = 'LOAD_SCORES_REQUEST';
export const LOAD_SCORES_SUCCESS = 'LOAD_SCORES_SUCCESS';
export const LOAD_SCORES_FAILURE = 'LOAD_SCORES_FAILURE';
