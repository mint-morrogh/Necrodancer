// ════════════════════════════════════════════════════════
// RENDERING
// ════════════════════════════════════════════════════════

const app = document.getElementById('app');
let _lastScreen = null;
let _lastRoomPhase = null;

// ── Tooltip Helpers ──────────────────────────────────────
function effectTip(name) {
  const baseName = name.replace(/\s*\(keyed to .*?\)/, '');
  const info = typeof EFFECT_DESCRIPTIONS !== 'undefined' && EFFECT_DESCRIPTIONS[baseName];
  if (!info) return name;
  return `<span class="info-tip">${name}<span class="info-tip-content info-tip-effect"><div class="info-tip-title">${baseName}</div><div class="info-tip-desc">${info.desc}</div><div class="info-tip-field"><strong>Plugins:</strong> ${info.plugins}</div><div class="info-tip-field"><strong>DAW Tips:</strong> ${info.daw}</div></span></span>`;
}

function genreTip(name) {
  const info = typeof GENRE_DESCRIPTIONS !== 'undefined' && GENRE_DESCRIPTIONS[name];
  if (!info) return `<span style="color:var(--gold);">${name}</span>`;
  return `<span class="info-tip" style="color:var(--gold);">${name}<span class="info-tip-content info-tip-genre"><div class="info-tip-title">${name}</div><div class="info-tip-desc">${info.desc}</div><div class="info-tip-field"><strong>BPM Range:</strong> ${info.bpm}</div><div class="info-tip-field"><strong>Characteristics:</strong> ${info.traits}</div></span></span>`;
}

function trackTip(name) {
  const info = typeof TRACK_TYPE_DESCRIPTIONS !== 'undefined' && TRACK_TYPE_DESCRIPTIONS[name];
  if (!info) return name;
  return `<span class="info-tip">${name}<span class="info-tip-content info-tip-track"><div class="info-tip-title">${name}</div><div class="info-tip-desc">${info.desc}</div><div class="info-tip-field"><strong>Tips:</strong> ${info.tips}</div><div class="info-tip-field"><strong>Splice:</strong> ${info.search}</div></span></span>`;
}

function injectGenreTip(directive, genre, showReroll) {
  const rerollIcon = showReroll
    ? `<button class="reroll-inline" onclick="rerollGenre()" title="Reroll genre (${state.rerolls} left)">↻</button>`
    : '';
  if (!genre || typeof GENRE_DESCRIPTIONS === 'undefined' || !GENRE_DESCRIPTIONS[genre]) {
    if (!showReroll) return directive;
    return directive.replace(
      `<span style="color:var(--gold);">${genre}</span>`,
      `<span style="color:var(--gold);">${genre}</span>${rerollIcon}`
    );
  }
  return directive.replace(
    `<span style="color:var(--gold);">${genre}</span>`,
    genreTip(genre) + rerollIcon
  );
}

function render() {
  const screenChanged = state.screen !== _lastScreen;
  const phaseChanged = state.roomPhase !== _lastRoomPhase;
  _lastScreen = state.screen;
  _lastRoomPhase = state.roomPhase;

  if (state.screen === 'title') renderTitle();
  else if (state.screen === 'setup') renderSetup();
  else if (state.screen === 'dungeon') renderDungeon();

  // Only animate on actual screen/phase transitions
  if (screenChanged || phaseChanged) {
    const el = app.querySelector('.screen.active');
    if (el) {
      el.classList.add('enter');
      el.addEventListener('animationend', () => el.classList.remove('enter'), { once: true });
    }
  }
}

function renderTitle() {
  app.innerHTML = `
    <div id="title-screen" class="screen active">
      <div class="panel" style="max-width:650px; margin:0 auto; text-align:center; padding:60px 30px;">
        <div class="title-main">NECRODANCER</div>
        <div class="title-sub">Production Dungeon Crawler</div>
        <div class="title-divider"></div>
        <div class="title-flavor">Enter the dungeon. Roll the bones.<br>Let fate shape your sound.</div>
        <button class="btn" onclick="startSetup()">START YOUR SESSION</button>
      </div>
    </div>
  `;
}

function renderSetup() {
  const step = state.setupStep;
  const seedVal = state.seedMode === 'daily' ? getTodaySeed() : (state.seed || generateRandomSeed());

  app.innerHTML = `
    <div id="setup-screen" class="screen active">
      <div class="setup-title">THE RITUAL BEGINS</div>

      <div class="panel" style="text-align:center;">
        <div class="panel-header">Roll for Key & Scale</div>
        <div id="key-display" class="roll-display">${state.key ? `${state.key} ${state.scale}` : '? ? ?'}</div>
        ${!state.key ? `
        <div style="margin-top:16px;">
          <button class="btn btn-small" onclick="rollForKey()" id="roll-key-btn">
            ROLL THE BONES
          </button>
        </div>
        ` : ''}
      </div>

      ${step >= 2 ? `
      <div class="panel${step === 2 ? ' setup-step' : ''}" style="text-align:center;">
        <div class="panel-header">Set Your Tempo</div>
        <div class="setup-row">
          <span class="setup-label">BPM</span>
          <div class="bpm-wrapper">
            <input type="number" class="bpm-input" id="bpm-input" value="${state.bpm}" min="40" max="300" onchange="state.bpm = parseInt(this.value) || 128; if(state.setupStep < 3){ state.setupStep = 3; renderSetup(); }">
            <div class="bpm-arrows">
              <button class="bpm-arrow" onclick="adjustBpm(1); if(state.setupStep < 3){ state.setupStep = 3; renderSetup(); }">&#9650;</button>
              <button class="bpm-arrow" onclick="adjustBpm(-1); if(state.setupStep < 3){ state.setupStep = 3; renderSetup(); }">&#9660;</button>
            </div>
          </div>
        </div>
        <div style="color:var(--dim); font-size:15px; margin-top:8px;">
          40 – 300 BPM · Choose your battlefield
        </div>
        ${step < 3 ? `
        <div style="margin-top:16px;">
          <button class="btn btn-small" onclick="state.setupStep = 3; renderSetup();">CONFIRM TEMPO</button>
        </div>
        ` : ''}
      </div>
      ` : ''}

      ${step >= 3 ? `
      <div class="panel${step === 3 ? ' setup-step' : ''}" style="text-align:center;">
        <div class="panel-header">Difficulty</div>
        <div class="difficulty-row">
          ${Object.entries(DIFFICULTY_SETTINGS).map(([key, d]) => `
            <button class="difficulty-option ${state.difficulty === key ? 'selected' : ''}" onclick="state.difficulty='${key}'; if(state.setupStep < 4){ state.setupStep = 4; } renderSetup();">
              <span class="difficulty-name" style="color:${state.difficulty === key ? 'var(--gold)' : 'var(--dim)'};">${d.label}</span>
              <span class="difficulty-desc">${d.desc}</span>
            </button>
          `).join('')}
        </div>
      </div>
      ` : ''}

      ${step >= 4 ? `
      <div class="panel${step === 4 ? ' setup-step' : ''}" style="text-align:center;">
        <div class="panel-header">Dungeon Seed</div>
        <div style="margin-top:8px;">
          <div class="seed-toggle">
            <button class="seed-toggle-btn ${state.seedMode === 'daily' ? 'active' : ''}" onclick="state.seedMode='daily'; state.seed=null; renderSetup();">DAILY</button>
            <button class="seed-toggle-btn ${state.seedMode === 'random' ? 'active' : ''}" onclick="state.seedMode='random'; state.seed=generateRandomSeed(); renderSetup();">RANDOM</button>
          </div>
        </div>
        <div class="setup-row" style="margin-top:16px;">
          <span class="setup-label">SEED</span>
          <input type="text" class="bpm-input" id="seed-input" value="${seedVal}" style="width:200px; font-size:14px;"
            onchange="state.seedMode='random'; state.seed=this.value; renderSetup();">
        </div>
        <div style="display:flex; align-items:center; justify-content:center; gap:12px; margin-top:8px;">
          <button class="btn btn-small" onclick="rerollSeed()">ROLL THE BONES</button>
        </div>
        <div style="color:var(--dim); font-size:15px; margin-top:10px;">
          ${state.seedMode === 'daily' ? 'Same seed every day · All adventurers share this dungeon' : 'Unique dungeon · Re-roll for a new fate'}
        </div>
      </div>
      ` : ''}

      ${step >= 4 ? `
        <div${step === 4 ? ' class="setup-step"' : ''} style="text-align:center; margin-top:24px;">
          <button class="btn" onclick="startDungeon()">DESCEND INTO THE DUNGEON</button>
        </div>
      ` : ''}
    </div>
  `;
}

