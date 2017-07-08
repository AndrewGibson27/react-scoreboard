import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import styled, { keyframes } from 'styled-components';

import { Clearfix } from '../../../sharedStyles';

export default class ScoreListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      didJustUpdate: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { didJustUpdate: nextDidJustUpdate } = nextProps.score;
    const { didJustUpdate: currDidJustUpdate } = this.props.score;

    if (nextDidJustUpdate && !currDidJustUpdate) {
      this.setState({ didJustUpdate: true });
    } else {
      this.setState({ didJustUpdate: false });
    }
  }

  componentDidUpdate() {
    if (this.state.didJustUpdate) {
      setTimeout(() => {
        this.setState({
          didJustUpdate: false,
        });
      }, 5000);
    }
  }

  render() {
    const { score } = this.props;

    return (
      <Item didJustUpdate={this.state.didJustUpdate}>
        <Stripe>
          <p>{score.quarter}</p>
          {score.final && <p>Final</p>}
          {!score.final && <p>{score.timeLeft}</p>}
        </Stripe>
        <ItemInner>
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
          <LinkStyled to={`/scores/${score.id}`}>Details &rarr;</LinkStyled>
        </ItemInner>
      </Item>
    );
  }
}

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

const highlight = keyframes`
  0% {
    background-color: #FFF;
  }

  50% {
    background-color: #fff2c1;
  }

  100% {
    background-color: #FFF;
  }
`;

const Item = styled.div`
  background-color: #FFF;
  width: 175px;
  ${props => (props.didJustUpdate ? `animation: ${highlight} 5s 1;` : '')}
`;

const Stripe = Clearfix.extend`
  background-color: #191944;
  color: #FFF;
  padding: 5px 10px;

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

const ItemInner = styled.div`
  padding: 10px;
`;

const Table = styled.table`
  border-collapse: collapse;
  margin: 0 auto;
  table-layout: fixed;
  width: 100%;

  tr {
    &:not(:first-child) {
      td {
        padding-top: 5px;
      }
    }

    td:first-child {
      width: 70%;
    }

    td:last-child {
      width: 30%;
      text-align: right;
    }
  }
`;

const LinkStyled = styled(Link)`
  display: block;
  font-size: 11px;
  color: #2e9bad;
  text-decoration: none;
  text-transform: uppercase;
  margin-top: 10px;

  &:hover {
    text-decoration: underline;
  }
`;
