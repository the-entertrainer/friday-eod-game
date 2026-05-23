let gameState = {
    minutes: 960,
    quality: 100,
    patience: 50,
    currentNode: "start",
    previousNode: null,
    isTyping: false,
    typeInterval: null,
    trapTimeout: null
};

const uiClock       = document.getElementById('clock-display');
const uiQuality     = document.getElementById('quality-bar');
const uiPatience    = document.getElementById('patience-bar');
const uiName        = document.getElementById('speaker-name');
const uiText        = document.getElementById('dialogue-text');
const uiChoices     = document.getElementById('choices-container');
const uiViewport    = document.getElementById('viewport');
const uiSceneImage  = document.getElementById('scene-image');
const uiSceneOut    = document.getElementById('scene-image-out');
const uiTrap        = document.getElementById('trap-overlay');
const uiFade        = document.getElementById('fade-overlay');
const uiTapHint     = document.getElementById('tap-hint');
const uiEndingCard  = document.getElementById('ending-card');
const uiLoadingBar  = document.getElementById('loading-bar-container');
const uiLoadingFill = document.getElementById('loading-bar-fill');
const uiGameCont    = document.getElementById('game-container');

// ─── Audio ────────────────────────────────────────────────────────────────────
let audioCtx = null;

function initAudio() {
    if (audioCtx) return;
    try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }
    catch(e) { audioCtx = null; }
}

// One-shot sound effects
function playSound(type) {
    if (!audioCtx) return;
    try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain); gain.connect(audioCtx.destination);
        const t = audioCtx.currentTime;
        switch (type) {
            case 'pop':
                osc.type = 'sine';
                osc.frequency.setValueAtTime(480, t);
                osc.frequency.exponentialRampToValueAtTime(760, t + 0.09);
                gain.gain.setValueAtTime(0.10, t);
                gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
                osc.start(t); osc.stop(t + 0.12);
                break;
            case 'damage':
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(240, t);
                osc.frequency.exponentialRampToValueAtTime(80, t + 0.2);
                gain.gain.setValueAtTime(0.07, t);
                gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
                osc.start(t); osc.stop(t + 0.2);
                break;
            case 'success':
                osc.type = 'sine';
                osc.frequency.setValueAtTime(523, t);
                osc.frequency.setValueAtTime(659, t + 0.1);
                osc.frequency.setValueAtTime(784, t + 0.22);
                gain.gain.setValueAtTime(0.10, t);
                gain.gain.exponentialRampToValueAtTime(0.001, t + 0.38);
                osc.start(t); osc.stop(t + 0.38);
                break;
        }
    } catch(e) {}
}

// ─── Typing Melody (8-bit loop played during typewriter) ─────────────────────
// D-minor pentatonic: D5 F5 G5 A5 C6 — urgent office-coder rhythm
const TYPING_NOTES = [
    [587,90],[698,90],[784,90],[0,55],
    [784,90],[880,90],[784,90],[0,55],
    [698,90],[587,90],[0,110],
    [587,90],[698,90],[880,90],[784,90],[698,175],[0,140]
];
let typingMel = { timers: [], idx: 0, running: false };

function startTypingMelody() {
    if (!audioCtx) return;
    stopTypingMelody(false);
    typingMel.idx = 0;
    typingMel.running = true;
    if (bgm.masterGain) {
        bgm.masterGain.gain.cancelScheduledValues(audioCtx.currentTime);
        bgm.masterGain.gain.linearRampToValueAtTime(0.012, audioCtx.currentTime + 0.1);
    }
    scheduleMelNote();
}

function stopTypingMelody(unduck = true) {
    typingMel.timers.forEach(clearTimeout);
    typingMel.timers = [];
    typingMel.running = false;
    if (unduck && bgm.masterGain && audioCtx) {
        bgm.masterGain.gain.cancelScheduledValues(audioCtx.currentTime);
        bgm.masterGain.gain.linearRampToValueAtTime(0.05, audioCtx.currentTime + 0.35);
    }
}

function scheduleMelNote() {
    if (!typingMel.running || !audioCtx) return;
    const [freq, dur] = TYPING_NOTES[typingMel.idx % TYPING_NOTES.length];
    typingMel.idx++;
    if (freq > 0) {
        try {
            const o = audioCtx.createOscillator(), g = audioCtx.createGain();
            o.type = 'square'; o.frequency.value = freq;
            g.gain.setValueAtTime(0.055, audioCtx.currentTime);
            g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + dur / 1000 * 0.82);
            o.connect(g); g.connect(audioCtx.destination);
            o.start(); o.stop(audioCtx.currentTime + dur / 1000);
        } catch(e) {}
    }
    typingMel.timers.push(setTimeout(scheduleMelNote, dur));
}

