// ════════════════════════════════════════════════════════
// CHALLENGE RUN MODIFIERS
// Toggle-able modifiers for extra score multipliers
// ════════════════════════════════════════════════════════

const CHALLENGE_MODIFIERS = [
  {
    id: 'no_rerolls',
    name: 'Iron Will',
    desc: 'No rerolls allowed — start with 0 and cannot earn any',
    scoreMult: 1.5,
    color: 'var(--red)'
  },
  {
    id: 'all_curses',
    name: 'Cursed Blood',
    desc: 'Every room is guaranteed at least 1 curse',
    scoreMult: 1.3,
    color: 'var(--red)'
  },
  {
    id: 'max_effects',
    name: 'Overloaded',
    desc: 'Every room gets the maximum number of effects',
    scoreMult: 1.3,
    color: 'var(--purple)'
  },
  {
    id: 'no_blessings',
    name: 'Forsaken',
    desc: 'Blessings never appear',
    scoreMult: 1.2,
    color: 'var(--green)'
  },
  {
    id: 'glass_cannon',
    name: 'Glass Cannon',
    desc: 'Double score, but effects are always 80-100% wet',
    scoreMult: 2.0,
    color: 'var(--gold)'
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    desc: 'No campfire purchases allowed',
    scoreMult: 1.2,
    color: 'var(--orange)'
  }
];
