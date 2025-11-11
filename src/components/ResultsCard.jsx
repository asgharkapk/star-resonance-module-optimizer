import React from 'react';

export default function ResultsCard({ results }) {
  if (!results) return null;
  const { totals, levels } = results;

  return (
    <div className="mt-5 p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="font-bold text-lg mb-2">Results Summary</h2>
      <table className="w-full border text-center">
        <thead className="bg-gray-200">
          <tr><th>Type</th><th>Total</th><th>Level</th></tr>
        </thead>
        <tbody>
          {Object.keys(totals).map(key => (
            <tr key={key}>
              <td>{key}</td>
              <td>{totals[key]}</td>
              <td>{levels[key]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
