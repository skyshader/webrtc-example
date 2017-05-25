import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from '../containers/App';
import VideoChat from '../containers/VideoChat';
import NotFound from '../components/NotFound';

function RouteManager() {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={NotFound} />
        <Route path="call/from/:from/to/:to" component={VideoChat} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  );
}

export default RouteManager;
