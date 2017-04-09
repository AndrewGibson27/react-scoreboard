import React from 'react';
import Helmet from 'react-helmet';

const App = ({ children }) => (
  <div>
    <Helmet title='React Production Starter' titleTemplate='%s - React Production Starter' />
    <h1>React Production Starter</h1>
    {children}
  </div>
);

export default App;
