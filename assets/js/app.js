import {
  BASE_MODULE_TYPES,
  GRID_SIZE_M,
  calculateMetrics,
  createInitialState,
  createMarkdownExport,
  createSeedLayout,
  duplicateFloor,
  exportJson,
  findModuleAt,
  getGridDimensions,
  getRailNetwork,
  importJson,
  isModuleRailConnected,
  isInsideBuildableFootprint,
  placeModule,
  removeModule,
  resolveModuleType,
  rotatePlacedModule,
  setFloorCount,
  updateModuleSizing
} from "./simulator-core.js";

const STORAGE_KEY = "straddie-space-station-layout-v1";

let state = createSeedLayout();
let moduleFilter = "";

const pageTrail = [
  { page: "simulator", label: "Simulator", href: "index.html" },
  { page: "agents", label: "Agent Scenarios", href: "agent-scenarios.html" },
  { page: "sources", label: "Sources", href: "sources.html" }
];

function qs(selector, root = document) {
  return root.querySelector(selector);
}

function qsa(selector, root = document) {
  return [...root.querySelectorAll(selector)];
}

function setStatus(message) {
  const node = qs("[data-status]");
  if (node) node.textContent = message;
}

function renderHeaderFooter() {
  const page = document.body.dataset.page;
  const header = qs("[data-site-header]");
  if (header) {
    header.innerHTML = `
      <nav class="nav-shell" aria-label="Primary navigation">
        <a class="brand-link" href="index.html">
          <span class="mini-orbit"></span>
          <span>Straddie Space Station Simulator</span>
        </a>
        <div class="nav-links">
          ${pageTrail.map((item) => `<a href="${item.href}" ${item.page === page ? "aria-current=\"page\"" : ""}>${item.label}</a>`).join("")}
          <a href="https://github.com/auraofintelligence/straddie-space-station-simulator" target="_blank" rel="noopener noreferrer">Repo</a>
        </div>
      </nav>
    `;
  }
  const footer = qs("[data-site-footer]");
  if (footer) {
    footer.innerHTML = `
      <div>
        <strong>Simulation-first habitat tool.</strong>
        <p>Public copy keeps the live address abstract. Planning, fire, sanitation, insurance, finance and robotics approvals remain future checks.</p>
      </div>
      <div class="footer-links">
        ${pageTrail.map((item) => `<a href="${item.href}">${item.label}</a>`).join("")}
      </div>
    `;
  }
}

function renderTopButton() {
  const button = qs("[data-top-button]");
  if (!button) return;
  const update = () => button.classList.toggle("is-visible", window.scrollY > 300);
  button.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  window.addEventListener("scroll", update, { passive: true });
  update();
}

function renderModuleList() {
  const list = qs("[data-module-list]");
  if (!list) return;
  const selected = state.selectedType;
  const filter = moduleFilter.trim().toLowerCase();
  const groups = new Map();
  BASE_MODULE_TYPES
    .filter((type) => !filter || `${type.name} ${type.category} ${type.service}`.toLowerCase().includes(filter))
    .forEach((type) => {
      if (!groups.has(type.category)) groups.set(type.category, []);
      groups.get(type.category).push(type);
    });

  list.innerHTML = "";
  groups.forEach((types, category) => {
    const group = document.createElement("section");
    group.className = "module-group";
    group.innerHTML = `<h3>${category}</h3>`;
    types.forEach((baseType) => {
      const type = resolveModuleType(state, baseType.id);
      const button = document.createElement("button");
      button.type = "button";
      button.className = `module-button ${type.className || ""}`;
      button.dataset.selected = String(type.id === selected);
      button.innerHTML = `
        <span class="module-glyph">${type.icon}</span>
        <span class="module-copy">
          <strong>${type.name}</strong>
          <em>${type.widthM}m x ${type.depthM}m - ${type.confidence}</em>
        </span>
      `;
      button.addEventListener("click", () => {
        state.selectedType = type.id;
        state.selectedModuleId = null;
        render();
      });
      group.appendChild(button);
    });
    list.appendChild(group);
  });
}

function renderFloorTabs() {
  const mount = qs("[data-floor-tabs]");
  if (!mount) return;
  mount.innerHTML = "";
  state.floors.forEach((floor, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = String(index + 1).padStart(2, "0");
    button.dataset.active = String(index === state.scenario.activeFloor);
    button.addEventListener("click", () => {
      state.scenario.activeFloor = index;
      state.selectedModuleId = null;
      render();
    });
    mount.appendChild(button);
  });
}

