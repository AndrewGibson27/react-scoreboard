import { provideHooks } from 'redial';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import ScoresListItem from '../components/ScoresListItem';
import loadScores from '../actions';
import { selectScores } from '../reducer';

const redial = {
  fetch: ({ dispatch }) => dispatch(loadScores()),
};

const mapStateToProps = (state) => {
  return {
    scores: selectScores(state),
  };
};

const ScoresList = ({ scores }) => (
  <div>
    <Helmet title="Scores" />
    {scores.isLoading &&
      <div>
        <h2>Loading...</h2>
      </div>}
    {!scores.isLoading &&
      scores.data.map(score => <ScoresListItem key={score.id} score={score} />)}
  </div>
);

ScoresList.PropTypes = {
  scores: PropTypes.array.isRequired,
};

export default provideHooks(redial)(connect(mapStateToProps)(ScoresList));
