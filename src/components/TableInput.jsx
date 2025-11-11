import React, { useState } from "react";
import { calculateTotals } from "../utils/calculateLevels";

export default function TableInput() {
  const [data, setData] = useState([
    { name: "X1", CF: 3, AS: 10, AB: 0, ES: 0 },
  ]);
  const [results, setResults] = useState(null);

  const handleChange = (i, key, value) => {
    const newData = [...data];
    newData[i][key] = value;
    setData(newData);
  };

  const handleAddRow = () =>
    setData([...data, { name: "", CF: 0, AS: 0, AB: 0, ES: 0 }]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const rows = text.split("\n").slice(1);
      const newData = rows
        .map((r) => r.split(","))
        .filter((r) => r.length >= 5)
        .map(([name, CF, AS, AB, ES]) => ({
          name,
          CF: Number(CF),
          AS: Number(AS),
          AB: Number(AB),
          ES: Number(ES),
        }));
      setData(newData);
    };
    reader.readAsText(file);
  };

  const handleCalculate = () => setResults(calculateTotals(data));

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">CF / AS / AB / ES Calculator</h1>

      <input type="file" accept=".csv" onChange={handleFileUpload} className="mb-4" />

      <table className="border w-full text-center">
        <thead>
          <tr className="bg-gray-200">
            <th>Name</th><th>CF</th><th>AS</th><th>AB</th><th>ES</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {["name", "CF", "AS", "AB", "ES"].map((key) => (
                <td key={key}>
                  <input
                    className="border w-full text-center"
                    value={row[key]}
                    onChange={(e) => handleChange(i, key, e.target.value)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={handleAddRow} className="mt-3 bg-blue-500 text-white px-3 py-1 rounded">
        + Add Row
      </button>

      <button onClick={handleCalculate} className="mt-3 ml-3 bg-green-600 text-white px-3 py-1 rounded">
        Calculate
      </button>

      {results && (
        <div className="mt-5 p-3 border rounded bg-gray-100">
          <h2 className="font-semibold text-lg mb-2">Results</h2>
          <p>CF Level: {results.levels.CF}</p>
          <p>AS Level: {results.levels.AS}</p>
          <p>AB Level: {results.levels.AB}</p>
          <p>ES Level: {results.levels.ES}</p>
        </div>
      )}
    </div>
  );
}