function renderDungeon() {
  let mainContent = '';
  if (state.roomPhase === 'map') {
    mainContent = renderMap();
  } else if (state.roomPhase === 'transition') {
    mainContent = renderTransition();
  } else if (state.roomPhase === 'chest') {
    mainContent = renderChest();
  } else if (state.roomPhase === 'campfire') {
    mainContent = renderCampfire();
  } else if (state.roomPhase === 'road-event') {
    mainContent = renderRoadEvent();
  } else if (state.roomPhase === 'floor-complete') {
    mainContent = renderFloorComplete();
  } else if (state.roomPhase === 'relic-choice') {
    mainContent = renderRelicChoice();
  } else {
    mainContent = renderRoomActive(state.currentRoom);
  }

  const bossesDefeated = state.rooms.filter(r => r.isBoss).length;

  app.innerHTML = `
    <div id="dungeon-screen" class="screen active">
      <div class="dungeon-layout">
        <div class="song-info-bar">
          <div class="song-info-item" style="color:${{easy:'var(--green)',normal:'var(--text)',hard:'var(--orange)',nightmare:'var(--red)'}[state.difficulty]};">${diff().label}</div>
          <div class="song-info-item">KEY <span>${state.key} ${state.scale}</span></div>
          <div class="song-info-item">BPM <span>${state.bpm}</span></div>
          <div class="song-info-divider"></div>
          <div class="song-info-item">FLOOR <span>${state.floor}</span></div>
          <div class="song-info-item">ROOM <span>#${state.rooms.length}</span></div>
          <div class="song-info-divider"></div>
          <div class="song-info-item">SCORE <span>${state.score}</span></div>
          <div class="song-info-item">GOLD <span style="color:var(--gold);">${state.gold}g</span></div>
          <div class="song-info-item">RE-ROLLS <span class="reroll-count">${state.rerolls}</span></div>
          ${state.relics.length > 0 ? '<div class="song-info-item" style="color:var(--purple);">RELICS <span style="color:var(--purple);">' + state.relics.length + '</span></div>' : ''}
          ${state.shieldNextRoom ? '<div class="song-info-item" style="color:var(--green)">SHIELD ACTIVE</div>' : ''}
        </div>
        <button class="rules-btn-fixed" onclick="showHelp()">? RULES</button>

        <div class="room-main">
          ${mainContent}
        </div>
      </div>

      <div class="log-overlay" id="log-overlay" onclick="toggleQuestLog()"></div>
      <button class="log-toggle ${state.deferredCurses.some(c => !c.completed) ? 'has-curses' : ''}" id="log-toggle" onclick="toggleQuestLog()">
        QUEST LOG
      </button>
      <div class="panel log-panel" id="log-panel">
        <div class="panel-header">Quest Log</div>
        ${renderSessionLog()}
      </div>
    </div>
  `;

  if (state.roomPhase === 'map') {
    requestAnimationFrame(() => drawMapConnections());
  }
}

