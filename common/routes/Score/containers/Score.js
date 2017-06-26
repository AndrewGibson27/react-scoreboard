import { provideHooks } from 'redial';
import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

import loadScore from '../actions';
import { selectCurrentScore } from '../reducer';
import {
  ErrorMessage,
  Loader,
} from '../../../sharedStyles';

const redial = {
  fetch: ({ store: { dispatch }, params: { id } }) => dispatch(loadScore(id)),
};

const mapStateToProps = state => (
  { currentScore: selectCurrentScore(state) }
);

const ScorePage = ({ currentScore }) => (
  <div>
    {currentScore.error &&
      <ErrorMessage>
        No scores are available at this time.
      </ErrorMessage>}

    {!currentScore.error &&
      <Loader isLoading={currentScore.isLoading}>
        <table>
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th>{currentScore.data.awayTeam}</th>
              <th>{currentScore.data.homeTeam}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>High scorer</td>
              <td>{currentScore.data.awayHighScorer}</td>
              <td>{currentScore.data.homeHighScorer}</td>
            </tr>
          </tbody>
        </table>
      </Loader>}
  </div>
);

ScorePage.propTypes = {
  currentScore: PropTypes.shape({
    data: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
  }).isRequired,
};

export default provideHooks(redial)(connect(mapStateToProps)(ScorePage));
