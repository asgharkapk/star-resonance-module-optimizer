const thresholds = [1, 4, 8, 12, 16, 20];

export function calcLevel(value) {
  let level = 0;
  for (const t of thresholds) {
    if (value >= t) level++;
  }
  return level;
}

export function summarize(data) {
  const totals = { CF: 0, AS: 0, AB: 0, ES: 0 };
  for (const row of data) {
    totals.CF += +row.CF || 0;
    totals.AS += +row.AS || 0;
    totals.AB += +row.AB || 0;
    totals.ES += +row.ES || 0;
  }
  return {
    totals,
    levels: Object.fromEntries(Object.entries(totals).map(([k, v]) => [k, calcLevel(v)])),
  };
}
