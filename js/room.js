// ════════════════════════════════════════════════════════
// GENRE SELECTION BY DIFFICULTY
// ════════════════════════════════════════════════════════
// Easy/Normal → pick from official Splice genres only
// Hard/Nightmare → pick from tags (non-Splice genres) only
// Falls back to full pool if filtered pool is empty

function pickGenreForDifficulty(trackType) {
  const fullPool = GENRES_BY_TRACK[trackType] || GENRES_BY_TRACK['Drums'];
  const d = state.difficulty;
  if (d === 'hard' || d === 'nightmare') {
    const tags = fullPool.filter(g => !SPLICE_GENRES.has(g));
    return tags.length > 0 ? pick(tags) : pick(fullPool);
  }
  const genres = fullPool.filter(g => SPLICE_GENRES.has(g));
  return genres.length > 0 ? pick(genres) : pick(fullPool);
}

function buildGenreDirective({ trackType, genre, sampleType, isMulti, isOpenDirective, isAlchemist, isYouTube }) {
  if (isAlchemist) return pick(ALCHEMIST_DIRECTIVES);

  const isTag = !SPLICE_GENRES.has(genre);
  const label = isTag ? 'tag' : 'genre';

  if (isYouTube) {
    return isMulti
      ? `Find a <span style="color:var(--gold);">${genre}</span> track on YouTube and sample your ${trackType.toLowerCase()} from it`
      : `Find a <span style="color:var(--gold);">${genre}</span> track on YouTube and sample a <span style="color:var(--gold);">${sampleType}</span> from it`;
  }
  if (isOpenDirective) {
    return `Find or record a <span style="color:var(--gold);">${sampleType}</span> and process it to fit a <span style="color:var(--gold);">${genre}</span> context`;
  }
  return isMulti
    ? `Build your ${trackType.toLowerCase()} using samples from the <span style="color:var(--gold);">${genre}</span> ${label} on Splice`
    : `Use a <span style="color:var(--gold);">${sampleType}</span> from the <span style="color:var(--gold);">${genre}</span> ${label} on Splice`;
}

// ════════════════════════════════════════════════════════
// FLAVOR / GENRE COMPATIBILITY
// ════════════════════════════════════════════════════════
// Source-defining flavors (Kit Type, Region, Perc Type, etc.) are filtered
// to match the rolled genre. Technique/character flavors always pass.
// If no source flavor matches the genre, falls back to all options.

