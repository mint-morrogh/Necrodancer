// ── ROOM NAMES ──────────────────────────────────────────
const ROOM_NAMES = [
  'The Crypt of Echoes','The Bone Chamber','The Void Sanctum','Wailing Depths',
  'Obsidian Vault','The Lich\'s Study','Phantom Corridor','The Abyssal Pit',
  'Chamber of Lost Souls','The Necrotic Garden','Tomb of Forgotten Beats',
  'The Spectral Hall','Dungeon of Dissonance','The Cursed Archive','Shadow Alcove',
  'The Haunted Frequency','Catacomb of Rhythm','The Banshee\'s Lair',
  'Pit of Reverberations','The Dark Resonance','Serpent\'s Den','The Frozen Sanctum',
  'Graveyard of Melodies','The Infernal Forge','Cavern of Whispers',
  'The Blood Moon Chamber','Throne of Decay','The Shattered Cloister',
  'Abyss of the Unheard','The Necromancer\'s Workshop','The Howling Nave',
  'Catacombs of the Forgotten','The Ember Vault','The Wraith\'s Gallery',
  'Halls of Petrified Sound','The Doom Cellar','Labyrinth of Frequencies',
  'The Charnel Pit','Sanctum of Shattered Glass','The Ossuary of Tone',
  // ── added ──
  'The Crystalline Depths','The Iron Maiden\'s Chamber','The Whispering Ossuary',
  'The Void Between Notes','The Sunken Cathedral','The Plagued Catacombs',
  'The Spider\'s Web','The Clockwork Crypt','The Molten Core',
  'The Frozen Throne','The Echoing Abyss','The Rusted Gate',
  'The Alchemist\'s Cellar','The Bone Organ','The Worm\'s Passage',
  'The Drowned Library','The Petrified Forest','The Blackened Choir Loft',
  'The Sulfur Pits','The Crystal Cavern','The Weeping Wall',
  'The Forgotten Amphitheater','The Toxic Garden','The Obsidian Mirror',
  'The Hollow Mountain','The Bleeding Chapel','The Bone Throne Room',
  'The Echo Chamber of Madness','The Submerged Vault','The Ash-Covered Atrium',
  'The Fungal Grotto','The Shattered Hourglass','Den of the Grave Warden',
  'The Corroded Organ Pipes','Cathedral of Broken Strings','The Rusted Bellows',
  'The Stalactite Sanctum','Tomb of the Bass Drop','The Flickering Nave',
  'Chamber of the Eternal Loop','The Wax Cylinder Vault','The Decomposed Orchestra Pit',
  'Lair of the Feedback Wyrm','The Resonant Skull','The Phantom Frequency Room',
  'Crypt of the Lost Channel','The Distortion Dungeon','Vault of Decayed Waveforms',
  'The Granular Abyss','Sanctum of the Broken Oscillator'
];

// ── YOUTUBE ROOM NAMES (rare variant rooms) ──────────
const YOUTUBE_ROOM_NAMES = [
  'The Forbidden Archive','The Pirate\'s Broadcast','Chamber of Lost Transmissions',
  'The Analog Crypt','Vault of Stolen Signals','The Bootleg Sanctum',
  'Den of the Uncleared','The Static Shrine','Tomb of Dead Channels',
  'The VHS Catacombs','Hall of Decayed Streams','The Upload Abyss'
];

// ── ALCHEMIST ROOM NAMES ─────────────────────────────
const ALCHEMIST_ROOM_NAMES = [
  'The Alchemist\'s Laboratory','The Transmutation Chamber','The Philosopher\'s Crucible',
  'The Reagent Vault','The Distillation Den','The Mercury Pool',
  'The Sulfur Sanctum','The Athanor Room','The Elixir Workshop',
  'The Hermetic Library','The Calcination Pit','The Tincture Cellar'
];

// ── ALCHEMIST DIRECTIVES (recording prompts) ─────────
const ALCHEMIST_DIRECTIVES = [
  'Record a sound in your room right now and use it as source material',
  'Capture a sound from your phone (notification, alarm, ringtone) and process it',
  'Record yourself humming or singing and use it as the foundation',
  'Capture the ambient noise around you for 10 seconds and build from it',
  'Record a percussive sound using objects on your desk',
  'Use your voice to beatbox or create a rhythm, then process it beyond recognition',
  'Record the sound of running water and shape it into something musical',
  'Capture a sound from outside (traffic, wind, birds) through a window or door',
  'Record yourself tapping, clicking, or scratching a surface and tune it to key',
  'Use your microphone to capture feedback or interference and sculpt it',
  'Record a kitchen sound (utensils, appliances, containers) as raw material',
  'Capture the sound of fabric, paper, or packaging being crinkled or torn'
];

// ── CHEST MESSAGES ────────────────────────────────────
const CHEST_MESSAGES = [
  'A gilded chest materializes from the shadows...',
  'You hear the click of ancient tumblers unlocking...',
  'The spirits have left you a gift between the walls...',
  'A glowing chest pulses with arcane energy...',
  'Hidden treasure! The dungeon rewards the brave...'
];

