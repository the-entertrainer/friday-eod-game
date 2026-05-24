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

// ─── Universal scaling ────────────────────────────────────────────────────────
function scaleGame() {
    const w = window.innerWidth, h = window.innerHeight;
    if (w > 500) {
        // Desktop/tablet: scale up to fill available space (never scale down)
        const scale = Math.max(1, Math.min(w / 450, h / 850));
        uiGameCont.style.transform = `scale(${scale})`;
    } else {
        uiGameCont.style.transform = '';
    }
}
scaleGame();
window.addEventListener('resize', scaleGame);

// ─── Drawer peek gesture (drag top of terminal down to peek at scene) ─────────
let _peekActive = false;
let _termBaseH  = 0; // cached terminal height for drag calculations
(function initDrawer() {
    const term = document.getElementById('terminal');
    let startY = 0, moved = false, dragging = false;
    term.addEventListener('touchstart', e => {
        const localY = e.touches[0].clientY - term.getBoundingClientRect().top;
        if (localY > 44) return;
        e.preventDefault(); // prevent pull-to-refresh during handle drag
        _termBaseH = term.offsetHeight;
        dragging = true; moved = false; startY = e.touches[0].clientY;
        term.style.transition = 'none';
    }, { passive: false }); // must be non-passive to allow preventDefault
    window.addEventListener('touchmove', e => {
        if (!dragging) return;
        e.preventDefault(); // prevent page scroll while dragging
        const dy = e.touches[0].clientY - startY;
        if (Math.abs(dy) > 6) moved = true;
        const peek = Math.max(0, Math.min(88, dy));
        term.style.transform = `translateY(${peek}px)`;
        // Expand scene image into the peeked gap so image center stays visible
        const newBot = Math.max(0, _termBaseH - peek);
        if (uiSceneImage) uiSceneImage.style.bottom = newBot + 'px';
        if (uiSceneOut)   uiSceneOut.style.bottom   = newBot + 'px';
    }, { passive: false });
    window.addEventListener('touchend', () => {
        if (!dragging) return;
        dragging = false;
        term.style.transition = '';
        term.style.transform = '';
        syncSceneImageBottom(); // restore bounds after drag
        if (moved) {
            _peekActive = true;
            setTimeout(() => _peekActive = false, 350);
            navigator.vibrate && navigator.vibrate(18);
        }
    });
})();

// ─── Audio ────────────────────────────────────────────────────────────────────
let audioCtx = null;
let _muted = false;

// Typewriter speed: normal / slow / fast (ms per char)
const _TW_SPEEDS   = [26, 45, 12];
const _TW_DISPLAY  = ['1×', '½×', '2×'];
const _TW_COLORS   = ['white', 'rgba(255,255,255,0.55)', '#00e5ff'];
let   _twSpeedIdx  = parseInt(localStorage.getItem('twSpeedIdx') || '0') % _TW_SPEEDS.length;

function initAudio() {
    if (audioCtx) return;
    try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }
    catch(e) { audioCtx = null; }
}

