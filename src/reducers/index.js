import { combineReducers } from 'redux';
import alert from './alert';
import stolencase from './stolencase';
import police from './police';

export default combineReducers({
  alert,
  stolencase,
  police,
});
