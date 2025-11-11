/*
README (brief) - CF-AS-AB-ES Calculator Webpage

This single-file React component is an interactive webpage that:
- defines the 11 X items with their attribute values
- allows selecting arbitrary items and also computes every combination of 4 items
- calculates totals and maps them to levels using your thresholds
- presents "Top by Total", "Best per-category", and "Most balanced" results
- labels attributes with full names: Critical Force, Attack Speed, Ability Boost, Energy Shield
- exports CSV for combos

How to use in a GitHub repo / locally
1. Create a new React app (recommended):
   npx create-react-app cf-calculator
2. Replace src/App.jsx with the content of this file (remove other boilerplate files or integrate)
3. Install Tailwind (optional) or remove Tailwind classes. For quick run you can keep default CRA styling.
4. Start:
   npm start

If you want me to create the full GitHub repo structure (package.json, build scripts) and push it to a repo, tell me the repo name or give me a remote and I'll prepare files for you.

--------------------------------------------------
This file is a single-file React component. It uses Tailwind-like classes but will work fine with default CRA styles; you can add Tailwind later for nicer visuals.
*/

import React, { useMemo, useState } from "react";

const ITEMS = [
  { id: "X1", CF: 3, AS: 10, AB: 0, ES: 0 },
  { id: "X2", CF: 0, AS: 4, AB: 8, ES: 0 },
  { id: "X3", CF: 0, AS: 3, AB: 6, ES: 0 },
  { id: "X4", CF: 8, AS: 0, AB: 5, ES: 0 },
  { id: "X5", CF: 4, AS: 0, AB: 0, ES: 6 },
  { id: "X6", CF: 0, AS: 0, AB: 4, ES: 7 },
  { id: "X7", CF: 0, AS: 6, AB: 4, ES: 0 },
  { id: "X8", CF: 0, AS: 0, AB: 10, ES: 2 },
  { id: "X9", CF: 7, AS: 0, AB: 4, ES: 0 },
  { id: "X10", CF: 10, AS: 0, AB: 0, ES: 2 },
  { id: "X11", CF: 2, AS: 10, AB: 0, ES: 0 },
];

const ATTR_NAMES = {
  CF: "Critical Force",
  AS: "Attack Speed",
  AB: "Ability Boost",
  ES: "Energy Shield",
};

const LEVEL_THRESHOLDS = [
  { lvl: 6, req: 20 },
  { lvl: 5, req: 16 },
  { lvl: 4, req: 12 },
  { lvl: 3, req: 8 },
  { lvl: 2, req: 4 },
  { lvl: 1, req: 1 },
];

function levelFor(value) {
  for (const t of LEVEL_THRESHOLDS) if (value >= t.req) return t.lvl;
  return 0;
}

function combine(arr, k) {
  const res = [];
  const n = arr.length;
  function helper(start, chosen) {
    if (chosen.length === k) {
      res.push(chosen.slice());
      return;
    }
    for (let i = start; i < n; i++) {
      chosen.push(arr[i]);
      helper(i + 1, chosen);
      chosen.pop();
    }
  }
  helper(0, []);
  return res;
}

function totalsOfCombo(combo) {
  const totals = { CF: 0, AS: 0, AB: 0, ES: 0 };
  combo.forEach((it) => {
    totals.CF += it.CF;
    totals.AS += it.AS;
    totals.AB += it.AB;
    totals.ES += it.ES;
  });
  return totals;
}

function levelsOfTotals(totals) {
  return {
    CF: levelFor(totals.CF),
    AS: levelFor(totals.AS),
    AB: levelFor(totals.AB),
    ES: levelFor(totals.ES),
  };
}

function comboKey(combo) {
  return combo.map((c) => c.id).join(" + ");
}