// One-shot sound effects
function playSound(type) {
    if (_muted || !audioCtx) return;
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

// (typing sound now handled by startTypingSound / stopTypingSound above)

// ─── Contextual pop effects ───────────────────────────────────────────────────
const _CTX_IMPACTS = [
    { re: /\bCRASH\b/i,           label: 'CRASH!',  cls: 'ctx-bad' },
    { re: /\bBSOD\b/i,             label: 'BSOD!',   cls: 'ctx-bad' },
    { re: /\bSLAM\b/i,             label: 'SLAM!',   cls: 'ctx-bad' },
    { re: /not responding/i,       label: 'FROZEN!', cls: 'ctx-bad' },
    { re: /\bfrozen?\b/i,          label: 'FROZEN!', cls: 'ctx-bad' },
    { re: /\bERROR\b/,             label: 'ERROR!',  cls: 'ctx-bad' },
    { re: /\byikes\b/i,            label: 'YIKES!',  cls: 'ctx-bad' },
    { re: /\boh no\b/i,            label: 'OH NO!',  cls: 'ctx-bad' },
    { re: /WHAT\?!/,               label: 'WHAT?!',  cls: 'ctx-q'   },
];
function showContextualEffect(text) {
    let label = null, cls = null;
    for (const p of _CTX_IMPACTS) {
        if (p.re.test(text)) { label = p.label; cls = p.cls; break; }
    }
    if (!label) {
        if (/!{2,}/.test(text))  { label = '!!';  cls = 'ctx-exclaim'; }
        else if (/\?!/.test(text)){ label = '?!';  cls = 'ctx-q';      }
    }
    if (!label) return;
    const el = document.createElement('div');
    el.className = `context-pop ${cls}`;
    el.textContent = label;
    el.style.left = (12 + Math.random() * 56) + '%';
    const termH = document.getElementById('terminal')?.offsetHeight || 280;
    const safeTopMax = ((window.innerHeight - termH - 60) / window.innerHeight) * 100;
    el.style.top  = (8 + Math.random() * Math.max(0, safeTopMax - 8)) + '%';
    uiViewport.appendChild(el);
    setTimeout(() => el.parentNode && el.parentNode.removeChild(el), 1100);
}

// ─── Game BGM System ──────────────────────────────────────────────────────────
const SCENE_MOODS = {
    start: 'office', setup: 'office', upload: 'office',
    ambush: 'tense', meta_moment: 'tense', diplomatic: 'tense',
    aggressive: 'tense', technical_pushback: 'tense',
    compromise: 'defeated', loading_bar: 'suspense',
    crash: 'horror', meta_escape: 'matrix', rogue_export: 'action',
    martyr_office: 'defeated', ppt_promotion: 'office',
    true_winner: 'victory', victory_screen: 'victory',
    rage_quit: 'action', martyr: 'defeated'
};

// ─── File-based Scene BGM ─────────────────────────────────────────────────────
const _MOOD_TO_FILE = {
    office:   'assets/audio/Dialogues Theme.mp3',
    defeated: 'assets/audio/Dialogues Theme.mp3',
    tense:    'assets/audio/Anxious.mp3',
    horror:   'assets/audio/Anxious.mp3',
    suspense: 'assets/audio/Anxious.mp3',
    action:   'assets/audio/Anxious.mp3',
    victory:  'assets/audio/Win.mp3',
    matrix:   'assets/audio/Win.mp3',
};
let _sceneBGMAudio   = null;
let _sceneBGMCurrent = null;

function playSceneBGM(mood) {
    const file = _MOOD_TO_FILE[mood];
    if (!file) return;
    if (_sceneBGMCurrent === file && _sceneBGMAudio && !_sceneBGMAudio.paused) return;
    stopSceneBGM();
    _sceneBGMCurrent = file;
    _sceneBGMAudio = new Audio(file);
    _sceneBGMAudio.loop   = true;
    _sceneBGMAudio.volume = 0.35;
    _sceneBGMAudio.muted  = _muted;
    _sceneBGMAudio.play().catch(() => {});
}

function stopSceneBGM() {
    try { if (_sceneBGMAudio) { _sceneBGMAudio.pause(); _sceneBGMAudio.currentTime = 0; } } catch(e) {}
    _sceneBGMAudio   = null;
    _sceneBGMCurrent = null;
}

// ─── Transition sound (plays once on scene switch) ────────────────────────────
let _transitionAudio = null;
function playTransitionSound() {
    try {
        if (!_transitionAudio) {
            _transitionAudio = new Audio('assets/audio/Transition.mp3');
            _transitionAudio.volume = 0.6;
        }
        _transitionAudio.muted       = _muted;
        _transitionAudio.currentTime = 0;
        _transitionAudio.play().catch(() => {});
    } catch(e) {}
}

// ─── Ending Jingles ───────────────────────────────────────────────────────────
// Scheduled precisely with Web Audio clock (more accurate than setTimeouts)
const VICTORY_JINGLE = [[523,80],[659,80],[784,80],[1047,320],[0,60],[784,100],[880,100],[1047,400],[0,80],[1047,180],[1175,180],[1319,440]];
const BAD_JINGLE     = [[440,180],[415,180],[392,180],[370,180],[349,360],[0,80],[330,180],[311,180],[294,600]];

function playEndingJingle(type) {
    if (_muted || !audioCtx) return;
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
let _themeAudio = null;
function startTitleBGM() {
    try {
        if (!_themeAudio) {
            _themeAudio = new Audio('assets/audio/Theme.wav');
            _themeAudio.loop   = true;
            _themeAudio.volume = 0.45;
        }
        _themeAudio.muted       = _muted;
        _themeAudio.currentTime = 0;
        _themeAudio.play().catch(() => {});
    } catch(e) {}
}
function stopTitleBGM() {
    try { if (_themeAudio) { _themeAudio.pause(); _themeAudio.currentTime = 0; } } catch(e) {}
}

// ─── Typing sound ────────────────────────────────────────────────────────────
let _typingAudio = null;
function startTypingSound() {
    try {
        if (!_typingAudio) {
            _typingAudio = new Audio('assets/audio/Typing.mp3');
            _typingAudio.loop   = true;
            _typingAudio.volume = 0.28;
        }
        _typingAudio.muted       = _muted;
        _typingAudio.currentTime = 0;
        _typingAudio.play().catch(() => {});
    } catch(e) {}
}
function stopTypingSound() {
    try { if (_typingAudio && !_typingAudio.paused) { _typingAudio.pause(); _typingAudio.currentTime = 0; } } catch(e) {}
}

// ─── Mute toggle ─────────────────────────────────────────────────────────────
function toggleMute() {
    _muted = !_muted;
    const wave = document.getElementById('spk-wave');
    const x1   = document.getElementById('spk-x1');
    const x2   = document.getElementById('spk-x2');
    const body = document.getElementById('spk-body');
    if (wave) wave.style.display = _muted ? 'none'  : '';
    if (x1)   x1.style.display   = _muted ? ''      : 'none';
    if (x2)   x2.style.display   = _muted ? ''      : 'none';
    if (body) body.setAttribute('fill', _muted ? 'rgba(255,71,87,0.9)' : 'white');
    document.getElementById('mute-btn').classList.toggle('muted', _muted);
    [_themeAudio, _sceneBGMAudio, _typingAudio, _transitionAudio].forEach(a => {
        if (a) a.muted = _muted;
    });
}

// ─── Typewriter speed cycle ───────────────────────────────────────────────────
function cycleTypingSpeed() {
    _twSpeedIdx = (_twSpeedIdx + 1) % _TW_SPEEDS.length;
    localStorage.setItem('twSpeedIdx', _twSpeedIdx);
    const lbl = document.getElementById('speed-label');
    if (lbl) {
        lbl.textContent = _TW_DISPLAY[_twSpeedIdx];
        lbl.setAttribute('fill', _TW_COLORS[_twSpeedIdx]);
    }
}

// ─── Analog clock ────────────────────────────────────────────────────────────
let _clkMinAccum = 0;

function updateClockHands() {
    const h = Math.floor(gameState.minutes / 60) % 12;
    const m = gameState.minutes % 60;
    const hourDeg   = h * 30 + m * 0.5;
    const newMin    = (gameState.minutes - 960) * 6; // cumulative from 4 PM start
    const ch = document.getElementById('clk-h');
    const cm = document.getElementById('clk-m');
    // On game reset (time jumped back), snap hands instantly
    if (newMin < _clkMinAccum - 180) {
        if (ch) { ch.style.transition = 'none'; }
        if (cm) { cm.style.transition = 'none'; }
        requestAnimationFrame(() => { if (ch) ch.style.transition = ''; if (cm) cm.style.transition = ''; });
    }
    _clkMinAccum = newMin;
    if (ch) ch.style.transform = `rotate(${hourDeg}deg)`;
    if (cm) cm.style.transform = `rotate(${_clkMinAccum}deg)`;
}

// ─── Scene image bounds — tracks terminal height so center stays visible ──────
function syncSceneImageBottom() {
    const termEl = document.getElementById('terminal');
    if (!termEl) return;
    const h = termEl.offsetHeight;
    _termBaseH = h;
    if (uiSceneImage)  uiSceneImage.style.bottom  = h + 'px';
    if (uiSceneOut)    uiSceneOut.style.bottom     = h + 'px';
}

// ─── Endings ──────────────────────────────────────────────────────────────────
const VICTORY_ENDINGS = new Set(['victory_screen', 'meta_escape']);
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
function showTitleScreen() {
    clearInterval(gameState.typeInterval);
    clearTrapTimers();
    stopTypingSound();
    stopSceneBGM();
    gameState.isTyping = false;
    const ts = document.getElementById('title-screen');
    if (ts) ts.style.display = '';
    startTitleBGM();
    // Replay the logo slam animation
    const logoWrap = document.getElementById('ts-logo-wrap');
    if (logoWrap) {
        logoWrap.className = 'ts-logo-wrap';
        void logoWrap.offsetWidth; // force reflow so removing logo-float resets animation state
        setTimeout(() => {
            logoWrap.classList.add('logo-slam');
            logoWrap.addEventListener('animationend', () => {
                logoWrap.classList.remove('logo-slam');
                logoWrap.classList.add('logo-float');
            }, { once: true });
        }, 200);
    }
    priyaTapCount = 0;
    priyaLastTapTime = 0;
    charQuoteIndex.priya = 0;
    charQuoteIndex.tarun = 0;
}

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
    clearTrapTimers();
    stopTypingSound();
    gameState.isTyping     = false;
    gameState.minutes      = 960;
    _clkMinAccum           = 0;
    _nodeLoading           = false;
    gameState.quality      = 100;
    gameState.patience     = 50;
    gameState.previousNode = null;
    uiEndingCard.style.display = 'none';
    uiEndingCard.innerHTML     = '';
    uiGameCont.classList.remove('ending-victory', 'ending-bad');
    stopSceneBGM();
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
    updateClockHands();
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
    playTransitionSound();
    sceneTransitioning = true;
    uiSceneOut.style.backgroundImage = uiSceneImage.style.backgroundImage;
    uiSceneOut.style.transform = '';
    uiSceneImage.style.backgroundImage = `url('${newUrl}')`;

    requestAnimationFrame(() => {
        uiSceneOut.classList.add('film-out');
        uiSceneImage.classList.add('film-in');
    });

    setTimeout(() => {
        uiSceneOut.classList.remove('film-out');
        uiSceneImage.classList.remove('film-in');
        uiSceneOut.style.backgroundImage = '';
        sceneTransitioning = false;
    }, 570);
}

function preloadThenTransition(url, skipAnim) {
    uiSceneImage.classList.add('img-loading');
    const tmp = new Image();
    const failsafe = setTimeout(() => {
        uiSceneImage.classList.remove('img-loading');
        transitionScene(url, skipAnim);
    }, 5000);
    tmp.onload = tmp.onerror = () => {
        clearTimeout(failsafe);
        uiSceneImage.classList.remove('img-loading');
        transitionScene(url, skipAnim);
    };
    tmp.src = url;
}

// ─── Scene loading ─────────────────────────────────────────────────────────────
let _nodeLoading = false;

function loadNode(nodeId) {
    if (_nodeLoading) return;
    _nodeLoading = true;
    setTimeout(() => { _nodeLoading = false; }, 400);

    resetSceneZoom();
    stopTypingSound();

    const node = storyData[nodeId];
    if (!node) { console.error('Missing story node:', nodeId); return; }
    gameState.currentNode = nodeId;
    if (node.forceTime !== undefined) { gameState.minutes = node.forceTime; updateClockHands(); }

    document.getElementById('terminal').classList.remove('with-choices');
    uiTrap.style.display = 'none';
    clearTrapTimers();
    uiLoadingBar.classList.remove('active');
    uiLoadingFill.style.width = '0%';
    uiLoadingFill.style.transition = 'none';
    uiLoadingFill.style.animation = 'none';
    const uiLoadingLabel = document.getElementById('loading-label');
    if (uiLoadingLabel) { uiLoadingLabel.textContent = 'PUBLISHING... 99%'; uiLoadingLabel.style.color = ''; uiLoadingLabel.style.animationDuration = ''; }
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
        localStorage.setItem('hasPlayed', '1');
        if (node.endingTitle) showEndingTitle(node.endingTitle, node.endingTitleType || 'victory');
    } else if (BAD_ENDINGS.has(nodeId)) {
        uiGameCont.classList.add('ending-bad');
        spawnEndingEffect('bad');
        playEndingJingle('bad');
        localStorage.setItem('hasPlayed', '1');
        if (node.endingTitle) showEndingTitle(node.endingTitle, node.endingTitleType || 'bad');
    }

    // Scene image (preload then animate)
    preloadThenTransition(node.image);

    // BGM
    stopTitleBGM();
    playSceneBGM(SCENE_MOODS[nodeId] || 'office');

    // Speaker name
    uiName.innerText = node.speaker;
    uiName.style.backgroundColor = node.color;
    uiName.style.color = node.textColor;
    uiName.style.transform = 'rotate(-3deg) scale(1.1)';
    setTimeout(() => { uiName.style.transform = 'rotate(-3deg) scale(1)'; }, 200);

    if (node.isTrap) {
        runTrapSequence();
    }

    typewriterEffect(node.text, node.choices);
}

