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
  completionStreak: 0,
  shieldNextRoom: 0,
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
  postBossCampfire: false,
  floor: 1,
  map: null,
  currentNodeId: null,
  floorHistory: [],
  setupStep: 1,
  relics: [],
  relicUses: {},
  pendingRelicChoice: null,
  pendingRelicRoom: null,
  rerollsUsedThisRoom: 0,
  spliceRatio: 50,
  nextFloorMap: null,
  floorTheme: null,
  challengeMods: [],
  spiritWalkActive: false,
  campfireStock: null,
  ambushData: null
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
    curseChance: 8, trackCurseChance: 2, blessingChance: 35,
    effectWeights: [{ value: 0, weight: 82 }, { value: 1, weight: 18 }],
    effectRange: [3, 100], effectTolerance: 30,
    bossCurseRange: [2, 3], bossWetRange: [10, 25],
    rerollChance: 8, rerollBonusChance: 4,
    chestChance: 12, sideQuestChance: 5, alchemistChance: 3, roadEventChance: 15, ambushChance: 5,
    startingRerolls: 2,
    curseTypeWeights: { immediate: 50, track: 15, deferred: 20, nextRoom: 15 },
    goldMultiplier: 1.0, scoreMultiplier: 0.5,
    scorePerCheckbox: 5, scorePerRoom: 10, scorePerBoss: 30, scorePerSideQuest: 25
  },
  normal: {
    label: 'NORMAL', desc: 'The standard dungeon experience',
    curseChance: 22, trackCurseChance: 8, blessingChance: 20,
    effectWeights: [{ value: 0, weight: 50 }, { value: 1, weight: 38 }, { value: 2, weight: 12 }],
    effectRange: [3, 100], effectTolerance: 22,
    bossCurseRange: [2, 3], bossWetRange: [20, 40],
    rerollChance: 11, rerollBonusChance: 6,
    chestChance: 8, sideQuestChance: 5, alchemistChance: 3, roadEventChance: 18, ambushChance: 7,
    startingRerolls: 1,
    curseTypeWeights: { immediate: 40, track: 20, deferred: 25, nextRoom: 15 },
    goldMultiplier: 1.0, scoreMultiplier: 1.0,
    scorePerCheckbox: 10, scorePerRoom: 20, scorePerBoss: 50, scorePerSideQuest: 40
  },
  hard: {
    label: 'HARD', desc: 'More curses, fewer blessings, no mercy',
    curseChance: 55, trackCurseChance: 25, blessingChance: 8,
    effectWeights: [{ value: 0, weight: 10 }, { value: 1, weight: 30 }, { value: 2, weight: 40 }, { value: 3, weight: 20 }],
    effectRange: [30, 100], effectTolerance: 8,
    bossCurseRange: [2, 3], bossWetRange: [35, 60],
    rerollChance: 14, rerollBonusChance: 10,
    chestChance: 5, sideQuestChance: 7, alchemistChance: 4, roadEventChance: 22, ambushChance: 9,
    startingRerolls: 1,
    curseTypeWeights: { immediate: 35, track: 25, deferred: 25, nextRoom: 15 },
    goldMultiplier: 0.7, scoreMultiplier: 2.0,
    scorePerCheckbox: 20, scorePerRoom: 40, scorePerBoss: 100, scorePerSideQuest: 80
  },
  nightmare: {
    label: 'NIGHTMARE', desc: 'Basically impossible. Good luck.',
    curseChance: 80, trackCurseChance: 45, blessingChance: 3,
    effectWeights: [{ value: 0, weight: 3 }, { value: 1, weight: 12 }, { value: 2, weight: 35 }, { value: 3, weight: 35 }, { value: 4, weight: 15 }],
    effectRange: [70, 100], effectTolerance: 3,
    bossCurseRange: [2, 4], bossWetRange: [50, 80],
    rerollChance: 17, rerollBonusChance: 13,
    chestChance: 3, sideQuestChance: 10, alchemistChance: 5, roadEventChance: 25, ambushChance: 12,
    startingRerolls: 0,
    curseTypeWeights: { immediate: 30, track: 25, deferred: 30, nextRoom: 15 },
    goldMultiplier: 0.5, scoreMultiplier: 4.0,
    scorePerCheckbox: 40, scorePerRoom: 80, scorePerBoss: 200, scorePerSideQuest: 150
  }
};

