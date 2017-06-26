import { provideHooks } from 'redial';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Slider from 'react-slick';

import ScoreListItem from '../components/ScoreListItem';
import loadScores from '../actions';
import { selectScores } from '../reducer';
import {
  ErrorMessage,
  Loader,
} from '../../../sharedStyles';

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
      <div>
        <Helmet title="React Scoreboard" />

        {scores.error &&
          <ErrorMessage>
            No scores are available at this time.
          </ErrorMessage>}

        {!scores.error &&
          <Loader isLoading={scores.isLoading}>
            <Slider {...settings}>
              {scores.data.map(score =>
                <div key={score.id}>
                  <ScoreListItem score={score} />
                </div>
              )}
            </Slider>
          </Loader>}

        {this.props.children}
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
  onInterval: PropTypes.func.isRequired,
  children: PropTypes.element,
};

export default provideHooks(redial)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ScoreListPage),
);
