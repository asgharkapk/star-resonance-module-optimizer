# Blue Protocol Module Calculator

A web-based tool to calculate the best combinations of modules in **Blue Protocol**, optimizing for total levels, highest levels, or balanced performance. It allows you to import module data via CSV, dynamically calculate stats, and export results for further analysis.

---

## Features

- **Import modules from CSV** with all relevant stats.
- **Dynamic module table** with editable stat values.
- **Stat visibility toggle** – choose which stats to display.
- **Add or remove modules** on the fly.
- **Calculate best combinations**:
  - **Top Total** – highest overall levels.
  - **Highest Levels** – prioritizes modules with more high-level stats.
  - **Best Balanced** – maximizes minimum stat levels.
- **Export CSVs**:
  - Export the imported module table.
  - Export all computed results tables.
- **Color-coded stat levels** for easy visualization.
- **Icon support** – displays stat icons for each module.

---

# https://asgharkapk.github.io/star-resonance-module-optimizer/

---

## How to Use

### 1. Open the Calculator

Open the `index.html` file in a modern browser (Chrome, Firefox, Edge, etc.). No installation required.

### 2. Import Module Data

- Click the **file input** to select a CSV file containing module data.
- The CSV must have the following format:

```csv
Module Name,Strength Boost,Agility Boost,Intellect,Special Attack,Elite Strike,Healing Boost,...
X1,5,3,4,2,1,0,...
X2,6,2,3,1,2,1,...
````

* The calculator will automatically populate the table with the imported modules.

### 3. Adjust Stats (Optional)

* Edit stat values directly in the table.
* Toggle visibility of specific stats using the **checkbox panel**.
* Add new modules using the **+ Add Module** button or remove existing ones.

### 4. Calculate Best Combinations

* Choose a calculation method:

  * **Total Level** – sums up levels across all stats.
  * **Highest Levels** – prioritizes the modules with the most high-level stats.
* The calculator displays:

  * Top Total combos
  * Top combos per stat
  * Best Balanced combos

### 5. Export Results

* **Export Imported Table CSV** – downloads your input data.
* **Export All Output Tables CSV** – downloads the computed results for top combinations.

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

## Credits

* Stat icons and module information: [Maxroll Blue Protocol Guide](https://maxroll.gg/blue-protocol/resources/modules-guide)
* Created with ❤️ and ☕

---

## License

This project is open-source and free to use. Attribution appreciated.



Do you want me to make that version as well?
```
