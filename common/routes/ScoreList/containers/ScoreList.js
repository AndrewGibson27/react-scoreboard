import { provideHooks } from 'redial';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { Flex, Box } from 'grid-styled';

import ScoreListItem from '../components/ScoreListItem';
import loadScores from '../actions';
import { selectScores } from '../reducer';

const INTERVAL = 30000;

function shouldFetchScores({ getState }) {
  return getState().scores.data.length === 0;
}

const redial = {
  fetch: ({ store, store: { dispatch } }) => {
    if (shouldFetchScores(store)) {
      return dispatch(loadScores());
    }
    return false;
  },
};

const mapStateToProps = state => (
  { scores: selectScores(state) }
);

const mapDispatchToProps = dispatch => ({
  onInterval: () => {
    dispatch(loadScores());
  },
});

class ScoreListPage extends Component {
  componentDidMount() {
    setInterval(() => {
      this.props.onInterval();
    }, INTERVAL);
  }

  render() {
    const scores = this.props.scores;

    return (
      <Wrapper>
        <Helmet title="React Scoreboard" />
        {!scores.isLoading &&
          <Flex>
            {scores.data.map(score =>
              <Box width={1/6} px={0}>
                <ScoreListItem score={score} />
              </Box>
            )}
          </Flex>}
        {scores.isLoading && <p>Loading...</p>}
        {this.props.children}
      </Wrapper>
    );
  }
}

ScoreListPage.defaultProps = {
  children: null,
};

ScoreListPage.propTypes = {
  scores: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    data: PropTypes.array.isRequired,
    error: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.string.isRequired,
  }).isRequired,
  onInterval: PropTypes.func.isRequired,
  children: PropTypes.element,
};

export default provideHooks(redial)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ScoreListPage),
);
