import React from "react";
import { NavLink } from "react-router-dom";
import "../App.css";

function NavBar() {
  return (
    <nav>
      <NavLink to={`/tasks`}>All Tasks</NavLink>
      <NavLink to={`/create-task`}>Create tasks</NavLink>
    </nav>
  );
}

export default NavBar;
