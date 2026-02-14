// ── ROAD EVENTS ───────────────────────────────────────
// Random encounters between rooms. Each offers a reward
// in exchange for a creative constraint on your track.
// Player can accept or decline.

const ROAD_EVENTS = [
  // ── Tempo / Key Changes ─────────────────────────────
  {
    name: 'The Wandering Bard',
    description: 'A spectral bard blocks your path, strumming a detuned lute. He offers a deal.',
    reward: { type: 'rerolls', value: 3, text: '+3 Reroll Tokens' },
    cost: 'Change your project tempo by ±15 BPM from where it is now — commit to the new tempo for the rest of the session'
  },
  {
    name: 'The Tempo Wraith',
    description: 'A flickering ghost hums at a different speed than your track. It reaches out a hand.',
    reward: { type: 'rerolls', value: 2, text: '+2 Reroll Tokens' },
    cost: 'Halve or double your current BPM — pick one and build from there'
  },
  {
    name: 'The Transposing Specter',
    description: 'A translucent figure whispers a different key into your ear.',
    reward: { type: 'gold', value: 25, text: '+25 Gold' },
    cost: 'Transpose your entire project up or down by a semitone — everything must shift'
  },

  // ── Vocal / Acapella Challenges ─────────────────────
  {
    name: 'The Phantom Singer',
    description: 'A ghostly voice echoes through the corridor, harmonizing with nothing.',
    reward: { type: 'rerolls', value: 3, text: '+3 Reroll Tokens' },
    cost: 'Add a vocal element or acapella to your track — it must be audible in the final mix'
  },
  {
    name: 'The Choir of Bones',
    description: 'Skeletal figures hum in unison, offering their harmony.',
    reward: { type: 'blessing', value: null, text: 'A Random Blessing' },
    cost: 'Layer at least 3 vocal or vocal-like elements somewhere in your track'
  },

  // ── Sound Design Challenges ─────────────────────────
  {
    name: 'The Alchemist\'s Apprentice',
    description: 'A nervous apprentice offers you a bubbling vial. "Drink this," he says.',
    reward: { type: 'rerolls', value: 2, text: '+2 Reroll Tokens' },
    cost: 'Record a sound from your environment right now and use it as a layer in your track'
  },
  {
    name: 'The Reverse Engineer',
    description: 'A hooded figure plays your melody backwards and grins.',
    reward: { type: 'gold', value: 20, text: '+20 Gold' },
    cost: 'Reverse at least one element in your track — use it prominently, not buried'
  },
  {
    name: 'The Granular Witch',
    description: 'She stirs a cauldron of fragmented sounds, each grain a tiny world.',
    reward: { type: 'rerolls', value: 2, text: '+2 Reroll Tokens' },
    cost: 'Run one of your existing elements through a granular effect and replace the original with it'
  },

  // ── Arrangement Challenges ──────────────────────────
  {
    name: 'The Silent Monk',
    description: 'A hooded monk holds up a single finger. Silence, he seems to say, is also music.',
    reward: { type: 'rerolls', value: 3, text: '+3 Reroll Tokens' },
    cost: 'Add a full 4-bar silence or breakdown somewhere in your arrangement — total silence, then bring it back'
  },
  {
    name: 'The Loop Merchant',
    description: 'A merchant spreads loops across a blanket like jewels. "Take one, leave one."',
    reward: { type: 'shield', value: null, text: 'Curse Shield (next room)' },
    cost: 'Your next room\'s main element must loop a 1-bar pattern for at least 8 bars before any variation'
  },
  {
    name: 'The Arrangement Ghost',
    description: 'A translucent conductor waves a baton, rearranging the air itself.',
    reward: { type: 'rerolls', value: 2, text: '+2 Reroll Tokens' },
    cost: 'Add an unexpected genre switch or breakdown in your arrangement — at least 8 bars of a completely different feel'
  },

  // ── Processing / Mix Challenges ─────────────────────
  {
    name: 'The Frequency Trader',
    description: 'A cloaked figure holds two crystals — one bright, one dark. "Choose," she says.',
    reward: { type: 'gold', value: 30, text: '+30 Gold' },
    cost: 'Apply a dramatic high-pass or low-pass filter sweep across your entire track at some point in the arrangement'
  },
  {
    name: 'The Distortion Demon',
    description: 'A grinning imp offers a crackling, overdriven hand.',
    reward: { type: 'rerolls', value: 2, text: '+2 Reroll Tokens' },
    cost: 'Add saturation or distortion to an element that currently has none — make it gritty'
  },
  {
    name: 'The Panning Poltergeist',
    description: 'Objects in the corridor fly left and right, creating a dizzy stereo field.',
    reward: { type: 'blessing', value: null, text: 'A Random Blessing' },
    cost: 'Automate the panning on at least two elements so they move across the stereo field during the track'
  },

  // ── Restriction Challenges ──────────────────────────
  {
    name: 'The Minimalist Sage',
    description: 'An old sage sits cross-legged. "Less is more," he says, offering wisdom and power.',
    reward: { type: 'rerolls', value: 3, text: '+3 Reroll Tokens' },
    cost: 'Remove one element you\'ve already created from the mix entirely — delete it, not just mute it'
  },
  {
    name: 'The One-Shot Oracle',
    description: 'An oracle presents a single glowing sample. "This is all you need."',
    reward: { type: 'gold', value: 20, text: '+20 Gold' },
    cost: 'Build your next room\'s element using only a single sample — chop, pitch, and process it into everything you need'
  },
  {
    name: 'The Analog Hermit',
    description: 'A hermit in a cave of cables and knobs beckons you inside.',
    reward: { type: 'rerolls', value: 2, text: '+2 Reroll Tokens' },
    cost: 'No presets allowed for your next room — every synth patch or effect must be built from an initialized state'
  },

  // ── Generous but Wild ───────────────────────────────
  {
    name: 'The Chaos Merchant',
    description: 'A merchant with spinning eyes opens a box of pure randomness.',
    reward: { type: 'rerolls', value: 4, text: '+4 Reroll Tokens' },
    cost: 'Randomly generate or blindly pick a new sample/preset for your next room — no auditioning, commit to the first thing you land on'
  },
  {
    name: 'The Genre Ghost',
    description: 'A phantom DJ fades between worlds, mixing eras and styles.',
    reward: { type: 'rerolls', value: 3, text: '+3 Reroll Tokens' },
    cost: 'Sample or interpolate a track from a genre completely unrelated to your current project — make it fit'
  },
  {
    name: 'The Pitched Spirit',
    description: 'A spirit holds a tuning fork that vibrates at an impossible frequency.',
    reward: { type: 'gold', value: 25, text: '+25 Gold' },
    cost: 'Pitch one of your existing elements up or down by at least 7 semitones — keep it in the mix'
  },
  {
    name: 'The Automation Phantom',
    description: 'A ghostly hand draws curves in the air, parameters moving on their own.',
    reward: { type: 'rerolls', value: 2, text: '+2 Reroll Tokens' },
    cost: 'Add filter automation to every element in your track — nothing stays static from this point on'
  },

  // ── Free Pickups (no cost) ─────────────────────────────
  {
    name: 'A Glinting Die',
    description: 'Something catches your eye on the dungeon floor — a small die, still warm to the touch. You pocket it without thinking.',
    reward: { type: 'rerolls', value: 1, text: '+1 Reroll Token' },
    cost: '',
    free: true
  },
  {
    name: 'The Fallen Adventurer',
    description: 'A skeleton slumps against the wall, clutching a pouch. Inside: a single glowing token. They won\'t be needing it.',
    reward: { type: 'rerolls', value: 1, text: '+1 Reroll Token' },
    cost: '',
    free: true
  },
  {
    name: 'Dungeon Cache',
    description: 'A loose stone in the wall reveals a hidden alcove. Tucked inside is a small token pulsing with faint light.',
    reward: { type: 'rerolls', value: 1, text: '+1 Reroll Token' },
    cost: '',
    free: true
  },

  // ── Wandering Merchants (Rerolls for Deferred Curses) ──
  {
    name: 'The Wandering Merchant',
    description: 'A cloaked merchant appears from the shadows, jingling strange tokens on a chain. "I deal in second chances," he whispers.',
    reward: { type: 'rerolls', value: 2, text: '+2 Reroll Tokens' },
    cost: 'A debt is owed — for the next 3 rooms, you must use at least one element pitched down by 3+ semitones (darker than intended)'
  },
  {
    name: 'The Debt Collector',
    description: 'A skeletal figure in a top hat blocks your path, tapping a ledger with a bony finger. "Everyone pays eventually."',
    reward: { type: 'rerolls', value: 1, text: '+1 Reroll Token' },
    cost: 'The collector marks your track — your next room must include a dissonant note or chord that clashes with your key (make it intentional)'
  },
  {
    name: 'The Cursed Pawnbroker',
    description: 'Behind a cracked display case, a hunched figure polishes dice that glow with an inner light. "Take them. The price comes later."',
    reward: { type: 'rerolls', value: 2, text: '+2 Reroll Tokens' },
    cost: 'The pawnbroker\'s mark — duplicate one of your existing elements, detune it slightly, and layer it underneath the original for the rest of the session'
  },
  {
    name: 'The Fortune Teller',
    description: 'A veiled figure peers into a cracked crystal ball. "I see your future... and I can change it. For a price."',
    reward: { type: 'rerolls', value: 1, text: '+1 Reroll Token' },
    cost: 'The fortune demands tribute — add a reversed cymbal or riser before every major transition in your arrangement from this point forward'
  },

  // ── Relic Encounters ────────────────────────────────
  {
    name: 'The Relic Peddler',
    description: 'A hunched figure emerges from the shadows, a glowing artifact clutched in gnarled hands. "This belonged to a great producer. It can be yours... for a price."',
    reward: { type: 'relic', value: null, text: 'A Random Relic' },
    cost: 'Layer white noise or tape hiss under your entire track — subtle but always present, like the artifact\'s whisper'
  },
  {
    name: 'The Shrine of Echoes',
    description: 'You discover a crumbling shrine. A relic pulses on the altar, waiting to be claimed.',
    reward: { type: 'relic', value: null, text: 'A Random Relic' },
    cost: 'The shrine demands a tribute of echo — add a delay effect to at least two elements that currently have none'
  }
];
