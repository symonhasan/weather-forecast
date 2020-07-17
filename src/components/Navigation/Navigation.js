import React from "react";
import "./Navigation.css";

const Navigation = (props) => {
  return (
    <div className="top-nav">
      <p className="top-nav-title">
        <span className="fas fa-bars"></span> Weather Forecast
      </p>
      <input className="top-nav-search" type="text" placeholder="Search Location , City..." />
    </div>
  );
};

export default Navigation;
