// ════════════════════════════════════════════════════════
// EVENT HANDLERS
// ════════════════════════════════════════════════════════

function startSetup() {
  clearSave();
  state.screen = 'setup';
  state.setupStep = 1;
  state.key = null;
  state.scale = null;
  state.difficulty = null;
  state.seedMode = 'daily';
  state.seed = null;
  state.spliceRatio = 50;
  state.challengeMods = [];
  render();
}

function generateCampfireStock() {
  state.campfireStock = {
    shield: roll(1, 3),
    reroll: roll(1, 3),
    removeCurse: 99,  // unlimited — depends on having deferred curses
    removeNextRoom: 99,
    relic: 1
  };
}

function toggleChallenge(id) {
  if (state.challengeMods.includes(id)) {
    state.challengeMods = state.challengeMods.filter(m => m !== id);
  } else {
    state.challengeMods.push(id);
  }
}

function continueSavedGame() {
  if (loadGame()) {
    render();
    // Redraw map connections if on the map screen
    if (state.roomPhase === 'map') {
      setTimeout(() => { if (typeof drawMapConnections === 'function') drawMapConnections(); }, 50);
    }
  } else {
    // Save was invalid, fall back to new session
    startSetup();
  }
}

function useSkeletonKey() {
  const profile = getProfile();
  if (!profile.skeletonKeys || profile.skeletonKeys <= 0) return;

  // Replace the roll area with key/scale selectors
  const display = document.getElementById('key-display');
  const btnRow = display ? display.nextElementSibling : null;
  if (!display) return;

  display.innerHTML = `
    <div style="display:flex; gap:12px; align-items:center; justify-content:center;">
      <select id="skeleton-key-select" class="bpm-input" style="width:80px; font-size:16px; cursor:pointer;">
        ${KEYS.map(k => `<option value="${k}">${k}</option>`).join('')}
      </select>
      <select id="skeleton-scale-select" class="bpm-input" style="width:120px; font-size:16px; cursor:pointer;">
        ${SCALES.map(s => `<option value="${s}">${s}</option>`).join('')}
      </select>
    </div>
  `;
  display.classList.remove('rolling');

  if (btnRow) {
    btnRow.innerHTML = `
      <button class="btn btn-small" onclick="confirmSkeletonKey()">CONFIRM</button>
    `;
  }
}

