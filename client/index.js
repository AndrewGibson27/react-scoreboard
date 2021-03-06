import 'babel-polyfill';
import { trigger } from 'redial';
import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router/lib/Router';
import match from 'react-router/lib/match';
import browserHistory from 'react-router/lib/browserHistory';
import { Provider } from 'react-redux';

import { configureStore } from '../common/store';
import createRoutes from '../common/routes/root';

const initialState = window.INITIAL_STATE || {};
const store = configureStore(initialState);

const render = () => {
  const { pathname, search, hash } = window.location;
  const location = `${pathname}${search}${hash}`;
  const routes = createRoutes(store);

  match({ routes, location }, () => {
    ReactDOM.render(
      <Provider store={store}>
        <Router routes={routes} history={browserHistory} key={Math.random()} />
      </Provider>,
      document.getElementById('root'),
    );
  });

  return browserHistory.listen((location) => {
    match({ routes, location }, (error, redirectLocation, renderProps) => {
      if (error) {
        console.log(error);
      }

      const { components } = renderProps;

      const locals = {
        path: renderProps.location.pathname,
        query: renderProps.location.query,
        params: renderProps.params,
        store,
      };

      trigger('fetch', components, locals);
      trigger('defer', components, locals);
    });
  });
};

const unsubscribeHistory = render();

if (module.hot) {
  module.hot.accept('../common/routes/root', () => {
    unsubscribeHistory();
    setTimeout(render);
  });
}
