import React from 'react';

export default function Table({ data, setData }) {
  const handleChange = (i, field, val) => {
    const copy = [...data];
    copy[i][field] = val;
    setData(copy);
  };

  const addRow = () => setData([...data, { name: '', CF: 0, AS: 0, AB: 0, ES: 0 }]);
  const removeRow = (i) => setData(data.filter((_, idx) => idx !== i));

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border text-center text-sm">
        <thead className="bg-gray-100 font-semibold">
          <tr>
            <th>Name</th><th>CF</th><th>AS</th><th>AB</th><th>ES</th><th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((r, i) => (
            <tr key={i}>
              {['name', 'CF', 'AS', 'AB', 'ES'].map(f => (
                <td key={f}>
                  <input
                    type={f === 'name' ? 'text' : 'number'}
                    className="border w-full p-1 text-center"
                    value={r[f]}
                    onChange={e => handleChange(i, f, e.target.value)}
                  />
                </td>
              ))}
              <td>
                <button
                  onClick={() => removeRow(i)}
                  className="text-red-500 font-bold"
                >
                  ✕
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addRow} className="mt-2 bg-blue-600 text-white px-3 py-1 rounded">
        + Add Row
      </button>
    </div>
  );
}
