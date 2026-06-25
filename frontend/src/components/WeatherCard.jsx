import { useEffect, useState } from "react";
import API from "../api";

function WeatherCard() {

  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {

    const fetchWeather = async () => {

      try {

        const response = await API.post(
          "/weather",
          {
            city: "Pune"
          }
        );

        console.log("Weather Response:", response.data);

        if (response.data.error) {
          setError(response.data.error);
          return;
        }

        setWeather(response.data);

      } catch (err) {

        console.error("Weather Error:", err);

        setError(
          err.response?.data?.detail ||
          "Weather API Failed"
        );
      }

    };

    fetchWeather();

  }, []);

  if (error) {

    return (
      <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-xl shadow">
        <h2 className="font-bold mb-2">
          Weather Error
        </h2>
        <p>{error}</p>
      </div>
    );

  }

  if (!weather) {

    return (
      <div className="bg-white p-6 rounded-xl shadow">
        Loading Weather...
      </div>
    );

  }

  return (

    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-2xl font-bold mb-4">
        🌦 Live Weather
      </h2>

      <div className="space-y-2 text-lg">

        <p>
          🌡 Temperature:
          <span className="font-semibold">
            {" "}{weather.temperature}°C
          </span>
        </p>

        <p>
          💧 Humidity:
          <span className="font-semibold">
            {" "}{weather.humidity}%
          </span>
        </p>

        <p>
          ☁ Weather:
          <span className="font-semibold">
            {" "}{weather.weather}
          </span>
        </p>

        <p>
          📍 City:
          <span className="font-semibold">
            {" "}{weather.city}
          </span>
        </p>

      </div>

    </div>

  );
}

export default WeatherCard;