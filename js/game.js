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
    try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }
    catch(e) { audioCtx = null; }
}

function playSound(type) {
    if (!audioCtx) return;
    try {
        const osc  = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        const t = audioCtx.currentTime;
        switch (type) {
            case 'tick':
                osc.frequency.value = 880;
                gain.gain.setValueAtTime(0.025, t);
                gain.gain.exponentialRampToValueAtTime(0.001, t + 0.028);
                osc.start(t); osc.stop(t + 0.028);
                break;
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
            case 'scene':
                osc.type = 'sine';
                osc.frequency.setValueAtTime(320, t);
                osc.frequency.exponentialRampToValueAtTime(160, t + 0.18);
                gain.gain.setValueAtTime(0.05, t);
                gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
                osc.start(t); osc.stop(t + 0.18);
                break;
        }
    } catch(e) {}
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
    initAudio();
    resetState();
    loadNode("start");
    showHUDTooltips();
}

function resetState() {
    gameState.minutes      = 960;
    gameState.quality      = 100;
    gameState.patience     = 50;
    gameState.previousNode = null;
    uiEndingCard.style.display = 'none';
    uiEndingCard.innerHTML     = '';
    uiGameCont.classList.remove('ending-victory', 'ending-bad');
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

// ─── Scene loading ─────────────────────────────────────────────────────────────
function loadNode(nodeId) {
    const node = storyData[nodeId];
    if (!node) { console.error('Missing story node:', nodeId); return; }
    gameState.currentNode = nodeId;

    // Reset state
    uiTrap.style.display = 'none';
    clearTimeout(gameState.trapTimeout);
    uiLoadingBar.classList.remove('active');
    uiLoadingFill.style.animation = 'none';
    uiTapHint.classList.remove('visible');
    uiEndingCard.style.display = 'none';
    uiEndingCard.innerHTML = '';
    uiChoices.innerHTML = '';
    uiText.innerHTML    = '';

    // Ending effects
    uiGameCont.classList.remove('ending-victory', 'ending-bad');
    if (VICTORY_ENDINGS.has(nodeId)) {
        uiGameCont.classList.add('ending-victory');
        spawnEndingEffect('victory');
    } else if (BAD_ENDINGS.has(nodeId)) {
        uiGameCont.classList.add('ending-bad');
        spawnEndingEffect('bad');
    }

    // Crossfade scene
    playSound('scene');
    uiFade.classList.add('active');
    setTimeout(() => {
        uiViewport.style.backgroundImage = `url('${node.image}')`;
        uiFade.classList.remove('active');
    }, 220);

    // Speaker name
    uiName.innerText = node.speaker;
    uiName.style.backgroundColor = node.color;
    uiName.style.color = node.textColor;
    uiName.style.transform = 'rotate(-3deg) scale(1.1)';
    setTimeout(() => { uiName.style.transform = 'rotate(-3deg) scale(1)'; }, 200);

    // Loading bar trap
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

// ─── Dialogue ──────────────────────────────────────────────────────────────────
function typewriterEffect(text, choices) {
    clearInterval(gameState.typeInterval);
    gameState.isTyping = true;
    let i = 0;

    if (choices && choices.length > 0) {
        uiTapHint.classList.add('visible');
    }

    gameState.typeInterval = setInterval(() => {
        uiText.innerHTML = text.substring(0, i + 1) + '<span class="cursor"></span>';
        if (i % 5 === 0) playSound('tick');
        i++;
        if (i >= text.length) {
            clearInterval(gameState.typeInterval);
            uiText.innerHTML = text;
            gameState.isTyping = false;
            renderChoices(choices);
        }
    }, 25);
}

function advanceDialogue() {
    if (gameState.isTyping) {
        clearInterval(gameState.typeInterval);
        const node = storyData[gameState.currentNode];
        uiText.innerHTML = node.text;
        gameState.isTyping = false;
        uiTapHint.classList.remove('visible');
        renderChoices(node.choices);
    }
}

function triggerTrap() {
    clearTimeout(gameState.trapTimeout);
    uiTrap.style.display = 'none';
    uiLoadingBar.classList.remove('active');
    loadNode("crash");
}

// ─── Choices ───────────────────────────────────────────────────────────────────
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
        if (choice.timeCost)
            costs.push({ label: `+${choice.timeCost}m`, cls: 'cost-time' });
        if (choice.qualityCost)
            costs.push({ label: `${choice.qualityCost > 0 ? '+' : ''}${choice.qualityCost} quality`, cls: choice.qualityCost > 0 ? 'cost-good' : 'cost-bad' });
        if (choice.patienceCost)
            costs.push({ label: `${choice.patienceCost > 0 ? '+' : ''}${choice.patienceCost} patience`, cls: choice.patienceCost > 0 ? 'cost-good' : 'cost-bad' });

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

        btn.onclick = (e) => {
            e.stopPropagation();
            btn.classList.add('clicked');

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

            setTimeout(() => handleChoice(choice), 400);
        };

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

// ─── Choice resolution ─────────────────────────────────────────────────────────
function handleChoice(choice) {
    if (choice.timeCost)     gameState.minutes  += choice.timeCost;
    if (choice.qualityCost)  gameState.quality  += choice.qualityCost;
    if (choice.patienceCost) gameState.patience += choice.patienceCost;
    updateHUD();

    if (gameState.patience <= 0 && gameState.currentNode !== "rage_quit") {
        loadNode("rage_quit"); return;
    }
    if (gameState.minutes >= 1110 && gameState.currentNode !== "martyr") {
        loadNode("martyr"); return;
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

// ─── Title Screen ──────────────────────────────────────────────────────────────
let bubbleDismissTimeout = null;

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

function showCharBubble(char, event) {
    if (event) event.stopPropagation();
    hideCharBubbles();
    const bubble = document.getElementById(`bubble-${char}`);
    if (!bubble) return;
    const pool = charQuotes[char];
    if (pool) {
        bubble.textContent = pool[charQuoteIndex[char] % pool.length];
        charQuoteIndex[char]++;
    }
    bubble.classList.add('visible');
    clearTimeout(bubbleDismissTimeout);
    bubbleDismissTimeout = setTimeout(hideCharBubbles, 4500);
    playSound('pop');
}

function hideCharBubbles() {
    document.querySelectorAll('.char-bubble').forEach(b => {
        b.classList.remove('visible');
        b.style.display = '';
    });
    clearTimeout(bubbleDismissTimeout);
}

function initTitleScreen() {
    const logoWrap = document.getElementById('ts-logo-wrap');
    if (!logoWrap) return;

    setTimeout(() => {
        logoWrap.classList.add('logo-slam');
        logoWrap.addEventListener('animationend', () => {
            logoWrap.classList.remove('logo-slam');
            logoWrap.classList.add('logo-float');
        }, { once: true });
    }, 250);

    const titleScreen = document.getElementById('title-screen');
    if (titleScreen) {
        titleScreen.addEventListener('click', (e) => {
            if (!e.target.closest('.char-zone') && !e.target.closest('.char-bubble')) {
                hideCharBubbles();
            }
        });
    }
}

window.addEventListener('load', initTitleScreen);
