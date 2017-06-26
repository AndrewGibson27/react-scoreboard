import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import styled from 'styled-components';

const Item = styled.div`
  padding: 10px;
  background-color: #DCDCDC;
  width: 200px;
`;

const ScoreListItem = ({ score }) => (
  <Item>
    <div>
      <p>{score.quarter}</p>
      {score.isFinal && <p>Final</p>}
      {!score.isFinal && <p>{score.timeLeft}</p>}
    </div>
    <table>
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
    </table>
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
