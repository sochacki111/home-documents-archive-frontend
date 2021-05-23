import { AppBar, Tab, Tabs } from "@material-ui/core";
import React from "react";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import DocumentDetail from "./containers/DocumentDetail/DocumentDetail";
import Documents from "./containers/Documents/Documents";
import Auxiliary from "./hoc/Auxiliary/Auxiliary";

function App() {
  let routes = (
    <Switch>
      <Route path="/documents/:id" component={DocumentDetail} />
      <Route path="/" exact component={Documents} />
      <Redirect to="/" />
    </Switch>
  );
  const routes2 = ["/", "/auth", "/new-document", "/my-documents", "/logout"];
  return (
    <div className="App">
      <Route
        path="/"
        render={(history) => (
          <AppBar>
            <Tabs value={0}>
              <Tab label="Home Documents Archive" component={Link} to={routes2[0]} />
              {/* {isAuthenticated ? ( */}
                <Auxiliary>
                  <Tab label="New Document" component={Link} to={routes2[2]} />
                  <Tab label="My Photos (To delete Route)" component={Link} to={routes2[3]} />
                  <Tab label="Log out" component={Link} to={routes2[4]} />
                </Auxiliary>
              {/* ) : (
                <Tab label="Log in" component={Link} to={routes2[1]} />
              )} */}
            </Tabs>
          </AppBar>
        )}
      />
      {routes}
    </div>
  );
}

export default App;