const SOURCE_FLAVOR_COMPAT = {
  'Drums': [
    { match: 'Acoustic Kit',          genreKeys: ['Rock','Jazz','Blues','Funk','Soul','Pop','Country','Folk','Indie','Punk','Reggae','Ska','Gospel','Emo','Shoegaze','Classical','Metal','Disco','Neo Soul','City Pop','Bossa','Cumbia','Salsa','Samba','Flamenco','Afrobeat','Highlife','Soca','Zouk','Psychedelic','Stoner','Math Rock','Post-Rock','Post-Punk','Garage Rock'] },
    { match: 'Electronic Kit',        genreKeys: ['Techno','House','EDM','Trance','Electro','EBM','Rave','Hardstyle','Eurodance','Synth','Dubstep','Drum and Bass','DnB','Jungle','Breakbeat','Grime','Bassline','Footwork','Hyperpop','Chiptune','Darkwave','Wave','Minimal','Acid','Big Room','Fidget','Future','Industrial','Riddim','Neurofunk','Speed Garage','UK Garage','UK Funky','2-Step','Psytrance','Amapiano','Gqom'] },
    { match: 'Lo-Fi Kit',             genreKeys: ['Lo-Fi','Boom Bap','Trip Hop','Chill','Downtempo','Vaporwave','City Pop','Cloud Rap','Jazz','Neo Soul','Indie'] },
    { match: 'Vintage Drum Machine',  genreKeys: ['Electro','Synth','House','Techno','Hip Hop','Trap','Boom Bap','New Wave','Disco','EBM','Industrial','Darkwave','City Pop','Vaporwave','Lo-Fi','Phonk','G-Funk','French House','Acid','Rave','Nu Disco','Drill','R&B','Pop','K-Pop','Drift','Memphis','Jersey','Dancehall','Reggaeton','Amapiano','Gqom'] },
    { match: 'Breakbeat Kit',         genreKeys: ['Breakbeat','Jungle','DnB','Drum and Bass','Trip Hop','Boom Bap','Hip Hop','Rave','Glitch','Footwork','Neurofunk','Halftime'] },
    { match: 'World Percussion',      genreKeys: ['Afro','Latin','Reggae','Dancehall','Cumbia','Salsa','Samba','Bossa','Flamenco','World','Ethnic','Caribbean','African','Indian','Middle Eastern','South Asian','Gqom','Highlife','Soca','Zouk','Kizomba','Bhangra','Bollywood','Moombahton','Reggaeton','Brazilian','Organic House','Amapiano','Calypso','Champeta','Kuduro'] }
  ],
  'Percussion': [
    { match: 'Latin (',               genreKeys: ['Latin','Salsa','Cumbia','Reggaeton','Bossa','Samba','Brazilian','Moombahton','Dancehall','Caribbean','Soca','Calypso'] },
    { match: 'African (',             genreKeys: ['Afro','African','Gqom','Highlife','Amapiano','Soukous','Mbalax','Kuduro','Champeta','Reggae','Dancehall'] },
    { match: 'Brazilian (',           genreKeys: ['Brazilian','Samba','Bossa','Latin','Cumbia','Afro'] },
    { match: 'Middle Eastern (',      genreKeys: ['Middle Eastern','Arabic','Turkish','Ethnic','World'] },
    { match: 'Frame drums',           genreKeys: ['Middle Eastern','Celtic','Irish','Folk','Afro','Indian','World','Ethnic','Latin','Flamenco','Caribbean','Reggae'] },
    { match: 'Hand drums',            genreKeys: ['Afro','Latin','Middle Eastern','World','Ethnic','Folk','Reggae','Dancehall','Caribbean','Indian','Flamenco'] }
  ],
  'World / Ethnic': [
    { match: 'West African',          genreKeys: ['Afro','African','Highlife','Soukous','Mbalax','Gqom','Amapiano','Kuduro','Champeta'] },
    { match: 'East African',          genreKeys: ['Afro','African','Ethiopian','Kenyan','Highlife','Amapiano','Gqom'] },
    { match: 'Indian',                genreKeys: ['Indian','Bhangra','Bollywood','South Asian'] },
    { match: 'Middle Eastern',        genreKeys: ['Middle Eastern','Arabic','Turkish'] },
    { match: 'Japanese',              genreKeys: ['Japanese','City Pop','Asian'] },
    { match: 'Chinese',               genreKeys: ['Chinese','Asian'] },
    { match: 'Latin American',        genreKeys: ['Latin','Cumbia','Salsa','Andean','Brazilian','Bossa','Samba','Reggaeton','Moombahton'] },
    { match: 'Caribbean',             genreKeys: ['Caribbean','Dancehall','Reggae','Soca','Calypso','Zouk','Kizomba','Dub'] },
    { match: 'Celtic',                genreKeys: ['Celtic','Irish','Scottish','Folk'] },
    { match: 'Southeast Asian',       genreKeys: ['Gamelan','Indonesian','Southeast','Asian'] }
  ],
  'Strings': [
    { match: 'Ethnic strings',        genreKeys: ['Afro','Indian','Middle Eastern','Asian','World','Ethnic','Latin','Folk','Flamenco','Cumbia','Dancehall','Reggae','Bhangra','Bollywood','Caribbean'] }
  ],
  'Brass / Woodwinds': [
    { match: 'Pan flute/ethnic',      genreKeys: ['Latin','Andean','World','Ethnic','Middle Eastern','Asian','Folk','Ambient','Cinematic','Cumbia','Flamenco','Bossa','Downtempo','Afro','Indian','Caribbean','Game Audio'] }
  ],
  'Mallets / Tuned Perc': [
    { match: 'Kalimba',               genreKeys: ['Afro','African','World','Ethnic','Lo-Fi','Chill','Ambient','Indie','Bedroom','Pop','Hip Hop','R&B','Neo Soul','Downtempo','Trip Hop','Dream Pop'] },
    { match: 'Steel Pan',             genreKeys: ['Caribbean','Soca','Calypso','Dancehall','Reggae','Tropical'] },
    { match: 'Balafon',               genreKeys: ['Afro','African','Highlife','World','Ethnic'] }
  ]
};

function pickCompatibleFlavor(trackType, genre, isAlchemist) {
  if (isAlchemist) {
    return ALCHEMIST_FLAVOR
      ? { label: ALCHEMIST_FLAVOR.label, text: pick(ALCHEMIST_FLAVOR.options) }
      : null;
  }

  const flavor = TRACK_FLAVOR[trackType];
  if (!flavor) return null;

  const rules = SOURCE_FLAVOR_COMPAT[trackType];
  if (!rules) return { label: flavor.label, text: pick(flavor.options) };

  const genreLower = genre.toLowerCase();
  const compatible = flavor.options.filter(opt => {
    const rule = rules.find(r => opt.includes(r.match));
    if (!rule) return true; // technique/character flavor — always OK
    return rule.genreKeys.some(k => genreLower.includes(k.toLowerCase()));
  });

  // If nothing matched (generic genre + all options source-restricted),
  // fall back to all options — any choice is fine for non-regional genres
  const pool = compatible.length > 0 ? compatible : flavor.options;
  return { label: flavor.label, text: pick(pool) };
}

