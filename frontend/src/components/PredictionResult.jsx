function PredictionResult({ result }) {

  if (!result) return null;

  const riskColor =
    result.risk_level === "High"
      ? "bg-red-100 text-red-700"
      : result.risk_level === "Medium"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-green-100 text-green-700";

  const probability =
    Number(result.flood_probability) * 100;

  return (

    <div className="bg-white p-6 rounded-xl shadow-lg">

      <h2 className="text-3xl font-bold mb-5">
        Prediction Result
      </h2>

      {/* Probability */}

      <div className="mb-5">

        <div className="flex justify-between mb-2">

          <span className="font-semibold">
            Flood Probability
          </span>

          <span>
            {probability.toFixed(2)}%
          </span>

        </div>

        <div className="w-full bg-gray-200 rounded-full h-4">

          <div
            className="bg-blue-600 h-4 rounded-full"
            style={{
              width: `${probability}%`
            }}
          ></div>

        </div>

      </div>

      {/* Risk Badge */}

      <div
        className={`inline-block px-5 py-2 rounded-full font-bold mb-6 ${riskColor}`}
      >
        🚨 Risk Level: {result.risk_level}
      </div>

      {/* Advice */}

      <div>

        <h3 className="text-xl font-bold mb-3">
          AI Disaster Advice
        </h3>

        <div className="bg-gray-100 p-4 rounded-lg">

          <p className="whitespace-pre-wrap leading-7">
            {result.advice}
          </p>

        </div>

      </div>

    </div>

  );

}

export default PredictionResult;