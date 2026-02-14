const GENRE_DESCRIPTIONS = {
  '2-Step': {
    desc: 'A UK garage subgenre with shuffled, skippy drum patterns that emphasize the offbeat. Emerged in late 1990s London.',
    bpm: '130-140',
    traits: 'Shuffled beats, skippy hi-hats, R&B vocals, garage bass, syncopated rhythms'
  },
  'Acid House': {
    desc: 'Built around the squelchy, resonant sound of the Roland TB-303 bass synthesizer. A foundational genre of the late 1980s rave movement.',
    bpm: '120-130',
    traits: 'TB-303 basslines, squelchy resonance, 4/4 kick, hypnotic loops, acid squelch'
  },
  'Afro House': {
    desc: 'A fusion of house music with African percussion, vocal chants, and organic instrumentation. Deep and rhythmically rich.',
    bpm: '118-125',
    traits: 'African percussion, deep house grooves, tribal chants, organic textures, polyrhythmic patterns'
  },
  'Afro Tech': {
    desc: 'Combines the driving energy of techno with African rhythmic elements and percussion. Darker and more hypnotic than Afro House.',
    bpm: '122-130',
    traits: 'Techno drive, African rhythms, dark atmospheres, percussive layers, hypnotic grooves'
  },
  'Afrobeat': {
    desc: 'A genre pioneered by Fela Kuti blending West African highlife and jazz with funk grooves. Features large ensembles and extended compositions.',
    bpm: '100-130',
    traits: 'Horn sections, polyrhythmic drums, call-and-response vocals, funk guitar, extended jams'
  },
  'Afropop & Afrobeats': {
    desc: 'Modern African pop music blending West African musical traditions with hip hop, dancehall, and electronic production. Not to be confused with Fela Kuti\'s Afrobeat.',
    bpm: '100-120',
    traits: 'Infectious melodies, log drum patterns, pidgin vocals, dancehall influence, bright production'
  },
  'Ambient': {
    desc: 'Atmospheric, textural music designed to create an immersive sonic environment. Prioritizes tone and mood over rhythm or melody.',
    bpm: '60-90',
    traits: 'Lush pads, reverb-heavy textures, slow evolution, atmospheric layers, minimal percussion'
  },
  'Amapiano': {
    desc: 'A South African genre combining deep house, jazz, and lounge music with distinctive log drum bass and wide piano chords. Emerged from Pretoria and Johannesburg.',
    bpm: '110-120',
    traits: 'Log drum bass, wide piano chords, shaker percussion, bassline-driven, South African vocals'
  },
  'Bass House': {
    desc: 'A heavier take on house music with aggressive, distorted basslines and high-energy drops. Bridges house and bass music.',
    bpm: '125-130',
    traits: 'Distorted bass, heavy drops, 4/4 kick, aggressive wobbles, punchy drums'
  },
  'Bassline': {
    desc: 'A UK bass genre with warping, wobbly basslines and garage-influenced rhythms. Emerged from the UK speed garage scene in the early 2000s.',
    bpm: '130-140',
    traits: 'Warping basslines, UK garage rhythms, heavy sub-bass, chopped vocals, rolling energy'
  },
  'Bedroom Pop': {
    desc: 'Lo-fi, DIY indie pop typically produced at home with accessible gear. Characterized by a warm, intimate, and slightly rough aesthetic.',
    bpm: '90-130',
    traits: 'Lo-fi warmth, intimate vocals, soft guitars, reverb-drenched, DIY production'
  },
  'Bhangra': {
    desc: 'Energetic Punjabi folk-dance music featuring the dhol drum, tumbi, and call-and-response singing. Often fused with modern pop and hip hop production.',
    bpm: '90-170',
    traits: 'Dhol drum, tumbi, Punjabi vocals, energetic rhythms, celebratory feel'
  },
  'Big Room House': {
    desc: 'A maximalist EDM subgenre built for massive festival stages. Features huge build-ups, simple anthemic leads, and crowd-driving drops.',
    bpm: '126-132',
    traits: 'Massive drops, simple leads, big build-ups, festival energy, crowd chants'
  },
  'Blues': {
    desc: 'A foundational American genre built on the 12-bar blues progression and expressive guitar playing. Rooted in African-American musical traditions.',
    bpm: '60-120',
    traits: 'Blue notes, 12-bar structure, expressive guitar bends, shuffle rhythms, soulful vocals'
  },
  'Bollywood': {
    desc: 'Music produced for the Indian Hindi-language film industry. Blends Indian classical music, folk traditions, and modern pop and electronic production.',
    bpm: '90-150',
    traits: 'Orchestral arrangements, Hindi vocals, tabla, dramatic melodies, cinematic flair'
  },
  'Boom Bap': {
    desc: 'A golden-era hip hop production style defined by hard-hitting, sample-based drum breaks with a pronounced kick and snare. Core to 1990s East Coast rap.',
    bpm: '80-100',
    traits: 'Hard-hitting drums, vinyl samples, scratching, jazz/soul loops, raw grit'
  },
  'Bossa Nova': {
    desc: 'A smooth Brazilian genre blending samba rhythms with cool jazz harmonies. Known for its gentle, swaying feel and nylon-string guitar patterns.',
    bpm: '100-130',
    traits: 'Nylon guitar, gentle syncopation, jazz chords, soft vocals, relaxed feel'
  },
  'Brazilian Funk': {
    desc: 'Also known as funk carioca or baile funk, a high-energy Brazilian genre built on heavy bass, rapid-fire percussion, and MC vocals from Rio\'s favelas.',
    bpm: '130-150',
    traits: 'Heavy 808 bass, rapid percussion, MC vocals, tamborzao beat, raw energy'
  },
  'Breakbeat': {
    desc: 'Built around syncopated, non-four-on-the-floor drum patterns that emphasize funk-style breaks. A foundation for many electronic genres.',
    bpm: '120-145',
    traits: 'Syncopated breaks, chopped drums, funky grooves, sampled loops, dynamic energy'
  },
  'Breakcore': {
    desc: 'An extremely fast and chaotic electronic genre that chops and rearranges breakbeats at high speed. Aggressive, glitchy, and intentionally abrasive.',
    bpm: '160-300',
    traits: 'Chopped amen breaks, extreme tempo, glitchy edits, chaotic energy, distortion'
  },
  'Calypso': {
    desc: 'A rhythmic Afro-Caribbean genre from Trinidad and Tobago, known for witty, topical lyrics and syncopated rhythms. The precursor to soca.',
    bpm: '100-140',
    traits: 'Steel pan, syncopated rhythms, topical lyrics, Caribbean swing, brass sections'
  },
  'Champeta': {
    desc: 'An Afro-Colombian dance music blending West African soukous with Caribbean and electronic elements. Originated in Cartagena\'s Black communities.',
    bpm: '95-115',
    traits: 'African guitar lines, Caribbean rhythms, electronic bass, call-and-response, danceable grooves'
  },
  'Chillhop': {
    desc: 'A laid-back fusion of hip hop beats and jazzy, chill instrumentation. Designed as relaxing background music for studying or working.',
    bpm: '70-90',
    traits: 'Jazzy samples, lo-fi drums, mellow keys, relaxed vibe, vinyl crackle'
  },
  'Chillout': {
    desc: 'A broad term for relaxed, downtempo electronic music designed for unwinding. Often heard in lounge settings and ambient compilations.',
    bpm: '80-110',
    traits: 'Soft pads, gentle beats, atmospheric textures, relaxed tempo, warm tones'
  },
  'Chillwave': {
    desc: 'A lo-fi, nostalgic electronic genre blending hazy synths, washed-out vocals, and retro pop melodies. Emerged around 2009 from the indie scene.',
    bpm: '90-120',
    traits: 'Hazy synths, lo-fi textures, washed-out vocals, nostalgic feel, reverb-drenched'
  },
  'Chiptune': {
    desc: 'Music made using the sound chips from retro gaming consoles and computers like the Game Boy and NES. Embraces 8-bit and 16-bit tonal limitations.',
    bpm: '120-180',
    traits: '8-bit sounds, square waves, pulse channels, retro bleeps, noise percussion'
  },
  'Cinematic': {
    desc: 'Dramatic, orchestral music designed to evoke visual storytelling. Uses sweeping arrangements, dynamic builds, and emotional tension.',
    bpm: '60-140',
    traits: 'Orchestral swells, dramatic builds, emotional themes, epic percussion, string sections'
  },
  'City Pop': {
    desc: 'A Japanese pop genre from the late 1970s-1980s blending funk, boogie, AOR, and jazz fusion. Known for its polished, breezy production aesthetic.',
    bpm: '100-130',
    traits: 'Funk bass, lush synths, jazzy chords, polished production, breezy melodies'
  },
  'Classical': {
    desc: 'Western art music rooted in orchestral and chamber traditions spanning centuries. Features complex composition, notation, and acoustic instrumentation.',
    bpm: '40-180',
    traits: 'Orchestral instruments, dynamic range, formal structure, counterpoint, acoustic performance'
  },
  'Cloud Rap': {
    desc: 'A hazy, atmospheric hip hop subgenre with ethereal beats, reverb-heavy vocals, and dreamy production. Emerged from the SoundCloud underground.',
    bpm: '60-80',
    traits: 'Ethereal pads, heavy reverb, trap hi-hats, atmospheric textures, auto-tuned vocals'
  },
  'Country': {
    desc: 'An American roots genre built on storytelling lyrics, acoustic guitars, steel pedal guitar, and fiddle. Ranges from traditional to modern pop-country.',
    bpm: '80-140',
    traits: 'Acoustic guitar, steel pedal, fiddle, storytelling lyrics, twangy vocals'
  },
  'Cumbia': {
    desc: 'A Colombian-origin dance rhythm that spread across Latin America, blending Indigenous, African, and Spanish elements. Many regional variations exist.',
    bpm: '80-110',
    traits: 'Guira/shaker rhythm, accordion, call-and-response, steady groove, danceable swing'
  },
  'Cyberpunk': {
    desc: 'Dark, futuristic electronic music inspired by cyberpunk sci-fi aesthetics. Blends industrial, synthwave, and glitch elements with a dystopian atmosphere.',
    bpm: '100-140',
    traits: 'Dark synths, industrial textures, glitch effects, dystopian mood, distorted bass'
  },
  'Dance Pop': {
    desc: 'An uptempo pop genre designed for dancefloors, combining catchy vocal hooks with electronic beats and four-on-the-floor rhythms.',
    bpm: '116-130',
    traits: 'Catchy hooks, four-on-the-floor, polished vocals, synth-driven, radio-friendly'
  },
  'Dancehall': {
    desc: 'A Jamaican genre featuring digital riddims, toasting vocal delivery, and heavy bass. Evolved from reggae into a faster, more electronic form.',
    bpm: '90-110',
    traits: 'Digital riddims, toasting vocals, heavy bass, dancehall drums, Jamaican patois'
  },
  'Dark Ambient': {
    desc: 'An atmospheric genre creating ominous, unsettling soundscapes using drones, field recordings, and processed textures. Designed to evoke unease or dread.',
    bpm: '0-80',
    traits: 'Ominous drones, eerie textures, field recordings, minimal structure, dark atmosphere'
  },
  'Darkwave': {
    desc: 'A dark, melancholic fusion of post-punk and synth-pop with gothic undertones. Features moody synths, brooding vocals, and cold electronic textures.',
    bpm: '100-130',
    traits: 'Moody synths, brooding vocals, post-punk guitars, cold production, gothic atmosphere'
  },
  'Deep House': {
    desc: 'A warm, soulful subgenre of house music with lush chords, jazzy elements, and a more restrained, groove-focused energy than mainstream house.',
    bpm: '118-125',
    traits: 'Warm pads, deep bass, jazzy chords, soulful vocals, subtle grooves'
  },
  'Disco': {
    desc: 'A 1970s dance genre built on four-on-the-floor beats, lush orchestration, funky basslines, and soaring string arrangements. The foundation of house music.',
    bpm: '110-130',
    traits: 'Four-on-the-floor, orchestral strings, funky bass, hi-hat patterns, lush production'
  },
  'Downtempo': {
    desc: 'Relaxed electronic music at slower tempos, blending atmospheric textures with gentle beats. A broader umbrella encompassing trip hop, chillout, and more.',
    bpm: '70-100',
    traits: 'Slow tempo, atmospheric pads, gentle beats, textured layers, relaxed mood'
  },
  'Dream Pop': {
    desc: 'An ethereal, atmospheric subgenre of indie rock with heavily reverbed guitars, soft vocals, and lush, shimmering textures. Prioritizes mood over structure.',
    bpm: '80-130',
    traits: 'Reverbed guitars, breathy vocals, lush textures, shimmering layers, ethereal atmosphere'
  },
  'Drift Phonk': {
    desc: 'A phonk subgenre designed for car drifting culture, featuring aggressive cowbell patterns, pitched-down Memphis rap samples, and heavy 808 bass.',
    bpm: '130-160',
    traits: 'Aggressive cowbells, pitched-down samples, heavy 808s, distorted bass, car culture aesthetic'
  },
  'Drone': {
    desc: 'Music built on sustained tones or repeating notes that change slowly over time. Focuses on texture, overtones, and the meditative quality of sustained sound.',
    bpm: '0-60',
    traits: 'Sustained tones, minimal movement, overtone focus, meditative quality, textural depth'
  },
  'Drum and Bass': {
    desc: 'A high-energy UK electronic genre defined by fast breakbeats and deep, rolling basslines. One of the fastest mainstream electronic genres.',
    bpm: '160-180',
    traits: 'Fast breakbeats, heavy sub-bass, chopped amen breaks, rolling energy, reese bass'
  },
  'Drumstep': {
    desc: 'A hybrid genre combining the tempo and breakbeats of drum and bass with the heavy, half-time bass drops of dubstep.',
    bpm: '160-180',
    traits: 'DnB tempo, dubstep drops, half-time feel, heavy bass, breakbeat rhythms'
  },
  'Dub': {
    desc: 'A Jamaican production style pioneered by King Tubby and Lee Perry, using heavy reverb, delay, and mixing desk effects on reggae recordings. A foundational influence on electronic music.',
    bpm: '60-90',
    traits: 'Heavy delay, reverb, bass emphasis, stripped-down mix, echo effects'
  },
  'Dub Techno': {
    desc: 'A hypnotic fusion of techno and dub production techniques. Uses deep chord washes fed through heavy delay and reverb to create immersive, minimal grooves.',
    bpm: '120-130',
    traits: 'Delayed chords, deep reverb, minimal grooves, hypnotic loops, hazy textures'
  },
  'Dubstep': {
    desc: 'A bass-heavy UK genre built on half-time rhythms, wobble bass, and sub-heavy drops. Ranges from dark and minimal to aggressive and heavy.',
    bpm: '138-142',
    traits: 'Wobble bass, half-time drums, sub-bass drops, dark atmosphere, LFO modulation'
  },
  'EBM': {
    desc: 'Electronic Body Music combines industrial aesthetics with danceable, sequenced electronic rhythms. Features aggressive synth bass, distorted vocals, and mechanical beats.',
    bpm: '110-140',
    traits: 'Sequenced bass, industrial vocals, mechanical beats, aggressive synths, driving rhythm'
  },
  'EDM': {
    desc: 'A broad umbrella term for mainstream electronic dance music, typically referring to the festival-oriented, high-energy styles popular from 2010 onward.',
    bpm: '120-150',
    traits: 'Big drops, build-ups, festival energy, synth leads, anthemic melodies'
  },
  'Electro': {
    desc: 'An early electronic genre fusing synth-driven production with funk rhythms and the Roland TR-808 drum machine. A key precursor to techno and hip hop.',
    bpm: '110-140',
    traits: 'TR-808 drums, robotic vocals, synth funk, mechanical rhythms, electronic bass'
  },
  'Electroclash': {
    desc: 'A short-lived early 2000s genre reviving 1980s synth-pop and new wave with a punk attitude, lo-fi production, and ironic aesthetics.',
    bpm: '110-135',
    traits: 'Retro synths, punk attitude, lo-fi production, new wave vocals, ironic style'
  },
  'Electronica': {
    desc: 'A broad term for electronic music geared more toward home listening than the dancefloor. Emphasizes intricate sound design and textural experimentation.',
    bpm: '80-140',
    traits: 'Textured production, experimental sound design, layered synthesis, varied tempos, home listening'
  },
  'Emo': {
    desc: 'An emotionally expressive subgenre of punk and indie rock with confessional lyrics, dynamic shifts between soft and loud passages, and raw vocal delivery.',
    bpm: '100-180',
    traits: 'Confessional lyrics, dynamic shifts, raw vocals, distorted guitars, emotional intensity'
  },
  'Eurodance': {
    desc: 'A high-energy 1990s European dance-pop genre featuring upbeat synths, four-on-the-floor beats, rapped verses, and soaring female vocal choruses.',
    bpm: '130-150',
    traits: 'Upbeat synths, rap verses, soaring choruses, four-on-the-floor, high energy'
  },
  'Experimental': {
    desc: 'A broad category for music that pushes boundaries and defies genre conventions. Prioritizes unconventional structure, sound, and technique over accessibility.',
    bpm: '0-200',
    traits: 'Unconventional structure, boundary-pushing sound, genre-defying, avant-garde techniques, unpredictable form'
  },
  'Fidget House': {
    desc: 'A short-lived late 2000s house subgenre with glitchy, hyperactive edits, pitch-bent basslines, and a playful, restless energy.',
    bpm: '125-132',
    traits: 'Glitchy edits, pitch-bent bass, hyperactive energy, staccato rhythms, playful feel'
  },
  'Film Score': {
    desc: 'Original music composed specifically to accompany visual media. Ranges from orchestral to electronic and is designed to enhance narrative and emotion on screen.',
    bpm: '40-160',
    traits: 'Orchestral palette, thematic motifs, emotional scoring, dynamic range, narrative support'
  },
  'Flamenco': {
    desc: 'A passionate Spanish art form combining intricate guitar playing, rhythmic hand clapping (palmas), percussive footwork, and emotive singing (cante).',
    bpm: '80-200',
    traits: 'Nylon guitar, palmas clapping, complex rhythms, passionate vocals, percussive dance'
  },
  'Folk': {
    desc: 'Acoustic, tradition-based music emphasizing songwriting, storytelling, and natural instrumentation. Spans from traditional roots music to modern singer-songwriter styles.',
    bpm: '80-140',
    traits: 'Acoustic guitar, storytelling lyrics, natural instruments, simple harmony, vocal focus'
  },
  'Footwork': {
    desc: 'An ultra-fast Chicago electronic dance genre built for competitive footwork dancing. Features rapid-fire samples, syncopated rhythms, and frenetic energy.',
    bpm: '155-165',
    traits: 'Rapid-fire samples, syncopated kicks, repetitive vocal chops, frenetic energy, polyrhythmic'
  },
  'French House': {
    desc: 'A filtered, funky take on house music popularized by French producers like Daft Punk and Cassius. Built on heavily filtered disco samples and phaser effects.',
    bpm: '118-128',
    traits: 'Filtered disco samples, phaser effects, funky bass, compressed drums, warm analog sound'
  },
  'Funk': {
    desc: 'A groove-heavy genre rooted in African-American music, driven by syncopated basslines, rhythmic guitar, and tight horn sections. The foundation of many modern genres.',
    bpm: '90-130',
    traits: 'Syncopated bass, rhythmic guitar, horn stabs, tight grooves, emphasis on the one'
  },
  'Future Bass': {
    desc: 'A colorful, melodic electronic genre featuring lush supersaws, pitched vocal chops, and sidechain-heavy chord stabs. Emerged from the SoundCloud scene around 2014.',
    bpm: '130-170',
    traits: 'Supersaw chords, vocal chops, sidechained stabs, bright synths, emotional melodies'
  },
  'Future Garage': {
    desc: 'A more atmospheric and experimental evolution of UK garage, blending shuffled beats with ambient textures, reverbed vocals, and emotional depth.',
    bpm: '130-140',
    traits: 'Shuffled beats, ambient textures, reverbed vocals, emotional depth, garage rhythms'
  },
  'Future House': {
    desc: 'A modern house subgenre with metallic, plucky lead synths, bouncy basslines, and a polished, colorful sound. Popularized by Tchami and Oliver Heldens.',
    bpm: '124-128',
    traits: 'Metallic leads, bouncy bass, plucky synths, polished mix, modern house groove'
  },
  'Future Soul': {
    desc: 'A contemporary take on soul music incorporating electronic production, neo-soul harmonics, and R&B vocal styles with modern sound design.',
    bpm: '70-110',
    traits: 'Neo-soul vocals, electronic production, warm keys, lush harmonics, modern textures'
  },
  'G-Funk': {
    desc: 'A West Coast hip hop style pioneered by Dr. Dre, featuring smooth synth leads, deep 808 bass, whiny Moog melodies, and a laid-back gangsta rap vibe.',
    bpm: '80-100',
    traits: 'Smooth synth leads, deep 808 bass, whiny Moog lines, talk-box, laid-back groove'
  },
  'Gabber': {
    desc: 'An extremely fast and aggressive form of hardcore techno originating from the Netherlands. Features distorted kick drums and relentless, pounding energy.',
    bpm: '150-200',
    traits: 'Distorted kicks, extreme tempo, aggressive energy, pounding bass, industrial noise'
  },
  'Game Audio': {
    desc: 'Music and sound design created specifically for video games. Encompasses many styles and must support interactivity, looping, and adaptive playback.',
    bpm: '60-180',
    traits: 'Adaptive composition, loop-friendly, interactive layers, varied styles, sound design integration'
  },
  'Garage Rock': {
    desc: 'A raw, lo-fi style of rock characterized by fuzzy guitars, simple song structures, and a rough, energetic performance aesthetic.',
    bpm: '120-160',
    traits: 'Fuzzy guitars, raw production, simple riffs, energetic performance, lo-fi aesthetic'
  },
  'Gqom': {
    desc: 'A raw, minimalist South African electronic genre from Durban featuring dark, repetitive percussion patterns and sparse, hypnotic arrangements.',
    bpm: '118-124',
    traits: 'Raw percussion, dark minimalism, repetitive patterns, sparse arrangements, hypnotic energy'
  },
  'Glitch Hop': {
    desc: 'A fusion of hip hop grooves with glitchy electronic production, featuring stuttering edits, digital artifacts, and funky, mid-tempo beats.',
    bpm: '100-115',
    traits: 'Glitchy edits, funky beats, digital artifacts, stuttering samples, mid-tempo groove'
  },
  'Gospel': {
    desc: 'Spiritually-rooted music from African-American church traditions, known for powerful vocal harmonies, call-and-response, and uplifting, emotional performances.',
    bpm: '70-140',
    traits: 'Powerful vocals, choir harmonies, call-and-response, organ/piano, uplifting energy'
  },
  'Grime': {
    desc: 'A fast-paced UK electronic genre with aggressive MC delivery over dark, sparse instrumentals. Emerged from East London in the early 2000s.',
    bpm: '138-142',
    traits: 'Aggressive MCs, dark synths, sparse beats, square-wave bass, UK energy'
  },
  'Grunge': {
    desc: 'A 1990s Seattle rock genre blending punk energy with heavy, down-tuned guitar riffs. Known for its raw production and angsty, disaffected lyrics.',
    bpm: '80-160',
    traits: 'Heavy distortion, down-tuned guitars, angsty vocals, raw production, dynamic shifts'
  },
  'Halftime DnB': {
    desc: 'A drum and bass subgenre where the drums play at half the perceived tempo while the bass remains deep. Creates a spacious, heavy, hip-hop-influenced feel.',
    bpm: '160-180',
    traits: 'Half-time drums, deep bass, spacious mix, hip-hop influence, heavy sub-bass'
  },
  'Hard Techno': {
    desc: 'A faster, more aggressive form of techno with distorted kicks, industrial textures, and relentless energy. Designed for peak-time and late-night sets.',
    bpm: '140-155',
    traits: 'Distorted kicks, aggressive energy, industrial textures, driving tempo, dark atmosphere'
  },
  'Hardstyle': {
    desc: 'A Dutch electronic genre with a distinctive hard-hitting, reverse-bass kick drum and euphoric melodies. A staple of European hard dance festivals.',
    bpm: '145-155',
    traits: 'Reverse bass kick, euphoric melodies, hard-hitting drums, pitch-bent leads, festival energy'
  },
  'Harsh Noise Wall': {
    desc: 'An extreme noise subgenre consisting of a dense, unbroken wall of static and distortion with no rhythmic or melodic elements. Purely textural.',
    bpm: '0-0',
    traits: 'Unbroken static, dense distortion, no rhythm, no melody, extreme texture'
  },
  'Heavy Metal': {
    desc: 'An aggressive rock genre defined by heavily distorted guitars, powerful drumming, and intense vocals. Spawned countless subgenres from thrash to doom.',
    bpm: '80-200',
    traits: 'Distorted guitars, double kick drums, powerful vocals, palm muting, guitar solos'
  },
  'Highlife': {
    desc: 'A West African genre from Ghana and Nigeria combining traditional African melodies with Western instruments like guitar and brass. Joyful and dance-oriented.',
    bpm: '100-130',
    traits: 'Melodic guitars, brass sections, African rhythms, joyful energy, danceable grooves'
  },
  'Hip Hop': {
    desc: 'A genre built on rhythmic vocal delivery (rapping) over beat-driven production. Encompasses a vast range of styles from boom bap to trap to experimental.',
    bpm: '70-110',
    traits: 'Rap vocals, sampled beats, 808 drums, bass-heavy, rhythmic flow'
  },
  'House': {
    desc: 'A foundational electronic dance genre born in 1980s Chicago, built on a steady four-on-the-floor kick drum, synthesized basslines, and repetitive grooves.',
    bpm: '120-130',
    traits: 'Four-on-the-floor kick, synth bass, offbeat hi-hats, repetitive grooves, vocal samples'
  },
  'Hyperpop': {
    desc: 'A maximalist, genre-bending style pushing pop conventions to extremes with pitch-shifted vocals, distorted bass, glitchy production, and sugar-rush energy.',
    bpm: '100-180',
    traits: 'Pitch-shifted vocals, distorted bass, maximalist production, glitchy edits, sugar-rush energy'
  },
  'IDM': {
    desc: 'Intelligent Dance Music is a somewhat controversial label for complex, experimental electronic music focused on intricate rhythms, unusual sound design, and cerebral listening.',
    bpm: '80-160',
    traits: 'Complex rhythms, intricate sound design, experimental structure, glitchy textures, cerebral approach'
  },
  'Indian': {
    desc: 'A broad category encompassing India\'s diverse musical traditions, from Hindustani and Carnatic classical to film music (Bollywood) and modern fusion.',
    bpm: '60-180',
    traits: 'Raga melodies, tabla rhythms, tanpura drone, ornamental vocals, microtonal inflections'
  },
  'Indie Dance': {
    desc: 'A crossover genre blending indie rock sensibility with electronic dance production. Features live instrumentation over danceable, four-on-the-floor beats.',
    bpm: '115-130',
    traits: 'Live instruments, dance beats, indie vocals, rock-electronic fusion, groove-focused'
  },
  'Indie Electronic': {
    desc: 'Electronic music made with an indie, DIY aesthetic. Emphasizes personal expression and experimental production over dancefloor functionality.',
    bpm: '90-140',
    traits: 'DIY aesthetic, experimental synths, indie sensibility, textured production, personal expression'
  },
  'Indie Pop': {
    desc: 'A melodic, accessible form of indie rock with jangly guitars, bright melodies, and a lighter, more pop-oriented approach than typical indie rock.',
    bpm: '100-140',
    traits: 'Jangly guitars, bright melodies, accessible hooks, light production, catchy songwriting'
  },
  'Indie Rock': {
    desc: 'Guitar-driven rock music released independently of major labels. Encompasses a wide range of styles united by a DIY ethos and alternative aesthetic.',
    bpm: '100-160',
    traits: 'Guitar-driven, alternative aesthetic, DIY ethos, varied styles, raw authenticity'
  },
  'Industrial': {
    desc: 'An aggressive, abrasive genre using harsh electronic sounds, distorted samples, mechanical rhythms, and provocative themes. Pioneered by Throbbing Gristle and Einsturzende Neubauten.',
    bpm: '100-150',
    traits: 'Harsh electronics, distorted samples, mechanical rhythms, abrasive textures, provocative themes'
  },
  'Jazz': {
    desc: 'An improvisational American genre rooted in African-American traditions, featuring complex harmonies, swing rhythms, and instrumental virtuosity across many subgenres.',
    bpm: '60-200',
    traits: 'Improvisation, complex harmony, swing feel, brass/woodwinds, walking bass'
  },
  'Jersey Club': {
    desc: 'A fast, sample-heavy dance music from Newark, New Jersey, built on chopped vocal samples, rapid-fire kick patterns, and bed-squeak percussion.',
    bpm: '130-145',
    traits: 'Chopped vocal samples, rapid kicks, bed-squeak percussion, call-and-response, frenetic energy'
  },
  'Jump Up DnB': {
    desc: 'An energetic, dancefloor-focused drum and bass subgenre with bouncy, aggressive basslines designed to make crowds jump. More straightforward than other DnB styles.',
    bpm: '170-180',
    traits: 'Bouncy basslines, aggressive energy, simple structure, dancefloor focus, jump-up drops'
  },
  'Jungle': {
    desc: 'The precursor to drum and bass, featuring heavily chopped breakbeats, deep sub-bass, ragga vocal samples, and a raw, rave-era energy from early 1990s UK.',
    bpm: '155-170',
    traits: 'Chopped breakbeats, deep sub-bass, ragga samples, time-stretching, rave energy'
  },
  'K-Pop': {
    desc: 'South Korean pop music featuring highly produced tracks, synchronized choreography, and a blend of pop, hip hop, R&B, and EDM elements. Known for its polished, maximalist production.',
    bpm: '100-140',
    traits: 'Polished production, genre-blending, synchronized performance, catchy hooks, maximalist arrangement'
  },
  'Kizomba': {
    desc: 'A sensual, slow dance music from Angola blending semba rhythms with zouk influences. Features romantic vocals over gentle, flowing electronic beats.',
    bpm: '80-100',
    traits: 'Sensual rhythm, slow groove, romantic vocals, zouk influence, gentle electronic beats'
  },
  'Kuduro': {
    desc: 'A high-energy Angolan electronic dance music combining house and techno elements with African percussion and call-and-response vocals.',
    bpm: '130-140',
    traits: 'Frenetic percussion, electronic beats, Angolan vocals, high energy, polyrhythmic patterns'
  },
  'Latin American': {
    desc: 'A broad category spanning the diverse musical traditions of Latin America, from salsa and cumbia to reggaeton and Latin trap.',
    bpm: '80-140',
    traits: 'Latin percussion, clave rhythms, Spanish lyrics, diverse styles, dance-oriented'
  },
  'Latin Trap': {
    desc: 'A fusion of trap production with Latin music elements and Spanish-language lyrics. Features 808-heavy beats with reggaeton and Latin rhythmic influences.',
    bpm: '60-80',
    traits: '808 bass, Spanish lyrics, trap hi-hats, reggaeton influence, auto-tuned vocals'
  },
  'Leftfield Bass': {
    desc: 'An umbrella term for experimental, bass-heavy electronic music that doesn\'t fit neatly into dubstep, drum and bass, or other defined genres.',
    bpm: '70-150',
    traits: 'Experimental bass, genre-blending, unconventional structure, heavy sub-bass, forward-thinking design'
  },
  'Library Music': {
    desc: 'Pre-made, royalty-free music originally produced for use in film, TV, and radio. Often quirky, functional, and designed to fit specific moods or scenes.',
    bpm: '60-140',
    traits: 'Functional composition, mood-specific, varied instrumentation, modular structure, utilitarian design'
  },
  'Liquid DnB': {
    desc: 'A smooth, melodic subgenre of drum and bass featuring lush pads, soulful vocals, and rolling basslines. Focuses on musicality and emotion over aggression.',
    bpm: '170-178',
    traits: 'Lush pads, soulful vocals, rolling bass, melodic focus, smooth energy'
  },
  'Lo-Fi': {
    desc: 'Music that intentionally embraces low-fidelity production imperfections like tape hiss, distortion, and limited frequency range as aesthetic choices.',
    bpm: '70-130',
    traits: 'Tape hiss, low fidelity, warm distortion, imperfect recording, analog warmth'
  },
  'Lo-Fi Hip Hop': {
    desc: 'A relaxed, study-friendly subgenre pairing mellow hip hop beats with jazzy samples, vinyl crackle, and warm, lo-fi textures. Popularized by YouTube livestreams.',
    bpm: '70-90',
    traits: 'Vinyl crackle, jazz samples, mellow drums, warm textures, relaxed atmosphere'
  },
  'Math Rock': {
    desc: 'A technically demanding rock subgenre built on complex, irregular time signatures, interlocking guitar patterns, and angular rhythms. Precision is a defining trait.',
    bpm: '100-180',
    traits: 'Odd time signatures, angular guitars, technical precision, interlocking patterns, complex rhythms'
  },
  'Mbalax': {
    desc: 'The national popular music of Senegal, blending traditional sabar drumming with Cuban and Western pop elements. Popularized internationally by Youssou N\'Dour.',
    bpm: '100-140',
    traits: 'Sabar drums, polyrhythmic patterns, call-and-response, energetic grooves, Wolof vocals'
  },
  'Melodic Dubstep': {
    desc: 'A more musical, emotional take on dubstep featuring soaring melodies, lush pads, and powerful vocal performances alongside heavy bass drops.',
    bpm: '138-150',
    traits: 'Soaring melodies, emotional vocals, heavy drops, lush pads, cinematic builds'
  },
  'Melodic House': {
    desc: 'A warm, melodic take on house music with emotive chord progressions, gentle pads, and a focus on musicality alongside a steady groove.',
    bpm: '120-126',
    traits: 'Warm chords, emotive melodies, gentle pads, steady groove, musical focus'
  },
  'Melodic Techno': {
    desc: 'A hypnotic blend of driving techno rhythms with emotional melodies and atmospheric breakdowns. Popularized by artists like Tale Of Us and Stephan Bodzin.',
    bpm: '120-128',
    traits: 'Driving rhythms, emotional melodies, atmospheric breakdowns, hypnotic arpeggios, dark beauty'
  },
  'Memphis Rap': {
    desc: 'A dark, lo-fi hip hop style from Memphis, Tennessee featuring horror-influenced samples, heavy 808 bass, and raw, gritty production. A key precursor to modern phonk and trap.',
    bpm: '60-80',
    traits: 'Dark samples, lo-fi production, heavy 808s, horror themes, raw vocals'
  },
  'Metalcore': {
    desc: 'A fusion of heavy metal and hardcore punk with breakdowns, screamed vocals, and alternation between aggressive and melodic passages.',
    bpm: '100-180',
    traits: 'Breakdowns, screamed vocals, heavy riffs, melodic passages, double kick drums'
  },
  'Middle Eastern': {
    desc: 'A broad category encompassing the diverse musical traditions of the Middle East, featuring quarter-tone scales (maqam), complex rhythms, and ornamental melodies.',
    bpm: '60-150',
    traits: 'Maqam scales, oud, darbuka rhythms, quarter-tones, ornamental melodies'
  },
  'Minimal Techno': {
    desc: 'A stripped-back form of techno focusing on repetition, subtle variation, and hypnotic grooves. Uses minimal elements to create a deep, immersive experience.',
    bpm: '120-132',
    traits: 'Repetitive loops, subtle variation, stripped-back sound, click-based percussion, hypnotic grooves'
  },
  'Minimalism': {
    desc: 'A compositional approach using repetitive patterns, gradual transformations, and limited harmonic material. Rooted in the work of Steve Reich, Philip Glass, and Terry Riley.',
    bpm: '60-140',
    traits: 'Repetitive patterns, phasing, gradual transformation, limited material, sustained focus'
  },
  'Moombahton': {
    desc: 'A fusion genre slowing down Dutch house to a reggaeton-like tempo. Created by Dave Nada, it blends electronic dance elements with Latin and Caribbean rhythms.',
    bpm: '100-110',
    traits: 'Dembow rhythm, Dutch house synths, Latin percussion, mid-tempo groove, tropical energy'
  },
  'Motown': {
    desc: 'The iconic soul sound from Berry Gordy\'s Detroit label, featuring tight arrangements, orchestral sweetening, driving rhythms, and polished vocal performances.',
    bpm: '100-130',
    traits: 'Tight arrangements, driving bass, tambourine, orchestral sweetening, polished vocals'
  },
  'Neo Soul': {
    desc: 'A late-1990s movement reviving classic soul with modern production, jazz-influenced harmony, and a conscious, artistic sensibility. Pioneered by D\'Angelo and Erykah Badu.',
    bpm: '70-110',
    traits: 'Jazz-inflected harmony, warm keys, conscious lyrics, organic production, soulful vocals'
  },
  'Neurofunk': {
    desc: 'A dark, technical subgenre of drum and bass with complex, heavily processed basslines, metallic textures, and a cold, sci-fi-influenced atmosphere.',
    bpm: '170-178',
    traits: 'Processed bass, metallic textures, complex sound design, dark atmosphere, technical precision'
  },
  'New Age': {
    desc: 'Gentle, soothing instrumental music designed for relaxation, meditation, and wellness. Features natural sounds, soft synths, and calming acoustic instruments.',
    bpm: '60-100',
    traits: 'Soothing tones, nature sounds, soft synths, calming melodies, meditative quality'
  },
  'New Wave': {
    desc: 'A late 1970s-1980s genre blending punk\'s energy with synthesizers, art-school aesthetics, and quirky pop songwriting. Bridged punk and electronic pop.',
    bpm: '100-150',
    traits: 'Synth-driven, quirky vocals, angular guitars, art-school aesthetic, new romantic style'
  },
  'Noise': {
    desc: 'An extreme form of experimental music using feedback, distortion, and non-musical sound sources as primary material. Values rawness and sonic confrontation.',
    bpm: '0-200',
    traits: 'Feedback, distortion, non-musical sounds, sonic extremes, confrontational approach'
  },
  'Noise Rock': {
    desc: 'A fusion of punk rock with noise and feedback, featuring dissonant guitars, abrasive production, and an aggressive, confrontational performance style.',
    bpm: '80-180',
    traits: 'Dissonant guitars, abrasive production, feedback, aggressive energy, confrontational style'
  },
  'Nu Disco': {
    desc: 'A modern revival of disco aesthetics with contemporary electronic production. Features funky basslines, filtered synths, and groovy, dance-oriented arrangements.',
    bpm: '115-128',
    traits: 'Funky basslines, filtered synths, disco grooves, modern production, retro-modern blend'
  },
  'Organic House': {
    desc: 'A warm, natural-sounding house subgenre incorporating acoustic instruments, world music elements, and earthy textures alongside electronic production.',
    bpm: '115-122',
    traits: 'Acoustic instruments, world music elements, earthy textures, warm tones, natural sounds'
  },
  'Phonk': {
    desc: 'A lo-fi hip hop subgenre sampling 1990s Memphis rap and chopped-and-screwed techniques. Features pitched-down vocals, heavy bass, and a dark, hazy atmosphere.',
    bpm: '60-80',
    traits: 'Pitched-down vocals, Memphis samples, heavy 808s, lo-fi haze, cowbell patterns'
  },
  'Pluggnb': {
    desc: 'A fusion of plug music (a beat style from SoundCloud) with R&B melodies. Features dreamy, ethereal synths, soft 808 patterns, and melodic, auto-tuned vocals.',
    bpm: '130-160',
    traits: 'Dreamy synths, soft 808s, ethereal melodies, auto-tuned vocals, spacey atmosphere'
  },
  'Plunderphonics': {
    desc: 'A form of sound collage that creates new compositions entirely from existing recordings. Uses sampling, cutting, and remixing of recognizable source material as commentary.',
    bpm: '0-200',
    traits: 'Found sounds, collage technique, repurposed samples, commentary through sampling, deconstructed media'
  },
  'Pop': {
    desc: 'Commercially-oriented popular music emphasizing catchy melodies, strong hooks, and accessible song structures. Absorbs influences from every genre.',
    bpm: '100-130',
    traits: 'Catchy hooks, verse-chorus structure, polished production, accessible melodies, broad appeal'
  },
  'Post-Punk': {
    desc: 'An experimental evolution of punk rock incorporating angular guitars, prominent basslines, electronic elements, and a darker, more art-focused aesthetic.',
    bpm: '100-160',
    traits: 'Angular guitars, driving basslines, cold atmosphere, electronic elements, art-rock aesthetic'
  },
  'Post-Rock': {
    desc: 'An instrumental rock genre building slowly from quiet, delicate passages to massive, layered crescendos. Uses guitars more for texture than riffs.',
    bpm: '80-140',
    traits: 'Crescendo builds, textural guitars, delayed/reverbed tone, cinematic scope, instrumental focus'
  },
  'Power Electronics': {
    desc: 'An extreme industrial subgenre using harsh, screamed vocals over walls of feedback and electronic noise. Confrontational and intentionally provocative.',
    bpm: '0-140',
    traits: 'Harsh vocals, extreme distortion, feedback walls, confrontational performance, industrial noise'
  },
  'Progressive House': {
    desc: 'A melodic, evolving form of house music with long, gradual builds, layered arrangements, and a focus on journey-like progression through a track.',
    bpm: '122-128',
    traits: 'Gradual builds, layered arrangement, evolving structure, melodic arpeggios, journey-like progression'
  },
  'Progressive Rock': {
    desc: 'An ambitious rock genre featuring complex compositions, concept albums, unusual time signatures, and virtuosic musicianship. Pioneered by Pink Floyd, Yes, and Genesis.',
    bpm: '60-160',
    traits: 'Complex compositions, odd time signatures, concept albums, virtuosic playing, extended forms'
  },
  'Psytrance': {
    desc: 'A driving, psychedelic form of trance with rapid arpeggiated basslines, trippy sound effects, and hypnotic, spiraling synthesizers designed for transformative dance experiences.',
    bpm: '138-148',
    traits: 'Rapid arpeggiated bass, trippy FX, spiraling synths, hypnotic energy, psychedelic atmosphere'
  },
  'Psychedelic Rock': {
    desc: 'A 1960s rock genre seeking to evoke mind-altering experiences through extended jams, unusual effects, swirling guitars, and experimental studio techniques.',
    bpm: '80-140',
    traits: 'Swirling guitars, phaser/flanger effects, extended jams, experimental recording, mind-altering sound'
  },
  'Punk': {
    desc: 'A raw, fast, and aggressive rock genre emphasizing DIY ethics, anti-establishment attitude, and stripped-down three-chord energy over technical skill.',
    bpm: '150-200',
    traits: 'Fast tempo, three-chord structure, raw energy, DIY ethos, anti-establishment attitude'
  },
  'R&B': {
    desc: 'Rhythm and blues encompasses smooth vocal performances over groove-based production. Modern R&B blends soul, funk, hip hop, and electronic elements.',
    bpm: '60-110',
    traits: 'Smooth vocals, groove-based, soulful melodies, rhythmic feel, layered harmonies'
  },
  'Rage': {
    desc: 'A modern trap subgenre originating from the New York drill scene, featuring distorted 808s, aggressive synth leads, and high-energy, confrontational beats.',
    bpm: '130-150',
    traits: 'Distorted 808s, aggressive synths, high energy, NY drill influence, confrontational tone'
  },
  'Rave': {
    desc: 'An umbrella term for high-energy electronic music associated with rave culture, typically featuring euphoric synths, breakbeats, and intense build-drops.',
    bpm: '130-160',
    traits: 'Euphoric synths, breakbeats, high energy, build-drop structure, rave stabs'
  },
  'Reggae': {
    desc: 'A Jamaican genre defined by its offbeat rhythm guitar (skank), deep bass, and socially conscious or spiritual (Rastafarian) lyrics. Pioneered by Bob Marley.',
    bpm: '60-90',
    traits: 'Offbeat skank guitar, deep bass, one-drop rhythm, conscious lyrics, dub effects'
  },
  'Reggaeton': {
    desc: 'A Latin urban genre built on the distinctive dembow riddim pattern, blending Caribbean, hip hop, and Latin influences. Became a global pop force in the 2010s.',
    bpm: '85-100',
    traits: 'Dembow rhythm, 808 bass, Spanish vocals, perreo dance, Latin percussion'
  },
  'Riddim': {
    desc: 'A minimal, repetitive subgenre of dubstep focusing on relentless, grinding bass patterns with stripped-back arrangements and heavy emphasis on rhythm.',
    bpm: '140-150',
    traits: 'Repetitive bass patterns, minimal arrangement, grinding wobbles, stripped-back drops, heavy rhythm'
  },
  'Rock': {
    desc: 'A broad genre built on electric guitars, bass, drums, and vocals. Ranges from classic rock to alternative and spans decades of diverse styles.',
    bpm: '90-160',
    traits: 'Electric guitars, driving drums, bass foundation, vocal-driven, energetic performance'
  },
  'Salsa': {
    desc: 'An energetic Latin dance music blending Cuban son, mambo, and jazz elements with horn-driven arrangements and complex polyrhythmic percussion.',
    bpm: '150-250',
    traits: 'Clave rhythm, horn sections, piano montuno, timbales/congas, polyrhythmic percussion'
  },
  'Samba': {
    desc: 'A rhythmically complex Brazilian genre deeply tied to Carnival celebrations. Features interlocking percussion patterns, call-and-response singing, and infectious energy.',
    bpm: '95-115',
    traits: 'Surdo bass drum, tamborim, interlocking percussion, syncopated groove, carnival energy'
  },
  'Shoegaze': {
    desc: 'A heavily effected guitar genre creating dense walls of swirling, reverbed sound. Named for performers staring at their effect pedals. Pioneered by My Bloody Valentine.',
    bpm: '80-130',
    traits: 'Wall of guitar, heavy reverb/chorus, buried vocals, droning textures, washed-out sound'
  },
  'Ska': {
    desc: 'A Jamaican precursor to reggae with a bouncy offbeat guitar chop, walking bass, and horn-driven melodies. Went through three distinct waves from the 1960s to 1990s.',
    bpm: '100-150',
    traits: 'Offbeat guitar chop, walking bass, horn sections, bouncy energy, upstroke rhythms'
  },
  'Soca': {
    desc: 'A high-energy Caribbean genre from Trinidad, evolved from calypso with faster tempos and a more dance-driven focus. The sound of Caribbean Carnival celebrations.',
    bpm: '130-170',
    traits: 'Fast tempo, driving percussion, brass stabs, high energy, carnival vibe'
  },
  'Soul': {
    desc: 'An emotionally powerful African-American genre combining gospel vocals, R&B grooves, and blues feeling. Known for passionate vocal delivery and warm, organic production.',
    bpm: '70-130',
    traits: 'Powerful vocals, gospel influence, horn sections, warm production, emotional delivery'
  },
  'Soukous': {
    desc: 'A Congolese dance music style featuring intricate, fast-picked guitar lines (sebene), rumba rhythms, and an irresistibly joyful, dance-driving energy.',
    bpm: '120-160',
    traits: 'Intricate guitar picking, rumba rhythms, sebene sections, joyful energy, polyrhythmic drums'
  },
  'Sound Design': {
    desc: 'The creation and manipulation of audio elements for various media. Focuses on crafting specific sounds, textures, and atmospheres rather than traditional songwriting.',
    bpm: '0-200',
    traits: 'Custom sound creation, synthesis, foley, texture crafting, audio manipulation'
  },
  'South Asian': {
    desc: 'A broad category covering the musical traditions of South Asia, including Indian classical, Bollywood, bhangra, qawwali, and modern fusion styles.',
    bpm: '60-180',
    traits: 'Complex rhythmic cycles, melodic ornamentation, drone instruments, classical forms, regional diversity'
  },
  'Speed Garage': {
    desc: 'A late 1990s UK genre bridging house and garage with warped, pitch-bent basslines and a faster, more bass-heavy take on the garage sound.',
    bpm: '130-138',
    traits: 'Warped basslines, garage beats, time-stretched vocals, bass-heavy, 2-step influence'
  },
  'Stoner / Doom': {
    desc: 'An extremely slow, heavy metal subgenre with down-tuned, fuzz-laden guitars and a thick, crushing sonic weight. Often influenced by Black Sabbath and psychedelia.',
    bpm: '40-80',
    traits: 'Down-tuned guitars, extreme fuzz, slow tempo, crushing weight, psychedelic elements'
  },
  'Synth-Pop': {
    desc: 'A pop genre built primarily on synthesizers and drum machines, emerging in the early 1980s. Features catchy melodies delivered through electronic instrumentation.',
    bpm: '100-140',
    traits: 'Synthesizer melodies, drum machines, catchy hooks, electronic arrangement, polished vocals'
  },
  'Synthwave': {
    desc: 'A retro-futuristic electronic genre inspired by 1980s film soundtracks, synth-pop, and video game music. Heavy on nostalgic analog synth tones and neon aesthetics.',
    bpm: '80-120',
    traits: 'Retro analog synths, 1980s nostalgia, arpeggiated bass, gated reverb drums, neon aesthetic'
  },
  'Taiko': {
    desc: 'Traditional Japanese ensemble drumming using large, barrel-shaped drums. Features powerful, thunderous rhythms performed with choreographed physical movement.',
    bpm: '80-160',
    traits: 'Large drums, thunderous rhythms, ensemble performance, dynamic range, physical energy'
  },
  'Tearout Dubstep': {
    desc: 'An extremely aggressive subgenre of dubstep with chaotic, distorted bass design, rapid-fire sound switches, and maximum sonic aggression.',
    bpm: '140-150',
    traits: 'Chaotic bass design, extreme distortion, rapid sound switches, aggressive drops, maximum intensity'
  },
  'Tech House': {
    desc: 'A hybrid genre sitting between house and techno, combining house\'s groove with techno\'s darker, more driving rhythmic elements.',
    bpm: '122-130',
    traits: 'Driving grooves, percussive focus, minimal melody, rolling basslines, tight drum programming'
  },
  'Techno': {
    desc: 'A repetitive, rhythm-driven electronic genre born in 1980s Detroit. Built on machine-generated beats, synthetic textures, and relentless, hypnotic energy.',
    bpm: '125-140',
    traits: 'Machine rhythms, synthetic textures, repetitive loops, hypnotic energy, industrial undertones'
  },
  'Trance': {
    desc: 'An uplifting, melodic electronic genre built on long build-ups, euphoric breakdowns, and arpeggiated synth lines. Designed to create a transcendent dance experience.',
    bpm: '128-140',
    traits: 'Euphoric melodies, long build-ups, arpeggiated synths, uplifting breakdowns, anthemic energy'
  },
  'Trap': {
    desc: 'A hip hop production style from Atlanta featuring heavy 808 bass, rapid hi-hat rolls, dark melodies, and aggressive vocal delivery. Became a dominant force in modern hip hop.',
    bpm: '60-80',
    traits: 'Heavy 808 bass, rapid hi-hat rolls, dark melodies, snare rolls, auto-tuned vocals'
  },
  'Trap EDM': {
    desc: 'A festival-oriented fusion of trap production with EDM energy. Takes trap\'s 808s and hi-hat rolls and pairs them with massive drops and electronic sound design.',
    bpm: '130-150',
    traits: '808 bass, EDM drops, trap hi-hats, festival energy, massive builds'
  },
  'Trap Soul': {
    desc: 'A smooth, moody blend of trap production and R&B vocals. Features atmospheric pads, muted 808s, and intimate, often melancholic vocal performances.',
    bpm: '60-80',
    traits: 'Atmospheric pads, muted 808s, R&B vocals, moody textures, intimate feel'
  },
  'Trip Hop': {
    desc: 'A downtempo genre from 1990s Bristol blending hip hop beats with atmospheric, cinematic soundscapes. Pioneered by Massive Attack, Portishead, and Tricky.',
    bpm: '70-100',
    traits: 'Downtempo beats, cinematic atmosphere, scratchy samples, moody textures, dark ambience'
  },
  'Tropical House': {
    desc: 'A bright, summery house subgenre with steel drum sounds, marimba leads, and a relaxed, beach-friendly vibe. Popularized by Kygo and Thomas Jack.',
    bpm: '100-115',
    traits: 'Steel drums, marimba leads, bright chords, summer vibe, relaxed energy'
  },
  'UK Drill': {
    desc: 'A London adaptation of Chicago drill music with dark, sliding 808 bass, eerie melodies, and aggressive rap delivery. Features distinctive sliding bass patterns.',
    bpm: '138-145',
    traits: 'Sliding 808 bass, dark melodies, aggressive bars, drill hi-hats, eerie atmosphere'
  },
  'UK Funky': {
    desc: 'A UK dance genre blending house beats with African and Caribbean rhythms. Features syncopated percussion, tribal elements, and a unique bouncy groove.',
    bpm: '125-135',
    traits: 'Syncopated percussion, tribal elements, bouncy groove, African/Caribbean rhythms, house framework'
  },
  'UK Garage': {
    desc: 'A UK dance genre from the mid-1990s combining soulful vocals with shuffled, syncopated beats and deep bass. The parent genre of 2-step, grime, and dubstep.',
    bpm: '130-140',
    traits: 'Shuffled beats, soulful vocals, deep bass, syncopated rhythms, chopped vocal samples'
  },
  'Vaporwave': {
    desc: 'An internet-born microgenre that slows down and manipulates 1980s/90s smooth jazz, elevator music, and corporate muzak as commentary on consumer culture.',
    bpm: '60-100',
    traits: 'Slowed-down samples, lo-fi processing, retro nostalgia, reverb-drenched, consumer culture critique'
  },
  'Wave': {
    desc: 'A dark, atmospheric electronic genre blending elements of trap, dubstep, and ambient music. Features ethereal melodies, heavy reverb, and emotional, melancholic tones.',
    bpm: '130-160',
    traits: 'Ethereal melodies, heavy reverb, dark atmosphere, trap influence, emotional tones'
  },
  'Witch House': {
    desc: 'A dark, occult-themed electronic microgenre blending chopped-and-screwed hip hop with drone, industrial, and shoegaze elements. Emerged around 2009.',
    bpm: '60-130',
    traits: 'Occult themes, chopped-and-screwed vocals, dark drones, lo-fi production, eerie atmosphere'
  },
  'Zouk': {
    desc: 'A sensual, rhythmic dance music from the French Caribbean (Guadeloupe and Martinique). Features flowing guitar, synth pads, and a distinctive slow-rolling beat.',
    bpm: '80-120',
    traits: 'Flowing guitar, synth pads, Caribbean rhythm, sensual groove, French Creole vocals'
  },
  'African': {
    desc: 'A broad category encompassing the rich and diverse musical traditions of the African continent, from West African highlife and Afrobeat to Southern African amapiano and East African taarab.',
    bpm: '80-150',
    traits: 'Polyrhythmic drums, call-and-response, diverse traditions, regional variety, dance-oriented'
  },
  'Asian': {
    desc: 'A broad category covering the diverse musical traditions across Asia, from East Asian classical and J-pop/K-pop to Southeast Asian gamelan and Central Asian throat singing.',
    bpm: '60-180',
    traits: 'Pentatonic scales, diverse instrumentation, regional traditions, tonal variety, ancient and modern fusion'
  },
  'Brazilian': {
    desc: 'A broad category spanning Brazil\'s incredibly diverse musical heritage, from samba and bossa nova to MPB, forr\u00f3, and modern baile funk.',
    bpm: '80-150',
    traits: 'Syncopated rhythms, percussive richness, melodic warmth, diverse styles, rhythmic complexity'
  },
  'Caribbean': {
    desc: 'A broad category encompassing the vibrant musical traditions of the Caribbean islands, from reggae and dancehall to soca, calypso, zouk, and kompa.',
    bpm: '80-160',
    traits: 'Island rhythms, offbeat patterns, tropical energy, diverse influences, dance-driven'
  }
};