// ─── Game BGM System ──────────────────────────────────────────────────────────
const SCENE_MOODS = {
    start: 'office', setup: 'office', upload: 'office',
    ambush: 'tense', meta_moment: 'tense', diplomatic: 'tense',
    aggressive: 'tense', technical_pushback: 'tense',
    compromise: 'defeated', loading_bar: 'suspense',
    crash: 'horror', meta_escape: 'matrix', rogue_export: 'action',
    martyr_office: 'defeated', ppt_promotion: 'victory',
    true_winner: 'victory', victory_screen: 'victory',
    rage_quit: 'action', martyr: 'defeated'
};

let bgm = { nodes: [], masterGain: null, mood: null, timerId: null, startId: 0 };

function stopBGM() {
    clearTimeout(bgm.timerId);
    const savedNodes = [...bgm.nodes], savedGain = bgm.masterGain;
    bgm.nodes = []; bgm.masterGain = null; bgm.mood = null;
    if (savedGain && audioCtx) {
        try { savedGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.4); } catch(e) {}
    }
    setTimeout(() => {
        savedNodes.forEach(n => { try { n.stop(); } catch(e) {} });
        if (savedGain) { try { savedGain.disconnect(); } catch(e) {} }
    }, 450);
}

function startBGM(mood) {
    if (!audioCtx || bgm.mood === mood) return;
    stopBGM();
    bgm.mood = mood;
    const myId = ++bgm.startId;
    setTimeout(() => {
        if (bgm.mood !== mood || bgm.startId !== myId || !audioCtx) return;
        const master = audioCtx.createGain();
        master.gain.setValueAtTime(0, audioCtx.currentTime);
        master.gain.linearRampToValueAtTime(0.05, audioCtx.currentTime + 1.4);
        master.connect(audioCtx.destination);
        bgm.masterGain = master;
        switch (mood) {
            case 'office':   buildOfficeBGM(master);   break;
            case 'tense':    buildTenseBGM(master);    break;
            case 'suspense': buildSuspenseBGM(master); break;
            case 'horror':   buildHorrorBGM(master);   break;
            case 'matrix':   buildMatrixBGM(master);   break;
            case 'victory':  buildVictoryBGM(master);  break;
            case 'defeated': buildDefeatedBGM(master); break;
            case 'action':   buildActionBGM(master);   break;
        }
    }, 320);
}

function bgmOsc(type, freq) {
    const o = audioCtx.createOscillator();
    o.type = type; o.frequency.value = freq;
    o.start(); bgm.nodes.push(o); return o;
}
function bgmGain(val) {
    const g = audioCtx.createGain(); g.gain.value = val;
    bgm.nodes.push(g); return g;
}
function bgmFilter(type, freq, q) {
    const f = audioCtx.createBiquadFilter();
    f.type = type; f.frequency.value = freq; if (q) f.Q.value = q;
    bgm.nodes.push(f); return f;
}

function buildOfficeBGM(out) {
    const filt = bgmFilter('lowpass', 340); filt.connect(out);
    [[60, 1], [120, 0.22], [180, 0.07]].forEach(([f, v]) => {
        const g = bgmGain(v); bgmOsc('sine', f).connect(g); g.connect(filt);
    });
    const lfoG = bgmGain(0.009); bgmOsc('sine', 0.13).connect(lfoG); lfoG.connect(out.gain);
}
function buildTenseBGM(out) {
    const filt = bgmFilter('bandpass', 88, 2.5); filt.connect(out);
    bgmOsc('sawtooth', 55).connect(filt);
    bgmOsc('sawtooth', 82.4).connect(filt);
    const tG = bgmGain(0.22); bgmOsc('sine', 4.4).connect(tG); tG.connect(out.gain);
}
function buildSuspenseBGM(out) {
    const ctx = audioCtx, osc = bgmOsc('sine', 42); osc.connect(out);
    function rise() {
        if (!bgm.nodes.includes(osc)) return;
        try { osc.frequency.setValueAtTime(42, ctx.currentTime); osc.frequency.linearRampToValueAtTime(62, ctx.currentTime + 9); bgm.timerId = setTimeout(rise, 9000); } catch(e) {}
    }
    rise();
    const gateG = bgmGain(0.38); bgmOsc('square', 0.7).connect(gateG); gateG.connect(out.gain);
}
function buildHorrorBGM(out) {
    const filt = bgmFilter('lowpass', 620); filt.connect(out);
    bgmOsc('sawtooth', 110).connect(filt); bgmOsc('sawtooth', 116.54).connect(filt);
    const wob = bgmGain(0.028); bgmOsc('sine', 0.38).connect(wob); wob.connect(out.gain);
}
function buildMatrixBGM(out) {
    const ctx = audioCtx, pat = [110, 165, 220, 165, 110, 146.8, 110, 123.5]; let idx = 0;
    function fire() {
        if (!bgm.masterGain) return;
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.type = 'square'; o.frequency.value = pat[idx++ % pat.length];
        g.gain.setValueAtTime(0.65, ctx.currentTime); g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.075);
        o.connect(g); g.connect(out); o.start(); o.stop(ctx.currentTime + 0.075);
        bgm.timerId = setTimeout(fire, 158);
    }
    fire();
}
function buildVictoryBGM(out) {
    const ctx = audioCtx, pat = [523.25, 659.25, 783.99, 1046.5, 783.99, 659.25, 523.25, 659.25]; let idx = 0;
    function fire() {
        if (!bgm.masterGain) return;
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.type = 'sine'; o.frequency.value = pat[idx++ % pat.length];
        g.gain.setValueAtTime(0.55, ctx.currentTime); g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.24);
        o.connect(g); g.connect(out); o.start(); o.stop(ctx.currentTime + 0.24);
        bgm.timerId = setTimeout(fire, 230);
    }
    fire();
}
function buildDefeatedBGM(out) {
    const filt = bgmFilter('lowpass', 240); filt.connect(out);
    bgmOsc('sine', 65.41).connect(filt); bgmOsc('sine', 77.78).connect(filt);
    const lG = bgmGain(0.014); bgmOsc('sine', 0.06).connect(lG); lG.connect(out.gain);
}
function buildActionBGM(out) {
    const filt = bgmFilter('lowpass', 900); filt.connect(out);
    bgmOsc('sawtooth', 110).connect(filt);
    const harm = bgmGain(0.28); bgmOsc('square', 220).connect(harm); harm.connect(filt);
    const gateG = bgmGain(0.32); bgmOsc('square', 4.2).connect(gateG); gateG.connect(out.gain);
}

