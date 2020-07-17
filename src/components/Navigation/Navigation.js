import React, { useState } from "react";
import "./Navigation.css";

const Navigation = (props) => {
  const [searchData, setSearchData] = useState("");

  const searchOnChangeHandler = (e) => {
    setSearchData(e.target.value);
  };
  const searchOnEnterKeyPressHandler = (e) => {
    
  };

  return (
    <div className="top-nav">
      <p className="top-nav-title">
        <span className="fas fa-bars"></span> Weather Forecast
      </p>
      <input
        className="top-nav-search"
        type="text"
        placeholder="Search Location , City..."
        value={searchData}
        onChange={searchOnChangeHandler}
        onKeyPress={(e) =>
          e.key === "Enter" ? searchOnEnterKeyPressHandler() : null
        }
      />
    </div>
  );
};

export default Navigation;
