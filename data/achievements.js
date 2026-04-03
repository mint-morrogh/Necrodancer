// ════════════════════════════════════════════════════════
// ACHIEVEMENTS / BADGES
// Persistent unlocks tracked across all sessions
// ════════════════════════════════════════════════════════

const ACHIEVEMENTS = [
  // ── Milestone badges ──────────────────────────────────
  { id: 'first_blood',     name: 'First Blood',        desc: 'Complete your first room',                       check: (p) => p.totalRooms >= 1 },
  { id: 'dungeon_regular', name: 'Dungeon Regular',     desc: 'Complete 5 sessions',                            check: (p) => p.totalSessions >= 5 },
  { id: 'veteran',         name: 'Veteran',             desc: 'Complete 25 sessions',                           check: (p) => p.totalSessions >= 25 },
  { id: 'gravewalker',     name: 'Gravewalker',         desc: 'Complete 50 sessions',                           check: (p) => p.totalSessions >= 50 },
  { id: 'centurion',       name: 'Centurion',           desc: 'Clear 100 rooms across all sessions',            check: (p) => p.totalRooms >= 100 },
  { id: 'undying_legend',  name: 'Undying Legend',      desc: 'Clear 500 rooms across all sessions',            check: (p) => p.totalRooms >= 500 },

  // ── Boss badges ───────────────────────────────────────
  { id: 'boss_slayer',     name: 'Boss Slayer',         desc: 'Defeat your first boss',                         check: (p) => p.totalBosses >= 1 },
  { id: 'boss_hunter',     name: 'Boss Hunter',         desc: 'Defeat 10 bosses',                               check: (p) => p.totalBosses >= 10 },
  { id: 'dragon_slayer',   name: 'Dragon Slayer',       desc: 'Defeat 25 bosses',                               check: (p) => p.totalBosses >= 25 },

  // ── Skill badges ──────────────────────────────────────
  { id: 'iron_will',       name: 'Iron Will',           desc: 'Complete a floor without using any rerolls',      check: (p) => p.floorNoRerolls },
  { id: 'pure_run',        name: 'Pure Run',            desc: 'Complete an entire session without using any rerolls', check: (p) => p.zeroRerollsSession },
  { id: 'perfectionist',   name: 'Perfectionist',       desc: 'Achieve Room Mastery 3 times in one session',    check: (p) => p.masteryInSession >= 3 },
  { id: 'flawless',        name: 'Flawless',            desc: 'Achieve Room Mastery 5 times in one session',    check: (p) => p.masteryInSession >= 5 },
  { id: 'curse_magnet',    name: 'Curse Magnet',        desc: 'Survive 5 curses in a single room',              check: (p) => p.maxCursesInRoom >= 5 },
  { id: 'untouchable',     name: 'Untouchable',         desc: 'Complete a floor with zero curses encountered',   check: (p) => p.floorNoCurses },
  { id: 'hoarder',         name: 'Hoarder',             desc: 'Accumulate 100+ gold in a single session',        check: (p) => p.maxGold >= 100 },
  { id: 'midas_touch',     name: 'Midas Touch',         desc: 'Accumulate 250+ gold in a single session',        check: (p) => p.maxGold >= 250 },

  // ── Challenge badges ──────────────────────────────────
  { id: 'challenger',      name: 'Challenger',          desc: 'Complete a session with at least 1 challenge modifier', check: (p) => p.challengeSessionCompleted },
  { id: 'masochist',       name: 'Masochist',           desc: 'Complete a Nightmare session',                    check: (p) => p.nightmareCompleted },
  { id: 'nightmare_challenger', name: 'Nightmare Challenger', desc: 'Complete a Nightmare session with challenge modifiers', check: (p) => p.nightmareChallengeCompleted },

  // ── Score badges ──────────────────────────────────────
  { id: 'high_roller',     name: 'High Roller',         desc: 'Score over 1000 in a single session',            check: (p) => p.maxScore >= 1000 },
  { id: 'legend',          name: 'Legend',               desc: 'Score over 2000 in a single session',            check: (p) => p.maxScore >= 2000 },
  { id: 'golden_god',      name: 'Golden God',           desc: 'Score over 5000 in a single session',            check: (p) => p.maxScore >= 5000 },

  // ── Dice badges ───────────────────────────────────────
  { id: 'natural_20',      name: 'Natural 20',          desc: 'Roll a natural 20 on room seal',                  check: (p) => p.nat20Rolled },
  { id: 'snake_eyes',      name: 'Snake Eyes',          desc: 'Suffer a natural 1 on room seal',                 check: (p) => p.nat1Rolled },
  { id: 'lucky_streak',    name: 'Lucky Streak',        desc: 'Win 3 Double or Nothing gambles across all sessions', check: (p) => (p.doubleOrNothingWins || 0) >= 3 },
  { id: 'gamblers_ruin',   name: "Gambler's Ruin",      desc: 'Lose a Double or Nothing gamble',                 check: (p) => p.doubleOrNothingLost },

  // ── Exploration badges ────────────────────────────────
  { id: 'relic_collector', name: 'Relic Collector',      desc: 'Collect 3 relics in a single session',           check: (p) => p.maxRelics >= 3 },
  { id: 'relic_hoarder',   name: 'Relic Hoarder',       desc: 'Collect 5 relics in a single session',           check: (p) => p.maxRelics >= 5 },
  { id: 'side_tracker',    name: 'Side Tracker',         desc: 'Complete 5 side quests across all sessions',     check: (p) => p.totalSideQuests >= 5 },
  { id: 'deep_diver',      name: 'Deep Diver',           desc: 'Reach floor 4',                                  check: (p) => p.maxFloor >= 4 },
  { id: 'deep_abyss',      name: 'Deep Abyss',           desc: 'Reach floor 6',                                  check: (p) => p.maxFloor >= 6 },
  { id: 'bottomless_pit',  name: 'Bottomless Pit',       desc: 'Reach floor 8',                                  check: (p) => p.maxFloor >= 8 },

  // ── Endurance badges ──────────────────────────────────
  { id: 'curse_eater',     name: 'Curse Eater',         desc: 'Complete 50 curses across all sessions',          check: (p) => (p.totalCursesCompleted || 0) >= 50 },
  { id: 'blessed_soul',    name: 'Blessed Soul',        desc: 'Receive 20 blessings across all sessions',        check: (p) => (p.totalBlessings || 0) >= 20 },
  { id: 'road_warrior',    name: 'Road Warrior',        desc: 'Complete 10 road event debts across all sessions', check: (p) => (p.totalRoadDebtsCompleted || 0) >= 10 },
  { id: 'ambush_survivor', name: 'Ambush Survivor',     desc: 'Survive 5 ambushes across all sessions',          check: (p) => (p.totalAmbushSurvived || 0) >= 5 },
  { id: 'treasure_hunter', name: 'Treasure Hunter',     desc: 'Open 10 treasure chests across all sessions',     check: (p) => (p.totalChests || 0) >= 10 },
  { id: 'genre_bender',    name: 'Genre Bender',        desc: 'Encounter 10+ unique genres in a single session', check: (p) => (p.maxUniqueGenres || 0) >= 10 }
];
