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


// ── AMBUSH EVENTS ─────────────────────────────────────────
// "Under Attack" road events — the player must stake a completed
// track and complete a single modification task to defend it.
// If they cannot complete the task, the track is deleted.
// Only one task is assigned per ambush, chosen randomly from
// the track-type-specific list below.
//
// NOTE: If a task feels impossible given what you have for that
// track, use your best judgment and do the closest thing you can
// that represents the spirit of the task before continuing.

const AMBUSH_NAMES = [
  'Ambush in the Dark',
  'The Stalking Shadow',
  'Corridor Assault',
  'The Lurking Threat',
  'Dungeon Raid',
  'The Unseen Strike',
  'A Trap Sprung',
  'Night Terrors',
  'The Haunted Passage',
  'Echoes of Malice'
];

const AMBUSH_DESCRIPTIONS = [
  'Shadows coalesce into hostile forms — something is attacking your work.',
  'A dark presence locks onto one of your tracks. You must defend it or lose it.',
  'The dungeon shifts around you. One of your creations is under threat.',
  'You hear your own music twisted and distorted in the distance. Something is coming for it.',
  'Spectral hands reach toward your tracks — one must be defended.',
  'The walls close in. The dungeon demands a toll — modify or forfeit.',
  'A cursed mirror reflects one of your tracks back at you, warped. Fix it or it shatters.',
  'The floor gives way beneath your feet. Defend your work to keep moving.',
];