// ─── Ending Jingles ───────────────────────────────────────────────────────────
// Scheduled precisely with Web Audio clock (more accurate than setTimeouts)
const VICTORY_JINGLE = [[523,80],[659,80],[784,80],[1047,320],[0,60],[784,100],[880,100],[1047,400],[0,80],[1047,180],[1175,180],[1319,440]];
const BAD_JINGLE     = [[440,180],[415,180],[392,180],[370,180],[349,360],[0,80],[330,180],[311,180],[294,600]];

function playEndingJingle(type) {
    if (!audioCtx) return;
    const notes = type === 'victory' ? VICTORY_JINGLE : BAD_JINGLE;
    const master = audioCtx.createGain();
    master.gain.value = 0.13;
    master.connect(audioCtx.destination);
    let t = audioCtx.currentTime + 0.6;
    notes.forEach(([freq, dur]) => {
        if (freq > 0) {
            const o = audioCtx.createOscillator(), g = audioCtx.createGain();
            o.type = type === 'victory' ? 'sine' : 'triangle';
            o.frequency.value = freq;
            g.gain.setValueAtTime(0.85, t);
            g.gain.exponentialRampToValueAtTime(0.001, t + dur / 1000 * 0.88);
            o.connect(g); g.connect(master);
            o.start(t); o.stop(t + dur / 1000);
        }
        t += dur / 1000;
    });
    const totalMs = notes.reduce((a, [, d]) => a + d, 0) + 700;
    setTimeout(() => { try { master.disconnect(); } catch(e) {} }, totalMs);
}

// ─── Title Screen BGM ────────────────────────────────────────────────────────
// Trademark 8-bit corporate march — C major, satirically upbeat
const TITLE_NOTES = [
    [523,140],[659,140],[784,140],[1047,280],[0,70],
    [784,140],[698,140],[659,280],[0,70],
    [523,140],[587,140],[698,140],[784,140],[698,280],[0,70],
    [659,140],[523,140],[494,140],[440,280],[0,140],
    [392,140],[440,140],[523,140],[659,280],[0,70],
    [784,140],[659,140],[523,280],[0,140],
    [587,140],[698,140],[784,140],[880,280],[0,70],
    [784,140],[698,140],[659,140],[523,420],[0,210],
];
let titleBGM = { timerId: null, masterGain: null, idx: 0 };

function startTitleBGM() {
    if (!audioCtx || titleBGM.masterGain) return;
    const master = audioCtx.createGain();
    master.gain.setValueAtTime(0, audioCtx.currentTime);
    master.gain.linearRampToValueAtTime(0.075, audioCtx.currentTime + 1.8);
    master.connect(audioCtx.destination);
    titleBGM.masterGain = master;
    titleBGM.idx = 0;

    function fireNote() {
        if (!titleBGM.masterGain) return;
        const [freq, dur] = TITLE_NOTES[titleBGM.idx++ % TITLE_NOTES.length];
        if (freq > 0 && audioCtx) {
            try {
                const o = audioCtx.createOscillator(), g = audioCtx.createGain();
                o.type = 'square'; o.frequency.value = freq;
                g.gain.setValueAtTime(0.6, audioCtx.currentTime);
                g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + dur / 1000 * 0.8);
                o.connect(g); g.connect(master);
                o.start(); o.stop(audioCtx.currentTime + dur / 1000);
            } catch(e) {}
        }
        titleBGM.timerId = setTimeout(fireNote, dur);
    }
    fireNote();
}

