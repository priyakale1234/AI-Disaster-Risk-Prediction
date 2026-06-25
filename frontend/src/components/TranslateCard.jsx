import { useState } from "react";
import API from "../api";

function TranslateCard() {

  const [text, setText] = useState("");
  const [language, setLanguage] = useState("Marathi");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const translate = async () => {

    if (!text.trim()) return;

    try {

      setLoading(true);

      const res = await API.post(
        "/translate",
        {
          text,
          language
        }
      );

      setResult(
        res.data.translated_text
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="bg-white p-6 rounded-xl shadow-lg">

      <h2 className="text-2xl font-bold mb-4">
        Multilingual Translation
      </h2>

      <textarea
        rows="4"
        placeholder="Enter disaster warning or message..."
        value={text}
        onChange={(e) =>
          setText(e.target.value)
        }
        className="w-full border p-3 rounded-lg"
      />

      <select
        value={language}
        onChange={(e) =>
          setLanguage(e.target.value)
        }
        className="w-full mt-3 border p-3 rounded-lg"
      >
        <option>Marathi</option>
        <option>Hindi</option>
        <option>English</option>
        <option>Gujarati</option>
      </select>

      <button
        onClick={translate}
        disabled={loading}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold"
      >
        {loading
          ? "Translating..."
          : "Translate"}
      </button>

      {result && (

        <div className="mt-5">

          <h3 className="font-bold text-lg mb-2">
            Translation Result
          </h3>

          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">

            <p className="whitespace-pre-wrap">
              {result}
            </p>

          </div>

        </div>

      )}

    </div>

  );

}

export default TranslateCard;