import React, { Component } from "react";
import "./Home.css";
import { connect } from "react-redux";
import Navigation from "../../components/Navigation/Navigation";
import CityWeather from "../../components/CityWeather/CityWeather";

class Home extends Component {
  setHomeClass(id) {
    let bgClass = "";
    if (id >= 801 && id <= 804) bgClass = "cloud-bg";
    else if (id === 800) bgClass = "sunny-bg";
    else if (id >= 200 && id <= 232) bgClass = "thunder-bg";
    else if (id >= 600 && id <= 622) bgClass = "snow-bg";
    else if (id >= 500 && id <= 531) bgClass = "rain-bg";
    else if (id >= 300 && id <= 321) bgClass = "thunder-bg";
    else if (id === 741) bgClass = "fog-bg";
    else bgClass = "def-bg";
    return bgClass;
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.props.setUserCurrentLocation(position);
      const userLatitude = this.props.userLatitude;
      const userLongitude = this.props.userLongitude;
      const API_KEY = "4d67ae696f5ec0d7e0287b173d413c6b";
      const URL = `http://api.openweathermap.org/data/2.5/weather?lat=${userLatitude}&lon=${userLongitude}&appid=${API_KEY}`;
      fetch(URL)
        .then((response) => {
          return response.json();
        })
        .then((resData) => {
          const bgClass = this.setHomeClass(resData.weather[0].id);
          this.props.setUserCurrentLocationWeather(resData, bgClass);
        })
        .catch((err) => {
          throw err;
        });
    });
  }

  render() {
    return (
      <div className={this.props.bgClass}>
        <Navigation />
        <CityWeather />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userLatitude: state.userLatitude,
    userLongitude: state.userLongitude,
    userCurrLocData: state.userCurrLocData,
    bgClass: state.bgClass,
  };
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