function spawnEndingEffect(type) {
    const el = document.createElement('div');
    el.className = type === 'victory' ? 'victory-flash' : 'glitch-flash';
    uiGameCont.appendChild(el);
    setTimeout(() => el.parentNode && el.parentNode.removeChild(el), 900);
}

function showEndingTitle(title, type) {
    const existing = document.getElementById('_etc_overlay');
    if (existing) existing.remove();

    const palette = { victory: '#00ffaa', bad: '#ff4757', secret: '#00e5ff' };
    const color   = palette[type] || palette.bad;
    const cat     = type === 'secret' ? 'SECRET ENDING' : type === 'victory' ? 'TRUE ENDING' : 'ENDING';

    // Outer overlay — dark bg + dot pattern + perspective container
    const ov = document.createElement('div');
    ov.id = '_etc_overlay';
    Object.assign(ov.style, {
        position: 'absolute', inset: '0', zIndex: '75', pointerEvents: 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        perspective: '900px',
        backgroundImage: `radial-gradient(${color}28 1.5px, transparent 1.5px)`,
        backgroundSize: '14px 14px',
        backgroundColor: 'rgba(0,0,0,0)',
        opacity: '0',
    });

    // 3D card panel
    const card = document.createElement('div');
    Object.assign(card.style, {
        textAlign: 'center', padding: '22px 34px',
        borderTop: `5px solid ${color}`, borderBottom: `5px solid ${color}`,
        background: 'rgba(8,8,18,0.97)',
        boxShadow: `0 0 50px ${color}44, 10px 10px 0 #000`,
        maxWidth: '88%', transformStyle: 'preserve-3d',
        transform: 'rotateY(-90deg) scale(0.6)',
    });

    const catEl = document.createElement('div');
    Object.assign(catEl.style, {
        fontFamily: "'Outfit',sans-serif", fontSize: '0.65rem',
        letterSpacing: '6px', fontWeight: '700', textTransform: 'uppercase',
        color: color, opacity: '0.75', marginBottom: '10px',
    });
    catEl.textContent = cat;

    const nameEl = document.createElement('div');
    Object.assign(nameEl.style, {
        fontFamily: "'Outfit',sans-serif",
        fontSize: 'clamp(1.9rem, 9vw, 3rem)', fontWeight: '900',
        textTransform: 'uppercase', lineHeight: '1.08',
        color: color, WebkitTextStroke: '2px #000',
        textShadow: `6px 6px 0 #000, -1px -1px 0 #000`,
    });
    nameEl.textContent = title;

    card.append(catEl, nameEl);
    ov.appendChild(card);
    uiGameCont.appendChild(ov);

    // Pure-JS rAF animation — no CSS keyframes
    const FLIP_IN  = 360;
    const BOUNCE   = 240;
    const HOLD     = 1900;
    const FLIP_OUT = 300;
    const t0 = performance.now();

    const eOut = p => 1 - Math.pow(1 - p, 3);
    const eIn  = p => p * p * p;

    (function frame(now) {
        const t = now - t0;
        if (t < FLIP_IN) {
            const p = eOut(t / FLIP_IN);
            ov.style.opacity   = p;
            card.style.transform = `rotateY(${-90 + 90 * p}deg) scale(${0.6 + 0.4 * p})`;
        } else if (t < FLIP_IN + BOUNCE) {
            const p = (t - FLIP_IN) / BOUNCE;
            const overshoot = Math.sin(p * Math.PI) * 0.09;
            ov.style.opacity   = '1';
            card.style.transform = `rotateY(0deg) scale(${1 + overshoot})`;
        } else if (t < FLIP_IN + BOUNCE + HOLD) {
            card.style.transform = 'rotateY(0deg) scale(1)';
        } else if (t < FLIP_IN + BOUNCE + HOLD + FLIP_OUT) {
            const p = eIn((t - FLIP_IN - BOUNCE - HOLD) / FLIP_OUT);
            ov.style.opacity   = 1 - p;
            card.style.transform = `rotateY(${90 * p}deg) scale(${1 - p * 0.35})`;
        } else {
            ov.remove(); return;
        }
        requestAnimationFrame(frame);
    })(performance.now());
}

