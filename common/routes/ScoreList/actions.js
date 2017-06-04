import {
  LOAD_SCORES_REQUEST,
  LOAD_SCORES_SUCCESS,
  LOAD_SCORES_FAILURE,
} from '../../constants';

export default function loadScores() {
  return (dispatch, getState, { axios }) => {
    const { protocol, host } = getState().sourceRequest;

    dispatch({
      type: LOAD_SCORES_REQUEST,
    });

    return axios.get(`${protocol}://${host}/api/scores`)
      .then((res) => {
        dispatch({
          type: LOAD_SCORES_SUCCESS,
          data: res.data.scores,
          lastUpdated: res.data.lastUpdated,
        });
      })
      .catch(() => {
        dispatch({
          type: LOAD_SCORES_FAILURE,
          error: true,
        });
      });
  };
}
