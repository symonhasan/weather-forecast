import React from "react";
import "./Day.css";
import sunrise from "../../assets/icons/sunrise.png";
import sunset from "../../assets/icons/sunset.png";
import { getTodaysDay, getTodaysDate } from "../../utils/utils";

const Day = (props) => {
  return (
    <div className="day-div">
      <div className="day-div-date">
        <p>
          {getTodaysDay()}
          <span>{getTodaysDate()}</span>
        </p>
      </div>
      <span className="dd-type">
        <img src={sunrise} alt="" height="48px" width="48px" />
        <p>
          Sunrise<br></br>
          <span>4:30 AM</span>
        </p>
      </span>
      <span className="dd-type">
        <img src={sunset} alt="" height="48px" width="48px" />
        <p>
          Sunset<br></br>
          <span>5:30 PM</span>
        </p>
      </span>
    </div>
  );
};

export default Day;