// ─── Dialogue ─────────────────────────────────────────────────────────────────
function typewriterEffect(text, choices) {
    clearInterval(gameState.typeInterval);
    gameState.isTyping = true;
    let i = 0;

    if (choices && choices.length > 0) uiTapHint.classList.add('visible');

    showContextualEffect(text);
    startTypingSound();

    gameState.typeInterval = setInterval(() => {
        uiText.innerHTML = text.substring(0, i + 1) + '<span class="cursor"></span>';
        i++;
        if (i >= text.length) {
            clearInterval(gameState.typeInterval);
            uiText.innerHTML = text;
            gameState.isTyping = false;
            stopTypingSound();
            renderChoices(choices);
        }
    }, _TW_SPEEDS[_twSpeedIdx]);
}

function advanceDialogue() {
    if (_peekActive) return; // swallow tap after a drawer drag
    if (gameState.isTyping) {
        clearInterval(gameState.typeInterval);
        stopTypingSound();
        const node = storyData[gameState.currentNode];
        uiText.innerHTML = node.text;
        gameState.isTyping = false;
        uiTapHint.classList.remove('visible');
        renderChoices(node.choices);
    }
}

function triggerTrap() {
    clearTrapTimers();
    uiTrap.style.display = 'none';
    uiLoadingBar.classList.remove('active');
    loadNode("crash");
}

