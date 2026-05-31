export const GRID_SIZE_M = 0.6;

export const DEFAULT_SCENARIO = {
  scenarioName: "Dunwich 425m2 corner-lot scenario",
  siteArea: 425,
  siteNote: "Cleared and fenced small-lot partition; public imagery may lag current ground conditions. Exact address stays out of public copy.",
  loadingEdge: "street-edge",
  frontageM: 25.7,
  depthM: 16.5,
  useCustomDimensions: false,
  footprintPct: 75,
  floors: 4,
  heightCap: 14,
  clearHeight: 2.4,
  structureDepth: 0.45,
  activeFloor: 0
};

export const BASE_MODULE_TYPES = [
  {
    id: "sleep",
    name: "Sleep + luggage cartridge",
    short: "SLEEP",
    icon: "S",
    className: "mod-sleep",
    category: "Sleep",
    service: "habitat",
    railRequired: true,
    draftWidthM: 2.4,
    draftDepthM: 1.8,
    sizingBasis: "Draft two-high cartridge: two capsule berths plus two separate luggage compartments. Needs iteration with real pod vendor, robot loading and access clearances.",
    confidence: "draft",
    metrics: { sleepCapsules: 2, luggage: 2, powerKw: 0.55, coolingKw: 0.48, waterL: 0, wasteL: 0, revenueAud: 150, civicHours: 0 }
  },
  {
    id: "vacuum-toilet",
    name: "Vacuum toilet cartridge",
    short: "TOILET",
    icon: "WC",
    className: "mod-waste",
    category: "Waste",
    service: "wet",
    railRequired: true,
    draftWidthM: 1.2,
    draftDepthM: 1.2,
    sizingBasis: "Draft compact vacuum toilet pod for separated urine and faeces capture. Needs product/system selection before locking.",
    confidence: "draft",
    metrics: { toilets: 1, powerKw: 0.2, coolingKw: 0.05, waterL: 8, urineL: 28, faecesL: 5, wasteL: 33, revenueAud: 0, civicHours: 0 }
  },
  {
    id: "shower",
    name: "Shower capsule",
    short: "SHOWER",
    icon: "SH",
    className: "mod-shower",
    category: "Wet",
    service: "wet",
    railRequired: true,
    draftWidthM: 1.8,
    draftDepthM: 1.8,
    sizingBasis: "Draft compact shower pod with wet-service wall and cleaning clearance. Needs user flow and waterproofing review.",
    confidence: "draft",
    metrics: { showers: 1, powerKw: 0.8, coolingKw: 0.1, waterL: 220, wasteL: 220, revenueAud: 0, civicHours: 0 }
  },
  {
    id: "wash",
    name: "Wash / vanity cartridge",
    short: "WASH",
    icon: "W",
    className: "mod-wash",
    category: "Wet",
    service: "wet",
    railRequired: true,
    draftWidthM: 1.2,
    draftDepthM: 1.2,
    sizingBasis: "Draft handwash, mirror and grooming module. Needs plumbing wall and queue model.",
    confidence: "draft",
    metrics: { washPods: 1, powerKw: 0.12, coolingKw: 0.03, waterL: 45, wasteL: 45, revenueAud: 0, civicHours: 0 }
  },
  {
    id: "podcast",
    name: "Podcast / recording capsule",
    short: "PODCAST",
    icon: "REC",
    className: "mod-podcast",
    category: "Media",
    service: "media",
    railRequired: true,
    draftWidthM: 2.4,
    draftDepthM: 2.4,
    sizingBasis: "Draft one-person acoustic pod. Needs acoustic treatment and ventilation allowance.",
    confidence: "draft",
    metrics: { podcastPods: 1, powerKw: 0.45, coolingKw: 0.32, waterL: 0, wasteL: 0, revenueAud: 160, civicHours: 6 }
  },
  {
    id: "compute",
    name: "Compute / simulation cartridge",
    short: "COMPUTE",
    icon: "GPU",
    className: "mod-compute",
    category: "Compute",
    service: "compute",
    railRequired: true,
    draftWidthM: 2.4,
    draftDepthM: 2.4,
    sizingBasis: "Draft compute booth or micro-rack bay. Needs heat, noise, airflow and electrical load review.",
    confidence: "draft",
    metrics: { computePods: 1, powerKw: 2.6, coolingKw: 1.8, waterL: 0, wasteL: 0, revenueAud: 220, civicHours: 8 }
  },
  {
    id: "concierge",
    name: "AI concierge / check-in",
    short: "AI",
    icon: "AI",
    className: "mod-concierge",
    category: "Control",
    service: "control",
    railRequired: false,
    draftWidthM: 2.4,
    draftDepthM: 1.8,
    sizingBasis: "Draft kiosk/vestibule for autonomous access, wayfinding and emergency triage.",
    confidence: "draft",
    metrics: { concierge: 1, powerKw: 0.6, coolingKw: 0.25, waterL: 0, wasteL: 0, revenueAud: 0, civicHours: 4 }
  },
  {
    id: "robot-bay",
    name: "Robot service bay",
    short: "ROBOT",
    icon: "R",
    className: "mod-robot",
    category: "Robotics",
    service: "robotics",
    railRequired: false,
    railSource: true,
    draftWidthM: 3,
    draftDepthM: 2.4,
    sizingBasis: "Draft charging, parking and service bay for pod movers, cleaners and inspection robots.",
    confidence: "draft",
    metrics: { robotBays: 1, powerKw: 1.2, coolingKw: 0.35, waterL: 0, wasteL: 0, revenueAud: 0, civicHours: 0 }
  },
  {
    id: "plant",
    name: "Plant / life-support",
    short: "PLANT",
    icon: "PL",
    className: "mod-plant",
    category: "Life Support",
    service: "plant",
    railRequired: false,
    draftWidthM: 3.6,
    draftDepthM: 2.4,
    sizingBasis: "Draft mechanical/electrical/water/air plant bay. This is deliberately conservative until real systems are chosen.",
    confidence: "draft",
    metrics: { plant: 1, powerKw: 2.4, coolingKw: -2.5, waterL: 0, wasteL: 0, revenueAud: 0, civicHours: 0 }
  },
  {
    id: "external-stair",
    name: "External fire stair",
    short: "STAIR",
    icon: "ST",
    className: "mod-stair",
    category: "Core",
    service: "egress",
    railRequired: false,
    draftWidthM: 2.4,
    draftDepthM: 3,
    sizingBasis: "Draft egress placeholder only. Real stair dimensions require NCC/fire-engineering design.",
    confidence: "placeholder",
    metrics: { stairs: 1, powerKw: 0.05, coolingKw: 0, waterL: 0, wasteL: 0, revenueAud: 0, civicHours: 0 }
  },
  {
    id: "elevator",
    name: "Small internal elevator",
    short: "LIFT",
    icon: "L",
    className: "mod-lift",
    category: "Core",
    service: "core",
    railRequired: false,
    railSource: true,
    verticalCore: true,
    draftWidthM: 1.8,
    draftDepthM: 1.8,
    sizingBasis: "Draft lift shaft placeholder for people, accessibility and vertical robot transfer. Real lift dimensions require product/code selection.",
    confidence: "placeholder",
    metrics: { elevators: 1, powerKw: 1.6, coolingKw: 0.2, waterL: 0, wasteL: 0, revenueAud: 0, civicHours: 0 }
  },
  {
    id: "loading",
    name: "Street-edge robotic loading bay",
    short: "LOAD",
    icon: "LD",
    className: "mod-loading",
    category: "Robotics",
    service: "loading",
    railRequired: false,
    railSource: true,
    draftWidthM: 3.6,
    draftDepthM: 2.4,
    sizingBasis: "Draft street-edge robotic loading/service bay. Public wording avoids exact address naming.",
    confidence: "draft",
    metrics: { loadingBays: 1, powerKw: 0.8, coolingKw: 0.1, waterL: 0, wasteL: 0, revenueAud: 0, civicHours: 0 }
  },
  {
    id: "rail",
    name: "Floor / ceiling rail",
    short: "RAIL",
    icon: "==",
    className: "mod-rail",
    category: "Rail",
    service: "rail",
    isRail: true,
    railRequired: false,
    draftWidthM: 0.6,
    draftDepthM: 0.6,
    sizingBasis: "One grid cell of rail path. Real rail hardware needs a separate mechanical model.",
    confidence: "grid",
    metrics: { railCells: 1, powerKw: 0.01, coolingKw: 0, waterL: 0, wasteL: 0, revenueAud: 0, civicHours: 0 }
  },
  {
    id: "switch",
    name: "Rail switch node",
    short: "SWITCH",
    icon: "X",
    className: "mod-switch",
    category: "Rail",
    service: "rail",
    isRail: true,
    railSwitch: true,
    railRequired: false,
    draftWidthM: 0.6,
    draftDepthM: 0.6,
    sizingBasis: "One grid cell rail switch placeholder. Real switching geometry may be larger.",
    confidence: "grid",
    metrics: { railSwitches: 1, powerKw: 0.04, coolingKw: 0, waterL: 0, wasteL: 0, revenueAud: 0, civicHours: 0 }
  },
  {
    id: "service-shaft",
    name: "Service shaft",
    short: "SHAFT",
    icon: "SV",
    className: "mod-shaft",
    category: "Core",
    service: "core",
    railRequired: false,
    verticalCore: true,
    draftWidthM: 1.2,
    draftDepthM: 1.2,
    sizingBasis: "Draft vertical shaft for services, not final engineering.",
    confidence: "placeholder",
    metrics: { shafts: 1, powerKw: 0.05, coolingKw: 0, waterL: 0, wasteL: 0, revenueAud: 0, civicHours: 0 }
  }
];

