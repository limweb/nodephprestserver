import express                   from 'express';
import React                     from 'react';
import { renderToString }        from 'react-dom/server'
import { RouterContext, match } from 'react-router';
import createLocation            from 'history/lib/createLocation';
import routes                    from '../share/routes';
import { Provider }              from 'react-redux';
import promiseMiddleware         from '../share/lib/promiseMiddleware';
import rootReducer 					 from "../share/redux/reducers";
import thunk from 'redux-thunk'
import fetchComponentData        from '../share/lib/fetchComponentData';
import { createStore,
         combineReducers,
         applyMiddleware }       from 'redux';
import path                      from 'path';

const app = express();
// app.use(favicon(path.join(__dirname, '../../public/images/favicon.ico')));
app.use(express.static('public'));
// app.use(express.static(path.join(__dirname, '/dist')));

app.use( (req, res) => {
  const location = createLocation(req.url);
  const store    = applyMiddleware(thunk)(createStore)(rootReducer);

  match({ routes, location }, (err, redirectLocation, renderProps) => {
    if(err) {
      console.error(err);
      return res.status(500).end('Internal server error');
    }

    if(!renderProps)
      return res.status(404).end('Not found');



    function renderView() {
      const InitialView = (
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );

      const componentHTML = renderToString(InitialView);

      const initialState = store.getState();

      const HTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Redux Demo</title>

          <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
          </script>
        </head>
        <body>
          <div id="content">${componentHTML}</div>
          <script type="application/javascript" src="/dist/bundle.js"></script>
        </body>
      </html>
      `;

      return HTML;
    }

    fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
      .then(renderView)
      .then(html => res.end(html))
      .catch(err => res.end(err.message));
  });
});

export default app; 

