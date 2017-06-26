import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  font-family: Helvetica, Arial, sans-serif;
`;

const Heading = styled.h1`
  text-align: center;
`;

const App = ({ children }) => (
  <Wrapper>
    <Helmet title="React Production Starter" titleTemplate="%s - React Production Starter" />
    <Heading>React Scoreboard Demo</Heading>
    {children}
  </Wrapper>
);

App.propTypes = {
  children: PropTypes.element.isRequired,
};

export default App;
