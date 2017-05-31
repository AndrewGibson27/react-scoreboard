import { combineReducers } from 'redux';

import scores from './routes/ScoresList/reducer';

const initialState = {
  host: '',
  protocol: '',
};

const sourceRequest = (state = initialState, action) => state;

function getEntryRouteReducers(state) {
  const currEntryReducers = {};
  const allEntryReducers = {
    scores,
  };

  Object.keys(state).forEach((key) => {
    if (key !== 'sourceRequest') {
      currEntryReducers[key] = allEntryReducers[key];
    }
  });

  return currEntryReducers;
}

export default function createReducer({
  hydrateState = null,
  asyncReducers = {},
}) {
  let entryRouteReducers = {};

  if (hydrateState) {
    entryRouteReducers = getEntryRouteReducers(hydrateState);
  }

  return combineReducers({
    sourceRequest,
    ...entryRouteReducers,
    ...asyncReducers,
  });
}
