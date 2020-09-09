import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import SignIn from "./components/SignIn.js";
import SignUp from "./components/SignUp.js";
import Dashboard from "./components/Dashboard.js";
import LandingPage from "./components/LandingPage.js";

import { PrivateRoute } from "./utilities/authUtils";

function App() {
  const needSignIn = useSelector((state) => !state.authentication.token);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/signin" exact component={SignIn} />
        <PrivateRoute
          path="/dashboard"
          needSignIn={needSignIn}
          exact
          component={Dashboard}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
