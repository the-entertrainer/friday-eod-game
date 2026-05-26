// ── CUTAWAY DATA ──────────────────────────────────────────────────────────────
// Drop images in assets/cutaways/ — all panels: 1080×420px
// Each cutaway: 3 equal stacked panels, pure visual storytelling (no captions)
const cutawayData = {

    "friday_eod_dragon": {
        titleLine1: "EVERY FRIDAY. 5:00 PM.",
        titleLine2: "Every single week. Without fail.",
        panels: [
            { src: "assets/cutaways/fri1.png" },
            { src: "assets/cutaways/fri2.png" },
            { src: "assets/cutaways/fri3.png" }
        ]
    },

    "synthesia_glitch": {
        titleLine1: "THAT ONE TIME.",
        titleLine2: "Module 3. Slide 4. Fire Safety Protocol.",
        panels: [
            { src: "assets/cutaways/syn1.png" },
            { src: "assets/cutaways/syn2.png" },
            { src: "assets/cutaways/syn3.png" }
        ]
    },

    "tarun_nightmare": {
        titleLine1: "TARUN'S RECURRING NIGHTMARE.",
        titleLine2: "(He refuses to discuss it. Not once.)",
        panels: [
            { src: "assets/cutaways/tarun1.png" },
            { src: "assets/cutaways/tarun2.png" },
            { src: "assets/cutaways/tarun3.png" }
        ]
    },

    "storyline_preview": {
        titleLine1: "STORYLINE PREVIEW SPEED.",
        titleLine2: "A comparative study.",
        panels: [
            { src: "assets/cutaways/slow1.png" },
            { src: "assets/cutaways/slow2.png" },
            { src: "assets/cutaways/slow3.png" }
        ]
    }
};

