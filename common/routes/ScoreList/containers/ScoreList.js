import { provideHooks } from 'redial';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Slider from 'react-slick';
import styled from 'styled-components';

import ScoreListItem from '../components/ScoreListItem';
import loadScores from '../actions';
import { selectScores } from '../reducer';
import { LOAD_SCORES_REQUEST } from '../../../constants';
import {
  Block,
  ErrorMessage,
  Loader,
} from '../../../sharedStyles';

/**
  Hack so we don't have to run
  server/index.js through Webpack
  during development.

  We're not including slick-theme.css
  so we don't have to deal w/ Webpack's
  file-loader.
*/
if (typeof window !== 'undefined') {
  require('slick-carousel/slick/slick.css');
}

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

  setLoading: () => {
    dispatch({
      type: LOAD_SCORES_REQUEST,
    });
  },
});

class ScoreListPage extends Component {
  componentDidMount() {
    setInterval(() => {
      this.props.setLoading();

      setTimeout(() => {
        this.props.onInterval();
      }, 2000);
    }, INTERVAL);
  }

  render() {
    const { scores } = this.props;
    const settings = {
      dots: false,
      draggable: true,
      infinite: false,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 1,
    };

    return (
      <Block>
        <Helmet title="React Scoreboard" />

        {scores.error &&
          <ErrorMessage>
            No scores are available at this time.
          </ErrorMessage>}

        {!scores.error &&
          <Loader isLoading={scores.isLoading}>
            <StyledSlider {...settings}>
              {scores.data.map(score =>
                <div key={score.id}>
                  <ScoreListItem score={score} />
                </div>
              )}
            </StyledSlider>
          </Loader>}

        {this.props.children}
      </Block>
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
  setLoading: PropTypes.func.isRequired,
  children: PropTypes.element,
};

export default provideHooks(redial)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ScoreListPage),
);

const StyledSlider = styled(Slider)`
  background-color: #DCDCDC;
  padding: 25px 15px;
`;
