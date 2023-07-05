import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import Temperature from "./components/Temperature";
import getFormattedWeatherData from "./service";

function App() {
  const [query, setQuery] = useState({ q: "Hanoi" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      await getFormattedWeatherData({ ...query, units }).then((data) => {
        setWeather(data);
        // console.log("data: ", data);
      });
    };

    fetchWeather();
  }, [query, units]);

  const changeBackground = () => {
    if (!weather) return "from-cyan-400 to-blue-700";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold)
      return "bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ...";
    return "from-yellow-400 to-orange-600";
  };

  return (
    <div
      className={`mx-auto max-w-screen-sm mt-5   py-5 px-5 bg-gradient-to-br  h-fit shadow-xl shadow-gray-400 ${changeBackground()}`}
    >
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

      {weather && (
        <div>
          <TimeAndLocation weather={weather} />
          <Temperature weather={weather} />
        </div>
      )}

      <ToastContainer autoClose={1000} newestOnTop={true} />
    </div>
  );
}
export default App;
