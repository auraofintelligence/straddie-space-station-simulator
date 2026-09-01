# Straddie Space Station Simulator

<!-- github-organisation:start -->

## Project links and history

- First substantive build: 31 May 2026.
- GitHub repository: [straddie-space-station-simulator](https://github.com/auraofintelligence/straddie-space-station-simulator).
- Public site: [visit the public site](https://auraofintelligence.github.io/straddie-space-station-simulator/).

## Related public projects

Each link below reflects an evidenced family, lineage or direct connection. This project has 6 relevant public connections.

### Capsule, habitat and resilience simulation

- [Minjerribah-Resilience](https://github.com/auraofintelligence/Minjerribah-Resilience) - [public page](https://auraofintelligence.github.io/Minjerribah-Resilience/) - shared technical architecture.
- [SSB](https://github.com/auraofintelligence/SSB) - [public page](https://auraofintelligence.github.io/SSB/) - explicit cross-reference, shared technical architecture.
- [straddie-capsule-surge-lab](https://github.com/auraofintelligence/straddie-capsule-surge-lab) - [public page](https://auraofintelligence.github.io/straddie-capsule-surge-lab/) - explicit cross-reference, shared technical architecture.
- [straddie-digital-twin-builders](https://github.com/auraofintelligence/straddie-digital-twin-builders) - [public page](https://auraofintelligence.github.io/straddie-digital-twin-builders/) - explicit cross-reference, shared technical architecture.
- [straddie-disaster-kiosks](https://github.com/auraofintelligence/straddie-disaster-kiosks) - [public page](https://auraofintelligence.github.io/straddie-disaster-kiosks/) - shared technical architecture.
- [straddie-vitality-network-builders](https://github.com/auraofintelligence/straddie-vitality-network-builders) - [public page](https://auraofintelligence.github.io/straddie-vitality-network-builders/) - shared technical architecture.

<!-- github-organisation:end -->

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
