import * as types from '../../constants';

const initialState = {
  error: false,
  isLoading: false,
  lastUpdated: '',
  data: {},
};

export default function currentScore(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_SCORE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case types.LOAD_SCORE_SUCCESS:
      return {
        ...state,
        data: action.data,
        error: false,
        lastUpdated: action.lastUpdated,
        isLoading: false,
      };
    case types.LOAD_SCORE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    default:
      return state;
  }
}

export const selectCurrentScore = state => state.currentScore;
