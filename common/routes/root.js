import App from '../components/App';
import Home from './Home';

if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

export default function createRoutes(store) {
  return {
    path: '/',

    component: App,

    getChildRoutes(location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          require('./ScoresList').default(store),
          require('./NotFound').default,
        ]);
      });
    },

    indexRoute: {
      component: Home,
    },
  };
}