function confirmSkeletonKey() {
  const keyEl = document.getElementById('skeleton-key-select');
  const scaleEl = document.getElementById('skeleton-scale-select');
  if (!keyEl || !scaleEl) return;

  state.key = keyEl.value;
  state.scale = scaleEl.value;

  // Consume the skeleton key
  const profile = getProfile();
  profile.skeletonKeys = Math.max(0, (profile.skeletonKeys || 0) - 1);
  saveProfile(profile);

  if (state.setupStep < 2) state.setupStep = 2;
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
  state.rerolls = hasChallenge('no_rerolls') ? 0 : diff().startingRerolls;
  state.floor = 1;
  state.score = 0;
  state.floorTheme = null; // Floor 1 has no theme
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
  // Block entry if deferred curses or road event debts are pending
  const pendingDeferred = state.deferredCurses.filter(c => !c.completed).length;
  const pendingDebts = (state.acceptedEvents || []).filter(e => e.cost && !e.completed).length;
  if (pendingDeferred > 0 || pendingDebts > 0) {
    const warn = document.getElementById('boss-block-warning');
    if (warn) {
      const parts = [];
      if (pendingDeferred > 0) parts.push(pendingDeferred + ' deferred curse' + (pendingDeferred > 1 ? 's' : ''));
      if (pendingDebts > 0) parts.push(pendingDebts + ' road event debt' + (pendingDebts > 1 ? 's' : ''));
      warn.textContent = 'You cannot enter the boss fight until you complete: ' + parts.join(' and ');
      warn.style.display = 'block';
    }
    return;
  }

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

let _blockNextEnter = false;

function enterNodeFromMap(nodeId) {
  if (_blockNextEnter) { _blockNextEnter = false; return; }
  const node = getNodeById(nodeId);
  if (!node || node.completed) return;

  const reachable = getReachableNodes();
  if (!reachable.includes(nodeId)) return;

  state.currentNodeId = nodeId;

  // Campfire nodes go straight to campfire shop
  if (node.type === 'campfire') {
    node.completed = true;
    generateCampfireStock();
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
  const allRelics = [...RELICS, ...(RELICS_PRODUCTION || []), ...(RELICS_SPLICE || [])];
  return allRelics.filter(r => {
    if (state.relics.includes(r.id)) return false;
    if (r.mode && !runHasMode(r.mode)) return false;
    return true;
  });
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
      pendingRoom: { trackType, isSideQuest, originalTrackType, isAlchemist, isBoss, nodeId: node.id, isCursed, isSanctuary, preview: node.preview }
    };
    state.roomPhase = 'road-event';
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  // Ambush roll (non-boss, non-campfire, requires 3+ completed rooms on floor 1, any after)
  const ambushChance = diff().ambushChance || 0;
  const ambushEligible = !isBoss && node.type !== 'campfire' && (state.floor > 1 || state.rooms.length >= 3);
  if (ambushEligible && chance(ambushChance)) {
    state.ambushData = {
      phase: 'stake',  // 'stake' → 'active'
      pendingRoom: { trackType, isSideQuest, originalTrackType, isAlchemist, isBoss, nodeId: node.id, isCursed, isSanctuary, preview: node.preview }
    };
    state.roomPhase = 'ambush';
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
    state.pendingRoom = { trackType, isSideQuest, originalTrackType, isAlchemist, isBoss, nodeId: node.id, isCursed, isSanctuary, preview: node.preview };
    state.roomPhase = 'chest';
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  const opts = { isAlchemist, isBoss, isCursed, isSanctuary, preview: node.preview };
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
  state.spiritWalkActive = false;
  state.floorTheme = (typeof pickFloorTheme === 'function') ? pickFloorTheme(state.floor) : null;
  // Use pre-generated map from room trading peek, or generate fresh
  if (state.nextFloorMap) {
    state.map = state.nextFloorMap;
    state.nextFloorMap = null;
  } else {
    state.map = generateFloorMap(state.floor);
  }
  state.currentNodeId = null;
  state.roomPhase = 'map';
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function peekNextFloor() {
  if (state.gold < 45 || !state.postBossCampfire) return;
  state.gold -= 45;
  // Pre-generate the next floor's map
  state.nextFloorMap = generateFloorMap(state.floor + 1);
  render();
}

function swapFloorRows() {
  if (!state.nextFloorMap || state.nextFloorMap.rows.length < 4) return;
  // Swap rows 1 and 2 (first two choice rows after start)
  const temp = state.nextFloorMap.rows[1];
  state.nextFloorMap.rows[1] = state.nextFloorMap.rows[2];
  state.nextFloorMap.rows[2] = temp;
  // Update node IDs to match new positions
  state.nextFloorMap.rows[1].forEach((node, i) => { node.id = '1-' + i; });
  state.nextFloorMap.rows[2].forEach((node, i) => { node.id = '2-' + i; });
  // Regenerate connections since row contents changed
  state.nextFloorMap.connections = generateMapConnections(state.nextFloorMap.rows);
  render();
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
  saveGame();
}

function updateSealButton() {
  const room = state.currentRoom;
  if (!room) return;
  const total = room.checklist.length;
  const done = room.checklist.filter(i => i.completed).length;
  const required = room.isSideQuest ? total : Math.max(1, total - 1);
  const canSeal = done >= required;

  const btn = document.getElementById('seal-btn');
  if (btn) {
    btn.disabled = !canSeal;
    btn.style.opacity = canSeal ? '' : '0.3';
    btn.style.cursor = canSeal ? '' : 'not-allowed';
    btn.style.pointerEvents = canSeal ? '' : 'none';
  }

  // Update the progress hint below the buttons
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
      hint.textContent = `Complete at least ${required} of ${total} tasks to seal (${done} done)`;
    }
  }
}

function updateEffectSlider(index, value) {
  const room = state.currentRoom;
  if (!room || !room.enchantersFreedom) return;
  const effect = room.effects[index];
  if (!effect) return;
  const tol = 10;
  effect.min = Math.max(0, value - tol);
  effect.max = Math.min(100, value + tol);
  const range = document.getElementById('effect-range-' + index);
  const pct = document.getElementById('effect-pct-' + index);
  if (range) { range.style.left = effect.min + '%'; range.style.width = (effect.max - effect.min) + '%'; }
  if (pct) pct.textContent = effect.min + '–' + effect.max + '%';
  // Update checklist text (data and DOM)
  const clEntry = room.checklist.find(c => c.id === 'fx-' + index);
  if (clEntry) {
    clEntry.text = effect.name + ' at ' + effect.min + '\u2013' + effect.max + '% wet';
    // Update the visible checklist item
    const items = document.querySelectorAll('.room-main .checklist-item');
    const clIdx = room.checklist.indexOf(clEntry);
    if (clIdx >= 0 && items[clIdx]) {
      const textEl = items[clIdx].querySelector('.checklist-text');
      if (textEl) textEl.innerHTML = clEntry.text;
    }
  }
}

function updateRoomNotes(value) {
  if (state.currentRoom) state.currentRoom.notes = value;
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
  saveGame();
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

  updatePendingUI();
  saveGame();
}

function toggleEventDebt(index) {
  if (!state.acceptedEvents) return;
  const costEvents = state.acceptedEvents.filter(e => e.cost);
  if (!costEvents[index]) return;
  costEvents[index].completed = !costEvents[index].completed;
  const done = costEvents[index].completed;

  // Targeted DOM update — find debt entries in the Road Event Debts section
  const debtSection = document.querySelectorAll('.pending-section');
  let debtEntries = null;
  for (const section of debtSection) {
    const header = section.querySelector('.panel-header');
    if (header && header.textContent.includes('Road Event Debts')) {
      debtEntries = section.querySelectorAll('.pending-curse');
      break;
    }
  }
  if (debtEntries && debtEntries[index]) {
    const box = debtEntries[index].querySelector('.check-box');
    const text = debtEntries[index].querySelector('.pending-text');
    if (box) { box.classList.toggle('checked', done); box.textContent = done ? '✓' : ''; }
    if (text) { text.classList.toggle('done', done); }
    debtEntries[index].classList.toggle('resolved', done);
  }

  updatePendingUI();
  saveGame();
}

function updatePendingUI() {
  const pendingDeferred = state.deferredCurses.filter(c => !c.completed).length;
  const pendingDebts = (state.acceptedEvents || []).filter(e => e.cost && !e.completed).length;
  const totalPending = pendingDeferred + pendingDebts;

  // Update quest log toggle button pulse
  const toggle = document.getElementById('log-toggle');
  if (toggle) {
    toggle.classList.toggle('has-curses', totalPending > 0);
  }

  // Update or remove the reminder banner in the room view
  const reminder = document.querySelector('.pending-reminder');
  if (reminder) {
    if (totalPending === 0) {
      reminder.remove();
    } else {
      const parts = [];
      if (pendingDeferred > 0) parts.push(`${pendingDeferred} deferred curse${pendingDeferred > 1 ? 's' : ''}`);
      if (pendingDebts > 0) parts.push(`${pendingDebts} road event debt${pendingDebts > 1 ? 's' : ''}`);
      reminder.textContent = `Reminder: You have ${parts.join(' and ')} in your quest log.`;
    }
  }

  // Also update the boss warning if present
  const warning = document.querySelector('.deferred-warning');
  if (warning && !warning.textContent.includes('applied') && totalPending === 0) {
    warning.remove();
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

  // Insert after the seal button row so it appears below it in flow
  const sealBtn = document.getElementById('seal-btn');
  const btnRow = sealBtn && sealBtn.closest('.btn-row');
  if (btnRow) {
    btnRow.parentNode.insertBefore(popup, btnRow.nextSibling);
  } else {
    document.body.appendChild(popup);
  }

  // Auto-dismiss after 1.5 seconds
  setTimeout(() => {
    if (popup.parentNode) popup.remove();
  }, 1500);
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
      // Relic: Lucky Die — -2 to d20 threshold
      if (hasRelic('lucky_die')) rollTarget -= 2;
      // Relic: Crown of the Ancients — -2 to d20 threshold
      if (hasRelic('crown_of_the_ancients')) rollTarget -= 2;
      if (rollTarget < 1) rollTarget = 1;
      rollValue = roll(1, 20);
      // Natural 20: always earns a reroll
      if (rollValue === 20) {
        earnedReroll = true;
        rerollCount = 1;
      // Natural 1: critical failure — lose a reroll if available
      } else if (rollValue === 1) {
        earnedReroll = false;
        rerollCount = 0;
        if (state.rerolls > 0) state.rerolls -= 1;
      } else {
        earnedReroll = rollValue >= rollTarget;
        rerollCount = earnedReroll ? 1 : 0;
      }
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

  // Curse survivor: last 3 completed rooms all had curses and all curses completed in each
  let curseSurvivor = false;
  const recentRooms = state.rooms.slice(-3);
  if (recentRooms.length >= 3 && recentRooms.every(r => r.curses && r.curses.length > 0 && r.curses.filter(c => !c.removed).every(c => c.completed))) {
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
    isNat20: rollValue === 20,
    isNat1: rollValue === 1,
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

function setD20Face(el, value) {
  const col = (value - 1) % 5;
  const row = Math.floor((value - 1) / 5);
  // CSS background-position %: position = col/(cols-1)*100, row/(rows-1)*100
  const xPct = col * 25;    // 5 cols → 0, 25, 50, 75, 100
  const yPct = row * 33.33; // 4 rows → 0, 33.33, 66.67, 100
  el.style.backgroundPosition = `${xPct}% ${yPct}%`;
}

async function animateSpell() {
  const decorGlyphs = ['✧','✦','✶','❋','✺','❈'];
  const dieEl = document.querySelector('.spell-display');
  const container = document.getElementById('spell-container');
  if (!dieEl) return;

  const td = state.transitionData;
  const finalValue = td.rollValue;

  // Spawn small dust glyphs floating off the die
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

  // Cycle through random d20 faces — fast start, dramatic slowdown
  const steps = 24;
  for (let i = 0; i < steps; i++) {
    setD20Face(dieEl, Math.floor(Math.random() * 20) + 1);
    const t = i / (steps - 1); // 0 → 1
    await sleep(25 + Math.round(t * t * t * 200)); // cubic ease: 25ms → 225ms
  }

  clearInterval(dustInterval);

  // Land on the actual roll value
  setD20Face(dieEl, finalValue);
  dieEl.classList.add('resolved');

  // Natural 20 / Natural 1 visual effects
  if (td.isNat20) {
    dieEl.classList.add('nat20');
  } else if (td.isNat1) {
    dieEl.classList.add('nat1');
  }

  if (td.earnedReroll) {
    state.rerolls += td.rerollCount;
  }

  await sleep(300);

  const resultEl = document.getElementById('transition-result');
  if (resultEl) {
    resultEl.style.display = 'block';
    if (td.isNat20) {
      resultEl.className = 'transition-result nat20-text';
      resultEl.innerHTML = 'NATURAL 20! +1 REROLL';
    } else if (td.isNat1) {
      resultEl.className = 'transition-result nat1-text';
      resultEl.innerHTML = state.rerolls >= 0 ? 'CRITICAL FAILURE! -1 REROLL' : 'CRITICAL FAILURE!';
    } else if (td.earnedReroll) {
      resultEl.className = 'transition-result earned';
      resultEl.innerHTML = 'SUCCESS! +1 REROLL';
    } else {
      resultEl.className = 'transition-result denied';
      resultEl.innerHTML = 'FAILURE';
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
      <div class="roll-info-row"><span class="roll-info-label">SUCCESS</span><span class="roll-info-value" style="color:var(--green);">${rollTarget}+</span></div>
    `;
  }

  // Hide rolled row and result from previous roll
  const rollRow = document.getElementById('roll-result-row');
  if (rollRow) rollRow.style.display = 'none';
  const resultEl = document.getElementById('transition-result');
  if (resultEl) resultEl.style.display = 'none';

  // Reset and re-animate the dice
  const container = document.getElementById('spell-container');
  const dieEl = document.querySelector('.spell-display');
  if (!container || !dieEl) return;
  setD20Face(dieEl, 1);
  dieEl.classList.remove('resolved', 'nat20', 'nat1');

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

  const steps = 24;
  for (let i = 0; i < steps; i++) {
    setD20Face(dieEl, Math.floor(Math.random() * 20) + 1);
    const t = i / (steps - 1);
    await sleep(25 + Math.round(t * t * t * 200));
  }

  clearInterval(dustInterval);

  const finalValue = roll(1, 20);
  const isNat20 = finalValue === 20;
  const isNat1 = finalValue === 1;
  const won = isNat20 || (!isNat1 && finalValue >= rollTarget);

  setD20Face(dieEl, finalValue);
  dieEl.classList.add('resolved');
  if (isNat20) dieEl.classList.add('nat20');
  if (isNat1) dieEl.classList.add('nat1');

  // Show rolled value in same row
  const rollVal = document.getElementById('roll-result-value');
  if (rollRow && rollVal) {
    rollVal.textContent = finalValue;
    rollRow.style.display = 'block';
  }

  await sleep(300);

  if (resultEl) {
    resultEl.style.display = 'block';
    if (isNat20) {
      state.rerolls += 1;
      resultEl.className = 'transition-result nat20-text';
      resultEl.innerHTML = 'CRITICAL SUCCESS! +2 REROLLS';
    } else if (isNat1) {
      // Nat 1 on double or nothing: lose the original reroll AND an extra one
      state.rerolls -= 1;
      if (state.rerolls > 0) state.rerolls -= 1;
      if (state.rerolls < 0) state.rerolls = 0;
      resultEl.className = 'transition-result nat1-text';
      resultEl.innerHTML = 'CRITICAL FAILURE! REROLLS LOST';
    } else if (won) {
      state.rerolls += 1;
      resultEl.className = 'transition-result earned';
      resultEl.innerHTML = 'SUCCESS! +2 REROLLS';
    } else {
      state.rerolls -= 1;
      if (state.rerolls < 0) state.rerolls = 0;
      resultEl.className = 'transition-result denied';
      resultEl.innerHTML = 'FAILURE! REROLL LOST';
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
    generateCampfireStock();
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
    if (room.blessing.includes('next 2 rooms cannot be cursed')) state.shieldNextRoom = Math.max(0, state.shieldNextRoom - 2);
    else if (room.blessing.includes('NEXT room cannot be cursed')) state.shieldNextRoom = Math.max(0, state.shieldNextRoom - 1);
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
    state.shieldNextRoom += 1;
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
    isCursed: pr.isCursed || false, isSanctuary: pr.isSanctuary || false,
    preview: pr.preview
  });
  state.currentRoom.isSideQuest = pr.isSideQuest;
  state.currentRoom.originalTrackType = pr.originalTrackType;
  state.currentRoom.nodeId = pr.nodeId || null;

  // If chest gave a blessing, add it to the room
  if (state.chestData && state.chestData.blessingText && !state.currentRoom.blessing) {
    state.currentRoom.blessing = state.chestData.blessingText;
    const b = state.currentRoom.blessing;
    if (b.includes('re-roll token') || b.includes('reroll token')) state.rerolls++;
    if (b.includes('NEXT room cannot be cursed')) state.shieldNextRoom += 1;
  }

  // Apply pending blessing from road event (if no blessing yet)
  if (state.pendingBlessing) {
    if (!state.currentRoom.blessing) {
      state.currentRoom.blessing = pick(BLESSINGS);
      const b = state.currentRoom.blessing;
      if (b.includes('re-roll token') || b.includes('reroll token')) state.rerolls++;
      if (b.includes('NEXT room cannot be cursed')) state.shieldNextRoom += 1;
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
  if (hasChallenge('minimalist')) return;
  const stock = state.campfireStock || {};
  const curseRemovalCost = hasRelic('purifying_flame') ? 10 : 15;
  if (type === 'removeCurse' && state.gold >= curseRemovalCost) {
    const idx = state.deferredCurses.findIndex(c => !c.completed);
    if (idx > -1) {
      state.deferredCurses[idx].completed = true;
      state.gold -= curseRemovalCost;
    }
  } else if (type === 'shield' && state.gold >= 10 && (stock.shield || 0) > 0) {
    state.shieldNextRoom += 1;
    state.gold -= 10;
    stock.shield--;
  } else if (type === 'reroll' && state.gold >= 20 && (stock.reroll || 0) > 0) {
    state.rerolls += 1;
    state.gold -= 20;
    stock.reroll--;
  } else if (type === 'removeNextRoom' && state.gold >= 12) {
    if (state.nextRoomCurses.length > 0) {
      state.nextRoomCurses.shift();
      state.gold -= 12;
    }
  } else if (type === 'buyRelic' && state.gold >= 50 && (stock.relic || 0) > 0) {
    const relics = pickRelicsForChoice(3);
    if (relics.length > 0) {
      state.gold -= 50;
      stock.relic--;
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
    state.shieldNextRoom += 1;
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

// ── Ambush Handlers ──────────────────────────────────────

function stakeTrackForAmbush(roomIndex) {
  const ad = state.ambushData;
  if (!ad || ad.phase !== 'stake') return;

  const room = state.rooms[roomIndex];
  if (!room) return;

  const trackType = room.trackType;
  const tasks = (typeof AMBUSH_TASKS !== 'undefined' && AMBUSH_TASKS[trackType]) || [];
  const task = tasks.length > 0 ? pick(tasks) : 'Make a meaningful modification to this track — add, change, or rearrange something that alters how it sounds';

  ad.phase = 'active';
  ad.stakedRoomIndex = roomIndex;
  ad.stakedTrackType = trackType;
  ad.stakedRoomNumber = room.number;
  ad.task = task;
  ad.taskCompleted = false;
  ad.name = pick(AMBUSH_NAMES);
  ad.description = pick(AMBUSH_DESCRIPTIONS);

  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleAmbushTask() {
  const ad = state.ambushData;
  if (!ad || ad.phase !== 'active') return;
  ad.taskCompleted = !ad.taskCompleted;
  render();
}

function completeAmbush() {
  const ad = state.ambushData;
  if (!ad) return;

  // Award gold for surviving the ambush
  state.gold += 15;

  continueFromAmbush(ad.pendingRoom);
}

function failAmbush() {
  const ad = state.ambushData;
  if (!ad) return;

  // Remove the staked track from completed rooms
  if (ad.stakedRoomIndex != null && ad.stakedRoomIndex < state.rooms.length) {
    state.rooms.splice(ad.stakedRoomIndex, 1);
  }

  continueFromAmbush(ad.pendingRoom);
}

function continueFromAmbush(pending) {
  state.ambushData = null;
  state._skipAmbushRoll = true;  // prevent re-rolling ambush after one just resolved
  continueFromRoadEvent(pending);
}

function continueFromRoadEvent(pending) {
  state.roadEventData = null;
  const node = getNodeById(pending.nodeId);

  // Ambush roll after road event (independent — can stack with road events)
  const ambushChancePost = diff().ambushChance || 0;
  const ambushEligiblePost = !state._skipAmbushRoll && !pending.isBoss && node.type !== 'campfire' && (state.floor > 1 || state.rooms.length >= 3);
  state._skipAmbushRoll = false;
  if (!state.ambushData && ambushEligiblePost && chance(ambushChancePost)) {
    state.ambushData = {
      phase: 'stake',
      pendingRoom: pending
    };
    state.roomPhase = 'ambush';
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

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
  const opts = { isAlchemist: pending.isAlchemist, isBoss: pending.isBoss, isCursed: pending.isCursed, isSanctuary: pending.isSanctuary, preview: pending.preview };
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
      if (b.includes('NEXT room cannot be cursed')) state.shieldNextRoom += 1;
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

function showProfile() {
  const profile = getProfile();
  const el = document.getElementById('profile-content');
  if (!el) return;

  const allAch = typeof ACHIEVEMENTS !== 'undefined' ? ACHIEVEMENTS : [];
  const unlocked = profile.badges || [];

  el.innerHTML = `
    <div class="panel-header" style="display:flex; align-items:center; justify-content:space-between;">
      Player Profile
      <button class="log-close-btn" onclick="hideProfile()" aria-label="Close">&times;</button>
    </div>

    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap:10px; margin:20px 0;">
      <div class="panel panel-accent" style="padding:12px 8px; text-align:center;">
        <div style="font-family:var(--font-pixel); font-size:18px; color:var(--gold);">${profile.totalSessions}</div>
        <div style="font-size:12px; color:var(--dim); margin-top:4px;">Sessions</div>
      </div>
      <div class="panel panel-accent" style="padding:12px 8px; text-align:center;">
        <div style="font-family:var(--font-pixel); font-size:18px; color:var(--gold);">${profile.totalRooms}</div>
        <div style="font-size:12px; color:var(--dim); margin-top:4px;">Rooms</div>
      </div>
      <div class="panel panel-accent" style="padding:12px 8px; text-align:center;">
        <div style="font-family:var(--font-pixel); font-size:18px; color:var(--red);">${profile.totalBosses}</div>
        <div style="font-size:12px; color:var(--dim); margin-top:4px;">Bosses</div>
      </div>
      <div class="panel panel-accent" style="padding:12px 8px; text-align:center;">
        <div style="font-family:var(--font-pixel); font-size:18px; color:var(--purple);">${profile.maxScore}</div>
        <div style="font-size:12px; color:var(--dim); margin-top:4px;">Best Score</div>
      </div>
      <div class="panel panel-accent" style="padding:12px 8px; text-align:center;">
        <div style="font-family:var(--font-pixel); font-size:18px; color:var(--teal);">${profile.maxFloor}</div>
        <div style="font-size:12px; color:var(--dim); margin-top:4px;">Deepest Floor</div>
      </div>
      <div class="panel panel-accent" style="padding:12px 8px; text-align:center;">
        <div style="font-family:var(--font-pixel); font-size:18px; color:var(--green);">${unlocked.length}/${allAch.length}</div>
        <div style="font-size:12px; color:var(--dim); margin-top:4px;">Badges</div>
      </div>
      <div class="panel panel-accent" style="padding:12px 8px; text-align:center;">
        <div style="font-family:var(--font-pixel); font-size:18px; color:var(--gold);">${profile.skeletonKeys || 0}</div>
        <div style="font-size:12px; color:var(--dim); margin-top:4px;">Skeleton Keys</div>
      </div>
    </div>

    <div style="margin-top:20px;">
      <div style="font-family:var(--font-pixel); font-size:10px; color:var(--gold-dim); letter-spacing:2px; margin-bottom:12px;">BADGES</div>
      <div style="display:flex; flex-wrap:wrap; gap:6px;">
        ${allAch.map(ach => {
          const earned = unlocked.includes(ach.id);
          return '<span class="info-tip" style="display:inline-block;"><span class="profile-badge ' + (earned ? 'earned' : 'locked') + '">' + ach.name + '</span><span class="info-tip-content" style="min-width:180px;"><div class="info-tip-title" style="color:' + (earned ? 'var(--gold)' : 'var(--dim)') + ';">' + ach.name + '</div><div class="info-tip-desc">' + ach.desc + '</div><div style="font-size:11px; margin-top:4px; color:' + (earned ? 'var(--green)' : 'var(--dim)') + ';">' + (earned ? 'Unlocked' : 'Locked') + '</div></span></span>';
        }).join('')}
      </div>
    </div>

    <div style="text-align:center; margin-top:24px;">
      <button class="btn btn-small" onclick="hideProfile()">CLOSE</button>
    </div>
  `;

  document.getElementById('profile-overlay').style.display = 'flex';
}

function hideProfile() {
  document.getElementById('profile-overlay').style.display = 'none';
}

function endSession() {
  clearSave();
  const totalRooms = state.rooms.length;
  const totalCurses = state.rooms.reduce((s, r) => s + r.curses.length, 0);
  const totalEffects = state.rooms.reduce((s, r) => s + r.effects.length, 0);
  const totalBlessings = state.rooms.filter(r => r.blessing).length;
  const pendingCurses = state.deferredCurses.filter(c => !c.completed).length;
  const sideQuestsCompleted = state.rooms.filter(r => r.isSideQuest).length;
  const bossesDefeated = state.rooms.filter(r => r.isBoss).length;

  // Reroll bonus: remaining rerolls * 10 * score multiplier
  const rerollBonus = Math.round(state.rerolls * 10 * diff().scoreMultiplier);
  const baseScore = state.score;
  state.score += rerollBonus;

  // Update player profile and check achievements
  updateProfileFromSession();

  // Save high score
  const today = new Date();
  const dateStr = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
  saveHighScore(state.difficulty, state.score, state.seed || 'daily', dateStr);

  const diffColors = { easy: 'var(--green)', normal: 'var(--text)', hard: 'var(--orange)', nightmare: 'var(--red)' };
  const sourceLabel = state.spliceRatio === 100 ? 'Splice' : state.spliceRatio === 0 ? 'Production' : state.spliceRatio + '% Splice / ' + (100 - state.spliceRatio) + '% Production';

  app.innerHTML = `
    <div class="screen active" style="max-width:800px; margin:0 auto; padding-top:40px;">
      <div class="panel" style="text-align:center; padding:48px 30px;">

        <!-- Header -->
        <div style="font-family:var(--font-pixel); font-size:12px; color:var(--dim); margin-bottom:20px; letter-spacing:3px;">* * *</div>
        <div class="title-main" style="font-size:22px; margin-bottom:8px;">SESSION COMPLETE</div>
        <div class="title-divider" style="margin:20px auto 32px auto;"></div>

        <!-- Session Info -->
        <div style="display:flex; flex-wrap:wrap; justify-content:center; gap:24px; margin-bottom:36px;">
          <div><span style="font-family:var(--font-pixel); font-size:9px; color:var(--dim); letter-spacing:2px;">KEY</span><br><span style="font-family:var(--font-pixel); font-size:14px; color:var(--gold);">${state.key} ${state.scale}</span></div>
          <div><span style="font-family:var(--font-pixel); font-size:9px; color:var(--dim); letter-spacing:2px;">BPM</span><br><span style="font-family:var(--font-pixel); font-size:14px; color:var(--gold);">${state.bpm}</span></div>
          <div><span style="font-family:var(--font-pixel); font-size:9px; color:var(--dim); letter-spacing:2px;">DIFFICULTY</span><br><span style="font-family:var(--font-pixel); font-size:14px; color:${diffColors[state.difficulty] || 'var(--text)'};">${diff().label}</span></div>
          <div><span style="font-family:var(--font-pixel); font-size:9px; color:var(--dim); letter-spacing:2px;">SEED</span><br><span style="font-family:var(--font-pixel); font-size:14px; color:var(--text);">${state.seed || 'daily'}</span></div>
          <div><span style="font-family:var(--font-pixel); font-size:9px; color:var(--dim); letter-spacing:2px;">SOURCE</span><br><span style="font-family:var(--font-pixel); font-size:11px; color:var(--text);">${sourceLabel}</span></div>
        </div>

        <!-- Score Breakdown -->
        <div style="margin-bottom:36px; padding:20px; border:1px solid var(--border); border-radius:4px; background:var(--panel-alt);">
          <div style="font-family:var(--font-pixel); font-size:9px; color:var(--dim); letter-spacing:2px; margin-bottom:16px;">SCORE BREAKDOWN</div>
          <div style="display:flex; justify-content:center; gap:24px; flex-wrap:wrap; margin-bottom:16px;">
            <div style="text-align:center;">
              <div style="font-family:var(--font-pixel); font-size:10px; color:var(--dim); letter-spacing:1px;">BASE</div>
              <div style="font-family:var(--font-pixel); font-size:16px; color:var(--purple); margin-top:4px;">${baseScore}</div>
            </div>
            ${rerollBonus > 0 ? `
            <div style="text-align:center;">
              <div style="font-family:var(--font-pixel); font-size:10px; color:var(--dim); letter-spacing:1px;">REROLL BONUS</div>
              <div style="font-family:var(--font-pixel); font-size:16px; color:var(--green); margin-top:4px;">+${rerollBonus}</div>
              <div style="font-size:11px; color:var(--dim); margin-top:2px;">${state.rerolls} remaining</div>
            </div>
            ` : ''}
          </div>
          <div style="border-top:1px solid var(--border); padding-top:14px;">
            <div style="font-family:var(--font-pixel); font-size:10px; color:var(--dim); letter-spacing:1px;">FINAL SCORE</div>
            <div style="font-family:var(--font-pixel); font-size:28px; color:var(--purple); margin-top:6px;">${state.score}</div>
          </div>
        </div>

        <!-- Stats Grid -->
        <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:12px; margin-bottom:36px; text-align:center;">
          <div class="panel panel-accent" style="padding:14px 8px;">
            <div style="font-family:var(--font-pixel); font-size:20px; color:var(--gold);">${totalRooms}</div>
            <div style="font-size:12px; color:var(--dim); margin-top:6px;">Rooms</div>
          </div>
          <div class="panel panel-accent" style="padding:14px 8px;">
            <div style="font-family:var(--font-pixel); font-size:20px; color:var(--teal);">${state.floor}</div>
            <div style="font-size:12px; color:var(--dim); margin-top:6px;">Floors</div>
          </div>
          <div class="panel panel-accent" style="padding:14px 8px;">
            <div style="font-family:var(--font-pixel); font-size:20px; color:var(--gold);">${state.gold}g</div>
            <div style="font-size:12px; color:var(--dim); margin-top:6px;">Gold</div>
          </div>
          <div class="panel panel-accent" style="padding:14px 8px;">
            <div style="font-family:var(--font-pixel); font-size:20px; color:var(--red);">${totalCurses}</div>
            <div style="font-size:12px; color:var(--dim); margin-top:6px;">Curses</div>
          </div>
          <div class="panel panel-accent" style="padding:14px 8px;">
            <div style="font-family:var(--font-pixel); font-size:20px; color:var(--purple);">${totalEffects}</div>
            <div style="font-size:12px; color:var(--dim); margin-top:6px;">Effects</div>
          </div>
          <div class="panel panel-accent" style="padding:14px 8px;">
            <div style="font-family:var(--font-pixel); font-size:20px; color:var(--green);">${totalBlessings}</div>
            <div style="font-size:12px; color:var(--dim); margin-top:6px;">Blessings</div>
          </div>
          ${bossesDefeated > 0 ? `
          <div class="panel panel-accent" style="padding:14px 8px;">
            <div style="font-family:var(--font-pixel); font-size:20px; color:var(--red);">${bossesDefeated}</div>
            <div style="font-size:12px; color:var(--dim); margin-top:6px;">Bosses</div>
          </div>
          ` : ''}
          ${sideQuestsCompleted > 0 ? `
          <div class="panel panel-accent" style="padding:14px 8px;">
            <div style="font-family:var(--font-pixel); font-size:20px; color:var(--orange);">${sideQuestsCompleted}</div>
            <div style="font-size:12px; color:var(--dim); margin-top:6px;">Side Quests</div>
          </div>
          ` : ''}
          ${state.relics.length > 0 ? `
          <div class="panel panel-accent" style="padding:14px 8px;">
            <div style="font-family:var(--font-pixel); font-size:20px; color:var(--purple);">${state.relics.length}</div>
            <div style="font-size:12px; color:var(--dim); margin-top:6px;">Relics</div>
          </div>
          ` : ''}
        </div>

        ${pendingCurses > 0 ? `
          <div style="color:var(--red); margin-bottom:28px; font-size:14px; padding:12px 16px; border:1px solid var(--red); border-radius:4px; background:rgba(192,57,43,0.08);">
            ${pendingCurses} deferred curse${pendingCurses > 1 ? 's' : ''} still incomplete
          </div>
        ` : ''}

        <!-- Tracklist -->
        <div style="margin-bottom:32px; text-align:left;">
          <div class="panel-header" style="margin-bottom:12px;">Tracklist</div>
          ${state.rooms.map(r => {
            const tag = r.isBoss ? 'BOSS' : r.isSideQuest ? 'SIDE QUEST' : r.isAlchemist ? 'ALCHEMIST' : r.isYouTube ? 'YOUTUBE' : r.isProductionRoom ? 'PRODUCTION' : '';
            const tagColor = r.isBoss ? 'var(--red)' : r.isSideQuest ? 'var(--orange)' : r.isAlchemist ? 'var(--teal)' : r.isYouTube ? 'var(--youtube-red)' : r.isProductionRoom ? 'var(--blue)' : '';
            return `
            <div style="padding:12px 0; border-bottom:1px solid var(--border);">
              <div style="display:flex; align-items:baseline; gap:8px; margin-bottom:4px;">
                <span style="font-family:var(--font-pixel); font-size:11px; color:var(--gold);">#${r.number} ${r.trackType.toUpperCase()}</span>
                ${tag ? `<span style="font-family:var(--font-pixel); font-size:9px; color:${tagColor}; letter-spacing:1px;">${tag}</span>` : ''}
              </div>
              <div style="color:var(--teal); font-size:15px; margin-bottom:2px;">${r.genre}${r.sampleType ? ' (' + r.sampleType + ')' : ''}</div>
              ${r.curses.map(c => `<div style="color:var(--red); font-size:13px; padding-left:12px; margin-top:2px;">Curse: ${c.text}</div>`).join('')}
              ${r.effects.map(e => `<div style="color:var(--blue); font-size:13px; padding-left:12px; margin-top:2px;">Effect: ${e.name} @ ${e.min}\u2013${e.max}% wet</div>`).join('')}
              ${r.blessing ? `<div style="color:var(--green); font-size:13px; padding-left:12px; margin-top:2px;">Blessing: ${r.blessing}</div>` : ''}
              ${r.flavorRoll ? `<div style="color:var(--gold-dim); font-size:12px; padding-left:12px; margin-top:2px;">${r.flavorRoll.label}: ${r.flavorRoll.text} ${r.bonusCompleted ? '<span style="color:var(--green);">(done)</span>' : '<span style="opacity:0.4;">(skipped)</span>'}</div>` : ''}
              ${r.notes ? `<div style="color:var(--dim); font-size:12px; padding-left:12px; margin-top:4px; font-style:italic;">Notes: ${r.notes}</div>` : ''}
            </div>`;
          }).join('')}
        </div>

        ${state.deferredCurses.length > 0 ? `
          <div style="margin-bottom:28px; text-align:left;">
            <div class="panel-header" style="color:var(--red); margin-bottom:8px;">Deferred Curses</div>
            ${state.deferredCurses.map(c => `
              <div style="padding:5px 0; color:${c.completed ? 'var(--dim)' : 'var(--red)'}; ${c.completed ? 'text-decoration:line-through;' : ''} font-size:13px;">
                ${c.completed ? '\u2713' : '\u25CB'} ${c.text}
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${state.relics.length > 0 ? `
          <div style="margin-bottom:28px; text-align:left;">
            <div class="panel-header" style="color:var(--purple); margin-bottom:8px;">Relics Collected</div>
            ${state.relics.map(id => {
              const r = getRelic(id);
              if (!r) return '';
              const tierInfo = RELIC_TIERS[r.tier];
              return `
                <div class="relic-log-item">
                  <div>
                    <div style="color:${tierInfo.color}; font-size:14px;">${r.name} <span style="font-size:9px; opacity:0.6; text-transform:uppercase; letter-spacing:1px;">${tierInfo.label}</span></div>
                    <div style="color:var(--dim); font-size:12px; margin-top:2px;">${r.description}</div>
                  </div>
                </div>`;
            }).join('')}
          </div>
        ` : ''}

        <!-- Actions -->
        <div style="margin-top:36px; display:flex; gap:12px; justify-content:center; flex-wrap:wrap;">
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
    nextRoomCurses: [], completionStreak: 0, shieldNextRoom: 0, usedRoomNames: [],
    seed: null, seedMode: 'daily', gold: 0, score: 0, chestData: null, pendingRoom: null,
    roadEventData: null, acceptedEvents: [], pendingBlessing: false, postBossCampfire: false, ambushData: null,
    floor: 1, map: null, currentNodeId: null, floorHistory: [], setupStep: 1,
    relics: [], relicUses: {}, pendingRelicChoice: null, pendingRelicRoom: null, rerollsUsedThisRoom: 0,
    spliceRatio: 50, nextFloorMap: null, floorTheme: null, spiritWalkActive: false, campfireStock: null
  };
  render();
}

function generateBeatSheet() {
  let sheet = '';
  sheet += `NECRODANCER BEAT SHEET\n`;
  sheet += `${'═'.repeat(44)}\n\n`;
  sheet += `Key: ${state.key} ${state.scale}    BPM: ${state.bpm}\n`;
  sheet += `Difficulty: ${diff().label}    Seed: ${state.seed || 'daily'}\n`;
  sheet += `Source: ${state.spliceRatio}% Splice / ${100 - state.spliceRatio}% Production\n`;
  sheet += `Score: ${state.score}    Gold: ${state.gold}g\n`;
  sheet += `Floors: ${state.floor}    Rooms: ${state.rooms.length}\n\n`;
  sheet += `${'─'.repeat(44)}\n`;
  sheet += `TRACKLIST\n`;
  sheet += `${'─'.repeat(44)}\n\n`;

  for (const room of state.rooms) {
    const tag = room.isBoss ? ' [BOSS]' : room.isSideQuest ? ' [SIDE QUEST]' : room.isAlchemist ? ' [ALCHEMIST]' : room.isYouTube ? ' [YOUTUBE]' : room.isProductionRoom ? ' [PRODUCTION]' : '';
    sheet += `#${room.number} ${room.trackType.toUpperCase()}${tag}\n`;
    sheet += `   Genre: ${room.genre}`;
    if (room.sampleType) sheet += ` (${room.sampleType})`;
    sheet += `\n`;
    if (room.curses.length > 0) {
      for (const c of room.curses) sheet += `   Curse: ${c.text}\n`;
    }
    if (room.effects.length > 0) {
      for (const e of room.effects) sheet += `   Effect: ${e.name} @ ${e.min}-${e.max}% wet\n`;
    }
    if (room.blessing) sheet += `   Blessing: ${room.blessing}\n`;
    if (room.flavorRoll) sheet += `   Bonus: ${room.flavorRoll.label}: ${room.flavorRoll.text} ${room.bonusCompleted ? '(done)' : '(skipped)'}\n`;
    if (room.notes) sheet += `   Notes: ${room.notes}\n`;
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
      const check = ev.cost ? (ev.completed ? '[x]' : '[ ]') : '[~]';
      sheet += `${check} ${ev.name} (${ev.reward})\n`;
      if (ev.cost) sheet += `   Cost: ${ev.cost}\n`;
    }
    sheet += `\n`;
  }

  if (state.relics.length > 0) {
    sheet += `${'─'.repeat(44)}\n`;
    sheet += `RELICS COLLECTED\n`;
    sheet += `${'─'.repeat(44)}\n`;
    for (const id of state.relics) {
      const r = getRelic(id);
      if (r) sheet += `${r.name} \u2014 ${r.description}\n`;
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
    isYouTube: room.isYouTube,
    isProductionRoom: room.isProductionRoom
  });
}

// Check if the current room has the Ancient Knowledge blessing (free reroll)
function hasAncientKnowledge() {
  const room = state.currentRoom;
  if (!room || !room.blessing) return false;
  return room.blessing.includes('Ancient Knowledge') && !room._ancientKnowledgeUsed;
}

function useAncientKnowledge() {
  if (state.currentRoom) state.currentRoom._ancientKnowledgeUsed = true;
}

// Deduct reroll cost, respecting free-reroll sources
function deductReroll() {
  if (hasAncientKnowledge()) {
    useAncientKnowledge();
    return;
  }
  if (hasRelic('metronome_of_mercy') && !relicUsedThisFloor('metronome_of_mercy')) {
    markRelicUsed('metronome_of_mercy');
    return;
  }
  state.rerolls--;
}

function rerollSampleType() {
  const room = state.currentRoom;
  if (!room || (state.rerolls <= 0 && !hasAncientKnowledge() && !(hasRelic('metronome_of_mercy') && !relicUsedThisFloor('metronome_of_mercy'))) || room.isAlchemist) return;
  deductReroll();
  state.rerollsUsedThisRoom++;
  const prevSample = room.sampleType;
  const samplePool = (SAMPLE_TYPES[room.trackType] || ['sample']).filter(s => s !== prevSample);
  room.sampleType = samplePool.length > 0 ? pick(samplePool) : pick(SAMPLE_TYPES[room.trackType] || ['sample']);
  room.genreDirective = rebuildGenreDirective(room);
  room.checklist[0].text = room.genreDirective;
  render();
}

function rerollGenre() {
  const room = state.currentRoom;
  if (!room || (state.rerolls <= 0 && !hasAncientKnowledge() && !(hasRelic('metronome_of_mercy') && !relicUsedThisFloor('metronome_of_mercy'))) || room.isAlchemist) return;
  deductReroll();
  state.rerollsUsedThisRoom++;
  const prevGenre = room.genre;
  let newGenre;
  let genreAttempts = 0;
  do { newGenre = pickGenreForDifficulty(room.trackType); genreAttempts++; } while (newGenre === prevGenre && genreAttempts < 20);
  room.genre = newGenre;
  room.genreDirective = rebuildGenreDirective(room);
  room.checklist[0].text = room.genreDirective;
  // Re-pick flavor to match the new genre
  room.flavorRoll = room.isProductionRoom
    ? (PRODUCTION_FLAVOR[room.trackType] ? { label: PRODUCTION_FLAVOR[room.trackType].label, text: pick(PRODUCTION_FLAVOR[room.trackType].options) } : null)
    : pickCompatibleFlavor(room.trackType, room.genre, room.isAlchemist);
  render();
}

function rerollCurse(index) {
  const room = state.currentRoom;
  if (!room || (state.rerolls <= 0 && !hasAncientKnowledge() && !(hasRelic('metronome_of_mercy') && !relicUsedThisFloor('metronome_of_mercy')))) return;
  const curse = room.curses[index];
  if (!curse || curse.type === 'carried' || curse.type === 'deferred-forced') return;
  deductReroll();
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

  const excludeTexts = room.curses.map(c => c.text); // exclude all current curses including the one being rerolled
  let newText;
  let attempts = 0;
  do { newText = pick(pool); attempts++; } while (excludeTexts.includes(newText) && attempts < 20);

  // Resolve {bossWet} placeholder for boss curses
  if (newText.includes('{bossWet}')) {
    const [wetLo, wetHi] = diff().bossWetRange;
    const lo = roll(wetLo, Math.round((wetLo + wetHi) / 2));
    const hi = roll(Math.round((wetLo + wetHi) / 2), wetHi);
    newText = newText.replace('{bossWet}', `${lo}\u2013${hi}%`);
  }

  curse.text = newText;

  // Update matching checklist entry
  const clEntry = room.checklist.find(c => c.id === 'curse-' + index);
  if (clEntry) clEntry.text = newText;

  render();
}

function rerollEffect(index) {
  const room = state.currentRoom;
  if (!room || (state.rerolls <= 0 && !hasAncientKnowledge() && !(hasRelic('metronome_of_mercy') && !relicUsedThisFloor('metronome_of_mercy')))) return;
  const effect = room.effects[index];
  if (!effect) return;
  deductReroll();
  state.rerollsUsedThisRoom++;

  const NEEDS_PREVIOUS_TRACK = ['Sidechain Compression'];
  const isFirstRoom = state.rooms.length === 0;
  const prevTracks = state.rooms.map(r => r.trackType);
  const allNames = room.effects.map(e => e.name.replace(/\s*\(keyed to .*?\)/, '')); // exclude all current effects including the one being rerolled

  let eff;
  let attempts = 0;
  do {
    eff = pick(EFFECTS);
    attempts++;
  } while (
    (allNames.includes(eff) || (isFirstRoom && NEEDS_PREVIOUS_TRACK.includes(eff))) && attempts < 20
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
  const center = roll(...diff().effectRange);
  const tol = diff().effectTolerance;
  effect.min = Math.max(3, center - tol);
  effect.max = Math.min(100, center + tol);

  // Update matching checklist entry
  const clEntry = room.checklist.find(c => c.id === 'fx-' + index);
  if (clEntry) clEntry.text = `${effName} at ${effect.min}\u2013${effect.max}% wet`;

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

// ════════════════════════════════════════════════════════
// MOBILE: tap-to-preview info-tip tooltips (genres, effects, etc.)
// ════════════════════════════════════════════════════════
const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;

let _activeInfoTip = null;

function dismissActiveInfoTip() {
  if (_activeInfoTip) {
    _activeInfoTip.classList.remove('info-tip-active');
    _activeInfoTip = null;
  }
}

document.addEventListener('click', (e) => {
  if (!isTouchDevice()) return;

  const infoTip = e.target.closest('.info-tip');

  // Clicked inside the tooltip content itself (e.g. the Splice link)
  // Stop propagation so the click doesn't reach checklist items underneath
  if (e.target.closest('.info-tip-content')) {
    e.stopPropagation();
    return;
  }

  if (infoTip) {
    // If this tooltip is already active, dismiss it
    if (infoTip === _activeInfoTip) {
      e.preventDefault();
      dismissActiveInfoTip();
      return;
    }

    // Block the link navigation, show tooltip instead
    e.preventDefault();
    dismissActiveInfoTip();
    infoTip.classList.add('info-tip-active');
    _activeInfoTip = infoTip;

    // Reposition tooltip if it overflows
    const tip = infoTip.querySelector('.info-tip-content');
    if (tip) {
      tip.classList.remove('tip-below', 'tip-left', 'tip-right');
      const rect = tip.getBoundingClientRect();
      if (rect.top < 0) tip.classList.add('tip-below');
      if (rect.left < 0) tip.classList.add('tip-left');
      else if (rect.right > window.innerWidth) tip.classList.add('tip-right');
    }
    return;
  }

  // Tapped elsewhere — dismiss info tooltip
  dismissActiveInfoTip();
}, true);

// ════════════════════════════════════════════════════════
// MOBILE: tap-to-preview map nodes
// ════════════════════════════════════════════════════════

let _activeTooltipNode = null;

function dismissActiveTooltip() {
  if (_activeTooltipNode) {
    _activeTooltipNode.classList.remove('tooltip-visible');
    _activeTooltipNode = null;
  }
}

document.addEventListener('click', (e) => {
  if (!isTouchDevice()) return;

  const mapNode = e.target.closest('.map-node');

  // Clicking the enter button inside tooltip — let it through
  if (e.target.closest('.map-tooltip-enter')) return;

  // Clicking a reroll button — let it through
  if (e.target.closest('.map-node-reroll')) return;

  // Tapped a map node
  if (mapNode) {
    const isReachable = mapNode.classList.contains('reachable');

    // If this node already has tooltip showing, dismiss it
    // (on mobile, user must tap the "Enter Room" button inside the tooltip)
    if (mapNode === _activeTooltipNode) {
      e.preventDefault();
      dismissActiveTooltip();
      return;
    }

    // Otherwise, show tooltip and block navigation
    e.preventDefault();
    dismissActiveTooltip();
    _blockNextEnter = true;
    mapNode.classList.add('tooltip-visible');
    _activeTooltipNode = mapNode;

    // Reposition tooltip
    const tip = mapNode.querySelector('.map-tooltip');
    if (tip) {
      tip.classList.remove('tip-below', 'tip-left', 'tip-right');
      const rect = tip.getBoundingClientRect();
      if (rect.top < 0) tip.classList.add('tip-below');
      if (rect.left < 0) tip.classList.add('tip-left');
      else if (rect.right > window.innerWidth) tip.classList.add('tip-right');
    }
    return;
  }

  // Tapped elsewhere — dismiss
  dismissActiveTooltip();
}, true);

render();