export const MODULE_TYPES = BASE_MODULE_TYPES;

export function unitsFromMetres(value) {
  return Math.max(1, Math.round(Number(value) / GRID_SIZE_M));
}

export function metresFromUnits(value) {
  return Number((value * GRID_SIZE_M).toFixed(2));
}

export function createDefaultSizing() {
  return Object.fromEntries(BASE_MODULE_TYPES.map((type) => [
    type.id,
    {
      widthM: type.draftWidthM,
      depthM: type.draftDepthM,
      width: unitsFromMetres(type.draftWidthM),
      height: unitsFromMetres(type.draftDepthM),
      basis: type.sizingBasis,
      confidence: type.confidence
    }
  ]));
}

export function getModuleType(typeId) {
  return BASE_MODULE_TYPES.find((type) => type.id === typeId);
}

export function resolveModuleType(state, typeId) {
  const base = getModuleType(typeId);
  if (!base) return null;
  const sizing = state?.moduleSizing?.[typeId];
  if (!sizing) {
    return {
      ...base,
      width: unitsFromMetres(base.draftWidthM),
      height: unitsFromMetres(base.draftDepthM),
      widthM: base.draftWidthM,
      depthM: base.draftDepthM,
      basis: base.sizingBasis,
      confidence: base.confidence
    };
  }
  return { ...base, ...sizing };
}

