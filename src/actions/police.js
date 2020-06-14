import axios from 'axios';
import { setAlert } from './alert';
import { ADD_POLICE, POLICE_ERROR, GET_POLICE } from './types';

//Add police
export const addPolice = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    const res = await axios.post('/api/police', formData, config);

    dispatch({ type: ADD_POLICE, payload: res.data });
    dispatch(setAlert('Police Added', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: POLICE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//Get All Police
export const getAllPolice = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/police');
    dispatch({ type: GET_POLICE, payload: res.data });
  } catch (err) {
    dispatch({
      type: POLICE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
