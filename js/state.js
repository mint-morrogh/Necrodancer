// ════════════════════════════════════════════════════════
// STATE
// ════════════════════════════════════════════════════════

let state = {
  screen: 'title',
  key: null,
  scale: null,
  bpm: 128,
  difficulty: null,
  rerolls: 1,
  rooms: [],
  currentRoom: null,
  roomPhase: 'map',
  transitionData: null,
  deferredCurses: [],
  nextRoomCurses: [],
  shieldNextRoom: false,
  usedRoomNames: [],
  seed: null,
  seedMode: 'daily',
  gold: 0,
  score: 0,
  chestData: null,
  pendingRoom: null,
  roadEventData: null,
  acceptedEvents: [],
  pendingBlessing: false,
  floor: 1,
  map: null,
  currentNodeId: null,
  floorHistory: [],
  setupStep: 1
};


// ════════════════════════════════════════════════════════
// SEEDED PRNG (mulberry32)
// ════════════════════════════════════════════════════════

let _rngState = (Math.random() * 4294967296) >>> 0 || 1;

function hashSeed(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(31, h) + str.charCodeAt(i) | 0;
  }
  return h >>> 0;
}

function initRng(seed) {
  state.seed = seed;
  _rngState = hashSeed(String(seed));
  if (_rngState === 0) _rngState = 1;
}

function seededRandom() {
  _rngState |= 0;
  _rngState = _rngState + 0x6D2B79F5 | 0;
  let t = Math.imul(_rngState ^ (_rngState >>> 15), 1 | _rngState);
  t = t + Math.imul(t ^ (t >>> 7), 61 | t) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

const GOLD_VALUES = { genre: 5, curse: 8, effect: 4, boss: 12 };

const DIFFICULTY_SETTINGS = {
  easy: {
    label: 'EASY', desc: 'Lighter constraints, more blessings',
    curseChance: 25, trackCurseChance: 8, blessingChance: 25,
    effectWeights: [{ value: 0, weight: 40 }, { value: 1, weight: 40 }, { value: 2, weight: 20 }],
    effectRange: [5, 70],
    bossCurseRange: [1, 1],
    rerollChance: 65, rerollBonusChance: 85,
    chestChance: 12, sideQuestChance: 5, alchemistChance: 3, roadEventChance: 15,
    startingRerolls: 2,
    curseTypeWeights: { immediate: 50, track: 15, deferred: 20, nextRoom: 15 },
    goldMultiplier: 1.0, scoreMultiplier: 0.5,
    scorePerCheckbox: 5, scorePerRoom: 10, scorePerBoss: 30, scorePerSideQuest: 25
  },
  normal: {
    label: 'NORMAL', desc: 'The standard dungeon experience',
    curseChance: 40, trackCurseChance: 15, blessingChance: 15,
    effectWeights: [{ value: 0, weight: 25 }, { value: 1, weight: 45 }, { value: 2, weight: 30 }],
    effectRange: [5, 100],
    bossCurseRange: [1, 2],
    rerollChance: 50, rerollBonusChance: 75,
    chestChance: 8, sideQuestChance: 5, alchemistChance: 3, roadEventChance: 18,
    startingRerolls: 1,
    curseTypeWeights: { immediate: 40, track: 20, deferred: 25, nextRoom: 15 },
    goldMultiplier: 1.0, scoreMultiplier: 1.0,
    scorePerCheckbox: 10, scorePerRoom: 20, scorePerBoss: 50, scorePerSideQuest: 40
  },
  hard: {
    label: 'HARD', desc: 'More curses, fewer blessings, no mercy',
    curseChance: 55, trackCurseChance: 25, blessingChance: 8,
    effectWeights: [{ value: 0, weight: 10 }, { value: 1, weight: 35 }, { value: 2, weight: 40 }, { value: 3, weight: 15 }],
    effectRange: [20, 100],
    bossCurseRange: [2, 3],
    rerollChance: 35, rerollBonusChance: 55,
    chestChance: 5, sideQuestChance: 7, alchemistChance: 4, roadEventChance: 22,
    startingRerolls: 1,
    curseTypeWeights: { immediate: 35, track: 25, deferred: 25, nextRoom: 15 },
    goldMultiplier: 0.7, scoreMultiplier: 2.0,
    scorePerCheckbox: 20, scorePerRoom: 40, scorePerBoss: 100, scorePerSideQuest: 80
  },
  nightmare: {
    label: 'NIGHTMARE', desc: 'Basically impossible. Good luck.',
    curseChance: 75, trackCurseChance: 40, blessingChance: 3,
    effectWeights: [{ value: 0, weight: 5 }, { value: 1, weight: 15 }, { value: 2, weight: 40 }, { value: 3, weight: 30 }, { value: 4, weight: 10 }],
    effectRange: [40, 100],
    bossCurseRange: [2, 4],
    rerollChance: 20, rerollBonusChance: 40,
    chestChance: 3, sideQuestChance: 10, alchemistChance: 5, roadEventChance: 25,
    startingRerolls: 0,
    curseTypeWeights: { immediate: 30, track: 25, deferred: 30, nextRoom: 15 },
    goldMultiplier: 0.5, scoreMultiplier: 4.0,
    scorePerCheckbox: 40, scorePerRoom: 80, scorePerBoss: 200, scorePerSideQuest: 150
  }
};

function diff() { return DIFFICULTY_SETTINGS[state.difficulty || 'normal']; }

// ════════════════════════════════════════════════════════
// UTILITY
// ════════════════════════════════════════════════════════

function roll(min, max) { return Math.floor(seededRandom() * (max - min + 1)) + min; }
function pick(arr) { return arr[Math.floor(seededRandom() * arr.length)]; }
function chance(pct) { return seededRandom() * 100 < pct; }
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function weightedPick(options) {
  const total = options.reduce((s, o) => s + o.weight, 0);
  let r = seededRandom() * total;
  for (const o of options) { r -= o.weight; if (r <= 0) return o.value; }
  return options[options.length - 1].value;
}

function pickUnique(arr, used) {
  const available = arr.filter(x => !used.includes(x));
  if (available.length === 0) return pick(arr);
  return pick(available);
}

function stripNextRoomPrefix(text) {
  return text.replace(/^NEXT ROOM:\s*/i, '');
}
