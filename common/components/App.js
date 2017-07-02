import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Block } from '../sharedStyles';

const App = ({ children }) => (
  <Block>
    <Helmet title="React Scoreboard" titleTemplate="%s - React Scoreboard" />
    <Heading>React Scoreboard</Heading>
    {children}
  </Block>
);

App.propTypes = {
  children: PropTypes.element.isRequired,
};

export default App;

const Heading = styled.h1`
  text-align: center;
`;
