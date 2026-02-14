const EFFECT_DESCRIPTIONS = {
  'Reverb (Room)': {
    desc: 'Simulates the natural reflections of a small-to-medium room. Adds subtle space and depth without overwhelming the source.',
    plugins: 'Valhalla Room, FabFilter Pro-R, Ableton Reverb',
    daw: 'Ableton: Use the built-in Reverb device · FL: Fruity Reeverb 2 · Logic: ChromaVerb or Space Designer'
  },
  'Reverb (Hall)': {
    desc: 'Emulates the lush, long-tailed reflections of a large concert hall. Great for epic vocals, orchestral sounds, and cinematic pads.',
    plugins: 'Valhalla Room, Lexicon PCM Hall, FabFilter Pro-R',
    daw: 'Ableton: Reverb with long Decay and high Diffusion · FL: Fruity Reeverb 2 with large Size · Logic: ChromaVerb set to Hall mode'
  },
  'Reverb (Plate)': {
    desc: 'Models a metal plate vibrating to create a bright, smooth reverb. Classic on vocals, snares, and synths for a polished sheen.',
    plugins: 'Soundtoys Little Plate, Arturia Rev Plate-140, UAD EMT 140',
    daw: 'Ableton: Reverb with Flat quality · FL: Fruity Reeverb 2 or third-party plate · Logic: ChromaVerb set to Plate mode'
  },
  'Reverb (Spring)': {
    desc: 'Recreates the twangy, metallic sound of a physical spring tank. Iconic in surf rock, dub, and lo-fi productions.',
    plugins: 'Softube Spring Reverb, PSP SpringBox, Valhalla Supermassive',
    daw: 'Ableton: Use a Convolution Reverb with spring IR · FL: Fruity Convolver with spring impulse · Logic: Space Designer with spring IR'
  },
  'Reverb (Shimmer)': {
    desc: 'Layers pitch-shifted octaves into the reverb tail, creating an ethereal, angelic wash. Perfect for ambient and post-rock textures.',
    plugins: 'Valhalla Shimmer, Strymon BigSky, Eventide Blackhole',
    daw: 'Ableton: Chain Reverb + Pitch Shifter in a feedback loop · FL: Use Valhalla Shimmer or Blackhole plugin · Logic: Space Designer with pitch-shifted sends'
  },
  'Reverb (Reverse)': {
    desc: 'Plays the reverb tail backwards so it swells into the sound instead of fading out. Creates ghostly, atmospheric build-ups.',
    plugins: 'Valhalla Supermassive, Soundtoys Little Plate, Ableton Hybrid Reverb',
    daw: 'Ableton: Reverse audio, add reverb, bounce, then reverse again · FL: Edison to reverse-process the tail · Logic: Reverse audio in arrangement and apply reverb'
  },
  'Reverb (Gated)': {
    desc: 'Cuts the reverb tail short with a noise gate, producing a punchy burst of ambience. Famously used on 80s snare drums.',
    plugins: 'Valhalla Room, FabFilter Pro-R, Slate Digital VerbSuite',
    daw: 'Ableton: Reverb followed by Gate on a return track · FL: Fruity Reeverb 2 followed by Fruity Limiter as gate · Logic: ChromaVerb with short decay or Space Designer gated preset'
  },
  'Reverb (Non-linear)': {
    desc: 'A reverb whose tail doesn\'t decay naturally\u2014it may swell, stay constant, or cut abruptly. Great for aggressive drums and sound design.',
    plugins: 'Valhalla Room, Eventide SP2016, Slate Digital VerbSuite',
    daw: 'Ableton: Shape reverb tail with volume automation · FL: Fruity Reeverb 2 with envelope shaping · Logic: Space Designer with custom envelope curves'
  },
  'Delay (Stereo)': {
    desc: 'Plays delayed repeats in both left and right channels, adding width and movement. A staple for making sounds feel bigger in the mix.',
    plugins: 'Soundtoys EchoBoy, Valhalla Delay, FabFilter Timeless 3',
    daw: 'Ableton: Simple Delay or Delay device with L/R times · FL: Fruity Delay 3 with separate L/R · Logic: Stereo Delay plugin'
  },
  'Delay (Ping Pong)': {
    desc: 'Bounces delay repeats back and forth between left and right speakers. Creates a fun, rhythmic stereo effect that adds energy.',
    plugins: 'Soundtoys EchoBoy, Valhalla Delay, Ableton Ping Pong Delay',
    daw: 'Ableton: Use the Ping Pong Delay device · FL: Fruity Delay 3 with ping-pong mode · Logic: Stereo Delay with alternating L/R feedback'
  },
  'Delay (Tape)': {
    desc: 'Emulates vintage tape echo machines with warm, slightly degrading repeats. Each echo darkens and wobbles like real tape.',
    plugins: 'Soundtoys EchoBoy, UAD Galaxy Tape Echo, Arturia Delay Tape-201',
    daw: 'Ableton: Echo device with Noise and Wobble enabled · FL: Fruity Delay 3 with filtering on repeats · Logic: Tape Delay plugin'
  },
  'Delay (Slapback)': {
    desc: 'A very short single delay repeat (50-120ms) with no feedback. Adds thickness and energy, classic in rockabilly, country, and vocals.',
    plugins: 'Soundtoys EchoBoy, Valhalla Delay, Waves H-Delay',
    daw: 'Ableton: Simple Delay set to Time mode around 80ms, 0% feedback · FL: Fruity Delay 3 with short time, one repeat · Logic: Tape Delay with short time and zero feedback'
  },
  'Delay (Modulated)': {
    desc: 'Delay with built-in chorus or pitch modulation on the repeats, making them shimmer and swim. Adds lush, dreamy character.',
    plugins: 'Soundtoys EchoBoy, FabFilter Timeless 3, Valhalla Delay',
    daw: 'Ableton: Echo device with Modulation turned up · FL: Fruity Delay 3 with modulation or add Chorus after delay · Logic: Stereo Delay followed by Chorus plugin'
  },
  'Delay (Dotted 1/8)': {
    desc: 'Sets the delay time to a dotted eighth note, creating the signature galloping rhythm heard in U2 and countless pop tracks.',
    plugins: 'Soundtoys EchoBoy, Waves H-Delay, FabFilter Timeless 3',
    daw: 'Ableton: Delay synced to dotted 1/8 note · FL: Fruity Delay 3 synced to 3/16 (equivalent to dotted 1/8) · Logic: Stereo Delay set to dotted 1/8 note sync'
  },
  'Delay (Triplet)': {
    desc: 'Syncs the delay to triplet subdivisions, producing a bouncy, swung rhythmic feel. Works beautifully on melodic leads and hi-hats.',
    plugins: 'Soundtoys EchoBoy, Valhalla Delay, Waves H-Delay',
    daw: 'Ableton: Delay synced to 1/8T or 1/4T · FL: Fruity Delay 3 synced to triplet values · Logic: Stereo Delay set to triplet note sync'
  },
  'Delay (Filtered/Dark)': {
    desc: 'Rolls off the highs from each delay repeat so echoes get progressively darker and warmer. Keeps the mix clean while adding depth.',
    plugins: 'Soundtoys EchoBoy, FabFilter Timeless 3, Valhalla Delay',
    daw: 'Ableton: Echo device with HP/LP filters on repeats · FL: Fruity Delay 3 with built-in filter on feedback · Logic: Tape Delay with low filter cutoff'
  },
  'Delay (Ducking)': {
    desc: 'Automatically lowers the delay volume when the dry signal plays, then brings it up in the gaps. Keeps things clear during phrases.',
    plugins: 'Soundtoys EchoBoy, Waves H-Delay, FabFilter Timeless 3',
    daw: 'Ableton: Use a Compressor sidechained to the dry signal on the delay return · FL: Fruity Limiter on delay channel sidechained to source · Logic: Use Ducker plugin on the delay bus'
  },
  'Chorus': {
    desc: 'Duplicates the signal with slight pitch and timing variations, creating a thicker, shimmering sound. Wonderful on guitars, pads, and vocals.',
    plugins: 'Soundtoys MicroShift, TAL-Chorus-LX, Arturia Chorus JUN-6',
    daw: 'Ableton: Chorus-Ensemble device · FL: Fruity Chorus · Logic: Chorus plugin in Modulation'
  },
  'Flanger': {
    desc: 'Sweeps a short delay against the original signal, creating a jet-engine swooshing effect. Adds dramatic motion and metallic textures.',
    plugins: 'Soundtoys PrimalTap, MeldaProduction MFlanger, Waves MetaFlanger',
    daw: 'Ableton: Flanger device · FL: Fruity Flanger · Logic: Flanger plugin'
  },
  'Phaser': {
    desc: 'Shifts the phase of the signal at multiple frequency points and blends it back, creating swirling notches. Classic on keys and synth pads.',
    plugins: 'Soundtoys PhaseMistress, Arturia Phaser Bi-Tron, Waves OneKnob Phatter',
    daw: 'Ableton: Phaser-Flanger device set to Phaser mode · FL: Fruity Phaser · Logic: Phaser plugin'
  },
  'Ensemble': {
    desc: 'A richer, multi-voice chorus effect using several detuned copies. Creates lush, string-like thickness often heard in classic synth sounds.',
    plugins: 'Arturia Chorus JUN-6, TAL-Chorus-LX, Dreadbox Darkness',
    daw: 'Ableton: Chorus-Ensemble device in Ensemble mode · FL: Stack multiple Fruity Chorus instances with different rates · Logic: Ensemble plugin or stacked Chorus'
  },
  'Distortion': {
    desc: 'Aggressively clips and reshapes the audio waveform, adding harsh harmonics and grit. Used to add power, aggression, or lo-fi character.',
    plugins: 'Soundtoys Decapitator, FabFilter Saturn 2, iZotope Trash 2',
    daw: 'Ableton: Overdrive, Pedal, or Saturator device cranked · FL: Fruity Blood Overdrive or Fruity Fast Dist · Logic: Distortion or Bitcrusher plugin'
  },
  'Overdrive': {
    desc: 'Softer clipping than full distortion, emulating a tube amp pushed hard. Adds warmth, edge, and sustain without destroying the signal.',
    plugins: 'Soundtoys Decapitator, Waves Abbey Road Saturator, Plugin Alliance Black Box',
    daw: 'Ableton: Overdrive or Pedal device · FL: Fruity Blood Overdrive · Logic: Overdrive plugin'
  },
  'Saturation (Tape)': {
    desc: 'Emulates the gentle compression and harmonic warmth of recording to analog tape. Smooths transients and adds cohesive warmth.',
    plugins: 'Softube Tape, UAD Studer A800, Waves J37 Tape',
    daw: 'Ableton: Saturator set to Analog Clip or Soft Sine mode · FL: Fruity Soft Clipper or third-party tape plugin · Logic: Tape Delay with mix at 100% and zero delay (or use third-party)'
  },
  'Saturation (Tube)': {
    desc: 'Models the warm, even-harmonic distortion of vacuum tubes. Adds richness and presence, especially nice on vocals, drums, and bass.',
    plugins: 'Soundtoys Decapitator, Softube Tube-Tech, Arturia Pre TridA',
    daw: 'Ableton: Saturator or Amp device with low drive · FL: Fruity Soft Clipper or Distructor in tube mode · Logic: Phat FX tube saturation section'
  },
  'Fuzz': {
    desc: 'Extreme, buzzy distortion that nearly obliterates the clean signal. Think classic psychedelic guitar tones\u2014thick, woolly, and aggressive.',
    plugins: 'Soundtoys Decapitator, Kuassa Amplifikation Vermillion, FabFilter Saturn 2',
    daw: 'Ableton: Pedal device set to Fuzz mode · FL: Fruity Fast Dist with high mix and gain · Logic: Pedalboard with Fuzz pedal'
  },
  'Bitcrusher': {
    desc: 'Reduces the bit depth and/or sample rate to create digital artifacts, noise, and a retro lo-fi sound. Great for glitch and chiptune vibes.',
    plugins: 'D16 Decimort 2, Goodhertz Lossy, iZotope Trash 2',
    daw: 'Ableton: Redux device · FL: Fruity Squeeze · Logic: Bitcrusher plugin'
  },
  'Compression (Heavy)': {
    desc: 'Squashes the dynamic range dramatically with high ratios, making loud and quiet parts nearly the same volume. Adds punch and density.',
    plugins: 'Waves CLA-76, FabFilter Pro-C 2, UAD 1176',
    daw: 'Ableton: Compressor with high Ratio (8:1+) and fast Attack · FL: Fruity Limiter with heavy compression · Logic: Compressor with high Ratio and Platinum Digital mode'
  },
  'Compression (Gentle/Glue)': {
    desc: 'Light compression with moderate ratio and slower attack, gently evening out dynamics. Makes a mix feel cohesive and polished.',
    plugins: 'Waves SSL G-Master Buss, FabFilter Pro-C 2, Cytomic The Glue',
    daw: 'Ableton: Glue Compressor with low Ratio · FL: Maximus with gentle settings · Logic: Compressor in VCA or Platinum mode with low Ratio'
  },
  'Multiband Compression': {
    desc: 'Splits audio into frequency bands and compresses each independently. Lets you tame the bass without affecting the highs, and vice versa.',
    plugins: 'FabFilter Pro-MB, Waves Linear Phase MultibandComp, iZotope Ozone',
    daw: 'Ableton: Multiband Dynamics device · FL: Maximus · Logic: Multipressor'
  },
  'Parallel Compression': {
    desc: 'Blends a heavily compressed version with the dry signal, keeping transient punch while adding body and sustain. Also called "New York compression."',
    plugins: 'FabFilter Pro-C 2, Waves CLA-76, Slate Digital FG-X',
    daw: 'Ableton: Use Dry/Wet knob on Compressor or a parallel bus · FL: Fruity Limiter with mix knob or a send channel · Logic: Compressor with Mix knob dialed back from 100%'
  },
  'Sidechain Compression': {
    desc: 'Ducks the volume of one sound whenever another plays, like pumping a pad down when the kick hits. Essential in electronic and pop music.',
    plugins: 'Xfer LFOTool, Nicky Romero Kickstart, FabFilter Pro-C 2',
    daw: 'Ableton: Compressor with Sidechain input from kick · FL: Fruity Limiter or Gross Beat for sidechain · Logic: Compressor with Side Chain input selector'
  },
  'Tremolo (synced)': {
    desc: 'Rhythmically modulates the volume up and down in sync with the tempo. Creates a pulsing, choppy effect that locks to the beat.',
    plugins: 'Soundtoys Tremolator, Goodhertz Trem Control, TAL-Filter-2',
    daw: 'Ableton: Auto Pan set to Normal mode synced to tempo · FL: Fruity Love Philter or Gross Beat · Logic: Tremolo plugin with Rate synced'
  },
  'Tremolo (free)': {
    desc: 'Modulates volume at a freely adjustable rate independent of tempo. Produces organic, wavering dynamics like a vintage guitar amp tremolo.',
    plugins: 'Soundtoys Tremolator, Goodhertz Trem Control, Waves MondoMod',
    daw: 'Ableton: Auto Pan in Normal mode with free-running Hz rate · FL: Fruity Love Philter with LFO on volume · Logic: Tremolo plugin with Rate set in Hz'
  },
  'Auto-Pan': {
    desc: 'Automatically moves the sound left and right in the stereo field. Adds movement and life, especially on pads, hi-hats, and ambient textures.',
    plugins: 'Soundtoys PanMan, Waves MondoMod, Cableguys PanCake 2',
    daw: 'Ableton: Auto Pan device · FL: Fruity Love Philter or use panning LFO · Logic: Tremolo plugin set to Pan mode'
  },
  'Auto-Filter (synced)': {
    desc: 'A filter that opens and closes in sync with the tempo using an LFO. Creates rhythmic wah-like sweeps that lock to the groove.',
    plugins: 'TAL-Filter-2, Xfer LFOTool, Cableguys FilterShaper',
    daw: 'Ableton: Auto Filter with LFO synced to tempo · FL: Fruity Love Philter with tempo-synced LFO · Logic: AutoFilter with tempo-synced LFO'
  },
  'Auto-Filter (envelope follower)': {
    desc: 'A filter whose cutoff reacts to how loud the incoming signal is\u2014play harder and the filter opens more. Gives dynamic, expressive control.',
    plugins: 'Cableguys FilterShaper, Soundtoys FilterFreak, Ableton Auto Filter',
    daw: 'Ableton: Auto Filter with Envelope section turned up · FL: Fruity Love Philter with envelope follower · Logic: AutoFilter with Envelope Follow mode'
  },
  'Resonator': {
    desc: 'Reinforces specific frequencies to make the audio ring at tuned pitches, like striking a tuning fork. Can add tonal character or metallic resonance.',
    plugins: 'Ableton Resonators, Melda MMultiBandRingModulator, AudioThing Fog Convolver',
    daw: 'Ableton: Resonators device · FL: Pitcher or Vocodex for resonant effects · Logic: Ringshifter or use EQ with extreme narrow boosts'
  },
  'Vocoder': {
    desc: 'Imposes the spectral shape of one sound (like vocals) onto another (like a synth), making the synth "talk." Iconic robotic vocal effect.',
    plugins: 'Waves Morphoder, iZotope VocalSynth 2, TAL-Vocoder',
    daw: 'Ableton: Vocoder device with carrier and modulator · FL: Vocodex · Logic: EVOC 20 Poly Synth or EVOC 20 TrackOscillator'
  },
  'Ring Modulator': {
    desc: 'Multiplies two signals together, creating harsh, metallic, inharmonic tones. Produces alien, bell-like, or robotic textures.',
    plugins: 'SoundMagic RingModulator, Melda MRingModulator, AudioThing RingMod',
    daw: 'Ableton: Use Frequency Shifter in Ring mode · FL: Fruity Ring Modulator (Distructor) · Logic: Ringshifter set to Ring Modulator mode'
  },
  'Frequency Shifter': {
    desc: 'Shifts all frequencies by a fixed amount in Hz (not a musical interval), creating dissonant, metallic, or subtle thickening effects.',
    plugins: 'Soundtoys PrimalTap, Bode Frequency Shifter (Softube), Kilohearts Frequency Shifter',
    daw: 'Ableton: Frequency Shifter device · FL: Use third-party plugin like Kilohearts · Logic: Ringshifter in Frequency Shifter mode'
  },
  'Grain Delay': {
    desc: 'Chops the incoming audio into tiny grains and delays them with pitch and randomization. Creates glitchy, textural, and shimmering effects.',
    plugins: 'Ableton Grain Delay, Output Portal, Arturia Delay Eternity',
    daw: 'Ableton: Grain Delay device · FL: Granulizer (generator) or third-party plugin · Logic: Use third-party granular plugins'
  },
  'Beat Repeat / Stutter': {
    desc: 'Captures a slice of audio and rapidly repeats it to create glitchy stutters and fills. Great for transitions, builds, and experimental beats.',
    plugins: 'iZotope Stutter Edit 2, Glitch Machines Hysteresis, Sugar Bytes Looperator',
    daw: 'Ableton: Beat Repeat device · FL: Gross Beat with stutter patterns · Logic: Use third-party like Stutter Edit 2'
  },
  'Erosion': {
    desc: 'Adds digital noise, aliasing, and sine-wave distortion to subtly degrade the signal. Useful for adding gritty texture to clean sounds.',
    plugins: 'Ableton Erosion, Goodhertz Lossy, iZotope Vinyl',
    daw: 'Ableton: Erosion device · FL: Use Fruity Squeeze or third-party · Logic: Use Bitcrusher lightly or third-party'
  },
  'Redux (Sample Rate Reduction)': {
    desc: 'Lowers the effective sample rate and bit depth for a crunchy, retro digital sound. Like listening through an old sampler or video game console.',
    plugins: 'D16 Decimort 2, Goodhertz Lossy, TAL-DAC',
    daw: 'Ableton: Redux device · FL: Fruity Squeeze · Logic: Bitcrusher with Downsampling'
  },
  'Spectral Blur': {
    desc: 'Smears the frequency content over time, turning sharp sounds into soft, evolving textures. Like putting audio through a prism.',
    plugins: 'Ableton Spectral Blur (M4L), Output Portal, Michael Norris Spectral Plugins',
    daw: 'Ableton: Spectral Blur (Max for Live device in Suite) · FL: Use third-party spectral plugins · Logic: Use third-party like Michael Norris plugins'
  },
  'Convolution Reverb (unusual IR)': {
    desc: 'Uses an impulse response recording of any space or object to create reverb. Load weird IRs (trash cans, tunnels) for unique, realistic spaces.',
    plugins: 'Altiverb, Waves IR-1, LiquidSonics Reverberate 3',
    daw: 'Ableton: Convolution Reverb or Hybrid Reverb · FL: Fruity Convolver · Logic: Space Designer with custom impulse response files'
  },
  'Stereo Widener': {
    desc: 'Makes a sound feel wider in the stereo field by manipulating phase, delay, or mid-side balance. Adds spaciousness to pads, guitars, and mixes.',
    plugins: 'iZotope Ozone Imager, Waves S1, Goodhertz CanOpener',
    daw: 'Ableton: Utility device Width knob or Wider (M4L) · FL: Fruity Stereo Shaper or Stereo Enhancer · Logic: Stereo Spread or Direction Mixer'
  },
  'Mid-Side EQ': {
    desc: 'EQs the center (mid) and sides of the stereo image separately. Lets you brighten the sides without affecting the vocal in the center.',
    plugins: 'FabFilter Pro-Q 3, Brainworx bx_digital V3, iZotope Ozone EQ',
    daw: 'Ableton: EQ Eight in Mid-Side mode · FL: Parametric EQ 2 in M/S mode (via Patcher) · Logic: Channel EQ with Dual Mono/Mid-Side setup'
  },
  'De-tuner': {
    desc: 'Subtly shifts the pitch of the audio down, creating a slowed, woozy, or heavy effect. Often used for dark vocal or lo-fi textures.',
    plugins: 'Soundtoys Little AlterBoy, Waves SoundShifter, Auburn Sounds Graillon',
    daw: 'Ableton: Use Pitch Shifter or Frequency Shifter for subtle detune · FL: Pitcher or NewTone for pitch adjustment · Logic: Pitch Shifter plugin set to small negative values'
  },
  'Harmonizer': {
    desc: 'Generates new pitch-shifted copies of the audio at musical intervals (thirds, fifths, etc.), creating instant harmonies from a single voice or instrument.',
    plugins: 'Eventide H3000, Waves Harmony, iZotope Nectar Harmony',
    daw: 'Ableton: Shifter device or parallel pitch-shifted chains · FL: Pitcher with MIDI harmony control · Logic: Vocal Transformer or use Flex Pitch'
  },
  'Pitch Correction (hard tune)': {
    desc: 'Snaps pitch to the nearest note with zero correction speed for the robotic "Auto-Tune effect." The signature sound of modern pop and hip-hop vocals.',
    plugins: 'Antares Auto-Tune, Waves Tune Real-Time, Celemony Melodyne',
    daw: 'Ableton: Use third-party like Auto-Tune · FL: Pitcher with zero speed · Logic: Pitch Correction plugin with zero Response time'
  },
  'Formant Shifter': {
    desc: 'Shifts the vocal formants (resonant characteristics) independently of pitch, making voices sound bigger, smaller, or like a different person.',
    plugins: 'Soundtoys Little AlterBoy, Infected Mushroom Manipulator, iZotope VocalSynth 2',
    daw: 'Ableton: Shifter device with Formant control · FL: Pitcher formant knob · Logic: Vocal Transformer with Formant parameter'
  },
  'Exciter / Harmonic Enhancer': {
    desc: 'Generates and adds subtle high-frequency harmonics to brighten and add presence without traditional EQ. Makes sounds sparkle and cut through a mix.',
    plugins: 'Soundtoys Sie-Q, Waves Aphex Vintage Aural Exciter, Plugin Alliance bx_refinement',
    daw: 'Ableton: Saturator with Drive on highs or use Overdrive gently · FL: Fruity Blood Overdrive on a high-passed band · Logic: Exciter plugin'
  },
  'Dynamic EQ': {
    desc: 'An EQ that only activates when a chosen frequency exceeds a threshold, combining precision of EQ with the responsiveness of compression.',
    plugins: 'FabFilter Pro-Q 3, Tokyo Dawn Nova, Waves F6',
    daw: 'Ableton: EQ Eight doesn\'t have dynamic mode natively\u2014use third-party · FL: Parametric EQ 2 lacks dynamics\u2014use third-party · Logic: Use third-party dynamic EQ plugins'
  },
  'Lo-Fi Effect (combined)': {
    desc: 'Bundles multiple degradation effects (bit reduction, noise, wow/flutter, filtering) into one plugin for an instant vintage, worn-out sound.',
    plugins: 'iZotope Vinyl, RC-20 Retro Color, Aberrant DSP Sketch Cassette',
    daw: 'Ableton: Chain Redux + Saturator + EQ + Auto Filter · FL: Vinyl or Gross Beat with lo-fi presets · Logic: Stack Bitcrusher + Channel EQ roll-off + Modulation plugins'
  },
  'Tape Stop/Start Effect': {
    desc: 'Simulates a tape machine slowing to a stop or speeding back up, causing the pitch to drop and rise. Classic transition effect in hip-hop and EDM.',
    plugins: 'Xfer DJ Turntable, Kilohearts Tape Stop, Cableguys TimeShaper',
    daw: 'Ableton: Use third-party plugin or automate pitch/speed · FL: Gross Beat with tape stop pattern · Logic: Use third-party plugin or automate Varispeed'
  },
  'Granular Freeze': {
    desc: 'Captures a tiny moment of audio and loops it as granular particles, sustaining it indefinitely. Creates evolving, frozen textures from any source.',
    plugins: 'Output Portal, Unfiltered Audio Silo, Arturia Efx Fragments',
    daw: 'Ableton: Grain Delay or Granulator II (M4L) · FL: Granulizer or third-party plugin · Logic: Use third-party granular plugins'
  },
  'Spectral Gate': {
    desc: 'A gate that works on individual frequency bins rather than the whole signal. Lets you keep only the loudest frequencies, creating ghostly textures.',
    plugins: 'Ableton Spectral Gate (M4L), Michael Norris Spectral Gate, Photosounder Spiral',
    daw: 'Ableton: Spectral Gate (Max for Live) · FL: Use third-party spectral plugins · Logic: Use third-party spectral processing plugins'
  },
  'Comb Filter': {
    desc: 'Adds a very short delayed copy of the signal to itself, creating a series of peaks and notches in the spectrum. Produces hollow, metallic tones.',
    plugins: 'Kilohearts Comb Filter, MeldaProduction MCombMB, Ableton Corpus',
    daw: 'Ableton: Corpus or Flanger with very short delay and no modulation · FL: Fruity Flanger with fixed delay and no sweep · Logic: Flanger with minimal modulation depth'
  },
  'Amp Simulator (Guitar)': {
    desc: 'Models the tone-shaping behavior of guitar amplifiers, from clean sparkle to heavy crunch. Essential for getting amp tones without a real amp.',
    plugins: 'Neural DSP Archetype series, Line 6 Helix Native, Waves PRS SuperModels',
    daw: 'Ableton: Amp + Cabinet devices · FL: Fruity Convolver with amp IRs or third-party · Logic: Amp Designer plugin'
  },
  'Amp Simulator (Bass)': {
    desc: 'Models bass amplifiers for warm tube growl, clean DI tone, or aggressive distortion. Shapes bass guitar recordings into a polished, mix-ready sound.',
    plugins: 'Neural DSP Parallax, Ampeg SVT plugin (Plugin Alliance), Waves Bass Rider',
    daw: 'Ableton: Amp device set to Bass type + Cabinet · FL: Use third-party bass amp plugins · Logic: Bass Amp Designer plugin'
  },
  'Cabinet Simulator': {
    desc: 'Emulates the tonal coloring of a speaker cabinet, rounding off harsh frequencies. Usually paired with an amp sim for realistic results.',
    plugins: 'OwnHammer IR libraries, Two Notes Wall of Sound, NadIR',
    daw: 'Ableton: Cabinet device or Convolution Reverb with cab IRs · FL: Fruity Convolver with cabinet impulse responses · Logic: Amp Designer includes cabinet or use Space Designer with cab IRs'
  },
  'Rotary Speaker / Leslie': {
    desc: 'Simulates the spinning horn and drum of a Leslie cabinet, creating a doppler-like wobbling effect. Classic on organ, guitar, and vocals.',
    plugins: 'Native Instruments Rotator, PSP L\'otary 2, Waves Abbey Road Rotary Speaker',
    daw: 'Ableton: Use Auto Pan + Chorus combo or third-party · FL: Fruity Phaser or third-party Leslie plugin · Logic: Rotor Cabinet plugin'
  },
  'Talk Box': {
    desc: 'Shapes the frequency content of an instrument using vowel-like formant filtering, as if the sound is "talking." Made famous by funk and electronic music.',
    plugins: 'iZotope VocalSynth 2, Waves Morphoder, TAL-Vocoder',
    daw: 'Ableton: Vocoder device or Corpus with formant tuning · FL: Vocodex · Logic: EVOC 20 with formant presets'
  },
  'Wah-Wah (Auto/Envelope)': {
    desc: 'A bandpass filter that sweeps up and down based on how hard you play (envelope) or an LFO. Creates the classic "wah" sound of funk and rock.',
    plugins: 'Waves V-Wah, Dunlop Cry Baby plugin, Soundtoys FilterFreak',
    daw: 'Ableton: Auto Filter with Envelope Follower · FL: Fruity Love Philter with envelope control · Logic: AutoFilter set to bandpass with envelope follow'
  },
  'Noise Gate (Rhythmic/Trance Gate)': {
    desc: 'Opens and closes a gate in a rhythmic pattern synced to tempo, chopping sustained sounds into pulsing rhythms. Essential for trance pads.',
    plugins: 'Xfer LFOTool, Cableguys VolumeShaper, TAL-Filter-2',
    daw: 'Ableton: Beat Repeat or Gate with sidechain trigger · FL: Gross Beat with rhythmic volume patterns · Logic: Tremolo plugin with hard square wave or use Step FX'
  },
  'Micro-Pitch Detune / Doubler': {
    desc: 'Adds copies detuned by just a few cents and slightly delayed, thickening the sound as if doubled. Subtle but powerful for widening vocals and leads.',
    plugins: 'Soundtoys MicroShift, Waves Doubler, Eventide MicroPitch',
    daw: 'Ableton: Two parallel Shifter devices panned L/R with +/- 7 cents · FL: Pitcher with slight detune or Fruity Chorus very subtle · Logic: Vocal Transformer with subtle pitch or use Sample Delay for Haas'
  },
  'Tape Echo (vintage)': {
    desc: 'Faithfully recreates classic tape delay units like the Roland Space Echo. Warm, saturated repeats with tape degradation and modulation.',
    plugins: 'UAD Galaxy Tape Echo, Arturia Delay Tape-201, Waves J37',
    daw: 'Ableton: Echo device with Character and Wobble · FL: Fruity Delay 3 with filtering or third-party · Logic: Tape Delay plugin'
  },
  'Multi-Tap Delay': {
    desc: 'Creates multiple delay taps at different times and levels, building complex rhythmic echo patterns from a single input.',
    plugins: 'Soundtoys Crystallizer, Waves H-Delay, FabFilter Timeless 3',
    daw: 'Ableton: Use multiple Simple Delay instances or Echo with Reverb · FL: Fruity Delay 3 or multiple delay instances · Logic: Delay Designer with multiple taps'
  },
  'Diffuse Delay': {
    desc: 'Blurs and smears the delay repeats so they blend into a washy, reverb-like texture. Sits between a clean delay and a full reverb.',
    plugins: 'Valhalla Delay, Soundtoys EchoBoy, Eventide Blackhole',
    daw: 'Ableton: Echo device with high Reverb or Delay into Reverb chain · FL: Fruity Delay 3 feeding into reverb · Logic: Stereo Delay into ChromaVerb'
  },
  'Analog Delay (warm)': {
    desc: 'Emulates the warm, slightly degraded echoes of analog bucket-brigade delay circuits. Repeats darken and soften naturally.',
    plugins: 'Soundtoys EchoBoy (Analog mode), Arturia Delay Brigade, Waves H-Delay',
    daw: 'Ableton: Echo with Character set to analog models · FL: Fruity Delay 3 with low-pass on feedback · Logic: Tape Delay or use third-party analog delay'
  },
  'Spectral Delay': {
    desc: 'Delays individual frequency bands separately, so lows and highs echo at different times. Creates surreal, frequency-smeared textures.',
    plugins: 'Melda MSpectralDelay, Michael Norris Spectral Delay, IRCAM Spat',
    daw: 'Ableton: Use multiple delays on separate frequency bands via Audio Effect Rack · FL: Use Patcher with band-split delays · Logic: Use third-party spectral delay plugins'
  },
  'Pitch Shifter (octave up/down)': {
    desc: 'Shifts the audio pitch up or down by an octave or other interval in real time. Creates harmonies, sub layers, or dramatic tonal changes.',
    plugins: 'Soundtoys Little AlterBoy, Eventide H910, Waves SoundShifter',
    daw: 'Ableton: Shifter device · FL: Pitcher or NewTone · Logic: Pitch Shifter plugin'
  },
  'Octaver': {
    desc: 'Generates a note one or two octaves below (or above) the original, often with analog-style tracking. Great for fattening bass or guitar.',
    plugins: 'Eventide H910, Brainworx bx_subsynth, TC Electronic Sub\'N\'Up',
    daw: 'Ableton: Shifter set to -12 semitones · FL: Pitcher or third-party · Logic: Pitch Shifter set to -12 semitones'
  },
  'Waveshaper / Wavefolder': {
    desc: 'Bends and folds the audio waveform into new shapes, creating complex, buzzy, and aggressive harmonics. A staple in modular and sound design.',
    plugins: 'FabFilter Saturn 2, Cableguys ShaperBox, Arturia Dist COLDFIRE',
    daw: 'Ableton: Saturator with custom Waveshaper curve · FL: Fruity WaveShaper · Logic: Use Overdrive or third-party wavefolder'
  },
  'Multiband Saturation': {
    desc: 'Applies different saturation amounts to separate frequency bands. Lets you warm the mids without muddying the lows or harshening the highs.',
    plugins: 'FabFilter Saturn 2, Waves Abbey Road TG Mastering, Softube Harmonics',
    daw: 'Ableton: Audio Effect Rack split into bands, each with Saturator · FL: Patcher with multiband split into saturation · Logic: Use third-party multiband saturation'
  },
  'Multiband Distortion': {
    desc: 'Distorts each frequency band independently for precise tonal destruction. Add grit to the mids while keeping bass and treble clean.',
    plugins: 'FabFilter Saturn 2, iZotope Trash 2, Kilohearts Multipass',
    daw: 'Ableton: Audio Effect Rack with frequency splits and Overdrive per band · FL: Patcher with band-split distortion · Logic: Use third-party multiband distortion'
  },
  'Clipper (soft/hard)': {
    desc: 'Chops off the peaks of the audio waveform to add density and loudness. Soft clipping rounds the edges; hard clipping creates sharper distortion.',
    plugins: 'Kazrog KClip 3, Boz Digital Big Clipper, StandardClip',
    daw: 'Ableton: Saturator in Hard Curve or Waveshaper mode · FL: Fruity Soft Clipper · Logic: Use Limiter aggressively or third-party clipper'
  },
  'Transient Shaper': {
    desc: 'Controls the attack and sustain of a sound independently of volume. Sharpen a dull kick\'s click or soften a harsh snare crack.',
    plugins: 'Waves Smack Attack, SPL Transient Designer, Kilohearts Transient Shaper',
    daw: 'Ableton: Drum Buss transient control or Compressor with careful attack/release · FL: Fruity Limiter or Transient Processor · Logic: Enveloper plugin'
  },
  'Transient Designer': {
    desc: 'A dedicated tool to boost or cut the attack and body/sustain of percussive sounds. Makes drums punchier or softer with simple controls.',
    plugins: 'SPL Transient Designer, Plugin Alliance SPL TD, Waves Smack Attack',
    daw: 'Ableton: Drum Buss or use an expander for attack shaping · FL: Transient Processor or Maximus · Logic: Enveloper plugin with Attack and Release controls'
  },
  'Spectral Resonator': {
    desc: 'Excites the spectral content of incoming audio at tuned harmonic frequencies, making any sound resonate at a musical pitch.',
    plugins: 'Ableton Spectral Resonator (M4L), Melda MSpectralDynamics, Unfiltered Audio SpecOps',
    daw: 'Ableton: Spectral Resonator (Live 11.1+ built-in or M4L) · FL: Use Vocodex or third-party · Logic: Use third-party spectral processing'
  },
  'Doppler Effect Simulator': {
    desc: 'Recreates the pitch shift that occurs when a sound source moves toward and then away from you, like a passing ambulance siren.',
    plugins: 'Waves Doppler, SoundMorph Doppler, GRM Tools Doppler',
    daw: 'Ableton: Automate pitch and panning simultaneously · FL: Automate pitch shift and pan together · Logic: Automate Pitch Shifter and Pan to simulate movement'
  },
  'Uni-Vibe': {
    desc: 'A vintage phaser-like effect originally designed to mimic a rotary speaker. Produces a warm, watery, swirling modulation loved by guitarists.',
    plugins: 'Native Instruments Guitar Rig (Uni-Vibe), Waves OneKnob Phatter, Arturia Phaser Bi-Tron',
    daw: 'Ableton: Phaser-Flanger device with slow rate and low depth · FL: Fruity Phaser with gentle settings · Logic: Phaser plugin with slow rate and moderate feedback'
  },
  'Envelope Follower \u2192 Filter': {
    desc: 'Tracks the amplitude of the input and uses it to control a filter cutoff in real time. Play harder and the filter opens\u2014very expressive and dynamic.',
    plugins: 'Cableguys FilterShaper, Soundtoys FilterFreak, Ableton Auto Filter',
    daw: 'Ableton: Auto Filter with Envelope Amount turned up · FL: Fruity Love Philter with envelope follower · Logic: AutoFilter with Envelope Follow active'
  },
  'Step Sequencer Filter': {
    desc: 'Modulates a filter cutoff in discrete steps synced to the tempo, creating rhythmic filter patterns. Turns pads and synths into groovy sequences.',
    plugins: 'Cableguys FilterShaper, Xfer LFOTool, Sugar Bytes WOW2',
    daw: 'Ableton: Auto Filter modulated by a step-sequenced LFO or use Max for Live · FL: Fruity Love Philter with step-sequenced pattern · Logic: Step FX with filter modulation'
  },
  'Feedback Loop (self-oscillation)': {
    desc: 'Routes a plugin\'s output back into its input, creating howling, chaotic, self-generating tones. Experimental and often unpredictable.',
    plugins: 'Unfiltered Audio Byome, Glitchmachines Fracture, Output Portal',
    daw: 'Ableton: Route audio from return back into itself via sends (use caution with levels!) · FL: Patcher feedback routing (watch volume!) · Logic: Use bus routing with careful gain staging'
  },
  'Corpus / Physical Modeling Resonator': {
    desc: 'Simulates the resonance of physical objects like metal tubes, plates, or strings. Makes any input sound like it\'s being played through that object.',
    plugins: 'Ableton Corpus, Applied Acoustics Chromaphone, Physical Audio PA1',
    daw: 'Ableton: Corpus device · FL: Use third-party physical modeling plugins · Logic: Sculpture (synth) or use third-party'
  },
  'Spectral Filter': {
    desc: 'Filters audio in the spectral (FFT) domain rather than with traditional filter curves. Can create surgical or extreme tonal shaping.',
    plugins: 'Melda MSpectralDynamics, iZotope RX Spectral Repair, Photosounder Spiral',
    daw: 'Ableton: Use Max for Live spectral processing devices · FL: Use third-party spectral filter plugins · Logic: Use third-party spectral filtering tools'
  },
  'Linear Phase EQ (surgical)': {
    desc: 'An EQ that makes precise frequency adjustments without introducing phase shift. Used in mastering and on parallel buses where phase alignment matters.',
    plugins: 'FabFilter Pro-Q 3 (Linear Phase mode), Waves Linear Phase EQ, iZotope Ozone EQ',
    daw: 'Ableton: EQ Eight in Oversampling mode (not true linear phase\u2014use third-party) · FL: Parametric EQ 2 has linear phase option · Logic: Linear Phase EQ plugin'
  },
  'Through-Zero Flanger': {
    desc: 'A flanger where the modulated delay crosses through zero, creating a deep, jet-like sweep impossible with standard flangers. Rich and dramatic.',
    plugins: 'Eventide Instant Flanger, Brainworx bx_flanger, Goodhertz Tilt',
    daw: 'Ableton: Standard Flanger approximates but true through-zero needs third-party · FL: Third-party through-zero flanger plugin · Logic: Third-party plugin required for true through-zero'
  },
  'Barber Pole Flanger': {
    desc: 'Creates the illusion of an endlessly rising or falling flanger sweep, like an audio optical illusion. Mesmerizing and otherworldly.',
    plugins: 'Eventide Instant Flanger, Audio Damage Fluid, MeldaProduction MFlanger',
    daw: 'Ableton: Phaser-Flanger can approximate with certain settings · FL: Third-party plugin recommended · Logic: Third-party barber pole flanger plugin'
  },
  'Spring Reverb (physical modeling)': {
    desc: 'Uses DSP algorithms to model the physics of a spring tank rather than sampling one. Responds dynamically to input like a real spring.',
    plugins: 'PSP SpringBox, Softube Spring Reverb, AudioThing Springs',
    daw: 'Ableton: Use third-party spring modeling plugin · FL: Use third-party spring reverb · Logic: Use third-party modeled spring reverb'
  },
  'Algorithmic Reverb (infinite)': {
    desc: 'A digital reverb with the decay set to infinity, creating an endless sustain that never fades. Turns any sound into a frozen ambient drone.',
    plugins: 'Valhalla Supermassive, Eventide Blackhole, Valhalla Room',
    daw: 'Ableton: Reverb with maximum Decay or Hybrid Reverb · FL: Fruity Reeverb 2 with max decay · Logic: ChromaVerb with freeze or infinite decay setting'
  },
  'Reverse Delay': {
    desc: 'Plays the delayed repeats backwards, creating swells that build into each note. Produces dreamy, backward-sounding echoes.',
    plugins: 'Soundtoys EchoBoy, Valhalla Delay, Eventide TimeFactor',
    daw: 'Ableton: Echo or Delay device doesn\'t natively reverse\u2014use third-party · FL: Third-party reverse delay plugin · Logic: Delay Designer with reverse envelope or third-party'
  },
  'Glitch Plugin (buffer repeat/stutter)': {
    desc: 'Randomly or rhythmically captures and mangles audio buffers with repeats, reverses, pitch shifts, and more. Instant controlled chaos.',
    plugins: 'iZotope Stutter Edit 2, Glitchmachines Hysteresis, dblue Glitch',
    daw: 'Ableton: Beat Repeat or Buffer Shuffler (M4L) · FL: Gross Beat for glitch patterns · Logic: Use third-party glitch plugins'
  },
  'Lo-Fi Vinyl Simulator': {
    desc: 'Adds vinyl noise, crackle, static, and subtle wow to emulate a record player. Instant nostalgic warmth for lo-fi beats and chill music.',
    plugins: 'iZotope Vinyl, RC-20 Retro Color, Waves Abbey Road Vinyl',
    daw: 'Ableton: Layer in crackle samples + Saturator + EQ roll-off · FL: Vinyl or Edison for noise layering · Logic: Use third-party vinyl simulation plugins'
  },
  'Lo-Fi Tape Simulator': {
    desc: 'Simulates the hiss, warmth, saturation, and speed fluctuations of recording on cassette tape. Gives a cozy, imperfect vintage character.',
    plugins: 'Aberrant DSP Sketch Cassette, RC-20 Retro Color, Waves J37 Tape',
    daw: 'Ableton: Saturator + Auto Filter + subtle modulation chain · FL: Use third-party cassette/tape plugins · Logic: Use third-party tape simulation plugins'
  },
  'Wow and Flutter': {
    desc: 'Adds the slow pitch drift (wow) and fast pitch flutter of imperfect tape transport. Makes audio sound like it\'s playing from an old tape deck.',
    plugins: 'RC-20 Retro Color, Aberrant DSP Sketch Cassette, Goodhertz Wow Control',
    daw: 'Ableton: Use a slow, subtle LFO on pitch or use Echo\'s Wobble · FL: Gross Beat or Pitcher with slow modulation · Logic: Modulator MIDI FX or third-party wow/flutter plugin'
  },
  'Frequency Splitter (multiband processing)': {
    desc: 'Splits audio into separate frequency bands so you can process each one independently. The foundation for multiband compression, distortion, and more.',
    plugins: 'FabFilter Pro-MB, Kilohearts Multipass, Waves Linear Phase MultibandComp',
    daw: 'Ableton: Multiband Dynamics or Audio Effect Rack with frequency splits · FL: Patcher with band splitter or Maximus · Logic: Multipressor or use sends with EQ filtering'
  },
  'Sub-Harmonic Generator': {
    desc: 'Synthesizes new frequencies one octave below the input to add powerful sub-bass. Makes kicks, bass, and low elements hit harder.',
    plugins: 'Waves LoAir, Brainworx bx_subsynth, Icecream Audio SubBass',
    daw: 'Ableton: Use Shifter at -12 semitones blended in or Operator as sub layer · FL: Maximus or Pitcher for sub generation · Logic: Use third-party sub-harmonic plugins or layer a sub oscillator'
  },
  'Expander / Upward Compression': {
    desc: 'Increases the dynamic range by making quiet sounds quieter (expansion) or louder (upward compression). Adds life and punch to flat mixes.',
    plugins: 'FabFilter Pro-MB, iZotope Ozone Dynamics, Waves MV2',
    daw: 'Ableton: Multiband Dynamics in upward compression mode · FL: Maximus with upward compression · Logic: Multipressor or use third-party dynamics'
  },
  'De-esser (creative use)': {
    desc: 'Normally tames harsh "s" sounds in vocals, but creatively used to duck specific frequency ranges rhythmically or control cymbal harshness.',
    plugins: 'FabFilter Pro-DS, Waves Sibilance, Oeksound Soothe 2',
    daw: 'Ableton: Multiband Dynamics targeting the sibilant range · FL: Maximus targeting high frequencies · Logic: De-Esser plugin'
  },
  'Limiter (brickwall as effect)': {
    desc: 'Pushed hard, a brickwall limiter crushes transients and adds aggressive loudness and density. Used creatively for pumping, distortion, and impact.',
    plugins: 'FabFilter Pro-L 2, Waves L2, iZotope Ozone Maximizer',
    daw: 'Ableton: Limiter device with low ceiling and high gain · FL: Fruity Limiter pushed hard · Logic: Adaptive Limiter with high Gain'
  },
  'Mid-Side Processing': {
    desc: 'Separates audio into center (mid) and sides for independent processing. Widen reverb on the sides while keeping the vocal dry in the center.',
    plugins: 'Voxengo MSED, Brainworx bx_control V2, iZotope Ozone Imager',
    daw: 'Ableton: Utility to extract M/S or use M/S mode in EQ Eight · FL: Fruity Stereo Shaper or Patcher for M/S routing · Logic: Direction Mixer or Dual Mono plugin configurations'
  },
  'Stereo Narrower (mono-maker)': {
    desc: 'Reduces stereo width, pulling audio toward the center. Useful for tightening bass frequencies or creating a focused, mono-compatible sound.',
    plugins: 'iZotope Ozone Imager, Waves S1, Goodhertz CanOpener',
    daw: 'Ableton: Utility device\u2014reduce Width toward 0% · FL: Fruity Stereo Shaper to narrow · Logic: Direction Mixer with Spread reduced'
  },
  'Haas Effect (manual stereo)': {
    desc: 'Delays one side by 1-30ms to trick the ears into perceiving stereo width from a mono source. Simple but powerful widening technique.',
    plugins: 'Waves S1 Shuffler, Voxengo Sound Delay, Goodhertz Panpot',
    daw: 'Ableton: Utility + Simple Delay on one channel (1-30ms) or use Sample Delay · FL: Fruity Stereo Enhancer or manual delay offset · Logic: Sample Delay plugin on one channel'
  },
  'Pitch Vibrato (synced)': {
    desc: 'Wobbles the pitch up and down in sync with the tempo, creating a rhythmic, detuned warble. Adds character to synths, vocals, and lo-fi textures.',
    plugins: 'Soundtoys Little AlterBoy, Goodhertz Vulf Compressor (vibrato), Waves MondoMod',
    daw: 'Ableton: Shifter or Frequency Shifter with synced LFO · FL: Pitcher with vibrato or LFO on pitch · Logic: Modulator MIDI FX controlling pitch'
  },
  'Filter FM / Audio-Rate Modulation': {
    desc: 'Modulates a filter\'s cutoff at audio frequencies, creating metallic, harsh, and complex timbres. A synthesis technique used as an effect for extreme sound design.',
    plugins: 'Cableguys FilterShaper, Ableton Auto Filter, Native Instruments Reaktor',
    daw: 'Ableton: Auto Filter with very high LFO rate or use Max for Live · FL: Fruity Love Philter with high-speed modulation · Logic: Use Synthesizer or third-party for audio-rate modulation'
  },
  'Granular Pitch Shifter': {
    desc: 'Shifts pitch by slicing audio into tiny grains and reassembling them at a new pitch. Can produce artifacts that sound glitchy, lush, or otherworldly.',
    plugins: 'Soundtoys Crystallizer, Eventide MicroPitch, Output Portal',
    daw: 'Ableton: Grain Delay with Pitch control or Shifter device · FL: Granulizer or Pitcher · Logic: Use third-party granular pitch plugins'
  },
  'Spectral Morph / Cross-Synthesis': {
    desc: 'Blends the spectral characteristics of two different sounds together, creating hybrid timbres. Makes one sound take on the tonal shape of another.',
    plugins: 'iZotope VocalSynth 2, Melda MSpectralDynamics, Unfiltered Audio SpecOps',
    daw: 'Ableton: Vocoder for basic cross-synthesis or Max for Live spectral tools · FL: Vocodex for cross-synthesis · Logic: EVOC 20 or third-party spectral tools'
  },
  'Paulstretch (extreme time-stretch)': {
    desc: 'Stretches audio to extreme lengths (100x or more) without changing pitch, turning any sound into a vast, ambient drone. Made famous by stretched music memes.',
    plugins: 'Paulstretch (free standalone), Unfiltered Audio Silo, Output Portal',
    daw: 'Ableton: Warp mode set to Texture with extreme stretch · FL: Use Edison stretch or Paulstretch plugin · Logic: Flex Time extreme stretch or use Paulstretch standalone'
  },
  'Freeze Verb (infinite sustain reverb)': {
    desc: 'Captures and infinitely sustains the current reverb tail, freezing it in place. Creates evolving pads and ambient washes from any momentary sound.',
    plugins: 'Valhalla Supermassive, Eventide Blackhole, Soundtoys SuperPlate',
    daw: 'Ableton: Hybrid Reverb or Reverb with Freeze button (if available) · FL: Fruity Reeverb 2 at max decay or use third-party with freeze · Logic: ChromaVerb Freeze button or Space Designer with infinite decay'
  }
};
