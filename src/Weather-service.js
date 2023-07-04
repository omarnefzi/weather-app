import axios from "axios";

const API_KEY = "893134916ed3e5f4fc3797b6a84bd3ab";
const makeIconUrl = (iconId) =>
  `https://openweathermap.org/img/wn/${iconId}@2x.png`;
const getFormatedWeatherData = async (city, units = "metric") => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;

  const { data } = await axios.get(URL);
  const {
    weather,
    main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
    wind: { speed },
    sys: { country },
    name,
  } = data;
  const { description, icon } = weather[0];
  return {
    description,
    iconUrl:makeIconUrl(icon) ,
    temp,
    temp_max,
    temp_min,
    pressure,
    humidity,
    speed,
    country,
    name,
    feels_like,
  };
};

export { getFormatedWeatherData };
