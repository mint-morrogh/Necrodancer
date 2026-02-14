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

  const genrePool = GENRES_BY_TRACK[trackType] || GENRES_BY_TRACK['Drums'];
  const genre = pick(genrePool);
  const sampleType = pick(SAMPLE_TYPES[trackType] || ['sample']);

  const flavor = TRACK_FLAVOR[trackType];
  const flavorRoll = flavor ? { label: flavor.label, text: pick(flavor.options) } : null;

  const multiElementTracks = ['Drums', 'Percussion'];
  const isMulti = multiElementTracks.includes(trackType);

  // Track types where genre is a processing context, not a Splice search filter
  const openDirectiveTracks = ['Foley / Found Sound'];
  const isOpenDirective = openDirectiveTracks.includes(trackType);

  let genreDirective;
  if (isAlchemist) {
    genreDirective = pick(ALCHEMIST_DIRECTIVES);
  } else if (isYouTube) {
    genreDirective = isMulti
      ? `Find a <span style="color:var(--gold);">${genre}</span> track on YouTube and sample your ${trackType.toLowerCase()} from it`
      : `Find a <span style="color:var(--gold);">${genre}</span> track on YouTube and sample a <span style="color:var(--gold);">${sampleType}</span> from it`;
  } else if (isOpenDirective) {
    genreDirective = `Find or record a <span style="color:var(--gold);">${sampleType}</span> and process it to fit a <span style="color:var(--gold);">${genre}</span> context`;
  } else {
    genreDirective = isMulti
      ? `Build your ${trackType.toLowerCase()} using samples from the <span style="color:var(--gold);">${genre}</span> genre on Splice`
      : `Find a <span style="color:var(--gold);">${sampleType}</span> from the <span style="color:var(--gold);">${genre}</span> genre on Splice`;
  }

  const curses = [];
  let newDeferredCurses = [];
  let newNextRoomCurses = [];

  if (state.nextRoomCurses.length > 0) {
    for (const c of state.nextRoomCurses) {
      curses.push({ text: stripNextRoomPrefix(c), type: 'carried', completed: false });
    }
    state.nextRoomCurses = [];
  }

  if (isBoss) {
    // Boss rooms get guaranteed curses
    curses.push({ text: pick(CURSES_IMMEDIATE), type: 'immediate', completed: false });
    // Boss curses (mix-level) — nightmare uses the extreme pool
    const isNightmare = state.difficulty === 'nightmare';
    const bossCursePool = isNightmare ? BOSS_CURSES_NIGHTMARE : BOSS_CURSES;
    const bossCurseCount = roll(...diff().bossCurseRange);
    const usedBossCurses = [];
    for (let i = 0; i < bossCurseCount; i++) {
      let bc;
      do { bc = pick(bossCursePool); } while (usedBossCurses.includes(bc));
      usedBossCurses.push(bc);
      curses.push({ text: bc, type: 'boss-curse', completed: false });
    }
  } else if (isSanctuary) {
    // Sanctuary: no curses at all
  } else if (isCursed) {
    // Cursed Chamber: guaranteed 2-3 curses
    const cursedCount = roll(2, 3);
    for (let i = 0; i < cursedCount; i++) {
      if (i === 0) {
        curses.push({ text: pick(CURSES_IMMEDIATE), type: 'immediate', completed: false });
      } else {
        const pool = TRACK_CURSES[trackType] || CURSES_IMMEDIATE;
        curses.push({ text: pick(pool), type: 'track', completed: false });
      }
    }
  } else {
    if (!state.shieldNextRoom && chance(diff().curseChance)) {
      const ctw = diff().curseTypeWeights;
      const curseType = weightedPick([
        { value: 'immediate', weight: ctw.immediate },
        { value: 'track', weight: ctw.track },
        { value: 'deferred', weight: ctw.deferred },
        { value: 'nextRoom', weight: ctw.nextRoom }
      ]);
      if (curseType === 'immediate') {
        curses.push({ text: pick(CURSES_IMMEDIATE), type: 'immediate', completed: false });
      } else if (curseType === 'track') {
        const pool = TRACK_CURSES[trackType] || CURSES_IMMEDIATE;
        curses.push({ text: pick(pool), type: 'track', completed: false });
      } else if (curseType === 'deferred') {
        newDeferredCurses.push({ text: pick(CURSES_DEFERRED), completed: false, fromRoom: state.rooms.length + 1 });
      } else {
        newNextRoomCurses.push(pick(CURSES_NEXT_ROOM));
      }
    }

    if (!state.shieldNextRoom && chance(diff().trackCurseChance)) {
      const pool = TRACK_CURSES[trackType] || CURSES_IMMEDIATE;
      curses.push({ text: pick(pool), type: 'track', completed: false });
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

    effects.push({ name: effName, percentage: roll(...diff().effectRange) });
  }

  let blessing = null;
  if (isBoss) {
    blessing = pick(BOSS_BLESSINGS);
  } else if (isSanctuary) {
    blessing = pick(BLESSINGS);
  } else if (chance(diff().blessingChance)) {
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
