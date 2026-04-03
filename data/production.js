// ════════════════════════════════════════════════════════
// PRODUCTION MODE DATA
// Directives, flavors, and room names for production rooms
// (VST/synth-based instead of Splice sample-based)
// ════════════════════════════════════════════════════════

const PRODUCTION_ROOM_NAMES = [
  "The Synthesizer's Sanctum",
  'The Oscillator Chamber',
  'The Waveform Forge',
  'Hall of Patch Design',
  'The Modular Labyrinth',
  'The Filter Cavern',
  'The Resonance Altar',
  'The Signal Path',
  'Chamber of Harmonics',
  'The Frequency Tomb',
  'The Voltage Crypt',
  'The Envelope Gate'
];

// ── PRODUCTION DIRECTIVES (per track type) ──────────────
// {genre} is replaced at runtime with the rolled genre name
// These tell the user to CREATE sounds with VSTs/synths

const PRODUCTION_DIRECTIVES = {
  'Drums': [
    'Program a <span style="color:var(--gold);">{genre}</span> drum pattern from scratch using a drum machine or synthesizer',
    'Design a <span style="color:var(--gold);">{genre}</span>-style drum kit using synthesis and program a groove',
    'Build a <span style="color:var(--gold);">{genre}</span> beat from scratch — synthesize or layer your own kick, snare, and hats'
  ],
  'Bass': [
    'Use a synth of your choice to create a <span style="color:var(--gold);">{genre}</span>-style bass sound',
    'Design a bass patch from scratch in the style of <span style="color:var(--gold);">{genre}</span>',
    'Build a <span style="color:var(--gold);">{genre}</span> bass line using any synthesizer — shape the tone yourself'
  ],
  'Synth Lead': [
    'Design a lead sound from scratch using any synth in the style of <span style="color:var(--gold);">{genre}</span>',
    'Create a <span style="color:var(--gold);">{genre}</span>-inspired lead patch — choose your synthesis method',
    'Craft a <span style="color:var(--gold);">{genre}</span> lead melody using a synth of your choice'
  ],
  'Pads': [
    'Design a pad sound from scratch in the style of <span style="color:var(--gold);">{genre}</span>',
    'Create a <span style="color:var(--gold);">{genre}</span> pad using any synth — focus on texture and movement',
    'Build a <span style="color:var(--gold);">{genre}</span>-style atmosphere using synthesis — no presets allowed'
  ],
  'Vocals': [
    'Record or process your own vocal performance in the style of <span style="color:var(--gold);">{genre}</span>',
    'Create a <span style="color:var(--gold);">{genre}</span>-style vocal element — record yourself or use a vocal synth',
    'Use a vocoder, formant synth, or your own voice to produce a <span style="color:var(--gold);">{genre}</span> vocal part'
  ],
  'FX / Texture': [
    'Design a <span style="color:var(--gold);">{genre}</span>-style texture or FX layer using synthesis',
    'Create atmospheric FX from scratch using any synth — fit a <span style="color:var(--gold);">{genre}</span> context',
    'Build a <span style="color:var(--gold);">{genre}</span> sound design element using noise generators, resonators, or granular tools'
  ],
  'Keys / Piano': [
    'Use a piano or keys VST to perform a part in the style of <span style="color:var(--gold);">{genre}</span>',
    'Play a <span style="color:var(--gold);">{genre}</span>-style keys part using any piano or electric piano plugin',
    'Create a <span style="color:var(--gold);">{genre}</span> keyboard part — choose any keys instrument VST'
  ],
  'Guitar': [
    'Use a guitar VST or amp sim to create a <span style="color:var(--gold);">{genre}</span>-style guitar part',
    'Produce a <span style="color:var(--gold);">{genre}</span> guitar element — use any guitar plugin or record a real guitar',
    'Create a <span style="color:var(--gold);">{genre}</span>-style guitar part using virtual instruments or DI recording'
  ],
  'Strings': [
    'Use a strings VST to compose a part in the style of <span style="color:var(--gold);">{genre}</span>',
    'Create a <span style="color:var(--gold);">{genre}</span>-style string arrangement using any orchestral plugin',
    'Write a <span style="color:var(--gold);">{genre}</span> strings part — use any virtual string instrument'
  ],
  'Percussion': [
    'Program a <span style="color:var(--gold);">{genre}</span> percussion layer using synthesized or designed sounds',
    'Build a <span style="color:var(--gold);">{genre}</span>-style percussion groove from scratch using any instrument or synth',
    'Create <span style="color:var(--gold);">{genre}</span> percussion elements — synthesize, record, or design each hit yourself'
  ],
  '808': [
    'Design an 808-style sound from scratch for a <span style="color:var(--gold);">{genre}</span> track using a synth',
    'Create a <span style="color:var(--gold);">{genre}</span>-style 808 bass using sine wave synthesis and envelope shaping',
    'Build your own <span style="color:var(--gold);">{genre}</span> 808 from a synthesizer — tune and shape it yourself'
  ],
  'Brass / Woodwinds': [
    'Use a brass or woodwind VST to create a <span style="color:var(--gold);">{genre}</span>-style part',
    'Compose a <span style="color:var(--gold);">{genre}</span> horn or woodwind line using any virtual instrument',
    'Create a <span style="color:var(--gold);">{genre}</span>-style brass/woodwind element — use any plugin or synth approximation'
  ],
  'Arp / Sequence': [
    'Program an arpeggio or sequence in the style of <span style="color:var(--gold);">{genre}</span> using any synth',
    'Design an arp patch and program a <span style="color:var(--gold);">{genre}</span>-style pattern from scratch',
    'Create a <span style="color:var(--gold);">{genre}</span> sequenced element — use your synth\'s arp or step sequencer'
  ],
  'Plucks / Stabs': [
    'Design a pluck or stab sound from scratch in the style of <span style="color:var(--gold);">{genre}</span>',
    'Create a <span style="color:var(--gold);">{genre}</span>-style stab using any synth — short decay, punchy character',
    'Build a <span style="color:var(--gold);">{genre}</span> pluck patch — shape the envelope and tone yourself'
  ],
  'Mallets / Tuned Perc': [
    'Use a mallet instrument VST or synth to create a <span style="color:var(--gold);">{genre}</span>-style part',
    'Create a <span style="color:var(--gold);">{genre}</span> tuned percussion element using any virtual instrument',
    'Design a <span style="color:var(--gold);">{genre}</span>-style mallet sound — use FM synthesis, physical modeling, or a dedicated VST'
  ],
  'World / Ethnic': [
    'Use a world instrument VST or synth to create a part in the style of <span style="color:var(--gold);">{genre}</span>',
    'Create a <span style="color:var(--gold);">{genre}</span>-style ethnic element using any virtual instrument or synthesis technique',
    'Produce a <span style="color:var(--gold);">{genre}</span> world instrument part — use any plugin that fits the cultural context'
  ],
  'Choir / Ensemble': [
    'Use a choir or ensemble VST to create a <span style="color:var(--gold);">{genre}</span>-style vocal layer',
    'Create a <span style="color:var(--gold);">{genre}</span> choral element using any virtual choir or vocal synth',
    'Build a <span style="color:var(--gold);">{genre}</span>-style ensemble part — stack voices using a synth or dedicated VST'
  ],
  'Foley / Found Sound': [
    'Record a real-world sound and process it to fit a <span style="color:var(--gold);">{genre}</span> context',
    'Capture a sound from your environment and transform it into a <span style="color:var(--gold);">{genre}</span>-style element',
    'Find or record a non-musical sound and design it into something that fits <span style="color:var(--gold);">{genre}</span>'
  ],
  'Ambient / Drone': [
    'Create a <span style="color:var(--gold);">{genre}</span>-style ambient layer or drone using any synth',
    'Design an evolving drone from scratch in the style of <span style="color:var(--gold);">{genre}</span>',
    'Build a <span style="color:var(--gold);">{genre}</span> ambient texture using synthesis — granular, subtractive, or additive'
  ],
  'Vocal Chops': [
    'Record and chop your own vocal into a <span style="color:var(--gold);">{genre}</span>-style pattern',
    'Create <span style="color:var(--gold);">{genre}</span>-style vocal chops — record yourself and slice/process the results',
    'Use a vocal synth or your own voice to produce <span style="color:var(--gold);">{genre}</span> vocal chop elements'
  ],
  'Noise / Industrial': [
    'Design a <span style="color:var(--gold);">{genre}</span>-style noise or industrial element using synthesis',
    'Create a <span style="color:var(--gold);">{genre}</span> noise layer from scratch — use distortion, feedback, or noise generators',
    'Build an industrial texture for <span style="color:var(--gold);">{genre}</span> using any combination of synths and processing'
  ],
  'Sampler / Chops': [
    'Record or source your own audio and chop it into a <span style="color:var(--gold);">{genre}</span>-style sampler part',
    'Create a <span style="color:var(--gold);">{genre}</span> sampled element — record something original and rearrange it',
    'Build a <span style="color:var(--gold);">{genre}</span>-style chop sequence from your own recorded material'
  ]
};


