import React from 'react'
import { Route } from 'react-router'
import {App, Counter, Dispcount } from './components'

export default (
      <Route path="/" component={App}>
        <Route path="/counter" component={Counter}/>
      </Route>
);