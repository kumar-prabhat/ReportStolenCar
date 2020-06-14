import axios from 'axios';
import { setAlert } from './alert';
import {
  ADD_STOLENCASE,
  GET_PENDINGCASE,
  GET_RESOLVEDCASE,
  STOLENCASE_ERROR,
  RESOLVE_STOLENCASE,
  CHECK_STOLENCASE,
} from './types';

//Add stolen case
export const addStolenCase = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    const res = await axios.post('/api/stolencase', formData, config);

    dispatch({ type: ADD_STOLENCASE, payload: res.data });
    dispatch(setAlert('Case registered', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: STOLENCASE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//Resolve stolen case
export const resolveStolenCase = (caseId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    const res = await axios.patch(`/api/stolencase/${caseId}`, {}, config);

    dispatch({ type: RESOLVE_STOLENCASE, payload: res.data });
    dispatch(setAlert('Case resolved', 'success'));
  } catch (err) {
    dispatch({
      type: STOLENCASE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//Check stolen case
export const checkCase = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    const res = await axios.patch('/api/stolencase', {}, config);

    dispatch({ type: CHECK_STOLENCASE, payload: res.data });
    dispatch(setAlert('New Case assigned', 'success'));
  } catch (err) {
    dispatch({
      type: STOLENCASE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//Get pending cases
export const getPendingCases = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/stolencase/pending');
    dispatch({ type: GET_PENDINGCASE, payload: res.data });
  } catch (err) {
    dispatch({
      type: STOLENCASE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//Get resolved cases
export const getResolvedCases = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/stolencase/resolved');
    dispatch({ type: GET_RESOLVEDCASE, payload: res.data });
  } catch (err) {
    dispatch({
      type: STOLENCASE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
