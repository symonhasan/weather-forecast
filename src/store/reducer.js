const initialState = {
  bgClass: "",
  hrFlag: false,
  weFlag: false,
  userCurrLocData: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_LOCATION":
      const { latitude, longitude } = action.payload.coords;
      return {
        ...state,
        userLatitude: latitude,
        userLongitude: longitude,
        hrFlag: false,
        weFlag: false,
      };
    case "USER_CLOC_WEATHER":
      return {
        ...state,
        userCurrLocData: action.payload.currLocData,
        bgClass: action.payload.bgClass,
        hourlyWeatherData: undefined,
        weeklyWeatherData: undefined,
      };
    case "STORE_HOURLY_DATA":
      return {
        ...state,
        hourlyWeatherData: action.payload,
      };
    case "STORE_WEEKLY_DATA":
        return{
            ...state,
            weeklyWeatherData: action.payload,
        }
    case "SET_HR_FLAG":
      return{
        ...state,
        hrFlag: true,
      }
    case "SET_WE_FLAG":
      return{
        ...state,
        weFlag: true,
      }
    default:
  }

  return state;
};

export default reducer;
