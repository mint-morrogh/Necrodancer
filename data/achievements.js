// ════════════════════════════════════════════════════════
// ACHIEVEMENTS / BADGES
// Persistent unlocks tracked across all sessions
// ════════════════════════════════════════════════════════

const ACHIEVEMENTS = [
  // Milestone badges
  { id: 'first_blood',     name: 'First Blood',        desc: 'Complete your first room',                       check: (p) => p.totalRooms >= 1 },
  { id: 'dungeon_regular', name: 'Dungeon Regular',     desc: 'Complete 5 sessions',                            check: (p) => p.totalSessions >= 5 },
  { id: 'veteran',         name: 'Veteran',             desc: 'Complete 25 sessions',                           check: (p) => p.totalSessions >= 25 },
  { id: 'centurion',       name: 'Centurion',           desc: 'Clear 100 rooms across all sessions',            check: (p) => p.totalRooms >= 100 },

  // Boss badges
  { id: 'boss_slayer',     name: 'Boss Slayer',         desc: 'Defeat your first boss',                         check: (p) => p.totalBosses >= 1 },
  { id: 'boss_hunter',     name: 'Boss Hunter',         desc: 'Defeat 10 bosses',                               check: (p) => p.totalBosses >= 10 },

  // Skill badges
  { id: 'iron_will',       name: 'Iron Will',           desc: 'Complete a floor without using any rerolls',      check: (p) => p.floorNoRerolls },
  { id: 'perfectionist',   name: 'Perfectionist',       desc: 'Achieve Room Mastery 3 times in one session',    check: (p) => p.masteryInSession >= 3 },
  { id: 'curse_magnet',    name: 'Curse Magnet',        desc: 'Survive 5 curses in a single room',              check: (p) => p.maxCursesInRoom >= 5 },
  { id: 'untouchable',     name: 'Untouchable',         desc: 'Complete a floor with zero curses encountered',   check: (p) => p.floorNoCurses },
  { id: 'hoarder',         name: 'Hoarder',             desc: 'Accumulate 100+ gold in a single session',        check: (p) => p.maxGold >= 100 },

  // Challenge badges
  { id: 'challenger',      name: 'Challenger',          desc: 'Complete a session with at least 1 challenge modifier', check: (p) => p.challengeSessionCompleted },
  { id: 'masochist',       name: 'Masochist',           desc: 'Complete a Nightmare session',                    check: (p) => p.nightmareCompleted },

  // Score badges
  { id: 'high_roller',     name: 'High Roller',         desc: 'Score over 500 in a single session',             check: (p) => p.maxScore >= 500 },
  { id: 'legend',          name: 'Legend',               desc: 'Score over 2000 in a single session',            check: (p) => p.maxScore >= 2000 },

  // Fun badges
  { id: 'relic_collector', name: 'Relic Collector',      desc: 'Collect 3 relics in a single session',           check: (p) => p.maxRelics >= 3 },
  { id: 'side_tracker',    name: 'Side Tracker',         desc: 'Complete 5 side quests across all sessions',     check: (p) => p.totalSideQuests >= 5 },
  { id: 'deep_diver',      name: 'Deep Diver',           desc: 'Reach floor 4',                                  check: (p) => p.maxFloor >= 4 }
];
