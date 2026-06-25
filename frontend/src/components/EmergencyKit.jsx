import { useState } from "react";
import API from "../api";

function EmergencyKit() {

  const [kit, setKit] = useState("");
  const [loading, setLoading] = useState(false);

  const generateKit = async () => {

    try {

      setLoading(true);

      const res = await API.post(
        "/emergency-kit",
        {
          disaster: "Flood"
        }
      );

      setKit(res.data.emergency_kit);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="bg-white p-6 rounded-xl shadow-lg">

      <h2 className="text-2xl font-bold mb-4">
        Emergency Kit Generator
      </h2>

      <p className="text-gray-600 mb-4">
        Generate essential items required during flood emergencies.
      </p>

      <button
        onClick={generateKit}
        disabled={loading}
        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold"
      >
        {loading
          ? "Generating..."
          : "Generate Emergency Kit"}
      </button>

      {kit && (

        <div className="mt-5">

          <h3 className="text-lg font-bold mb-3">
            Recommended Emergency Kit
          </h3>

          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">

            <pre className="whitespace-pre-wrap text-gray-800">
              {kit}
            </pre>

          </div>

        </div>

      )}

    </div>

  );

}

export default EmergencyKit;