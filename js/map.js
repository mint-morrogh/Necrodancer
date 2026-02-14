// ════════════════════════════════════════════════════════
// MAP GENERATION
// ════════════════════════════════════════════════════════

// Shuffled deck for track type assignment — ensures variety before repeats
let _trackDeck = [];

function shuffleTrackDeck() {
  _trackDeck = [...TRACK_TYPES];
  for (let i = _trackDeck.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom() * (i + 1));
    [_trackDeck[i], _trackDeck[j]] = [_trackDeck[j], _trackDeck[i]];
  }
}

function drawTrackType() {
  if (_trackDeck.length === 0) shuffleTrackDeck();
  return _trackDeck.pop();
}

const NODE_TYPES = {
  standard:  { icon: 'S', label: 'Standard',       color: 'var(--text)',   desc: 'A normal dungeon room' },
  cursed:    { icon: 'X', label: 'Cursed Chamber',  color: 'var(--red)',    desc: 'Guaranteed curses, bonus gold' },
  sanctuary: { icon: '+', label: 'Sanctuary',       color: 'var(--green)',  desc: 'No curses, guaranteed blessing' },
  campfire:  { icon: 'R', label: 'Campfire',        color: 'var(--orange)', desc: 'Spend gold, no track produced' },
  start:     { icon: '>', label: 'Start',           color: 'var(--gold)',   desc: 'Choose your instrument' },
  boss:      { icon: 'B', label: 'Boss',            color: 'var(--red)',    desc: 'Defeat the boss to continue' }
};

function generateNodePreview(nodeType, trackType) {
  let curseCount = 0, effectCount = 0, hasBlessing = false;

  if (nodeType === 'sanctuary') {
    curseCount = 0;
    hasBlessing = true;
    effectCount = weightedPick(diff().effectWeights);
  } else if (nodeType === 'cursed') {
    curseCount = roll(2, 3);
    hasBlessing = false;
    effectCount = Math.min(weightedPick(diff().effectWeights) + 1, 4);
  } else if (nodeType === 'campfire') {
    curseCount = 0; effectCount = 0; hasBlessing = false;
  } else if (nodeType === 'boss') {
    curseCount = roll(...diff().bossCurseRange) + 1;
    effectCount = weightedPick(diff().effectWeights);
    hasBlessing = true;
  } else {
    curseCount = chance(diff().curseChance) ? 1 : 0;
    if (curseCount > 0 && chance(diff().trackCurseChance)) curseCount++;
    effectCount = weightedPick(diff().effectWeights);
    hasBlessing = chance(diff().blessingChance);
  }

  return { curseCount, effectCount, hasBlessing };
}

function pickNodeType(allowCampfire) {
  if (allowCampfire) {
    return weightedPick([
      { value: 'standard', weight: 45 },
      { value: 'cursed', weight: 18 },
      { value: 'sanctuary', weight: 14 },
      { value: 'campfire', weight: 23 }
    ]);
  }
  return weightedPick([
    { value: 'standard', weight: 55 },
    { value: 'cursed', weight: 25 },
    { value: 'sanctuary', weight: 20 }
  ]);
}

function generateFloorMap(floorNum) {
  // Middle rows (not counting start/boss): 5 on floor 1, up to 8 on deeper floors
  const middleRowCount = Math.min(4 + floorNum, 8);
  const rows = [];

  // Fresh shuffled deck for this floor — ensures variety before repeats
  shuffleTrackDeck();

  // Row 0: start node
  rows.push([{
    id: '0-0', type: 'start', trackType: null,
    preview: { curseCount: 0, effectCount: 0, hasBlessing: false },
    completed: false, rerolled: false
  }]);

  // Middle rows — campfire can only appear once per floor, and only on row 4+
  let campfirePlaced = false;

  for (let r = 1; r <= middleRowCount; r++) {
    const nodeCount = weightedPick([
      { value: 2, weight: 45 },
      { value: 3, weight: 45 },
      { value: 1, weight: 5 },
      { value: 4, weight: 5 }
    ]);
    const row = [];
    const canSpawnCampfire = r >= 4 && !campfirePlaced;

    for (let n = 0; n < nodeCount; n++) {
      const nodeType = pickNodeType(canSpawnCampfire && !campfirePlaced);
      const isCampfire = nodeType === 'campfire';
      if (isCampfire) campfirePlaced = true;
      const trackType = isCampfire ? null : drawTrackType();
      row.push({
        id: `${r}-${n}`,
        type: nodeType,
        trackType,
        preview: generateNodePreview(nodeType, trackType),
        completed: false,
        rerolled: false
      });
    }
    rows.push(row);
  }

  // Boss row
  const bossRowIdx = middleRowCount + 1;
  rows.push([{
    id: `${bossRowIdx}-0`, type: 'boss', trackType: null,
    preview: generateNodePreview('boss', null),
    completed: false, rerolled: false
  }]);

  // Generate connections
  const connections = generateMapConnections(rows);

  return { floor: floorNum, rows, connections };
}

