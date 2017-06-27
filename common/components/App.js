import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Block } from '../sharedStyles';

const Heading = styled.h1`
  text-align: center;
`;

const App = ({ children }) => (
  <Block>
    <Helmet title="React Production Starter" titleTemplate="%s - React Production Starter" />
    <Heading>React Scoreboard Demo</Heading>
    {children}
  </Block>
);

App.propTypes = {
  children: PropTypes.element.isRequired,
};

export default App;