function renderMap() {
  if (!state.map) return '';
  const reachable = getReachableNodes();
  const startNode = getNodeById('0-0');
  const startNotEntered = startNode && !startNode.completed && !state.currentNodeId;
  const bossNode = state.map.rows[state.map.rows.length - 1][0];
  const bossDefeated = bossNode.completed;

  let html = `
    <div class="panel">
      <div class="map-floor-label">FLOOR ${state.floor}</div>
      <div class="map-container" id="map-container">
        <svg class="map-svg" id="map-svg"></svg>
        <div class="map-rows" id="map-rows">
  `;

  // Render rows (reversed in CSS via column-reverse so row 0 = bottom)
  for (let r = 0; r < state.map.rows.length; r++) {
    const row = state.map.rows[r];
    html += `<div class="map-row" data-row="${r}">`;

    for (const node of row) {
      const nt = NODE_TYPES[node.type] || NODE_TYPES.standard;
      const isReachable = reachable.includes(node.id) || (startNotEntered && node.id === '0-0');
      const isCurrent = state.currentNodeId === node.id;
      const isCompleted = node.completed;
      const isLocked = !isReachable && !isCurrent && !isCompleted;

      let classes = 'map-node';
      if (startNotEntered && node.id === '0-0') classes += ' map-node-start';
      else if (isReachable && !isCompleted) classes += ' reachable';
      if (isCurrent) classes += ' current';
      if (isCompleted) classes += ' completed';
      if (isLocked) classes += ' locked';

      const canReroll = isReachable && !isCompleted && node.type !== 'start' && node.type !== 'boss' && state.rerolls > 0;

      html += `
        <div class="${classes}" data-node-id="${node.id}"
          ${isReachable && !isCompleted && node.type !== 'boss' && !(startNotEntered && node.id === '0-0') ? `onclick="enterNodeFromMap('${node.id}')"` : ''}>

          ${canReroll ? `<button class="map-node-reroll" onclick="event.stopPropagation(); rerollNode('${node.id}')" title="Reroll (${state.rerolls} left)">↻</button>` : ''}

          <div class="map-node-type" style="color:${nt.color};">${isCompleted ? '✓ ' + nt.label : nt.label}</div>
          ${node.trackType ? `<div class="map-node-track">${node.trackType}</div>` : ''}

          <div class="map-tooltip">
            <div class="map-tooltip-row" style="color:${nt.color}; font-family:var(--font-pixel); font-size:10px;">${nt.label}</div>
            <div class="map-tooltip-row" style="color:var(--dim); font-size:12px;">${nt.desc}</div>
            ${node.trackType ? `<div class="map-tooltip-row">Track: <span style="color:var(--gold);">${node.trackType}</span></div>` : ''}
            ${node.preview.curseCount > 0 ? `<div class="map-tooltip-row" style="color:var(--red);">Curses: ${node.preview.curseCount}</div>` : ''}
            ${node.preview.effectCount > 0 ? `<div class="map-tooltip-row" style="color:var(--blue);">Effects: ${node.preview.effectCount}</div>` : ''}
            ${node.preview.hasBlessing ? `<div class="map-tooltip-row" style="color:var(--green);">Blessing present</div>` : ''}
            ${node.type === 'campfire' ? `<div class="map-tooltip-row" style="color:var(--orange);">No track — shop only</div>` : ''}
            ${node.type === 'relic' ? `<div class="map-tooltip-row" style="color:var(--purple);">You sense a relic in this room</div>` : ''}
          </div>
        </div>
      `;
    }
    html += `</div>`;
  }

  html += `</div></div>`;

  // Start node: instrument picker at bottom
  if (startNotEntered) {
    html += `
      <div class="map-start-select">
        <div style="font-family:var(--font-pixel); font-size:11px; color:var(--gold); margin-bottom:12px; letter-spacing:1.5px;">CHOOSE YOUR FIRST INSTRUMENT</div>
        <select class="track-select" id="track-type-select">
          <option value="">— Choose instrument —</option>
          ${TRACK_TYPES.map(t => `<option value="${t}">${t}</option>`).join('')}
        </select>
        <div style="margin-top:14px;">
          <button class="btn btn-small" onclick="enterStartNode()">ENTER THE DUNGEON</button>
        </div>
      </div>
    `;
  }

  // Boss node: track type selection (when reachable)
  const bossReachable = reachable.includes(bossNode.id) && !bossDefeated;
  if (bossReachable) {
    html += `
      <div class="map-start-select" style="border-color:var(--red);">
        <div style="font-family:var(--font-pixel); font-size:11px; color:var(--red); margin-bottom:12px;">CHOOSE YOUR WEAPON FOR THE BOSS</div>
        <select class="track-select" id="boss-track-select">
          <option value="">— Choose your instrument —</option>
          ${TRACK_TYPES.map(t => `<option value="${t}">${t}</option>`).join('')}
        </select>
        <div style="margin-top:14px;">
          <button class="btn" style="border-color:var(--red); color:var(--red);" onclick="enterBossNode()">FACE THE BOSS</button>
        </div>
      </div>
    `;
  }

  // End session button (only after boss defeated on this floor)
  if (bossDefeated) {
    html += `
      <div style="text-align:center; margin-top:16px;">
        <button class="btn" onclick="nextFloor()">DESCEND DEEPER</button>
        <button class="btn btn-small btn-danger" style="margin-left:12px;" onclick="endSession()">END SESSION</button>
      </div>
    `;
  }

  html += `</div>`;
  return html;
}

function drawMapConnections() {
  const svg = document.getElementById('map-svg');
  const container = document.getElementById('map-container');
  if (!svg || !container || !state.map) return;

  const containerRect = container.getBoundingClientRect();
  svg.setAttribute('viewBox', `0 0 ${containerRect.width} ${containerRect.height}`);
  svg.innerHTML = '';

  const reachable = getReachableNodes();
  const playerPath = [];
  // Build player's taken path
  if (state.currentNodeId) {
    // Find all completed nodes that form the path
    for (const row of state.map.rows) {
      for (const node of row) {
        if (node.completed) playerPath.push(node.id);
      }
    }
    playerPath.push(state.currentNodeId);
  }

  // Helper: clip a line endpoint to the edge of a node's bounding box
  function clipToEdge(cx, cy, hw, hh, tx, ty) {
    const dx = tx - cx, dy = ty - cy;
    if (dx === 0 && dy === 0) return { x: cx, y: cy };
    const sx = dx !== 0 ? hw / Math.abs(dx) : Infinity;
    const sy = dy !== 0 ? hh / Math.abs(dy) : Infinity;
    const s = Math.min(sx, sy);
    return { x: cx + dx * s, y: cy + dy * s };
  }

  for (const conn of state.map.connections) {
    const fromEl = container.querySelector(`[data-node-id="${conn.from}"]`);
    const toEl = container.querySelector(`[data-node-id="${conn.to}"]`);
    if (!fromEl || !toEl) continue;

    const fromRect = fromEl.getBoundingClientRect();
    const toRect = toEl.getBoundingClientRect();

    const fcx = fromRect.left + fromRect.width / 2 - containerRect.left;
    const fcy = fromRect.top + fromRect.height / 2 - containerRect.top;
    const tcx = toRect.left + toRect.width / 2 - containerRect.left;
    const tcy = toRect.top + toRect.height / 2 - containerRect.top;

    // Clip lines to node edges with a small margin so they don't touch the border
    const margin = 4;
    const p1 = clipToEdge(fcx, fcy, fromRect.width / 2 + margin, fromRect.height / 2 + margin, tcx, tcy);
    const p2 = clipToEdge(tcx, tcy, toRect.width / 2 + margin, toRect.height / 2 + margin, fcx, fcy);

    const isActive = playerPath.includes(conn.from) && playerPath.includes(conn.to);
    const isReachable = playerPath.includes(conn.from) && reachable.includes(conn.to);

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', p1.x);
    line.setAttribute('y1', p1.y);
    line.setAttribute('x2', p2.x);
    line.setAttribute('y2', p2.y);
    if (isActive) line.classList.add('path-active');
    else if (isReachable) line.classList.add('path-reachable');
    svg.appendChild(line);
  }
}