function stopTitleBGM() {
    clearTimeout(titleBGM.timerId);
    if (titleBGM.masterGain && audioCtx) {
        try { titleBGM.masterGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.35); } catch(e) {}
        setTimeout(() => { try { titleBGM.masterGain.disconnect(); } catch(e) {} titleBGM = { timerId: null, masterGain: null, idx: 0 }; }, 400);
    } else {
        titleBGM = { timerId: null, masterGain: null, idx: 0 };
    }
}

// ─── Endings ──────────────────────────────────────────────────────────────────
const VICTORY_ENDINGS = new Set(['true_winner', 'victory_screen', 'meta_escape']);
const BAD_ENDINGS     = new Set(['crash', 'rogue_export', 'martyr_office', 'ppt_promotion', 'rage_quit', 'martyr']);
const ALL_ENDINGS     = new Set([...VICTORY_ENDINGS, ...BAD_ENDINGS]);

// ─── HUD Tooltips ─────────────────────────────────────────────────────────────
let hasShownTooltips = false;

function showHUDTooltips() {
    if (hasShownTooltips) return;
    hasShownTooltips = true;
    [
        { id: 'wrap-quality',  text: 'Your work quality' },
        { id: 'wrap-patience', text: 'Your last nerve'   },
    ].forEach(({ id, text }) => {
        const tip = document.createElement('div');
        tip.className = 'hud-tooltip';
        tip.innerText = text;
        document.getElementById(id).appendChild(tip);
        setTimeout(() => tip.parentNode && tip.parentNode.removeChild(tip), 3700);
    });
}

// ─── Core ─────────────────────────────────────────────────────────────────────
function startGame() {
    document.getElementById('title-screen').style.display = 'none';
    stopTitleBGM();
    initAudio();
    resetState();
    loadNode("start");
    showHUDTooltips();
}

function resetState() {
    clearInterval(gameState.typeInterval);
    stopTypingMelody(false);
    gameState.isTyping     = false;
    gameState.minutes      = 960;
    gameState.quality      = 100;
    gameState.patience     = 50;
    gameState.previousNode = null;
    uiEndingCard.style.display = 'none';
    uiEndingCard.innerHTML     = '';
    uiGameCont.classList.remove('ending-victory', 'ending-bad');
    stopBGM();
    resetSceneZoom();
    updateHUD();
}

function formatTime(totalMins) {
    let h = Math.floor(totalMins / 60);
    let m = totalMins % 60;
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return `${h}:${m < 10 ? '0' + m : m} ${ampm}`;
}

function updateHUD() {
    uiClock.innerText = formatTime(gameState.minutes);
    const qPct = Math.max(0, Math.min(100, gameState.quality));
    const pPct = Math.max(0, Math.min(100, gameState.patience));
    uiQuality.style.width  = qPct + '%';
    uiPatience.style.width = pPct + '%';
    uiQuality.classList.toggle('bar-warning', qPct < 40 && qPct >= 20);
    uiQuality.classList.toggle('bar-danger',  qPct < 20);
    uiPatience.classList.toggle('bar-warning', pPct < 30 && pPct >= 15);
    uiPatience.classList.toggle('bar-danger',  pPct < 15);
    const timeLeft = 1110 - gameState.minutes;
    uiClock.classList.toggle('clock-warning', timeLeft < 90 && timeLeft >= 40);
    uiClock.classList.toggle('clock-danger',  timeLeft < 40);
}

function spawnFloatingText(elementId, text, color) {
    const anchor  = document.getElementById(elementId);
    const floater = document.createElement('div');
    floater.className   = 'floating-text';
    floater.innerText   = text;
    floater.style.color = color;
    floater.style[elementId === 'clock-display' ? 'left' : 'right'] = '0';
    floater.style.top = elementId === 'clock-display' ? '10px' : '-5px';
    anchor.appendChild(floater);
    setTimeout(() => anchor.contains(floater) && anchor.removeChild(floater), 1200);
}

// ─── Scene Transition ─────────────────────────────────────────────────────────
let sceneTransitioning = false;

