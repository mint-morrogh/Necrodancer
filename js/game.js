// ════════════════════════════════════════════════════════
// EVENT HANDLERS
// ════════════════════════════════════════════════════════

function startSetup() {
  state.screen = 'setup';
  state.setupStep = 1;
  state.key = null;
  state.scale = null;
  state.difficulty = null;
  state.seedMode = 'daily';
  state.seed = null;
  render();
}

async function rollForKey() {
  const display = document.getElementById('key-display');
  if (!display) return;
  display.classList.add('rolling');

  const duration = 1500;
  const interval = 60;
  const steps = Math.floor(duration / interval);

  for (let i = 0; i < steps; i++) {
    display.textContent = `${pick(KEYS)} ${pick(SCALES)}`;
    await sleep(interval);
  }

  state.key = pick(KEYS);
  state.scale = pick(SCALES);
  display.textContent = `${state.key} ${state.scale}`;
  display.classList.remove('rolling');
  if (state.setupStep < 2) state.setupStep = 2;
  setTimeout(() => render(), 300);
}

function generateRandomSeed() {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

function rerollSeed() {
  state.seedMode = 'random';
  state.seed = generateRandomSeed();
  renderSetup();
}

function toggleQuestLog() {
  const panel = document.getElementById('log-panel');
  const toggle = document.getElementById('log-toggle');
  const overlay = document.getElementById('log-overlay');
  if (!panel || !toggle) return;
  panel.classList.toggle('open');
  toggle.classList.toggle('open');
  if (overlay) overlay.classList.toggle('open');
}

function getTodaySeed() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function startDungeon() {
  state.bpm = parseInt(document.getElementById('bpm-input')?.value) || state.bpm;
  const seedInput = document.getElementById('seed-input');
  const seed = seedInput ? seedInput.value.trim() || getTodaySeed() : getTodaySeed();
  state.seed = seed;
  initRng(seed);
  state.rerolls = diff().startingRerolls;
  state.floor = 1;
  state.score = 0;
  state.map = generateFloorMap(1);
  state.currentNodeId = null;
  state.floorHistory = [];
  state.screen = 'dungeon';
  state.roomPhase = 'map';
  render();
}

function adjustBpm(delta) {
  const input = document.getElementById('bpm-input');
  if (!input) return;
  let val = parseInt(input.value) || 128;
  val = Math.max(40, Math.min(300, val + delta));
  input.value = val;
  state.bpm = val;
}

function enterStartNode() {
  const select = document.getElementById('track-type-select');
  if (!select || !select.value) {
    if (select) {
      select.style.borderColor = 'var(--red)';
      setTimeout(() => { if (select) select.style.borderColor = ''; }, 1500);
    }
    return;
  }

  const trackType = select.value;
  const startNode = getNodeById('0-0');
  if (!startNode) return;

  startNode.trackType = trackType;
  startNode.preview = generateNodePreview('standard', trackType);
  state.currentNodeId = '0-0';

  enterRoomFromNode(startNode, trackType);
}

function enterBossNode() {
  const select = document.getElementById('boss-track-select');
  if (!select || !select.value) {
    if (select) {
      select.style.borderColor = 'var(--red)';
      setTimeout(() => { if (select) select.style.borderColor = ''; }, 1500);
    }
    return;
  }

  const trackType = select.value;
  const bossNode = state.map.rows[state.map.rows.length - 1][0];
  if (!bossNode) return;

  bossNode.trackType = trackType;
  state.currentNodeId = bossNode.id;

  enterRoomFromNode(bossNode, trackType);
}

function enterNodeFromMap(nodeId) {
  const node = getNodeById(nodeId);
  if (!node || node.completed) return;

  const reachable = getReachableNodes();
  if (!reachable.includes(nodeId)) return;

  state.currentNodeId = nodeId;

  // Campfire nodes go straight to campfire shop
  if (node.type === 'campfire') {
    node.completed = true;
    state.roomPhase = 'campfire';
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  // Relic nodes: show relic choice first, then enter room
  if (node.type === 'relic') {
    const relics = pickRelicsForChoice(3);
    if (relics.length > 0) {
      state.pendingRelicRoom = { nodeId: node.id, trackType: node.trackType };
      state.pendingRelicChoice = { relics, source: 'node' };
      state.roomPhase = 'relic-choice';
      render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    // No relics left — just enter the room normally
  }

  enterRoomFromNode(node, node.trackType);
}

function applyDeferredCursesToBoss(room) {
  const incomplete = state.deferredCurses.filter(c => !c.completed);
  if (incomplete.length === 0) return;

  let count = 0;
  for (let i = 0; i < incomplete.length; i++) {
    const dc = incomplete[i];
    room.curses.push({ text: dc.text, type: 'deferred-forced', completed: false });
    room.checklist.push({
      id: 'curse-df-' + i,
      text: dc.text,
      completed: false,
      type: 'curse'
    });
    dc.completed = true;
    count++;
  }
  room.forcedDeferredCount = count;
}

// ════════════════════════════════════════════════════════
// RELIC ACQUISITION
// ════════════════════════════════════════════════════════

function getAvailableRelics() {
  return RELICS.filter(r => !state.relics.includes(r.id));
}

function pickRelicsForChoice(count) {
  const available = getAvailableRelics();
  if (available.length === 0) return [];
  const picked = [];
  const pool = [...available];
  const num = Math.min(count, pool.length);
  for (let i = 0; i < num; i++) {
    const chosen = weightedPick(pool.map(r => ({
      value: r,
      weight: RELIC_TIERS[r.tier].weight
    })));
    picked.push(chosen);
    pool.splice(pool.indexOf(chosen), 1);
  }
  return picked;
}

function pickSingleRelic() {
  const available = getAvailableRelics();
  if (available.length === 0) return null;
  return weightedPick(available.map(r => ({
    value: r,
    weight: RELIC_TIERS[r.tier].weight
  })));
}

function selectRelic(relicId) {
  if (!state.relics.includes(relicId)) {
    state.relics.push(relicId);
  }
  const source = state.pendingRelicChoice ? state.pendingRelicChoice.source : 'node';
  state.pendingRelicChoice = null;
  afterRelicChoice(source);
}

function skipRelicChoice() {
  const source = state.pendingRelicChoice ? state.pendingRelicChoice.source : 'node';
  state.pendingRelicChoice = null;
  afterRelicChoice(source);
}

function afterRelicChoice(source) {
  if (source === 'campfire') {
    state.roomPhase = 'campfire';
    render();
    return;
  }
  // Relic node: enter the room now
  if (state.pendingRelicRoom) {
    const pr = state.pendingRelicRoom;
    state.pendingRelicRoom = null;
    const node = getNodeById(pr.nodeId);
    if (node) {
      enterRoomFromNode(node, pr.trackType);
      return;
    }
  }
  state.roomPhase = 'map';
  render();
}

function enterRoomFromNode(node, trackType) {
  const isBoss = node.type === 'boss';
  const isCursed = node.type === 'cursed';
  const isSanctuary = node.type === 'sanctuary';
  let isSideQuest = false;
  let originalTrackType = null;
  let isAlchemist = false;

  // Side quest roll (not for boss/sanctuary/cursed)
  const sideQuestChance = diff().sideQuestChance + (hasRelic('quest_magnet') ? 3 : 0);
  if (!isBoss && node.type === 'standard' && chance(sideQuestChance)) {
    isSideQuest = true;
    originalTrackType = trackType;
    const otherTypes = TRACK_TYPES.filter(t => t !== trackType);
    trackType = pick(otherTypes);
  }

  // Alchemist roll (standard nodes only)
  const alchemistChance = diff().alchemistChance + (hasRelic('alchemists_key') ? 4 : 0);
  if (!isBoss && !isSideQuest && node.type === 'standard' && chance(alchemistChance)) {
    isAlchemist = true;
  }

  // Road event roll (non-boss, non-campfire, not first room)
  const roadEventChance = diff().roadEventChance || 0;
  if (!isBoss && node.type !== 'campfire' && state.rooms.length > 0 && chance(roadEventChance)) {
    const event = pick(ROAD_EVENTS);
    state.roadEventData = {
      event,
      pendingRoom: { trackType, isSideQuest, originalTrackType, isAlchemist, isBoss, nodeId: node.id, isCursed, isSanctuary }
    };
    state.roomPhase = 'road-event';
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  // Chest roll (non-boss, non-campfire)
  const chestChance = diff().chestChance + (hasRelic('thiefs_glove') ? 5 : 0) + (hasRelic('gamblers_coin') ? 5 : 0);
  if (!isBoss && node.type !== 'campfire' && chance(chestChance)) {
    const hasAvailableRelics = getAvailableRelics().length > 0;
    state.chestData = {
      message: pick(CHEST_MESSAGES),
      reward: weightedPick([
        { value: 'reroll', weight: 35 },
        { value: 'blessing', weight: 30 },
        { value: 'shield', weight: 25 },
        { value: 'relic', weight: hasAvailableRelics ? 10 : 0 }
      ]),
      collected: false
    };
    state.pendingRoom = { trackType, isSideQuest, originalTrackType, isAlchemist, isBoss, nodeId: node.id, isCursed, isSanctuary };
    state.roomPhase = 'chest';
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  const opts = { isAlchemist, isBoss, isCursed, isSanctuary };
  state.currentRoom = generateRoom(trackType, opts);
  state.currentRoom.isSideQuest = isSideQuest;
  state.currentRoom.originalTrackType = originalTrackType;
  state.currentRoom.nodeId = node.id;
  if (isBoss) {
    state.rerolls += 2;
    applyDeferredCursesToBoss(state.currentRoom);
  }
  state.rerollsUsedThisRoom = 0;
  state.roomPhase = 'active';
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function nextFloor() {
  // Save floor stats
  state.floorHistory.push({
    floor: state.floor,
    rooms: state.rooms.length
  });

  state.floor++;
  state.map = generateFloorMap(state.floor);
  state.currentNodeId = null;
  state.roomPhase = 'map';
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goldForType(type) {
  if (type === 'genre') return GOLD_VALUES.genre;
  if (type === 'curse') return GOLD_VALUES.curse;
  if (type === 'effect') return GOLD_VALUES.effect;
  if (type === 'boss-curse') return GOLD_VALUES.boss;
  return 0;
}

function toggleCheck(index) {
  if (!state.currentRoom) return;
  const item = state.currentRoom.checklist[index];
  item.completed = !item.completed;

  const goldMult = (hasRelic('golden_chalice') ? 1.5 : 1) * (hasRelic('gamblers_coin') ? 1.5 : 1);
  const gv = Math.round(goldForType(item.type) * diff().goldMultiplier * goldMult);
  state.gold += item.completed ? gv : -gv;
  if (state.gold < 0) state.gold = 0;

  // Update gold display
  const goldEl = document.querySelector('.song-info-item span[style*="gold"]');
  if (goldEl) goldEl.textContent = state.gold + 'g';

  // Targeted DOM update
  const items = document.querySelectorAll('.room-main .checklist-item');
  if (items[index]) {
    const box = items[index].querySelector('.check-box');
    const text = items[index].querySelector('.checklist-text');
    if (box) { box.classList.toggle('checked', item.completed); box.textContent = item.completed ? '✓' : ''; }
    if (text) { text.classList.toggle('done', item.completed); }
  }
  updateSealButton();
  checkAndShowMasteryPopup();
}

function updateSealButton() {
  const room = state.currentRoom;
  if (!room) return;
  const total = room.checklist.length;
  const done = room.checklist.filter(i => i.completed).length;
  const pct = total > 0 ? done / total : 0;
  const threshold = room.isSideQuest ? 1.0 : 0.5;
  const canSeal = pct >= threshold;

  const btn = document.getElementById('seal-btn');
  if (btn) {
    btn.disabled = !canSeal;
    btn.style.opacity = canSeal ? '' : '0.3';
    btn.style.cursor = canSeal ? '' : 'not-allowed';
    btn.style.pointerEvents = canSeal ? '' : 'none';
  }

  // Update the progress hint below the buttons
  const thresholdLabel = room.isSideQuest ? '100%' : '50%';
  const btnRow = document.querySelector('.btn-row');
  if (btnRow) {
    let hint = btnRow.nextElementSibling;
    if (canSeal && hint && hint.textContent.includes('Complete at least')) {
      hint.remove();
    } else if (!canSeal) {
      if (!hint || !hint.textContent.includes('Complete at least')) {
        hint = document.createElement('div');
        hint.style.cssText = 'text-align:center; margin-top:8px; font-size:14px; color:var(--dim);';
        btnRow.parentNode.insertBefore(hint, btnRow.nextSibling);
      }
      hint.textContent = `Complete at least ${thresholdLabel} of tasks to seal (${Math.round(pct * 100)}% done)`;
    }
  }
}

function toggleBonus() {
  if (!state.currentRoom) return;
  state.currentRoom.bonusCompleted = !state.currentRoom.bonusCompleted;
  const done = state.currentRoom.bonusCompleted;

  const section = document.querySelector('.bonus-section');
  if (section) {
    const box = section.querySelector('.check-box');
    const text = section.querySelector('.checklist-text');
    if (box) { box.classList.toggle('checked', done); box.textContent = done ? '✓' : ''; }
    if (text) { text.classList.toggle('done', done); }
  }
  checkAndShowMasteryPopup();
}

function toggleDeferred(index) {
  state.deferredCurses[index].completed = !state.deferredCurses[index].completed;
  const done = state.deferredCurses[index].completed;

  const curses = document.querySelectorAll('.pending-curse');
  if (curses[index]) {
    const box = curses[index].querySelector('.check-box');
    const text = curses[index].querySelector('.pending-text');
    if (box) { box.classList.toggle('checked', done); box.textContent = done ? '✓' : ''; }
    if (text) { text.classList.toggle('done', done); }
    curses[index].classList.toggle('resolved', done);
  }

  // Update quest log toggle button pulse
  const toggle = document.getElementById('log-toggle');
  if (toggle) {
    const hasPending = state.deferredCurses.some(c => !c.completed);
    toggle.classList.toggle('has-curses', hasPending);
  }
}

// ════════════════════════════════════════════════════════
// ROOM MASTERY
// ════════════════════════════════════════════════════════

function checkRoomMastery() {
  const room = state.currentRoom;
  if (!room || !room.flavorRoll) return false;
  return room.checklist.every(c => c.completed)
      && room.bonusCompleted
      && state.rerollsUsedThisRoom === 0;
}

function checkAndShowMasteryPopup() {
  const room = state.currentRoom;
  if (!room || room._masteryShown) return;
  if (room.isSideQuest || room.isBoss) return;
  if (checkRoomMastery()) {
    room._masteryShown = true;
    showMasteryPopup();
  }
}

function showMasteryPopup() {
  // Remove existing popup if any
  const existing = document.querySelector('.mastery-popup');
  if (existing) existing.remove();

  const popup = document.createElement('div');
  popup.className = 'mastery-popup';
  popup.innerHTML = `<div class="mastery-popup-text">ROOM MASTERED</div>`;
  document.body.appendChild(popup);

  // Auto-dismiss after 1 second
  setTimeout(() => {
    if (popup.parentNode) popup.remove();
  }, 1200);
}

async function sealRoom() {
  if (!state.currentRoom) return;

  const allCompleted = state.currentRoom.checklist.every(item => item.completed);
  const isSideQuest = state.currentRoom.isSideQuest || false;
  const bonusCompleted = state.currentRoom.bonusCompleted || false;

  state.currentRoom.completed = true;
  state.rooms.push(state.currentRoom);

  // Mark map node as completed
  if (state.currentRoom.nodeId) {
    const node = getNodeById(state.currentRoom.nodeId);
    if (node) node.completed = true;
  }

  // Score tracking
  const d = diff();
  const scoreMult = (hasRelic('score_amplifier') ? 1.25 : 1) * (hasRelic('crown_of_the_ancients') ? 1.25 : 1);
  const completedChecks = state.currentRoom.checklist.filter(c => c.completed).length;
  state.score += Math.round(completedChecks * d.scorePerCheckbox * d.scoreMultiplier * scoreMult);
  state.score += Math.round(d.scorePerRoom * d.scoreMultiplier * scoreMult);
  if (isSideQuest) state.score += Math.round(d.scorePerSideQuest * d.scoreMultiplier * scoreMult);

  // Mastery detection (standard rooms only, not side quest or boss)
  const isBoss = state.currentRoom.isBoss || false;
  const isMastery = !isSideQuest && !isBoss && checkRoomMastery();

  let earnedReroll = false;
  let rerollCount = 0;
  let rollTarget = 0;
  let rollValue = 0;
  let masteryGoldBonus = 0;
  let masteryScoreBonus = 0;

  if (isMastery) {
    // Mastery: guaranteed reroll, bonus gold + score, no dice roll
    earnedReroll = true;
    rerollCount = 1;
    state.rerolls += 1;
    masteryGoldBonus = 15;
    state.gold += masteryGoldBonus;
    masteryScoreBonus = Math.round(50 * d.scoreMultiplier * scoreMult);
    state.score += masteryScoreBonus;
  } else if (allCompleted) {
    if (isSideQuest) {
      earnedReroll = true;
      rerollCount = 2;
      state.rerolls += 2;
    } else {
      rollTarget = bonusCompleted ? d.rerollBonusChance : d.rerollChance;
      // Relic: Lucky Die — +10% reroll success chance
      if (hasRelic('lucky_die')) rollTarget -= 10;
      // Relic: Crown of the Ancients — +10% reroll chance
      if (hasRelic('crown_of_the_ancients')) rollTarget -= 10;
      rollValue = roll(1, 100);
      earnedReroll = rollValue >= rollTarget;
      rerollCount = earnedReroll ? 1 : 0;
    }
  }

  // Relic: Completion Crown — +1 extra reroll on full completion
  let crownBonus = 0;
  if (allCompleted && hasRelic('completion_crown') && !isMastery) {
    crownBonus = 1;
    state.rerolls += 1;
  }

  // Completion streak tracking
  const streakThreshold = hasRelic('streak_talisman') ? 2 : 3;
  let streakReward = false;
  let streakCount = 0;
  if (allCompleted) {
    state.completionStreak++;
    streakCount = state.completionStreak;
    if (state.completionStreak >= streakThreshold) {
      streakReward = true;
      state.rerolls += 1;
      state.completionStreak = 0;
    }
  } else {
    state.completionStreak = 0;
  }

  // Curse survivor: completed room with 2+ curses
  let curseSurvivor = false;
  const lastRoom = state.rooms[state.rooms.length - 1];
  if (allCompleted && lastRoom && lastRoom.curses && lastRoom.curses.length >= 2) {
    curseSurvivor = true;
    state.rerolls += 1;
  }

  const bossBlessing = isBoss ? state.currentRoom.blessing : null;
  if (isBoss) state.score += Math.round(d.scorePerBoss * d.scoreMultiplier * scoreMult);

  state.transitionData = {
    roomName: state.currentRoom.name,
    roomNumber: state.currentRoom.number,
    allCompleted,
    isSideQuest,
    isBoss,
    bossBlessing,
    bonusCompleted,
    earnedReroll,
    rerollCount,
    rollTarget,
    rollValue,
    streakReward,
    streakCount,
    curseSurvivor,
    isMastery,
    masteryGoldBonus,
    masteryScoreBonus,
    crownBonus
  };

  state.currentRoom = null;
  state.roomPhase = 'transition';
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (allCompleted && !isSideQuest && !isBoss && !isMastery) {
    await animateSpell();
  }
}

async function animateSpell() {
  const decorGlyphs = ['✧','✦','✶','❋','✺','❈'];
  const spellEl = document.getElementById('spell-glyph');
  const container = document.getElementById('spell-container');
  if (!spellEl) return;

  const td = state.transitionData;
  const finalValue = td.rollValue;

  // Spawn small dust glyphs floating off the number
  const dustInterval = setInterval(() => {
    if (!container) return;
    const dust = document.createElement('span');
    dust.className = 'spell-dust';
    dust.textContent = pick(decorGlyphs);
    dust.style.left = (Math.random() * 60 + 20) + '%';
    dust.style.top = (Math.random() * 30 + 35) + '%';
    container.appendChild(dust);
    setTimeout(() => dust.remove(), 800);
  }, 100);

  // Cycle through random numbers 0-100 — fast and clean
  const steps = 18;
  for (let i = 0; i < steps; i++) {
    spellEl.textContent = Math.floor(Math.random() * 101);
    await sleep(40 + i * 5); // starts fast, slows slightly
  }

  clearInterval(dustInterval);

  // Land on the actual roll value
  spellEl.textContent = finalValue;
  spellEl.parentElement.classList.add('resolved');

  if (td.earnedReroll) {
    state.rerolls += td.rerollCount;
  }

  await sleep(300);

  const resultEl = document.getElementById('transition-result');
  if (resultEl) {
    resultEl.style.display = 'block';
    if (td.earnedReroll) {
      resultEl.className = 'transition-result earned';
      resultEl.innerHTML = 'REROLL EARNED! +1';
    } else {
      resultEl.className = 'transition-result denied';
      resultEl.innerHTML = 'THE SPIRITS DENY YOU';
    }
  }

  // Show streak banner
  if (td.streakReward) {
    const streakEl = document.getElementById('streak-banner');
    if (streakEl) { streakEl.style.display = 'block'; }
  }

  // Show curse survivor banner
  if (td.curseSurvivor) {
    const survivorEl = document.getElementById('survivor-banner');
    if (survivorEl) { survivorEl.style.display = 'block'; }
  }

  // Show double or nothing button (only on standard rooms where a reroll was earned)
  if (td.earnedReroll && !td.isBoss && !td.isSideQuest) {
    const donBtn = document.getElementById('don-btn');
    if (donBtn) donBtn.style.display = 'inline-block';
  }

  const continueEl = document.getElementById('transition-continue');
  if (continueEl) continueEl.style.display = 'block';

  const rerollDisplay = document.querySelector('.reroll-count');
  if (rerollDisplay) rerollDisplay.textContent = state.rerolls;
}

async function doubleOrNothing() {
  const btn = document.getElementById('don-btn');
  if (btn) btn.style.display = 'none';

  const continueEl = document.getElementById('transition-continue');
  if (continueEl) continueEl.style.display = 'none';

  const td = state.transitionData;
  const rollTarget = td.rollTarget;

  // Update header to show double or nothing phase
  const header = document.getElementById('transition-header');
  if (header) { header.textContent = 'DOUBLE OR NOTHING'; header.style.color = 'var(--gold)'; }

  const subtitle = document.getElementById('transition-subtitle');
  if (subtitle) subtitle.textContent = 'Risk your reroll for a chance at two...';

  // Hide streak line if present
  const streakLine = document.getElementById('streak-line');
  if (streakLine) streakLine.style.display = 'none';

  // Hide banners
  const streakBanner = document.getElementById('streak-banner');
  if (streakBanner) streakBanner.style.display = 'none';
  const survivorBanner = document.getElementById('survivor-banner');
  if (survivorBanner) survivorBanner.style.display = 'none';

  // Reset the roll info (reuse same rows)
  const rollInfo = document.getElementById('roll-info');
  if (rollInfo) {
    rollInfo.innerHTML = `
      <div class="roll-info-row"><span class="roll-info-label">CHANCE</span><span class="roll-info-value" style="color:var(--gold);">${101 - rollTarget}%</span></div>
      <div class="roll-info-row"><span class="roll-info-label">SUCCESS</span><span class="roll-info-value" style="color:var(--green);">${rollTarget} OR HIGHER</span></div>
    `;
  }

  // Hide rolled row and result from previous roll
  const rollRow = document.getElementById('roll-result-row');
  if (rollRow) rollRow.style.display = 'none';
  const resultEl = document.getElementById('transition-result');
  if (resultEl) resultEl.style.display = 'none';

  // Reset and re-animate the dice
  const container = document.getElementById('spell-container');
  const spellEl = document.getElementById('spell-glyph');
  if (!container || !spellEl) return;
  spellEl.textContent = '✧';
  spellEl.parentElement.classList.remove('resolved');

  const decorGlyphs = ['✧','✦','✶','❋','✺','❈'];

  const dustInterval = setInterval(() => {
    const dust = document.createElement('span');
    dust.className = 'spell-dust';
    dust.textContent = pick(decorGlyphs);
    dust.style.left = (Math.random() * 60 + 20) + '%';
    dust.style.top = (Math.random() * 30 + 35) + '%';
    container.appendChild(dust);
    setTimeout(() => dust.remove(), 800);
  }, 100);

  const steps = 18;
  for (let i = 0; i < steps; i++) {
    spellEl.textContent = Math.floor(Math.random() * 101);
    await sleep(40 + i * 5);
  }

  clearInterval(dustInterval);

  const finalValue = roll(1, 100);
  const won = finalValue >= rollTarget;

  spellEl.textContent = finalValue;
  spellEl.parentElement.classList.add('resolved');

  // Show rolled value in same row
  const rollVal = document.getElementById('roll-result-value');
  if (rollRow && rollVal) {
    rollVal.textContent = finalValue;
    rollRow.style.display = 'block';
  }

  await sleep(300);

  if (resultEl) {
    resultEl.style.display = 'block';
    if (won) {
      state.rerolls += 1;
      resultEl.className = 'transition-result earned';
      resultEl.innerHTML = 'DOUBLE! +2 REROLLS TOTAL';
    } else {
      state.rerolls -= 1;
      resultEl.className = 'transition-result denied';
      resultEl.innerHTML = 'NOTHING! REROLL LOST';
    }
  }

  if (continueEl) continueEl.style.display = 'block';

  const rerollDisplay = document.querySelector('.reroll-count');
  if (rerollDisplay) rerollDisplay.textContent = state.rerolls;
}

function continueFromTransition() {
  const td = state.transitionData;
  if (td && td.isBoss) {
    state.postBossCampfire = true;
    state.roomPhase = 'campfire';
    state.transitionData = null;
    render();
  } else {
    state.roomPhase = 'map';
    state.transitionData = null;
    render();
  }
}

function skipSideQuest() {
  if (!state.currentRoom || !state.currentRoom.isSideQuest) return;

  const room = state.currentRoom;

  const carriedCurses = room.curses.filter(c => c.type === 'carried').map(c => c.text);
  if (carriedCurses.length > 0) {
    state.nextRoomCurses.push(...carriedCurses);
  }

  if (room.newDeferredCurses && room.newDeferredCurses.length > 0) {
    state.deferredCurses = state.deferredCurses.filter(
      d => !room.newDeferredCurses.some(nd => nd.text === d.text && nd.fromRoom === d.fromRoom)
    );
  }

  if (room.newNextRoomCurses && room.newNextRoomCurses.length > 0) {
    for (const c of room.newNextRoomCurses) {
      const idx = state.nextRoomCurses.indexOf(c);
      if (idx > -1) state.nextRoomCurses.splice(idx, 1);
    }
  }

  state.usedRoomNames = state.usedRoomNames.filter(n => n !== room.name);

  if (room.blessing) {
    if (room.blessing.includes('re-roll token')) state.rerolls = Math.max(0, state.rerolls - 1);
    if (room.blessing.includes('NEXT room cannot be cursed')) state.shieldNextRoom = false;
  }

  state.currentRoom = null;
  state.roomPhase = 'map';
  render();
}

function collectChest() {
  if (!state.chestData || state.chestData.collected) return;
  state.chestData.collected = true;

  if (state.chestData.reward === 'reroll') {
    state.rerolls += 1;
  } else if (state.chestData.reward === 'blessing') {
    state.chestData.blessingText = pick(BLESSINGS);
  } else if (state.chestData.reward === 'shield') {
    state.shieldNextRoom = true;
  } else if (state.chestData.reward === 'relic') {
    const relic = pickSingleRelic();
    if (relic) {
      state.chestData.relicGranted = relic;
      state.relics.push(relic.id);
    } else {
      // Fallback if no relics left
      state.rerolls += 1;
      state.chestData.reward = 'reroll';
    }
  }
  render();
}

function proceedFromChest() {
  const pr = state.pendingRoom;
  if (!pr) return;

  state.currentRoom = generateRoom(pr.trackType, {
    isAlchemist: pr.isAlchemist, isBoss: pr.isBoss,
    isCursed: pr.isCursed || false, isSanctuary: pr.isSanctuary || false
  });
  state.currentRoom.isSideQuest = pr.isSideQuest;
  state.currentRoom.originalTrackType = pr.originalTrackType;
  state.currentRoom.nodeId = pr.nodeId || null;

  // If chest gave a blessing, add it to the room
  if (state.chestData && state.chestData.blessingText && !state.currentRoom.blessing) {
    state.currentRoom.blessing = state.chestData.blessingText;
    const b = state.currentRoom.blessing;
    if (b.includes('re-roll token') || b.includes('reroll token')) state.rerolls++;
    if (b.includes('NEXT room cannot be cursed')) state.shieldNextRoom = true;
  }

  // Apply pending blessing from road event (if no blessing yet)
  if (state.pendingBlessing) {
    if (!state.currentRoom.blessing) {
      state.currentRoom.blessing = pick(BLESSINGS);
      const b = state.currentRoom.blessing;
      if (b.includes('re-roll token') || b.includes('reroll token')) state.rerolls++;
      if (b.includes('NEXT room cannot be cursed')) state.shieldNextRoom = true;
    }
    state.pendingBlessing = false;
  }

  if (pr.isBoss) applyDeferredCursesToBoss(state.currentRoom);

  state.chestData = null;
  state.pendingRoom = null;
  state.rerollsUsedThisRoom = 0;
  state.roomPhase = 'active';
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function buyCampfireItem(type) {
  const curseRemovalCost = hasRelic('purifying_flame') ? 10 : 15;
  if (type === 'removeCurse' && state.gold >= curseRemovalCost) {
    const idx = state.deferredCurses.findIndex(c => !c.completed);
    if (idx > -1) {
      state.deferredCurses[idx].completed = true;
      state.gold -= curseRemovalCost;
    }
  } else if (type === 'shield' && state.gold >= 10) {
    state.shieldNextRoom = true;
    state.gold -= 10;
  } else if (type === 'reroll' && state.gold >= 20) {
    state.rerolls += 1;
    state.gold -= 20;
  } else if (type === 'removeNextRoom' && state.gold >= 12) {
    if (state.nextRoomCurses.length > 0) {
      state.nextRoomCurses.shift();
      state.gold -= 12;
    }
  } else if (type === 'buyRelic' && state.gold >= 50) {
    const relics = pickRelicsForChoice(2);
    if (relics.length > 0) {
      state.gold -= 50;
      state.pendingRelicChoice = { relics, source: 'campfire' };
      state.roomPhase = 'relic-choice';
      render();
      return;
    }
  }
  render();
}

function leaveCampfire() {
  if (state.postBossCampfire) {
    state.postBossCampfire = false;
    state.roomPhase = 'floor-complete';
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    state.roomPhase = 'map';
    render();
  }
}

function acceptRoadEvent() {
  const rd = state.roadEventData;
  if (!rd) return;

  const reward = rd.event.reward;

  // Apply reward
  if (reward.type === 'rerolls') {
    state.rerolls += reward.value;
  } else if (reward.type === 'gold') {
    state.gold += reward.value;
  } else if (reward.type === 'shield') {
    state.shieldNextRoom = true;
  } else if (reward.type === 'blessing') {
    state.pendingBlessing = true;
  } else if (reward.type === 'relic') {
    const relic = pickSingleRelic();
    if (relic) {
      state.relics.push(relic.id);
    }
  }

  // Track accepted events for the session log
  if (!state.acceptedEvents) state.acceptedEvents = [];
  state.acceptedEvents.push({ name: rd.event.name, cost: rd.event.cost, reward: reward.text });

  // Continue to room (same flow as normal entry)
  continueFromRoadEvent(rd.pendingRoom);
}

function declineRoadEvent() {
  const rd = state.roadEventData;
  if (!rd) return;
  continueFromRoadEvent(rd.pendingRoom);
}

function continueFromRoadEvent(pending) {
  state.roadEventData = null;
  const node = getNodeById(pending.nodeId);

  // Check for chest (same roll as normal flow)
  const chestChanceRoad = diff().chestChance + (hasRelic('thiefs_glove') ? 5 : 0) + (hasRelic('gamblers_coin') ? 5 : 0);
  if (!pending.isBoss && node.type !== 'campfire' && chance(chestChanceRoad)) {
    const hasAvailableRelics = getAvailableRelics().length > 0;
    state.chestData = {
      message: pick(CHEST_MESSAGES),
      reward: weightedPick([
        { value: 'reroll', weight: 35 },
        { value: 'blessing', weight: 30 },
        { value: 'shield', weight: 25 },
        { value: 'relic', weight: hasAvailableRelics ? 10 : 0 }
      ]),
      collected: false
    };
    state.pendingRoom = pending;
    state.roomPhase = 'chest';
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  // Generate room
  const opts = { isAlchemist: pending.isAlchemist, isBoss: pending.isBoss, isCursed: pending.isCursed, isSanctuary: pending.isSanctuary };
  state.currentRoom = generateRoom(pending.trackType, opts);
  state.currentRoom.isSideQuest = pending.isSideQuest;
  state.currentRoom.originalTrackType = pending.originalTrackType;
  state.currentRoom.nodeId = pending.nodeId;
  if (pending.isBoss) {
    state.rerolls += 2;
    applyDeferredCursesToBoss(state.currentRoom);
  }

  // Apply pending blessing from road event
  if (state.pendingBlessing) {
    if (!state.currentRoom.blessing) {
      state.currentRoom.blessing = pick(BLESSINGS);
      const b = state.currentRoom.blessing;
      if (b.includes('re-roll token') || b.includes('reroll token')) state.rerolls++;
      if (b.includes('NEXT room cannot be cursed')) state.shieldNextRoom = true;
    }
    state.pendingBlessing = false;
  }

  state.rerollsUsedThisRoom = 0;
  state.roomPhase = 'active';
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showHelp() {
  document.getElementById('help-overlay').style.display = 'flex';
}

function hideHelp() {
  document.getElementById('help-overlay').style.display = 'none';
}

function endSession() {
  const totalRooms = state.rooms.length;
  const totalCurses = state.rooms.reduce((s, r) => s + r.curses.length, 0);
  const totalEffects = state.rooms.reduce((s, r) => s + r.effects.length, 0);
  const totalBlessings = state.rooms.filter(r => r.blessing).length;
  const pendingCurses = state.deferredCurses.filter(c => !c.completed).length;
  const sideQuestsCompleted = state.rooms.filter(r => r.isSideQuest).length;
  const bossesDefeated = state.rooms.filter(r => r.isBoss).length;

  app.innerHTML = `
    <div class="screen active" style="max-width:800px; margin:0 auto; padding-top:40px;">
      <div class="panel" style="text-align:center; padding:40px 30px;">
        <div style="font-family:var(--font-pixel); font-size:12px; color:var(--dim); margin-bottom:16px; letter-spacing:3px;">* * *</div>
        <div class="title-main" style="font-size:22px; margin-bottom:8px;">SESSION COMPLETE</div>
        <div class="title-divider"></div>

        <div style="margin:30px 0;">
          <div class="song-info-item" style="font-size:14px; margin:10px 0;">KEY <span style="font-size:18px;">${state.key} ${state.scale}</span></div>
          <div class="song-info-item" style="font-size:14px; margin:10px 0;">BPM <span style="font-size:18px;">${state.bpm}</span></div>
          <div class="song-info-item" style="font-size:14px; margin:10px 0; color:${{easy:'var(--green)',normal:'var(--text)',hard:'var(--orange)',nightmare:'var(--red)'}[state.difficulty]};">DIFFICULTY <span style="font-size:14px;">${diff().label}</span></div>
          ${state.seed ? `<div class="song-info-item" style="font-size:14px; margin:10px 0;">SEED <span style="font-size:14px;">${state.seed}</span></div>` : ''}
          <div class="song-info-item" style="font-size:14px; margin:10px 0;">GOLD <span style="font-size:18px; color:var(--gold);">${state.gold}g</span></div>
          <div class="song-info-item" style="font-size:14px; margin:10px 0;">SCORE <span style="font-size:18px; color:var(--purple);">${state.score}</span></div>
        </div>

        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap:16px; margin:30px 0; text-align:center;">
          <div class="panel panel-accent">
            <div style="font-family:var(--font-pixel); font-size:24px; color:var(--gold);">${totalRooms}</div>
            <div style="font-size:13px; color:var(--dim); margin-top:4px;">Rooms Cleared</div>
          </div>
          <div class="panel panel-accent">
            <div style="font-family:var(--font-pixel); font-size:24px; color:var(--red);">${totalCurses}</div>
            <div style="font-size:13px; color:var(--dim); margin-top:4px;">Curses Endured</div>
          </div>
          <div class="panel panel-accent">
            <div style="font-family:var(--font-pixel); font-size:24px; color:var(--purple);">${totalEffects}</div>
            <div style="font-size:13px; color:var(--dim); margin-top:4px;">Effects Applied</div>
          </div>
          <div class="panel panel-accent">
            <div style="font-family:var(--font-pixel); font-size:24px; color:var(--green);">${totalBlessings}</div>
            <div style="font-size:13px; color:var(--dim); margin-top:4px;">Blessings Received</div>
          </div>
          ${bossesDefeated > 0 ? `
            <div class="panel panel-accent">
              <div style="font-family:var(--font-pixel); font-size:24px; color:var(--red);">${bossesDefeated}</div>
              <div style="font-size:13px; color:var(--dim); margin-top:4px;">Bosses Defeated</div>
            </div>
          ` : ''}
          ${sideQuestsCompleted > 0 ? `
            <div class="panel panel-accent">
              <div style="font-family:var(--font-pixel); font-size:24px; color:var(--orange);">${sideQuestsCompleted}</div>
              <div style="font-size:13px; color:var(--dim); margin-top:4px;">Side Quests</div>
            </div>
          ` : ''}
          ${state.relics.length > 0 ? `
            <div class="panel panel-accent">
              <div style="font-family:var(--font-pixel); font-size:24px; color:var(--purple);">${state.relics.length}</div>
              <div style="font-size:13px; color:var(--dim); margin-top:4px;">Relics Found</div>
            </div>
          ` : ''}
          <div class="panel panel-accent">
            <div style="font-family:var(--font-pixel); font-size:24px; color:var(--gold);">${state.gold}g</div>
            <div style="font-size:13px; color:var(--dim); margin-top:4px;">Gold Earned</div>
          </div>
          <div class="panel panel-accent">
            <div style="font-family:var(--font-pixel); font-size:24px; color:var(--teal);">${state.floor}</div>
            <div style="font-size:13px; color:var(--dim); margin-top:4px;">Floors Explored</div>
          </div>
          <div class="panel panel-accent">
            <div style="font-family:var(--font-pixel); font-size:24px; color:var(--purple);">${state.score}</div>
            <div style="font-size:13px; color:var(--dim); margin-top:4px;">Final Score</div>
          </div>
        </div>

        ${pendingCurses > 0 ? `
          <div style="color:var(--red); margin:16px 0; font-size:15px;">
            WARNING: ${pendingCurses} deferred curse${pendingCurses > 1 ? 's' : ''} still incomplete!
          </div>
        ` : ''}

        <div style="margin:30px 0; text-align:left;">
          <div class="panel-header">Tracklist</div>
          ${state.rooms.map(r => {
            const tag = r.isBoss ? 'BOSS' : r.isSideQuest ? 'SIDE QUEST' : r.isAlchemist ? 'ALCHEMIST' : r.isYouTube ? 'YOUTUBE' : '';
            const tagColor = r.isBoss ? 'var(--red)' : r.isSideQuest ? 'var(--orange)' : r.isAlchemist ? 'var(--teal)' : r.isYouTube ? 'var(--youtube-red)' : '';
            return `
            <div style="padding:12px 0; border-bottom:1px solid var(--border);">
              <div style="display:flex; align-items:baseline; gap:8px; margin-bottom:4px;">
                <span style="font-family:var(--font-pixel); font-size:11px; color:var(--gold);">#${r.number} ${r.trackType.toUpperCase()}</span>
                ${tag ? `<span style="font-family:var(--font-pixel); font-size:9px; color:${tagColor}; letter-spacing:1px;">${tag}</span>` : ''}
              </div>
              <div style="color:var(--teal); font-size:15px; margin-bottom:2px;">${r.genre}${r.sampleType ? ' (' + r.sampleType + ')' : ''}</div>
              ${r.curses.map(c => `<div style="color:var(--red); font-size:14px; padding-left:12px;">Curse: ${c.text}</div>`).join('')}
              ${r.effects.map(e => `<div style="color:var(--blue); font-size:14px; padding-left:12px;">Effect: ${e.name} @ ${e.percentage}%</div>`).join('')}
              ${r.blessing ? `<div style="color:var(--green); font-size:14px; padding-left:12px;">Blessing: ${r.blessing}</div>` : ''}
              ${r.flavorRoll ? `<div style="color:var(--gold-dim); font-size:13px; padding-left:12px;">${r.flavorRoll.label}: ${r.flavorRoll.text} ${r.bonusCompleted ? '<span style="color:var(--green);">(done)</span>' : '<span style="opacity:0.4;">(skipped)</span>'}</div>` : ''}
            </div>`;
          }).join('')}
        </div>

        ${state.deferredCurses.length > 0 ? `
          <div style="margin:20px 0; text-align:left;">
            <div class="panel-header" style="color:var(--red);">Deferred Curses</div>
            ${state.deferredCurses.map(c => `
              <div style="padding:4px 0; color:${c.completed ? 'var(--dim)' : 'var(--red)'}; ${c.completed ? 'text-decoration:line-through;' : ''} font-size:14px;">
                ${c.completed ? '[x]' : '[ ]'} ${c.text}
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${state.relics.length > 0 ? `
          <div style="margin:20px 0; text-align:left;">
            <div class="panel-header" style="color:var(--purple);">Relics Collected</div>
            ${state.relics.map(id => {
              const r = getRelic(id);
              if (!r) return '';
              const tierInfo = RELIC_TIERS[r.tier];
              return `
                <div class="relic-log-item">
                  <div>
                    <div style="color:${tierInfo.color}; font-size:15px;">${r.name} <span style="font-size:10px; opacity:0.6; text-transform:uppercase; letter-spacing:1px;">${tierInfo.label}</span></div>
                    <div style="color:var(--dim); font-size:13px;">${r.description}</div>
                  </div>
                </div>`;
            }).join('')}
          </div>
        ` : ''}

        <div style="margin-top:30px; display:flex; gap:12px; justify-content:center; flex-wrap:wrap;">
          <button class="btn" onclick="newSession()">NEW SESSION</button>
          <button class="btn btn-small" onclick="exportLog()">COPY BEAT SHEET</button>
          <button class="btn btn-small" onclick="downloadBeatSheet()">SAVE AS FILE</button>
        </div>
      </div>
    </div>
  `;
}

function newSession() {
  state = {
    screen: 'title', key: null, scale: null, bpm: 128,
    difficulty: null, rerolls: 1, rooms: [], currentRoom: null,
    roomPhase: 'map', transitionData: null, deferredCurses: [],
    nextRoomCurses: [], completionStreak: 0, shieldNextRoom: false, usedRoomNames: [],
    seed: null, seedMode: 'daily', gold: 0, score: 0, chestData: null, pendingRoom: null,
    roadEventData: null, acceptedEvents: [], pendingBlessing: false, postBossCampfire: false,
    floor: 1, map: null, currentNodeId: null, floorHistory: [], setupStep: 1,
    relics: [], relicUses: {}, pendingRelicChoice: null, pendingRelicRoom: null, rerollsUsedThisRoom: 0
  };
  render();
}

function generateBeatSheet() {
  let sheet = '';
  sheet += `NECRODANCER BEAT SHEET\n`;
  sheet += `${'═'.repeat(44)}\n\n`;
  sheet += `Key: ${state.key} ${state.scale}    BPM: ${state.bpm}\n`;
  sheet += `Difficulty: ${diff().label}    Seed: ${state.seed || 'daily'}\n`;
  sheet += `Score: ${state.score}    Gold: ${state.gold}g\n`;
  sheet += `Floors: ${state.floor}    Rooms: ${state.rooms.length}\n\n`;
  sheet += `${'─'.repeat(44)}\n`;
  sheet += `TRACKLIST\n`;
  sheet += `${'─'.repeat(44)}\n\n`;

  for (const room of state.rooms) {
    const tag = room.isBoss ? ' [BOSS]' : room.isSideQuest ? ' [SIDE QUEST]' : room.isAlchemist ? ' [ALCHEMIST]' : room.isYouTube ? ' [YOUTUBE]' : '';
    sheet += `#${room.number} ${room.trackType.toUpperCase()}${tag}\n`;
    sheet += `   Genre: ${room.genre}`;
    if (room.sampleType) sheet += ` (${room.sampleType})`;
    sheet += `\n`;
    if (room.curses.length > 0) {
      for (const c of room.curses) sheet += `   Curse: ${c.text}\n`;
    }
    if (room.effects.length > 0) {
      for (const e of room.effects) sheet += `   Effect: ${e.name} @ ${e.percentage}%\n`;
    }
    if (room.blessing) sheet += `   Blessing: ${room.blessing}\n`;
    if (room.flavorRoll) sheet += `   Bonus: ${room.flavorRoll.label}: ${room.flavorRoll.text} ${room.bonusCompleted ? '(done)' : '(skipped)'}\n`;
    sheet += `\n`;
  }

  if (state.deferredCurses.length > 0) {
    sheet += `${'─'.repeat(44)}\n`;
    sheet += `DEFERRED CURSES\n`;
    sheet += `${'─'.repeat(44)}\n`;
    for (const c of state.deferredCurses) {
      sheet += `${c.completed ? '[x]' : '[ ]'} ${c.text}\n`;
    }
    sheet += `\n`;
  }

  if (state.acceptedEvents && state.acceptedEvents.length > 0) {
    sheet += `${'─'.repeat(44)}\n`;
    sheet += `ROAD EVENT DEALS\n`;
    sheet += `${'─'.repeat(44)}\n`;
    for (const ev of state.acceptedEvents) {
      sheet += `${ev.name} (${ev.reward})\n`;
      sheet += `   Cost: ${ev.cost}\n`;
    }
    sheet += `\n`;
  }

  if (state.relics.length > 0) {
    sheet += `${'─'.repeat(44)}\n`;
    sheet += `RELICS COLLECTED\n`;
    sheet += `${'─'.repeat(44)}\n`;
    for (const id of state.relics) {
      const r = getRelic(id);
      if (r) sheet += `${r.icon} ${r.name} — ${r.description}\n`;
    }
    sheet += `\n`;
  }

  sheet += `${'═'.repeat(44)}\n`;
  sheet += `Generated by NECRODANCER - Production Dungeon Crawler\n`;

  return sheet;
}

function exportLog() {
  const sheet = generateBeatSheet();
  navigator.clipboard.writeText(sheet).then(() => {
    const btn = document.querySelector('[onclick="exportLog()"]');
    if (btn) { btn.textContent = 'COPIED!'; setTimeout(() => { btn.textContent = 'COPY BEAT SHEET'; }, 2000); }
  });
}

function downloadBeatSheet() {
  const sheet = generateBeatSheet();
  const blob = new Blob([sheet], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const dateStr = new Date().toISOString().slice(0, 10);
  a.download = `necrodancer-${state.key}-${state.scale}-${state.bpm}bpm-${dateStr}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ════════════════════════════════════════════════════════
// ROOM ELEMENT REROLLS
// ════════════════════════════════════════════════════════

function rebuildGenreDirective(room) {
  if (room.isAlchemist) return room.genreDirective;
  return buildGenreDirective({
    trackType: room.trackType,
    genre: room.genre,
    sampleType: room.sampleType,
    isMulti: ['Drums', 'Percussion'].includes(room.trackType),
    isOpenDirective: ['Foley / Found Sound'].includes(room.trackType),
    isAlchemist: room.isAlchemist,
    isYouTube: room.isYouTube
  });
}

function rerollSampleType() {
  const room = state.currentRoom;
  if (!room || state.rerolls <= 0 || room.isAlchemist) return;
  // Relic: Metronome of Mercy — first room reroll each floor is free
  if (hasRelic('metronome_of_mercy') && !relicUsedThisFloor('metronome_of_mercy')) {
    markRelicUsed('metronome_of_mercy');
  } else {
    state.rerolls--;
  }
  state.rerollsUsedThisRoom++;
  room.sampleType = pick(SAMPLE_TYPES[room.trackType] || ['sample']);
  room.genreDirective = rebuildGenreDirective(room);
  room.checklist[0].text = room.genreDirective;
  render();
}

function rerollGenre() {
  const room = state.currentRoom;
  if (!room || state.rerolls <= 0 || room.isAlchemist) return;
  if (hasRelic('metronome_of_mercy') && !relicUsedThisFloor('metronome_of_mercy')) {
    markRelicUsed('metronome_of_mercy');
  } else {
    state.rerolls--;
  }
  state.rerollsUsedThisRoom++;
  room.genre = pickGenreForDifficulty(room.trackType);
  room.genreDirective = rebuildGenreDirective(room);
  room.checklist[0].text = room.genreDirective;
  // Re-pick flavor to match the new genre
  room.flavorRoll = pickCompatibleFlavor(room.trackType, room.genre, room.isAlchemist);
  render();
}

function rerollCurse(index) {
  const room = state.currentRoom;
  if (!room || state.rerolls <= 0) return;
  const curse = room.curses[index];
  if (!curse || curse.type === 'carried' || curse.type === 'deferred-forced') return;
  if (hasRelic('metronome_of_mercy') && !relicUsedThisFloor('metronome_of_mercy')) {
    markRelicUsed('metronome_of_mercy');
  } else {
    state.rerolls--;
  }
  state.rerollsUsedThisRoom++;

  let pool;
  if (curse.type === 'immediate') {
    pool = CURSES_IMMEDIATE;
  } else if (curse.type === 'track') {
    pool = TRACK_CURSES[room.trackType] || CURSES_IMMEDIATE;
  } else if (curse.type === 'boss-curse') {
    pool = state.difficulty === 'nightmare' ? BOSS_CURSES_NIGHTMARE : BOSS_CURSES;
  } else {
    return;
  }

  const otherTexts = room.curses.filter((_, i) => i !== index).map(c => c.text);
  let newText;
  let attempts = 0;
  do { newText = pick(pool); attempts++; } while (otherTexts.includes(newText) && attempts < 20);

  curse.text = newText;

  // Update matching checklist entry
  const clEntry = room.checklist.find(c => c.id === 'curse-' + index);
  if (clEntry) clEntry.text = newText;

  render();
}

function rerollEffect(index) {
  const room = state.currentRoom;
  if (!room || state.rerolls <= 0) return;
  const effect = room.effects[index];
  if (!effect) return;
  if (hasRelic('metronome_of_mercy') && !relicUsedThisFloor('metronome_of_mercy')) {
    markRelicUsed('metronome_of_mercy');
  } else {
    state.rerolls--;
  }
  state.rerollsUsedThisRoom++;

  const NEEDS_PREVIOUS_TRACK = ['Sidechain Compression'];
  const isFirstRoom = state.rooms.length === 0;
  const prevTracks = state.rooms.map(r => r.trackType);
  const otherNames = room.effects.filter((_, i) => i !== index).map(e => e.name.replace(/\s*\(keyed to .*?\)/, ''));

  let eff;
  let attempts = 0;
  do {
    eff = pick(EFFECTS);
    attempts++;
  } while (
    (otherNames.includes(eff) || (isFirstRoom && NEEDS_PREVIOUS_TRACK.includes(eff))) && attempts < 20
  );

  let effName = eff;
  if (eff === 'Sidechain Compression' && prevTracks.length > 0) {
    const target = prevTracks.includes('Drums') ? 'Drums'
      : prevTracks.includes('808') ? '808'
      : prevTracks.includes('Percussion') ? 'Percussion'
      : prevTracks[prevTracks.length - 1];
    effName = `Sidechain Compression (keyed to ${target})`;
  }

  effect.name = effName;
  effect.percentage = roll(...diff().effectRange);

  // Update matching checklist entry
  const clEntry = room.checklist.find(c => c.id === 'fx-' + index);
  if (clEntry) clEntry.text = `${effName} at ${effect.percentage}% wet`;

  render();
}

// ════════════════════════════════════════════════════════
// INIT
// ════════════════════════════════════════════════════════

// Redraw map connections on window resize so lines stay aligned with nodes
let _resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(_resizeTimer);
  _resizeTimer = setTimeout(() => {
    if (state.roomPhase === 'map') drawMapConnections();
  }, 50);
});

// Tooltip repositioning — prevent tooltips from going off-screen
document.addEventListener('mouseenter', (e) => {
  // Handle .info-tip tooltips
  const infoTip = e.target.closest('.info-tip');
  if (infoTip) {
    const tip = infoTip.querySelector('.info-tip-content');
    if (!tip) return;
    // Reset classes before measuring
    tip.classList.remove('tip-below', 'tip-left', 'tip-right');
    // Brief display to measure
    tip.style.display = 'block';
    const rect = tip.getBoundingClientRect();
    tip.style.display = '';
    // Vertical: flip below if clipped at top
    if (rect.top < 0) tip.classList.add('tip-below');
    // Horizontal: nudge if clipped
    if (rect.left < 0) tip.classList.add('tip-left');
    else if (rect.right > window.innerWidth) tip.classList.add('tip-right');
  }
  // Handle .map-node tooltips
  const mapNode = e.target.closest('.map-node');
  if (mapNode) {
    const tip = mapNode.querySelector('.map-tooltip');
    if (!tip) return;
    tip.classList.remove('tip-below', 'tip-left', 'tip-right');
    tip.style.display = 'block';
    const rect = tip.getBoundingClientRect();
    tip.style.display = '';
    if (rect.top < 0) tip.classList.add('tip-below');
    if (rect.left < 0) tip.classList.add('tip-left');
    else if (rect.right > window.innerWidth) tip.classList.add('tip-right');
  }
}, true);

render();
