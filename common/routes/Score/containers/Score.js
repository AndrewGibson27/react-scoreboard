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
    {!currentScore.isLoading &&
      <table>
        <tr>
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th>{currentScore.awayTeam}</th>
              <th>{currentScore.homeTeam}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>High scorer</td>
              <td>{currentScore.awayHighScorer}</td>
              <td>{currentScore.homeHighScorer}</td>
            </tr>
          </tbody>
        </tr>
      </table>}
    {currentScore.isLoading && <p>Loading...</p>}
  </div>
);

ScorePage.propTypes = {
  currentScore: PropTypes.shape({
    homeTeam: PropTypes.string.isRequired,
    awayTeam: PropTypes.string.isRequired,
    homeHighScorer: PropTypes.string.isRequired,
    awayHighScorer: PropTypes.string.isRequired,
  }).isRequired,
};

export default provideHooks(redial)(connect(mapStateToProps)(ScorePage));