function diff() {
  const base = DIFFICULTY_SETTINGS[state.difficulty || 'normal'];
  const mods = (state.floorTheme && state.floorTheme.apply) ? state.floorTheme.apply(base) : {};

  // Start from base + floor theme mods
  const result = {
    ...base,
    curseChance: Math.min(100, (base.curseChance * (mods.curseChanceMult || 1)) + (mods.curseChanceBoost || 0)),
    blessingChance: Math.min(100, (base.blessingChance * (mods.blessingChanceMult || 1)) + (mods.blessingChanceBoost || 0)),
    effectRange: [
      Math.min(100, base.effectRange[0] + (mods.effectRangeBoost || 0)),
      Math.min(100, base.effectRange[1] + (mods.effectRangeBoost || 0))
    ],
    effectTolerance: base.effectTolerance + (mods.toleranceBoost || 0),
    goldMultiplier: base.goldMultiplier * (mods.goldMult || 1),
    scoreMultiplier: base.scoreMultiplier * (mods.scoreMult || 1) * challengeScoreMult(),
    _themeMods: mods
  };

  // Apply challenge modifiers
  if (hasChallenge('all_curses')) result.curseChance = 100;
  if (hasChallenge('no_blessings')) result.blessingChance = 0;
  if (hasChallenge('glass_cannon')) { result.effectRange = [80, 100]; result.effectTolerance = 5; }
  if (hasChallenge('max_effects')) {
    const maxEff = result.effectWeights[result.effectWeights.length - 1].value;
    result.effectWeights = [{ value: maxEff, weight: 1 }];
  }

  return result;
}

function hasChallenge(id) {
  return state.challengeMods && state.challengeMods.includes(id);
}

function challengeScoreMult() {
  if (!state.challengeMods || state.challengeMods.length === 0) return 1;
  return state.challengeMods.reduce((mult, id) => {
    const mod = (typeof CHALLENGE_MODIFIERS !== 'undefined') ? CHALLENGE_MODIFIERS.find(m => m.id === id) : null;
    return mult * (mod ? mod.scoreMult : 1);
  }, 1);
}

function runHasMode(mode) {
  if (mode === 'splice') return state.spliceRatio > 0;
  if (mode === 'production') return state.spliceRatio < 100;
  return true;
}

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

// ════════════════════════════════════════════════════════
// RELIC HELPERS
// ════════════════════════════════════════════════════════

function hasRelic(id) {
  return state.relics.includes(id);
}

function getRelic(id) {
  const allRelics = [...RELICS, ...(typeof RELICS_PRODUCTION !== 'undefined' ? RELICS_PRODUCTION : []), ...(typeof RELICS_SPLICE !== 'undefined' ? RELICS_SPLICE : [])];
  return allRelics.find(r => r.id === id) || null;
}

function relicUsedThisFloor(id) {
  return !!state.relicUses[id + '_' + state.floor];
}

function markRelicUsed(id) {
  state.relicUses[id + '_' + state.floor] = true;
}

// ════════════════════════════════════════════════════════
// AUTO-SAVE (localStorage)
// ════════════════════════════════════════════════════════

const SAVE_KEY = 'necrodancer_save';

