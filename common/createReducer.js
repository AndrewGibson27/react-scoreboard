import { combineReducers } from 'redux';

const initialState = {
  host: '',
  protocol: ''
};

const sourceRequest = (state = initialState, action) => state;

export default function createReducer(asyncReducers) {
  return combineReducers({
    sourceRequest,
    ...asyncReducers
  });
}
