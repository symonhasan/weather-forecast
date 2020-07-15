const initialState = {

}

const reducer = ( state = initialState , action ) => {

    switch( action.type ){
        case "SET_USER_LOCATION":
            console.log("SET USER LOCATION ACTION DISPATCHED " );
            const { latitude , longitude } = action.payload.coords;
            return{
                ...state,
                userLatitude: latitude,
                userLongitude: longitude
            };
        case "USER_CLOC_WEATHER":
            console.log("USER CLOC WEATHER ACTION DISPATCHED");
            const userLatitude = state.userLatitude;
            const userLongitude = state.userLongitude;
            const API_KEY = "4d67ae696f5ec0d7e0287b173d413c6b";
            const URL = `http://api.openweathermap.org/data/2.5/weather?lat=${userLatitude}&lon=${userLongitude}&appid=${API_KEY}`;
            fetch( URL )
            .then( response => {
                return response.json();
            })
            .then( resData => {
                return{
                    ...state,
                    userCurrLocData: resData
                }
            })
            .catch( err => {
                return state;
            })
            break;
        default:
    }

    return state;
}

export default reducer;