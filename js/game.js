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
let   _twSpeedIdx  = 0;

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
    el.style.top  = (8  + Math.random() * 27) + '%'; // cap at ~35% to stay above terminal
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
    martyr_office: 'defeated', ppt_promotion: 'victory',
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
    [_themeAudio, _sceneBGMAudio, _typingAudio, _transitionAudio].forEach(a => {
        if (a) a.muted = _muted;
    });
}

// ─── Typewriter speed cycle ───────────────────────────────────────────────────
function cycleTypingSpeed() {
    _twSpeedIdx = (_twSpeedIdx + 1) % _TW_SPEEDS.length;
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
    clearTrapTimers();
    stopTypingSound();
    gameState.isTyping     = false;
    gameState.minutes      = 960;
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
    tmp.onload = tmp.onerror = () => {
        uiSceneImage.classList.remove('img-loading');
        transitionScene(url, skipAnim);
    };
    tmp.src = url;
}

// ─── Scene loading ─────────────────────────────────────────────────────────────
function loadNode(nodeId) {
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
    } else if (BAD_ENDINGS.has(nodeId)) {
        uiGameCont.classList.add('ending-bad');
        spawnEndingEffect('bad');
        playEndingJingle('bad');
        localStorage.setItem('hasPlayed', '1');
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
        if (!e.target.closest('#zone-priya') && !e.target.closest('#zone-tarun') && !e.target.closest('.char-bubble')) {
            hideCharBubbles();
        }
    });

    // Start audio + title BGM on first interaction with START SHIFT button
    document.querySelector('.ts-btn')?.addEventListener('pointerdown', onTitleInteract, { once: true });

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
});

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
    }
});
