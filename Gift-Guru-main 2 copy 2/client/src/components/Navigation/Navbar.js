import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        GiftGenius
      </Link>
      <ul className="navbar-nav">
        <li>
          <NavLink to="/" activeClassName="active" className="nav-link">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" activeClassName="active" className="nav-link">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/register" activeClassName="active" className="nav-link">
            Register
          </NavLink>
        </li>
        <li>
          <NavLink to="/giftlist" activeClassName="active" className="nav-link">
            Gift List
          </NavLink>
        </li>
        <li>
          <NavLink to="/recommendations" activeClassName="active" className="nav-link">
            Recommendations
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" activeClassName="active" className="nav-link">
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink to="/questionnaire" activeClassName="active" className="nav-link">
            Questionnaire
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
