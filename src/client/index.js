'use strict';
require('es6-promise').polyfill();
// require('isomorphic-fetch');
import 'isomorphic-fetch';

import React, { Component } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import rootReducer from "../share/redux/reducers";
import finalCreateStore from '../share/redux/store'
import immutifyState        from '../share/lib/immutifyState';
import routes from '../share/routes';
import { createStore,
         combineReducers,
         applyMiddleware }       from 'redux';
import thunk from 'redux-thunk'

process.env = { NODE_ENV: 'production'  };

// const initialState = immutifyState(window.__INITIAL_STATE__);
const initialState = window.__INITIAL_STATE__;
// const store = finalCreateStore(rootReducer,initialState);

// const store = createStore(rootReducer,applyMiddleware(thunk,mymiddware,apiMiddleware))
const store   = applyMiddleware(thunk)(createStore)(rootReducer, initialState);

render(
  <Provider  store={ store }>
    <div>
      <Router children={routes} history={browserHistory} />
    </div>  
  </Provider>,
document.getElementById('content'))

// <Router routes={routes} history={browserHistory} />