import { ADD_POLICE, POLICE_ERROR, GET_POLICE } from '../actions/types';

const initialState = {
  police: [],
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_POLICE:
      return {
        ...state,
        police: [payload, ...state.police],
      };
    case GET_POLICE:
      return {
        ...state,
        police: payload,
      };
    case POLICE_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
}