export default function App() {
  const [selected, setSelected] = useState([]);
  const [maxPick, setMaxPick] = useState(4);

  const all4Combos = useMemo(() => {
    const combs = combine(ITEMS, 4).map((combo) => {
      const totals = totalsOfCombo(combo);
      const levels = levelsOfTotals(totals);
      const sum = totals.CF + totals.AS + totals.AB + totals.ES;
      const minLevel = Math.min(levels.CF, levels.AS, levels.AB, levels.ES);
      return {
        ids: combo.map((c) => c.id),
        totals,
        levels,
        sum,
        minLevel,
      };
    });
    // sort by sum desc then minLevel desc
    combs.sort((a, b) => b.sum - a.sum || b.minLevel - a.minLevel);
    return combs;
  }, []);

  const topByTotal = all4Combos.slice(0, 10);

  const bestPerCategory = useMemo(() => {
    const best = {};
    ["CF", "AS", "AB", "ES"].forEach((attr) => {
      let bestC = null;
      for (const c of all4Combos) {
        if (!bestC || c.totals[attr] > bestC.totals[attr]) bestC = c;
      }
      best[attr] = bestC;
    });
    return best;
  }, [all4Combos]);

  const mostBalanced = useMemo(() => {
    // highest minLevel, tie-breaker by sum
    const sorted = [...all4Combos].sort((a, b) => b.minLevel - a.minLevel || b.sum - a.sum);
    return sorted.slice(0, 5);
  }, [all4Combos]);

  function toggleSelect(id) {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  }

  const selectedItems = ITEMS.filter((it) => selected.includes(it.id));
  const selectedTotals = selectedItems.length
    ? totalsOfCombo(selectedItems)
    : { CF: 0, AS: 0, AB: 0, ES: 0 };
  const selectedLevels = levelsOfTotals(selectedTotals);

  function exportCSV() {
    const header = ["Combo", "CF", "AS", "AB", "ES", "Sum", "CF lvl", "AS lvl", "AB lvl", "ES lvl"];
    const rows = topByTotal.map((c) => [c.ids.join("+"), c.totals.CF, c.totals.AS, c.totals.AB, c.totals.ES, c.sum, c.levels.CF, c.levels.AS, c.levels.AB, c.levels.ES]);
    const csv = [header, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "top_combos.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="p-6 max-w-5xl mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-4">CF / AS / AB / ES — 4-item combo calculator</h1>

      <section className="mb-6">
        <h2 className="font-semibold">Items</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
          {ITEMS.map((it) => (
            <label key={it.id} className="border rounded p-3 flex flex-col">
              <div className="flex items-center justify-between">
                <div className="text-lg font-medium">{it.id}</div>
                <input type="checkbox" checked={selected.includes(it.id)} onChange={() => toggleSelect(it.id)} />
              </div>
              <div className="text-sm mt-2">
                <div>{ATTR_NAMES.CF}: {it.CF}</div>
                <div>{ATTR_NAMES.AS}: {it.AS}</div>
                <div>{ATTR_NAMES.AB}: {it.AB}</div>
                <div>{ATTR_NAMES.ES}: {it.ES}</div>
              </div>
            </label>
          ))}
        </div>
        <div className="mt-3 text-sm text-gray-700">Selected: {selected.join(", ") || "—"} (you can select any number; the app computes selected totals and also precomputes all 4-item combos)</div>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold">Selected totals</h2>
        <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2">
          <div className="p-3 border rounded">{ATTR_NAMES.CF}: {selectedTotals.CF} — Lvl {selectedLevels.CF}</div>
          <div className="p-3 border rounded">{ATTR_NAMES.AS}: {selectedTotals.AS} — Lvl {selectedLevels.AS}</div>
          <div className="p-3 border rounded">{ATTR_NAMES.AB}: {selectedTotals.AB} — Lvl {selectedLevels.AB}</div>
          <div className="p-3 border rounded">{ATTR_NAMES.ES}: {selectedTotals.ES} — Lvl {selectedLevels.ES}</div>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold">Top combos by total (sum of all 4 attributes)</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left">
                <th className="pr-4">Combo</th>
                <th className="pr-4">CF</th>
                <th className="pr-4">AS</th>
                <th className="pr-4">AB</th>
                <th className="pr-4">ES</th>
                <th className="pr-4">Sum</th>
                <th className="pr-4">Levels (CF / AS / AB / ES)</th>
              </tr>
            </thead>
            <tbody>
              {topByTotal.map((c, i) => (
                <tr key={i} className="border-t">
                  <td className="py-2">{c.ids.join(" + ")}</td>
                  <td>{c.totals.CF}</td>
                  <td>{c.totals.AS}</td>
                  <td>{c.totals.AB}</td>
                  <td>{c.totals.ES}</td>
                  <td>{c.sum}</td>
                  <td>Lvl {c.levels.CF} / Lvl {c.levels.AS} / Lvl {c.levels.AB} / Lvl {c.levels.ES}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3">
          <button onClick={exportCSV} className="px-3 py-2 border rounded">Export top 10 as CSV</button>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold">Best per category</h2>
        <div className="mt-2 grid grid-cols-1 md:grid-cols-4 gap-3">
          {Object.entries(bestPerCategory).map(([attr, c]) => (
            <div key={attr} className="border p-3 rounded">
              <div className="font-medium">{ATTR_NAMES[attr]}</div>
              <div className="text-sm mt-1">Combo: {c.ids.join(" + ")}</div>
              <div className="text-sm">Totals: CF {c.totals.CF} / AS {c.totals.AS} / AB {c.totals.AB} / ES {c.totals.ES}</div>
              <div className="text-sm">Levels: Lvl {c.levels.CF} / Lvl {c.levels.AS} / Lvl {c.levels.AB} / Lvl {c.levels.ES}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold">Most balanced combos (highest minimum level)</h2>
        <div className="mt-3">
          {mostBalanced.map((c, idx) => (
            <div key={idx} className="border rounded p-3 mb-2">
              <div className="font-medium">{c.ids.join(" + ")}</div>
              <div className="text-sm">Totals: CF {c.totals.CF} / AS {c.totals.AS} / AB {c.totals.AB} / ES {c.totals.ES}</div>
              <div className="text-sm">Levels: Lvl {c.levels.CF} / Lvl {c.levels.AS} / Lvl {c.levels.AB} / Lvl {c.levels.ES} — min Lvl {c.minLevel}</div>
            </div>
          ))}
        </div>
      </section>

      <footer className="text-sm text-gray-600 mt-8">
        <div>Notes:</div>
        <ul className="list-disc ml-5">
          <li>Level thresholds: 6 ≥20, 5 ≥16, 4 ≥12, 3 ≥8, 2 ≥4, 1 ≥1.</li>
          <li>To change thresholds or items, edit ITEMS or LEVEL_THRESHOLDS at top of file.</li>
        </ul>
      </footer>
    </div>
  );
}
