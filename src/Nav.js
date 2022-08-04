import "./App.css";
import React from "react";
import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <div>
      <nav>
        <div>
          <ul>
            <li>
              <NavLink to="/home">Home</NavLink>
            </li>
            <li>
              <NavLink to="/addticker">Add Ticker</NavLink>
            </li>
            <li>
              <NavLink to="/view">View</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
