import Navbar from "../components/Navbar";
import WeatherCard from "../components/WeatherCard";
import PredictionForm from "../components/PredictionForm";
import PredictionResult from "../components/PredictionResult";
import EmergencyKit from "../components/EmergencyKit";
import TranslateCard from "../components/TranslateCard";
import HistoryTable from "../components/HistoryTable";
import AnalyticsChart from "../components/AnalyticsChart";

import { useState } from "react";

function Dashboard() {

  const [result, setResult] = useState(null);

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto p-5 space-y-6">

        {/* Weather */}
        <WeatherCard />

        {/* Prediction */}
        <PredictionForm
          setResult={setResult}
        />

        {/* Prediction Result */}
        <PredictionResult
          result={result}
        />

        {/* Emergency Kit */}
        <EmergencyKit />

        {/* Translation */}
        <TranslateCard />

        {/* History */}
        <HistoryTable />

        {/* Analytics */}
        <AnalyticsChart />

      </div>
    </>
  );
}

export default Dashboard;