function transitionScene(newUrl, skipAnim) {
    resetSceneZoom();
    if (skipAnim || !uiSceneImage.style.backgroundImage) {
        uiSceneImage.style.backgroundImage = `url('${newUrl}')`;
        return;
    }
    sceneTransitioning = true;
    uiSceneOut.style.backgroundImage = uiSceneImage.style.backgroundImage;
    uiSceneOut.style.transform = '';
    uiSceneImage.style.backgroundImage = `url('${newUrl}')`;

    requestAnimationFrame(() => {
        uiSceneOut.classList.add('slide-out');
        uiSceneImage.classList.add('slide-in');
    });

    setTimeout(() => {
        uiSceneOut.classList.remove('slide-out');
        uiSceneImage.classList.remove('slide-in');
        uiSceneOut.style.backgroundImage = '';
        sceneTransitioning = false;
    }, 540);
}

// ─── Scene loading ─────────────────────────────────────────────────────────────
function loadNode(nodeId) {
    const node = storyData[nodeId];
    if (!node) { console.error('Missing story node:', nodeId); return; }
    gameState.currentNode = nodeId;

    uiTrap.style.display = 'none';
    clearTimeout(gameState.trapTimeout);
    uiLoadingBar.classList.remove('active');
    uiLoadingFill.style.animation = 'none';
    uiTapHint.classList.remove('visible');
    uiEndingCard.style.display = 'none';
    uiEndingCard.innerHTML = '';
    uiChoices.innerHTML = '';
    uiText.innerHTML = '';

    uiGameCont.classList.remove('ending-victory', 'ending-bad');
    if (VICTORY_ENDINGS.has(nodeId)) {
        uiGameCont.classList.add('ending-victory');
        spawnEndingEffect('victory');
        playEndingJingle('victory');
    } else if (BAD_ENDINGS.has(nodeId)) {
        uiGameCont.classList.add('ending-bad');
        spawnEndingEffect('bad');
        playEndingJingle('bad');
    }

    // Comic slide transition
    transitionScene(node.image);

    // BGM
    startBGM(SCENE_MOODS[nodeId] || 'office');

    // Speaker name
    uiName.innerText = node.speaker;
    uiName.style.backgroundColor = node.color;
    uiName.style.color = node.textColor;
    uiName.style.transform = 'rotate(-3deg) scale(1.1)';
    setTimeout(() => { uiName.style.transform = 'rotate(-3deg) scale(1)'; }, 200);

    if (node.isTrap) {
        uiLoadingBar.classList.add('active');
        void uiLoadingFill.offsetWidth;
        uiLoadingFill.style.animation = 'loadProgress 4s ease-out forwards';
        uiTrap.style.display = 'block';
        gameState.trapTimeout = setTimeout(() => {
            uiTrap.style.display = 'none';
            uiLoadingBar.classList.remove('active');
            loadNode("upload");
        }, 4000);
    }

    typewriterEffect(node.text, node.choices);
}

function spawnEndingEffect(type) {
    const el = document.createElement('div');
    el.className = type === 'victory' ? 'victory-flash' : 'glitch-flash';
    uiGameCont.appendChild(el);
    setTimeout(() => el.parentNode && el.parentNode.removeChild(el), 900);
}

// ─── Dialogue ─────────────────────────────────────────────────────────────────
function typewriterEffect(text, choices) {
    clearInterval(gameState.typeInterval);
    gameState.isTyping = true;
    let i = 0;

    if (choices && choices.length > 0) uiTapHint.classList.add('visible');

    startTypingMelody();

    gameState.typeInterval = setInterval(() => {
        uiText.innerHTML = text.substring(0, i + 1) + '<span class="cursor"></span>';
        i++;
        if (i >= text.length) {
            clearInterval(gameState.typeInterval);
            uiText.innerHTML = text;
            gameState.isTyping = false;
            stopTypingMelody();
            renderChoices(choices);
        }
    }, 26);
}

function advanceDialogue() {
    if (gameState.isTyping) {
        clearInterval(gameState.typeInterval);
        const node = storyData[gameState.currentNode];
        uiText.innerHTML = node.text;
        gameState.isTyping = false;
        uiTapHint.classList.remove('visible');
        stopTypingMelody();
        renderChoices(node.choices);
    }
}

function triggerTrap() {
    clearTimeout(gameState.trapTimeout);
    uiTrap.style.display = 'none';
    uiLoadingBar.classList.remove('active');
    loadNode("crash");
}

