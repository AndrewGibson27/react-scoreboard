import { injectAsyncReducer } from '../../store';

if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

export default function createRoutes(store) {
  return {
    path: 'scores',

    getComponents(location, cb) {
      require.ensure([
        './containers/ScoresList',
        './reducer',
      ], (require) => {
        const ScoresList = require('./containers/ScoresList').default;
        const scoresReducer = require('./reducer').default;

        injectAsyncReducer(store, 'scores', scoresReducer);
        cb(null, ScoresList);
      });
    },
  };
}
