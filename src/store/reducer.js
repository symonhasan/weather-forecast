const initialState = {
    bgClass: "",
    userCurrLocData: {}
}

const reducer = ( state = initialState , action ) => {

    switch( action.type ){
        case "SET_USER_LOCATION":
            const { latitude , longitude } = action.payload.coords;
            return{
                ...state,
                userLatitude: latitude,
                userLongitude: longitude
            };
        case "USER_CLOC_WEATHER":
            return{
                ...state,
                userCurrLocData: action.payload.currLocData,
                bgClass: action.payload.bgClass
            }
        default:
    }

    return state;
}

export default reducer;