// ─── Choices ──────────────────────────────────────────────────────────────────
function renderChoices(choices) {
    if (!choices || choices.length === 0) return;
    uiTapHint.classList.remove('visible');

    if (ALL_ENDINGS.has(gameState.currentNode)) showEndingCard();
    setTimeout(() => playSound('pop'), 80);

    choices.forEach((choice, index) => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.style.animationDelay = `${index * 0.08}s`;

        const textSpan = document.createElement('span');
        textSpan.className = 'choice-text';
        textSpan.innerText = choice.text;
        btn.appendChild(textSpan);

        const costs = [];
        if (choice.timeCost)     costs.push({ label: `+${choice.timeCost}m`, cls: 'cost-time' });
        if (choice.qualityCost)  costs.push({ label: `${choice.qualityCost > 0 ? '+' : ''}${choice.qualityCost} quality`, cls: choice.qualityCost > 0 ? 'cost-good' : 'cost-bad' });
        if (choice.patienceCost) costs.push({ label: `${choice.patienceCost > 0 ? '+' : ''}${choice.patienceCost} patience`, cls: choice.patienceCost > 0 ? 'cost-good' : 'cost-bad' });

        if (costs.length > 0) {
            const row = document.createElement('div');
            row.className = 'cost-badges';
            costs.forEach(({ label, cls }) => {
                const badge = document.createElement('span');
                badge.className = `cost-badge ${cls}`;
                badge.innerText = label;
                row.appendChild(badge);
            });
            btn.appendChild(row);
        }

        btn.addEventListener('pointerdown', () => btn.classList.add('clicked'));
        btn.addEventListener('pointerup', (e) => {
            e.stopPropagation();
            const hasDamage = (choice.qualityCost < 0 || choice.patienceCost < 0);
            const hasGain   = (choice.qualityCost > 0 || choice.patienceCost > 0);
            if (hasDamage)    playSound('damage');
            else if (hasGain) playSound('success');
            else              playSound('pop');

            if (choice.timeCost)
                spawnFloatingText('clock-display', `+${choice.timeCost}m`, 'var(--system-alert)');
            if (choice.qualityCost)
                spawnFloatingText('wrap-quality', `${choice.qualityCost > 0 ? '+' : ''}${choice.qualityCost}`, choice.qualityCost > 0 ? 'var(--success-green)' : 'var(--system-alert)');
            if (choice.patienceCost)
                spawnFloatingText('wrap-patience', `${choice.patienceCost > 0 ? '+' : ''}${choice.patienceCost}`, choice.patienceCost > 0 ? 'var(--success-green)' : 'var(--system-alert)');

            setTimeout(() => handleChoice(choice), 340);
        });

        uiChoices.appendChild(btn);
    });
}

function showEndingCard() {
    const isVictory = VICTORY_ENDINGS.has(gameState.currentNode);
    const q = Math.max(0, gameState.quality);
    const p = Math.max(0, gameState.patience);
    uiEndingCard.innerHTML = `
        <div class="ending-stats ${isVictory ? 'victory-stats' : 'bad-stats'}">
            <div class="ending-stats-title">SHIFT REPORT</div>
            <div class="ending-stats-row"><span>⏱ Clocked out</span><span>${formatTime(gameState.minutes)}</span></div>
            <div class="ending-stats-row"><span>★ Quality</span><span>${q}/100</span></div>
            <div class="ending-stats-row"><span>♥ Patience</span><span>${p}/50</span></div>
        </div>`;
    uiEndingCard.style.display = 'block';
}

// ─── Choice resolution ────────────────────────────────────────────────────────
function handleChoice(choice) {
    if (choice.timeCost)     gameState.minutes  += choice.timeCost;
    if (choice.qualityCost)  gameState.quality  += choice.qualityCost;
    if (choice.patienceCost) gameState.patience += choice.patienceCost;
    updateHUD();

    // Overflow endings fire only when NOT already at an ending node
    if (!ALL_ENDINGS.has(gameState.currentNode)) {
        if (gameState.patience <= 0)   { loadNode("rage_quit"); return; }
        if (gameState.minutes >= 1110) { loadNode("martyr");    return; }
    }

    if (choice.action === "restart") {
        startGame();
    } else if (choice.action === "return_from_cutaway") {
        loadNode(gameState.previousNode);
    } else if (choice.target === "cutaway_kids") {
        gameState.previousNode = gameState.currentNode;
        loadNode("cutaway_kids");
    } else {
        loadNode(choice.target);
    }
}

// ─── Scene Zoom (double-tap / drag) ──────────────────────────────────────────
const zoom = { scale: 1, x: 0, y: 0, startX: 0, startY: 0, lastTap: 0, dragging: false };

function initSceneZoom() {
    const el = uiSceneImage;
    if (!el) return;
    el.addEventListener('touchstart', onZoomStart, { passive: false });
    el.addEventListener('touchmove',  onZoomMove,  { passive: false });
    el.addEventListener('touchend',   onZoomEnd,   { passive: false });
}

