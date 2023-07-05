import { DateTime } from "luxon";

const API_KEY = "4397c60bbef70a3e939b9881c586cd39";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = (type, searchParams) => {
  const url = new URL(BASE_URL + "/" + type);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  return fetch(url).then((res) => res.json());
};

const getCurrentWeather = (data) => {
  const {
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];

  return {
    temp, // nhiệt độ
    feels_like, //nhiệt độ cảm thấy
    temp_min, // nhiệt độ tối thiểu
    temp_max, // nhiệt độ tối đa
    humidity, // độ ẩm
    name, // tên địa điểm
    dt, // thời gian hiện tại của địa điểm đó
    country, // quốc gia
    sunrise, // thời gian bình minh
    sunset, // thời gian hoàng hôn
    details, //
    icon,
    speed, // tốc độ gió
  };
};

const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(getCurrentWeather);

  return { ...formattedCurrentWeather };
};

const formatToLocalTime = (
  secs,
  zone,
  format = "hh:mm a' | 'cccc, dd LLL yyyy"
) => {
  return DateTime.fromSeconds(secs).setZone(zone).toFormat(format);
};

const iconUrlFromCode = (code) => {
  return `http://openweathermap.org/img/wn/${code}@2x.png`;
};

export { formatToLocalTime, iconUrlFromCode };
export default getFormattedWeatherData;
