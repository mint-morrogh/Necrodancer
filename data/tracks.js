// ═══════════════════════════════════════════════════════════
// NECRODANCER — Data Configuration
// Edit this file to add/remove genres, curses, effects, etc.
// ═══════════════════════════════════════════════════════════

const KEYS = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
const SCALES = ['Major','Minor'];

// ── OFFICIAL SPLICE GENRES (searchable as genre filters) ──
// Everything in GENRES_BY_TRACK that's NOT in this set is a "tag"
// Easy/Normal pick from genres; Hard/Nightmare pick from tags
const SPLICE_GENRES = new Set([
  // Hip Hop / R&B
  'Hip Hop','Trap','R&B','Pluggnb','Rage','Drill','UK Drill','Lo-Fi Hip Hop','Boom Bap',
  'Brazilian Funk','Soul','Neo Soul','Future Soul','Reggaeton','Dancehall','Jersey Club',
  'Moombahton','Future Bass','Glitch Hop',
  // House / Techno
  'Techno','House','Tech House','Deep House','Nu Disco','Afro House','Amapiano','Disco',
  'Electro','Minimal Techno','Dub Techno','Hard Techno','UK Garage','Speed Garage','Rave',
  'Melodic Techno','French House','Acid House','Bass House','Progressive House','Melodic House',
  'Big Room House','Hardstyle',
  // Pop / EDM
  'Pop','EDM','Indie Pop','Afropop & Afrobeats','Hyperpop','Synth-Pop','K-Pop','Bedroom Pop',
  'Dream Pop','Drift Phonk','Trap EDM','Trance','Psytrance','Eurodance','Future House',
  'Fidget House','Tropical House',
  // Live Sounds
  'Rock','Indie Rock','Indie Dance','Jazz','Blues','Gospel','Heavy Metal','Funk','Dub',
  'Reggae','Afrobeat','Folk','Country','Classical','Shoegaze','Emo','Punk','Post-Punk',
  'Bossa Nova','Cumbia','Salsa','Flamenco','Samba',
  // Bass Music
  'Drum and Bass','Jungle','Jump Up DnB','Drumstep','Breakbeat','Dubstep','Tearout Dubstep',
  'Grime','Leftfield Bass',
  // Electronic
  'Downtempo','Ambient','Synthwave','Chillout','Indie Electronic','Chillwave','IDM',
  'Experimental','Industrial','Chiptune','Trip Hop','Footwork',
  // Global
  'African','Asian','Brazilian','Caribbean','Indian','Latin American','Middle Eastern','South Asian',
  // Cinematic / FX
  'Cinematic','Game Audio'
]);

const TRACK_TYPES = [
  'Drums','Bass','Synth Lead','Pads','Vocals','FX / Texture',
  'Keys / Piano','Guitar','Strings','Percussion','808','Brass / Woodwinds',
  'Arp / Sequence','Plucks / Stabs','Mallets / Tuned Perc',
  'World / Ethnic','Choir / Ensemble','Foley / Found Sound',
  // ── added ──
  'Ambient / Drone','Vocal Chops','Noise / Industrial','Sampler / Chops'
];

// ── GENRES BY TRACK TYPE (Splice-verified) ──────────────
// Only genres where you'd reliably find this sample type

