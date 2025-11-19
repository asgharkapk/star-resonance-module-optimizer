# Blue Protocol Module Calculator

A web-based tool to calculate the best combinations of modules in **Blue Protocol**, optimizing for total levels, highest levels, or balanced performance. It allows you to import module data via CSV, dynamically calculate stats, and export results for further analysis.

### 🎮 Optimize Your Best DPS, Healer, Tank & Support Builds

<p align="center">
  <b>A powerful, React-based module optimizer for Blue Protocol — built using real Maxroll guide presets.</b>
</p>

---

## Features

- 📥**Import modules from CSV** with all relevant stats.
- 📥**Dynamic module table** with editable stat values.
* 💡 **Preset builds** from Maxroll (Falconry, Icicle, Vanguard, etc.)
* 🛠 **DPS / Healer / Tank / Support stat filters**
- **Stat visibility toggle** – choose which stats to display.
- **Add or remove modules** on the fly.
* 🔥 **Auto-calculates the strongest module combos**:
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

👉 **[https://asgharkapk.github.io/star-resonance-module-optimizer/backup/](https://asgharkapk.github.io/star-resonance-module-optimizer/backup/)**

👉 **[https://asgharkapk.github.io/star-resonance-module-optimizer/converter.html](https://asgharkapk.github.io/star-resonance-module-optimizer/converter.html)**

---

## 🔢 **Calculation Methods**

Your calculator supports **10 different combination-ranking modes**, each using a different sorting algorithm.
Below is the **complete list with short explanations matching your code**.

### **1️⃣ Total Level Mode (`total`)**

Ranks combos by the **sum of all stat levels**.
Good for builds that care about **overall stat coverage**.

Formula:
`score = sum(levels of all stats)`

### **2️⃣ Highest Levels Mode (`highest`)**

Ranks combos by **how many high-level stats** they have.
Level 6 > level 5 > level 4 → all the way down.
Great for builds that prioritize **top-tier stats**.

### **3️⃣ Ability Score Mode (`abilityScore`)**

Uses the game-like **Ability Score formula** (your `calculateSolutionScore`).
This is your **in-game accurate scoring mode**.

### **4️⃣ Target Level Mode (`targetLevel`)**

Ranks combos by how close they are to your **custom target level** for each stat.
Level is always computed normally — target only affects scoring.

Good for:

* hitting breakpoints
* build planning
* “I want level 4 Crit, level 3 ATK SPD, etc.”

Lower difference = better.

### **5️⃣ Smart Combination Mode (`smart`)**

Hybrid mode that combines 3 layers:

1. **More high-level stats first**
2. If tied → **higher total levels**
3. If tied → **higher raw stat sum**

This is the most “intelligent” all-around scorer.

### **6️⃣ Weighted Power Mode (`weighted`)**

Higher levels are given **exponential value**:

```
weights = [0, 1, 2, 4, 8, 16, 32]
```

Level 6 is **32×** stronger than level 1.

Good for:

* DPS builds
* high-impact stats
* crit / special-attack stacking

### **7️⃣ Balanced Mode (`balanced`)**

Ranks combos by **even distribution** of stat levels.

Prefers:

* higher average
* **lower variance**

Great for hybrid roles or supports that want balanced stats.

### **8️⃣ Spike Mode (`spike`)**

Focuses on **maximizing your single strongest stat**.

If two combos have the same highest-level stat:
→ higher total level wins.

Good for:

* “max Crit”
* “max Special Attack”
* any single-stat spike playstyle

### **9️⃣ Efficiency Mode (`efficiency`)**

Ranks combos by:

```
(raw stat sum) / (number of high-level stats)
```

This rewards:

* combos that give **a lot of stats per high-level slot**
* efficient module value

Useful for cost/value analysis.

### **🔟 Synergy Mode (`synergy`)**

Rewards combos where **paired stats rise together**.

Default synergy pairs:

```
Attack SPD ↔ Crit Focus
Healing Boost ↔ Healing Enhance
Strength Boost ↔ Special Attack
```

Extra synergy is added when both stats rise in parallel.

Best for:

* classes that rely on stat pairs
* healer builds
* combo-based scaling

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

* Stat icons and module information:➡️ **[Maxroll Blue Protocol Guide](https://maxroll.gg/blue-protocol/resources/modules-guide)**
* Score calculator code:➡️ **[StarResonanceAutoMod](https://github.com/fudiyangjin/StarResonanceAutoMod)**
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

---

# Module Log → CSV Converter

A simple web-based tool to convert Star Resonance module logs into CSV format with automatically generated module names (`X1`, `X2`, …). Supports light and dark themes, file upload, and direct CSV download.

---

## Features

- Convert module logs (`.log` or `.txt`) into a structured CSV.
- Automatically generates module names (`X1`, `X2`, …).
- Supports both light and dark themes with system preference detection.
- File upload with **automatic conversion**.
- Copy CSV output directly or download as a `.csv` file.
- Responsive and user-friendly design.

---

## How to Use

### 1. Export Module CSV from the Game

1. Install [Npcap](https://npcap.com/#download)  
   <button class="btn green">Npcap</button>
2. Download [StarResonanceAutoMod](https://github.com/fudiyangjin/StarResonanceAutoMod)  
   <button class="btn blue">StarResonanceAutoMod</button>
3. Run the game but **do not login**.
4. Open a command prompt in the StarResonanceAutoMod folder.
5. Run:
   ```text
   .\StarResonanceAutoMod.exe -a --debug -lang en
````

6. Login to the game and select your character.
7. The log file will be generated automatically.
8. Provide the log file to this converter webpage.
9. Download the CSV output.
10. Use the CSV with the [Module Calculator](https://asgharkapk.github.io/star-resonance-module-optimizer/) <button class="btn orange">Module Calculator</button>

---

### 2. Using the Converter

1. Open `index.html` in a browser.
2. Paste your module logs into the textarea **or** upload a `.log`/`.txt` file.
3. The CSV will be automatically generated below.
4. Click **Download CSV** to save the file.

---

## Theme Toggle

* Top-right 🌙 / ☀️ icon switches between light and dark mode.
* Automatically detects system theme or remembers your previous selection.

---

## File Upload

* Drag or select a `.log`/`.txt` file.
* The converter reads the content and generates the CSV automatically.

---

## Output Format

The CSV output contains:

```
Module,Stat1,Stat2,...
X1,10,5,...
X2,7,12,...
...
```

* Modules are named `X1`, `X2`, …
* All stats found in the log are included as columns.
* Missing stats are left empty.

---

## Tech Stack

* HTML, CSS, JavaScript
* No external dependencies required.

---

## License

This project is open-source and available under the MIT License.

---

## Screenshots

![Screenshot of converter](screenshot.png)

---

## Notes

* Ensure your log files are properly generated by StarResonanceAutoMod.
* Works best in modern browsers (Chrome, Edge, Firefox).

