import React, { Component } from "react";
import { Switch, withRouter, Route, Redirect } from "react-router-dom";
import { compose } from "recompose";
import Layout from "./components/Layout";
import SplashScreen from "./containers/SplashScreen";
import Login from "./containers/Login";
import Publish from "./containers/Publish";
import Explore from "./containers/Explore";
import ProjectView from "./containers/ProjectView";

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route exact path="/" component={SplashScreen} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/publish" component={Publish} />
          <Route exact path="/explore" component={Explore} />
          <Route
            exact
            path="/explore/project/:projectName"
            component={ProjectView}
          />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </Layout>
    );
  }
}

const enhance = compose(withRouter);

export default enhance(App);
