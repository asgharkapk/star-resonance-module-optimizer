// Attribute thresholds
const ATTR_THRESHOLDS = [1, 4, 8, 12, 16, 20];

// Base attribute power map
const BASIC_ATTR_POWER_MAP = {1:7, 2:14, 3:29, 4:44, 5:167, 6:254};

// Special attribute power map
const SPECIAL_ATTR_POWER_MAP = {1:14, 2:29, 3:59, 4:89, 5:298, 6:448};

// Total attribute power map
const TOTAL_ATTR_POWER_MAP = {
  0:0,1:5,2:11,3:17,4:23,5:29,6:34,7:40,8:46,
  18:104,19:110,20:116,21:122,22:128,23:133,24:139,25:145,
  26:151,27:157,28:163,29:168,30:174,31:180,32:186,33:192,
  34:198,35:203,36:209,37:215,38:221,39:227,40:233,41:238,
  42:244,43:250,44:256,45:262,46:267,47:273,48:279,49:285,
  50:291,51:297,52:302,53:308,54:314,55:320,56:326,57:332,
  58:337,59:343,60:349,61:355,62:361,63:366,64:372,65:378,
  66:384,67:390,68:396,69:401,70:407,71:413,72:419,73:425,
  74:431,75:436,76:442,77:448,78:454,79:460,80:466,81:471,
  82:477,83:483,84:489,85:495,86:500,87:506,88:512,89:518,
  90:524,91:530,92:535,93:541,94:547,95:553,96:559,97:565,
  98:570,99:576,100:582,101:588,102:594,103:599,104:605,105:611,
  106:617,113:658,114:664,115:669,116:675,117:681,118:687,119:693,120:699
};

// Attribute name -> type map (English)
const ATTR_NAME_TYPE_MAP_EN = {
  "Strength Boost": "basic",
  "Agility Boost": "basic",
  "Intellect Boost": "basic",
  "Special Attack": "basic",
  "Elite Strike": "basic",
  "Healing Boost": "basic",
  "Healing Enhance": "basic",
  "Cast Focus": "basic",
  "Attack SPD": "basic",
  "Crit Focus": "basic",
  "Luck Focus": "basic",
  "Resistance": "basic",
  "Armor": "basic",
  "DMG Stack": "special",
  "Agile": "special",
  "Life Condense": "special",
  "First Aid": "special",
  "Life Wave": "special",
  "Life Steal": "special",
  "Team Luck & Crit": "special",
  "Final Protection": "special"
};

// Main Data Table
e('table', null,
  e('thead', null, e('tr', null,
    e('th', null, 'Module Name'),
    STATS.map(s => visibleStats[s] ? e('th', { key: s, style: { whiteSpace: 'normal', textAlign: 'center' } },
      e('img', { src: STAT_ICONS[s], alt: s, title: s, width: 20, height: 20, style: { verticalAlign: 'middle', marginRight: '4px' } }),
      s
    ) : null),
    e('th', null, 'Combat Score'),
    e('th', null, 'Remove')
  )),
  e('tbody', null, data.map((row, i) =>
    e('tr', { key: i },
      e('td', { className: 'level-6' }, row.name),
      STATS.map(s => visibleStats[s] ? e('td', {
        key: s,
        className: getLevelClass(level_for(row[s]))
      },
        e('div', {
          style: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }
        },
          e('img', {
            src: STAT_ICONS[s],
            alt: s,
            title: s,
            width: 16,
            height: 16
          }),
          e('input', {
            type: 'number',
            min: 0,
            value: row[s] > 0 ? row[s] : '',
            onChange: (e) => {
              const val = e.target.value === '' ? 0 : Math.max(0, Number(e.target.value));
              handleChange(i, s, val);
            },
            onKeyDown: (e) => { if (e.key === '-') e.preventDefault(); },
            style: { width: '40px', textAlign: 'center' }
          })
        )
      ) : null),
      e('td', null,
        calculateCombatScore(Object.fromEntries(STATS.map(s => [s, row[s] || 0])))
      ),
      e('td', null,
        e('button', { className: "btn btn-red", onClick: () => handleRemoveRow(i) }, '✕')
      )
    )
  ))
),

