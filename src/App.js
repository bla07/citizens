import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Provider} from 'react-redux';

import Routes from './router/Routes';

import store from './store';



export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route component={Routes}/>
          </Switch>
        </Router>
      </Provider>
    )
  }
}

export default App
