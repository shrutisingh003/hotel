import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">YahoooHotels</h1>
      <Link to={'/hotel'}><button className="filter-btn">Filter</button></Link>
    </nav>
  );
};

export default Navbar;