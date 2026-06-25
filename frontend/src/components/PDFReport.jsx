import jsPDF from "jspdf";

function PDFReport({ weather, result }) {

  const downloadPDF = () => {

    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text(
      "AI Disaster Risk Prediction Report",
      20,
      20
    );

    doc.setFontSize(12);

    doc.text(
      `Date: ${new Date().toLocaleString()}`,
      20,
      35
    );

    let y = 50;

    if (weather) {

      doc.text(
        `City: ${weather.city}`,
        20,
        y
      );

      y += 10;

      doc.text(
        `Temperature: ${weather.temperature} °C`,
        20,
        y
      );

      y += 10;

      doc.text(
        `Humidity: ${weather.humidity}%`,
        20,
        y
      );

      y += 10;

      doc.text(
        `Weather: ${weather.weather}`,
        20,
        y
      );

      y += 20;
    }

    if (result) {

      doc.text(
        `Flood Probability: ${result.flood_probability}`,
        20,
        y
      );

      y += 10;

      doc.text(
        `Risk Level: ${result.risk_level}`,
        20,
        y
      );

      y += 20;

      doc.text(
        "AI Advice:",
        20,
        y
      );

      y += 10;

      const lines =
        doc.splitTextToSize(
          result.advice,
          170
        );

      doc.text(
        lines,
        20,
        y
      );
    }

    doc.save(
      "Disaster_Report.pdf"
    );
  };

  return (

    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-xl font-bold mb-4">
        PDF Report
      </h2>

      <button
        onClick={downloadPDF}
        className="bg-purple-600 text-white px-4 py-2 rounded"
      >
        📄 Download Report
      </button>

    </div>

  );

}

export default PDFReport;