// ─── Loading bar trap sequence (15-second tension build) ──────────────────────
let _trapController = null;

function clearTrapTimers() {
    if (_trapController) {
        _trapController.timers.forEach(id => clearTimeout(id));
        if (_trapController.interval) clearInterval(_trapController.interval);
        _trapController = null;
    }
    clearTimeout(gameState.trapTimeout);
}

function runTrapSequence() {
    clearTrapTimers();
    _trapController = { timers: [], interval: null };
    uiLoadingBar.classList.add('active');
    uiTrap.style.display = 'block';

    const label = document.getElementById('loading-label');

    // Phase 1: crawl 0 → 92% over 5.2s
    uiLoadingFill.style.transition = 'none';
    uiLoadingFill.style.width = '0%';
    void uiLoadingFill.offsetWidth;
    uiLoadingFill.style.transition = 'width 5.2s cubic-bezier(0.08, 0.5, 0.25, 0.98)';
    uiLoadingFill.style.width = '92%';
    label.textContent = 'PUBLISHING... 0%';

    let p1 = 0;
    const lTimer1 = setInterval(() => {
        p1 = Math.min(91, p1 + Math.floor(Math.random() * 7 + 2));
        label.textContent = `PUBLISHING... ${p1}%`;
    }, 550);
    _trapController.interval = lTimer1;

    // Phase 2: NOT RESPONDING — crash scare at 5.3s
    _trapController.timers.push(setTimeout(() => {
        clearInterval(lTimer1);
        _trapController.interval = null;
        uiLoadingFill.style.transition = 'none';
        label.textContent = 'NOT RESPONDING';
        label.style.color = 'var(--system-alert)';
        label.style.animationDuration = '0.32s';
        const glitch = document.createElement('div');
        glitch.className = 'glitch-flash';
        uiGameCont.appendChild(glitch);
        setTimeout(() => glitch.parentNode && glitch.parentNode.removeChild(glitch), 700);
        navigator.vibrate && navigator.vibrate([60, 120, 60]);
    }, 5300));

    // Phase 3: recovering at 8.9s
    _trapController.timers.push(setTimeout(() => {
        label.textContent = 'RECOVERING...';
        label.style.color = 'var(--tarun-yellow)';
        label.style.animationDuration = '0.7s';
    }, 8900));

    // Phase 4: resume final crawl 92% → 99% at 10.2s
    _trapController.timers.push(setTimeout(() => {
        label.style.color = '';
        label.style.animationDuration = '';
        uiLoadingFill.style.transition = 'width 4.5s cubic-bezier(0.2, 0.8, 0.35, 1.0)';
        uiLoadingFill.style.width = '99%';
        let p2 = 92;
        const lTimer2 = setInterval(() => {
            p2 = Math.min(99, p2 + 1);
            label.textContent = `PUBLISHING... ${p2}%`;
        }, 500);
        _trapController.interval = lTimer2;

        const doneTimer = setTimeout(() => {
            clearInterval(lTimer2);
            _trapController.interval = null;
            uiTrap.style.display = 'none';
            uiLoadingBar.classList.remove('active');
            loadNode("upload");
        }, 5000);
        _trapController.timers.push(doneTimer);
    }, 10200));
}

