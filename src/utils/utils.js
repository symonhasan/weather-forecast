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
