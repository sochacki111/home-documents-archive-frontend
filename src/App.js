import { AppBar, Tab, Tabs } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import DocumentDetail from './containers/DocumentDetail/DocumentDetail';
import Documents from './containers/Documents/Documents';
import EditDocument from './containers/EditDocument/EditDocument';
import NewDocument from './containers/NewDocument/NewDocument';
import Auxiliary from './hoc/Auxiliary/Auxiliary';
import * as actions from './store/actions/index';

function App() {
  const routes2 = ['/', '/auth', '/new-document', '/logout'];
  const isAuthenticated = useSelector((state) => state.auth.token !== null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.authCheckState());
  }, [dispatch]);

  let routes = (
    <Switch>
      <Route path="/auth" component={Auth} />
      <Redirect to="/auth" />
    </Switch>
  );

  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/new-document" component={NewDocument} />
        <Route path="/logout" component={Logout} />
        <Route path="/documents/edit/:id" component={EditDocument} />
        <Route path="/documents/:id" component={DocumentDetail} />
        <Route path="/" exact component={Documents} />
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <div className="App">
      <Route
        path="/"
        render={(history) => (
          <AppBar>
            <Tabs value={0}>
              {isAuthenticated ? (
                <Auxiliary>
                  <Tab
                    label="Home Documents Archive"
                    component={Link}
                    to={routes2[0]}
                  />
                  <Tab label="New Document" component={Link} to={routes2[2]} />
                  <Tab label="Log out" component={Link} to={routes2[3]} />
                </Auxiliary>
              ) : (
                <Tab label="Log in" component={Link} to={routes2[1]} />
              )}
            </Tabs>
          </AppBar>
        )}
      />
      {routes}
    </div>
  );
}

export default App;