function onZoomStart(e) {
    if (e.touches.length !== 1) return;
    const t = e.touches[0], now = Date.now();
    if (now - zoom.lastTap < 280) { e.preventDefault(); toggleZoom(t.clientX, t.clientY); }
    zoom.lastTap = now;
    zoom.startX = t.clientX - zoom.x;
    zoom.startY = t.clientY - zoom.y;
    zoom.dragging = true;
}
function onZoomMove(e) {
    if (!zoom.dragging || zoom.scale <= 1 || e.touches.length !== 1) return;
    e.preventDefault();
    zoom.x = e.touches[0].clientX - zoom.startX;
    zoom.y = e.touches[0].clientY - zoom.startY;
    applyZoom(false);
}
function onZoomEnd() {
    zoom.dragging = false;
    if (zoom.scale > 1) clampZoom();
}
function toggleZoom(cx, cy) {
    if (sceneTransitioning) return;
    if (zoom.scale > 1) { zoom.scale = 1; zoom.x = 0; zoom.y = 0; }
    else {
        zoom.scale = 1.85;
        const rect = uiSceneImage.getBoundingClientRect();
        zoom.x = -(cx - rect.left - rect.width  / 2) * (zoom.scale - 1);
        zoom.y = -(cy - rect.top  - rect.height / 2) * (zoom.scale - 1);
    }
    applyZoom(true); clampZoom();
}
function applyZoom(animate) {
    if (!uiSceneImage) return;
    uiSceneImage.style.transition = animate ? 'transform 0.28s ease' : 'none';
    uiSceneImage.style.transform  = `translate(${zoom.x}px,${zoom.y}px) scale(${zoom.scale})`;
}
function clampZoom() {
    if (zoom.scale <= 1) { zoom.x = 0; zoom.y = 0; applyZoom(true); return; }
    const rect = uiSceneImage.getBoundingClientRect();
    const maxX = rect.width  * (zoom.scale - 1) / 2;
    const maxY = rect.height * (zoom.scale - 1) / 2;
    zoom.x = Math.max(-maxX, Math.min(maxX, zoom.x));
    zoom.y = Math.max(-maxY, Math.min(maxY, zoom.y));
    applyZoom(true);
}
function resetSceneZoom() {
    zoom.scale = 1; zoom.x = 0; zoom.y = 0;
    if (uiSceneImage) { uiSceneImage.style.transition = 'none'; uiSceneImage.style.transform = ''; }
}

// ─── Title Screen ─────────────────────────────────────────────────────────────
// Title_Characters.png: 1024×693 → aspect 1.4776
// Logo.png: 822×509 → aspect 1.6150
const CHAR_ASPECT  = 1024 / 693;
const LOGO_ASPECT  = 822  / 509;
const PRIYA_HEAD_FRAC = (693 - 185) / 693; // 73.3% from bottom
const TARUN_HEAD_FRAC = (693 - 95)  / 693; // 86.3% from bottom

function positionTitleElements() {
    const screen = document.getElementById('title-screen');
    if (!screen) return;
    const cW = screen.clientWidth, cH = screen.clientHeight;

    // Character image height at 100% container width
    const imgH = cW / CHAR_ASPECT;

    // Logo rendered size (capped by CSS max-height clamp(140px, 28dvh, 260px))
    const logoW  = cW * 0.78;
    const logoNatH = logoW / LOGO_ASPECT;
    const logoCap  = Math.min(260, Math.max(140, cH * 0.28));
    const logoH  = Math.min(logoNatH, logoCap);
    const logoBottom = cH * 0.03 + logoH + 8;

    // ts-ui: center in space between logo bottom and character top
    const charTop  = cH - imgH;
    const midSpace = Math.max(0, charTop - logoBottom);
    const tsBottom = imgH + Math.max(8, midSpace * 0.38);

    const tsUi = screen.querySelector('.ts-ui');
    if (tsUi) { tsUi.style.bottom = tsBottom + 'px'; tsUi.style.top = 'auto'; }

    // Bubbles: at character head level (px from bottom of title-screen)
    const priyaBottom = imgH * PRIYA_HEAD_FRAC + 6;
    const tarunBottom = Math.min(imgH * TARUN_HEAD_FRAC + 6, cH - 90);

    const bp = document.getElementById('bubble-priya');
    const bt = document.getElementById('bubble-tarun');
    if (bp) { bp.style.bottom = priyaBottom + 'px'; bp.style.top = 'auto'; }
    if (bt) { bt.style.bottom = tarunBottom + 'px'; bt.style.top = 'auto'; }
}

let bubbleDismissTimeout = null;
let titleAudioInited = false;