// ════════════════════════════════════════════════════════
// GAME LOGIC — Room Generation
// ════════════════════════════════════════════════════════

function generateRoom(trackType, opts = {}) {
  const isAlchemist = opts.isAlchemist || false;
  const isBoss = opts.isBoss || false;
  const isCursed = opts.isCursed || false;
  const isSanctuary = opts.isSanctuary || false;
  const isYouTube = isAlchemist ? false : (isBoss ? false : chance(10));

  let roomName;
  if (isBoss) {
    roomName = pickUnique(BOSS_ROOM_NAMES, state.usedRoomNames);
  } else if (isAlchemist) {
    roomName = pickUnique(ALCHEMIST_ROOM_NAMES, state.usedRoomNames);
  } else if (isYouTube) {
    roomName = pickUnique(YOUTUBE_ROOM_NAMES, state.usedRoomNames);
  } else {
    roomName = pickUnique(ROOM_NAMES, state.usedRoomNames);
  }
  state.usedRoomNames.push(roomName);

  const genre = pickGenreForDifficulty(trackType);
  const sampleType = pick(SAMPLE_TYPES[trackType] || ['sample']);

  const flavorRoll = pickCompatibleFlavor(trackType, genre, isAlchemist);

  const multiElementTracks = ['Drums', 'Percussion'];
  const isMulti = multiElementTracks.includes(trackType);

  // Track types where genre is a processing context, not a Splice search filter
  const openDirectiveTracks = ['Foley / Found Sound'];
  const isOpenDirective = openDirectiveTracks.includes(trackType);

  const genreDirective = buildGenreDirective({ trackType, genre, sampleType, isMulti, isOpenDirective, isAlchemist, isYouTube });

  const curses = [];
  const usedCurseTexts = [];
  let newDeferredCurses = [];
  let newNextRoomCurses = [];

  function pickUniqueCurse(pool) {
    let text;
    let attempts = 0;
    do { text = pick(pool); attempts++; } while (usedCurseTexts.includes(text) && attempts < 20);
    usedCurseTexts.push(text);
    return text;
  }

  if (state.nextRoomCurses.length > 0) {
    for (const c of state.nextRoomCurses) {
      const text = stripNextRoomPrefix(c);
      usedCurseTexts.push(text);
      curses.push({ text, type: 'carried', completed: false });
    }
    state.nextRoomCurses = [];
  }

  if (isBoss) {
    // Boss rooms get guaranteed curses
    curses.push({ text: pickUniqueCurse(CURSES_IMMEDIATE), type: 'immediate', completed: false });
    // Boss curses (mix-level) — nightmare uses the extreme pool
    const isNightmare = state.difficulty === 'nightmare';
    const bossCursePool = isNightmare ? BOSS_CURSES_NIGHTMARE : BOSS_CURSES;
    const bossCurseCount = roll(...diff().bossCurseRange);
    for (let i = 0; i < bossCurseCount; i++) {
      curses.push({ text: pickUniqueCurse(bossCursePool), type: 'boss-curse', completed: false });
    }
  } else if (isSanctuary) {
    // Sanctuary: no curses at all
  } else if (isCursed) {
    // Cursed Chamber: guaranteed 2-3 curses
    const cursedCount = roll(2, 3);
    for (let i = 0; i < cursedCount; i++) {
      if (i === 0) {
        curses.push({ text: pickUniqueCurse(CURSES_IMMEDIATE), type: 'immediate', completed: false });
      } else {
        const pool = TRACK_CURSES[trackType] || CURSES_IMMEDIATE;
        curses.push({ text: pickUniqueCurse(pool), type: 'track', completed: false });
      }
    }
  } else {
    // Curse Ward relic: block the first curse each floor
    if (hasRelic('curse_ward') && !relicUsedThisFloor('curse_ward') && !state.shieldNextRoom && !isSanctuary) {
      // Ward absorbs the curse roll entirely for this room
      if (chance(diff().curseChance)) {
        markRelicUsed('curse_ward');
        // Curse blocked — skip curse generation
      }
    } else if (!state.shieldNextRoom && chance(diff().curseChance)) {
      const ctw = diff().curseTypeWeights;
      const curseType = weightedPick([
        { value: 'immediate', weight: ctw.immediate },
        { value: 'track', weight: ctw.track },
        { value: 'deferred', weight: ctw.deferred },
        { value: 'nextRoom', weight: ctw.nextRoom }
      ]);
      if (curseType === 'immediate') {
        curses.push({ text: pickUniqueCurse(CURSES_IMMEDIATE), type: 'immediate', completed: false });
      } else if (curseType === 'track') {
        const pool = TRACK_CURSES[trackType] || CURSES_IMMEDIATE;
        curses.push({ text: pickUniqueCurse(pool), type: 'track', completed: false });
      } else if (curseType === 'deferred') {
        newDeferredCurses.push({ text: pickUniqueCurse(CURSES_DEFERRED), completed: false, fromRoom: state.rooms.length + 1 });
      } else {
        newNextRoomCurses.push(pickUniqueCurse(CURSES_NEXT_ROOM));
      }
    }

    if (!state.shieldNextRoom && chance(diff().trackCurseChance)) {
      const pool = TRACK_CURSES[trackType] || CURSES_IMMEDIATE;
      curses.push({ text: pickUniqueCurse(pool), type: 'track', completed: false });
    }
  }

  state.shieldNextRoom = false;

  const effectCount = weightedPick(diff().effectWeights);
  const effects = [];
  const usedEffects = [];

  // Effects that only make sense when a previous track exists to reference
  const NEEDS_PREVIOUS_TRACK = ['Sidechain Compression'];
  const isFirstRoom = state.rooms.length === 0;
  const prevTracks = state.rooms.map(r => r.trackType);

  for (let i = 0; i < effectCount; i++) {
    let eff;
    do {
      eff = pick(EFFECTS);
    } while (
      usedEffects.includes(eff) ||
      (isFirstRoom && NEEDS_PREVIOUS_TRACK.includes(eff))
    );
    usedEffects.push(eff);

    // Add context for sidechain — specify which previous element to key against
    let effName = eff;
    if (eff === 'Sidechain Compression' && prevTracks.length > 0) {
      const target = prevTracks.includes('Drums') ? 'Drums'
        : prevTracks.includes('808') ? '808'
        : prevTracks.includes('Percussion') ? 'Percussion'
        : prevTracks[prevTracks.length - 1];
      effName = `Sidechain Compression (keyed to ${target})`;
    }

    let pct = roll(...diff().effectRange);
    // Relic: Echo Crystal — cap effect % at 60
    if (hasRelic('echo_crystal')) pct = Math.min(pct, 60);
    // Relic: Dampening Orb — reduce effect % by 15
    if (hasRelic('dampening_orb')) pct = Math.max(5, pct - 15);
    effects.push({ name: effName, percentage: pct });
  }

  let blessing = null;
  if (isBoss) {
    blessing = pick(BOSS_BLESSINGS);
  } else if (isSanctuary) {
    blessing = pick(BLESSINGS);
  } else if (chance(diff().blessingChance + (hasRelic('divine_favor') ? 15 : 0))) {
    blessing = pick(BLESSINGS);
  }
  if (blessing) {
    if (blessing.includes('re-roll token') || blessing.includes('reroll token')) state.rerolls++;
    if (blessing.includes('NEXT room cannot be cursed') || blessing.includes('next 2 rooms cannot be cursed')) state.shieldNextRoom = true;
  }

  state.deferredCurses.push(...newDeferredCurses);
  state.nextRoomCurses.push(...newNextRoomCurses);

  const checklist = [];
  checklist.push({ id: 'genre', text: genreDirective, completed: false, type: 'genre' });
  for (let i = 0; i < curses.length; i++) {
    const cType = curses[i].type === 'boss-curse' ? 'boss-curse' : 'curse';
    checklist.push({ id: 'curse-' + i, text: curses[i].text, completed: false, type: cType });
  }
  for (let i = 0; i < effects.length; i++) {
    checklist.push({ id: 'fx-' + i, text: `${effects[i].name} at ${effects[i].percentage}% wet`, completed: false, type: 'effect' });
  }

  return {
    number: state.rooms.length + 1,
    name: roomName,
    trackType,
    genre,
    sampleType,
    genreDirective,
    flavorRoll,
    bonusCompleted: false,
    curses,
    effects,
    blessing,
    checklist,
    newDeferredCurses,
    newNextRoomCurses,
    isYouTube,
    isAlchemist,
    isBoss,
    completed: false,
    isSideQuest: false,
    originalTrackType: null
  };
}
