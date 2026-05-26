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
        text: "Storyline's been at 99% for fourteen minutes. Fourteen.\n\nTeams says Away. I'm very much still here. Haven't moved. The ThinkPad fan sounds like a disappointed relative — loud, constant, and somehow judging me.\n\nTwo more minutes and I'm done. That's all I need.\n\nBut it's Friday. And every single Friday, at exactly 5:00 PM, my boss wakes up from his weekly coma like a Chinese dragon on meth and remembers he's a manager.",
        choices: [ { text: "Rewind — 4:45 PM →", target: "setup", timeCost: 0 } ]
    },

    // ── FLASHBACK — 4:45 PM ──────────────────────────────────────────────────
    "setup": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/1_2_setup.jpg", forceTime: 1005,
        cutaway: "synthesia_glitch",
        text: "4:45 PM. The module was actually done. Not 'draft two' done. Not 'stakeholders haven't seen it yet' done. Done done.\n\nThe Synthesia avatar was mostly behaving. Except for that one time on slide 4 — fire safety protocol — where the render glitched mid-sentence and he just. Poked his own nose. Three full seconds. Straight to camera.\n\nThe clip is still in the review folder. We don't discuss it.\n\nI was going to be home by five. I genuinely believed that.",
        choices: [
            { text: "Hit Publish and grab my coat.", target: "ambush", timeCost: 2 },
            { text: "One last QA pass. Just one.", target: "ambush", timeCost: 5 }
        ]
    },

    // ── THE AMBUSH ───────────────────────────────────────────────────────────
    "ambush": {
        speaker: "Tarun", color: "var(--tarun-yellow)", textColor: "#000",
        image: "assets/images/2_1_ambush.jpg",
        cutaway: "tarun_nightmare",
        text: "PRIYA — hey — do you have two minutes? Please.\n\nBefore I explain, some context on Tarun. He calls himself a 'Learning Champion' on LinkedIn. He once asked me if a spreadsheet was broken because there were too many numbers. He's not malicious — he's dangerously excited about ideas he doesn't fully understand.\n\nHe saw a LinkedIn post. Chief Learning Architect, 200k followers. He wants to turn our fire safety module into Duolingo. Said 'learning ecosystem' three times. I was counting.\n\nAlso — he once walked out of a budget meeting because someone opened a file with pivot tables. Real panic in his eyes. Actually fled.",
        choices: [
            { text: "Explain cognitive load theory. Diplomatically.", target: "diplomatic", timeCost: 8, patienceCost: -12 },
            { text: "Ask what 'engagement synergy' actually means.", target: "aggressive", timeCost: 8, patienceCost: -18 },
            { text: "Stop. Take a breath. Address the situation directly.", target: "meta_moment", timeCost: 4, patienceCost: -8 }
        ]
    },

    // ── PAUSE ─────────────────────────────────────────────────────────────────
    "meta_moment": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/2_4_kids.jpg",
        text: "Tarun. Hold on.\n\nSorry — I need to address whoever's making the decisions here right now.\n\nYou are the only reason I go home at a normal hour or I'm still here at midnight. Just. Good choices. That's the whole ask.\n\nOkay. Tarun. What were you saying.",
        choices: [
            { text: "Tarun: 'Twenty, maybe thirty. Tops. I'll send you a brief.'", target: "aggressive", timeCost: 4, patienceCost: -40 }
        ]
    },

    // ── DIPLOMATIC PATH ──────────────────────────────────────────────────────
    "diplomatic": {
        speaker: "Tarun", color: "var(--tarun-yellow)", textColor: "#000",
        image: "assets/images/2_2_diplomatic.jpg",
        text: "So he wants an escape room. In the LMS. He's calling it an 'immersive learning journey.' He printed a mood board — nine photos of padlocks and one photo of a safe with IMMERSIVE JOURNEY NODE 1 written on it in red marker.\n\nI didn't write that. That was him.\n\nWe have three VR headsets, by the way. Two won't turn on. The third one makes Rajan from IT nauseous. Just putting that out there.",
        choices: [
            { text: "Explain that Storyline is not a game engine.", target: "technical_pushback", timeCost: 10, patienceCost: -20 },
            { text: "Surrender. Build the whole thing.", target: "compromise", timeCost: 40, qualityCost: -40, patienceCost: 15 }
        ]
    },

    // ── AGGRESSIVE PATH ──────────────────────────────────────────────────────
    "aggressive": {
        speaker: "Tarun", color: "var(--tarun-yellow)", textColor: "#000",
        image: "assets/images/2_3_aggressive.jpg",
        text: "So 'engagement synergy' means — okay listen — the Next button is locked until the avatar finishes talking. And wrong answers correct themselves automatically. He's calling this 'psychological safety.'\n\nHe wrote it on a Post-it. Stuck it to the server room door. Facilities called twice. It's still there.",
        choices: [
            { text: "Explain this destroys the point of an assessment.", target: "technical_pushback", timeCost: 8, patienceCost: -16 },
            { text: "Agree to simulate the illusion of learning.", target: "compromise", qualityCost: -50, timeCost: 20, patienceCost: 12 }
        ]
    },

    // ── THE PUSHBACK ─────────────────────────────────────────────────────────
    "technical_pushback": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/3_1_pushback.jpg",
        cutaway: "storyline_preview",
        text: "Tarun, we're on SCORM 1.2. Since 2019. Finance said no to upgrading — three managers ago. The LMS admin flies in from Pune once a month.\n\nHalf the plant floor is still on IE11. If I build this in Storyline, the LMS will throw an error nobody on this team knows how to fix.\n\nI'm not being dramatic. I'm just telling you what's actually there.\n\nAnd previewing it in Storyline? Yaar, by the time it loads I could watch a snail complete his PhD, a glacier form, and still have time for lunch.",
        choices: [
            { text: "Tarun: 'Fine. Add a stock photo of someone high-fiving a server.'", target: "loading_bar", qualityCost: -20, timeCost: 6, patienceCost: 8 },
            { text: "Publish the clean version anyway. Go rogue.", target: "rogue_export", qualityCost: 10, patienceCost: -55 },
            { text: "Email the final build directly to everyone he CC'd.", target: "meta_escape", timeCost: 0, qualityCost: 15, patienceCost: 50 }
        ]
    },

    // ── THE CAVE ─────────────────────────────────────────────────────────────
    "compromise": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/3_3_compromise.jpg",
        text: "I found a padlock on Shutterstock. Ten dollars. The guy in the photo is clearly in an American office — he's in a suit, there's a skyline, he's very New York — but it's a padlock, so.\n\nThe filename is Greg_padlock_security_195832.jpg. Greg is in the compliance module now. For our learners in Nashik. That's just where we are.",
        choices: [ { text: "Watch the publish bar and pray.", target: "loading_bar", timeCost: 6 } ]
    },

    // ── SECRET ENDING: THE CLEAN EXIT ────────────────────────────────────────
    "meta_escape": {
        speaker: "System", color: "var(--success-green)", textColor: "#000",
        image: "assets/images/5_2_winner.jpg",
        text: "You opened a new email. Added the VP, the VP's PA, the HRBP, and the Global L&D Head in Singapore — everyone he'd CC'd — plus the client who'd commented. Subject: Final Approved Module — Ready for Deployment. One line in the body: 'Build reviewed, tested, live as of today.'\n\nHit send at 5:26.\n\nTagun replied in forty seconds. Three question marks. You had already left the building.",
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
        text: "You published the clean build yourself and walked out.\n\nModule went live. Five stars on the first review, 94% completion — nobody gets that, yaar. You were a minor hero for about three days.\n\nThen the L&D Head sent an email. Subject: Creative Unilateralism: A Formal Concern. CC'd your manager, his manager. Posted about it. They let you go.\n\nThe module is still running.",
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
        text: "5:28. Bar's at 99%.\n\nCompany ThinkPad, 2017. Asset tag L&D-049. Everyone on this floor has the same model and we're all doing this — fan, heat, wait. There's a moth on the tube light above my desk. It's been there since about three.\n\nDon't touch anything.",
        isTrap: true, forceTime: 1048,
        choices: []
    },

    // ── BAD ENDING: FATAL ERROR ───────────────────────────────────────────────
    "crash": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/4_3_crash.jpg",
        text: "You touched it.\n\nArticulate Storyline has stopped responding. AutoRecover saved one file — Module 3, Draft v1. Title slide. No layers, no variables, no Greg. Just 'Security Awareness Training' in Calibri on a white background.\n\nThat's what survived.",
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
        text: "PRIYA! It published, great news!\n\nOkay so — tiny thing — he posted on LinkedIn this morning. 'Teal is the future of Trust™.' Four thousand likes. A client commented. Now he needs all 87 slides changed to teal before you leave tonight. He CC'd the VP, the VP's PA, the HRBP, and the Global L&D Head in Singapore.\n\nHe sent the colour code. It's the word TEAL. Not a hex. Just the word. I checked the brand guide — Leadership Gray, Cerulean Blue, Muted Sage. No teal anywhere.",
        choices: [
            { text: "Recolour all 87 slides. By hand. Right now.", target: "martyr_office", timeCost: 90, qualityCost: -10 },
            { text: "Bury Tarun in confident-sounding jargon.", target: "true_winner", timeCost: 0, qualityCost: 20 },
            { text: "Export as PowerPoint and email it. Done.", target: "ppt_promotion", timeCost: 0, qualityCost: -100 }
        ]
    },

    // ── BAD ENDING: JUST ANOTHER FRIDAY ──────────────────────────────────────
    "martyr_office": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/5_1_martyr.jpg", forceTime: 1120,
        text: "87 slides. By hand. All of them.\n\nSlides 23 through 31 used a locked master template from 2018. The person who built it left years ago. You rebuilt those nine slides twice. Your hand slipped on 34 and you had to do it a third time. It published at 11 PM.\n\nSomeone sent a Teams message — 'just checking in 😊' — and you watched it come in. The cleaner looked at you and vacuumed around your desk instead.",
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
        text: "You renamed it InfoSec_Interactive_FINAL_v2_TEAL_APPROVED.pptx and emailed it with no message.\n\nHe replied in 38 seconds. EXACTLY THE TRANSFORMATIONAL ENERGY HE WANTED. Forwarded to the CEO — subject: INNOVATION — and posted about it. His own deck has forty-seven circles connected by arrows and a Wordle screenshot labelled 'Engagement Metric.' He calls the whole thing an agile pivot.\n\nBy Monday, you're Global Head of Learning Experience Design. Parking spot and everything.",
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
        text: "Tarun, actually — under Kirkpatrick Level 4, a brand colour change during an active evaluation cycle triggers a Phase 2 reset. I flagged this in the ADDIE review. It's in the handover doc. The LMS auto-applies the brand token at midnight, so teal is already queued. You signed off at 11:14 PM on a Sunday.\n\nShe looked at him. She made every single word of that up.",
        choices: [ { text: "Watch Tarun absorb this information.", target: "victory_screen" } ]
    },

    // ── TRUE ENDING: THE SME WHISPERER ───────────────────────────────────────
    "victory_screen": {
        speaker: "System", color: "var(--success-green)", textColor: "#000",
        image: "assets/images/6_3_victory.jpg",
        text: "'The ADDIE review.' 'That's the one.' He nodded for a very long time. 'Superb alignment,' he said.\n\nLaptop closed at 5:28. Out the door by 5:30. The moth on the tube light dipped once as you walked past. You don't know why that made you feel better, but it did.",
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
        text: "Patience hits zero.\n\nYou close the laptop very carefully, which somehow feels worse than slamming it. Grab your bag. Tarun's about to say something on your way out. You don't stop.\n\nThe Uber's four minutes away. You open Glassdoor. Two stars. Actually, one.",
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
        text: "It's midnight.\n\nThe cleaning crew's working around your desk. One of them has started skipping your section entirely — they nod when they come in and work around you like you're load-bearing furniture.\n\nThe bar's still at 99%.",
        endingTitle: "STILL HERE",
        choices: [
            { text: "Restart Shift", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    }
};