function renderAxes(dims) {
  const top = qs("[data-axis-top]");
  const left = qs("[data-axis-left]");
  if (top) {
    top.innerHTML = "";
    for (let x = 0; x < dims.cols; x += 5) {
      const marker = document.createElement("span");
      marker.style.left = `${(x / dims.cols) * 100}%`;
      marker.textContent = `${Math.round(x * GRID_SIZE_M)}m`;
      top.appendChild(marker);
    }
  }
  if (left) {
    left.innerHTML = "";
    for (let y = 0; y < dims.rows; y += 5) {
      const marker = document.createElement("span");
      marker.style.top = `${(y / dims.rows) * 100}%`;
      marker.textContent = `${Math.round(y * GRID_SIZE_M)}m`;
      left.appendChild(marker);
    }
  }
}

function renderGrid() {
  const grid = qs("[data-floor-grid]");
  if (!grid) return;
  const floor = state.floors[state.scenario.activeFloor];
  const dims = getGridDimensions(state.scenario);
  const metrics = calculateMetrics(state);
  const network = getRailNetwork(state, floor, dims);
  renderAxes(dims);

  grid.style.setProperty("--cols", dims.cols);
  grid.style.setProperty("--rows", dims.rows);
  grid.style.setProperty("--plan-ratio", `${dims.widthM} / ${dims.depthM}`);
  grid.innerHTML = "";

  for (let y = 0; y < dims.rows; y += 1) {
    for (let x = 0; x < dims.cols; x += 1) {
      const cell = document.createElement("button");
      cell.type = "button";
      cell.className = "grid-cell";
      cell.dataset.x = String(x);
      cell.dataset.y = String(y);
      cell.dataset.footprint = String(isInsideBuildableFootprint({ x, y }, dims));
      const key = `${x},${y}`;
      if (network.railCells.has(key)) cell.dataset.rail = "true";
      if (network.connected.has(key)) cell.dataset.railConnected = "true";
      cell.addEventListener("click", () => handleGridClick(x, y));
      grid.appendChild(cell);
    }
  }

  const footprint = document.createElement("div");
  footprint.className = "footprint-overlay";
  footprint.style.gridColumn = `${dims.footprintOffsetX + 1} / span ${dims.footprintCols}`;
  footprint.style.gridRow = `${dims.footprintOffsetY + 1} / span ${dims.footprintRows}`;
  footprint.innerHTML = `<span>Buildable footprint ${state.scenario.footprintPct}% - ${dims.footprintWidthM}m x ${dims.footprintDepthM}m</span>`;
  grid.appendChild(footprint);

  const lotLabel = document.createElement("div");
  lotLabel.className = "lot-label";
  lotLabel.textContent = `Lot target ${state.scenario.siteArea}m2 - ${dims.nominalWidthM}m x ${dims.nominalDepthM}m`;
  grid.appendChild(lotLabel);

  const edgeLabel = document.createElement("div");
  edgeLabel.className = "street-edge-label";
  edgeLabel.textContent = "Street-edge robotic loading";
  grid.appendChild(edgeLabel);

  const scale = document.createElement("div");
  scale.className = "scale-bar";
  scale.innerHTML = "<span></span><em>5m</em>";
  grid.appendChild(scale);

  floor.modules.forEach((module) => {
    const type = resolveModuleType(state, module.typeId);
    const node = document.createElement("button");
    node.type = "button";
    node.className = `placed-module ${type.className || ""}`;
    node.dataset.selected = String(module.id === state.selectedModuleId);
    node.dataset.railProblem = String(type.railRequired && !isModuleRailConnected(state, floor, module, dims));
    node.style.gridColumn = `${module.x + 1} / span ${module.width}`;
    node.style.gridRow = `${module.y + 1} / span ${module.height}`;
    node.title = `${type.name}: ${module.widthM || (module.width * GRID_SIZE_M).toFixed(1)}m x ${module.depthM || (module.height * GRID_SIZE_M).toFixed(1)}m`;
    node.innerHTML = type.isRail
      ? `<span class="rail-mark">${type.railSwitch ? "X" : ""}</span>`
      : `
        <span>${type.icon}</span>
        <strong>${type.short}</strong>
        <em>${module.widthM || (module.width * GRID_SIZE_M).toFixed(1)} x ${module.depthM || (module.height * GRID_SIZE_M).toFixed(1)}m</em>
      `;
    node.addEventListener("click", (event) => {
      event.stopPropagation();
      state.selectedModuleId = module.id;
      state.selectedType = module.typeId;
      render();
    });
    grid.appendChild(node);
  });

  const label = qs("[data-grid-label]");
  if (label) label.textContent = `${state.scenario.siteArea}m2 lot / ${dims.footprintArea.toFixed(1)}m2 footprint`;
  const stats = qs("[data-plan-stats]");
  if (stats) {
    stats.innerHTML = `
      <span>Lot target ${state.scenario.siteArea}m2</span>
      <span>Shape ${dims.lotArea.toFixed(1)}m2</span>
      <span>Footprint ${dims.footprintArea.toFixed(1)}m2</span>
      <span>Grid ${dims.cols} x ${dims.rows}</span>
      <span>${GRID_SIZE_M}m cells</span>
    `;
  }
  const activeLabel = qs("[data-active-floor-label]");
  if (activeLabel) activeLabel.textContent = floor?.name || "Floor";
  const height = qs("[data-total-height]");
  if (height) height.textContent = `${metrics.totals.totalHeight}m stack`;
}

