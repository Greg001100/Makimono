import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SignIn from "./components/SignIn.js";
import SignUp from "./components/SignUp.js";
import NoteEditor from "./components/NoteEditor.js";
import Dashboard from "./components/Dashboard.js";
import LandingPage from "./components/LandingPage.js";
import { baseUrl } from './config';

import { PrivateRoute } from "./utilities/authUtils";
import { setCSRF } from "./actions/authentication.js";

function App() {
  const needSignIn = useSelector((state) => !state.authentication.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const getCSRF = async () => {
      const response = await fetch(`${baseUrl}/user/csrf`, {
        method: "get",
        credentials:'include',
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const cookieValue = document.cookie
          .split("; ")
          .find((row) => row.startsWith("csrf_token"))
          .split("=")[1];
        dispatch(setCSRF(cookieValue));
      };
    };
    getCSRF();
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/editor" exact component={NoteEditor} />
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