function generateMapConnections(rows) {
  const connections = [];

  for (let r = 0; r < rows.length - 1; r++) {
    const currentRow = rows[r];
    const nextRow = rows[r + 1];

    // Track which next-row nodes have incoming connections
    const hasIncoming = new Set();

    // Each node in current row connects to 1-2 nodes in next row
    for (let n = 0; n < currentRow.length; n++) {
      const node = currentRow[n];
      // Calculate proportional position (0-1)
      const pos = currentRow.length === 1 ? 0.5 : n / (currentRow.length - 1);

      // Find closest node in next row
      let closestIdx = 0;
      let closestDist = Infinity;
      for (let m = 0; m < nextRow.length; m++) {
        const nextPos = nextRow.length === 1 ? 0.5 : m / (nextRow.length - 1);
        const dist = Math.abs(pos - nextPos);
        if (dist < closestDist) { closestDist = dist; closestIdx = m; }
      }

      // Always connect to closest
      connections.push({ from: node.id, to: nextRow[closestIdx].id });
      hasIncoming.add(closestIdx);

      // Usually connect to an adjacent node too (crossover) for more branching paths
      if (nextRow.length > 1 && chance(80)) {
        let crossIdx = closestIdx + (chance(50) ? 1 : -1);
        crossIdx = Math.max(0, Math.min(nextRow.length - 1, crossIdx));
        if (crossIdx !== closestIdx) {
          if (!connections.some(c => c.from === node.id && c.to === nextRow[crossIdx].id)) {
            connections.push({ from: node.id, to: nextRow[crossIdx].id });
            hasIncoming.add(crossIdx);
          }
        }
      }
    }

    // Ensure every node in next row has at least one incoming connection
    for (let m = 0; m < nextRow.length; m++) {
      if (!hasIncoming.has(m)) {
        // Connect from nearest node in current row
        const nextPos = nextRow.length === 1 ? 0.5 : m / (nextRow.length - 1);
        let closestIdx = 0;
        let closestDist = Infinity;
        for (let n = 0; n < currentRow.length; n++) {
          const pos = currentRow.length === 1 ? 0.5 : n / (currentRow.length - 1);
          if (Math.abs(pos - nextPos) < closestDist) {
            closestDist = Math.abs(pos - nextPos);
            closestIdx = n;
          }
        }
        connections.push({ from: currentRow[closestIdx].id, to: nextRow[m].id });
      }
    }
  }

  return connections;
}

function getNodeById(nodeId) {
  if (!state.map) return null;
  for (const row of state.map.rows) {
    for (const node of row) {
      if (node.id === nodeId) return node;
    }
  }
  return null;
}

function getReachableNodes() {
  if (!state.currentNodeId || !state.map) return [];
  return state.map.connections
    .filter(c => c.from === state.currentNodeId)
    .map(c => c.to);
}

function getNodeRow(nodeId) {
  if (!state.map) return -1;
  for (let r = 0; r < state.map.rows.length; r++) {
    if (state.map.rows[r].some(n => n.id === nodeId)) return r;
  }
  return -1;
}

async function rerollNode(nodeId) {
  if (state.rerolls <= 0) return;
  const node = getNodeById(nodeId);
  if (!node || node.completed) return;

  state.rerolls--;

  // Update reroll count display immediately
  const rerollDisplay = document.querySelector('.reroll-count');
  if (rerollDisplay) rerollDisplay.textContent = state.rerolls;

  // Find the node element in the DOM
  const nodeEl = document.querySelector(`[data-node-id="${nodeId}"]`);
  if (!nodeEl) {
    // Fallback: just apply instantly
    node.type = pickNodeType(false);
    node.trackType = node.type === 'campfire' ? null : pick(TRACK_TYPES);
    node.preview = generateNodePreview(node.type, node.trackType);
    node.rerolled = true;
    render();
    return;
  }

  // Hide the reroll button during animation
  const rerollBtn = nodeEl.querySelector('.map-node-reroll');
  if (rerollBtn) rerollBtn.style.display = 'none';

  const iconEl = nodeEl.querySelector('.map-node-icon');
  const typeEl = nodeEl.querySelector('.map-node-type');
  const trackEl = nodeEl.querySelector('.map-node-track');
  const previewEl = nodeEl.querySelector('.map-node-preview');

  // Animate cycling through random options
  const duration = 1200;
  const interval = 80;
  const steps = Math.floor(duration / interval);
  const nodeTypes = Object.keys(NODE_TYPES).filter(t => t !== 'start' && t !== 'boss');

  nodeEl.style.transition = 'none';
  nodeEl.style.boxShadow = '0 0 16px rgba(212,165,116,0.5)';

  for (let i = 0; i < steps; i++) {
    const randType = nodeTypes[Math.floor(Math.random() * nodeTypes.length)];
    const nt = NODE_TYPES[randType];
    const randTrack = TRACK_TYPES[Math.floor(Math.random() * TRACK_TYPES.length)];
    if (iconEl) iconEl.textContent = nt.icon;
    if (typeEl) { typeEl.textContent = nt.label; typeEl.style.color = nt.color; }
    if (trackEl) trackEl.textContent = randTrack;
    if (previewEl) previewEl.style.opacity = '0.3';
    await sleep(interval + (i > steps - 4 ? i * 15 : 0)); // slow down at the end
  }

  // Settle on final result
  node.type = pickNodeType(false);
  node.trackType = node.type === 'campfire' ? null : pick(TRACK_TYPES);
  node.preview = generateNodePreview(node.type, node.trackType);
  node.rerolled = true;

  const finalNt = NODE_TYPES[node.type] || NODE_TYPES.standard;
  if (iconEl) iconEl.textContent = finalNt.icon;
  if (typeEl) { typeEl.textContent = finalNt.label; typeEl.style.color = finalNt.color; }
  if (trackEl) trackEl.textContent = node.trackType || '???';

  nodeEl.style.boxShadow = '';
  nodeEl.style.transition = '';

  // Full re-render to get correct preview pips, tooltips, etc.
  setTimeout(() => render(), 200);
}
