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

export const convertUnixTime = ( timeStamp ) => {
    
    const dateObj = new Date( timeStamp * 1000); 
    const utcString = dateObj.toUTCString(); 
    const timeZone = dateObj.getTimezoneOffset();
    
    let hour = parseInt( utcString.slice( 17 ,19 ) ); 
    let minute = parseInt( utcString.slice( 20, 22 ) );
    
    if( timeZone < 0 )
    {
        const h = ( timeZone * -1 ) / 60;
        const m = ( timeZone * -1 ) % 60;
        minute += m;
        if( minute >= 60 ){
            minute %= 60;
            hour++;
        }
        hour += h;
        hour %= 24;
    } else {
        const h = ( timeZone ) / 60;
        const m = ( timeZone ) % 60;
        minute -= m;
        if( minute < 0 ){
            minute += 60;
            hour--;
        }
        hour -= h;
        if( hour < 0 ){
            hour += 24;
        }
    }
    return `${hour}:${minute}`;
}
