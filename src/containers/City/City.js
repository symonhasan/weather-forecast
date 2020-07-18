import React, { Component } from "react";
import "../Home/Home.css";
import { connect } from "react-redux";
import Navigation from "../../components/Navigation/Navigation";
import CityWeather from "../../components/CityWeather/CityWeather";
import { setHomeClass } from "../../utils/utils";

class City extends Component {
  componentDidMount() {
    const API_KEY = "4d67ae696f5ec0d7e0287b173d413c6b";
    const { location } = this.props.match.params;
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;
    fetch(URL)
      .then((response) => {
        return response.json();
      })
      .then((resData) => {
        if (resData.cod === 200) {
          const bgClass = setHomeClass(resData.weather[0].id);
          this.props.setUserCurrentLocationWeather(resData, bgClass);
          this.props.setUserCurrentLocation({
            coords: {
              latitude: resData.coord.lat,
              longitude: resData.coord.lon,
            },
          });
        } else {
          alert("City not found!");
          this.props.history.push("/");
        }
      })
      .catch((err) => {
        throw err;
      });
  }

  render() {
    return (
      <div className={this.props.bgClass}>
        <Navigation history={this.props.history} />
        <CityWeather />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(City);
