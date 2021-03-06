import React, { Component } from 'react';
import {Redirect, HashRouter, Route, Switch, Router} from 'react-router-dom';
import './App.css';
// Styles
// CoreUI Icons Set
import '@coreui/icons/css/coreui-icons.min.css';
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import './scss/style.css'

import { PrivateRoute } from './_components';

import { connect } from 'react-redux';

// History of routes
import { history } from './_helpers';

// Containers
import { DefaultLayout } from './containers';
// Pages
import { Login, Page404, Page500, Register } from './views/Pages';

import { LoginPage } from './LoginPage';
import { TimeTracker } from './TimeTracker';

// import { renderRoutes } from 'react-router-config';

class App extends Component {
  constructor(props) {
    super(props);

      const { dispatch } = this.props;
      history.listen((location, action) => {
          // clear alert on location change
          //dispatch(alertActions.clear());
      });
  }
  render() {
    const { alert } = this.props;
    return (
      <Router history={history}>
        <Switch >
          <Route exact path="/login" component={LoginPage} />
          <Route path="/" component={DefaultLayout} />
        </Switch>
      </Router>
      /*
        <Switch>
          <Route exact path="/login" name="Login Page" component={LoginPage} />
          <Route exact path="/register" name="Register Page" component={Register} />
          <Route exact path="/404" name="Page 404" component={Page404} />
          <Route exact path="/500" name="Page 500" component={Page500} />
          <Route path="/" name="Home" component={DefaultLayout} />
        </Switch>
      */
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
      alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 
//export default App;

