import { provideHooks } from 'redial';
import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Grid from 'grid-styled';

import ScoreListItem from '../components/ScoreListItem';
import loadScores from '../actions';
import { selectScores } from '../reducer';

const redial = {
  fetch: ({ dispatch }) => dispatch(loadScores()),
};

const mapStateToProps = state => (
  { scores: selectScores(state) }
);

const ScoreListPage = (props) => {
  const scores = props.scores;

  return (
    <div>
      <Helmet title="React Scoreboard" />
      {!scores.isLoading &&
        <section>
          {scores.data.map(score =>
            <Grid lg={1/6} key={score.id}>
              <ScoreListItem score={score} />
            </Grid>
          )}
        </section>}
      {scores.isLoading && <p>Loading...</p>}
      {props.children}
    </div>
  )
};

ScoreListPage.propTypes = {
  scores: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    data: PropTypes.array.isRequired,
    error: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.element.isRequired,
};

export default provideHooks(redial)(connect(mapStateToProps)(ScoreListPage));
