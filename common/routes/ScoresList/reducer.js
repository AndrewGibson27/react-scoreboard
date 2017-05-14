import * as types from '../../constants';

const initialState = {
  data: [],
  lastUpdated: null,
  isLoading: false,
  error: null,
};

export default function scores(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_SCORES_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case types.LOAD_SCORES_SUCCESS:
      return {
        ...state,
        data: action.data,
        lastUpdated: action.lastUpdated,
        isLoading: false,
      };
    case types.LOAD_SCORES_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}

export const selectScores = state => state.scores;
