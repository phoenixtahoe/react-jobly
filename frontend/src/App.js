import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import jwt from "jsonwebtoken";

import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyDetails";
import NavBar from "./Navbar";
import Home from "./Home";
import JobList from "./JobList";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ProfileForm from "./ProfileForm";
import PrivateRoute from "./PrivateRoute";
import LoadingSpinner from "./LoadingSpinner";

import UserContext from "./UserContext";
import useLocalStorage from "./useLocalStorage";
import JoblyApi from "./Api";

import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [applications, setApplications] = useState(new Set([]));

  const [token, setToken] = useLocalStorage("jobly-token");

  useEffect(() => {
    async function getUser() {
      if (token) {
        try {
          let { username } = jwt.decode(token);

          JoblyApi.token = token;
          let currentUser = await JoblyApi.getUser(username);

          setApplications(new Set(currentUser.applications));
          setCurrentUser(currentUser);
        } catch (err) {
          setCurrentUser(null);
        }
      }
      setLoading(true);
    }
    setLoading(false);
    getUser();
  }, [token]);

  function hasAppliedToJob(id) {
    return applications.has(id);
  }

  function applyToJob(id) {
    if (hasAppliedToJob(id)) {
      return;
    } else {
      JoblyApi.applyToJob(currentUser.username, id);
      setApplications(new Set([...applications, id]));
    }
  }

  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  async function login(data) {
    try {
      let token = await JoblyApi.login(data);
      setToken(token);
      return { success: true };
    } catch (err) {
      return { success: false, errors: err };
    }
  }

  async function signup(data) {
    try {
      let token = await JoblyApi.signup(data);
      setToken(token);
      return { success: true };
    } catch (err) {
      return { success: false, errors: err };
    }
  }

  if (!loading) return <LoadingSpinner />;

  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{ currentUser, setCurrentUser, hasAppliedToJob, applyToJob }}
      >
        <NavBar logout={logout} />
        <main>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            <Route exact path="/login">
              <LoginForm login={login} />
            </Route>

            <Route exact path="/signup">
              <SignupForm signup={signup} />
            </Route>

            <PrivateRoute exact path="/companies">
              <CompanyList />
            </PrivateRoute>

            <PrivateRoute exact path="/jobs">
              <JobList />
            </PrivateRoute>

            <PrivateRoute exact path="/companies/:handle">
              <CompanyDetail />
            </PrivateRoute>

            <PrivateRoute path="/profile">
              <ProfileForm />
            </PrivateRoute>
          </Switch>
        </main>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