// ── BOSS ROOM NAMES ──────────────────────────────────
const BOSS_ROOM_NAMES = [
  'The Throne of Dissonance','The Lich King\'s Arena','The Abyssal Colosseum',
  'Chamber of the Fallen Maestro','The Necromancer\'s Stage','The Blood Conductor\'s Hall',
  'Arena of Shattered Frequencies','The Doom Organ Cathedral','The Warden\'s Amphitheater',
  'The Bone Orchestra Pit','Sanctum of the Final Mix','The Phantom Conductor\'s Podium'
];

// ── BOSS CURSES (master bus challenges — still allow a good mix) ──
const BOSS_CURSES = [
  'Add a bit crusher to the master bus — keep it subtle enough that the mix still sounds intentional',
  'Add a flanger to the master bus at low depth — the whole mix should shimmer slightly',
  'Add a phaser to the master bus — slow rate, low mix, just enough to feel the movement',
  'Put a reverb on the master bus — short decay, under 20% wet, the mix lives in a room now',
  'Add a chorus effect to the master bus — keep it tight so the mix widens without getting washy',
  'Run the master bus through a tape saturation plugin for the rest of the session',
  'Apply a 1dB per octave tilt EQ to the master bus — bright or dark, your choice, but commit',
  'Cut a frequency band of your choice on the master bus by 50% — carve a hole in the mix',
  'Boost the master bus above 8kHz by 3dB — add some air and sizzle to everything',
  'Roll off everything below 40Hz on the master bus — tighten up the sub',
  'Apply parallel compression to the mix bus — blend at no more than 30%',
  'Sidechain the entire mix bus to a ghost kick at -24dB — subtle pumping on the master',
  'Add a stereo widener to the master bus — push the sides out but keep the low end centered',
  'No reverb or delay sends may exceed -12dB — keep spatial effects subtle for the rest of the session',
  'Every track must have at least one automation lane active from this point forward',
  'The mix must breathe: automate master volume ±1dB between sections for dynamic movement',
  'Add a multiband compressor to the master bus — tame at least two frequency bands',
  'Put a de-esser on the master bus targeting 5-8kHz — tame any harshness across the mix',
  'Add a tremolo effect to the master bus — slow rate, shallow depth, gentle pulse on everything',
  'Apply a vinyl/lo-fi plugin to the master bus — add some dust, crackle, or age to the mix'
];

// ── BOSS CURSES NIGHTMARE (extreme — can destroy the mix) ──────
const BOSS_CURSES_NIGHTMARE = [
  'Master bus must have no more than 3dB of dynamic range — brick-wall limit everything',
  'No element in the mix may exceed -6dB peak — strict gain staging required',
  'All elements must be frequency-separated — no two tracks may share the same dominant frequency band',
  'The stereo field must be managed: nothing below 200Hz in the sides, nothing above 10kHz in mono center',
  'The entire mix must be collapsed to mono — no stereo field allowed',
  'All elements must be gain-staged: pre-fader levels between -18dB and -12dB with no exceptions',
  'The stereo image must alternate: verse narrow (50% width), chorus wide (120% width)',
  'No track may have more than 3 plugins total — strip back to absolute essentials',
  'Every frequency band (sub, low, mid, high, air) must have a designated owner track — no overlap allowed',
  'The master bus must have mid-side processing — cut the mids by 3dB and boost the sides by 3dB',
  'All reverb tails must be ducked by -6dB when any lead element plays — total clarity enforcement',
  'Bounce the entire mix to a single stem, re-import it, and build a new arrangement layer on top',
  'Add a ring modulator to the master bus — find a setting that sounds intentional, not broken',
  'Apply a resonant bandpass filter to the master bus — sweep it manually across the whole track',
  'Run the master through a guitar amp sim — the whole mix is now distorted and cabinet-colored'
];

// ── BOSS BLESSINGS (powerful rewards) ────────────────
const BOSS_BLESSINGS = [
  '☀ Conqueror\'s Might — gain +3 reroll tokens for defeating the boss',
  '☀ Warlord\'s Shield — the next 2 rooms cannot be cursed',
  '☀ Plunderer\'s Bounty — remove ALL deferred curses currently in your quest log',
  '☀ Champion\'s Freedom — your next room has zero constraints of any kind',
  '☀ Titan\'s Echo — duplicate any completed room\'s element for free layering',
  '☀ Overlord\'s Decree — choose your exact genre and track type for the next room',
  '☀ Victor\'s Spoils — gain immunity to next-room curses for 3 rooms',
  '☀ Battle Hymn — your next track gets a guaranteed blessing with no curse',
  '☀ Dragon\'s Hoard — all gold earned is doubled for the next 3 rooms',
  '☀ Necrolord\'s Pact — sacrifice 1 reroll to remove any 2 active curses from your quest log'
];
