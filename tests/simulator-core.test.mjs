import assert from "node:assert/strict";
import {
  calculateMetrics,
  createInitialState,
  createMarkdownExport,
  createSeedLayout,
  duplicateFloor,
  exportJson,
  getGridDimensions,
  importJson,
  placeModule,
  removeModule,
  rotatePlacedModule,
  updateModuleSizing
} from "../assets/js/simulator-core.js";

let state = createInitialState();
assert.equal(state.floors.length, 4);

state.scenario.useCustomDimensions = true;
state.scenario.frontageM = 25.7;
state.scenario.depthM = 16.5;
state.scenario.footprintPct = 85;
let customDims = getGridDimensions(state.scenario);
assert.ok(customDims.cols > customDims.rows, "custom block shape should preserve the long edge");
assert.ok(Math.abs(customDims.lotArea - (25.7 * 16.5)) < 0.01, "custom lot area should follow block dimensions");
assert.ok(Math.abs(customDims.footprintArea - (customDims.lotArea * 0.85)) < 12, "custom footprint area should follow block percentage within grid rounding");

state = createInitialState();
let dims = getGridDimensions(state.scenario);
let result = placeModule(state, 0, "sleep", dims.footprintOffsetX, dims.footprintOffsetY);
assert.equal(result.ok, true);
state = result.state;
assert.equal(calculateMetrics(state).totals.sleepCapsules, 2);

result = placeModule(state, 0, "sleep", dims.footprintOffsetX, dims.footprintOffsetY);
assert.equal(result.ok, false, "overlap should be blocked");

result = placeModule(state, 0, "sleep", dims.cols, dims.rows);
assert.equal(result.ok, false, "out-of-bounds placement should be blocked");

result = placeModule(state, 0, "sleep", 0, 0);
assert.equal(result.ok, false, "normal modules outside the buildable footprint should be blocked");

const moduleId = state.floors[0].modules[0].id;
result = rotatePlacedModule(state, 0, moduleId);
assert.equal(result.ok, true, "rectangular sleep module should rotate");
state = result.state;

state = duplicateFloor(state, 0);
assert.equal(state.floors.length, 5);
assert.equal(calculateMetrics(state).totals.sleepCapsules, 4);

state = removeModule(state, 0, moduleId);
assert.equal(calculateMetrics(state).totals.sleepCapsules, 2);

state = updateModuleSizing(state, "sleep", { widthM: 3, depthM: 1.8, confidence: "test" });
assert.equal(state.moduleSizing.sleep.widthM, 3);
assert.equal(state.moduleSizing.sleep.confidence, "test");
dims = getGridDimensions(state.scenario);
result = placeModule(state, 0, "sleep", dims.footprintOffsetX + 8, dims.footprintOffsetY);
assert.equal(result.ok, true);
assert.equal(result.state.floors[0].modules.at(-1).widthM, 3, "new placements should use calibrated module sizing");

const seeded = createSeedLayout();
const metrics = calculateMetrics(seeded);
assert.ok(metrics.totals.sleepCapsules > 0);
assert.ok(metrics.totals.toilets > 0);
assert.ok(metrics.totals.showers > 0);
assert.equal(metrics.totals.railConnectedPct, 100);
assert.equal(metrics.warnings.length, 0);

let brokenRail = createInitialState();
const brokenDims = getGridDimensions(brokenRail.scenario);
result = placeModule(brokenRail, 0, "sleep", brokenDims.footprintOffsetX, brokenDims.footprintOffsetY);
brokenRail = result.state;
assert.ok(calculateMetrics(brokenRail).warnings.some((warning) => warning.includes("not rail-connected")));
assert.ok(calculateMetrics(brokenRail).warnings.some((warning) => warning.includes("external fire stair")));

const json = exportJson(seeded);
const imported = importJson(json);
assert.equal(imported.floors.length, seeded.floors.length);
assert.equal(calculateMetrics(imported).totals.sleepCapsules, metrics.totals.sleepCapsules);

const md = createMarkdownExport(seeded);
assert.match(md, /Module Calibration/);
assert.match(md, /Sleep capsules:/);
assert.match(md, /Agent Simulation Prompt/);
assert.match(md, /Block dimensions:/);

console.log("simulator-core tests passed");