function renderRoomActive(room) {
  if (!room) return '';
  const panelClass = room.isBoss ? 'boss-room' : room.isAlchemist ? 'alchemist-room' : room.isYouTube ? 'youtube-room' : '';
  const panelStyle = room.isSideQuest && !room.isBoss && !room.isAlchemist ? 'style="border-color:var(--orange);"' : '';
  return `
    <div class="panel ${panelClass}" ${panelStyle}>

      ${room.isSideQuest ? `
        <div class="side-quest-banner">SIDE QUEST</div>
        <div class="side-quest-info">
          You chose <span style="color:var(--gold);">${room.originalTrackType}</span> but the dungeon demands <span style="color:var(--orange);">${room.trackType}</span>!<br>
          <span class="sq-dim">Complete all tasks for 2 guaranteed rerolls, or skip with no penalty.</span>
        </div>
      ` : ''}

      ${(() => {
        const pendingDeferred = state.deferredCurses.filter(c => !c.completed).length;
        if (room.isBoss && room.forcedDeferredCount > 0) {
          return '<div class="deferred-warning">Your deferred curses have been applied to this battle!</div>';
        } else if (!room.isBoss && pendingDeferred > 0) {
          return `<div class="deferred-warning">You have ${pendingDeferred} deferred curse${pendingDeferred > 1 ? 's' : ''} pending. Complete them before the boss or they'll be forced upon you!</div>`;
        }
        return '';
      })()}

      <div style="text-align:center;">
        ${room.isBoss ? '<div class="boss-badge">BOSS ENCOUNTER</div>' : ''}
        ${room.isAlchemist ? '<div class="alchemist-badge">Alchemist\'s Lair</div>' : ''}
        ${room.isYouTube && !room.isBoss && !room.isAlchemist ? '<div class="youtube-badge">YouTube Sample Room</div>' : ''}
        <div class="room-header">${room.name}</div>
      </div>
      <div class="room-number">ROOM #${room.number} · <span style="text-transform:uppercase;">${trackTip(room.trackType)}</span></div>

      <!-- Genre Directive -->
      <div class="result-section">
        <div class="result-label genre-label">${room.isAlchemist ? 'Alchemist Directive' : room.isYouTube ? 'YouTube Directive' : 'Genre Directive'}</div>
        <div class="result-text genre-text">
          ${injectGenreTip(room.genreDirective, room.genre, !room.isAlchemist && state.rerolls > 0)}
        </div>
      </div>

      <!-- Curses -->
      ${room.curses.length > 0 ? `
        <div class="result-section">
          <div class="result-label curse-label">${room.curses.length > 1 ? 'Curses' : 'Curse'}</div>
          ${room.curses.map((c, i) => `
            <div class="result-text curse-text">
              ${c.type === 'carried' ? '[CARRIED] ' : c.type === 'boss-curse' ? '[BOSS] ' : c.type === 'deferred-forced' ? '[DEFERRED] ' : ''}${c.text}
              ${c.type !== 'carried' && c.type !== 'deferred-forced' && state.rerolls > 0 ? `<button class="reroll-inline" onclick="rerollCurse(${i})" title="Reroll this curse (${state.rerolls} left)">↻</button>` : ''}
            </div>
          `).join('')}
        </div>
      ` : `
        <div class="result-section">
          <div class="result-label" style="color:var(--dim);">No curse — the spirits spare you... this time</div>
        </div>
      `}

      <!-- Deferred / Next Room Curses (announced) -->
      ${room.newDeferredCurses.length > 0 ? `
        <div class="result-section">
          <div class="result-label curse-label">Deferred Curse Added to Quest Log</div>
          ${room.newDeferredCurses.map(c => `
            <div class="result-text" style="color:var(--red); font-size:14px; opacity:0.8;">→ ${c.text}</div>
          `).join('')}
        </div>
      ` : ''}
      ${room.newNextRoomCurses.length > 0 ? `
        <div class="result-section">
          <div class="result-label curse-label">A Curse Awaits in the Next Room...</div>
        </div>
      ` : ''}

      <!-- Effects -->
      ${room.effects.length > 0 ? `
        <div class="result-section">
          <div class="result-label effect-label">Enchantments (Effects)</div>
          ${room.effects.map((e, i) => `
            <div style="margin-bottom:10px;">
              <div style="color:var(--blue); margin-bottom:4px;">
                ${effectTip(e.name)}
                ${state.rerolls > 0 ? `<button class="reroll-inline" onclick="rerollEffect(${i})" title="Reroll this effect (${state.rerolls} left)">↻</button>` : ''}
              </div>
              <div class="effect-bar">
                <div class="effect-bar-track">
                  <div class="effect-bar-fill" style="width:${e.percentage}%"></div>
                </div>
                <div class="effect-pct">${e.percentage}%</div>
              </div>
            </div>
          `).join('')}
        </div>
      ` : `
        <div class="result-section">
          <div class="result-label" style="color:var(--dim);">No mandatory effects — enchant freely</div>
        </div>
      `}

      <!-- Blessing -->
      ${room.blessing ? `
        <div class="result-section">
          <div class="result-label blessing-label">Blessing</div>
          <div class="result-text blessing-text">${room.blessing}</div>
        </div>
      ` : ''}

      <!-- Checklist (required tasks) -->
      <div class="result-section" style="margin-top:20px; border-top: 1px solid var(--border); padding-top:16px;">
        <div class="result-label" style="color:var(--gold);">Room Checklist</div>
        ${room.checklist.map((item, i) => `
          <div class="checklist-item" onclick="toggleCheck(${i})">
            <div class="check-box ${item.completed ? 'checked' : ''}">${item.completed ? '✓' : ''}</div>
            <div class="checklist-text ${item.completed ? 'done' : ''}">${item.text}</div>
            <span style="font-family:var(--font-pixel); font-size:10px; color:var(--gold-dim); white-space:nowrap; margin-left:auto;">+${goldForType(item.type)}g</span>
          </div>
        `).join('')}
      </div>

      <!-- Bonus Objective (optional — increases reroll chance) -->
      ${room.flavorRoll ? `
        <div class="bonus-section">
          <div class="bonus-label">Bonus Objective (optional)</div>
          <div class="checklist-item" onclick="toggleBonus()" style="border-bottom:none; padding-bottom:0;">
            <div class="check-box ${room.bonusCompleted ? 'checked' : ''}">${room.bonusCompleted ? '✓' : ''}</div>
            <div class="checklist-text ${room.bonusCompleted ? 'done' : ''}" style="color:var(--gold);">${room.flavorRoll.label}: ${room.flavorRoll.text}</div>
          </div>
          <div class="bonus-hint">Completing this increases your reroll chance from 50% to 75%</div>
        </div>
      ` : ''}

      <!-- Actions -->
      ${(() => {
        const totalMandatory = room.checklist.length;
        const completedMandatory = room.checklist.filter(i => i.completed).length;
        const pct = totalMandatory > 0 ? completedMandatory / totalMandatory : 0;
        const threshold = room.isSideQuest ? 1.0 : 0.5;
        const thresholdLabel = room.isSideQuest ? '100%' : '50%';
        const canSeal = pct >= threshold;
        return `
          <div class="btn-row" style="margin-top:20px; justify-content: center;">
            ${room.isSideQuest ? '<button class="btn btn-small btn-orange" onclick="skipSideQuest()">SKIP SIDE QUEST</button>' : ''}
            <button class="btn btn-green" id="seal-btn" onclick="sealRoom()" ${canSeal ? '' : 'disabled style="opacity:0.3; cursor:not-allowed; pointer-events:none;"'}>SEAL THE ROOM</button>
          </div>
          ${!canSeal ? '<div style="text-align:center; margin-top:8px; font-size:14px; color:var(--dim);">Complete at least ' + thresholdLabel + ' of tasks to seal (' + Math.round(pct * 100) + '% done)</div>' : ''}
        `;
      })()}
    </div>
  `;
}

function renderTransition() {
  const td = state.transitionData;
  if (!td) return '';

  if (!td.allCompleted) {
    return `
      <div class="panel transition-panel">
        <div class="room-header" style="margin-bottom:16px;">ROOM SEALED</div>
        <div style="color:var(--dim); font-size:17px; margin:20px 0; line-height:1.6;">
          You left tasks unfinished.<br>No chance to earn a reroll.
        </div>
        <div style="color:var(--dim); font-family:var(--font-pixel); font-size:11px; letter-spacing:1px; margin-bottom:16px;">STREAK RESET</div>
        <button class="btn" onclick="continueFromTransition()">CONTINUE</button>
      </div>
    `;
  }

  if (td.isBoss) {
    return `
      <div class="panel transition-panel" style="border-color:#4d1a1a; background:#1a0a0a; box-shadow:0 0 25px rgba(192,57,43,0.2);">
        <div class="room-header" style="color:var(--red-glow); margin-bottom:16px; animation: bossPulse 2s infinite;">BOSS DEFEATED!</div>
        <div style="color:var(--green); font-family:var(--font-pixel); font-size:14px; margin:16px 0;">
          +2 REROLLS EARNED!
        </div>
        ${td.streakReward ? '<div class="reward-banner streak-banner"><span class="streak-flames">🔥🔥🔥</span><span>COMPLETION STREAK! +1 REROLL</span></div>' : ''}
        ${td.curseSurvivor ? '<div class="reward-banner survivor-banner"><span class="survivor-icon">🛡️💀</span><span>CURSE SURVIVOR! +1 REROLL</span></div>' : ''}
        ${td.bossBlessing ? `
          <div style="margin:16px 0; padding:12px 16px; border:1px solid var(--green); border-radius:4px; background:rgba(39,174,96,0.08);">
            <div style="font-family:var(--font-pixel); font-size:10px; color:var(--green); letter-spacing:2px; margin-bottom:8px;">BOSS BLESSING</div>
            <div style="color:var(--green); font-size:17px;">${td.bossBlessing}</div>
          </div>
        ` : ''}
        <div style="color:var(--dim); font-size:16px; margin:16px 0;">
          A campfire awaits beyond the boss chamber...
        </div>
        <button class="btn" onclick="continueFromTransition()">CONTINUE TO CAMPFIRE</button>
      </div>
    `;
  }

  if (td.isSideQuest) {
    return `
      <div class="panel transition-panel" style="border-color:var(--orange);">
        <div class="room-header" style="color:var(--orange); margin-bottom:16px;">SIDE QUEST COMPLETE!</div>
        <div style="color:var(--green); font-family:var(--font-pixel); font-size:16px; margin:20px 0; animation: glowPulse 2s infinite;">
          +2 REROLLS EARNED!
        </div>
        ${td.streakReward ? '<div class="reward-banner streak-banner"><span class="streak-flames">🔥🔥🔥</span><span>COMPLETION STREAK! +1 REROLL</span></div>' : ''}
        ${td.curseSurvivor ? '<div class="reward-banner survivor-banner"><span class="survivor-icon">🛡️💀</span><span>CURSE SURVIVOR! +1 REROLL</span></div>' : ''}
        <div style="color:var(--dim); font-size:16px; margin-bottom:24px;">
          The spirits reward your bravery.
        </div>
        <button class="btn" onclick="continueFromTransition()">CONTINUE</button>
      </div>
    `;
  }

  if (td.isMastery) {
    return `
      <div class="panel transition-panel mastery-transition">
        <div class="mastery-badge">\u2605 ROOM MASTERED \u2605</div>
        <div style="color:var(--dim); font-size:15px; margin:16px 0;">
          Perfect execution. The dungeon acknowledges your mastery.
        </div>

        <div class="mastery-criteria">
          <div class="mastery-criteria-item"><span style="color:var(--green);">\u2713</span> All tasks completed</div>
          <div class="mastery-criteria-item"><span style="color:var(--green);">\u2713</span> Bonus objective completed</div>
          <div class="mastery-criteria-item"><span style="color:var(--green);">\u2713</span> Zero rerolls used</div>
        </div>

        <div class="mastery-rewards">
          <div class="mastery-reward-card">
            <div style="font-size:24px;">&#127922;</div>
            <div>+${td.rerollCount} Reroll</div>
            <div style="font-size:11px; color:var(--dim);">Guaranteed</div>
          </div>
          <div class="mastery-reward-card">
            <div style="font-size:24px; color:var(--gold);">+${td.masteryGoldBonus}g</div>
            <div>Gold Bonus</div>
          </div>
          <div class="mastery-reward-card">
            <div style="font-size:24px; color:var(--purple);">+${td.masteryScoreBonus}</div>
            <div>Score Bonus</div>
          </div>
        </div>

        ${td.streakReward ? '<div class="reward-banner streak-banner"><span class="streak-flames">\uD83D\uDD25\uD83D\uDD25\uD83D\uDD25</span><span>COMPLETION STREAK! +1 REROLL</span></div>' : ''}
        ${td.streakCount > 0 && !td.streakReward ? '<div class="streak-counter">STREAK: ' + td.streakCount + '/' + (hasRelic('streak_talisman') ? 2 : 3) + '</div>' : ''}
        ${td.curseSurvivor ? '<div class="reward-banner survivor-banner"><span class="survivor-icon">\uD83D\uDEE1\uFE0F\uD83D\uDC80</span><span>CURSE SURVIVOR! +1 REROLL</span></div>' : ''}

        <div style="margin-top:20px;">
          <button class="btn" onclick="continueFromTransition()">CONTINUE</button>
        </div>
      </div>
    `;
  }

  return `
    <div class="panel transition-panel">
      <div class="room-header" style="margin-bottom:8px;">ROOM SEALED</div>
      <div style="color:var(--dim); font-size:15px; margin-bottom:16px;">
        All tasks completed${td.bonusCompleted ? ' + Bonus' : ''}. The spirits judge your work...
      </div>
      ${td.streakCount > 0 && !td.streakReward ? '<div class="streak-counter">STREAK: ' + td.streakCount + '/' + (hasRelic('streak_talisman') ? 2 : 3) + '</div>' : ''}
      <div class="roll-details" style="margin-bottom:8px;">
        <div style="margin-bottom:6px;"><span class="roll-chance">CHANCE: ${101 - td.rollTarget}%</span></div>
        <div><span style="color:var(--green); font-family:var(--font-pixel); font-size:11px; letter-spacing:2px;">SUCCESS: ${td.rollTarget} OR HIGHER</span></div>
      </div>
      <div class="spell-container" id="spell-container">
        <div class="spell-display"><span id="spell-glyph">✧</span></div>
      </div>
      <div id="roll-result-line" class="roll-details" style="display:none; margin-top:8px;"></div>
      <div id="transition-result" class="transition-result" style="display:none;"></div>

      <div id="streak-banner" class="reward-banner streak-banner" style="display:none;">
        <span class="streak-flames">🔥🔥🔥</span>
        <span>COMPLETION STREAK! +1 REROLL</span>
      </div>

      <div id="survivor-banner" class="reward-banner survivor-banner" style="display:none;">
        <span class="survivor-icon">🛡️💀</span>
        <span>CURSE SURVIVOR! +1 REROLL</span>
      </div>

      <div id="don-section">
        <button id="don-btn" class="btn don-btn" style="display:none;" onclick="doubleOrNothing()">DOUBLE OR NOTHING?</button>
        <div id="don-roll-details" class="roll-details" style="display:none; margin-bottom:8px;">
          <div style="margin-bottom:6px;"><span class="roll-chance">CHANCE: ${101 - td.rollTarget}%</span></div>
          <div><span style="color:var(--green); font-family:var(--font-pixel); font-size:11px; letter-spacing:2px;">SUCCESS: ${td.rollTarget} OR HIGHER</span></div>
        </div>
        <div class="spell-container" id="don-spell-container" style="display:none;">
          <div class="spell-display"><span id="don-spell-glyph">✧</span></div>
        </div>
        <div id="don-roll-result-line" class="roll-details" style="display:none; margin-top:8px;"></div>
        <div id="don-result" class="don-result" style="display:none;"></div>
      </div>

      <div id="transition-continue" style="display:none;">
        <button class="btn" onclick="continueFromTransition()">CONTINUE</button>
      </div>
    </div>
  `;
}

function renderChest() {
  const cd = state.chestData;
  if (!cd) return '';

  let rewardText = '';
  if (cd.reward === 'reroll') rewardText = '+1 Reroll Token';
  else if (cd.reward === 'blessing') rewardText = 'A Random Blessing';
  else if (cd.reward === 'shield') rewardText = 'Curse Shield (next room)';
  else if (cd.reward === 'relic' && cd.relicGranted) rewardText = cd.relicGranted.name + ' (Relic)';

  return `
    <div class="panel chest-panel">
      <div class="chest-icon">[?]</div>
      <div class="room-header" style="color:var(--gold); margin-bottom:16px;">TREASURE CHEST!</div>
      <div style="color:var(--dim); font-size:17px; margin:16px 0; line-height:1.6;">
        ${cd.message}
      </div>
      ${cd.collected ? `
        <div style="color:var(--green); font-family:var(--font-pixel); font-size:14px; margin:20px 0; animation: glowPulse 2s infinite;">
          ${rewardText}
        </div>
        <button class="btn" onclick="proceedFromChest()">CONTINUE TO ROOM</button>
      ` : `
        <div style="margin:24px 0;">
          <button class="btn btn-green" onclick="collectChest()" style="font-size:15px;">OPEN THE CHEST</button>
        </div>
      `}
    </div>
  `;
}

function renderCampfire() {
  const hasDeferredCurses = state.deferredCurses.filter(c => !c.completed).length > 0;
  const hasNextRoomCurses = state.nextRoomCurses.length > 0;
  const postBoss = state.rooms.some(r => r.isBoss);
  const campfireMsg = postBoss
    ? 'The boss has fallen. Rest by the fire and spend your gold.'
    : 'A warm glow cuts through the darkness. Rest here and spend your gold before pressing on.';

  return `
    <div class="panel campfire-panel">
      <div class="room-header" style="color:var(--orange); margin-bottom:8px;">CAMPFIRE REST</div>
      <div style="color:var(--dim); font-size:16px; margin-bottom:24px;">
        ${campfireMsg}
      </div>
      <div style="color:var(--gold); font-family:var(--font-pixel); font-size:14px; margin-bottom:20px;">
        GOLD: ${state.gold}g
      </div>

      <div style="max-width:400px; margin:0 auto; text-align:left;">
        <div class="campfire-shop-item ${!hasDeferredCurses || state.gold < (hasRelic('purifying_flame') ? 10 : 15) ? 'disabled' : ''}" onclick="buyCampfireItem('removeCurse')">
          <div>
            <div style="color:var(--red);">Remove a Deferred Curse</div>
            <div style="font-size:13px; color:var(--dim);">Clear the oldest incomplete deferred curse</div>
          </div>
          <div style="font-family:var(--font-pixel); font-size:12px; color:var(--gold);">${hasRelic('purifying_flame') ? '10g' : '15g'}</div>
        </div>

        <div class="campfire-shop-item ${state.gold < 10 ? 'disabled' : ''}" onclick="buyCampfireItem('shield')">
          <div>
            <div style="color:var(--green);">Shield Next Room</div>
            <div style="font-size:13px; color:var(--dim);">Next room cannot be cursed</div>
          </div>
          <div style="font-family:var(--font-pixel); font-size:12px; color:var(--gold);">10g</div>
        </div>

        <div class="campfire-shop-item ${state.gold < 20 ? 'disabled' : ''}" onclick="buyCampfireItem('reroll')">
          <div>
            <div style="color:var(--purple);">Buy a Reroll</div>
            <div style="font-size:13px; color:var(--dim);">Gain +1 reroll token</div>
          </div>
          <div style="font-family:var(--font-pixel); font-size:12px; color:var(--gold);">20g</div>
        </div>

        <div class="campfire-shop-item ${!hasNextRoomCurses || state.gold < 12 ? 'disabled' : ''}" onclick="buyCampfireItem('removeNextRoom')">
          <div>
            <div style="color:var(--orange);">Remove a Next-Room Curse</div>
            <div style="font-size:13px; color:var(--dim);">Clear the next-room curse waiting for you</div>
          </div>
          <div style="font-family:var(--font-pixel); font-size:12px; color:var(--gold);">12g</div>
        </div>

        <div class="campfire-shop-item ${state.gold < 50 || getAvailableRelics().length === 0 ? 'disabled' : ''}" onclick="buyCampfireItem('buyRelic')">
          <div>
            <div style="color:var(--purple);">Buy a Relic</div>
            <div style="font-size:13px; color:var(--dim);">Choose from 2 random relics</div>
          </div>
          <div style="font-family:var(--font-pixel); font-size:12px; color:var(--gold);">50g</div>
        </div>
      </div>

      <div style="margin-top:24px;">
        <button class="btn" onclick="leaveCampfire()">LEAVE THE CAMPFIRE</button>
      </div>
    </div>
  `;
}

function renderFloorComplete() {
  return `
    <div class="panel floor-complete-panel">
      <div style="font-family:var(--font-pixel); font-size:12px; color:var(--dim); letter-spacing:3px; margin-bottom:16px;">* * *</div>
      <div class="room-header" style="color:var(--green); margin-bottom:8px; animation:none; text-shadow:0 0 15px rgba(39,174,96,0.4);">FLOOR ${state.floor} COMPLETE</div>
      <div class="title-divider" style="margin:20px auto;"></div>

      <div style="color:var(--text); font-size:17px; line-height:1.8; margin:24px 0; text-align:left; max-width:560px; margin-left:auto; margin-right:auto;">
        <p style="margin-bottom:16px;">
          Congratulations. You've survived floor ${state.floor} of the dungeon.
          You may now choose to <strong style="color:var(--green);">complete your session</strong> and finish your song with what you have,
          or <strong style="color:var(--gold);">delve deeper</strong> to add more elements.
        </p>
      </div>

      <div class="floor-complete-rules">
        <div style="font-family:var(--font-pixel); font-size:10px; color:var(--gold); letter-spacing:2px; margin-bottom:12px;">IF YOU COMPLETE NOW</div>
        <ul class="floor-rules-list">
          <li>You may only use what you've already created to finish your song</li>
          <li>You <strong>cannot</strong> add new elements, instruments, or samples</li>
          <li>You <strong>can</strong> delete small things — remove a vocal chop, trim a layer — but keep your track intact</li>
          <li>Anything bound by a curse <strong>must stay</strong> — if a curse says sustain a note or keep an element, you cannot remove it</li>
          <li>Mixing, arrangement, and automation are free game — polish what you have</li>
        </ul>
        <div style="font-size:14px; color:var(--dim); margin-top:12px; font-style:italic;">
          If you want to add new elements, you must continue to the next floor.
        </div>
      </div>

      <div style="display:flex; gap:16px; justify-content:center; margin-top:32px; flex-wrap:wrap;">
        <button class="btn" style="border-color:var(--gold); color:var(--gold);" onclick="nextFloor()">DELVE DEEPER</button>
        <button class="btn btn-green" onclick="endSession()">COMPLETE SESSION</button>
      </div>
    </div>
  `;
}

function renderRoadEvent() {
  const ev = state.roadEventData;
  if (!ev) return '';

  // Free pickup — simple, no cost, no decline
  if (ev.event.free) {
    return `
      <div class="panel free-pickup-panel">
        <div style="text-align:center;">
          <div style="font-family:var(--font-pixel); font-size:10px; color:var(--gold); letter-spacing:3px; margin-bottom:8px;">FOUND SOMETHING</div>
          <div class="room-header" style="color:var(--gold); animation:none; text-shadow:0 0 15px rgba(212,165,116,0.4);">${ev.event.name}</div>
        </div>
        <div style="color:var(--dim); font-size:17px; text-align:center; margin:20px 0; line-height:1.7;">
          ${ev.event.description}
        </div>
        <div style="text-align:center; margin:20px 0;">
          <div class="free-pickup-reward">${ev.event.reward.text}</div>
        </div>
        <div style="text-align:center; margin-top:24px;">
          <button class="btn btn-green" onclick="acceptRoadEvent()">PICK UP AND CONTINUE</button>
        </div>
      </div>
    `;
  }

  return `
    <div class="panel" style="border-color:var(--purple-dim); background:#12091a; box-shadow:0 0 25px rgba(155,89,182,0.15), inset 0 0 40px rgba(155,89,182,0.05);">
      <div style="text-align:center;">
        <div style="font-family:var(--font-pixel); font-size:10px; color:var(--purple); letter-spacing:3px; margin-bottom:8px;">ROAD EVENT</div>
        <div class="room-header" style="color:var(--purple); animation:none; text-shadow:0 0 15px rgba(155,89,182,0.4);">${ev.event.name}</div>
      </div>
      <div style="color:var(--dim); font-size:17px; text-align:center; margin:20px 0; line-height:1.7;">
        ${ev.event.description}
      </div>

      <div style="max-width:500px; margin:0 auto;">
        <div style="padding:16px; border:1px solid rgba(39,174,96,0.3); border-radius:4px; background:rgba(39,174,96,0.05); margin-bottom:12px;">
          <div style="font-family:var(--font-pixel); font-size:10px; color:var(--green); letter-spacing:2px; margin-bottom:8px;">REWARD</div>
          <div style="color:var(--green); font-size:17px;">${ev.event.reward.text}</div>
        </div>

        <div style="padding:16px; border:1px solid rgba(155,89,182,0.3); border-radius:4px; background:rgba(155,89,182,0.05);">
          <div style="font-family:var(--font-pixel); font-size:10px; color:var(--purple); letter-spacing:2px; margin-bottom:8px;">THE COST</div>
          <div style="color:var(--text); font-size:17px; line-height:1.7;">${ev.event.cost}</div>
        </div>
      </div>

      <div style="display:flex; gap:12px; justify-content:center; margin-top:24px;">
        <button class="btn btn-green" onclick="acceptRoadEvent()">ACCEPT THE DEAL</button>
        <button class="btn" onclick="declineRoadEvent()">DECLINE AND MOVE ON</button>
      </div>
    </div>
  `;
}

function renderRelicChoice() {
  const pc = state.pendingRelicChoice;
  if (!pc || !pc.relics.length) return '';

  const exhausted = getAvailableRelics().length === 0;
  if (exhausted) {
    return `
      <div class="panel relic-panel">
        <div class="relic-chamber-icon">\u25C7</div>
        <div class="room-header" style="color:var(--purple); margin-bottom:16px;">RELIC CHAMBER</div>
        <div style="color:var(--dim); font-size:17px; margin:20px 0;">
          The chamber is empty. You have collected all available relics.
        </div>
        <button class="btn" onclick="skipRelicChoice()">CONTINUE</button>
      </div>
    `;
  }

  return `
    <div class="panel relic-panel">
      <div class="relic-chamber-icon">\u25C7</div>
      <div class="room-header" style="color:var(--purple); margin-bottom:8px;">RELIC CHAMBER</div>
      <div style="color:var(--dim); font-size:16px; margin-bottom:24px;">Choose a relic to carry with you...</div>

      <div class="relic-choices">
        ${pc.relics.map(r => {
          const tierInfo = RELIC_TIERS[r.tier];
          return `
            <div class="relic-card" data-tier="${r.tier}" onclick="selectRelic('${r.id}')">
              <div class="relic-card-name" style="color:${tierInfo.color};">${r.name}</div>
              <div class="relic-card-tier" style="color:${tierInfo.color};">${tierInfo.label}</div>
              <div class="relic-card-desc">${r.description}</div>
            </div>
          `;
        }).join('')}
      </div>

      <div style="text-align:center; margin-top:20px;">
        <button class="btn btn-small" onclick="skipRelicChoice()">SKIP</button>
      </div>
    </div>
  `;
}

function renderSessionLog() {
  let html = '';

  if (state.rooms.length === 0 && !state.currentRoom) {
    html += '<div style="color:var(--dim); font-size:13px;">No rooms completed yet. Choose your path and enter...</div>';
  }

  for (const room of state.rooms) {
    const logClass = room.isBoss ? 'boss-log' : room.isAlchemist ? 'alchemist-log' : room.isYouTube ? 'youtube-log' : '';
    const logPrefix = room.isBoss ? '[BOSS] ' : room.isSideQuest ? '[SIDE QUEST] ' : room.isAlchemist ? '[ALCHEMIST] ' : room.isYouTube ? '[YOUTUBE] ' : '';
    html += `
      <div class="log-entry ${logClass}">
        <div class="log-entry-header">${logPrefix}ROOM #${room.number} — ${room.name}</div>
        <div class="log-entry-detail">${room.trackType} · ${room.genre} ${room.isYouTube ? '(YouTube)' : ''}${room.isAlchemist ? '(Alchemist)' : ''}${room.isBoss ? '(BOSS)' : ''}</div>
        ${room.flavorRoll ? `<div class="log-entry-detail">${room.flavorRoll.label}: ${room.flavorRoll.text} ${room.bonusCompleted ? '<span style="color:var(--green);">(completed)</span>' : '<span style="opacity:0.4;">(skipped)</span>'}</div>` : ''}
        ${room.curses.map(c => `<div class="log-entry-detail curse">${c.text}</div>`).join('')}
        ${room.effects.map(e => `<div class="log-entry-detail effect">${e.name}: ${e.percentage}%</div>`).join('')}
        ${room.blessing ? `<div class="log-entry-detail blessing">${room.blessing}</div>` : ''}
      </div>
    `;
  }

  if (state.deferredCurses.length > 0) {
    html += `
      <div class="pending-section">
        <div class="panel-header" style="color:var(--red);">Deferred Curses</div>
        ${state.deferredCurses.map((c, i) => `
          <div class="pending-curse ${c.completed ? 'resolved' : ''}">
            <div class="check-box ${c.completed ? 'checked' : ''}" onclick="toggleDeferred(${i})">${c.completed ? '✓' : ''}</div>
            <span class="pending-text ${c.completed ? 'done' : ''}">${c.text} <span style="opacity:0.4;">(Room #${c.fromRoom})</span></span>
          </div>
        `).join('')}
      </div>
    `;
  }

  if (state.relics.length > 0) {
    html += `
      <div class="relic-collection-section">
        <div class="panel-header" style="color:var(--purple);">Relics</div>
        ${state.relics.map(id => {
          const r = getRelic(id);
          if (!r) return '';
          const tierInfo = RELIC_TIERS[r.tier];
          return `
            <div class="relic-log-item">
              <div>
                <div style="color:${tierInfo.color}; font-size:14px;">${r.name} <span style="font-size:10px; opacity:0.6; text-transform:uppercase; letter-spacing:1px;">${tierInfo.label}</span></div>
                <div style="color:var(--dim); font-size:12px;">${r.description}</div>
              </div>
            </div>`;
        }).join('')}
      </div>
    `;
  }

  return html;
}
