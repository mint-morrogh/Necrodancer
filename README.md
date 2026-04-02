# NECRODANCER

**[Play it here](https://mint-morrogh.github.io/Necrodancer/)**

**Production Dungeon Crawler** — a browser-based tool that turns music production sessions into dungeon runs. Inspired by Jon Makes Beats "Super Beatmaker RPG" and Slay the Spire. Roll for a key and scale, choose your tempo, then navigate a branching dungeon map where each room assigns you a track to produce with randomized constraints.

## How It Works

1. **Roll for Key & Scale** — The dungeon picks your session's musical key (C through B) and scale (Major or Minor).
2. **Set Your Tempo** — Choose a BPM between 40 and 300.
3. **Choose Source Mode** — Set the balance between Splice sampling and Production (VST/synth) with a 0–100% slider.
4. **Pick a Difficulty** — Easy, Normal, Hard, or Nightmare. Higher difficulty means more curses, fewer blessings, and a bigger score multiplier.
5. **Set Dungeon Seed** — Use the daily seed for a shared daily run, generate a random seed, or enter a custom seed. Seeds make runs fully reproducible and shareable.
6. **Enter the Dungeon** — A branching map generates with multiple paths from start to boss.

## Room Types

- **Standard** — A normal room with a track type, genre directive, and potential curses/effects.
- **Cursed Chamber** — Guaranteed 2–3 curses and bonus gold.
- **Sanctuary** — No curses, guaranteed blessing.
- **Campfire** — Spend gold to remove curses, buy curse shields, purchase rerolls, or buy relics. No track produced.
- **Relic Chamber** — Choose 1 of 3 relics before entering the room.
- **Boss** — The final node on each floor. Guaranteed curses and mix-level boss constraints. Defeat the boss for +2 rerolls and a powerful boss blessing.

## Core Mechanics

### Track Types
22 instrument/track types: Drums, Bass, Synth Lead, Pads, Vocals, FX/Texture, Keys/Piano, Guitar, Strings, Percussion, 808, Brass/Woodwinds, Arp/Sequence, Plucks/Stabs, Mallets/Tuned Perc, World/Ethnic, Choir/Ensemble, Foley/Found Sound, Ambient/Drone, Vocal Chops, Noise/Industrial, and Sampler/Chops. Each room assigns one along with a genre and source directive. A shuffled deck system ensures variety before any track type repeats.

### Source Modes
- **Splice Mode** — Source samples from Splice (genre names link directly to Splice search). Genres are hover-tooltipped with BPM ranges, characteristics, and direct Splice links.
- **Production Mode** — Create sounds from scratch with VSTs and synths. Rooms get unique names ("The Synthesizer's Sanctum," "The Oscillator Chamber") and production-specific directives like "Design a bass patch from scratch" or "Program a drum pattern using synthesis."
- The source mode slider determines the ratio — rooms are randomly assigned Splice or Production based on the percentage you set.

### Curses
Constraints that force unusual creative decisions. 600+ total curses across four types:
- **Immediate** (~85) — Applies to the current room only (reverse audio, pitch shift, bitcrush, filter sweeps, etc.).
- **Track** (~440 across all track types, ~20 per instrument) — Instrument-specific processing challenges.
- **Deferred** (~45) — Appears in your Quest Log, must be resolved before the session ends.
- **Next-Room** (~48) — Carries forward as a surprise when you open the next door.

### Effects (Enchantments)
112 mandatory audio effects with a randomized wet percentage. The dungeon might demand Reverb (Hall) at 73% or Bitcrusher at 42%. Organized across categories: reverbs, delays, modulation, distortion, compression, and 65+ creative effects (vocoder, granular, spectral, lo-fi, physical modeling, and more). Each effect has a hover tooltip with plugin recommendations and DAW-specific tips.

### Blessings
38 positive effects that grant creative freedom, protection from curses, bonus rerolls, or rule-breaking privileges. Examples include "Scroll of Silence" (zero constraints), "The Oracle's Favor" (choose your own track type), and "Divine Intervention" (swap a curse for a blessing).

### Boss Encounters
Boss rooms cap each floor with mix-level challenges:
- **Boss Curses** (20 standard + 15 Nightmare-exclusive) — Master bus constraints like "Run the master through tape saturation" or "Apply a ring modulator to the master bus."
- **Boss Blessings** (10) — Powerful rewards like +3 rerolls, multi-room curse immunity, or removing all deferred curses.
- Boss curse count scales with difficulty (1 on Easy, up to 2–4 on Nightmare).
- Defeating a boss grants +2 rerolls and a boss blessing. A campfire appears afterward for shopping.

### Relics
16 persistent passive bonuses found at Relic Chambers, rare chest drops, road events, and the campfire shop. Three tiers:
- **Common** (55% drop weight) — Lucky Die (+10% reroll chance), Echo Crystal (effect % capped at 60%), Golden Chalice (+50% gold), Score Amplifier (+25% score), Thief's Glove (+5% chest chance), Dampening Orb, Purifying Flame.
- **Rare** (35%) — Streak Talisman, Completion Crown (+1 guaranteed reroll), Curse Ward, Divine Favor (+15% blessing chance), Quest Magnet, Alchemist's Key.
- **Legendary** (10%) — Metronome of Mercy (first reroll each floor free), Crown of the Ancients (+25% score AND +10% reroll), Gambler's Coin (+50% gold AND +5% chest chance).

### Rerolls
Earned by completing every task in a room before sealing it. A dice roll determines if you earn +1 reroll. Completing the optional bonus objective increases your odds. Spending a reroll in a room disqualifies you from Room Mastery. Rerolls can re-randomize a node's type, track, genre, effects, or curses on the dungeon map before entering.

### Room Mastery
Complete all checklist tasks + the bonus objective + use zero rerolls in a room to achieve Room Mastery. This guarantees +1 reroll (no dice roll needed), awards +15 gold and +50 score.

### Gold
Earned by completing checklist items (genre: 5g, curse: 8g, effect: 4g, boss: 12g). Spent at Campfires to remove curses (15g, or 10g with Purifying Flame), shield rooms from curses (15g), buy rerolls (25g), or purchase relics (50g). Gold multiplier is reduced on Hard (0.7x) and Nightmare (0.5x).

### Side Quests
A random chance (5–10% depending on difficulty) the dungeon ignores the assigned track type and gives you a completely different instrument. Complete all tasks for 2 guaranteed rerolls, or skip with no penalty.

### Road Events
30 random encounters between rooms offering creative challenges in exchange for rewards. Accept or decline with no penalty. Examples:
- **The Wandering Bard** — Change your tempo by ±15 BPM for +3 rerolls.
- **The Chaos Merchant** — Blindly pick a sample with no auditioning for +4 rerolls.
- **The Relic Peddler** — Layer white noise under your entire track for a random relic.
- **Free pickups** — "A Glinting Die," "The Fallen Adventurer," "Dungeon Cache" grant free reroll tokens.
- **Wandering Merchants** — Accept deferred creative debts for reroll tokens.

Road event chance ranges from 15% (Easy) to 25% (Nightmare).

### Special Rooms
- **YouTube Sample Room** (~10% of Splice rooms) — Source your sample from YouTube instead of Splice.
- **Alchemist's Lair** (3–5% chance) — Record real-world sounds as source material. 12 unique recording prompts and 15 bonus objectives.
- **Treasure Chest** (3–12% chance based on difficulty) — Random reward before entering a room: reroll tokens, blessings, curse shields, or relics.

### Room Notes
Each room has a notes field where you can jot down what you used — sample names, patch names, ideas, anything. Notes persist in the quest log, appear on the session complete tracklist, and are included in the exported beat sheet.

### Room Timeline
The quest log features a horizontal scrollable timeline strip at the top showing all completed rooms as compact cards. Each card shows the room number, track type, and genre. Hover (or tap on mobile) to see a tooltip with full details including curses, effects, blessings, and your notes.

### Floor Themes
Starting from Floor 2, each floor gets a random theme modifier that changes the rules for all rooms on that floor. Themes are announced on the map screen. Examples:
- **Resonance Surge** — All effect wet percentages increased by 10%
- **Cursed Depths** — Double curse chance, but double gold from curses
- **The Gauntlet** — +25% curse chance, +25% blessing chance, +100% score
- **Miser's Domain** — All campfire prices halved
- **The Quiet Floor** — Max 1 effect per room, but no curses from standard rooms

### Challenge Modifiers
Optional modifiers selected during setup for extra score multipliers. Stack multiple for higher risk and reward:
- **Iron Will** (x1.5) — No rerolls allowed
- **Cursed Blood** (x1.3) — Every room guaranteed at least 1 curse
- **Overloaded** (x1.3) — Maximum effects in every room
- **Forsaken** (x1.2) — Blessings never appear
- **Glass Cannon** (x2.0) — Double score, but effects are always 80-100% wet
- **Minimalist** (x1.2) — No campfire purchases allowed

### Floor Scouting
At the post-boss campfire, spend 45g to peek at the first two rows of rooms on the next floor. You can swap the two rows to rearrange your upcoming path before descending.

### Player Profile & Achievements
A persistent player profile tracks stats across all sessions (total rooms, bosses, best score, deepest floor). 18 achievement badges unlock based on milestones and challenges — from "First Blood" (complete your first room) to "Legend" (score over 2000). View your profile from the PROFILE button during any session.

### High Scores
Top 5 scores per difficulty are stored locally and displayed on the title screen as a Hall of Fame with score, difficulty, seed, and date.

### Tooltips & Info System
Hover tooltips throughout the game provide contextual information:
- **Effects** — Plugin recommendations and DAW-specific tips for every effect.
- **Genres** — BPM ranges, characteristics, and clickable Splice links.
- **Track Types** — Production tips and Splice search suggestions.
- **Map Nodes** — Preview curse count, effects, and blessings before entering.

## Scoring

Earn score for completing checkboxes, clearing rooms, defeating bosses, and finishing side quests. Room Mastery awards a flat +50 bonus.

| | Easy | Normal | Hard | Nightmare |
|---|---|---|---|---|
| Per Checkbox | 5 | 10 | 20 | 40 |
| Per Room | 10 | 20 | 40 | 80 |
| Per Boss | 30 | 50 | 100 | 200 |
| Per Side Quest | 25 | 40 | 80 | 150 |
| **Score Multiplier** | **0.5x** | **1.0x** | **2.0x** | **4.0x** |

## Difficulty Settings

| Setting | Easy | Normal | Hard | Nightmare |
|---|---|---|---|---|
| Curse Chance | 8% | 22% | 55% | 80% |
| Track Curse Chance | 2% | 8% | 25% | 45% |
| Blessing Chance | 35% | 20% | 8% | 3% |
| Effect Wet % Range | 5–30% | 5–50% | 20–100% | 40–100% |
| Boss Curse Count | 1 | 1–2 | 2–3 | 2–4 |
| Starting Rerolls | 2 | 1 | 1 | 0 |
| Gold Multiplier | 1.0x | 1.0x | 0.7x | 0.5x |
| Chest Chance | 12% | 8% | 5% | 3% |
| Road Event Chance | 15% | 18% | 22% | 25% |

## Progression & Save System

- **Multi-floor runs** — After defeating a boss, continue to the next floor or end the session. Floors scale with increasing complexity.
- **Auto-save** — Game state saves to browser localStorage automatically. Continue a saved run from the title screen.
- **Beat Sheet Export** — At the end of a session, export a full summary of every room, curse, effect, and blessing as a copyable text block or downloadable `.txt` file.
- **Seed-based reproducibility** — Daily seeds create shared daily challenges. Custom seeds let you share exact dungeon layouts.

## Running Locally

Open `index.html` in any modern browser. No build step, no dependencies, no server required.

## Project Structure

```
necro-dancer/
├── index.html          Slim HTML shell
├── css/
│   ├── base.css        Variables, resets, animations, buttons
│   ├── screens.css     All screen layouts and components
│   └── map.css         Dungeon map nodes, paths, tooltips
├── data/
│   ├── tracks.js               Track types, genres, sample types, flavors
│   ├── curses.js               Track curses, immediate/deferred/next-room curses
│   ├── effects.js              Audio effects and blessings
│   ├── rooms.js                Room names, boss data, alchemist data, chest messages
│   ├── events.js               Road events
│   ├── relics.js               Relics and tiers
│   ├── production.js           Production mode directives, flavors, room names
│   ├── descriptions_effects.js Effect tooltips (plugins, DAW tips)
│   ├── descriptions_genres.js  Genre tooltips (BPM, characteristics)
│   └── descriptions_tracks.js  Track type tooltips (tips, Splice search)
├── js/
│   ├── state.js        Game state, PRNG, difficulty settings, utilities
│   ├── map.js          Map generation, node types, pathfinding
│   ├── room.js         Room generation logic
│   ├── render.js       All rendering functions
│   └── game.js         Event handlers, game flow, initialization
├── assets/
│   └── redo.png        Reroll icon
└── .gitignore
```

## License

Personal project. All rights reserved.
