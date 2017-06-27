import * as types from '../../constants';

const initialState = {
  data: [],
  lastUpdated: '',
  isLoading: false,
  error: false,
};

export default function scores(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_SCORES_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.LOAD_SCORES_SUCCESS:
      return {
        ...state,
        data: action.data,
        error: false,
        lastUpdated: action.lastUpdated,
        isLoading: false,
      };
    case types.LOAD_SCORES_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    default:
      return state;
  }
}

export const selectScores = state => state.scores;
