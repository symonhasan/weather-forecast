import React from "react";
import "./CityInfo.css";
import { connect } from "react-redux";

const convertTemp = (temp) => {
  return Math.floor(temp - 273.15);
};

const CityInfo = (props) => {
  let imgUrl = "";
  let temperature = "";
  let country = "";
  let highTemp = "",
    lowTemp = "",
    feelLike = "";

  if (props.userCurrLocData) {
    console.log(props.userCurrLocData);
    if (props.userCurrLocData.weather) {
      imgUrl = `http://openweathermap.org/img/wn/${props.userCurrLocData.weather[0].icon}@4x.png`;
    }
    if (props.userCurrLocData.main) {
      temperature = convertTemp(props.userCurrLocData.main.temp);
      highTemp = convertTemp(props.userCurrLocData.main.temp_max);
      lowTemp = convertTemp(props.userCurrLocData.main.temp_min);
      feelLike = convertTemp(props.userCurrLocData.main.feels_like);
    }
    if (props.userCurrLocData.sys) {
      country = props.userCurrLocData.sys.country;
    }
  }

  return (
    <div className="city-card">
      <div className="city-card-left">
        <img src={imgUrl} alt="" style={{borderRight:"2px solid #ccc"}}/>
        <div className="city-card-info">
          <p className="city-name">
            {props.userCurrLocData.name} , {country}
          </p>
          <p className="city-temp">
            {temperature}
            <sup>&deg;C</sup> <sup>|</sup> <sup>&deg;F</sup>
          </p>
          <div className="city-temp-additional">
            <span className="fas fa-temperature-low"> {lowTemp}&deg;<br></br><p>Min Temp</p></span>
            &nbsp;
            <span className="fas fa-temperature-high"> {highTemp}&deg;<br></br><p>Max Temp</p></span>
            &nbsp;
            <span className="fas fa-thermometer-three-quarters"> {feelLike}&deg;<br></br><p>Feels Like</p></span>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userCurrLocData: state.userCurrLocData,
  };
};

export default connect(mapStateToProps)(CityInfo);