export function createInitialState() {
  const scenario = { ...DEFAULT_SCENARIO };
  return {
    scenario,
    moduleSizing: createDefaultSizing(),
    floors: Array.from({ length: scenario.floors }, (_, index) => ({
      id: `floor-${index + 1}`,
      name: `Floor ${index + 1}`,
      modules: []
    })),
    selectedType: "sleep",
    rotation: false,
    selectedModuleId: null
  };
}

export function cloneState(state) {
  return JSON.parse(JSON.stringify(state));
}

export function updateModuleSizing(state, typeId, patch) {
  const next = cloneState(state);
  const current = next.moduleSizing[typeId];
  if (!current) return next;
  const widthM = patch.widthM !== undefined ? clamp(Number(patch.widthM), 0.6, 12) : current.widthM;
  const depthM = patch.depthM !== undefined ? clamp(Number(patch.depthM), 0.6, 12) : current.depthM;
  next.moduleSizing[typeId] = {
    ...current,
    ...patch,
    widthM,
    depthM,
    width: unitsFromMetres(widthM),
    height: unitsFromMetres(depthM),
    confidence: patch.confidence || current.confidence
  };
  return next;
}

export function getFootprintArea(scenario) {
  return scenario.siteArea * (scenario.footprintPct / 100);
}

export function getGridDimensions(scenario) {
  const area = getFootprintArea(scenario);
  const customArea = Number(scenario.frontageM) * Number(scenario.depthM);
  const useCustom = scenario.useCustomDimensions && customArea > 0;
  const scale = useCustom ? Math.sqrt(area / customArea) : 1;
  const assumedRatio = 1.55;
  const widthM = useCustom ? Number(scenario.frontageM) * scale : Math.sqrt(area * assumedRatio);
  const depthM = useCustom ? Number(scenario.depthM) * scale : area / widthM;
  return {
    cols: Math.max(12, Math.round(widthM / GRID_SIZE_M)),
    rows: Math.max(10, Math.round(depthM / GRID_SIZE_M)),
    widthM,
    depthM,
    area
  };
}

