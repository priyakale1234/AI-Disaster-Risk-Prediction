import { useState } from "react";
import API from "../api";

function PredictionForm({ setResult }) {

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    MonsoonIntensity: 8,
    Urbanization: 8,
    ClimateChange: 9,
    Deforestation: 7,
    RiverManagement: 6,
    DrainageSystems: 5,
    Landslides: 7,
    PopulationScore: 8,
    WetlandLoss: 7,
    PoliticalFactors: 6
  });

  const handleChange = (e) => {

    setData({
      ...data,
      [e.target.name]: Number(e.target.value)
    });

  };

  const predict = async () => {

    try {

      setLoading(true);

      const payload = {
        MonsoonIntensity: data.MonsoonIntensity,
        TopographyDrainage: 7,
        RiverManagement: data.RiverManagement,
        Deforestation: data.Deforestation,
        Urbanization: data.Urbanization,
        ClimateChange: data.ClimateChange,
        DamsQuality: 6,
        Siltation: 5,
        AgriculturalPractices: 6,
        Encroachments: 7,
        IneffectiveDisasterPreparedness: 8,
        DrainageSystems: data.DrainageSystems,
        CoastalVulnerability: 6,
        Landslides: data.Landslides,
        Watersheds: 6,
        DeterioratingInfrastructure: 8,
        PopulationScore: data.PopulationScore,
        WetlandLoss: data.WetlandLoss,
        InadequatePlanning: 8,
        PoliticalFactors: data.PoliticalFactors
      };

      const res = await API.post(
        "/predict",
        payload
      );

      setResult(res.data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-3xl font-bold mb-6">
        Flood Risk Prediction
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        {Object.keys(data).map((key) => (

          <div key={key}>

            <div className="flex justify-between mb-2">

              <label className="font-medium">
                {key}
              </label>

              <span className="font-bold text-blue-600">
                {data[key]}
              </span>

            </div>

            <input
              type="range"
              min="0"
              max="10"
              step="1"
              name={key}
              value={data[key]}
              onChange={handleChange}
              className="w-full"
            />

          </div>

        ))}

      </div>

      <button
        onClick={predict}
        disabled={loading}
        className="mt-8 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold"
      >

        {loading
          ? "Predicting..."
          : "Predict Risk"}

      </button>

    </div>

  );

}

export default PredictionForm;