// ─── Choices ──────────────────────────────────────────────────────────────────
function renderChoices(choices) {
    if (!choices || choices.length === 0) return;
    uiTapHint.classList.remove('visible');
    document.getElementById('terminal').classList.add('with-choices');

    if (ALL_ENDINGS.has(gameState.currentNode)) showEndingCard();
    setTimeout(() => playSound('pop'), 80);

    const hasPlayed = !!localStorage.getItem('hasPlayed');

    choices.forEach((choice, index) => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.style.animationDelay = `${index * 0.08}s`;

        const textSpan = document.createElement('span');
        textSpan.className = 'choice-text';
        textSpan.innerText = choice.text;
        // Subtle warning icon on bad-outcome paths (2nd+ playthrough only)
        if (hasPlayed && BAD_ENDINGS.has(choice.target)) {
            const warn = document.createElement('span');
            warn.className = 'choice-warn';
            warn.textContent = ' ⚠';
            textSpan.appendChild(warn);
        }
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
            navigator.vibrate && navigator.vibrate([8, 20, 8]);
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
    const q = Math.max(0, Math.min(100, Math.round(gameState.quality)));
    const p = Math.max(0, Math.min(50,  Math.round(gameState.patience)));
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
    gameState.quality  = Math.max(0, Math.min(100, gameState.quality));
    gameState.patience = Math.max(0, Math.min(50,  gameState.patience));
    updateHUD();

    // Overflow endings: skip if already on an ending node, or if the chosen target is itself an ending
    if (!ALL_ENDINGS.has(gameState.currentNode) && !ALL_ENDINGS.has(choice.target)) {
        if (gameState.patience <= 0)   { loadNode("rage_quit"); return; }
        if (gameState.minutes >= 1110) { loadNode("martyr");    return; }
    }

    if (choice.action === "restart") {
        startGame();
    } else if (choice.action === "mainmenu") {
        showTitleScreen();
    } else if (choice.action === "return_from_cutaway") {
        loadNode(gameState.previousNode || "start");
    } else if (choice.target) {
        loadNode(choice.target);
    } else {
        console.warn('Choice has no target or action:', choice);
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

    // Horizontal: center above each character using bounding box data
    // Priya zone: xmin=48% xmax=73% → center 60.5%
    // Tarun zone: xmin=73% xmax=98% → center 85.5%
    const BUBBLE_W = 200;
    const priyaLeft = Math.max(4, Math.min(cW - BUBBLE_W - 4, cW * 0.605 - BUBBLE_W / 2));
    const tarunLeft = Math.max(4, Math.min(cW - BUBBLE_W - 4, cW * 0.855 - BUBBLE_W / 2));

    const bp = document.getElementById('bubble-priya');
    const bt = document.getElementById('bubble-tarun');
    if (bp) { bp.style.bottom = priyaBottom + 'px'; bp.style.top = 'auto'; bp.style.left = priyaLeft + 'px'; bp.style.right = 'auto'; }
    if (bt) { bt.style.bottom = tarunBottom + 'px'; bt.style.top = 'auto'; bt.style.left = tarunLeft + 'px'; bt.style.right = 'auto'; }
}

let bubbleDismissTimeout = null;
let titleAudioInited = false;

const charQuotes = {
    priya: [
        "My SCORM is at 99%. It's been at 99% since Thursday. The bar is a liar.",
        "The SME wants 40 more slides. The module is about washing hands. Forty.",
        "Storyline crashed. Auto-save is from Tuesday. I am a survivor of something.",
        "They said 'make it interactive.' I added a hover state. We are done here.",
        "Baron Von Snoutstache used the word 'synergy' four times in one sentence. I counted.",
        "The LMS says SCORM 1.2 is supported. The LMS has never met a SCORM package.",
        "Six layers of triggers. Twelve slides. The file is 2.3 GB. Everything is fine.",
        "Completion fires on slide one. Nobody will know. This is between me and the moth.",
        "Review 360 feedback: 'Can it be more immersive?' It's a hand-washing module.",
        "I built a branching scenario. They want it linear. But keep the branches. I need a moment.",
        "The learner will skip the audio. I spent four hours scripting it. We're all going to be fine.",
        "Published to Review 360 eleven times today. Same note each time: 'Make it pop.' Pop.",
        "The client wants a 3D avatar. My budget is the vibes in this open-plan office.",
        "'Can you just make it feel more gamified?' I cannot. I am choosing not to. Goodbye.",
    ],
    tarun: [
        "Blake made me a latte this morning with a leaf pattern on top. I almost cried. He's just my roommate, everyone calm down.",
        "Derek from Solutions walked past my desk. He smells incredible. Very productive scent. For a colleague.",
        "Blake and I are going to Santorini. For team bonding. It's a professional trip. Eight months of planning. Very professional.",
        "I don't know why everyone keeps asking if Blake and I are 'okay.' We made risotto last night. From scratch. We are thriving.",
        "Derek remembered my coffee order. I nearly made him a slide about it. It felt appropriate at the time.",
        "Blake and I wore coordinating outfits to the company picnic by complete coincidence. Charcoal is just a popular colour.",
        "I showed Derek my Storyline file. He said 'this is impressive, Tarun.' I have not been the same since.",
        "Santorini is research. We're documenting the learning architecture of white-washed Greek coastal environments. Blake's idea. He's thorough.",
        "I don't have a favourite colleague. Derek is just architecturally well-proportioned and very responsive on Slack.",
        "Blake gave me his hoodie because I was cold. It was 24 degrees. I was not cold. I am keeping the hoodie.",
        "Derek cc'd me on an email today. Just to keep me in the loop. He thought of me. I'm just noting it.",
        "Secret Santa is coming. I already know what Blake wants. We discussed it for three hours. On a Sunday. For work reasons.",
        "Blake and I have a shared Spotify playlist. It started as a joke. It has 214 songs. It is not a joke.",
        "Derek laughed at something I said in the all-hands. Not a polite laugh. A real one. I've been thinking about it.",
    ]
};
const charQuoteIndex = { priya: 0, tarun: 0 };

let priyaTapCount = 0;
let priyaLastTapTime = 0;

const priyaHRQuotes = [
    "Okay. You've tapped me four times now. I'm noting that for the record.",
    "Why are you doing this? I have feelings. Not many left, but some.",
    "I'm opening an incident report. Six taps. Documented. Timestamped. The moth is my witness.",
    "This is harassment. I'm filing with HR. Case number: HR-2024-00471. I beg you. Stop.",
    "I've emailed HR, my union rep, and the moth. The moth replied first. I have a lawyer. He is a beetle. PLEASE."
];

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

    let text;
    if (char === 'priya') {
        const now = Date.now();
        if (now - priyaLastTapTime > 5000) priyaTapCount = 0;
        priyaLastTapTime = now;
        priyaTapCount++;
        if (priyaTapCount <= 3) {
            const pool = charQuotes.priya;
            text = pool[charQuoteIndex.priya % pool.length];
            charQuoteIndex.priya++;
        } else {
            text = priyaHRQuotes[Math.min(priyaTapCount - 4, priyaHRQuotes.length - 1)];
        }
    } else {
        const pool = charQuotes[char];
        if (pool) { text = pool[charQuoteIndex[char] % pool.length]; charQuoteIndex[char]++; }
    }

    if (text) bubble.textContent = text;
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
        if (!e.target.closest('#zone-priya') && !e.target.closest('#zone-tarun') && !e.target.closest('.char-bubble')) {
            hideCharBubbles();
        }
    });

    // Start audio + title BGM on first interaction with START SHIFT button (fallback)
    document.querySelector('.ts-btn')?.addEventListener('pointerdown', onTitleInteract, { once: true });

    // C2: Audio unlock overlay
    document.getElementById('audio-unlock-overlay')?.addEventListener('pointerdown', dismissAudioUnlock, { once: true });

    // C1: Settings panel — click outside card to close
    document.getElementById('settings-panel')?.addEventListener('pointerdown', e => {
        if (e.target === document.getElementById('settings-panel')) closeSettings();
    });

    initSceneZoom();
}