const GENRES_BY_TRACK = {
  'Drums': [
    'Hip Hop','Trap','R&B','Drill','UK Drill','Lo-Fi Hip Hop','Boom Bap',
    'Reggaeton','Dancehall','Jersey Club','Moombahton','Future Bass',
    'Techno','House','Tech House','Deep House','Afro House','Amapiano',
    'Disco','Electro','Minimal Techno','Hard Techno','UK Garage','Speed Garage',
    'Rave','Melodic Techno','French House','Acid House','Bass House',
    'Progressive House','Big Room House','Hardstyle','Pop','EDM',
    'Afropop & Afrobeats','Synth-Pop','K-Pop','Drift Phonk','Trap EDM',
    'Trance','Future House','Rock','Indie Rock','Jazz','Blues','Funk',
    'Reggae','Dub','Punk','Drum and Bass','Jungle','Breakbeat','Dubstep',
    'Grime','Leftfield Bass','Footwork','Trip Hop','Nu Disco',
    'Brazilian Funk','Soul','Indie Dance','Pluggnb','Rage',
    'Cumbia','Salsa','Samba','Afrobeat','Bossa Nova',
    // ── added ──
    'Phonk','Memphis Rap','G-Funk','Cloud Rap','Trap Soul',
    'Melodic House','Dub Techno','Fidget House','Organic House','Afro Tech',
    'Liquid DnB','Neurofunk','Jump Up DnB','Drumstep','Halftime DnB',
    'Riddim','Tearout Dubstep','Melodic Dubstep','Future Garage','Bassline',
    'UK Funky','2-Step','EBM','New Wave','Darkwave','Industrial',
    'Synthwave','Garage Rock','Emo','Post-Punk','Ska','Psychedelic Rock',
    'Heavy Metal','Metalcore','Stoner / Doom','Math Rock','Post-Rock',
    'Gqom','Highlife','Soca','Zouk','Kizomba','Latin Trap',
    'Hyperpop','Wave','Vaporwave','Neo Soul','Future Soul',
    'Indie Pop','Bedroom Pop','Indie Electronic','Country','Folk',
    'Downtempo','IDM','Experimental','Glitch Hop','Chillhop',
    'Gospel','Flamenco','Classical','Psytrance','Eurodance',
    'Tropical House','Chillwave','City Pop'
  ],
  'Bass': [
    'Hip Hop','Trap','R&B','Drill','UK Drill','Boom Bap','Reggaeton',
    'Dancehall','Jersey Club','Future Bass','Techno','House','Tech House',
    'Deep House','Afro House','Amapiano','Disco','Electro','Minimal Techno',
    'Hard Techno','UK Garage','Bass House','Progressive House','Big Room House',
    'Hardstyle','Pop','EDM','Synth-Pop','Trap EDM','Trance','Future House',
    'Dubstep','Drum and Bass','Grime','Leftfield Bass','Funk','Jazz',
    'Reggae','Dub','Rock','Blues','Acid House','Drift Phonk','Trip Hop',
    'Footwork','Lo-Fi Hip Hop','Soul','Nu Disco','Brazilian Funk',
    'Pluggnb','Rage',
    // ── added ──
    'Phonk','Memphis Rap','G-Funk','Cloud Rap','Trap Soul',
    'Melodic Techno','Melodic House','Dub Techno','Fidget House','Organic House',
    'Speed Garage','French House','Liquid DnB','Neurofunk','Jump Up DnB',
    'Drumstep','Halftime DnB','Riddim','Tearout Dubstep','Melodic Dubstep',
    'Future Garage','Bassline','UK Funky','2-Step','Psytrance',
    'EBM','Industrial','Synthwave','Darkwave','Hyperpop',
    'Indie Rock','Punk','Heavy Metal','Stoner / Doom','Ska',
    'Neo Soul','Future Soul','Gospel','Cumbia','Salsa',
    'Afrobeat','Afropop & Afrobeats','Moombahton','Gqom','Latin Trap',
    'K-Pop','Indie Electronic','Chiptune','Wave','Vaporwave',
    'Eurodance','Tropical House','Indie Dance','Breakbeat','Jungle',
    'Rave','Glitch Hop','Country','Downtempo','City Pop'
  ],
  'Synth Lead': [
    'Techno','House','Tech House','Deep House','Electro','Minimal Techno',
    'Hard Techno','Melodic Techno','Acid House','Bass House','Progressive House',
    'Big Room House','Trance','Psytrance','EDM','Synth-Pop','Synthwave',
    'Chiptune','Future Bass','Trap EDM','Future House','Eurodance',
    'Tropical House','Dubstep','Drum and Bass','Leftfield Bass','IDM',
    'Experimental','Pop','K-Pop','Hyperpop','Indie Electronic','Hip Hop',
    'Trap','Drift Phonk','Dream Pop','Hardstyle',
    // ── added ──
    'Melodic House','Dub Techno','Fidget House','Organic House','French House',
    'Speed Garage','Bass House','Rave','Neurofunk','Liquid DnB',
    'Riddim','Melodic Dubstep','Halftime DnB','Future Garage','Bassline',
    'UK Funky','EBM','New Wave','Darkwave','Industrial',
    'Phonk','Vaporwave','Wave','City Pop','Cloud Rap',
    'Grime','Breakbeat','Jungle','Glitch Hop','Footwork',
    'Nu Disco','Disco','Indie Dance','R&B','Lo-Fi Hip Hop',
    'Downtempo','Chillwave','Chillout','Ambient','Trip Hop',
    'Reggaeton','Dancehall','Afro House','Amapiano','Afropop & Afrobeats',
    'Latin Trap','Cumbia','Indie Pop','Bedroom Pop','Post-Punk'
  ],
  'Pads': [
    'Ambient','Downtempo','Chillout','Chillwave','Synthwave','Deep House',
    'Melodic Techno','Melodic House','Progressive House','Trance','Psytrance',
    'IDM','Experimental','Cinematic','Dream Pop','Shoegaze','Trip Hop',
    'Lo-Fi Hip Hop','Indie Electronic','Dub Techno','R&B','Neo Soul',
    'Future Soul','Pop','House','Techno','EDM','Game Audio','Afro House',
    'Tropical House','Dubstep',
    // ── added ──
    'Darkwave','Witch House','Vaporwave','New Wave','EBM','Industrial',
    'Post-Rock','Indie Pop','Bedroom Pop','K-Pop','Synth-Pop',
    'Hip Hop','Trap','Cloud Rap','Drill','Boom Bap',
    'Minimal Techno','Hard Techno','Acid House','Organic House',
    'Liquid DnB','Melodic Dubstep','Halftime DnB','Future Garage',
    'Drum and Bass','Leftfield Bass','Breakbeat',
    'Jazz','Blues','Soul','Gospel','Classical',
    'Funk','Reggae','Dub','Dancehall','Reggaeton',
    'Afropop & Afrobeats','Amapiano','Cumbia',
    'City Pop','Wave','Chillhop','Glitch Hop',
    'Hardstyle','Big Room House','Bass House','Future Bass',
    'Trap EDM','Future House','Eurodance','Rave',
    'Folk','Country','Bossa Nova','Flamenco'
  ],
  'Vocals': [
    'Hip Hop','Trap','R&B','Pop','Soul','Neo Soul','Reggaeton','Dancehall',
    'Gospel','House','Deep House','Tech House','Afro House','UK Garage',
    'Drum and Bass','EDM','K-Pop','Afropop & Afrobeats','Indie Pop',
    'Bedroom Pop','Lo-Fi Hip Hop','Boom Bap','Jazz','Blues','Funk','Rock',
    'Indie Rock','Reggae','Country','Trance','Future Bass','Tropical House',
    'Drill','UK Drill','Jersey Club','Pluggnb','Future Soul',
    // ── added ──
    'Phonk','Memphis Rap','Cloud Rap','Trap Soul','G-Funk',
    'Rage','Brazilian Funk','Dancehall','Moombahton','Latin Trap',
    'Cumbia','Salsa','Samba','Bossa Nova','Flamenco',
    'Synth-Pop','Hyperpop','Dream Pop','Shoegaze','Emo',
    'Punk','Post-Punk','Heavy Metal','Folk','Classical',
    'Speed Garage','2-Step','Bassline','UK Funky','Future Garage',
    'Liquid DnB','Grime','Breakbeat','Jungle','Dubstep',
    'Amapiano','Afrobeat','Highlife','Soca','Zouk','Kizomba',
    'Disco','Nu Disco','French House','Melodic House',
    'Synthwave','Darkwave','New Wave','City Pop','Vaporwave',
    'Bass House','Progressive House','Big Room House','Hardstyle',
    'Psytrance','Eurodance','Downtempo','Chillout','Chillwave',
    'Ambient','Trip Hop','IDM','Experimental',
    'Indie Electronic','Indie Dance','Wave',
    'Footwork','Electro','Melodic Techno',
    'Gqom','Drift Phonk','Chillhop','Glitch Hop'
  ],
  'FX / Texture': [
    'Cinematic','Game Audio','Ambient','Experimental','IDM','Techno',
    'Dubstep','Drum and Bass','Trap','EDM','House','Psytrance','Trance',
    'Industrial','Downtempo','Leftfield Bass','Synthwave','Chillout',
    'Hip Hop','Pop','Drift Phonk','Hard Techno','Rave','Glitch Hop',
    'Breakbeat',
    // ── added ──
    'Minimal Techno','Dub Techno','Melodic Techno','Deep House','Tech House',
    'Bass House','Future House','Progressive House','Big Room House','Hardstyle',
    'Acid House','Electro','Melodic House','Organic House',
    'Darkwave','EBM','Witch House','Vaporwave','New Wave',
    'Neurofunk','Liquid DnB','Riddim','Tearout Dubstep','Melodic Dubstep',
    'Halftime DnB','Jump Up DnB','Drumstep','Jungle','Future Garage',
    'Grime','Bassline','Footwork','UK Funky',
    'Dream Pop','Shoegaze','Post-Rock','Indie Electronic',
    'Lo-Fi Hip Hop','Cloud Rap','Phonk','Wave',
    'Future Bass','Trap EDM','Eurodance','Chillwave',
    'Hyperpop','Chiptune','Trip Hop',
    'R&B','K-Pop','Synth-Pop',
    'Afro House','Amapiano','Reggaeton','Dancehall',
    'Classical','Jazz','Funk','Reggae','Dub'
  ],
  'Keys / Piano': [
    'Jazz','Blues','Gospel','Soul','Neo Soul','R&B','Pop','Lo-Fi Hip Hop',
    'Boom Bap','Hip Hop','House','Deep House','Indie Pop','Bedroom Pop',
    'Bossa Nova','Funk','Country','Cinematic','Downtempo','Chillout',
    'Rock','K-Pop','Afropop & Afrobeats','Reggae','Classical','Future Soul',
    // ── added ──
    'Trap','Drill','Pluggnb','Cloud Rap','Trap Soul','G-Funk',
    'Dancehall','Reggaeton','Latin Trap','Cumbia','Salsa',
    'Tech House','Afro House','Amapiano','Melodic House','Organic House',
    'Melodic Techno','Progressive House','Trance','Future Bass',
    'Tropical House','EDM','Dream Pop','Indie Rock',
    'Synth-Pop','Synthwave','City Pop','Vaporwave','New Wave',
    'Disco','Nu Disco','French House',
    'Ambient','Trip Hop','Indie Electronic','Chillwave','Chillhop',
    'Liquid DnB','Future Garage','UK Garage','2-Step',
    'Indie Dance','Drum and Bass','Breakbeat',
    'Folk','Emo','Post-Rock','Shoegaze',
    'Afrobeat','Highlife','Soca','Flamenco',
    'Game Audio','Experimental','IDM'
  ],
  'Guitar': [
    'Rock','Indie Rock','Blues','Jazz','Funk','Country','Folk','Reggae',
    'Dub','Flamenco','Bossa Nova','Pop','Indie Pop','Bedroom Pop',
    'Lo-Fi Hip Hop','Emo','Punk','Post-Punk','Shoegaze','Heavy Metal',
    'Cumbia','Afrobeat','Gospel','Soul','Hip Hop','R&B','Classical',
    // ── added ──
    'Garage Rock','Psychedelic Rock','Stoner / Doom','Math Rock','Post-Rock',
    'Metalcore','Ska','Grunge','Progressive Rock','Noise Rock',
    'Dream Pop','Indie Electronic','Chillwave','Synthwave','City Pop',
    'Trap','Boom Bap','Neo Soul','Trip Hop','Downtempo',
    'K-Pop','Synth-Pop','Hyperpop','New Wave','Darkwave',
    'Disco','Nu Disco','Indie Dance','Dancehall','Reggaeton',
    'Afropop & Afrobeats','Highlife','Soca','Salsa',
    'Ambient','Cinematic','Game Audio','Experimental',
    'House','Deep House','Chillout','Tropical House',
    'Vaporwave','Drift Phonk','Latin Trap',
    'Drum and Bass','Breakbeat','Dubstep','Grime',
    'Liquid DnB','Future Garage','UK Garage'
  ],
  'Strings': [
    'Classical','Cinematic','Ambient','Pop','R&B','Hip Hop','Downtempo',
    'Trance','EDM','Dream Pop','Jazz','Soul','Game Audio','Trap',
    'Lo-Fi Hip Hop','Synthwave','Indie Pop','Afrobeat',
    // ── added ──
    'Drill','UK Drill','Boom Bap','Cloud Rap','Trap Soul',
    'K-Pop','Synth-Pop','Bedroom Pop','Indie Rock','Post-Rock',
    'Shoegaze','Emo','Folk','Country','Classical',
    'House','Deep House','Melodic House','Melodic Techno','Progressive House',
    'Techno','Minimal Techno','Psytrance','Big Room House','Hardstyle',
    'Dubstep','Melodic Dubstep','Drum and Bass','Liquid DnB','Halftime DnB',
    'Future Bass','Tropical House','Future House','Chillout','Chillwave',
    'Trip Hop','IDM','Experimental','Indie Electronic',
    'Neo Soul','Future Soul','Gospel','Blues','Funk',
    'Reggae','Dub','Dancehall','Reggaeton','Cumbia',
    'Salsa','Bossa Nova','Flamenco','Afropop & Afrobeats',
    'Amapiano','Afro House','Darkwave','New Wave','City Pop',
    'Vaporwave','Wave','Grime','Breakbeat',
    'Disco','Nu Disco','Eurodance','Latin Trap',
    'Plug gnb','Rage','Drift Phonk','Phonk'
  ],
  'Percussion': [
    'Reggaeton','Dancehall','Afro House','Amapiano','Afropop & Afrobeats',
    'Afrobeat','Cumbia','Salsa','Samba','Bossa Nova','Flamenco',
    'Hip Hop','Trap','House','Techno','Jazz','Funk','Reggae','Dub',
    'Pop','EDM','Drum and Bass','Moombahton','Brazilian Funk',
    'Jersey Club','Latin American','Caribbean','African','Brazilian',
    'Indian','Middle Eastern','South Asian',
    // ── added ──
    'Gqom','Highlife','Soca','Zouk','Kizomba','Kuduro',
    'Calypso','Champeta','Soukous','Mbalax',
    'Bhangra','Bollywood','Gamelan','Taiko',
    'R&B','Neo Soul','Soul','Gospel','Blues',
    'Lo-Fi Hip Hop','Boom Bap','Drill','UK Drill',
    'Deep House','Tech House','Afro Tech','Organic House',
    'Minimal Techno','Acid House','UK Garage','Speed Garage',
    'Breakbeat','Jungle','Footwork','Glitch Hop',
    'Experimental','IDM','Ambient','Downtempo','Trip Hop',
    'Rock','Indie Rock','Punk','Ska','Psychedelic Rock',
    'K-Pop','Indie Pop','Bedroom Pop',
    'Latin Trap','Phonk','Synthwave','Country','Folk',
    'Future Bass','Tropical House','Electro','Disco','Nu Disco',
    'Pluggnb','Rage','Dancehall','Eurodance',
    'Classical','Cinematic','Game Audio','Indie Electronic',
    'Trance','Psytrance','Rave','Hardstyle','EBM'
  ],
  '808': [
    'Hip Hop','Trap','Drill','UK Drill','Rage','Pluggnb','R&B',
    'Lo-Fi Hip Hop','Boom Bap','Reggaeton','Dancehall','Jersey Club',
    'Brazilian Funk','Drift Phonk','Afro House','Amapiano','Pop','K-Pop',
    'Afropop & Afrobeats','Grime','Footwork','Trap EDM','Future Bass',
    'Bass House','Dubstep',
    // ── added ──
    'Phonk','Memphis Rap','G-Funk','Cloud Rap','Trap Soul',
    'Latin Trap','Moombahton','Cumbia','Reggaeton',
    'Gqom','Highlife','Soca',
    'Drum and Bass','Neurofunk','Riddim','Tearout Dubstep',
    'Jungle','Breakbeat','Halftime DnB',
    'House','Tech House','Deep House','UK Garage','Speed Garage',
    'Bassline','UK Funky','2-Step','Future Garage',
    'EDM','Big Room House','Hardstyle','Future House',
    'Synth-Pop','Hyperpop','Wave','Vaporwave',
    'Indie Electronic','Experimental','Glitch Hop',
    'Leftfield Bass','Electro','Rave',
    'Neo Soul','Future Soul','Soul','Funk',
    'Rock','Indie Rock','Emo','Punk',
    'Trance','Psytrance','Eurodance'
  ],
  'Brass / Woodwinds': [
    'Jazz','Funk','Soul','Gospel','Hip Hop','R&B','Boom Bap','Salsa',
    'Cumbia','Reggaeton','Afrobeat','Afropop & Afrobeats','Cinematic',
    'Pop','Disco','Nu Disco','House','Deep House','Latin American',
    'Classical',
    // ── added ──
    'Trap','Drill','Lo-Fi Hip Hop','Neo Soul','Future Soul','Blues',
    'Reggae','Dub','Dancehall','Samba','Bossa Nova','Flamenco',
    'Soca','Calypso','Highlife','Soukous','Mbalax',
    'K-Pop','Synth-Pop','Indie Pop','Bedroom Pop',
    'Amapiano','Afro House','Afro Tech','Organic House',
    'Tech House','UK Garage','Melodic House',
    'Rock','Indie Rock','Ska','Punk','Psychedelic Rock',
    'Moombahton','Brazilian Funk','Latin Trap',
    'EDM','Big Room House','Future Bass','Tropical House',
    'Trip Hop','Downtempo','Ambient','Experimental',
    'Drum and Bass','Breakbeat','Jungle','Liquid DnB',
    'Country','Folk','City Pop','Game Audio',
    'Indie Electronic','Indie Dance','Chillout',
    'Electro','French House','Eurodance',
    'Pluggnb','Drift Phonk','Phonk','Vaporwave'
  ],

  // ── NEW TRACK TYPES ───────────────────────────────────

  'Arp / Sequence': [
    'Techno','House','Tech House','Deep House','Trance','Psytrance',
    'Melodic Techno','Melodic House','Progressive House','EDM','Synthwave',
    'Eurodance','Electro','Acid House','Minimal Techno','Dub Techno',
    'Future Bass','Synth-Pop','Chiptune','IDM','Ambient','Downtempo',
    'Lo-Fi Hip Hop','Trap','Hip Hop','Pop','K-Pop','Indie Electronic',
    'Dream Pop','New Wave','Darkwave','EBM','Hardstyle','Drum and Bass',
    'Neurofunk','Liquid DnB','Dubstep','Riddim','Bass House','Future House',
    'Big Room House','Nu Disco','Disco','Tropical House','Hyperpop',
    'Experimental','Industrial','Chillwave','Chillout','Fidget House',
    'Hard Techno','Rave','French House','Organic House','Speed Garage',
    'UK Garage','Afro House','Amapiano','Breakbeat','Glitch Hop',
    'Footwork','Halftime DnB','Wave','Vaporwave','City Pop',
    'Trip Hop','Indie Pop','Bedroom Pop','Indie Dance',
    'R&B','Neo Soul','Dancehall','Reggaeton','Latin Trap',
    'Drift Phonk','Phonk','Cloud Rap','Trap EDM','Melodic Dubstep',
    'Future Garage','Bassline','2-Step','Post-Punk','Shoegaze',
    'Afropop & Afrobeats','Cumbia','Bossa Nova','Jazz','Funk'
  ],
  'Plucks / Stabs': [
    'Tropical House','Future Bass','EDM','Pop','K-Pop','Trap','Hip Hop',
    'Dancehall','Reggaeton','House','Deep House','Tech House',
    'Progressive House','Trance','Melodic Techno','Melodic House',
    'Drum and Bass','Liquid DnB','UK Garage','Jersey Club','Afro House',
    'Amapiano','Synth-Pop','Chillout','Downtempo','Lo-Fi Hip Hop',
    'Indie Electronic','Future House','Bass House','Big Room House','Hardstyle',
    'R&B','Dubstep','Melodic Dubstep','Dream Pop','Chillwave','Disco',
    'Nu Disco','Electro','Synthwave','Psytrance','Indie Pop','Bedroom Pop',
    'Eurodance','Breakbeat','Footwork','Ambient','Hyperpop','Fidget House',
    'Minimal Techno','Acid House','Speed Garage','French House','Organic House',
    'Neurofunk','Halftime DnB','Future Garage','Bassline','2-Step',
    'Trap EDM','Rave','Glitch Hop','Wave','City Pop','Vaporwave',
    'Dancehall','Reggaeton','Afropop & Afrobeats','Cumbia','Latin Trap',
    'Indie Dance','Chillhop','Trip Hop','IDM','Experimental',
    'Drill','UK Drill','Pluggnb','Cloud Rap','Phonk',
    'Neo Soul','Jazz','Funk','Soul','Bossa Nova'
  ],
  'Mallets / Tuned Perc': [
    'Jazz','Ambient','Downtempo','Lo-Fi Hip Hop','Chillout','Indie Pop',
    'Dream Pop','Cinematic','Game Audio','Pop','Bossa Nova','Afrobeat',
    'Afropop & Afrobeats','Reggae','Dub','Experimental','IDM','Classical',
    'Funk','Soul','Trip Hop','R&B','Neo Soul','Bedroom Pop',
    'Indie Electronic','Hip Hop','Boom Bap','House','Deep House','Amapiano',
    'K-Pop','Chillwave','Synthwave','Folk','Indie Rock','Indie Dance',
    'Tropical House','Future Bass','Minimal Techno','Organic House',
    'Melodic House','Melodic Techno','Afro House','Dancehall','Reggaeton',
    'Cumbia','Salsa','Samba','Flamenco','Latin American',
    'Caribbean','African','Indian','South Asian','Middle Eastern',
    'Highlife','Soca','Calypso','City Pop','Vaporwave',
    'Chillhop','Glitch Hop','Breakbeat','Footwork',
    'Trap','Cloud Rap','Lo-Fi Hip Hop','Blues','Gospel',
    'Downtempo','Psytrance','Trance','EDM'
  ],
  'World / Ethnic': [
    'Afrobeat','Afropop & Afrobeats','Afro House','Amapiano','Afro Tech',
    'Reggaeton','Dancehall','Cumbia','Salsa','Samba','Bossa Nova','Flamenco',
    'Reggae','Dub','Hip Hop','Pop','Cinematic','Game Audio','Ambient',
    'Downtempo','Trip Hop','Jazz','Funk','House','Deep House',
    'Experimental','Folk','Classical','Brazilian Funk','Gqom','Highlife',
    'Soca','Zouk','Kizomba','Kuduro','Calypso','Champeta','Soukous',
    'Mbalax','Bhangra','Bollywood',
    'Latin Trap','Latin American','Caribbean','African','Asian',
    'Brazilian','Indian','South Asian','Middle Eastern',
    'Organic House','Melodic House','Minimal Techno','Techno',
    'Breakbeat','Drum and Bass','Dubstep','IDM',
    'Lo-Fi Hip Hop','Boom Bap','Trap','R&B','Neo Soul','Soul','Gospel',
    'K-Pop','Indie Pop','Bedroom Pop','Dream Pop',
    'Chillout','Chillwave','Synthwave','City Pop',
    'EDM','Trance','Psytrance','Rock','Indie Rock',
    'Country','Blues','Disco','Nu Disco',
    'Moombahton','Jersey Club','Footwork','Glitch Hop',
    'Indie Electronic','Indie Dance','Electroclash'
  ],
  'Choir / Ensemble': [
    'Gospel','Cinematic','Game Audio','Classical','Pop','R&B','Soul',
    'Ambient','Downtempo','Trance','EDM','Afropop & Afrobeats','Hip Hop',
    'Trap','Drill','House','Deep House','Afro House','Dream Pop','Shoegaze',
    'Indie Pop','K-Pop','Darkwave','Synthwave','Experimental','Trip Hop',
    'Dubstep','Drum and Bass','Rock','Heavy Metal','Metalcore','Indie Rock',
    'Lo-Fi Hip Hop','Neo Soul','Future Soul','Reggae','Dancehall',
    'Psytrance','Big Room House','Hardstyle','Emo','Post-Rock','Folk',
    'Blues','Funk','Jazz','Country','Reggaeton',
    'Afrobeat','Highlife','Soca','Cumbia','Salsa',
    'Melodic Techno','Melodic House','Progressive House',
    'Future Bass','Tropical House','Melodic Dubstep',
    'Halftime DnB','Liquid DnB','Future Garage',
    'Witch House','Wave','Vaporwave','New Wave','EBM','Industrial',
    'Breakbeat','Jungle','Leftfield Bass','Grime',
    'Boom Bap','Cloud Rap','Pluggnb','Rage','Phonk',
    'Bedroom Pop','Indie Electronic','Chillwave','Chillout',
    'IDM','Glitch Hop','Synth-Pop','Hyperpop',
    'Bossa Nova','Flamenco','Classical',
    'Eurodance','Disco','Nu Disco','Electro',
    'UK Garage','Bassline','Techno','Minimal Techno'
  ],
  'Foley / Found Sound': [
    'Cinematic','Game Audio','Experimental','IDM','Ambient','Downtempo',
    'Hip Hop','Lo-Fi Hip Hop','Trip Hop','Glitch Hop','Industrial',
    'Techno','Minimal Techno','Leftfield Bass','Drum and Bass','Breakbeat',
    'Pop','Indie Electronic','Chillout','Footwork','Electro','Post-Punk',
    'Vaporwave','Chiptune','Indie Pop','Bedroom Pop',
    'Trap','Boom Bap','Cloud Rap','Phonk',
    'House','Deep House','Tech House','Dub Techno','Organic House',
    'Acid House','Hard Techno','Rave','Melodic Techno',
    'Dubstep','Riddim','Halftime DnB','Neurofunk','Jungle',
    'Grime','Bassline','UK Funky','Future Garage',
    'Darkwave','Witch House','EBM','New Wave','Noise Rock',
    'Post-Rock','Shoegaze','Dream Pop','Math Rock',
    'Synthwave','Wave','Hyperpop',
    'Jazz','Blues','Funk','Reggae','Dub',
    'Afrobeat','Cumbia','Dancehall',
    'K-Pop','Synth-Pop','Indie Dance',
    'Chillwave','Chillhop','Psytrance','Trance',
    'Classical','Folk','Country'
  ],

  // ── ADDED TRACK TYPES ──────────────────────────────────

  'Ambient / Drone': [
    'Ambient','Dark Ambient','Drone','Sound Design','Experimental','Electronica',
    'Shoegaze','Post-Rock','Dream Pop','New Age','Synthwave','Downtempo',
    'Dub Techno','Organic House','Chillwave','IDM','Noise','Darkwave',
    'Witch House','Vaporwave','Classical','Minimalism','Film Score','Lo-Fi'
  ],
  'Vocal Chops': [
    'Future Bass','Tropical House','Deep House','Pop','R&B','Hip Hop',
    'Trap','Cloud Rap','UK Garage','House','Tech House','EDM','Trance',
    'Drum and Bass','Dubstep','Dancehall','Afrobeat','K-Pop','Disco',
    'Nu-Disco','Funk','Gospel','Soul','Lo-Fi Hip Hop','Phonk','Jersey Club'
  ],
  'Noise / Industrial': [
    'Industrial','Noise','EBM','Dark Ambient','Witch House','Darkwave',
    'Hard Techno','Rave','Gabber','Harsh Noise Wall','Power Electronics',
    'Experimental','Post-Punk','Grime','Riddim','Neurofunk','Phonk',
    'Noise Rock','Drone','Sound Design','Breakcore','Cyberpunk'
  ],
  'Sampler / Chops': [
    'Boom Bap','Lo-Fi Hip Hop','Jazz Rap','Soul','Funk','R&B',
    'Disco','House','Deep House','UK Garage','Jungle','Breakbeat',
    'Vaporwave','Plunderphonics','Trip Hop','Downtempo','Chillhop',
    'Afrobeat','Reggae','Dub','Future Bass','Neo-Soul','Gospel',
    'Classic Rock','Motown','Bollywood','Library Music'
  ]
};

