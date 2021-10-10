import React, { useContext } from "react";
import { Link } from "react-router-dom";

import UserContext from "./UserContext";

function Home() {
  const { currentUser } = useContext(UserContext);
  return (
    <section>
      <div className="text-center">
        <h1 className="font-weight-bold">
          <strong>Jobly</strong>
        </h1>
        <p className="lead">All the jobs in one, convenient place.</p>
        {currentUser ? (
          <h2>
            Welcome Back, {currentUser.firstName || currentUser.username}!
          </h2>
        ) : (
          <p>
            <Link className="m-2 btn btn-primary font-weight-bold" to="/login">
              Login
            </Link>
            <Link className="m-2 btn btn-primary font-weight-bold" to="/signup">
              Sign up
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}

export default Home;
