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
import sliderSettings from '../vendor/sliderSettings';
import { Block, ErrorMessage, Loader } from '../../../sharedStyles';

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
  reloadScores: () => {
    dispatch(loadScores());
  },

  setLoading: () => {
    dispatch({
      type: LOAD_SCORES_REQUEST,
    });
  },
});

class ScoreListPage extends Component {
  static formatLastUpdated(lastUpdated) {
    const date = new Date(lastUpdated);
    return date.toLocaleString();
  }

  componentDidMount() {
    setInterval(() => {
      this.props.setLoading();

      setTimeout(() => {
        this.props.reloadScores();
      }, 2000);
    }, INTERVAL);
  }

  render() {
    const { scores, children } = this.props;
    const formattedDate = ScoreListPage.formatLastUpdated(scores.lastUpdated);

    return (
      <div>
        <Helmet title="All Scores" />

        <Block>
          <Updated>
            Last updated: {formattedDate}
          </Updated>
        </Block>

        {scores.error &&
          <ErrorMessage>
            No scores are available at this time.
          </ErrorMessage>}

        {!scores.error &&
          <Block>
            <SliderOuter isLoading={scores.isLoading}>
              <SliderStyled {...sliderSettings}>
                {scores.data.map(score =>
                  <div key={score.id}>
                    <ScoreListItem score={score} />
                  </div>
                )}
              </SliderStyled>
            </SliderOuter>
          </Block>}

        {children}
      </div>
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
  reloadScores: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  children: PropTypes.element,
};


export default provideHooks(redial)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ScoreListPage),
);

const Updated = styled.div`
  text-align: center;
`;

const SliderOuter = Loader.extend`
  background-color: #d8d8d8;
`;

const SliderStyled = styled(Slider)`
  margin: 0 auto;
  max-width: calc(100% - 90px);
  padding: 20px 0;

  .slick-arrow {
    background-color: #2e9bad;
    height: 35px;
    border: none;
    border-radius: 50%;
    color: #FFF;
    display: block;
    font-size: 16px;
    line-height: 35px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 35px;
  }

  .slick-disabled {
    opacity: 0;
  }

  .slick-prev {
    left: -40px;
  }

  .slick-next {
    right: -40px;
  }
`;
