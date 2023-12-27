import React from "react";
import { NavLink } from "react-router-dom";

const Navlinks = ({ title, link }) => {
  return (
    <NavLink to={link} className="text-decoration-none text-dark mx-2">
      {title}
    </NavLink>
  );
};

export default Navlinks;
