import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';
import DefaultAside from './DefaultAside';
import DefaultFooter from './DefaultFooter';
import DefaultHeader from './DefaultHeader';
// History of routes
import { history } from '../../_helpers';

import Loadable from 'react-loadable'
import { PrivateRoute } from '../../_components';

import { TimeTracker } from '../../TimeTracker';

import { userActions } from '../../_actions';

function Loading() {
  return <div>Loading...</div>;
}


class DefaultLayout extends Component {
  
  constructor(props) {
    super(props);

      const { dispatch } = this.props;
      history.listen((location, action) => {
        dispatch(userActions.verifySession())
      });
  }
  
  render() {
    const { loggedIn } = this.props;
    if (!loggedIn){
      console.log("dEFAULT ALYUOUT")
      return <Redirect to="/login" />      
    }
    else
      return (
      <div className="app">
        <AppHeader fixed>
          <DefaultHeader />
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <AppSidebarNav navConfig={navigation} {...this.props} />
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            
            <AppBreadcrumb appRoutes={routes}/>
            <Container fluid>
              <Switch history={history}>
                <Route exact path="/track" component={ TimeTracker } />
                {routes.map((route, idx) => {
                    return route.component ? (
                      <Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                        <route.component {...props} />
                      )} />)
                      : (null);
                  },
                )}
                <Redirect from="/" to="/track" />
              </Switch>
            </Container>
            
          </main>
          <AppAside fixed hidden>
            <DefaultAside />
          </AppAside>
        </div>
        <AppFooter>
          <DefaultFooter />
        </AppFooter>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loggedIn } = state.authentication;
  return {
    loggedIn
  };
}

const connectedDefaultLayout = connect(mapStateToProps)(DefaultLayout);

export default connectedDefaultLayout;
