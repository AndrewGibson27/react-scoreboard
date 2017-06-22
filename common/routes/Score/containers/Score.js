import { provideHooks } from 'redial';
import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'grid-styled';

import loadScore from '../actions';
import { selectCurrentScore } from '../reducer';

const redial = {
  fetch: ({ store: { dispatch }, params: { id } }) => dispatch(loadScore(id)),
};

const mapStateToProps = state => (
  { currentScore: selectCurrentScore(state) }
);

const ScorePage = ({ currentScore }) => (
  <Flex wrap>
    <Box
      width={[1/1, 1/2]}
      key={currentScore.id}
      mt={20}
      px={20}
    >
      
    </Box>
    <Box
      width={[1/1, 1/2]}
      key={currentScore.id}
      mt={20}
      px={20}
    >

    </Box>

    {currentScore.isLoading && <p>Loading...</p>}
    {!currentScore.isLoading && <p>{currentScore.data.id}</p>}
  </Flex>
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
