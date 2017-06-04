import { injectAsyncReducer } from '../../store';

if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

export default function createRoutes(store) {
  return {
    path: '/scores/:id',

    getComponents(location, cb) {
      require.ensure([
        './containers/Score',
        './reducer',
      ], (require) => {
        const ScorePage = require('./containers/Score').default;
        const currentScoreReducer = require('./reducer').default;

        injectAsyncReducer(store, 'currentScore', currentScoreReducer);
        cb(null, ScorePage);
      });
    },
  };
}
