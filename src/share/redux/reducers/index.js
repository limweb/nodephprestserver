import { combineReducers } from 'redux'

import counter from './counter';
import todos from './todos';
import employee from './employee';
import testdata from './testdata';


//rootreducer
export default combineReducers({
  counter,
  todos,
  employee,
  testdata,
})