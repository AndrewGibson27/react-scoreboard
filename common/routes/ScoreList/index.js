import { injectAsyncReducer } from '../../store';

if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

export default function createRoutes(store) {
  return {
    path: 'scores',

    getComponents(location, cb) {
      require.ensure([
        './containers/ScoreList',
        './reducer',
      ], (require) => {
        const ScoreListPage = require('./containers/ScoreList').default;
        const scoresReducer = require('./reducer').default;

        injectAsyncReducer(store, 'scores', scoresReducer);
        cb(null, ScoreListPage);
      });
    },

    getChildRoutes(location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          require('../Score').default(store),
        ]);
      });
    },
  };
}
