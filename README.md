# Straddie Space Station Simulator

A static browser simulator for designing an abstract 425m2 Dunwich small-lot capsule habitat as if it were a terrestrial space station.

The app lets you Tetris fixed modules into floor plates, measure volume, capacity, rail connectivity, life-support load and autonomous-operation readiness, then export JSON or Markdown for agent simulations. Module sizes are deliberately editable so each cartridge can be worked out one by one before it becomes a hard assumption.

## Public URLs

- Repo: <https://github.com/auraofintelligence/straddie-space-station-simulator>
- Pages: <https://auraofintelligence.github.io/straddie-space-station-simulator/>

## Local Use

Open `index.html` directly, or serve the folder:

```powershell
python -m http.server 4194
```

Then open <http://127.0.0.1:4194/>.

## Files

- `index.html` - working layout simulator.
- `agent-scenarios.html` - agent simulation presets and future run notes.
- `sources.html` - public references and caveats.
- `assets/js/simulator-core.js` - pure layout and metrics logic.
- `assets/js/app.js` - browser UI.
- `assets/css/styles.css` - app styling.
- `tests/simulator-core.test.mjs` - Node checks for geometry, metrics and export logic.

## Boundary

This is a brave simulator, not an approval claim. Planning, fire, access, sanitation, insurance, robotics, finance and construction feasibility must be checked later by qualified people and systems.

The default scenario records a cleared, fenced small-lot partition and treats public imagery as possibly stale. The public copy keeps the exact address out of the headline.
