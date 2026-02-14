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

  enterRoomFromNode(node, node.trackType);
}

function enterRoomFromNode(node, trackType) {
  const isBoss = node.type === 'boss';
  const isCursed = node.type === 'cursed';
  const isSanctuary = node.type === 'sanctuary';
  let isSideQuest = false;
  let originalTrackType = null;
  let isAlchemist = false;

  // Side quest roll (not for boss/sanctuary/cursed)
  if (!isBoss && node.type === 'standard' && chance(diff().sideQuestChance)) {
    isSideQuest = true;
    originalTrackType = trackType;
    const otherTypes = TRACK_TYPES.filter(t => t !== trackType);
    trackType = pick(otherTypes);
  }

  // Alchemist roll (standard nodes only)
  if (!isBoss && !isSideQuest && node.type === 'standard' && chance(diff().alchemistChance)) {
    isAlchemist = true;
  }

  // Chest roll (non-boss, non-campfire)
  if (!isBoss && node.type !== 'campfire' && chance(diff().chestChance)) {
    state.chestData = {
      message: pick(CHEST_MESSAGES),
      reward: weightedPick([
        { value: 'reroll', weight: 40 },
        { value: 'blessing', weight: 35 },
        { value: 'shield', weight: 25 }
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
  if (isBoss) state.rerolls += 2;
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

  const gv = Math.round(goldForType(item.type) * diff().goldMultiplier);
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
  }
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
  const completedChecks = state.currentRoom.checklist.filter(c => c.completed).length;
  state.score += Math.round(completedChecks * d.scorePerCheckbox * d.scoreMultiplier);
  state.score += Math.round(d.scorePerRoom * d.scoreMultiplier);
  if (isSideQuest) state.score += Math.round(d.scorePerSideQuest * d.scoreMultiplier);

  let earnedReroll = false;
  let rerollCount = 0;
  let rollTarget = 0;
  let rollValue = 0;

  if (allCompleted) {
    if (isSideQuest) {
      earnedReroll = true;
      rerollCount = 2;
      state.rerolls += 2;
    } else {
      rollTarget = bonusCompleted ? d.rerollBonusChance : d.rerollChance;
      rollValue = roll(1, 100);
      earnedReroll = rollValue <= rollTarget;
      rerollCount = earnedReroll ? 1 : 0;
    }
  }

  const isBoss = state.currentRoom.isBoss || false;
  const bossBlessing = isBoss ? state.currentRoom.blessing : null;
  if (isBoss) state.score += Math.round(d.scorePerBoss * d.scoreMultiplier);

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
    rollValue
  };

  state.currentRoom = null;
  state.roomPhase = 'transition';
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (allCompleted && !isSideQuest && !isBoss) {
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

  // Spawn floating dust particles during animation
  const dustInterval = setInterval(() => {
    if (!container) return;
    const dust = document.createElement('span');
    dust.className = 'spell-dust';
    dust.textContent = pick(decorGlyphs);
    dust.style.left = (Math.random() * 80 + 10) + '%';
    dust.style.top = (Math.random() * 40 + 30) + '%';
    container.appendChild(dust);
    setTimeout(() => dust.remove(), 1000);
  }, 120);

  // Cycle through random numbers 0-100 with decorative glyphs flanking
  const steps = 28;
  for (let i = 0; i < steps; i++) {
    const randNum = Math.floor(Math.random() * 101);
    const leftGlyph = pick(decorGlyphs);
    const rightGlyph = pick(decorGlyphs);
    spellEl.innerHTML = `<span style="font-size:0.4em; opacity:0.5; vertical-align:middle;">${leftGlyph}</span> ${randNum} <span style="font-size:0.4em; opacity:0.5; vertical-align:middle;">${rightGlyph}</span>`;
    await sleep(60 + i * 6); // gradually slow down
  }

  clearInterval(dustInterval);

  // Land on the actual roll value
  spellEl.innerHTML = `<span style="font-size:0.4em; opacity:0.5; vertical-align:middle;">✦</span> ${finalValue} <span style="font-size:0.4em; opacity:0.5; vertical-align:middle;">✦</span>`;
  spellEl.parentElement.classList.add('resolved');

  if (td.earnedReroll) {
    state.rerolls += td.rerollCount;
  }

  // Show the rolled value line
  const rollLine = document.getElementById('roll-result-line');
  if (rollLine) {
    rollLine.style.display = 'block';
    rollLine.innerHTML = `<span class="roll-score">ROLLED: ${finalValue}</span>`;
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

  const continueEl = document.getElementById('transition-continue');
  if (continueEl) continueEl.style.display = 'block';

  const rerollDisplay = document.querySelector('.reroll-count');
  if (rerollDisplay) rerollDisplay.textContent = state.rerolls;
}

function continueFromTransition() {
  const td = state.transitionData;
  if (td && td.isBoss) {
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
    // Blessing will be applied when room is generated (stored for display)
    state.chestData.blessingText = pick(BLESSINGS);
  } else if (state.chestData.reward === 'shield') {
    state.shieldNextRoom = true;
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

  state.chestData = null;
  state.pendingRoom = null;
  state.roomPhase = 'active';
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function buyCampfireItem(type) {
  if (type === 'removeCurse' && state.gold >= 15) {
    const idx = state.deferredCurses.findIndex(c => !c.completed);
    if (idx > -1) {
      state.deferredCurses[idx].completed = true;
      state.gold -= 15;
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
  }
  render();
}

function leaveCampfire() {
  state.roomPhase = 'map';
  render();
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
              ${r.effects.map(e => `<div style="color:var(--purple); font-size:14px; padding-left:12px;">Effect: ${e.name} @ ${e.percentage}%</div>`).join('')}
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
    nextRoomCurses: [], shieldNextRoom: false, usedRoomNames: [],
    seed: null, seedMode: 'daily', gold: 0, score: 0, chestData: null, pendingRoom: null,
    floor: 1, map: null, currentNodeId: null, floorHistory: [], setupStep: 1
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
// INIT
// ════════════════════════════════════════════════════════

render();
