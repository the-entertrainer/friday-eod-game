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

const uiClock = document.getElementById('clock-display');
const uiQuality = document.getElementById('quality-bar');
const uiPatience = document.getElementById('patience-bar');
const uiName = document.getElementById('speaker-name');
const uiText = document.getElementById('dialogue-text');
const uiChoices = document.getElementById('choices-container');
const uiViewport = document.getElementById('viewport');
const uiTrap = document.getElementById('trap-overlay');

function startGame() {
    document.getElementById('title-screen').style.display = 'none';
    resetState();
    loadNode("start");
}

function resetState() {
    gameState.minutes = 960; 
    gameState.quality = 100;
    gameState.patience = 50;
    gameState.previousNode = null;
    updateHUD();
}

function formatTime(totalMins) {
    let h = Math.floor(totalMins / 60);
    let m = totalMins % 60;
    let ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    if (h === 0) h = 12;
    m = m < 10 ? '0' + m : m;
    return `${h}:${m} ${ampm}`;
}

function updateHUD() {
    uiClock.innerText = formatTime(gameState.minutes);
    uiQuality.style.width = Math.max(0, Math.min(100, gameState.quality)) + '%';
    uiPatience.style.width = Math.max(0, Math.min(100, gameState.patience)) + '%';
}

function spawnFloatingText(elementId, text, color) {
    const anchor = document.getElementById(elementId);
    const floater = document.createElement('div');
    floater.className = 'floating-text';
    floater.innerText = text;
    floater.style.color = color;
    
    if(elementId === 'clock-display') {
        floater.style.left = '0';
        floater.style.top = '10px';
    } else {
        floater.style.right = '0';
        floater.style.top = '-5px';
    }
    
    anchor.appendChild(floater);
    setTimeout(() => { if(anchor.contains(floater)) anchor.removeChild(floater); }, 1200);
}

function loadNode(nodeId) {
    const node = storyData[nodeId];
    gameState.currentNode = nodeId;
    
    uiTrap.style.display = 'none';
    clearTimeout(gameState.trapTimeout);

    uiViewport.style.backgroundImage = `url('${node.image}')`;
    
    uiName.innerText = node.speaker;
    uiName.style.backgroundColor = node.color;
    uiName.style.color = node.textColor;
    
    uiName.style.transform = 'rotate(-3deg) scale(1.1)';
    setTimeout(() => uiName.style.transform = 'rotate(-3deg) scale(1)', 200);

    uiChoices.innerHTML = ''; 
    uiText.innerHTML = ''; 

    if (node.isTrap) {
        uiTrap.style.display = 'block';
        gameState.trapTimeout = setTimeout(() => {
            uiTrap.style.display = 'none';
            loadNode("upload");
        }, 4000);
    }

    typewriterEffect(node.text, node.choices);
}

function typewriterEffect(text, choices) {
    clearInterval(gameState.typeInterval);
    gameState.isTyping = true;
    let i = 0;
    
    gameState.typeInterval = setInterval(() => {
        uiText.innerHTML = text.substring(0, i + 1) + '<span class="cursor"></span>';
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
        renderChoices(node.choices);
    }
}

function triggerTrap() {
    clearTimeout(gameState.trapTimeout);
    uiTrap.style.display = 'none';
    loadNode("crash");
}

function renderChoices(choices) {
    if (!choices || choices.length === 0) return;

    choices.forEach((choice, index) => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.innerText = choice.text;
        btn.style.animationDelay = `${index * 0.08}s`;
        
        btn.onclick = (e) => {
            e.stopPropagation(); 
            btn.classList.add('clicked');
            
            if(choice.timeCost) spawnFloatingText('clock-display', `+${choice.timeCost}m`, 'var(--system-alert)');
            if(choice.qualityCost) {
                let color = choice.qualityCost > 0 ? 'var(--success-green)' : 'var(--system-alert)';
                let sign = choice.qualityCost > 0 ? '+' : '';
                spawnFloatingText('wrap-quality', `${sign}${choice.qualityCost}`, color);
            }
            if(choice.patienceCost) {
                let color = choice.patienceCost > 0 ? 'var(--success-green)' : 'var(--system-alert)';
                let sign = choice.patienceCost > 0 ? '+' : '';
                spawnFloatingText('wrap-patience', `${sign}${choice.patienceCost}`, color);
            }

            setTimeout(() => handleChoice(choice), 400);
        };
        uiChoices.appendChild(btn);
    });
}

function handleChoice(choice) {
    if (choice.timeCost) gameState.minutes += choice.timeCost;
    if (choice.qualityCost) gameState.quality += choice.qualityCost;
    if (choice.patienceCost) gameState.patience += choice.patienceCost;

    updateHUD();

    if (gameState.patience <= 0 && gameState.currentNode !== "rage_quit") {
        loadNode("rage_quit");
        return;
    }
    if (gameState.minutes >= 1110 && gameState.currentNode !== "martyr") { 
        loadNode("martyr");
        return;
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