// ── SAMPLE TYPES PER TRACK ─────────────────────────────
// What to search for on Splice

const SAMPLE_TYPES = {
  'Drums': [
    'kick one-shot','snare one-shot','hi-hat loop','clap sample','drum loop',
    'breakbeat','top loop','cymbal crash','tom hit','rim shot','fill',
    'ghost note pattern','brush kit loop','percussion break',
    // ── added ──
    'open hi-hat hit','closed hi-hat hit','ride cymbal loop','shaker top loop',
    'drum groove','vinyl drum break','processed kick','layered snare',
    'electronic snare','acoustic snare','snap hit','finger snap',
    'hand clap pattern','cross-stick hit','snare roll','hi-hat roll',
    'cymbal swell','kick with tail','lo-fi drum loop','glitch drum loop',
    'half-time groove','double-time groove','shuffle groove','linear drum pattern',
    'trap hi-hat pattern','drill slide hi-hat','boom bap break',
    'four-on-the-floor loop','breakbeat chop','drum intro fill'
  ],
  'Bass': [
    'bass one-shot','bass loop','sub bass hit','bass stab','bass pluck',
    'acid bass loop','bass drone','bass slide sample','reese bass one-shot',
    // ── added ──
    'bass growl','bass chord','bass arp','bass sequence','finger bass loop',
    'slap bass hit','upright bass phrase','synth bass stab','bass drop',
    'bass glide','bass wobble loop','bass riff','muted bass hit',
    'distorted bass loop','clean bass one-shot','bass melody loop',
    'sub bass drone','bass pulse','detuned bass hit','FM bass one-shot',
    'wavetable bass','neuro bass one-shot','bass reese loop','bass snarl'
  ],
  'Synth Lead': [
    'synth lead one-shot','synth loop','lead stab','arp loop','synth melody',
    'acid line','chip lead','supersaw stab','FM pluck','lead riff',
    // ── added ──
    'portamento lead','detuned lead loop','unison lead','mono synth line',
    'poly lead loop','filtered lead','distorted lead','clean lead melody',
    'lead hook','synth whistle','screech lead','hoover lead',
    'square lead','saw lead loop','wavetable lead','granular lead',
    'pitch-bent lead','synth solo phrase','lead answer phrase',
    'synth trill','lead swell','staccato synth lead'
  ],
  'Pads': [
    'pad one-shot','pad loop','atmosphere','texture','drone','evolving pad',
    'vocal pad','granular texture','ambient wash','shimmer pad',
    // ── added ──
    'analog pad','digital pad','choir pad','string pad','noise pad',
    'filtered pad','warm pad','dark pad','bright pad','moving pad',
    'swelling pad','pulsing pad','detuned pad','bitcrushed pad',
    'reverse pad','stereo pad','pad chord','pad sustain','pad stab',
    'hybrid pad','lo-fi pad','tape pad','formant pad','spectral pad'
  ],
  'Vocals': [
    'vocal chop','vocal loop','ad-lib','vocal phrase','choir hit',
    'vocal texture','spoken word clip','vocal riff','harmony stack','vocal FX',
    // ── added ──
    'acapella','vocal stack','vocal harmony loop','vocal run','vocal scratch',
    'throat singing','falsetto phrase','whistle tone','vocal drone','vocal stab',
    'vocal one-shot','vocal melody','vocal hook','vocal adlib one-shot',
    'vocal shout','vocal whisper','vocal scream','female vocal phrase',
    'male vocal phrase','vocal sample pack','vocal breath','vocal hum',
    'vocal chant','processed vocal loop','pitched vocal chop',
    'vocal topline','vocal counter-melody','vocal verse','vocal chorus hook'
  ],
  'FX / Texture': [
    'riser','sweep','impact','transition FX','atmosphere','foley recording',
    'noise texture','glitch FX','reverse hit','downlifter','stinger','whoosh',
    // ── added ──
    'white noise sweep','vinyl noise','tape hiss','radio static','feedback',
    'oscillator sweep','sub drop','reverse crash','laser zap','siren',
    'build-up loop','tension riser','reverse reverb tail','granular texture',
    'processed field recording','digital artifact','bit-crushed texture',
    'drone loop','ambient bed','noise burst','filtered sweep',
    'pitch riser','pitch downer','stuttered FX','metallic hit',
    'cinematic boom','trailer hit','sci-fi texture','horror ambience'
  ],
  'Keys / Piano': [
    'piano chord hit','piano loop','keys stab','organ riff','rhodes loop',
    'wurlitzer phrase','clavinet hit','electric piano chord','piano melody',
    'broken chord pattern',
    // ── added ──
    'upright piano loop','grand piano one-shot','rhodes chord stab',
    'wurlitzer loop','organ swell','organ stab','harpsichord loop',
    'celeste melody','toy piano phrase','honky-tonk loop',
    'mellotron keys','piano arp','piano run','piano fill',
    'electric piano melody','hammond organ riff','gospel keys loop',
    'jazz piano phrase','classical piano excerpt','lo-fi piano loop',
    'detuned piano hit','prepared piano one-shot','piano sustain pedal loop'
  ],
  'Guitar': [
    'guitar riff','guitar chord stab','guitar loop','acoustic strum',
    'electric lick','clean arp','distorted riff','slide guitar phrase',
    'fingerpick pattern','power chord hit',
    // ── added ──
    'palm mute loop','harmonic hit','guitar bend','whammy bar dive',
    'tremolo picking loop','arpeggiated chord loop','funk strum',
    'chicken picking riff','nylon guitar phrase','12-string strum',
    'baritone guitar riff','e-bow drone','guitar feedback',
    'clean chord loop','crunch rhythm loop','high-gain riff',
    'guitar solo phrase','blues lick','jazz chord voicing',
    'guitar chop','muted strum pattern','guitar one-shot hit',
    'ambient guitar texture','reverse guitar swell','guitar harmonic loop'
  ],
  'Strings': [
    'string stab','string loop','pizzicato hit','orchestral swell',
    'solo violin phrase','cello drone','tremolo strings','spiccato pattern',
    'string pad','chamber ensemble loop',
    // ── added ──
    'legato string phrase','staccato string hit','arco sustain loop',
    'col legno hit','string harmonic','double stop phrase','violin trill',
    'cello melody','viola phrase','contrabass drone',
    'string section swell','string run','orchestral hit',
    'string tremolo loop','sul ponticello texture','string glissando',
    'plucked string loop','synth string pad','hybrid string texture',
    'ethnic string phrase','string crescendo','string diminuendo',
    'string ostinato loop','solo string one-shot'
  ],
  'Percussion': [
    'shaker loop','tambourine hit','conga pattern','bongo loop','djembe hit',
    'cowbell','timbale roll','woodblock','triangle','agogo bells','cabasa loop',
    // ── added ──
    'clave pattern','guiro loop','cajon loop','surdo hit','repinique pattern',
    'cuica hit','berimbau loop','rain stick','ocean drum texture',
    'talking drum phrase','shekere loop','udu drum hit','frame drum loop',
    'darbuka pattern','riq loop','daf hit','tabla loop','dholak pattern',
    'pandeiro loop','ganza shaker','claves one-shot','timpani hit',
    'gong hit','finger cymbal','bell tree','mark tree',
    'vibraslap','guiro scrape','castanets','maracas loop',
    'djembe solo phrase','taiko hit','bata drum pattern'
  ],
  '808': [
    '808 kick','808 bass note','808 slide','distorted 808','clean 808 sub',
    'pitched 808 melody','808 roll pattern','boomy 808','clipped 808',
    // ── added ──
    'TR-808 kick one-shot','808 long tail','808 short punch','808 pattern loop',
    'saturated 808','lo-fi 808','808 glide loop','layered 808',
    '808 with click attack','808 sub drop','808 stab','808 chord',
    'pitched 808 loop','808 arp pattern','808 one-shot tuned',
    '808 with distortion','808 with chorus','warm 808 sub'
  ],
  'Brass / Woodwinds': [
    'trumpet stab','saxophone riff','trombone hit','flute melody',
    'brass ensemble stab','clarinet phrase','horn swell','brass loop',
    'woodwind texture','pan flute',
    // ── added ──
    'trumpet lick','sax solo phrase','trombone gliss','flute trill',
    'oboe melody','bassoon phrase','brass hit','horn stab','sax riff',
    'muted trumpet phrase','brass section loop','woodwind ensemble loop',
    'french horn swell','piccolo trill','bass clarinet drone',
    'soprano sax melody','baritone sax riff','tuba hit',
    'harmonica riff','harmonica chord','recorder phrase',
    'didgeridoo drone','shakuhachi melody','ney flute phrase',
    'brass fanfare','brass crescendo','woodwind run'
  ],

  // ── NEW TRACK TYPES ───────────────────────────────────

  'Arp / Sequence': [
    'arp loop','sequenced pattern','synth arp one-shot','gated sequence',
    'rhythmic arp','melodic sequence','evolving arp','random arp pattern',
    'chord arp','mono arp','poly arp loop','filtered sequence',
    'staccato sequence','legato arp','acid sequence loop','trance arp',
    'pluck arp','pad arp','bass arp sequence','lead arp loop',
    'modular sequence','generative pattern','step sequence loop',
    'synced arp','free-running arp','arp one-shot phrase'
  ],
  'Plucks / Stabs': [
    'synth pluck','chord stab','single pluck hit','pluck melody loop',
    'brass stab','organ stab','synth stab','filtered pluck',
    'detuned stab','stab loop','pitched pluck one-shot','muted pluck',
    'bright pluck','dark pluck','glassy pluck','metallic pluck',
    'warm stab','aggressive stab','soft pluck','pluck chord',
    'stab hit','rhythmic stab loop','pluck arp','layered stab',
    'vintage stab','modern pluck','FM pluck one-shot','analog pluck'
  ],
  'Mallets / Tuned Perc': [
    'marimba loop','vibraphone hit','xylophone melody','glockenspiel pattern',
    'kalimba loop','steel drum hit','celesta phrase','tubular bells hit',
    'music box melody','balafon loop','mallet roll','dampened mallet hit',
    'bowed vibraphone','mallet arp','marimba one-shot','vibraphone chord',
    'xylophone one-shot','glockenspiel one-shot','kalimba one-shot',
    'steel pan melody','crotales hit','chime bar','bell plate hit',
    'tongue drum loop','hang drum phrase','mbira loop','thumb piano melody'
  ],
  'World / Ethnic': [
    'sitar phrase','koto loop','oud melody','erhu phrase','tabla pattern',
    'kalimba loop','didgeridoo drone','shakuhachi melody','balalaika strum',
    'bouzouki loop','guzheng arp','banjo loop','ney flute melody',
    'berimbau pattern','mbira loop','steelpan melody','charango strum',
    'dholak pattern','gamelan loop','hang drum hit','tanpura drone',
    'pipa phrase','shamisen riff','santoor melody','sarangi phrase',
    'kora loop','ngoni riff','nyatiti pattern','tin whistle melody',
    'uilleann pipes phrase','bodhr\u00e1n loop','djembe solo','talking drum phrase',
    'darbuka solo','frame drum loop','saz/ba\u011flama strum','rebab phrase',
    'angklung pattern','khim melody','dan tranh arp','cuatro strum'
  ],
  'Choir / Ensemble': [
    'choir hit','choir loop','vocal ensemble','choral pad','choir swell',
    'group chant','gospel choir phrase','soprano section loop',
    'alto section loop','tenor section loop','bass section loop',
    'children\'s choir','throat singing group','cathedral choir recording',
    'choir staccato','choir sustain','mixed choir loop','choir aahs',
    'choir oohs','choral crescendo','gregorian chant','tribal vocal ensemble',
    'processed choir loop','dark choir hit','epic choir swell',
    'whispered ensemble','choir texture','choir one-shot','choral drone'
  ],
  'Foley / Found Sound': [
    'foley hit','found sound loop','texture recording','impact sound',
    'environmental ambience','percussive foley','rhythmic found sound',
    'organic noise sample','found sound one-shot','field recording loop',
    'textural foley layer','found sound percussion','ambient recording',
    'foley texture','recorded sound effect','natural sound sample'
  ],

  // ── ADDED TRACK TYPES ──────────────────────────────────

  'Ambient / Drone': [
    'ambient pad','drone loop','atmospheric texture','evolving soundscape',
    'ambient wash','dark drone','noise swell','wind texture','ocean ambience',
    'sine drone','granular texture','tape hiss loop','bowed metal drone',
    'tibetan bowl sustain','harmonic drone','sub drone','spectral pad',
    'frozen reverb tail','feedback loop recording','room tone',
    'generative texture','processed field recording','synth atmosphere',
    'cosmic background','slow evolving tone','shimmer drone','organ sustain',
    'analog warmth texture','detuned oscillator bed','pitched noise loop'
  ],
  'Vocal Chops': [
    'vocal chop','chopped vocal loop','vocal stab','vocal phrase chop',
    'pitched vocal hit','vocal slice','processed vocal loop','vocal riff',
    'vocal stutter','vocal build','vocal drop','glitched vocal',
    'reversed vocal chop','vocal melody chop','vocal one-shot','vocal riser',
    'female vocal chop','male vocal chop','vocal ad-lib chop','vocal hook',
    'vocal aahs chop','vocal oohs chop','rhythmic vocal cut',
    'formant shifted vocal','vocal granular slice','chopped harmony stack',
    'pitched down vocal','pitched up vocal','vocal trance chop','vocal fx hit'
  ],
  'Noise / Industrial': [
    'noise hit','industrial loop','metal clang','distorted texture',
    'harsh noise burst','machine rhythm','factory recording','power tool loop',
    'feedback screech','static burst','electrical hum','hydraulic hiss',
    'grinding loop','welding arc','pneumatic drill','steam release',
    'conveyor belt rhythm','alarm tone','siren loop','engine drone',
    'digital noise','glitch burst','circuit bent sound','broken speaker',
    'contact microphone recording','electromagnetic field recording',
    'amplifier feedback','transformer hum','modular noise patch',
    'distorted kick','industrial clap','noise riser','harsh texture loop'
  ],
  'Sampler / Chops': [
    'vinyl sample','chopped break','soul sample chop','funk loop chop',
    'jazz sample','record scratch','vinyl crackle loop','sampled melody',
    'chopped horn stab','piano sample chop','guitar riff chop',
    'orchestral sample','reggae sample chop','disco loop chop',
    'bollywood sample','library music loop','film dialogue sample',
    'old school hip hop sample','dusty record loop','lo-fi sample chop',
    'MPC chop','SP-404 texture','chopped vocal phrase','bass riff chop',
    'trumpet sample','flute sample chop','synth stab sample',
    'vintage drum machine loop','cassette recording','radio broadcast sample'
  ]
};

