# Blue Protocol Module Calculator

A web-based tool to calculate the best combinations of modules in **Blue Protocol**, optimizing for total levels, highest levels, or balanced performance. It allows you to import module data via CSV, dynamically calculate stats, and export results for further analysis.

### 🎮 Optimize Your Best DPS, Healer, Tank & Support Builds

<p align="center">
  <b>A powerful, React-based module optimizer for Blue Protocol — built using real Maxroll guide presets.</b>
</p>

---

## Features

* 📥 **CSV import** and
* 📤 **CSV export for all result tables**
- **Import modules from CSV** with all relevant stats.
- **Dynamic module table** with editable stat values.
* 💡 **Preset builds** from Maxroll (Falconry, Icicle, Vanguard, etc.)
* 🛠 **DPS / Healer / Tank / Support stat filters**
- **Stat visibility toggle** – choose which stats to display.
- **Add or remove modules** on the fly.
* 🔥 **Auto-calculates the strongest module combos**
- **Calculate best combinations**:
  - **Top Total** – highest overall levels.
  - **Highest Levels** – prioritizes modules with more high-level stats.
  - **Best Balanced** – maximizes minimum stat levels.
  * 📊 **Smart scoring system**
- **Export CSVs**:
  - Export the imported module table.
  - Export all computed results tables.
- **Color-coded stat levels** for easy visualization.
- **Icon support** – displays stat icons for each module.
* ⚡ Fast, browser-only — **no backend required!**

---

## 🚀 **Live Demo**

👉 **[https://asgharkapk.github.io/star-resonance-module-optimizer/](https://asgharkapk.github.io/star-resonance-module-optimizer/)**

---

## 📘 **How It Works**

### 1️⃣. Open the Calculator

Open the `index.html` file in a modern browser (Chrome, Firefox, Edge, etc.). No installation required.

### 2️⃣. **Import CSV**

- Click the **file input** to select a CSV file containing module data.
- The CSV must have the following format:

```csv
Module Name,Strength Boost,Agility Boost,Intellect,Special Attack,Elite Strike,Healing Boost,...
X1,5,3,4,2,1,0,...
X2,6,2,3,1,2,1,...
````

* The calculator will automatically populate the table with the imported modules.

### 3️⃣. **Select Stats**

You can:

* ✔ Show all stats
* ✔ Hide stats
* ✔ Auto-select by role (DPS / Healer / Tank / Support)
* ✔ Auto-select using Maxroll presets

* Edit stat values directly in the table.
* Toggle visibility of specific stats using the **checkbox panel**.
* Add new modules using the **+ Add Module** button or remove existing ones.

### 4️⃣. **Calculate Combos**

* Choose a calculation method:

  * **Total Level** – sums up levels across all stats.
  * **Highest Levels** – prioritizes the modules with the most high-level stats.
* The calculator displays:

  * Top Total combos
  * Top combos per stat
  * Best Balanced combos
   
The tool:

* Generates every possible **4-module combination**
* Calculates individual stat levels
* Scores using:

  * Basic Power Map
  * Special Power Map
  * Total Attribute Power

### 5️⃣. Export Results

* **Export Imported Table CSV** – downloads your input data.
* **Export All Output Tables CSV** – downloads the computed results for top combinations.

---
## 🧠 **Score Calculation Formula**

### Thresholds

```
[1, 4, 8, 12, 16, 20]
```

### Basic Attributes Power Map

```
{1:7, 2:14, 3:29, 4:44, 5:167, 6:254}
```

### Special Attributes Power Map

```
{1:14, 2:29, 3:59, 4:89, 5:298, 6:448}
```

### Total Attribute Power Map

*(0 → 120 mapped to 0 → 699)*

Used for final additive scoring.

---

## Stats & Levels

Each stat has a corresponding **icon** and is color-coded based on level:

| Level | Color       |
| ----- | ----------- |
| 0     | Gray        |
| 1     | Light Red   |
| 2     | Orange      |
| 3     | Yellow      |
| 4     | Light Green |
| 5     | Light Blue  |
| 6     | Blue        |

Thresholds for levels are automatically calculated based on the sum of stat points.

---

## Dependencies

* [React 18 UMD](https://reactjs.org/)
* [ReactDOM 18 UMD](https://reactjs.org/)
* No server required; runs entirely in the browser.

---

## 📦 **Tech Stack**

| Component | Technology              |
| --------- | ----------------------- |
| UI        | HTML + Inline CSS       |
| Logic     | Vanilla JS              |
| Framework | React 18 (CDN)          |
| Data      | CSV Import/Export       |
| Styling   | Windows Classical Theme |

---

## 🧩 **Maxroll Build Presets Included**

* Marksman — Wildpack / Falconry
* Beat Performer — Dissonance / Concerto
* Shield Knight — Shield / Recovery
* Heavy Guardian — Earthfort / Block
* Verdant Oracle — Smite / Lifebind
* Wind Knight — Vanguard / Skyward
* Frost Mage — Icicle / Frostbeam
* Stormblade — Moonstrike / Iaido Slash

Each preset:

* Auto-selects relevant stats
* Shows a unique icon
* Recalculates everything instantly

---

## 🤝 Contributing

Feel free to open:

* 🐞 Bug reports
* 📦 New preset PRs
* 🎨 UI theme requests
* ⚙ Feature suggestions

---

## Credits

* Stat icons and module information: [Maxroll Blue Protocol Guide](https://maxroll.gg/blue-protocol/resources/modules-guide)
* Created with ❤️ and ☕

---

## 🤝 Contributing

Feel free to open:

* 🐞 Bug reports
* 📦 New preset PRs
* 🎨 UI theme requests
* ⚙ Feature suggestions

---

## 📜 License

This project is open-source and free to use. Attribution appreciated.

---

<div align="center">

### © 2025 **Blue Protocol Calculator** 🌟  
Made for you with ❤️ and lots of ☕  

Big thanks to  
➡️ **[Maxroll](https://maxroll.gg/blue-protocol/resources/modules-guide)**  
for the awesome guides and in-game icons! 🎨  

Special thanks to  
➡️ **[StarResonanceAutoMod](https://github.com/fudiyangjin/StarResonanceAutoMod)**  
for the score calculator code! 🔢✨  

</div>
