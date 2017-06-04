import {
  LOAD_SCORE_REQUEST,
  LOAD_SCORE_SUCCESS,
  LOAD_SCORE_FAILURE,
} from '../../constants';

export default function loadScore(id) {
  return (dispatch, getState, { axios }) => {
    const { protocol, host } = getState().sourceRequest;

    dispatch({
      type: LOAD_SCORE_REQUEST,
    });

    return axios.get(`${protocol}://${host}/api/score/${id}`)
      .then((res) => {
        dispatch({
          type: LOAD_SCORE_SUCCESS,
          data: res.data.score,
          lastUpdated: res.data.lastUpdated,
        });
      })
      .catch(() => {
        dispatch({
          type: LOAD_SCORE_FAILURE,
          error: true,
        });
      });
  };
}