// ── PRODUCTION FLAVOR (bonus objectives for production rooms) ──
// Synthesis approaches / techniques instead of sample-hunt directions

const PRODUCTION_FLAVOR = {
  'Drums': { label: 'Synthesis Approach', options: [
    'Analog synthesis (shape noise and sine waves into drum hits)',
    'FM synthesis drums (metallic, punchy, complex transients)',
    'Use your DAW\'s built-in drum machine or drum synth',
    'Layer multiple synthesized elements per hit for thickness',
    'Physical modeling (simulate the physics of drum membranes and shells)',
    'Design each hit from filtered noise bursts and short envelopes',
    'Use granular processing on a simple click to build full hits',
    'Additive synthesis (build each drum hit from individual harmonics)'
  ]},
  'Bass': { label: 'Synthesis Method', options: [
    'Subtractive synthesis (filter a rich waveform down to your bass tone)',
    'FM synthesis (frequency modulation for complex, punchy bass)',
    'Wavetable synthesis (morph between waveforms for movement)',
    'Analog-modeled plugin (Moog-style, ladder filter, warm saturation)',
    'Additive synthesis (build bass timbre from harmonics)',
    'Phase distortion (Casio CZ-style — sharp, digital character)',
    'Use a single oscillator only — shape tone purely with filtering',
    'Resynthesis (analyze a sound and rebuild it as your bass patch)'
  ]},
  'Synth Lead': { label: 'Synthesis Method', options: [
    'Subtractive synthesis (classic analog filtering approach)',
    'FM synthesis (DX7/Operator style — metallic, bell-like harmonics)',
    'Wavetable synthesis (Serum/Vital — morph through wave shapes)',
    'Granular synthesis (clouds of micro-samples as your lead source)',
    'Physical modeling (simulate plucked, bowed, or blown instruments)',
    'Additive/spectral (build from individual partials)',
    'Supersaw/unison stacking (thick, wide, detuned layers)',
    'Vector synthesis (crossfade between multiple wave sources)'
  ]},
  'Pads': { label: 'Pad Design', options: [
    'Slow-attack subtractive (low-pass filtered with long release)',
    'Granular texture (build the pad from micro-samples)',
    'Wavetable morphing (evolving timbral shifts over time)',
    'Layered unison (stack and detune for width and warmth)',
    'Spectral processing (freeze or smear a sound into a pad)',
    'FM synthesis pad (evolving modulation index for movement)',
    'Noise-filtered pad (use filtered noise as your primary source)',
    'Formant synthesis (vowel-shaped resonances for vocal character)'
  ]},
  'Vocals': { label: 'Vocal Approach', options: [
    'Record your own voice and process it (pitch correction, effects)',
    'Use a vocal synthesis plugin (formant synth, speech synthesizer)',
    'Vocoder processing (run a synth through a vocoder with your voice)',
    'Record and heavily process until unrecognizable from source',
    'Layer multiple takes of your own voice for ensemble effect',
    'Whisper, hum, or breathe — use non-singing vocal sounds',
    'Use talkbox-style processing (synth controlled by mouth shape)',
    'Record ad-libs and process them into rhythmic vocal elements'
  ]},
  'FX / Texture': { label: 'Design Method', options: [
    'Granular synthesis (stretch, scatter, and cloud-ify a simple source)',
    'Feedback and resonance (self-oscillating filters, feedback loops)',
    'Noise sculpting (shape white/pink noise with filters and envelopes)',
    'Spectral processing (FFT-based smearing, freezing, blurring)',
    'Ring modulation (metallic, inharmonic frequency interactions)',
    'Convolution (use an impulse response creatively as a sound source)',
    'Bit-reduction and sample rate crushing for digital artifacts',
    'Layered reverb tails (capture and stack reverb decay as texture)'
  ]},
  'Keys / Piano': { label: 'Instrument Choice', options: [
    'Acoustic piano VST (grand or upright — realistic tone)',
    'Electric piano (Rhodes, Wurlitzer, or CP-style plugin)',
    'Clavinet / harpsichord VST (bright, percussive keys)',
    'Organ plugin (B3 drawbar, transistor, or pipe organ)',
    'Hybrid keys (layer a piano with a synth pad underneath)',
    'Toy piano or prepared piano VST (unusual timbres)',
    'FM electric piano (DX7-style — glassy, bell-like keys)',
    'Any keys VST of your choice — match the genre feel'
  ]},
  'Guitar': { label: 'Guitar Approach', options: [
    'Guitar amp sim plugin (choose clean, crunch, or high gain)',
    'Acoustic guitar VST or recorded DI acoustic',
    'Electric guitar with pedal chain (virtual pedalboard)',
    'Synth guitar (use a synth to approximate guitar-like tones)',
    'Recorded DI guitar with your own amp sim chain',
    'Nylon/classical guitar VST (fingerpicked, gentle tone)',
    'Slide guitar or lap steel (real or virtual)',
    'Any guitar plugin — match the genre\'s typical guitar tone'
  ]},
  'Strings': { label: 'String Method', options: [
    'Orchestral strings VST (legato, spiccato, or tremolo)',
    'Solo string instrument (violin, cello, or viola plugin)',
    'Synth strings (use a synthesizer to approximate string tone)',
    'Cinematic strings with expression automation',
    'Pizzicato strings (plucked articulation)',
    'Chamber ensemble (small string section, intimate)',
    'Ethnic/folk strings VST (erhu, oud, koto, sitar)',
    'Any string plugin — match the genre\'s character'
  ]},
  'Percussion': { label: 'Perc Method', options: [
    'Synthesize each percussion hit from scratch',
    'Use a dedicated percussion VST or instrument plugin',
    'Layer synthesized clicks, pops, and noise for each hit',
    'Physical modeling (simulate striking surfaces virtually)',
    'Use your DAW\'s stock instruments for all percussion',
    'FM synthesis (create metallic, pitched percussion hits)',
    'Record real objects as percussion and process them',
    'Any percussion instrument plugin — match the genre'
  ]},
  '808': { label: '808 Method', options: [
    'Sine wave + pitch envelope (classic 808 kick recipe)',
    'Analog-modeled synth (use a virtual analog for warmth)',
    'FM synthesis (add harmonics to a sine sub for punch)',
    'Layer a click transient with a long sine tail',
    'Use a dedicated 808 synth plugin (not a sample)',
    'Distorted sine wave with saturation for grit',
    'Wavetable starting from a sine — add subtle harmonics',
    'Design from scratch using your favorite synth'
  ]},
  'Brass / Woodwinds': { label: 'Instrument Approach', options: [
    'Brass VST (trumpet, trombone, French horn — realistic)',
    'Saxophone plugin (alto, tenor, soprano, or bari)',
    'Flute or clarinet VST (woodwind, airy tone)',
    'Synth brass (use a synthesizer to approximate brass stabs)',
    'Horn section ensemble plugin (layered brass)',
    'Physical modeling wind instrument (blown tube simulation)',
    'Any brass/woodwind plugin — match the genre feel',
    'Record a real instrument if available, otherwise use any VST'
  ]},
  'Arp / Sequence': { label: 'Sequencer Method', options: [
    'Use your synth\'s built-in arpeggiator',
    'Program a step sequence manually (note by note)',
    'Use a random/generative sequencer to create the pattern',
    'MIDI arp plugin into any synth of your choice',
    'Euclidean rhythm generator for the note pattern',
    'Use a sample-and-hold style random sequence',
    'Program a polyrhythmic sequence (multiple time divisions)',
    'Any sequencing method — focus on the synth patch design'
  ]},
  'Plucks / Stabs': { label: 'Pluck Design', options: [
    'Short envelope with fast filter decay (subtractive pluck)',
    'FM pluck (high modulation index with fast decay)',
    'Karplus-Strong / physical modeling (plucked string algorithm)',
    'Wavetable with instant attack and short release',
    'Layered transient + body (click + tone in one patch)',
    'Granular micro-burst (very short grain cloud)',
    'Ring-modulated pluck (metallic, inharmonic character)',
    'Any synthesis method — focus on short, punchy character'
  ]},
  'Mallets / Tuned Perc': { label: 'Mallet Method', options: [
    'FM synthesis (bell-like, metallic mallet tones)',
    'Physical modeling (simulate striking a resonant surface)',
    'Additive synthesis (build from harmonic partials)',
    'Dedicated mallet VST (vibraphone, marimba, glockenspiel)',
    'Wavetable (metallic wave shapes with fast decay)',
    'Granular (micro-sampled strike transients)',
    'Subtractive with resonant filter ping (tuned percussion)',
    'Any mallet instrument plugin — match the genre'
  ]},
  'World / Ethnic': { label: 'Instrument Approach', options: [
    'Use a dedicated world instrument VST',
    'Approximate the instrument with a synthesizer',
    'Physical modeling plugin (simulate the instrument type)',
    'Use any ethnic/world instrument plugin you have',
    'Combine a synth with cultural scale/mode patterns',
    'Record a real world instrument if available',
    'Sample-based world instrument (Kontakt, etc.)',
    'Any approach — capture the cultural character of the genre'
  ]},
  'Choir / Ensemble': { label: 'Choir Method', options: [
    'Choir VST (SATB or specialized vocal library)',
    'Vocal synthesis (formant filters on a synth)',
    'Record and stack your own voice in multiple layers',
    'Vocoder choir (run chords through a vocoder)',
    'Use a dedicated ensemble or choir plugin',
    'Granular vocal processing (smear vocals into choir texture)',
    'Synth choir pad (vowel-shaped filter on a pad synth)',
    'Any choir/ensemble plugin — match the genre'
  ]},
  'Foley / Found Sound': { label: 'Recording Method', options: [
    'Record sounds in your immediate environment',
    'Capture sounds from household objects',
    'Record outdoor/nature sounds and process them',
    'Use your phone to capture and transfer sounds',
    'Record your own body sounds (claps, snaps, stomps)',
    'Capture kitchen sounds (pots, utensils, water)',
    'Record mechanical sounds (fans, motors, switches)',
    'Any real-world sound source — process to fit the genre'
  ]},
  'Ambient / Drone': { label: 'Drone Method', options: [
    'Granular synthesis (freeze and stretch a source into a drone)',
    'Long-release pad with slow modulation (evolving texture)',
    'Feedback loop processing (controlled self-oscillation)',
    'Spectral freeze (FFT-based sustained tone)',
    'Layered sine waves with slow detuning',
    'Convolution reverb abuse (infinite decay, smeared source)',
    'Additive synthesis (manually shape each harmonic over time)',
    'Any synthesis method — focus on slow evolution and sustain'
  ]},
  'Vocal Chops': { label: 'Chop Approach', options: [
    'Record your own voice and slice it rhythmically',
    'Use a vocal synth and chop the output',
    'Record and reverse/pitch vocal fragments',
    'Layer and process vocal takes then dice into hits',
    'Use a sampler to trigger your own recorded syllables',
    'Vocoder-process your voice then chop the result',
    'Record words/phrases and rearrange into a new pattern',
    'Any vocal source you create — chop and arrange to fit'
  ]},
  'Noise / Industrial': { label: 'Noise Method', options: [
    'Filtered noise generators (white, pink, or colored noise)',
    'Feedback and distortion chains (harsh, aggressive)',
    'Bitcrusher and sample rate reduction (digital destruction)',
    'Ring modulation and frequency shifting (metallic tones)',
    'Record real industrial/mechanical sounds and process them',
    'Self-oscillating filter sweeps (screaming resonance)',
    'Granular deconstruction of any source into noise texture',
    'Any harsh or experimental technique — push it to extremes'
  ]},
  'Sampler / Chops': { label: 'Sampling Approach', options: [
    'Record something original and chop it in a sampler',
    'Use your own previous productions as source material',
    'Record a live instrument and slice it into playable hits',
    'Capture ambient sound and rearrange into a musical pattern',
    'Record a vocal performance and chop into an instrument',
    'Use your DAW\'s built-in sampler with original recordings',
    'Process found sounds into tuned, playable sampler patches',
    'Any original audio you create — slice and rearrange'
  ]}
};


