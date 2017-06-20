import { provideHooks } from 'redial';
import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

import loadScore from '../actions';
import { selectCurrentScore } from '../reducer';

const redial = {
  fetch: ({ store: { dispatch }, params: { id } }) => dispatch(loadScore(id)),
};

const mapStateToProps = state => (
  { currentScore: selectCurrentScore(state) }
);

const ScorePage = ({ currentScore }) => (
  <div>
    {currentScore.isLoading && <p>Loading...</p>}
    {!currentScore.isLoading && <p>{currentScore.data.id}</p>}
  </div>
);

ScorePage.propTypes = {
  currentScore: PropTypes.shape({
    homeTeam: PropTypes.string.isRequired,
    awayTeam: PropTypes.string.isRequired,
    homeScore: PropTypes.number.isRequired,
    awayScore: PropTypes.number.isRequired,
    homeHighScorer: PropTypes.string.isRequired,
    awayHighScorer: PropTypes.string.isRequired,
    quarter: PropTypes.string.isRequired,
    timeLeft: PropTypes.string.isRequired,
    final: PropTypes.bool.isRequired,
  }).isRequired,
};

export default provideHooks(redial)(connect(mapStateToProps)(ScorePage));
