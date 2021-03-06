const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thrusday",
  "Friday",
  "Saturday",
];

export const convertTempToCelcius = (temp) => {
  return Math.floor(temp - 273.15);
};

export const getTodaysDay = () => {
  return weekDays[new Date().getDay()];
};

export const getTodaysDate = () => {
  const todayDate = new Date().getDate();
  const todayMonth = new Date().getMonth();
  const todayYear = new Date().getFullYear();
  return `${todayDate}/${todayMonth}/${todayYear}`;
};

export const convertUnixTime = (timeStamp) => {
  const dateObj = new Date(timeStamp * 1000);
  const utcString = dateObj.toUTCString();
  const timeZone = dateObj.getTimezoneOffset();

  let hour = parseInt(utcString.slice(17, 19));
  let minute = parseInt(utcString.slice(20, 22));

  if (timeZone < 0) {
    const h = (timeZone * -1) / 60;
    const m = (timeZone * -1) % 60;
    minute += m;
    if (minute >= 60) {
      minute %= 60;
      hour++;
    }
    hour += h;
    hour %= 24;
  } else {
    const h = timeZone / 60;
    const m = timeZone % 60;
    minute -= m;
    if (minute < 0) {
      minute += 60;
      hour--;
    }
    hour -= h;
    if (hour < 0) {
      hour += 24;
    }
  }
  if (minute === 0) minute = "00";
  if (hour >= 0 && hour <= 9) hour = "0" + hour;
  return `${hour}:${minute}`;
};

export const convertUnixDate = ( timeStamp ) => {
  const dateObj = new Date(timeStamp * 1000);
  const utcString = dateObj.toUTCString();
  return utcString.slice( 0 , 16 );
}

export const setHomeClass = (id) => {
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
