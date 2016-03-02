import React from 'react';
import { createStore, bindActionCreators ,combineReducers,applyMiddleware  ,compose} from 'redux'
import { persistState } from'redux-devtools';
import thunk from 'redux-thunk'
import promiseMiddleware         from '../../lib/promiseMiddleware';
import DevTools  from '../../devtools/devtool';

const finalCreateStore = compose(
  // Enables your middleware: thunk,mymiddleware 
  applyMiddleware(thunk), // any Redux middleware, e.g. redux-thunk
  // Provides support for DevTools:
   window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
  // Lets you write ?debug_session=<name> in address bar to persist debug sessions
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);


export default finalCreateStore;