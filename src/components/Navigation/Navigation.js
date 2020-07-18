import React, { useState } from "react";
import "./Navigation.css";
import { connect } from "react-redux";
import { setHomeClass } from "../../utils/utils";

const Navigation = (props) => {
  const [searchData, setSearchData] = useState("");

  const searchOnChangeHandler = (e) => {
    setSearchData(e.target.value);
  };
  const searchOnEnterKeyPressHandler = (e) => {
    const API_KEY = "4d67ae696f5ec0d7e0287b173d413c6b";
    const location = searchData;
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;
    fetch(URL)
      .then((response) => {
        return response.json();
      })
      .then((resData) => {
        if (resData.cod === 200) {
          const bgClass = setHomeClass(resData.weather[0].id);
          props.setUserCurrentLocationWeather(resData, bgClass);
          props.setUserCurrentLocation({
            coords: {
              latitude: resData.coord.lat,
              longitude: resData.coord.lon,
            },
          });
          props.history.push(`${searchData}`);
        } else {
          alert("City not found!");
          props.history.push("/");
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <div className="top-nav">
      <p className="top-nav-title" onClick={()=>{props.history.push("/")}}>
        Weather Forecast
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

const mapDispatchToProps = (dispatch) => {
  return {
    setUserCurrentLocation: (locationObj) => {
      dispatch({ type: "SET_USER_LOCATION", payload: locationObj });
    },
    setUserCurrentLocationWeather: (resData, bgClass) => {
      dispatch({
        type: "USER_CLOC_WEATHER",
        payload: { currLocData: resData, bgClass: bgClass },
      });
    },
  };
};

export default connect(null, mapDispatchToProps)(Navigation);
