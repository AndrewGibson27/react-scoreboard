import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import styled from 'styled-components';

import { Clearfix } from '../../../sharedStyles';

const Item = styled.div`
  background-color: #FFF;
  width: 175px;
`;

const Stripe = Clearfix.extend`
  background-color: #191944;
  color: #FFF;
  padding: 5px;

  p {
    font-size: 12px;
    text-transform: uppercase;

    &:first-child {
      float: left;
    }

    &:last-child {
      float: right;
    }
  }
`;

const Table = styled.table`
  padding: 5px 10px;
`;

const ScoreListItem = ({ score }) => (
  <Item>
    <Stripe>
      <p>{score.quarter}</p>
      {score.final && <p>Final</p>}
      {!score.final && <p>{score.timeLeft}</p>}
    </Stripe>
    <Table>
      <tbody>
        <tr>
          <td>{score.homeTeam}</td>
          <td>{score.homeScore}</td>
        </tr>
        <tr>
          <td>{score.awayTeam}</td>
          <td>{score.awayScore}</td>
        </tr>
      </tbody>
    </Table>
    <Link to={`/scores/${score.id}`}>Details</Link>
  </Item>
);

ScoreListItem.propTypes = {
  score: PropTypes.shape({
    id: PropTypes.string.isRequired,
    didJustUpdate: PropTypes.bool.isRequired,
    homeTeam: PropTypes.string.isRequired,
    awayTeam: PropTypes.string.isRequired,
    homeScore: PropTypes.number.isRequired,
    awayScore: PropTypes.number.isRequired,
    quarter: PropTypes.string.isRequired,
    timeLeft: PropTypes.string.isRequired,
    final: PropTypes.bool.isRequired,
  }).isRequired,
};

export default ScoreListItem;
