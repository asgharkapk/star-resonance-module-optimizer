import React, { useState, useEffect } from 'react';
import Table from './components/Table';
import ResultsCard from './components/ResultsCard';
import { summarize } from './utils/levelUtils';

export default function App() {
  const [data, setData] = useState([{ name: 'X1', CF: 3, AS: 10, AB: 0, ES: 0 }]);
  const [results, setResults] = useState(null);

  const handleFile = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = evt => {
      const lines = evt.target.result.trim().split('\n').slice(1);
      const parsed = lines.map(line => {
        const [name, CF, AS, AB, ES] = line.split(',');
        return { name, CF, AS, AB, ES };
      });
      setData(parsed);
    };
    reader.readAsText(file);
  };

  useEffect(() => {
    setResults(summarize(data));
  }, [data]);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-5 bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">
        CF / AS / AB / ES Level Calculator
      </h1>
      <div className="flex justify-between mb-4">
        <input type="file" accept=".csv" onChange={handleFile} />
        <button
          onClick={() => setData([])}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Clear Table
        </button>
      </div>

      <Table data={data} setData={setData} />
      <ResultsCard results={results} />
    </div>
  );
}
