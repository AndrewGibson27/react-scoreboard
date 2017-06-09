import { provideHooks } from 'redial';
import { connect } from 'react-redux';
import React from 'react';

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

export default provideHooks(redial)(connect(mapStateToProps)(ScorePage));
