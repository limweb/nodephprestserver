// serverRendering.js
'use strict';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './rootReducer';
import routes from './routes'
import prefetchComponentData from './prefetchComponentData';
const store = createStore(rootReducer);


 
export default function(req, res) {

    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    console.log('Server Render--->');
    if (error) {
      console.log('Error 500');
      res.status(500).end(error.message);
    } else if (redirectLocation) {
      console.log('RedirectLocation');
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (!renderProps) {
      console.log('renderProps not Found');
      res.status(404).end('Not found');
    }
      //no redux
      // res.status(200).end(renderToString(<RouterContext {...renderProps } />)); 
      
    

    //   prefetchComponentData(store.dispatch, renderProps.components, renderProps.params)
    //   .then(() => res.status(200).end(renderHTML()))
    //   .catch(err => res.end(err.message));
    //   
    //   
      
    // res.status(200).end(renderHTML()); // test -- see test
    const InitialComponent = (
        <Provider store={store}>
                <RouterContext {...renderProps} />
              </Provider>
    );
    
    const initialState = store.getState();

    function renderHTML() {
      console.log('render-html');
      // const renderedComponent = '+++Test+++';  //-- test--
      const renderedComponent = renderToString(InitialComponent);
        // <Provider store={store}>
        //   <RouterContext {...renderProps} />
        // </Provider>
      // );
            // <script type="application/javascript">
            //   window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
            // </script>
     
      const HTML = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <title>Isomorphic React Redux Tutorial</title>
          <!--     <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
          <script src="http://code.jquery.com/jquery-latest.js" type="text/javascript"></script>
          <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
          <script type='text/javascript' src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.24/browser.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.2/react.js" type="text/javascript"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.2/react-with-addons.js" type="text/javascript"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.2/react-dom.js" type="text/javascript"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/redux/3.3.1/redux.min.js" type="text/javascript" charset="utf-8"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/react-redux/4.4.0/react-redux.min.js" type="text/javascript"></script>
          <script src="http://momentjs.com/downloads/moment.js" type="text/javascript"></script> -->
          <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
          </script> 
          </head>
          <body>
          <div id="coutent">${renderedComponent}</div> 
          <script src="./dist/bundle.js" type="text/javascript" charset="utf-8"></script> 
          </body>
          </html>`;

      return HTML;
    }


    }) // end of match
}
