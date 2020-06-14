import {
  ADD_STOLENCASE,
  GET_PENDINGCASE,
  GET_RESOLVEDCASE,
  RESOLVE_STOLENCASE,
  CHECK_STOLENCASE,
  STOLENCASE_ERROR,
} from '../actions/types';

const initialState = {
  stolencases: [],
  stolencase: null,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PENDINGCASE:
    case GET_RESOLVEDCASE:
      return {
        ...state,
        stolencases: payload,
      };
    case ADD_STOLENCASE:
      return {
        ...state,
        stolencases: [payload, ...state.stolencases],
      };
    case RESOLVE_STOLENCASE:
    case CHECK_STOLENCASE:
      return {
        ...state,
        stolencase: payload,
      };
    case STOLENCASE_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
}
