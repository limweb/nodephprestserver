'use strict';
require('es6-promise').polyfill();
require('isomorphic-fetch');
import 'isomorphic-fetch';
import React, { Component } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import rootReducer from "./share/redux/reducers";
import finalCreateStore from './share/redux/store'
const store = finalCreateStore(rootReducer);
import routes from './share/routes';
render(
  <Provider  store={ store }>
    <div>
      <Router routes={routes} history={browserHistory} />
    </div>  
  </Provider>,
document.getElementById('content'))