const AMBUSH_TASKS = {
  'Drums': [
    'Reposition every kick hit — move each one forward or back by at least a 16th note from where it currently sits',
    'Replace your hi-hat pattern with a completely different rhythmic subdivision',
    'Add a ghost note layer — at least 4 extra quiet snare or rim hits between existing hits',
    'Swap your snare to a different snare sample and re-tune it to fit',
    'Add a drum fill at the end of every 4 or 8 bars',
    'Layer a clap or snap on top of every snare hit',
    'Remove one drum element entirely and replace its rhythmic role with a different sound',
    'Add swing or shuffle to the entire drum pattern — at least 15% swing',
    'Double-time the hi-hat pattern for at least 4 bars',
    'Add a percussion loop underneath your existing pattern and blend it in',
    'Shift the snare timing — move it from 2 & 4 to an off-beat position for at least 4 bars',
    'Create a half-time variation of your drum pattern and alternate it with the original',
    'Add a tom fill or tom pattern that plays at least once every 8 bars',
    'Pan your hi-hats to alternate left and right on every other hit',
    'Mute the kick for 2 bars somewhere in the arrangement and let the pattern breathe',
  ],
  'Bass': [
    'Add a counter-melody or answering phrase — the bass must play a second motif in the gaps of the first',
    'Transpose the bass line up one octave for at least 4 bars, then bring it back',
    'Add a slide or glide between at least 3 notes in the bass pattern',
    'Double the bass rhythm — add an extra note between each existing note for at least 4 bars',
    'Add a rest or gap where there currently isn\'t one — create a new pocket in the bass line',
    'Harmonize the bass — add a 5th or octave layer above the existing line for at least 4 bars',
    'Change the last note of the bass phrase to a different chord tone',
    'Add a staccato variation — shorten all note lengths by half for at least 4 bars',
    'Introduce a chromatic passing tone into the bass line',
    'Add a sub-bass octave layer underneath the existing bass for the chorus/drop',
    'Create a call-and-response pattern — split the bass into two alternating phrases',
    'Add a rhythmic variation where the bass follows the kick pattern for 4 bars',
    'Extend one note into a sustained drone for at least 2 bars',
    'Add a bass break — strip it to a single repeated note for 2 bars before the phrase resolves',
  ],
  'Synth Lead': [
    'Add a counter-melody — a second melodic line that moves against the existing one',
    'Transpose the lead melody up or down by a 3rd or 5th for at least 4 bars',
    'Add a trill or ornament to at least 2 notes in the melody',
    'Create a call-and-response — split the melody into a question and answer phrase',
    'Double the melody with a different synth patch an octave up or down',
    'Add a bend or pitch dive to the first note of the phrase',
    'Simplify the melody — remove at least 2 notes and let it breathe more',
    'Add a rhythmic variation — change the rhythm of the melody without changing the notes',
    'Harmonize the lead in 3rds or 6ths for at least 4 bars',
    'Add a grace note before the most prominent note in the phrase',
    'Extend the melody — add 2 more bars to the existing phrase',
    'Create a stripped-back variation with fewer notes for a verse or breakdown section',
    'Change the articulation — make legato notes staccato or vice versa for 4 bars',
    'Add a motif — introduce a short 2-3 note hook that repeats between melody phrases',
  ],
  'Pads': [
    'Add a chord inversion — change at least one chord to a different voicing',
    'Introduce a sus2 or sus4 chord somewhere in the progression',
    'Filter automate the pad — add a slow low-pass sweep over the full progression',
    'Layer a second pad with a different texture underneath the existing one',
    'Add movement — automate the pad volume or expression so it swells and dips',
    'Change one chord to a minor or major variant (whichever it isn\'t currently)',
    'Add a passing chord between two existing chords',
    'Thin out the pad — remove the lowest or highest note from the voicing for 4 bars',
    'Add a rhythmic pulse to the pad — sidechain it or add a tremolo effect',
    'Extend the pad sustain so it bleeds into the next chord, creating a wash',
    'Transpose the entire pad part up or down by an octave for a section',
    'Add a drone note that sustains underneath the chord changes',
    'Split the pad into two layers — one holding roots, one playing upper voicings',
  ],
  'Vocals': [
    'Add a vocal double — duplicate the main vocal and offset it by a few milliseconds',
    'Chop the vocal into a new rhythmic pattern for at least 4 bars',
    'Add a harmony — layer a 3rd or 5th above or below the main vocal',
    'Reverse a vocal phrase and blend it underneath the original',
    'Add an ad-lib or vocal fill between the main phrases',
    'Pitch the vocal up or down by 2-3 semitones for at least 4 bars',
    'Create a stutter effect — repeat a single syllable rhythmically',
    'Add a whisper or spoken layer underneath the main vocal',
    'Time-stretch a vocal phrase to half-speed for a transition or intro',
    'Pan the vocal to one side and add a delayed copy on the other side',
    'Remove one vocal phrase and replace the gap with a vocal texture or breath',
    'Add a formant shift to the vocal for at least 4 bars',
    'Layer the vocal with itself pitched down an octave for the chorus/hook',
  ],
  'FX / Texture': [
    'Add a new riser or sweep that builds into an existing transition',
    'Reverse your main texture and layer it on top of the original',
    'Move the texture to a different part of the arrangement than where it currently sits',
    'Add a second texture layer that contrasts (bright vs. dark, smooth vs. gritty)',
    'Automate the texture\'s stereo width — make it collapse to mono then expand back out',
    'Chop the texture into rhythmic slices and rearrange them',
    'Pitch the texture up or down by at least 5 semitones',
    'Add a sidechain pump to the texture keyed to the kick or snare',
    'Extend the texture — make it last at least twice as long as it currently does',
    'Layer a field recording or foley element underneath the existing texture',
    'Add a frequency shift or ring mod to the texture for movement',
    'Create a fade-in version where the texture emerges slowly over 4 bars',
  ],
  'Keys / Piano': [
    'Add a counter-melody in the right hand while the left hand keeps the existing part',
    'Change the voicing — move to open voicings or close voicings (whichever you\'re not using)',
    'Add a grace note or crushed note before at least 2 chord changes',
    'Introduce a pedal tone — one note that sustains or repeats while chords change above it',
    'Simplify to single notes for at least 4 bars — strip back to a melodic line',
    'Add a rhythmic comping pattern — the keys should play a syncopated rhythm',
    'Arpeggiate the chords instead of playing them as blocks for at least 4 bars',
    'Add a bluesy or chromatic run connecting two chord changes',
    'Double the keys part with a different keyboard sound (Rhodes, Wurli, organ, etc.)',
    'Add an ostinato — a short repeating figure that plays over the chord changes',
    'Transpose the keys part up an octave for the second half of the progression',
    'Add a sustain pedal wash — let the notes ring and blur together for 2-4 bars',
    'Strip the right hand for a section and let the left hand bass notes carry alone',
  ],
  'Guitar': [
    'Add a palm-muted rhythm variation for at least 4 bars',
    'Change the strumming pattern — switch from downstrokes to an up/down pattern or vice versa',
    'Add a hammer-on or pull-off lick between chord changes',
    'Introduce a clean tone section if you\'re using distortion (or vice versa)',
    'Add a fingerpicked or arpeggiated variation of your chord progression',
    'Double-track the guitar — duplicate and hard-pan left and right',
    'Add a slide into at least one chord or note',
    'Play the same part on a different fret position or with a capo for a section',
    'Add a muted/percussive strum between chords for rhythmic drive',
    'Introduce a bend or vibrato on a sustained note',
    'Add a harmony guitar line a 3rd above the main riff for at least 4 bars',
    'Strip to single-note lines for a section — no chords, just melody',
    'Add feedback or string noise as a textural element at a transition point',
  ],
  'Strings': [
    'Add a pizzicato variation for at least 4 bars',
    'Change the bowing style — switch between sustained and staccato for contrast',
    'Add a tremolo (rapid repeated notes) on one of the string parts for a section',
    'Introduce a counterpoint line — a second melody that moves independently',
    'Double the string section an octave higher or lower for the climax',
    'Add a glissando or portamento slide between two notes',
    'Thin the arrangement — reduce to a single string voice for at least 4 bars',
    'Add harmonics or a high, airy texture above the main string part',
    'Create a rhythmic ostinato with the strings for at least 4 bars',
    'Add a swell — crescendo from silence over 2-4 bars',
    'Pan the string sections — violins left, cellos right (or similar spatial spread)',
    'Introduce a col legno or spiccato articulation for percussive texture',
  ],
  'Percussion': [
    'Add a new percussion element that wasn\'t there before (shaker, tambourine, clave, etc.)',
    'Change the rhythmic pattern — shift from straight to swung or vice versa',
    'Remove one percussion element and redistribute its rhythm to another sound',
    'Add a polyrhythmic layer — a pattern in a different subdivision than the main groove',
    'Pan your percussion elements across the stereo field — nothing should sit dead center',
    'Add a percussion break or solo for 2-4 bars',
    'Layer two percussion sounds together to create a composite hit',
    'Add a rim shot or cross-stick pattern that plays on off-beats',
    'Double-time the percussion for an energy lift in the chorus or drop',
    'Add a tribal or world percussion element (djembe, tabla, cajon hit, etc.)',
    'Create a call-and-response between two percussion sounds',
    'Mute your main percussion for 2 bars and let secondary elements carry the groove',
  ],
  '808': [
    'Add a pitch slide or glide to at least 2 of your 808 hits',
    'Retune the 808 pattern — shift at least one note to a different pitch',
    'Add a short, clipped 808 hit between existing sustained hits for rhythmic contrast',
    'Layer a sub-sine underneath the 808 for extra low-end weight',
    'Add distortion or saturation to the 808 for a section to change its character',
    'Change the 808 note lengths — make sustained notes short or short notes sustained',
    'Add an 808 roll (rapid repeated notes) before a drop or transition',
    'Pan the 808 slightly off-center for a section (subtle, not extreme)',
    'Introduce a new 808 pattern for the B-section that contrasts with the A',
    'Add a pitch bend at the end of a sustained 808 note — let it drop',
    'Remove the 808 for 2 bars and let the track breathe without sub',
    'Double the 808 with a clean sine bass for clarity on smaller speakers',
  ],
  'Brass / Woodwinds': [
    'Add a stab or staccato brass/woodwind hit on an off-beat',
    'Introduce a counter-melody — a second brass or woodwind line',
    'Add a swell — the brass/woodwind part must crescendo in from nothing over 2+ bars',
    'Change the articulation for at least 4 bars — legato to marcato or vice versa',
    'Add a call-and-response between two different brass/woodwind instruments',
    'Transpose the brass/woodwind part up or down a 3rd for a section',
    'Strip to a solo instrument for at least 4 bars — remove ensemble layers',
    'Add a trill or shake on a sustained note',
    'Introduce a muted or plunger-muted variation of the part',
    'Double the part with a different register (tenor to alto, trumpet to flugelhorn, etc.)',
    'Add a fall-off or doit (upward rip) at the end of a phrase',
    'Layer the brass/woodwinds in unison for a powerful section',
  ],
  'Arp / Sequence': [
    'Change the arp direction — if ascending, make it descending (or vice versa) for a section',
    'Add a rest or skip in the arp pattern — break the regular rhythm',
    'Change the rate — double or halve the arp speed for at least 4 bars',
    'Add a note to the arp pattern that creates a wider interval jump',
    'Filter automate the arp — sweep a low-pass or high-pass across it over 8 bars',
    'Change the arp to a random or order-shuffled mode for a section',
    'Add a second arp layer an octave up or down with a different pattern',
    'Introduce a gate or stutter on the arp to break it into a rhythmic pattern',
    'Change the arp\'s note length — make it more staccato or legato than it currently is',
    'Add a ping-pong delay to the arp for spatial movement',
    'Sync the arp to a different subdivision than it\'s currently on',
    'Transpose the arp sequence up a 5th for a section as a harmonic lift',
  ],
  'Plucks / Stabs': [
    'Add a new stab or pluck hit on an off-beat accent',
    'Layer a second pluck sound with a contrasting timbre (bright + dark)',
    'Change the rhythm — reposition your stabs to different beats',
    'Add a pitch bend or vibrato to the tail of a sustained pluck',
    'Introduce a delay-based pattern — let the echoes create a new rhythm',
    'Transpose the stab pattern up a 3rd or 5th for a section',
    'Add a chord to what was a single-note stab (or vice versa)',
    'Filter the pluck differently — add a resonant sweep or formant shift',
    'Create a chopped variation — slice existing stabs into shorter, rapid hits',
    'Add a reverse pluck before the forward version for a swell effect',
    'Mute the stabs for 2 bars and bring them back with a fill or accent',
    'Pan alternating stab hits left and right for stereo interest',
  ],
  'Mallets / Tuned Perc': [
    'Add a melodic run or scale passage connecting two phrases',
    'Change the mallet sound — switch from marimba to vibraphone or glockenspiel (or similar)',
    'Add a tremolo roll on a sustained note for drama',
    'Introduce a dampened (muted) variation for contrast',
    'Add a second mallet layer harmonizing a 3rd above or below',
    'Change the register — move the part up or down an octave for a section',
    'Add dead strokes or ghost notes between the main hits',
    'Create an ostinato pattern — a short repeating motif that loops',
    'Add grace notes before main hits for a rolling, flowing feel',
    'Pan the mallets wide for spatial presence',
    'Simplify to single notes for a section, then return to the full pattern',
    'Add a glissando or sweep across the bars/keys at a transition point',
  ],
  'World / Ethnic': [
    'Add a new cultural percussion or melodic element that complements the existing one',
    'Change the scale or mode — shift to a related mode for at least 4 bars',
    'Add a drone or sustained root note underneath the existing part',
    'Introduce a call-and-response phrase structure',
    'Add an ornamental flourish — a trill, turn, or grace note passage',
    'Layer a second instrument from the same musical tradition',
    'Change the tempo feel — add a ritardando or accelerando in a section',
    'Add a rhythmic ostinato from a different world music tradition',
    'Transpose the melody to a higher or lower register for a section',
    'Add a vocal or chant-like element that follows the melody contour',
    'Strip to a solo unaccompanied passage for 2-4 bars',
    'Add microtonal bends or pitch slides characteristic of the tradition',
  ],
  'Choir / Ensemble': [
    'Add a new vocal section — soprano, alto, tenor, or bass layer that wasn\'t there',
    'Change the texture — switch from homophonic (same rhythm) to polyphonic (independent lines) for a section',
    'Add a sustained pedal note in one voice while others move',
    'Introduce a dynamic change — crescendo or decrescendo over 4 bars',
    'Split the choir — have half the voices drop out for a reduced section',
    'Add a unison passage where all voices sing the same note/melody',
    'Change the vowel or syllable the choir is singing for a timbral shift',
    'Add staggered entries — voices entering one by one over 2-4 bars',
    'Introduce a divisi — split one section into two parts',
    'Add a whisper or breath layer underneath the main choir',
    'Transpose the choir up or down a step for a key change effect',
    'Add a choral "swell and cut" — a dramatic crescendo that stops abruptly',
  ],
  'Foley / Found Sound': [
    'Add a new foley element recorded from your immediate environment',
    'Rearrange your foley elements — move them to different positions in the arrangement',
    'Layer two foley sounds together to create a new composite texture',
    'Pitch your main foley element up or down to change its character',
    'Add rhythmic repetition to a foley element — make it loop musically',
    'Reverse one of your foley sounds and blend it with the original',
    'Add a foley element that mimics a traditional instrument sound',
    'Process a foley sound through heavy reverb or delay for an atmospheric version',
    'Create a transition using foley — a sweep, scrape, or impact sound',
    'Pan your foley elements to create a spatial story (left to right movement)',
    'Add a foley percussion layer — taps, clicks, or knocks in rhythm',
    'Time-stretch a short foley sound into a long, evolving texture',
  ],
  'Ambient / Drone': [
    'Add a new harmonic layer — introduce a 5th or octave above the existing drone',
    'Modulate the drone — add slow pitch drift or vibrato',
    'Introduce a rhythmic pulse or throb to the ambient texture',
    'Layer a contrasting texture — bright against dark, or smooth against grainy',
    'Add a fade-out and fade-in of the drone for a breathing effect',
    'Filter sweep the drone over 8+ bars from dark to bright',
    'Add a second drone a different interval away for harmonic tension',
    'Introduce a granular or glitchy variation of the drone for a section',
    'Pan the drone — make it slowly drift across the stereo field',
    'Add a subtle melodic fragment floating above the drone',
    'Create a break — silence the drone for 1-2 bars, then bring it back',
    'Layer field recordings or environmental sounds underneath the drone',
  ],
  'Vocal Chops': [
    'Rearrange the chop order — create a new melodic phrase from existing chops',
    'Add a new chop that fills a gap in the current pattern',
    'Pitch a chop up or down to create a harmony with the original',
    'Reverse at least one chop and weave it into the pattern',
    'Add a stutter effect — rapidly repeat one chop for rhythmic interest',
    'Layer two chops on top of each other for a thicker sound',
    'Change the timing — move your chops to off-beat positions',
    'Add a formant shift to one or more chops',
    'Create a build-up by gradually adding more chops over 4 bars',
    'Add a chopped vocal phrase that answers or echoes the main pattern',
    'Process one chop completely differently from the rest for contrast',
    'Mute the chops for 2 bars and fill the gap with a different vocal texture',
  ],
  'Noise / Industrial': [
    'Add a new noise source — white, pink, or a different character of noise',
    'Create a rhythmic gate on the noise — chop it into a pattern',
    'Layer a metallic or mechanical sound with the existing noise',
    'Filter the noise differently — band-pass it to a specific frequency range',
    'Add a sidechain pump to the noise keyed to a rhythmic element',
    'Reverse a noise burst and use it as a riser or transition',
    'Pitch the noise up or down for a tonal variation',
    'Add distortion or bitcrushing to make the noise more aggressive',
    'Modulate the noise with an LFO — amplitude, filter, or pan',
    'Create a noise sweep — automate a band-pass filter across the spectrum',
    'Add a second noise layer that contrasts (smooth vs. harsh, high vs. low)',
    'Chop the noise into a staccato pattern for percussive texture',
  ],
  'Sampler / Chops': [
    'Re-chop your sample — create a new arrangement from the existing chops',
    'Add a chop that you haven\'t used yet from the same source',
    'Pitch one chop to create a melodic variation',
    'Reverse a chop and place it before the forward version',
    'Add a stutter or repeat on the most impactful chop',
    'Layer two chops at different pitches for a harmonic stack',
    'Change the chop lengths — make long chops short or short chops long',
    'Add a filter sweep across a chop sequence',
    'Rearrange the chop order to create a new groove or melody',
    'Time-stretch one chop to twice its length for a slowdown effect',
    'Pan alternating chops left and right',
    'Add a gap or rest in the chop pattern where there currently isn\'t one',
  ]
};