export function moduleSize(type, rotated = false) {
  return rotated && type.width !== type.height
    ? { width: type.height, height: type.width }
    : { width: type.width, height: type.height };
}

export function moduleAreaM2(moduleOrType) {
  const width = moduleOrType.width || 1;
  const height = moduleOrType.height || 1;
  return width * height * GRID_SIZE_M * GRID_SIZE_M;
}

export function moduleCells(module) {
  const cells = [];
  for (let y = module.y; y < module.y + module.height; y += 1) {
    for (let x = module.x; x < module.x + module.width; x += 1) {
      cells.push(`${x},${y}`);
    }
  }
  return cells;
}

export function findModuleAt(floor, x, y) {
  return floor.modules.find((module) => x >= module.x && x < module.x + module.width && y >= module.y && y < module.y + module.height);
}

export function canPlaceModule(floor, candidate, dims) {
  if (candidate.x < 0 || candidate.y < 0 || candidate.x + candidate.width > dims.cols || candidate.y + candidate.height > dims.rows) {
    return { ok: false, reason: "Module exceeds the selected floor plate." };
  }
  const existing = new Set();
  floor.modules
    .filter((module) => module.id !== candidate.id)
    .forEach((module) => moduleCells(module).forEach((cell) => existing.add(cell)));
  const overlap = moduleCells(candidate).find((cell) => existing.has(cell));
  if (overlap) return { ok: false, reason: "Module overlaps another module." };
  return { ok: true, reason: "" };
}

