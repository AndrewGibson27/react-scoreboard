import * as types from '../../constants';

const initialState = {
  error: false,
  isLoading: false,
  data: {},
};

export default function currentScore(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_SCORE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.LOAD_SCORE_SUCCESS:
      return {
        ...state,
        data: action.data,
        error: false,
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
