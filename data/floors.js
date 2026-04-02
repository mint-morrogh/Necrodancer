// ════════════════════════════════════════════════════════
// FLOOR THEMES — Meta-modifiers applied per floor
// ════════════════════════════════════════════════════════

const FLOOR_THEMES = [
  // Floor 1 is always neutral (no theme) — player is learning

  // Floor 2+ themes — picked randomly per floor
  {
    name: 'Resonance Surge',
    desc: 'All effect wet percentages increased by 10%',
    color: 'var(--purple)',
    apply: (diff) => ({ effectRangeBoost: 10 })
  },
  {
    name: 'Cursed Depths',
    desc: 'Double curse chance, but double gold from curses',
    color: 'var(--red)',
    apply: (diff) => ({ curseChanceMult: 2, curseGoldMult: 2 })
  },
  {
    name: 'The Gilded Halls',
    desc: '+50% gold from all sources',
    color: 'var(--gold)',
    apply: (diff) => ({ goldMult: 1.5 })
  },
  {
    name: 'Blessed Sanctuary',
    desc: 'Blessing chance doubled',
    color: 'var(--green)',
    apply: (diff) => ({ blessingChanceMult: 2 })
  },
  {
    name: 'The Proving Grounds',
    desc: '+50% score from all sources',
    color: 'var(--purple)',
    apply: (diff) => ({ scoreMult: 1.5 })
  },
  {
    name: 'The Quiet Floor',
    desc: 'Max 1 effect per room, but no curses from standard rooms',
    color: 'var(--teal)',
    apply: (diff) => ({ maxEffects: 1, noCursesStandard: true })
  },
  {
    name: 'Enchanted Armory',
    desc: 'Every room guaranteed at least 1 effect',
    color: 'var(--blue)',
    apply: (diff) => ({ minEffects: 1 })
  },
  {
    name: 'The Gauntlet',
    desc: '+25% curse chance, +25% blessing chance, +100% score',
    color: 'var(--orange)',
    apply: (diff) => ({ curseChanceBoost: 25, blessingChanceBoost: 25, scoreMult: 2 })
  },
  {
    name: 'Miser\'s Domain',
    desc: 'All campfire prices halved',
    color: 'var(--gold)',
    apply: (diff) => ({ shopDiscount: 0.5 })
  },
  {
    name: 'Echoing Chambers',
    desc: 'All effects have a wider wet range (tolerance +10)',
    color: 'var(--blue)',
    apply: (diff) => ({ toleranceBoost: 10 })
  }
];

function pickFloorTheme(floorNum) {
  if (floorNum <= 1) return null;
  return pick(FLOOR_THEMES);
}
