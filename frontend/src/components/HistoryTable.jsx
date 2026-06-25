import { useEffect, useState } from "react";
import API from "../api";

function HistoryTable() {

  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {

    loadHistory();

  }, []);

  const loadHistory = async () => {

    try {

      const res = await API.get(
        "/history"
      );

      setHistory(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const filteredHistory =
    history.filter((item) =>
      item.risk_level
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (

    <div className="bg-white p-6 rounded-xl shadow-lg">

      <div className="flex justify-between items-center mb-4">

        <h2 className="text-2xl font-bold">
          Prediction History
        </h2>

        <input
          type="text"
          placeholder="Search Risk..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border p-2 rounded-lg"
        />

      </div>

      <div className="overflow-x-auto">

        <table className="w-full border border-gray-200">

          <thead>

            <tr className="bg-gray-100">

              <th className="p-3 border">
                ID
              </th>

              <th className="p-3 border">
                Probability
              </th>

              <th className="p-3 border">
                Risk Level
              </th>

              <th className="p-3 border">
                Date
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredHistory.map((item) => (

              <tr
                key={item.id}
                className="hover:bg-gray-50"
              >

                <td className="p-3 border">
                  {item.id}
                </td>

                <td className="p-3 border">
                  {Number(
                    item.flood_probability
                  ).toFixed(4)}
                </td>

                <td className="p-3 border">

                  <span
                    className={
                      item.risk_level === "High"
                        ? "bg-red-100 text-red-700 px-3 py-1 rounded-full font-bold"
                        : item.risk_level === "Medium"
                        ? "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-bold"
                        : "bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold"
                    }
                  >
                    {item.risk_level}
                  </span>

                </td>

                <td className="p-3 border">
                  {item.created_at}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default HistoryTable;