window.addEventListener('load', () => {
    initTitleScreen();

    // Keep scene image clipped to the visible area above the terminal
    syncSceneImageBottom();
    const termEl = document.getElementById('terminal');
    if (termEl && window.ResizeObserver) {
        new ResizeObserver(syncSceneImageBottom).observe(termEl);
    }

    // Set initial clock position (4:00 PM = 960 min)
    updateClockHands();

    // Restore speed label from saved preference
    const lbl = document.getElementById('speed-label');
    if (lbl) { lbl.textContent = _TW_DISPLAY[_twSpeedIdx]; lbl.setAttribute('fill', _TW_COLORS[_twSpeedIdx]); }
});

// ─── Safari audio unlock ──────────────────────────────────────────────────────
// #audio-unlock-overlay handles the guaranteed-trusted-gesture unlock on first visit.
// This lightweight fallback resumes a suspended AudioContext on any later interaction
// (e.g. after returning from a backgrounded tab on iOS).
(function () {
    function unlock() {
        if (!audioCtx || audioCtx.state !== 'suspended') return;
        audioCtx.resume().catch(() => {});
    }
    document.addEventListener('pointerdown', unlock, { capture: true, passive: true });
})();

// ─── C2: Audio unlock overlay dismiss ────────────────────────────────────────
function dismissAudioUnlock() {
    const ov = document.getElementById('audio-unlock-overlay');
    if (ov) ov.remove();
    initAudio();
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume().catch(() => {});
    if (!titleAudioInited) {
        titleAudioInited = true;
        startTitleBGM();
    }
}

