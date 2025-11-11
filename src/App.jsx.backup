import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const LEVELS = [1, 4, 8, 12, 16, 20];
const ATTRIBUTES = ["Critical Force", "Attack Speed", "Ability Boost", "Energy Shield"];

export default function App() {
  const [items, setItems] = useState([]);
  const [results, setResults] = useState([]);

  const getLevel = (val) => {
    for (let i = LEVELS.length - 1; i >= 0; i--) if (val >= LEVELS[i]) return i + 1;
    return 1;
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const text = ev.target.result;
        let parsed;
        if (file.name.endsWith(".json")) parsed = JSON.parse(text);
        else {
          const lines = text.trim().split("\n");
          const headers = lines[0].split(",").map((h) => h.trim());
          parsed = lines.slice(1).map((line) => {
            const vals = line.split(",").map((v) => v.trim());
            const obj = {};
            headers.forEach((h, i) => (obj[h] = isNaN(vals[i]) ? vals[i] : Number(vals[i])));
            return obj;
          });
        }
        setItems(parsed);
        calcAll(parsed);
      } catch (err) {
        alert("Import error: " + err.message);
      }
    };
    reader.readAsText(file);
  };

  const handleEdit = (index, key, value) => {
    const newItems = [...items];
    newItems[index][key] = Number(value) || value;
    setItems(newItems);
    calcAll(newItems);
  };

  const calcAll = (data) => {
    if (data.length < 4) {
      setResults([]);
      return;
    }
    const combos = [];
    for (let i = 0; i < data.length; i++) {
      for (let j = i + 1; j < data.length; j++) {
        for (let k = j + 1; k < data.length; k++) {
          for (let l = k + 1; l < data.length; l++) {
            const group = [data[i], data[j], data[k], data[l]];
            const totals = ATTRIBUTES.map((attr) =>
              group.reduce((sum, it) => sum + (Number(it[attr]) || 0), 0)
            );
            const levels = totals.map(getLevel);
            combos.push({
              combo: group.map((it) => it.Name || it.X || "Item").join(", "),
              totals,
              levels,
              sum: totals.reduce((a, b) => a + b, 0),
            });
          }
        }
      }
    }
    setResults(combos.sort((a, b) => b.sum - a.sum).slice(0, 10));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">
        ⚙️ CF-AS-AB-ES Combo Calculator
      </h1>

      <div className="flex justify-center mb-4">
        <input type="file" accept=".csv,.json" onChange={handleImport} />
      </div>

      {items.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="text-xl font-semibold mb-2">Your Data Table</h2>
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                {Object.keys(items[0]).map((key) => (
                  <th key={key} className="border p-2">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((row, i) => (
                <tr key={i}>
                  {Object.keys(row).map((key) => (
                    <td key={key} className="border p-1 text-center">
                      <input
                        type="text"
                        className="w-full text-center border-none outline-none bg-transparent"
                        value={row[key]}
                        onChange={(e) => handleEdit(i, key, e.target.value)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}

      {results.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Top 10 Combinations</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {results.map((r, idx) => (
              <Card key={idx} className="shadow-md">
                <CardContent className="p-4">
                  <p className="font-bold mb-2">
                    #{idx + 1}: {r.combo}
                  </p>
                  <p>
                    Totals:{" "}
                    {ATTRIBUTES.map((a, i) => `${a}: ${r.totals[i]}`).join(" | ")}
                  </p>
                  <p>
                    Levels:{" "}
                    {ATTRIBUTES.map((a, i) => `${a}: Lvl ${r.levels[i]}`).join(" | ")}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
