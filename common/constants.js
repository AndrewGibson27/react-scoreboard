/* scoresList

// state
const scoresList = {
  lastUpdated: '',
  data: [
    {
      id: '0',
      homeTeam: '',
      awayTeam: '',
      homeScore: 0,
      awayScore: 0,
      quarter: 1,
      final: false,
      timeLeft: '10:03',
      didJustUpdate: false
    }
  ]
};

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
export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

// Single Post
export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';