// ─── C1: Settings panel ──────────────────────────────────────────────────────
function openSettings() {
    updateSettingsDisplay();
    document.getElementById('settings-panel')?.classList.add('visible');
}
function closeSettings() {
    document.getElementById('settings-panel')?.classList.remove('visible');
}
function updateSettingsDisplay() {
    const muteBtn  = document.getElementById('sp-mute-btn');
    const speedBtn = document.getElementById('sp-speed-btn');
    if (muteBtn)  muteBtn.textContent  = _muted ? '🔇 OFF' : '🔊 ON';
    if (speedBtn) speedBtn.textContent = _TW_DISPLAY[_twSpeedIdx];
}
function toggleMuteFromSettings() { toggleMute(); updateSettingsDisplay(); }
function cycleSpeedFromSettings()  { cycleTypingSpeed(); updateSettingsDisplay(); }

// ─── C3: Credits modal ───────────────────────────────────────────────────────
function openCredits() {
    const modal = document.getElementById('credits-modal');
    if (!modal) return;
    modal.classList.remove('visible');
    void modal.offsetWidth; // reset animation
    modal.classList.add('visible');
}
function closeCredits() {
    document.getElementById('credits-modal')?.classList.remove('visible');
}

// ─── Keyboard shortcuts (desktop) ────────────────────────────────────────────
document.addEventListener('keydown', e => {
    const titleVisible = document.getElementById('title-screen')?.style.display !== 'none';
    if (titleVisible) {
        if (e.key === 'Escape') hideCharBubbles();
        return;
    }
    if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        advanceDialogue();
    } else if (['1','2','3','4'].includes(e.key)) {
        const btns = uiChoices.querySelectorAll('.choice-btn');
        const idx = parseInt(e.key) - 1;
        if (btns[idx]) btns[idx].dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));
    } else if (e.key.toLowerCase() === 'm') {
        toggleMute();
    } else if (e.key.toLowerCase() === 's') {
        cycleTypingSpeed();
    }
});
