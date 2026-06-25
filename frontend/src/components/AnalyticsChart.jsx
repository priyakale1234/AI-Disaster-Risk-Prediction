import { useEffect, useState } from "react";
import API from "../api";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

function AnalyticsChart() {

  const [data, setData] = useState([]);

  useEffect(() => {

    API.get("/history")
      .then((res) => {

        const chartData =
          res.data.map((item) => ({
            id: item.id,
            probability:
              item.flood_probability
          }));

        setData(chartData);

      });

  }, []);

  return (

    <div className="bg-white p-6 rounded-xl shadow-lg">

      <h2 className="text-2xl font-bold mb-4">
        Flood Risk Analytics
      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <LineChart data={data}>

          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis dataKey="id" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="probability"
            stroke="#2563eb"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  );

}

export default AnalyticsChart;