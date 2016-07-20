import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers, bindActionCreators } from 'redux';
import { Provider, connect } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

import logger from 'src/middlewares/logger';

import { AppContainer } from 'src/components/App';
import { HomeContainer } from 'src/components/Home';
import { PortfolioContainer } from 'src/components/Portfolio';
import { PhotoContainer } from 'src/components/Photo';

import appReducer from 'src/reducers/app-reducer.js';

const store = createStore(
  combineReducers({
    routing: routerReducer,
    app: appReducer
  }), applyMiddleware(logger, thunk, routerMiddleware(browserHistory))
);

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={AppContainer}>
        <IndexRoute component={HomeContainer} />
        <Route path="portfolio" component={PortfolioContainer}>
          <Route path=':photoId' component={PhotoContainer} />
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