function saveGame() {
  if (state.screen !== 'dungeon') return;
  try {
    const saveData = {
      state: JSON.parse(JSON.stringify(state)),
      rngState: _rngState,
      version: 1
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
  } catch (e) { /* storage full or unavailable — silently fail */ }
}

function loadGame() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return false;
    const saveData = JSON.parse(raw);
    if (!saveData.state || saveData.state.screen !== 'dungeon') {
      localStorage.removeItem(SAVE_KEY);
      return false;
    }
    Object.assign(state, saveData.state);
    _rngState = saveData.rngState || 1;
    return true;
  } catch (e) {
    localStorage.removeItem(SAVE_KEY);
    return false;
  }
}

function hasSavedGame() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return false;
    const saveData = JSON.parse(raw);
    return saveData.state && saveData.state.screen === 'dungeon';
  } catch (e) { return false; }
}

function clearSave() {
  try { localStorage.removeItem(SAVE_KEY); } catch (e) { /* ignore */ }
}

// ════════════════════════════════════════════════════════
// HIGH SCORES (localStorage)
// ════════════════════════════════════════════════════════

// ════════════════════════════════════════════════════════
// PLAYER PROFILE (localStorage)
// ════════════════════════════════════════════════════════

const PROFILE_KEY = 'necrodancer_profile';

function getProfile() {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    const defaults = {
      totalSessions: 0, totalRooms: 0, totalBosses: 0, totalSideQuests: 0,
      maxScore: 0, maxGold: 0, maxFloor: 0, maxRelics: 0, maxCursesInRoom: 0,
      masteryInSession: 0, floorNoRerolls: false, floorNoCurses: false,
      nightmareCompleted: false, challengeSessionCompleted: false,
      nightmareChallengeCompleted: false,
      nat20Rolled: false, nat1Rolled: false,
      doubleOrNothingWins: 0, doubleOrNothingLost: false,
      zeroRerollsSession: false,
      totalCursesCompleted: 0, totalBlessings: 0,
      totalRoadDebtsCompleted: 0, totalAmbushSurvived: 0, totalChests: 0,
      maxUniqueGenres: 0,
      badges: [], skeletonKeys: 0
    };
    if (!raw) return defaults;
    const parsed = JSON.parse(raw);
    // Merge defaults so new fields are always present
    return { ...defaults, ...parsed };
  } catch (e) {
    return {
      totalSessions: 0, totalRooms: 0, totalBosses: 0, totalSideQuests: 0,
      maxScore: 0, maxGold: 0, maxFloor: 0, maxRelics: 0, maxCursesInRoom: 0,
      masteryInSession: 0, floorNoRerolls: false, floorNoCurses: false,
      nightmareCompleted: false, challengeSessionCompleted: false,
      nightmareChallengeCompleted: false,
      nat20Rolled: false, nat1Rolled: false,
      doubleOrNothingWins: 0, doubleOrNothingLost: false,
      zeroRerollsSession: false,
      totalCursesCompleted: 0, totalBlessings: 0,
      totalRoadDebtsCompleted: 0, totalAmbushSurvived: 0, totalChests: 0,
      maxUniqueGenres: 0,
      badges: [], skeletonKeys: 0
    };
  }
}

function saveProfile(profile) {
  try { localStorage.setItem(PROFILE_KEY, JSON.stringify(profile)); } catch (e) { /* ignore */ }
}

