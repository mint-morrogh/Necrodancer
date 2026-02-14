# NECRODANCER

**[Play it here](https://mint-morrogh.github.io/Necrodancer/)**

**Production Dungeon Crawler** — a browser-based tool that turns music production sessions into dungeon runs. Inspired by Jon Makes Beats "Super Beatmaker RPG" and Slay the Spire. Roll for a key and scale, choose your tempo, then navigate a branching dungeon map where each room assigns you a track to produce with randomized constraints.

## How It Works

1. **Roll for Key & Scale** — The dungeon picks your session's musical key and scale.
2. **Set Your Tempo** — Choose a BPM for the session.
3. **Pick a Difficulty** — Easy, Normal, Hard, or Nightmare. Higher difficulty means more curses, fewer blessings, and a bigger score multiplier.
4. **Enter the Dungeon** — A branching map generates with multiple paths from start to boss.

## Room Types

- **Standard** — A normal room with a track type, genre directive, and potential curses/effects.
- **Cursed Chamber** — Guaranteed curses and bonus gold.
- **Sanctuary** — No curses, guaranteed blessing.
- **Campfire** — Spend gold to remove curses, buy shields, or purchase rerolls. No track produced.
- **Boss** — The final node on each floor. Guaranteed curses and mix-level boss constraints. Defeat the boss for +2 rerolls and a powerful boss blessing.

## Core Mechanics

### Track Types
Each room assigns an instrument/track type (Drums, Bass, Synth Lead, Pads, Vocals, Guitar, etc.) along with a genre and sample source directive. You produce that track using samples from Splice, YouTube, or real-world recordings.

### Curses
Constraints that force unusual creative decisions:
- **Immediate** — applies to the current room only.
- **Track** — instrument-specific processing challenges.
- **Deferred** — appears in your Quest Log, must be resolved before the session ends.
- **Next-Room** — carries forward as a surprise when you open the next door.

### Effects (Enchantments)
Mandatory audio effects with a randomized wet percentage. The dungeon might demand Reverb (Hall) at 73% or Bitcrusher at 42%.

### Blessings
Positive effects that grant creative freedom, protection from curses, bonus rerolls, or rule-breaking privileges.

### Rerolls
Earned by completing every task in a room before sealing it. A dice roll determines if you earn +1 reroll. Completing the optional bonus objective increases your odds. Rerolls can be spent on the dungeon map to re-randomize a node's type, track, and contents.

### Gold
Earned by completing checklist items. Spent at Campfires to remove curses, shield rooms, or buy rerolls.

### Side Quests
A random chance the dungeon ignores the assigned track type and gives you a completely different instrument. Complete all tasks for 2 guaranteed rerolls, or skip with no penalty.

### Special Rooms
- **YouTube Sample Room** — Source your sample from YouTube instead of Splice.
- **Alchemist's Lair** — Record real-world sounds as source material.
- **Treasure Chest** — Random reward before entering a room (reroll tokens, blessings, or curse shields).

## Scoring
Earn score for completing checkboxes, clearing rooms, defeating bosses, and finishing side quests. Higher difficulty multiplies your score. Nightmare offers 4x the score of Normal.

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
│   ├── tracks.js       Track types, genres, sample types, flavors
│   ├── curses.js       Track curses, immediate/deferred/next-room curses
│   ├── effects.js      Audio effects and blessings
│   └── rooms.js        Room names, boss data, chest messages
├── js/
│   ├── state.js        Game state, PRNG, difficulty settings, utilities
│   ├── map.js          Map generation, node types, pathfinding
│   ├── room.js         Room generation logic
│   ├── render.js       All rendering functions
│   └── game.js         Event handlers, game flow, initialization
└── .gitignore
```

## License

Personal project. All rights reserved.
