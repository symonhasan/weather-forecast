import React, { Component } from "react";
import "./Home.css";
import { connect } from "react-redux";

class Home extends Component {
  componentDidMount() {     
    navigator.geolocation.getCurrentPosition((position) => {
      this.props.setUserCurrentLocation(position);
      this.props.fetchUserCurrentLocationWeather();
    });
  }

  render() {
    return (
      <div className="">
        <h1>{this.props.userLatitude}</h1>
        <h1>{this.props.userLongitude}</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userLatitude: state.userLatitude,
    userLongitude: state.userLongitude,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserCurrentLocation: (locationObj) => {
      dispatch({ type: "SET_USER_LOCATION", payload: locationObj });
    },
    fetchUserCurrentLocationWeather: () => {
      dispatch({type: "USER_CLOC_WEATHER" });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
