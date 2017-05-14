import React from 'react';
import { Link } from 'react-router';

const ScoresListItem = ({ score }) => (
  <div>
    <h3><Link to={`/score/${score.id}`}> {score.homeScore} </Link></h3>
  </div>
);

export default ScoresListItem;
