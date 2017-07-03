import { provideHooks } from 'redial';
import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import loadScore from '../actions';
import { selectCurrentScore } from '../reducer';
import { ErrorMessage, Loader, Block } from '../../../sharedStyles';

const redial = {
  fetch: ({ store: { dispatch }, params: { id } }) => dispatch(loadScore(id)),
};

const mapStateToProps = state => (
  { currentScore: selectCurrentScore(state) }
);

const ScorePage = ({ currentScore }) => (
  <Block>
    {currentScore.error &&
      <ErrorMessage>
        No scores are available at this time.
      </ErrorMessage>}

    {!currentScore.error &&
      <Loader isLoading={currentScore.isLoading}>
        <Score>
          <thead>
            <tr>
              <td />
              <th scope="col">{currentScore.data.homeTeam}</th>
              <th scope="col">{currentScore.data.awayTeam}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">High scorer</th>
              <td>{currentScore.data.homeHighScorer}</td>
              <td>{currentScore.data.awayHighScorer}</td>
            </tr>
          </tbody>
        </Score>
      </Loader>}
  </Block>
);

ScorePage.propTypes = {
  currentScore: PropTypes.shape({
    data: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
  }).isRequired,
};

export default provideHooks(redial)(connect(mapStateToProps)(ScorePage));

const Score = styled.table`
  border-collapse: collapse;
  margin: 0 auto;
  max-width: 600px;
  padding: 0 15px;
  table-layout: fixed;
  width: 95%;

  thead {
    tr:first-child {
      th {
        width: 33%;
        padding-bottom: 10px;
      }
    }
  }

  th {
    text-transform: uppercase;
  }

  td {
    padding: 10px;
    text-align: center;
  }

  tbody {
    tr:nth-child(odd) {
      background-color: #d8d8d8;
    }
  }
`;