// Top Total / Smart / Highest Results Table
bestResults.topTotal && e('div', { className: 'results' },
  e('h3', null,
    calcMethod === 'total' ? 'Top Total Combos (Highest Sum of Levels)' :
    calcMethod === 'highest' ? 'Top Combos (Most High-Level Stats)' :
    calcMethod === 'smart' ? 'Smart Combination Results (Weighted Hybrid Ranking)' :
    calcMethod === 'weighted' ? 'Weighted Power Mode (Exponential Level Value)' :
    calcMethod === 'balanced' ? 'Balanced Mode (Even Stat Distribution)' :
    calcMethod === 'spike' ? 'Spike Mode (Specialized Peak Stats)' :
    calcMethod === 'efficiency' ? 'Efficiency Mode (Best Value per High Stat)' :
    'Synergy Mode'
  ),
  e('table', null,
    e('thead', null, e('tr', null,
      e('th', null, 'Modules'),
      STATS.map(s => visibleStats[s] ? e('th', { key: s, style: { whiteSpace: 'normal', textAlign: 'center' } },
        e('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' } },
          e('img', { src: STAT_ICONS[s], alt: s, title: s, width: 16, height: 16 }),
          s + ' Lvl'
        )
      ) : null),
      e('th', null, 'Combat Score')
    )),
    e('tbody', null, bestResults.topTotal.map((r, i) =>
      e('tr', { key: i, className: i === 0 ? 'best-combo' : '' },
        e('td', null, r.combo),
        STATS.map(s => visibleStats[s] ? e('td', { key: s, className: getLevelClass(r.lvls[s]) }, r.lvls[s]) : null),
        e('td', null,
          calculateCombatScore(Object.fromEntries(STATS.map(s => [s, r.lvls[s] || 0])))
        )
      )
    ))
  )
),

// Top Per Stat Tables
Object.keys(bestResults.topPerStat || {}).map(stat =>
  e('div', { key: stat },
    e('h3', null, 'Top ' + stat + ' combos'),
    e('table', null,
      e('thead', null, e('tr', null,
        e('th', null, 'Modules'),
        STATS.map(s => visibleStats[s] ? e('th', { key: s, style: { whiteSpace: 'normal', textAlign: 'center' } },
          e('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' } },
            e('img', { src: STAT_ICONS[s], alt: s, title: s, width: 16, height: 16 }),
            s + ' Lvl'
          )
        ) : null),
        e('th', null, 'Combat Score')
      )),
      e('tbody', null, bestResults.topPerStat[stat].map((r, i) =>
        e('tr', { key: i, className: i === 0 ? 'best-combo' : '' },
          e('td', null, r.combo),
          STATS.map(s => visibleStats[s] ? e('td', { key: s, className: getLevelClass(r.lvls[s]) }, r.lvls[s]) : null),
          e('td', null,
            calculateCombatScore(Object.fromEntries(STATS.map(s => [s, r.lvls[s] || 0])))
          )
        )
      ))
    )
  )
),

// Best Balanced Table
bestResults.balanced && e('div', { className: 'results' },
  e('h3', null, 'Best Balanced combos (maximize min level)'),
  e('table', null,
    e('thead', null, e('tr', null,
      e('th', null, 'Modules'),
      STATS.map(s => visibleStats[s] ? e('th', { key: s, style: { whiteSpace: 'normal', textAlign: 'center' } },
        e('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' } },
          e('img', { src: STAT_ICONS[s], alt: s, title: s, width: 16, height: 16 }),
          s + ' Lvl'
        )
      ) : null),
      e('th', null, 'Combat Score')
    )),
    e('tbody', null, bestResults.balanced.map((r, i) =>
      e('tr', { key: i, className: i === 0 ? 'best-combo' : '' },
        e('td', null, r.combo),
        STATS.map(s => visibleStats[s] ? e('td', { key: s, className: getLevelClass(r.lvls[s]) }, r.lvls[s]) : null),
        e('td', null,
          calculateCombatScore(Object.fromEntries(STATS.map(s => [s, r.lvls[s] || 0])))
        )
      )
    ))
  )
)

// Function to compute solution.score
function calculateSolutionScore(modules) {
  // Aggregate attributes across all module parts
  const attrBreakdown = {};
  for (const module of modules) {
    for (const part of module.parts) {
      attrBreakdown[part.name] = (attrBreakdown[part.name] || 0) + part.value;
    }
  }

  let thresholdPower = 0;
  let totalAttrValue = 0;

  for (const [attrName, value] of Object.entries(attrBreakdown)) {
    totalAttrValue += value;

    // Determine threshold level
    let level = 0;
    for (let i = 0; i < ATTR_THRESHOLDS.length; i++) {
      if (value >= ATTR_THRESHOLDS[i]) level = i+1;
      else break;
    }

    if (level > 0) {
      const type = ATTR_NAME_TYPE_MAP[attrName] || "basic";
      if (type === "special") thresholdPower += SPECIAL_ATTR_POWER_MAP[level] || 0;
      else thresholdPower += BASIC_ATTR_POWER_MAP[level] || 0;
    }
  }

  const totalAttrPower = TOTAL_ATTR_POWER_MAP[totalAttrValue] || 0;
  return thresholdPower + totalAttrPower;
}