// ── TRACK FLAVOR (base direction — NOT a curse) ────────
// Just tells you what kind of sound to look for

const TRACK_FLAVOR = {
  'Drums': { label: 'Kit Type', options: [
    'Acoustic Kit (real recorded drums — kicks, snares, hats, cymbals)',
    'Electronic Kit (synthesized drum hits — 909, Linndrum, digital)',
    'Hybrid Kit (mix acoustic shells with electronic layers on each hit)',
    'Lo-Fi Kit (dusty, degraded, vinyl-crackle drums — tape-saturated)',
    'Processed/Glitch Kit (heavily mangled — stutter, stretch, granular hits)',
    'Vintage Drum Machine (classic hardware — 808, 606, LM-1, CR-78)',
    'Breakbeat Kit (chopped from classic breaks — Amen, Think, Funky Drummer)',
    'World Percussion Kit (djembe, tabla, congas, frame drums as your kit pieces)',
    'Foley Kit (non-instrument sounds as drums — slaps, clicks, drops, objects)',
    'Layered Kit (every single hit must be 2+ samples stacked together)'
  ]},
  'Bass': { label: 'Bass Style', options: [
    'Sub bass (pure low-end below 100Hz — felt more than heard)',
    'Synth bass (saw-wave based — bright, cutting, Moog-style)',
    'Acid bass (303-style — squelchy resonant filter, glide between notes)',
    'Reese bass (detuned unison oscillators — thick, swirling, dark)',
    'FM bass (frequency modulation — metallic, complex, punchy harmonics)',
    'Plucked/staccato bass (short decay — tight rhythmic plucks)',
    'Walking bass line (melodic movement — jazz/funk style, note-to-note motion)',
    'Wobble bass (LFO-modulated filter — dubstep/bass music style)',
    'Distorted/growl bass (heavy saturation — aggressive mid-range growl)',
    'Clean electric bass (DI or amp sim — natural finger/pick tone)'
  ]},
  'Synth Lead': { label: 'Synth Type', options: [
    'Saw wave lead (bright, buzzy, classic analog — Juno/Moog style)',
    'Square wave lead (hollow, retro, nasal — NES/chiptune-adjacent)',
    'FM synthesis (metallic, bell-like, complex — DX7/Operator style)',
    'Wavetable (morphing between wave shapes — Serum/Vital style)',
    'Supersaw (stacked detuned saws — trance/EDM anthem lead)',
    'Acid lead (resonant filter sweep — TB-303 squealing style)',
    'Chiptune/8-bit (retro game console — hard square/triangle waves)',
    'Granular synthesis (sample-based micro-texture — clouds of sound)',
    'Additive synthesis (built from individual harmonics — organ-like control)',
    'Physical modeling (simulates real instrument physics — pluck, blow, bow)'
  ]},
  'Pads': { label: 'Pad Type', options: [
    'Warm analog pad (soft, round, low-pass filtered — vintage poly synth)',
    'Dark digital pad (cold, metallic, low-end heavy — modern and moody)',
    'Evolving/morphing texture (automates over time — never static, always shifting)',
    'Granular pad (built from micro-samples — shimmering, unpredictable)',
    'Vocal/formant pad (vowel-shaped filter — sounds like a synthetic choir)',
    'String ensemble pad (emulates orchestral strings — legato, lush, cinematic)',
    'Noise-based pad (filtered white/pink noise — airy, wind-like texture)',
    'Bitcrushed/lo-fi pad (low sample rate — gritty, degraded, digital warmth)',
    'Shimmer pad (octave-up pitch-shifted reverb tail — ethereal, sparkling)',
    'Hybrid pad (layer a synth with an acoustic recording — blended texture)'
  ]},
  'Vocals': { label: 'Vocal Type', options: [
    'Lead vocal phrase (a sung melodic line — topline or hook)',
    'Vocal chop (rhythmic sliced fragments — percussive, melodic bits)',
    'Ad-lib/shout (hype vocals — "yeah!", "hey!", call-outs, one-shots)',
    'Spoken word/dialogue (talking, narration, poetry — non-melodic)',
    'Choir/ensemble (multiple voices harmonizing — thick, layered)',
    'Vocal texture/ambient (washed-out, reverbed, atmospheric — background bed)',
    'Whisper (breathy, intimate, close-mic — ASMR-adjacent)',
    'Scream/distorted vocal (aggressive, raw, clipped — punk/metal energy)',
    'Humming/melody (wordless singing — simple melodic contour)',
    'Beatbox/vocal percussion (mouth drums — kicks, snares, hats with voice)'
  ]},
  'FX / Texture': { label: 'FX Type', options: [
    'Riser/build-up (sweeps upward in pitch/energy — tension before a drop)',
    'Sweep (filter or pitch movement — whoosh, transition element)',
    'Impact/hit (single loud transient — boom, crash, used at section starts)',
    'Transition effect (fills gaps between sections — reverse crash, tape stop)',
    'Atmosphere/ambience (background environmental sound — room, space, air)',
    'Foley/field recording (real-world sound designed into a musical element)',
    'Noise texture (static, hiss, crackle — adds analog character)',
    'Glitch/digital artifact (buffer errors, bit corruption — intentional chaos)',
    'Reverse effect (any sound played backwards — cymbal, vocal, synth swell)',
    'Drone/sustained texture (long held tone or noise — harmonic bed underneath)'
  ]},
  'Keys / Piano': { label: 'Instrument', options: [
    'Grand piano (concert hall sound — rich, dynamic, full range)',
    'Electric piano / Rhodes (warm, bell-like tines — jazz/neo-soul tone)',
    'Wurlitzer (gritty, reedy electric piano — thinner than Rhodes, more bite)',
    'Hammond organ (tonewheel drawbar organ — gospel, rock, jazz)',
    'Clavinet (funky, percussive pluck — Stevie Wonder "Superstition" sound)',
    'Toy piano (small, detuned, music-box quality — lo-fi and charming)',
    'Harpsichord (baroque plucked strings — bright, no velocity dynamics)',
    'Celesta (bell-like hammered metal — delicate, music-box shimmer)',
    'Mellotron (vintage tape playback — eerie flutes, strings, choir presets)',
    'Honky-tonk/detuned piano (out-of-tune upright — saloon, lo-fi character)'
  ]},
  'Guitar': { label: 'Guitar Type', options: [
    'Acoustic steel-string (bright, strumming or picking — folk/pop tone)',
    'Acoustic nylon/classical (warm, finger-plucked — gentle, intimate)',
    'Electric clean (no distortion — sparkly, jazzy, Fender-style shimmer)',
    'Electric with crunch/overdrive (light gain — blues, indie rock grit)',
    'Electric heavy distortion (high gain — metal, hard rock, wall of sound)',
    'Slide guitar (bottleneck or lap steel — gliding between notes)',
    '12-string (doubled strings — jangly, full, chorus-like natural shimmer)',
    'Baritone guitar (tuned lower — deeper, heavier, between guitar and bass)',
    'Fingerstyle (complex plucked patterns — Travis picking, percussive taps)',
    'Synth guitar/e-bow (sustained infinite notes — ambient, drone-like guitar)'
  ]},
  'Strings': { label: 'Ensemble', options: [
    'Full orchestra (large string section — lush, cinematic, wide stereo)',
    'Chamber ensemble (small group — 4-8 players, intimate, detailed)',
    'Solo violin (single player — expressive, melodic, exposed)',
    'Solo cello (single player — warm, rich low-mid range, emotional)',
    'Solo viola (single player — darker than violin, mellower tone)',
    'Pizzicato ensemble (plucked strings — short, staccato, rhythmic)',
    'Synthetic/synth strings (emulated — digital pads pretending to be strings)',
    'Hybrid (layer real strings with synth — blended organic + electronic)',
    'Ethnic strings (erhu, sitar, oud — non-Western bowed/plucked instruments)',
    'Prepared/extended technique (col legno, sul ponticello, harmonics — unusual)'
  ]},
  'Percussion': { label: 'Perc Type', options: [
    'Latin (congas, bongos, timbales — salsa/Afro-Cuban rhythms)',
    'African (djembe, talking drum, shekere — West African polyrhythms)',
    'Shakers and tambourine (auxiliary hand percussion — groove textures)',
    'Electronic/processed percussion (synth perc hits — zaps, clicks, blips)',
    'Found sound/household objects (pots, bottles, pencils — anything non-musical)',
    'Metallic (bells, gongs, cymbals, finger cymbals — bright, ringing)',
    'Hand drums (udu, cajon, doumbek — played with palms and fingers)',
    'Frame drums (bodhran, tar, riq — single-headed round drums)',
    'Brazilian (surdo, pandeiro, agogo — samba/bossa nova percussion)',
    'Middle Eastern (darbuka, riq, daf — doumbek patterns, ornamental rolls)'
  ]},
  '808': { label: '808 Style', options: [
    'Classic Roland 808 (clean, round, original TR-808 tone — no processing)',
    'Distorted/clipped hard (driven into saturation — aggressive, fuzzy)',
    'Clean sub only (pure sine wave — deep and clean, no harmonics)',
    'Pitched melodic 808 (playing a bassline — tuned chromatic notes)',
    'Glide/slide heavy (portamento between notes — trap-style pitch bends)',
    'Boomy and sustained (long decay tail — fills the low end completely)',
    'Short and punchy (tight, quick decay — controlled, mix-friendly)',
    'Layered (sub + mid click + top transient — three layers for one hit)',
    'Saturated/warm (gentle analog warmth — not distorted, just colored)',
    'Lo-fi/degraded (vinyl-sampled, bit-reduced — dusty, imperfect character)'
  ]},
  'Brass / Woodwinds': { label: 'Instrument', options: [
    'Trumpet (bright, punchy brass — solo or lead lines)',
    'Saxophone (alto/tenor/bari — smooth, soulful, or aggressive)',
    'Trombone (warm, round, slide-capable — rich low brass)',
    'Flute (airy, breathy, high register — delicate melodic lines)',
    'Clarinet (warm, woody, smooth — jazz or classical tone)',
    'French horn (mellow, majestic, cinematic — orchestral brass)',
    'Brass ensemble/section (multiple horns — stabs, swells, fanfares)',
    'Woodwind ensemble (mixed flute, oboe, clarinet — orchestral color)',
    'Harmonica (blues harp — raw, bending notes, folk/blues feel)',
    'Pan flute/ethnic wind (breathy world instruments — Andean, Middle Eastern)'
  ]},

  // ── NEW TRACK TYPES ───────────────────────────────────

  'Arp / Sequence': { label: 'Arp Style', options: [
    'Classic sync arp (1/16 up pattern — rhythmic, predictable, driving)',
    'Random/generative pattern (algorithmic — unpredictable note order)',
    'Gated pad sequence (sustained chord chopped rhythmically — trance gates)',
    'Pluck arp (short decay — minimal attack, quick release, crystalline)',
    'Legato flowing arp (smooth, connected notes — no gaps between)',
    'Chord-triggered sequence (full chords trigger a pattern — evolving)',
    'Mono saw arp (single-voice sawtooth — classic analog monosynth)',
    'Poly shimmer arp (multiple voices, reverbed — ambient, spacious)',
    'Acid 303 sequence (resonant filter, accent, slide — squelchy acid)',
    'Glitchy/stuttered sequence (buffer repeat, retriggered — broken, chaotic)'
  ]},
  'Plucks / Stabs': { label: 'Character', options: [
    'Bright and glassy (high harmonics, clean, transparent — bell-like)',
    'Warm and mellow (low-pass filtered, soft — gentle, round tone)',
    'Detuned and wide (multiple oscillators slightly off — fat, stereo spread)',
    'Sharp and percussive (fast attack, no sustain — transient-heavy)',
    'Filtered and dark (heavy low-pass — muted, underwater quality)',
    'Metallic and thin (ring mod or FM — cold, inorganic, brittle)',
    'Fat and layered (multiple sounds stacked — thick, powerful hits)',
    'Clean and minimal (simple waveform, no FX — pure and dry)',
    'Distorted and aggressive (overdriven, clipped — gritty, loud)',
    'Ethereal and airy (reverbed, high-passed — floating, delicate)'
  ]},
  'Mallets / Tuned Perc': { label: 'Instrument', options: [
    'Marimba (wooden bars, warm resonance — mellow, organic)',
    'Vibraphone (metal bars with motor — jazz, warm, vibrato shimmer)',
    'Xylophone (wooden bars, bright — cutting, sharp, high register)',
    'Glockenspiel (small metal bars — bell-like, high, sparkling)',
    'Kalimba / Mbira (thumb piano — gentle plucked metal tines)',
    'Steel Pan / Steel Drum (hammered oil drum — bright, Caribbean melodic)',
    'Celesta (keyboard hammered plates — delicate, music-box shimmer)',
    'Music Box (cylinder mechanism — tiny, nostalgic, mechanical melody)',
    'Tubular Bells (large hanging tubes — deep, resonant, orchestral chime)',
    'Balafon / African mallet (gourd-resonated xylophone — buzzy, dry, warm)'
  ]},
  'World / Ethnic': { label: 'Region', options: [
    'West African (kora, balafon, djembe — polyrhythmic, griot tradition)',
    'East African (nyatiti, thumb piano — Kenyan/Ethiopian melodic styles)',
    'Indian (sitar, tabla, tanpura — raga-based, microtonal, drone-rooted)',
    'Middle Eastern (oud, darbuka, ney — maqam scales, ornamental melody)',
    'Japanese (koto, shakuhachi, taiko — pentatonic, meditative or powerful)',
    'Chinese (erhu, guzheng, pipa — silk-string, ornamental, pentatonic)',
    'Latin American (charango, berimbau, cuatro — Andean, capoeira, folk)',
    'Caribbean (steelpan, cuatro, shak-shak — island rhythms, calypso)',
    'Celtic (tin whistle, uilleann pipes, bodhran — Irish/Scottish folk)',
    'Southeast Asian (gamelan, angklung, khim — tuned percussion, metallophone)'
  ]},
  'Choir / Ensemble': { label: 'Ensemble Type', options: [
    'Cathedral choir (reverberant, classical — large space, formal)',
    'Gospel choir (soulful, powerful — call-and-response, dynamic)',
    'Synth choir (digital, lush — synthesized vowel pads, Juno-style)',
    'Gregorian chant (modal, haunting — monophonic, medieval, sacred)',
    'Tribal/ethnic vocal ensemble (non-Western group singing — rhythmic)',
    'Children\'s choir (innocent, high register — pure, simple harmonies)',
    'Dark choir (cinematic, ominous — low register, dissonant, horror-score)',
    'Stacked vocal harmonies (pop/R&B — tight tuning, multi-tracked)',
    'Throat singing ensemble (overtone-rich — Tuvan/Mongolian harmonic singing)',
    'Processed/effected choir (glitchy, modern — granular, reversed, mangled)'
  ]},
  'Foley / Found Sound': { label: 'Recording Location', options: [
    'Record outdoors (traffic, wind, birds, footsteps — capture something outside)',
    'Record at home (kitchen, doors, tapping, household objects — domestic sounds)',
    'Record your own body (claps, snaps, breath, stomps — no gear needed)',
    'Record something metal (keys, coins, pots, tools — metallic resonance)',
    'Record something with water (drips, splash, pouring, rain — liquid sounds)',
    'Record a public space (cafe, store, crowd, station — ambient activity)',
    'Record a workspace (typing, drawer, chair, pen — office or desk sounds)',
    'Record something wooden (knocking, creaking, tapping — organic resonance)',
    'Record plastic or paper (crinkle, tear, rustle, crumple — disposable textures)',
    'Record something glass or ceramic (clink, tap, ring, shatter — fragile tones)'
  ]},

  // ── ADDED TRACK TYPES ──────────────────────────────────

  'Ambient / Drone': { label: 'Texture Type', options: [
    'Slow-evolving pad drone (gradually shifting synth — glacial movement)',
    'Granular cloud texture (micro-sample clusters — shimmering, diffuse)',
    'Bowed/scraped metal sustain (physical resonance — dark, overtone-rich)',
    'Field recording wash (processed nature/city sound — blurred into texture)',
    'Tape loop ambient (recorded to tape, looped — warm, degraded, hypnotic)',
    'Generative/algorithmic (random/evolving patch — never repeats exactly)',
    'Reversed reverb tail (capture reverb, flip it — swell into nothing)',
    'Harmonic series drone (stacked pure overtones — rich, mathematical)',
    'Sub-bass rumble drone (below 60Hz — physical vibration, barely audible)',
    'Layered sine tone bed (multiple clean tones — beatless, organ-like)'
  ]},
  'Vocal Chops': { label: 'Chop Style', options: [
    'Rhythmic stutter chops (tight slices on the grid — percussive vocal hits)',
    'Melodic pitch-shifted (repitched into a melody — the chops sing a tune)',
    'Glitched and stuttered (buffer errors, retriggered — broken, digital)',
    'Reversed vocal slices (backwards fragments — eerie, pre-echo effect)',
    'Formant-shifted alien (formants moved up/down — chipmunk or giant voice)',
    'Whisper texture chops (breathy, ASMR-like fragments — soft, intimate)',
    'Layered harmony stack (same chop at multiple pitches — instant chord)',
    'Trance-style gated (long vocal gated to 1/16 — rhythmic pulsing)',
    'Lo-fi degraded chops (bitcrushed, vinyl-sim — dusty, old-recording feel)',
    'Granular vocal cloud (dissolved into particles — unrecognizable texture)'
  ]},
  'Noise / Industrial': { label: 'Character', options: [
    'Harsh and abrasive (full-spectrum distortion — confrontational, loud)',
    'Rhythmic machine pulse (looping mechanical rhythm — factory groove)',
    'Dark and atmospheric (low rumble, distant clangs — ominous, cinematic)',
    'Feedback-driven (amplifier or plugin feedback — sustained, unpredictable)',
    'Contact mic textural (vibration pickup recordings — intimate surface sounds)',
    'Circuit bent chaos (modified electronics — glitchy, unstable, broken toys)',
    'Modular synth noise (patched noise source — filtered, shaped, musical)',
    'Metallic and percussive (struck/scraped metal — industrial rhythm hits)',
    'Distorted beyond recognition (source obliterated by FX — abstract, dense)',
    'Controlled white/pink noise (shaped, filtered — hiss as a musical element)'
  ]},
  'Sampler / Chops': { label: 'Source Era', options: [
    '60s/70s soul and funk (Motown, James Brown — warm, groovy source material)',
    '80s synth and new wave (Depeche Mode, synth-pop — bright, electronic)',
    '90s hip hop golden era (boom bap breaks — dusty, raw, sample-culture)',
    'Classic jazz (50s-60s) (Blue Note, bebop — smoky, improvisational)',
    'Vintage disco and boogie (Chic, Donna Summer — four-on-the-floor groove)',
    'Library music / stock (production music archives — obscure, cinematic)',
    'Film soundtrack chop (movie scores, dialogue — cinematic, narrative)',
    'World music vinyl (international recordings — non-Western melodic material)',
    'Lo-fi cassette tape (home recordings, demos — hissy, warm, imperfect)',
    'Modern resampled and flipped (recent material — chop current music, remix)'
  ]}
};