const charQuotes = {
    priya: [
        "My SCORM package has been 'Publishing…' for 14 minutes. I am legally not allowed to feel things anymore.",
        "Storyline crashed. My auto-save is from Tuesday. I will not be taking questions.",
        "The SME wants 40 more slides. The module is about washing hands.",
        "I spent 3 hours on a branching scenario. They asked me to make it linear.",
        "Synthesia gave my AI avatar a British accent. The client is in Mumbai. This is fine.",
        "The LMS says SCORM 1.2 is supported. The LMS is lying.",
        "I have 6 layers of triggers on this slide and I am not okay.",
        "They said 'make it interactive.' I added a hover state. Done. Interactive.",
        "My Storyline file is 2.3 GB. It has 12 slides. I don't want to talk about it.",
        "The client wants a 3D avatar. My budget is zero. My patience is also zero.",
        "I just published to Review 360 for the 11th time today. Same feedback. 'Make it pop.'",
        "The learner will skip the audio anyway. I spent 4 hours scripting it. Wonderful.",
        "They approved the storyboard. They are now un-approving it. On a Friday.",
        "My Synthesia presenter blinked at the wrong time. Re-rendering. At 5 PM.",
        "Someone requested a knowledge check after every slide. There are 68 slides.",
        "'Can you just make it feel more… gamified?' I will not. I am going home.",
        "The completion trigger fires on slide 1. Nobody will ever know. Nobody.",
        "SCORM cloud says 'Completed.' The client says 'It's not tracking.' I have left my body.",
    ],
    tarun: [
        "Have you considered more synergy? Also 12 more slides. Also a 3D escape room. You're welcome, team!",
        "The learner needs to FEEL the content. Can we add a drum roll to the quiz reveal?",
        "Dr. Ravi feels the module lacks 'wow factor.' Can Synthesia do a backflip?",
        "What if every wrong answer triggered a sad trombone? Just spitballing. Write it down.",
        "I showed this to my 6-year-old. He didn't click Next. We need to fix the UX.",
        "Great work on the branching scenario! Now make it linear. But keep the branches. Both.",
        "Can we add a leaderboard? It's a compliance module about data privacy. Even better.",
        "The CEO watched 8 seconds of the Synthesia video. He said 'something feels off.' Reshoot.",
        "I sent your Storyline file to a vendor. They opened it in PowerPoint. Same difference, right?",
        "Dr. Ravi says the font is 'aggressive.' The font is Arial. It is 12pt.",
        "We need this to feel like Netflix. But also like LinkedIn. But make it fun. By Monday.",
        "What if we gamified the loading screen? It's sitting at 99% anyway, might as well.",
        "The client wants a Synthesia presenter who 'doesn't look AI.' I'll escalate that feedback.",
        "Can we get a voiceover? Yes. Budget? No. Can Priya just record it on her phone?",
        "I've aligned 14 stakeholders on the learning objective. It is now 6 objectives. Progress!",
        "The completion certificate needs to feel more premium. Add a gold border. And a wax seal.",
        "What if we just… made it a PDF? A very INTERACTIVE PDF? I'll put it in the deck.",
        "The module plays perfectly in Chrome. The client uses IE. This is an opportunity.",
    ]
};
const charQuoteIndex = { priya: 0, tarun: 0 };

function onTitleInteract() {
    if (titleAudioInited) return;
    titleAudioInited = true;
    initAudio();
    startTitleBGM();
}

function showCharBubble(char, event) {
    if (event) event.stopPropagation();
    onTitleInteract();
    hideCharBubbles();
    const bubble = document.getElementById(`bubble-${char}`);
    if (!bubble) return;
    const pool = charQuotes[char];
    if (pool) { bubble.textContent = pool[charQuoteIndex[char] % pool.length]; charQuoteIndex[char]++; }
    bubble.classList.add('visible');
    clearTimeout(bubbleDismissTimeout);
    bubbleDismissTimeout = setTimeout(hideCharBubbles, 4800);
    playSound('pop');
}

function hideCharBubbles() {
    document.querySelectorAll('.char-bubble').forEach(b => b.classList.remove('visible'));
    clearTimeout(bubbleDismissTimeout);
}

function initTitleScreen() {
    positionTitleElements();
    window.addEventListener('resize', positionTitleElements);

    const logoWrap = document.getElementById('ts-logo-wrap');
    if (logoWrap) {
        setTimeout(() => {
            logoWrap.classList.add('logo-slam');
            logoWrap.addEventListener('animationend', () => {
                logoWrap.classList.remove('logo-slam');
                logoWrap.classList.add('logo-float');
            }, { once: true });
        }, 250);
    }

    document.getElementById('title-screen')?.addEventListener('click', (e) => {
        if (!e.target.closest('.char-zone') && !e.target.closest('.char-bubble')) {
            hideCharBubbles();
        }
    });

    // Start audio + title BGM on first interaction with START SHIFT button
    document.querySelector('.ts-btn')?.addEventListener('pointerdown', onTitleInteract, { once: true });

    initSceneZoom();
}

window.addEventListener('load', initTitleScreen);