// ── MODE-SPECIFIC BLESSINGS ─────────────────────────────

const BLESSINGS_PRODUCTION = [
  'The spirits grant you Preset Freedom \u2014 you may use any preset as a starting point instead of designing from scratch',
  'Patch Memory \u2014 you may reuse a patch you designed in a previous production room',
  'The spirits simplify your task \u2014 use any single synth plugin for everything in this room',
  'Layering License \u2014 stack as many synth layers as you want with no restrictions'
];

const BLESSINGS_SPLICE = [
  'Genre Unlock \u2014 search any genre on Splice for this room, ignoring the assigned genre',
  'Sample Freedom \u2014 use any sample type from Splice, not just the one assigned',
  'Double Dip \u2014 use samples from two different genres on Splice for this room',
  'The spirits expand your search \u2014 use Splice tags and genres interchangeably'
];


// ── MODE-SPECIFIC CURSES ────────────────────────────────

const CURSES_PRODUCTION = [
  'Init patch only — start from a default initialized patch, no presets or saved patches',
  'Single oscillator — design your sound using only one oscillator',
  'No filter allowed — shape your tone without using any filter',
  'Mono only — your synth must be set to monophonic mode',
  'No automation — set your synth parameters once and don\'t move them',
  'Stock plugins only — use only your DAW\'s built-in instruments',
  'No effects on the synth itself — only dry signal from the instrument',
  'Minimal patch — use 3 or fewer parameters beyond the default init'
];

