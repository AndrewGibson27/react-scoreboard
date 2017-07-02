import App from '../components/App';

if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

export default function createRoutes(store) {
  return {
    path: '/',

    component: App,

    getIndexRoute(location, cb) {
      require.ensure([], (require) => {
        cb(null, require('./ScoreList').default(store));
      });
    },

    getChildRoutes(location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          require('./ScoreList').default(store),
          require('./NotFound').default,
        ]);
      });
    },
  };
}