const storyData = {

    // ── COLD OPEN — 5:28 PM ──────────────────────────────────────────────────
    "intro": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/1_1_bsod.jpg", forceTime: 1048,
        cutaway: "friday_eod_dragon",
        spotlight: "every single Friday, at exactly 5:00 PM, my boss wakes up from his weekly coma like a Chinese dragon on meth and remembers he's a manager.",
        text: "The ThinkPad fan has reached a frequency I can only describe as existential. Asset tag L&D-049. The e-learning software is rendering. If this loading bar freezes, my weekend is dead.\n\nTeams says Away. I'm very much still here. The moth on the tube light above my desk has been there since three o'clock. We have an understanding.\n\nTwo more minutes and I'm done. That's all I need.\n\nBut it's Friday. And every single Friday, at exactly 5:00 PM, my boss wakes up from his weekly coma like a Chinese dragon on meth and remembers he's a manager.",
        choices: [ { text: "Rewind — 4:45 PM →", target: "setup", timeCost: 0 } ]
    },

    // ── FLASHBACK — 4:45 PM ──────────────────────────────────────────────────
    "setup": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/1_2_setup.jpg", forceTime: 1005,
        cutaway: "synthesia_glitch",
        text: "4:45 PM. The module was actually done. Done done. Not 'I haven't reviewed it' done. Not 'stakeholders haven't seen it' done. Finished.\n\nI use an AI video presenter — a digital human who reads the slides aloud so the learners don't have to. On slide 4, fire safety protocol, the render glitched mid-sentence. He stopped talking. Looked at the camera. And slowly, deliberately, poked his own nose for three full seconds.\n\nThe clip is still in the review folder. We don't discuss it.\n\nI was going to be home by five. I genuinely believed that.",
        choices: [
            { text: "Hit Publish and grab my coat.", target: "ambush", timeCost: 2 },
            { text: "One last QA pass. Just one.", target: "ambush", timeCost: 5 }
        ]
    },

    // ── THE AMBUSH — PART 1 ──────────────────────────────────────────────────
    "ambush": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/2_1_ambush.jpg",
        text: "PRIYA — hey — do you have two minutes? Please.\n\nThat's Tarun. He has 'Learning Champion' in his LinkedIn bio. He once asked me if a spreadsheet was broken because it had too many numbers. He is not malicious. He is dangerously excited about ideas he does not fully understand.\n\nHe saw a post. Chief Learning Architect. 200,000 followers. I can already see where this is going.",
        choices: [ { text: "What did the post say, Tarun?", target: "ambush_2", timeCost: 0 } ]
    },

    // ── THE AMBUSH — PART 2 ──────────────────────────────────────────────────
    "ambush_2": {
        speaker: "Tarun", color: "var(--tarun-yellow)", textColor: "#000",
        image: "assets/images/2_1_ambush.jpg",
        cutaway: "tarun_nightmare",
        text: "Priya, listen. I was reading this article — Global Chief Evangelist, mind blown, bro — we need to sunset our linear module. Make it like Duolingo. Matlab a cartoon owl that gets angry at the factory workers if they miss a lesson. Impact Ecosystem™!\n\nLeaderboard also. For mandatory fire safety training. So people compete to know the most about not catching fire. Ho jayega na?\n\nHe said 'phygital engagement framework.' Four times. With complete sincerity.",
        choices: [
            { text: "Explain this politely. With data. And patience I no longer have.", target: "diplomatic", timeCost: 8, patienceCost: -12 },
            { text: "Ask what 'phygital' actually means.", target: "aggressive", timeCost: 8, patienceCost: -18 },
            { text: "Stop. Take a breath. Address the room directly.", target: "meta_moment", timeCost: 4, patienceCost: -8 }
        ]
    },

    // ── PAUSE ─────────────────────────────────────────────────────────────────
    "meta_moment": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/2_4_kids.jpg",
        text: "Tarun. Hold on.\n\nSorry — I need to speak to whoever is making the choices here for exactly one second.\n\nYou are the entire reason I either get home at a normal hour or I'm still here at midnight. Good choices. That is the whole ask.\n\nOkay. Back to you, Tarun.",
        choices: [
            { text: "Tarun: 'Twenty minutes, max. Ho jayega na? Superb!'", target: "aggressive", timeCost: 4, patienceCost: -40 }
        ]
    },

    // ── DIPLOMATIC — PART 1: THE PITCH ───────────────────────────────────────
    "diplomatic": {
        speaker: "Tarun", color: "var(--tarun-yellow)", textColor: "#000",
        image: "assets/images/2_2_diplomatic.jpg",
        text: "So basically — Immersive Learning Journey. An escape room in the portal. He printed a mood board. Nine stock photos of padlocks and one photo of a bank vault with IMMERSIVE JOURNEY NODE 1 written on it in red marker. I did not write that. That was him.\n\nHe wants me to build a digital puzzle in software that will crash our HR portal, which runs on a server in Pune held together by rubber bands and collective denial.",
        choices: [ { text: "Tell me about the hardware.", target: "technical_pushback_2", timeCost: 0 } ]
    },

    // ── DIPLOMATIC — PART 2: RAJAN FROM IT ───────────────────────────────────
    "technical_pushback_2": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/2_2_diplomatic.jpg",
        text: "We have three VR headsets. Procurement took forty-five working days. Rajan from IT made me raise three separate tickets — the third one was specifically for batteries. We still do not have the batteries.\n\nHeadset one: won't turn on. Headset two: turns on, display is split down the middle. Headset three: works fine, but makes Rajan nauseous after four minutes. Rajan is also the only person who can set it up.\n\nThat is the full hardware situation.",
        choices: [
            { text: "Explain, kindly, that Storyline is not a game engine.", target: "technical_pushback", timeCost: 10, patienceCost: -20 },
            { text: "Surrender. Build the whole thing.", target: "compromise", timeCost: 40, qualityCost: -40, patienceCost: 15 }
        ]
    },

    // ── AGGRESSIVE PATH ──────────────────────────────────────────────────────
    "aggressive": {
        speaker: "Tarun", color: "var(--tarun-yellow)", textColor: "#000",
        image: "assets/images/2_3_aggressive.jpg",
        text: "So 'phygital' means — okay, listen — the Next button is locked until the AI presenter finishes talking. Wrong answers correct themselves automatically. He is calling this 'psychological safety.'\n\nHe wants to lock the screen so grown adults are legally forced to sit and watch an AI puppet slowly read text out loud. He wrote 'outcome-positive engagement framework' on a Post-it and stuck it to the server room door. Facilities called twice. It's still there.",
        choices: [
            { text: "Explain that this defeats the entire purpose of a quiz.", target: "technical_pushback", timeCost: 8, patienceCost: -16 },
            { text: "Agree to simulate the illusion of learning.", target: "compromise", qualityCost: -50, timeCost: 20, patienceCost: 12 }
        ]
    },

    // ── THE PUSHBACK ──────────────────────────────────────────────────────────
    "technical_pushback": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/3_1_pushback.jpg",
        cutaway: "storyline_preview",
        text: "Tarun, our company portal is seven years old. Finance said no to upgrading it — three managers ago. The one person who actually knows how to fix it flies in from Pune once a month.\n\nHalf the factory floor opens this on Internet Explorer. If I add interactive puzzles, the portal throws an error nobody on this team knows how to fix, and that error becomes my problem for the next six weeks.\n\nBas. I'm not being dramatic. I'm describing the actual system.\n\nAnd previewing anything in this software? By the time it loads I could watch a glacier form, travel to the sea, and still have time for a full lunch.",
        choices: [
            { text: "Tarun: 'Fine. Just add a stock photo of someone looking inspired.'", target: "loading_bar", qualityCost: -20, timeCost: 6, patienceCost: 8 },
            { text: "Publish the clean version yourself. Go rogue.", target: "rogue_export", qualityCost: 10, patienceCost: -55 },
            { text: "Email the final file directly to everyone he CC'd.", target: "meta_escape", timeCost: 0, qualityCost: 15, patienceCost: 50 }
        ]
    },

    // ── THE COMPROMISE ────────────────────────────────────────────────────────
    "compromise": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/3_3_compromise.jpg",
        text: "I found a padlock on a stock photo website. Ten dollars. The man holding it is clearly in a Manhattan office — corner suite, city skyline, expensive suit. But it's a padlock, so technically it represents security.\n\nThe filename is Greg_padlock_security_195832.jpg. Greg is now in the compliance module. For our factory workers in Nashik.\n\nThat is just where we are.",
        choices: [ { text: "Watch the publish bar and pray.", target: "loading_bar", timeCost: 6 } ]
    },

    // ── SECRET ENDING: THE CLEAN EXIT ────────────────────────────────────────
    "meta_escape": {
        speaker: "System", color: "var(--success-green)", textColor: "#000",
        image: "assets/images/5_2_winner.jpg",
        text: "You opened a new email. Added the VP, the VP's PA, the HRBP, and the Global L&D Head in Singapore — everyone Tarun had CC'd — plus the client who'd commented. Subject: Final Approved Module — Ready for Deployment.\n\nOne line in the body: 'Build reviewed, tested, and live as of today.'\n\nHit send at 5:26 PM. Tarun replied in forty seconds. Three question marks.\n\nYou had already left the building.",
        endingTitle: "THE CLEAN EXIT", endingTitleType: "secret",
        choices: [
            { text: "Restart Shift", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    },

    // ── BAD ENDING: THE MARTYR (went rogue) ──────────────────────────────────
    "rogue_export": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/3_4_rogue.jpg",
        text: "You published the clean build yourself. Walked out. The module went live.\n\nFive-star reviews. 94% completion. Nobody gets 94%. You were a minor hero for exactly three days.\n\nThen an email arrived. Subject: Creative Unilateralism — A Formal Concern. CC'd your manager, his manager, and the Global VP. Posted about it on the intranet under 'Learning Culture Wins.'\n\nThey let you go. The module is still running.",
        endingTitle: "THE MARTYR",
        choices: [
            { text: "Restart Shift", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    },

    // ── THE CANON TRAP ────────────────────────────────────────────────────────
    "loading_bar": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/4_1_loading.jpg",
        text: "5:28 PM. Bar's at 99%.\n\nCompany ThinkPad, 2017. Asset tag L&D-049. Every person on this floor has the same model. All of us doing exactly this — fan screaming, laptop burning through our laps, watching a bar that will not move.\n\nThe moth is still on the tube light.\n\nDo not touch anything.",
        isTrap: true, forceTime: 1048,
        choices: []
    },

    // ── BAD ENDING: FATAL ERROR ───────────────────────────────────────────────
    "crash": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/4_3_crash.jpg",
        text: "You touched it.\n\nThe software has stopped responding. AutoRecover found one file — the very first draft. Title slide. No animations, no Greg, no AI presenter. Just 'Security Awareness Training' in Calibri on a white background.\n\nThat is what survived.",
        endingTitle: "FATAL ERROR",
        choices: [
            { text: "Cry. Then restart.", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    },

    // ── THE TEAL BOMB ─────────────────────────────────────────────────────────
    "upload": {
        speaker: "Tarun", color: "var(--tarun-yellow)", textColor: "#000",
        image: "assets/images/4_2_upload.jpg",
        text: "PRIYA! It published, superb!\n\nOkay so — tiny thing — the Singapore VP posted this morning. 'Teal is the future of Trust™.' Four thousand likes. He needs all 87 slides changed to teal before you leave. He's CC'd the VP, the VP's PA, the HRBP, and the Global Head.\n\nHe sent the colour code. It is the word TEAL. Not a hex value. Not an RGB number. Just the word. I checked the brand guide — Cerulean Blue, Muted Sage, Leadership Gray. There is no teal anywhere. Ho jayega na?",
        choices: [
            { text: "Recolour all 87 slides. By hand. Right now.", target: "martyr_office", timeCost: 90, qualityCost: -10 },
            { text: "Bury Tarun in confident-sounding corporate laws.", target: "true_winner", timeCost: 0, qualityCost: 20 },
            { text: "Export as PowerPoint. Name it Innovation_Hub.pptx. Done.", target: "ppt_promotion", timeCost: 0, qualityCost: -100 }
        ]
    },

    // ── BAD ENDING: JUST ANOTHER FRIDAY ──────────────────────────────────────
    "martyr_office": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/5_1_martyr.jpg", forceTime: 1120,
        text: "87 slides. By hand. All of them.\n\nSlides 23–31 were locked inside a master template from 2018. The person who built it left years ago. You rebuilt those nine slides twice. Your hand slipped on slide 34 and you did it a third time. It published at 11 PM.\n\nA Teams message arrived: 'just checking in 😊' You watched it come in. The cleaner looked at you, picked up the vacuum, and moved to the next section without a word.",
        endingTitle: "JUST ANOTHER FRIDAY",
        choices: [
            { text: "Restart Shift", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    },

    // ── BAD ENDING: THE CORPORATE SELLOUT ────────────────────────────────────
    "ppt_promotion": {
        speaker: "System", color: "var(--tarun-yellow)", textColor: "#000",
        image: "assets/images/6_1_ppt_promotion.jpg",
        text: "You renamed the file Innovation_Hub.pptx and sent it with no message.\n\nHe replied in 38 seconds: 'EXACTLY THE TRANSFORMATIONAL ENERGY WE NEEDED.' Forwarded to the CEO — subject: INNOVATION — and posted about it on LinkedIn. His own deck has forty-seven circles connected by arrows and a Wordle screenshot labelled 'Engagement Metric.' He calls it an agile pivot.\n\nBy Monday, you are Global Head of Learning Experience Design. Parking spot included.",
        endingTitle: "THE CORPORATE SELLOUT",
        choices: [
            { text: "Restart Shift", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    },

    // ── THE GASLIGHT ──────────────────────────────────────────────────────────
    "true_winner": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/6_2_true_winner.jpg",
        text: "I looked him dead in the eye and said: 'Tarun, under the National Corporate Synergy Act, altering a hue-matrix during an active evaluation cycle voids our ISO compliance. I submitted the deviation request last Thursday. The system applies the registered token automatically at midnight — teal is already queued. You countersigned this at 11:14 PM on a Sunday.'\n\nI made every single word of that up.",
        choices: [ { text: "Watch Tarun absorb this information.", target: "victory_screen" } ]
    },

    // ── TRUE ENDING: THE SME WHISPERER ───────────────────────────────────────
    "victory_screen": {
        speaker: "System", color: "var(--success-green)", textColor: "#000",
        image: "assets/images/6_3_victory.jpg",
        text: "'The deviation request.' 'That's the one.' He nodded for a very long time. 'Superb alignment,' he said.\n\nLaptop closed at 5:28. Out the door by 5:30. The moth on the tube light dipped once as you walked past.\n\nYou don't know why that made you feel better. But it did.",
        endingTitle: "THE SME WHISPERER", endingTitleType: "victory",
        choices: [
            { text: "Play Again (Restart Shift)", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    },

    // ── BAD ENDING: GLORIOUS RAGE QUIT ───────────────────────────────────────
    "rage_quit": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/6_4_rage_quit.jpg",
        text: "Patience hits zero.\n\nYou close the laptop very carefully, which somehow feels worse than slamming it. Grab your bag. Tarun is about to say something on your way out. You don't stop.\n\nThe Uber is four minutes away. You open Glassdoor. Type two stars. Look at it. Change it to one.",
        endingTitle: "GLORIOUS RAGE QUIT",
        choices: [
            { text: "Restart Shift", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    },

    // ── BAD ENDING: STILL HERE (time overflow ≥ 5:30) ────────────────────────
    "martyr": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/6_5_martyr.jpg",
        text: "It's midnight.\n\nThe cleaning crew is working around your desk. One of them has started skipping your section entirely — they nod when they come in and vacuum around you like you are load-bearing furniture.\n\nThe bar is still at 99%.",
        endingTitle: "STILL HERE",
        choices: [
            { text: "Restart Shift", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    }
};