function handleGridClick(x, y) {
  const floorIndex = state.scenario.activeFloor;
  const floor = state.floors[floorIndex];
  const existing = findModuleAt(floor, x, y);
  if (existing) {
    state.selectedModuleId = existing.id;
    state.selectedType = existing.typeId;
    render();
    return;
  }
  const result = placeModule(state, floorIndex, state.selectedType, x, y, state.rotation);
  state = result.state;
  setStatus(result.ok ? "Module placed." : result.reason);
  render();
}

function metric(label, value, tone = "") {
  return `<article class="metric-card ${tone}"><span>${label}</span><strong>${value}</strong></article>`;
}

function renderMetrics() {
  const mount = qs("[data-metric-stack]");
  const warnings = qs("[data-warning-list]");
  if (!mount || !warnings) return;
  const { totals, dims, warnings: warningList } = calculateMetrics(state);
  mount.innerHTML = `
    ${metric("Sleep capsules", totals.sleepCapsules)}
    ${metric("Luggage lockers", totals.luggage)}
    ${metric("Wet modules", `${totals.toilets} T / ${totals.showers} S / ${totals.washPods} W`)}
    ${metric("Podcast / compute", `${totals.podcastPods} / ${totals.computePods}`)}
    ${metric("Used area", `${totals.usedAreaM2}m2`)}
    ${metric("Volume", `${totals.grossVolumeM3}m3`)}
    ${metric("Floor plate", `${dims.area.toFixed(1)}m2`)}
    ${metric("Rail connected", `${totals.railConnectedPct}%`, totals.railConnectedPct < 100 ? "warn" : "good")}
    ${metric("Robot route", totals.robotRouteComplexity)}
    ${metric("Water", `${totals.waterL}L/day`)}
    ${metric("Urine / faeces", `${totals.urineL || 0}L / ${totals.faecesL || 0}L`)}
    ${metric("Power / cooling", `${totals.powerKw}kW / ${totals.coolingKw}kW`)}
    ${metric("Autonomy", `${totals.autonomousScore}/100`, totals.autonomousScore < 60 ? "warn" : "good")}
    ${metric("Wellbeing", `${totals.wellbeingScore}/100`, totals.wellbeingScore < 65 ? "warn" : "good")}
    ${metric("Revenue placeholder", `$${Math.round(totals.revenueAud).toLocaleString("en-AU")}/day`)}
    ${metric("Civic hours", `${totals.civicHours}/day`)}
  `;
  warnings.innerHTML = warningList.length
    ? warningList.map((warning) => `<li>${warning}</li>`).join("")
    : "<li>No current warnings. Keep testing harder scenarios.</li>";
}

function renderSizingInspector() {
  const selected = resolveModuleType(state, state.selectedType);
  const panel = qs(".module-panel");
  if (!panel || !selected) return;
  let inspector = qs("[data-sizing-inspector]");
  if (!inspector) {
    inspector = document.createElement("section");
    inspector.className = "sizing-inspector";
    inspector.dataset.sizingInspector = "true";
    panel.appendChild(inspector);
  }
  inspector.innerHTML = `
    <h3>Module Calibration</h3>
    <p>${selected.basis}</p>
    <div class="calibration-row">
      <label><span>Width</span><input type="number" min="0.6" step="0.1" data-size-field="widthM" value="${selected.widthM}"><em>m</em></label>
      <label><span>Depth</span><input type="number" min="0.6" step="0.1" data-size-field="depthM" value="${selected.depthM}"><em>m</em></label>
    </div>
    <label class="basis-field"><span>Basis</span><textarea data-size-field="basis">${selected.basis}</textarea></label>
    <button type="button" class="ghost-button" data-action="apply-sizing">Apply calibration</button>
    <small>These are draft working dimensions. Work them out module by module, then test layouts.</small>
  `;
}