const CURSES_SPLICE = [
  'One-shots only — no loops or phrases from Splice, only single hits',
  'First result — use the first search result that fits, no browsing further',
  'Monochrome search — search Splice using only one keyword',
  'No preview — download without previewing, use whatever you get',
  'Reversed — every sample from Splice must be reversed before use',
  'Micro-sample — use only the first 0.5 seconds of any Splice sample',
  'Single sample — this entire track must use only one sample from Splice',
  'Wrong genre — search a random different genre on Splice than assigned'
];


// ── MODE-SPECIFIC RELICS ────────────────────────────────

const RELICS_PRODUCTION = [
  {
    id: 'oscillator_core',
    name: 'Oscillator Core',
    tier: 'common',
    description: 'Production rooms: max effect count reduced by 1',
    effectType: 'production_effect_reduction',
    mode: 'production'
  },
  {
    id: 'patch_grimoire',
    name: 'Patch Grimoire',
    tier: 'common',
    description: 'Production rooms: +20% blessing chance',
    effectType: 'production_blessing_boost',
    mode: 'production'
  },
  {
    id: 'circuit_breaker',
    name: 'Circuit Breaker',
    tier: 'rare',
    description: 'Production rooms: block the first curse each floor',
    effectType: 'production_curse_block',
    mode: 'production'
  }
];

const RELICS_SPLICE = [
  {
    id: 'splice_compass',
    name: 'Splice Compass',
    tier: 'common',
    description: 'Splice rooms: genre is always an official Splice genre (not a tag)',
    effectType: 'splice_genre_guarantee',
    mode: 'splice'
  },
  {
    id: 'sample_magnet',
    name: 'Sample Magnet',
    tier: 'common',
    description: 'Splice rooms: +20% blessing chance',
    effectType: 'splice_blessing_boost',
    mode: 'splice'
  },
  {
    id: 'curators_eye',
    name: "Curator's Eye",
    tier: 'rare',
    description: 'Splice rooms: block the first curse each floor',
    effectType: 'splice_curse_block',
    mode: 'splice'
  }
];