function updateProfileFromSession() {
  const profile = getProfile();
  profile.totalSessions++;
  profile.totalRooms += state.rooms.length;
  profile.totalBosses += state.rooms.filter(r => r.isBoss).length;
  profile.totalSideQuests += state.rooms.filter(r => r.isSideQuest).length;
  if (state.score > profile.maxScore) profile.maxScore = state.score;
  if (state.gold > profile.maxGold) profile.maxGold = state.gold;
  if (state.floor > profile.maxFloor) profile.maxFloor = state.floor;
  if (state.relics.length > profile.maxRelics) profile.maxRelics = state.relics.length;

  // Per-room stats
  const masteryCount = state.rooms.filter(r => r._masteryShown).length;
  if (masteryCount > profile.masteryInSession) profile.masteryInSession = masteryCount;
  for (const room of state.rooms) {
    if (room.curses.length > profile.maxCursesInRoom) profile.maxCursesInRoom = room.curses.length;
  }

  // Curse / blessing / event totals
  const cursesCompleted = state.rooms.reduce((s, r) => s + r.curses.filter(c => c.completed).length, 0);
  profile.totalCursesCompleted = (profile.totalCursesCompleted || 0) + cursesCompleted;
  const blessingsReceived = state.rooms.filter(r => r.blessing).length;
  profile.totalBlessings = (profile.totalBlessings || 0) + blessingsReceived;
  const roadDebtsCompleted = (state.acceptedEvents || []).filter(e => e.cost && e.completed).length;
  profile.totalRoadDebtsCompleted = (profile.totalRoadDebtsCompleted || 0) + roadDebtsCompleted;
  profile.totalChests = (profile.totalChests || 0) + (state._chestsOpened || 0);
  profile.totalAmbushSurvived = (profile.totalAmbushSurvived || 0) + (state._ambushesSurvived || 0);

  // Unique genres in this session
  const genres = new Set(state.rooms.map(r => r.genre).filter(Boolean));
  if (genres.size > (profile.maxUniqueGenres || 0)) profile.maxUniqueGenres = genres.size;

  // Zero rerolls session (started with rerolls but never used any)
  if (state._totalRerollsUsed === 0) profile.zeroRerollsSession = true;

  // Nat20 / Nat1 / Double or Nothing (set by game.js during play)
  if (state._nat20Rolled) profile.nat20Rolled = true;
  if (state._nat1Rolled) profile.nat1Rolled = true;
  profile.doubleOrNothingWins = (profile.doubleOrNothingWins || 0) + (state._donWins || 0);
  if (state._donLost) profile.doubleOrNothingLost = true;

  // Grant a skeleton key for completing a run
  profile.skeletonKeys = (profile.skeletonKeys || 0) + 1;

  // Difficulty and challenge checks
  if (state.difficulty === 'nightmare') profile.nightmareCompleted = true;
  if (state.difficulty === 'nightmare' && state.challengeMods && state.challengeMods.length > 0) profile.nightmareChallengeCompleted = true;
  if (state.challengeMods && state.challengeMods.length > 0) profile.challengeSessionCompleted = true;

  // Check achievements — track newly unlocked
  const prevBadges = [...profile.badges];
  if (typeof ACHIEVEMENTS !== 'undefined') {
    for (const ach of ACHIEVEMENTS) {
      if (!profile.badges.includes(ach.id) && ach.check(profile)) {
        profile.badges.push(ach.id);
      }
    }
  }
  const newBadges = profile.badges.filter(id => !prevBadges.includes(id));

  saveProfile(profile);
  return { profile, newBadges };
}

const SCORES_KEY = 'necrodancer_scores';
const MAX_SCORES_PER_DIFF = 5;

function getHighScores() {
  try {
    const raw = localStorage.getItem(SCORES_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) { return {}; }
}

function saveHighScore(difficulty, score, seed, date) {
  try {
    const scores = getHighScores();
    if (!scores[difficulty]) scores[difficulty] = [];
    scores[difficulty].push({ score, seed, date });
    scores[difficulty].sort((a, b) => b.score - a.score);
    scores[difficulty] = scores[difficulty].slice(0, MAX_SCORES_PER_DIFF);
    localStorage.setItem(SCORES_KEY, JSON.stringify(scores));
  } catch (e) { /* storage full or unavailable */ }
}

function getAllHighScores() {
  const scores = getHighScores();
  const all = [];
  for (const diff of Object.keys(scores)) {
    for (const entry of scores[diff]) {
      all.push({ ...entry, difficulty: diff });
    }
  }
  all.sort((a, b) => b.score - a.score);
  return all;
}
