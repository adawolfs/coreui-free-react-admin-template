import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

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

function Loading() {
  return <div>Loading...</div>;
}


class DefaultLayout extends Component {
  render() {
    if ( !localStorage.getItem('user')){
      console.log("redirect to login")
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

export default DefaultLayout;
