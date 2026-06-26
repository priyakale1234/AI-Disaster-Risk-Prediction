import { useState } from "react";

import Navbar from "./components/Navbar";
import WeatherCard from "./components/WeatherCard";
import PredictionForm from "./components/PredictionForm";
import PredictionResult from "./components/PredictionResult";
import EmergencyKit from "./components/EmergencyKit";
import TranslateCard from "./components/TranslateCard";
// import HistoryTable from "./components/HistoryTable";
import AnalyticsChart from "./components/AnalyticsChart";
import RiskMap from "./components/RiskMap";
import PDFReport from "./components/PDFReport";

function App() {

  const [result, setResult] = useState(null);

  return (

    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-7xl mx-auto p-6 space-y-6">

        {/* Weather */}
        <WeatherCard />

        {/* Prediction Form */}
        <PredictionForm
          setResult={setResult}
        />

        {/* Prediction Result */}
        <PredictionResult
          result={result}
        />

        {/* PDF Report */}
        <PDFReport
          weather={{
            city: "Pune",
            temperature: 28,
            humidity: 70,
            weather: "Clouds"
          }}
          result={result}
        />

        {/* Emergency Kit */}
        <EmergencyKit />

        {/* Translation */}
        <TranslateCard />

        {/* History */}
        {/* <HistoryTable /> */}

        {/* Analytics */}
        <AnalyticsChart />

        {/* Risk Map */}
        <RiskMap />

      </div>

    </div>

  );

}

export default App;