export function placeModule(state, floorIndex, typeId, x, y, rotated = false) {
  const next = cloneState(state);
  const floor = next.floors[floorIndex];
  const type = resolveModuleType(next, typeId);
  if (!floor || !type) return { state, ok: false, reason: "Unknown floor or module type." };
  const size = moduleSize(type, rotated);
  const candidate = {
    id: `${typeId}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    typeId,
    x,
    y,
    width: size.width,
    height: size.height,
    widthM: metresFromUnits(size.width),
    depthM: metresFromUnits(size.height),
    rotated
  };
  const check = canPlaceModule(floor, candidate, getGridDimensions(next.scenario));
  if (!check.ok) return { state, ok: false, reason: check.reason };
  floor.modules.push(candidate);
  next.selectedModuleId = candidate.id;
  return { state: next, ok: true, reason: "" };
}

export function removeModule(state, floorIndex, moduleId) {
  const next = cloneState(state);
  const floor = next.floors[floorIndex];
  if (!floor) return state;
  floor.modules = floor.modules.filter((module) => module.id !== moduleId);
  if (next.selectedModuleId === moduleId) next.selectedModuleId = null;
  return next;
}

export function rotatePlacedModule(state, floorIndex, moduleId) {
  const next = cloneState(state);
  const floor = next.floors[floorIndex];
  const module = floor?.modules.find((item) => item.id === moduleId);
  if (!module || module.width === module.height) return { state, ok: false, reason: "Module cannot rotate." };
  const candidate = {
    ...module,
    width: module.height,
    height: module.width,
    widthM: metresFromUnits(module.height),
    depthM: metresFromUnits(module.width),
    rotated: !module.rotated
  };
  const check = canPlaceModule(floor, candidate, getGridDimensions(next.scenario));
  if (!check.ok) return { state, ok: false, reason: check.reason };
  Object.assign(module, candidate);
  return { state: next, ok: true, reason: "" };
}

export function duplicateFloor(state, floorIndex) {
  const next = cloneState(state);
  const source = next.floors[floorIndex];
  if (!source) return state;
  const copy = {
    id: `floor-${Date.now()}`,
    name: `Floor ${next.floors.length + 1}`,
    modules: source.modules.map((module) => ({ ...module, id: `${module.typeId}-${Date.now()}-${Math.random().toString(16).slice(2)}` }))
  };
  next.floors.splice(floorIndex + 1, 0, copy);
  next.floors.forEach((floor, index) => { floor.name = `Floor ${index + 1}`; });
  next.scenario.floors = next.floors.length;
  next.scenario.activeFloor = floorIndex + 1;
  next.selectedModuleId = null;
  return next;
}

export function setFloorCount(state, count) {
  const next = cloneState(state);
  const safeCount = Math.max(1, Math.min(8, Number(count) || 1));
  while (next.floors.length < safeCount) {
    next.floors.push({ id: `floor-${next.floors.length + 1}`, name: `Floor ${next.floors.length + 1}`, modules: [] });
  }
  while (next.floors.length > safeCount) next.floors.pop();
  next.floors.forEach((floor, index) => { floor.name = `Floor ${index + 1}`; });
  next.scenario.floors = safeCount;
  next.scenario.activeFloor = Math.min(next.scenario.activeFloor, safeCount - 1);
  next.selectedModuleId = null;
  return next;
}

function isRailLike(state, module) {
  const type = resolveModuleType(state, module.typeId);
  return Boolean(type?.isRail || type?.railSource);
}

function adjacentCells(module, dims) {
  const cells = [];
  for (let x = module.x; x < module.x + module.width; x += 1) {
    cells.push(`${x},${module.y - 1}`, `${x},${module.y + module.height}`);
  }
  for (let y = module.y; y < module.y + module.height; y += 1) {
    cells.push(`${module.x - 1},${y}`, `${module.x + module.width},${y}`);
  }
  return cells.filter((cell) => {
    const [x, y] = cell.split(",").map(Number);
    return x >= 0 && y >= 0 && x < dims.cols && y < dims.rows;
  });
}

export function getRailNetwork(state, floor, dims) {
  const railCells = new Set();
  const sourceCells = new Set();
  floor.modules.forEach((module) => {
    if (!isRailLike(state, module)) return;
    moduleCells(module).forEach((cell) => {
      railCells.add(cell);
      const type = resolveModuleType(state, module.typeId);
      if (type?.railSource) sourceCells.add(cell);
    });
  });
  const connected = new Set();
  const queue = [...sourceCells];
  while (queue.length) {
    const cell = queue.shift();
    if (connected.has(cell) || !railCells.has(cell)) continue;
    connected.add(cell);
    const [x, y] = cell.split(",").map(Number);
    [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dy]) => {
      const next = `${x + dx},${y + dy}`;
      if (railCells.has(next) && !connected.has(next)) queue.push(next);
    });
  }
  return { railCells, sourceCells, connected };
}

export function isModuleRailConnected(state, floor, module, dims) {
  const type = resolveModuleType(state, module.typeId);
  if (!type?.railRequired) return true;
  const network = getRailNetwork(state, floor, dims);
  return adjacentCells(module, dims).some((cell) => network.connected.has(cell));
}

function distanceCells(a, b) {
  const ax = a.x + a.width / 2;
  const ay = a.y + a.height / 2;
  const bx = b.x + b.width / 2;
  const by = b.y + b.height / 2;
  return Math.abs(ax - bx) + Math.abs(ay - by);
}

export function calculateMetrics(state) {
  const dims = getGridDimensions(state.scenario);
  const totals = {
    modules: 0,
    usedAreaM2: 0,
    grossVolumeM3: 0,
    sleepCapsules: 0,
    luggage: 0,
    toilets: 0,
    showers: 0,
    washPods: 0,
    podcastPods: 0,
    computePods: 0,
    concierge: 0,
    robotBays: 0,
    plant: 0,
    stairs: 0,
    elevators: 0,
    loadingBays: 0,
    railCells: 0,
    railSwitches: 0,
    waterL: 0,
    wasteL: 0,
    urineL: 0,
    faecesL: 0,
    powerKw: 0,
    coolingKw: 0,
    revenueAud: 0,
    civicHours: 0,
    railRequired: 0,
    railConnected: 0
  };
  const warnings = [];
  let robotRouteComplexity = 0;
  const elevatorPositionsByFloor = [];

  state.floors.forEach((floor, floorIndex) => {
    const network = getRailNetwork(state, floor, dims);
    totals.railCells += network.railCells.size;
    const hasStair = floor.modules.some((module) => module.typeId === "external-stair");
    const hasLoading = floor.modules.some((module) => module.typeId === "loading");
    const plants = floor.modules.filter((module) => module.typeId === "plant");
    const wetModules = floor.modules.filter((module) => ["vacuum-toilet", "shower", "wash"].includes(module.typeId));
    const elevators = floor.modules.filter((module) => module.typeId === "elevator");
    elevatorPositionsByFloor.push(elevators.map((module) => `${module.x},${module.y}`));

    if (!hasStair) warnings.push(`Floor ${floorIndex + 1}: external fire stair placeholder missing.`);
    if (floorIndex === 0 && !hasLoading) warnings.push("Ground floor: street-edge robotic loading bay missing.");
    if (floorIndex > 0 && elevators.length === 0) warnings.push(`Floor ${floorIndex + 1}: no small internal elevator placeholder.`);
    if (network.sourceCells.size === 0 && floor.modules.some((module) => resolveModuleType(state, module.typeId)?.railRequired)) {
      warnings.push(`Floor ${floorIndex + 1}: rail modules have no loading/elevator/robot source.`);
    }

    wetModules.forEach((module) => {
      if (!plants.length) {
        warnings.push(`Floor ${floorIndex + 1}: wet module has no plant/life-support module on the floor.`);
        return;
      }
      const nearest = Math.min(...plants.map((plant) => distanceCells(module, plant)));
      if (nearest > 14) warnings.push(`Floor ${floorIndex + 1}: wet module is far from plant/life-support.`);
    });

    floor.modules.forEach((module) => {
      const type = resolveModuleType(state, module.typeId);
      if (!type) return;
      totals.modules += 1;
      const area = moduleAreaM2(module);
      totals.usedAreaM2 += area;
      totals.grossVolumeM3 += area * state.scenario.clearHeight;
      Object.entries(type.metrics || {}).forEach(([key, value]) => {
        totals[key] = (totals[key] || 0) + value;
      });
      if (type.railRequired) {
        totals.railRequired += 1;
        if (isModuleRailConnected(state, floor, module, dims)) totals.railConnected += 1;
        else warnings.push(`Floor ${floorIndex + 1}: ${type.name} at ${module.x + 1},${module.y + 1} is not rail-connected.`);
      }
    });

    const floorSwitches = floor.modules.filter((module) => module.typeId === "switch").length;
    robotRouteComplexity += network.connected.size + floorSwitches * 3 + Math.max(0, network.railCells.size - network.connected.size) * 2;
  });

  if (state.floors.length > 1) {
    const common = elevatorPositionsByFloor.reduce((shared, positions, index) => {
      if (index === 0) return new Set(positions);
      return new Set([...shared].filter((position) => positions.includes(position)));
    }, new Set());
    if (common.size === 0) warnings.push("Multi-floor layout: elevator cores do not align across all floors.");
  }

  const totalHeight = state.floors.length * (state.scenario.clearHeight + state.scenario.structureDepth);
  if (totalHeight > state.scenario.heightCap) warnings.push(`Height scenario exceeds cap: ${totalHeight.toFixed(1)}m stack against ${state.scenario.heightCap}m cap.`);

  const availableAreaAllFloors = getFootprintArea(state.scenario) * state.floors.length;
  if (totals.usedAreaM2 > availableAreaAllFloors) warnings.push("Used module area exceeds selected footprint scenario.");

  const railConnectedPct = totals.railRequired ? Math.round((totals.railConnected / totals.railRequired) * 100) : 100;
  const bedsPerToilet = totals.toilets ? totals.sleepCapsules / totals.toilets : Infinity;
  const bedsPerShower = totals.showers ? totals.sleepCapsules / totals.showers : Infinity;
  const hygienePenalty = (bedsPerToilet > 12 ? 10 : 0) + (bedsPerShower > 12 ? 10 : 0) + (!totals.toilets && totals.sleepCapsules ? 20 : 0) + (!totals.showers && totals.sleepCapsules ? 20 : 0);
  const autonomyBonus = Math.min(18, totals.robotBays * 5 + totals.concierge * 4 + totals.loadingBays * 4 + totals.elevators * 2);
  const warningPenalty = Math.min(45, warnings.length * 5);
  const railPenalty = Math.max(0, 100 - railConnectedPct) / 3;
  const routePenalty = Math.min(20, robotRouteComplexity / 25);
  const autonomousScore = clamp(Math.round(74 + autonomyBonus - warningPenalty - railPenalty - routePenalty), 0, 100);
  const wellbeingScore = clamp(Math.round(82 - hygienePenalty - warningPenalty / 2 + Math.min(10, totals.washPods * 2) + Math.min(6, totals.plant * 2)), 0, 100);

  return {
    dims,
    totals: {
      ...totals,
      usedAreaM2: round(totals.usedAreaM2, 1),
      grossVolumeM3: round(totals.grossVolumeM3, 1),
      powerKw: round(totals.powerKw, 1),
      coolingKw: round(Math.max(0, totals.coolingKw), 1),
      waterL: Math.round(totals.waterL),
      wasteL: Math.round(totals.wasteL),
      railConnectedPct,
      robotRouteComplexity: Math.round(robotRouteComplexity),
      autonomousScore,
      wellbeingScore,
      availableAreaAllFloors: round(availableAreaAllFloors, 1),
      envelopeVolumeM3: round(getFootprintArea(state.scenario) * state.scenario.clearHeight * state.floors.length, 1),
      totalHeight: round(totalHeight, 1)
    },
    warnings
  };
}

export function validateLayout(state) {
  return calculateMetrics(state).warnings;
}

export function createMarkdownExport(state) {
  const metrics = calculateMetrics(state);
  const lines = [
    "# Straddie Space Station Simulator Layout",
    "",
    "## Scenario",
    "",
    `- Scenario name: ${state.scenario.scenarioName || "Untitled block scenario"}`,
    `- Site note: ${state.scenario.siteNote || "No site note supplied"}`,
    `- Loading edge: ${state.scenario.loadingEdge || "street-edge"}`,
    `- Site scenario: ${state.scenario.siteArea}m2 abstract small-lot`,
    `- Block dimensions: ${state.scenario.frontageM}m frontage x ${state.scenario.depthM}m depth (${state.scenario.useCustomDimensions ? "used for grid shape" : "recorded only"})`,
    `- Footprint preset: ${state.scenario.footprintPct}% (${getFootprintArea(state.scenario).toFixed(1)}m2 per floor)`,
    `- Floors: ${state.floors.length}`,
    `- Clear ceiling height: ${state.scenario.clearHeight}m`,
    `- Height cap: ${state.scenario.heightCap}m`,
    `- Grid: ${GRID_SIZE_M}m x ${GRID_SIZE_M}m`,
    "",
    "## Module Calibration",
    "",
    ...BASE_MODULE_TYPES.map((type) => {
      const sizing = state.moduleSizing[type.id];
      return `- ${type.name}: ${sizing.widthM}m x ${sizing.depthM}m (${sizing.confidence}) - ${sizing.basis}`;
    }),
    "",
    "## Module Totals",
    "",
    `- Sleep capsules: ${metrics.totals.sleepCapsules}`,
    `- Luggage compartments: ${metrics.totals.luggage}`,
    `- Vacuum toilets: ${metrics.totals.toilets}`,
    `- Showers: ${metrics.totals.showers}`,
    `- Podcast capsules: ${metrics.totals.podcastPods}`,
    `- Compute capsules: ${metrics.totals.computePods}`,
    `- External fire stair placeholders: ${metrics.totals.stairs}`,
    `- Small internal elevators: ${metrics.totals.elevators}`,
    `- Street-edge robotic loading bays: ${metrics.totals.loadingBays}`,
    "",
    "## Habitat Metrics",
    "",
    `- Used module area: ${metrics.totals.usedAreaM2}m2`,
    `- Used module volume: ${metrics.totals.grossVolumeM3}m3`,
    `- Scenario envelope volume: ${metrics.totals.envelopeVolumeM3}m3`,
    `- Rail-connected robot-placeable modules: ${metrics.totals.railConnectedPct}%`,
    `- Robot route complexity: ${metrics.totals.robotRouteComplexity}`,
    `- Estimated water demand: ${metrics.totals.waterL}L/day`,
    `- Estimated waste stream: ${metrics.totals.wasteL}L/day`,
    `- Urine capture estimate: ${metrics.totals.urineL || 0}L/day`,
    `- Faeces capture estimate: ${metrics.totals.faecesL || 0}L/day`,
    `- Energy load: ${metrics.totals.powerKw}kW`,
    `- Cooling load: ${metrics.totals.coolingKw}kW`,
    `- Autonomous operation score: ${metrics.totals.autonomousScore}/100`,
    `- Habitat wellbeing score: ${metrics.totals.wellbeingScore}/100`,
    "",
    "## Warnings And Caveats",
    "",
    ...(metrics.warnings.length ? metrics.warnings.map((warning) => `- ${warning}`) : ["- No current simulator warnings."]),
    "",
    "## Agent Simulation Prompt",
    "",
    "Run a multi-agent simulation with roles for minimalist guests, sports teams, podcast users, pod-moving robots, cleaners, rail scheduler, AI concierge, plant/life-support, water, separated urine/faeces waste streams, power, cooling and emergency conditions.",
    "",
    "Test sports weekend, quiet weekday, podcast/media day, disaster support mode and robot maintenance night. Score queue stress, sleep privacy, rail congestion, water/waste load, air quality, autonomy and civic capacity.",
    "",
    "## Boundary",
    "",
    "This is a futuristic simulator. It is not a planning, fire, sanitation, insurance, finance or robotics approval claim."
  ];
  return lines.join("\n") + "\n";
}

export function exportJson(state) {
  return JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), state }, null, 2);
}

export function importJson(json) {
  const parsed = typeof json === "string" ? JSON.parse(json) : json;
  if (!parsed?.state?.scenario || !Array.isArray(parsed?.state?.floors)) {
    throw new Error("Invalid simulator layout JSON.");
  }
  return parsed.state;
}

export function createSeedLayout() {
  let state = createInitialState();
  const placements = [
    [0, "loading", 1, 1], [0, "external-stair", 1, 7], [0, "elevator", 7, 7], [0, "robot-bay", 1, 15], [0, "plant", 25, 16],
    [0, "rail", 7, 4], [0, "rail", 8, 4], [0, "rail", 9, 4], [0, "rail", 10, 4], [0, "rail", 11, 4], [0, "rail", 12, 4], [0, "rail", 13, 4], [0, "rail", 14, 4], [0, "rail", 15, 4], [0, "rail", 16, 4], [0, "rail", 17, 4], [0, "rail", 18, 4], [0, "switch", 19, 4],
    [0, "rail", 20, 4], [0, "rail", 21, 4], [0, "rail", 22, 4], [0, "rail", 23, 4], [0, "rail", 24, 4], [0, "rail", 25, 4], [0, "rail", 26, 4], [0, "rail", 27, 4], [0, "rail", 28, 4], [0, "rail", 29, 4], [0, "rail", 30, 4], [0, "rail", 31, 4], [0, "rail", 32, 4],
    [0, "rail", 19, 5], [0, "rail", 19, 6], [0, "rail", 19, 7], [0, "rail", 19, 8], [0, "rail", 19, 9], [0, "rail", 19, 10], [0, "rail", 19, 11], [0, "switch", 19, 12],
    [0, "rail", 20, 10], [0, "rail", 21, 10], [0, "rail", 22, 10], [0, "rail", 23, 10],
    [0, "rail", 19, 13], [0, "rail", 8, 13], [0, "rail", 9, 13], [0, "rail", 10, 13], [0, "rail", 11, 13], [0, "rail", 12, 13], [0, "rail", 13, 13], [0, "rail", 14, 13], [0, "rail", 15, 13], [0, "rail", 16, 13], [0, "rail", 17, 13], [0, "rail", 18, 13],
    [0, "rail", 8, 12], [0, "rail", 9, 12], [0, "rail", 10, 12], [0, "rail", 11, 12], [0, "rail", 12, 12], [0, "rail", 13, 12], [0, "rail", 14, 12], [0, "rail", 15, 12], [0, "rail", 16, 12], [0, "rail", 17, 12], [0, "rail", 18, 12],
    [0, "sleep", 8, 5], [0, "sleep", 13, 5], [0, "vacuum-toilet", 18, 5], [0, "sleep", 8, 14], [0, "sleep", 13, 14], [0, "shower", 21, 11], [0, "podcast", 24, 5], [0, "compute", 29, 5], [0, "concierge", 17, 15],
    [1, "external-stair", 1, 7], [1, "elevator", 7, 7], [1, "plant", 25, 16],
    [2, "external-stair", 1, 7], [2, "elevator", 7, 7], [2, "plant", 25, 16],
    [3, "external-stair", 1, 7], [3, "elevator", 7, 7], [3, "plant", 25, 16]
  ];
  placements.forEach(([floorIndex, typeId, x, y]) => {
    const result = placeModule(state, floorIndex, typeId, x, y, false);
    state = result.ok ? result.state : state;
  });
  state.selectedModuleId = null;
  return state;
}

function round(value, places = 0) {
  const factor = 10 ** places;
  return Math.round(value * factor) / factor;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
