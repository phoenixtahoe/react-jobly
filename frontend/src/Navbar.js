import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";

import UserContext from "./UserContext";

import "./Navbar.css";

function NavBar({ logout }) {
  const { currentUser } = useContext(UserContext);
  return (
    <div>
      <Navbar className="m-3" expand="">
        <NavLink exact to="/" className="navbar-brand">
          Jobly
        </NavLink>
        {currentUser ? (
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink to="/companies">Companies</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/jobs">Jobs</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/profile">Profile</NavLink>
            </NavItem>
            <NavItem className="mt-2">
              <NavLink to="/" onClick={logout}>
                Log out {currentUser.first_name || currentUser.username}
              </NavLink>
            </NavItem>
          </Nav>
        ) : (
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink to="/login">Login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/signup">Signup</NavLink>
            </NavItem>
          </Nav>
        )}
      </Navbar>
    </div>
  );
}

export default NavBar;
