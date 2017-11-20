import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import reducers from './reducers';
import App from './components/App';
import Login from './components/login';

const middlewares = [promise];
const middlewareEnhancer = applyMiddleware(...middlewares);

const storeEnhancers = [middlewareEnhancer];

const composedEnhancer = composeWithDevTools(...storeEnhancers);

const store = createStore(reducers, composedEnhancer)

ReactDOM.render( //most specific routes first in <Switch>
  <Provider store={store}>
     <BrowserRouter>
       <div>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={App} />
         </Switch>
       </div>
     </BrowserRouter>
 </Provider>
, document.querySelector('#root'));;
