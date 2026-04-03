// ── RELICS ────────────────────────────────────────────
// Persistent passive bonuses found at relic chambers,
// rare chest drops, road event rewards, and campfire purchases.

const RELIC_TIERS = {
  common:    { label: 'Common',    color: 'var(--text)',   weight: 55 },
  rare:      { label: 'Rare',      color: 'var(--purple)', weight: 35 },
  legendary: { label: 'Legendary', color: 'var(--gold)',   weight: 10 }
};

const RELICS = [
  // ── Reroll / Luck ──────────────────────────────────
  {
    id: 'lucky_die',
    name: 'Lucky Die',
    tier: 'common',
    description: '-2 to d20 reroll threshold when sealing rooms',
    effectType: 'reroll_boost'
  },
  {
    id: 'streak_talisman',
    name: 'Streak Talisman',
    tier: 'rare',
    description: 'Completion streak triggers at 2 instead of 3',
    effectType: 'streak_reduction'
  },
  {
    id: 'completion_crown',
    name: 'Completion Crown',
    tier: 'rare',
    description: '+1 guaranteed reroll when completing all tasks',
    effectType: 'completion_bonus'
  },
  {
    id: 'metronome_of_mercy',
    name: 'Metronome of Mercy',
    tier: 'legendary',
    description: 'First room reroll each floor is free',
    effectType: 'free_reroll_per_floor'
  },

  // ── Curse / Effect Mitigation ──────────────────────
  {
    id: 'echo_crystal',
    name: 'Echo Crystal',
    tier: 'common',
    description: 'Effect wet % capped at 60%',
    effectType: 'effect_cap'
  },
  {
    id: 'dampening_orb',
    name: 'Dampening Orb',
    tier: 'common',
    description: 'Effect wet % reduced by 15',
    effectType: 'effect_reduction'
  },
  {
    id: 'curse_ward',
    name: 'Curse Ward',
    tier: 'rare',
    description: 'Block the first curse each floor',
    effectType: 'curse_block'
  },
  {
    id: 'divine_favor',
    name: 'Divine Favor',
    tier: 'rare',
    description: '+15% blessing chance',
    effectType: 'blessing_boost'
  },

  // ── Gold / Score ───────────────────────────────────
  {
    id: 'golden_chalice',
    name: 'Golden Chalice',
    tier: 'common',
    description: '+50% gold from checklist items',
    effectType: 'gold_multiplier'
  },
  {
    id: 'score_amplifier',
    name: 'Score Amplifier',
    tier: 'common',
    description: '+25% score from all sources',
    effectType: 'score_multiplier'
  },

  // ── Encounter Chances ──────────────────────────────
  {
    id: 'thiefs_glove',
    name: "Thief's Glove",
    tier: 'common',
    description: '+5% treasure chest chance',
    effectType: 'chest_boost'
  },
  {
    id: 'quest_magnet',
    name: 'Quest Magnet',
    tier: 'rare',
    description: '+3% side quest chance',
    effectType: 'side_quest_boost'
  },
  {
    id: 'alchemists_key',
    name: "Alchemist's Key",
    tier: 'rare',
    description: "+4% alchemist lair chance",
    effectType: 'alchemist_boost'
  },

  // ── Campfire ───────────────────────────────────────
  {
    id: 'purifying_flame',
    name: 'Purifying Flame',
    tier: 'common',
    description: 'Curse removal at campfire costs 10g instead of 15g',
    effectType: 'campfire_discount'
  },

  // ── Legendary ──────────────────────────────────────
  {
    id: 'crown_of_the_ancients',
    name: 'Crown of the Ancients',
    tier: 'legendary',
    description: '+25% score AND -2 to d20 reroll threshold',
    effectType: 'score_multiplier'
  },
  {
    id: 'gamblers_coin',
    name: "Gambler's Coin",
    tier: 'legendary',
    description: '+50% gold AND +5% chest chance',
    effectType: 'gold_multiplier'
  }
];
