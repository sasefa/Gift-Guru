import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        GiftGenius
      </Link>
      <ul className="navbar-nav">
        <li>
          <NavLink to="/home" activeClassName="active" className="nav-link">
            Home
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
          <NavLink to="/reminders" activeClassName="active" className="nav-link">
            Reminders
          </NavLink>
        </li>
        {/* Additional navigation links as per requirement */}
      </ul>
    </nav>
  );
}

export default Navbar;
