const thresholds = [1, 4, 8, 12, 16, 20];

export function calculateLevel(value) {
  let level = 0;
  for (let t of thresholds) {
    if (value >= t) level++;
  }
  return level;
}

export function calculateTotals(data) {
  const totals = { CF: 0, AS: 0, AB: 0, ES: 0 };
  data.forEach((row) => {
    totals.CF += Number(row.CF || 0);
    totals.AS += Number(row.AS || 0);
    totals.AB += Number(row.AB || 0);
    totals.ES += Number(row.ES || 0);
  });
  return {
    totals,
    levels: {
      CF: calculateLevel(totals.CF),
      AS: calculateLevel(totals.AS),
      AB: calculateLevel(totals.AB),
      ES: calculateLevel(totals.ES),
    },
  };
}
