const TRACK_TYPE_DESCRIPTIONS = {
  'Drums': {
    desc: 'The rhythmic backbone of your track. Drums establish the groove, tempo feel, and energy level of the entire production.',
    tips: 'Start with kick and snare placement to define the groove, then layer hi-hats and percussion. Use velocity variation to add human feel.',
    search: 'Search Splice for "drum loop", "drum one-shot", or "breakbeat" filtered by your genre.'
  },
  'Bass': {
    desc: 'The low-frequency foundation that provides harmonic support and rhythmic drive. Bass connects the drums to the melodic elements.',
    tips: 'Keep bass mono below 200Hz for mix clarity. Use sidechain compression against the kick to prevent low-end mud.',
    search: 'Search Splice for "bass one-shot", "bass loop", or "sub bass" filtered by your genre.'
  },
  'Synth Lead': {
    desc: 'A synthesized melodic line that carries the main hook or melody. Leads cut through the mix and grab the listener\'s attention.',
    tips: 'Use automation on filter cutoff and resonance to add movement. Layer with subtle detuning for width.',
    search: 'Search Splice for "synth lead", "lead melody", or "synth hook" filtered by your genre.'
  },
  'Pads': {
    desc: 'Sustained harmonic textures that fill the frequency spectrum and create atmosphere. Pads provide the harmonic bed that other elements sit on top of.',
    tips: 'Use low-pass filtering to keep pads from competing with leads. Automate filter sweeps for evolving texture. Reverb and chorus add lushness.',
    search: 'Search Splice for "pad", "atmosphere", or "texture" filtered by your genre.'
  },
  'Vocals': {
    desc: 'Human voice elements ranging from full sung phrases to chopped vocal textures. Vocals add emotional connection and human character to a track.',
    tips: 'Use EQ to carve space (cut around 200-400Hz for clarity). Compression tames dynamics. De-essing controls harsh sibilance.',
    search: 'Search Splice for "vocal", "acapella", "vocal chop", or "ad-lib" filtered by your genre.'
  },
  'FX / Texture': {
    desc: 'Sound design elements used for transitions, atmosphere, and ear candy. FX add polish and movement between sections of your arrangement.',
    tips: 'Place risers before drops, impacts at section starts, and sweeps during transitions. Automate volume to control intensity.',
    search: 'Search Splice for "riser", "impact", "transition", "sweep", or "atmosphere" filtered by your genre.'
  },
  'Keys / Piano': {
    desc: 'Keyboard instruments including acoustic piano, electric piano, organ, and other key-based sounds. Keys provide harmonic content with natural dynamics.',
    tips: 'Use velocity sensitivity for natural feel. EQ the low-mids (200-500Hz) to prevent muddiness. Compression can even out dynamics.',
    search: 'Search Splice for "piano", "keys", "rhodes", "organ", or "electric piano" filtered by your genre.'
  },
  'Guitar': {
    desc: 'Acoustic or electric string instrument that adds organic texture, harmonic content, or rhythmic strumming patterns to your production.',
    tips: 'Amp sims and cabinet IRs shape the tone dramatically. Use high-pass filter around 80-100Hz to clean up low end.',
    search: 'Search Splice for "guitar riff", "guitar loop", "acoustic strum", or "electric lick" filtered by your genre.'
  },
  'Strings': {
    desc: 'Orchestral string instruments (violin, viola, cello, bass) that add cinematic depth, emotional weight, and lush harmonic texture.',
    tips: 'Layer short (staccato/pizzicato) and long (legato/sustain) articulations for variety. Reverb adds concert hall space.',
    search: 'Search Splice for "strings", "violin", "cello", "orchestral", or "string ensemble" filtered by your genre.'
  },
  'Percussion': {
    desc: 'Non-drum-kit rhythmic elements like shakers, tambourines, congas, and hand drums. Percussion adds groove complexity and cultural flavor.',
    tips: 'Pan percussion elements to create width. Use different velocities and slight timing offsets for groove. Layer sparingly to avoid clutter.',
    search: 'Search Splice for "percussion", "shaker", "conga", "tambourine", or "bongo" filtered by your genre.'
  },
  '808': {
    desc: 'Roland TR-808-style bass drum sounds used as melodic bass elements. The 808 is the foundation of trap, hip hop, and many modern genres.',
    tips: 'Tune your 808 to the track key. Use soft clipping or saturation to add harmonics that translate on small speakers. Sidechain with kick.',
    search: 'Search Splice for "808", "808 bass", "808 slide", or "sub bass" filtered by your genre.'
  },
  'Brass / Woodwinds': {
    desc: 'Wind instruments including trumpets, saxophones, flutes, and clarinets. These add soulful melodies, punchy stabs, and rich harmonic color.',
    tips: 'Use velocity and expression for realistic dynamics. Short stabs work great for rhythmic hooks. Reverb adds natural room sound.',
    search: 'Search Splice for "brass", "trumpet", "saxophone", "flute", or "horn" filtered by your genre.'
  },
  'Arp / Sequence': {
    desc: 'Arpeggiated or sequenced patterns where notes play in a repeating rhythmic cycle. Arps add hypnotic movement and melodic motion to your track.',
    tips: 'Sync arp rate to your tempo. Use filter automation for evolving texture. Gate effects create rhythmic interest. Try different note orders.',
    search: 'Search Splice for "arp", "sequence", "arpeggiated", or "gated pattern" filtered by your genre.'
  },
  'Plucks / Stabs': {
    desc: 'Short, percussive tonal hits with fast attack and quick decay. Plucks and stabs add rhythmic melodic accents and punctuation to your track.',
    tips: 'Layer plucks for thickness. Use reverb to add tail and space. Short delay creates rhythmic complexity. EQ brightness for presence.',
    search: 'Search Splice for "pluck", "stab", "chord stab", or "synth pluck" filtered by your genre.'
  },
  'Mallets / Tuned Perc': {
    desc: 'Pitched percussion instruments like marimba, vibraphone, xylophone, kalimba, and music box. They add delicate melodic sparkle and organic character.',
    tips: 'Mallets sit well with light reverb and gentle compression. Use velocity variation for natural feel. They pair well with pads for texture.',
    search: 'Search Splice for "marimba", "kalimba", "vibraphone", "xylophone", or "music box" filtered by your genre.'
  },
  'World / Ethnic': {
    desc: 'Traditional instruments from diverse global cultures including sitar, kora, oud, erhu, and more. These add unique tonal color and cultural depth.',
    tips: 'Respect the tuning system of the source culture. Layer with modern elements for fusion. EQ to highlight the instrument\'s unique character.',
    search: 'Search Splice for the specific instrument name (e.g., "sitar", "koto", "oud") or "world" filtered by region.'
  },
  'Choir / Ensemble': {
    desc: 'Group vocal performances from cathedral choirs to gospel ensembles to synthesized vocal pads. Choirs add massive harmonic power and emotional weight.',
    tips: 'Use reverb to place the choir in a space. EQ presence around 2-5kHz for clarity. Layer synth choir with real samples for hybrid texture.',
    search: 'Search Splice for "choir", "vocal ensemble", "choir hit", or "choral" filtered by your genre.'
  },
  'Foley / Found Sound': {
    desc: 'Real-world recordings of everyday sounds used as musical elements. Foley adds unique organic texture that no synthesizer can replicate.',
    tips: 'Record with your phone or a field recorder. Process through effects to transform mundane sounds into musical elements. Pitch to key using a tuner.',
    search: 'Search Splice for "foley", "field recording", "found sound", or specific sounds like "water", "metal", "glass".'
  },
  'Ambient / Drone': {
    desc: 'Sustained atmospheric textures and slowly evolving tonal beds. Drones create immersive sonic environments and add depth beneath other elements.',
    tips: 'Use long reverb tails and slow filter sweeps. Granular processing creates evolving textures. Keep levels subtle to support without dominating.',
    search: 'Search Splice for "ambient", "drone", "atmosphere", "texture", or "soundscape".'
  },
  'Vocal Chops': {
    desc: 'Sliced and rearranged vocal fragments used as melodic or rhythmic elements. Vocal chops bring human energy in a synthetic, processed form.',
    tips: 'Chop on zero-crossings to avoid clicks. Pitch-shift chops to create melodies. Use a sampler to play chops chromatically across the keyboard.',
    search: 'Search Splice for "vocal chop", "vocal slice", "chopped vocal", or "vocal hit" filtered by your genre.'
  },
  'Noise / Industrial': {
    desc: 'Harsh, abrasive, or mechanical sounds used as textural elements. Noise adds aggression, tension, and raw industrial character to a production.',
    tips: 'Filter noise to control harshness. Use sidechain to make it pump with the groove. Layer subtly for texture or push loud for aggression.',
    search: 'Search Splice for "noise", "industrial", "harsh", "distorted texture", or "machine" filtered by your genre.'
  },
  'Sampler / Chops': {
    desc: 'Sliced and rearranged fragments from existing recordings, vinyl, or other source material. Sampling is the foundation of hip hop and many electronic genres.',
    tips: 'Use an MPC, SP-404, or DAW sampler to chop. Pitch, stretch, and filter to make samples your own. Always clear samples for commercial release.',
    search: 'Search Splice for "vinyl sample", "chopped", "soul sample", or "vintage loop" filtered by your genre.'
  }
};