function bindSizingApply() {
  const button = qs("[data-action='apply-sizing']");
  if (!button) return;
  button.addEventListener("click", () => {
    const widthM = Number(qs("[data-size-field='widthM']").value);
    const depthM = Number(qs("[data-size-field='depthM']").value);
    const basis = qs("[data-size-field='basis']").value;
    state = updateModuleSizing(state, state.selectedType, { widthM, depthM, basis, confidence: "user-calibrated" });
    setStatus("Module calibration updated. Existing placed modules keep their old footprint; new placements use the revised size.");
    render();
  });
}

function renderExport(text = "") {
  const output = qs("[data-export-output]");
  if (output && text) output.value = text;
}

function syncControls() {
  qsa("[data-setting]").forEach((control) => {
    const key = control.dataset.setting;
    if (!(key in state.scenario)) return;
    if (control.type === "checkbox") control.checked = Boolean(state.scenario[key]);
    else control.value = state.scenario[key];
  });
  const rotation = qs("[data-rotation-state]");
  if (rotation) rotation.textContent = state.rotation ? "On" : "Off";
}

function bindControls() {
  qsa("[data-setting]").forEach((control) => {
    const applyControl = () => {
      const key = control.dataset.setting;
      let value = control.type === "checkbox" ? control.checked : control.value;
      if (control.type === "number" || control.tagName === "SELECT") value = Number(value);
      if (key === "floors") {
        state = setFloorCount(state, value);
      } else {
        state.scenario[key] = value;
      }
      render();
    };
    control.addEventListener("change", applyControl);
    if (control.tagName !== "SELECT" && control.type !== "checkbox") control.addEventListener("input", applyControl);
  });

  const filter = qs("[data-module-filter]");
  if (filter) {
    filter.addEventListener("input", () => {
      moduleFilter = filter.value;
      renderModuleList();
    });
  }

  qsa("[data-action]").forEach((button) => {
    button.addEventListener("click", () => handleAction(button.dataset.action));
  });
}

function handleAction(action) {
  const floorIndex = state.scenario.activeFloor;
  if (action === "rotate-palette") {
    state.rotation = !state.rotation;
    render();
  }
  if (action === "delete-selected" && state.selectedModuleId) {
    state = removeModule(state, floorIndex, state.selectedModuleId);
    setStatus("Selected module deleted.");
    render();
  }
  if (action === "rotate-selected" && state.selectedModuleId) {
    const result = rotatePlacedModule(state, floorIndex, state.selectedModuleId);
    state = result.state;
    setStatus(result.ok ? "Selected module rotated." : result.reason);
    render();
  }
  if (action === "duplicate-floor") {
    state = duplicateFloor(state, floorIndex);
    setStatus("Floor duplicated with cores and rails preserved.");
    render();
  }
  if (action === "clear") {
    state.floors[floorIndex].modules = [];
    state.selectedModuleId = null;
    setStatus("Active floor cleared.");
    render();
  }
  if (action === "seed") {
    state = createSeedLayout();
    setStatus("Seed layout loaded.");
    render();
  }
  if (action === "save") {
    localStorage.setItem(STORAGE_KEY, exportJson(state));
    setStatus("Layout saved in this browser.");
  }
  if (action === "load") {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      setStatus("No saved layout found in this browser.");
      return;
    }
    try {
      state = importJson(saved);
      setStatus("Saved layout loaded.");
      render();
    } catch (error) {
      setStatus(error.message);
    }
  }
  if (action === "export-json") renderExport(exportJson(state));
  if (action === "export-md") renderExport(createMarkdownExport(state));
}

function render() {
  if (!document.body.dataset.page || document.body.dataset.page !== "simulator") return;
  syncControls();
  renderModuleList();
  renderFloorTabs();
  renderGrid();
  renderMetrics();
  renderSizingInspector();
  bindSizingApply();
}

renderHeaderFooter();
renderTopButton();
if (document.body.dataset.page === "simulator") {
  bindControls();
  render();
  renderExport(createMarkdownExport(state));
}
