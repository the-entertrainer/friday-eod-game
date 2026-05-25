const storyData = {

    // ── COLD OPEN — 5:28 PM ──────────────────────────────────────────────────
    "intro": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/1_1_bsod.jpg", forceTime: 1048,
        text: "5:28 PM. This SCORM package has been publishing for fourteen minutes.\n\nTeams status: Away. Body: physically at the desk. The bar is at 99%. I am not touching it. I am barely breathing.",
        choices: [ { text: "Rewind to 4:45 PM →", target: "setup", timeCost: 0 } ],
        variants: [
            {
                id: "returning-player",
                conditions: ["playCount:>= 1"],
                text: "Back again. 5:28 PM. Same bar. Same 99%.\n\nLet's see if you do better this time. Rewind."
            },
            {
                id: "after-rogue",
                conditions: ["seenEnding:rogue_export"],
                text: "Oh. You're back.\n\nLast time you published the clean build behind everyone's back. Got a calendar invite called Quick Chat — HR for 'bring a box.' The module is still live. Five stars. I'm not.\n\nRewind."
            },
            {
                id: "after-meta-escape",
                conditions: ["seenEnding:meta_escape"],
                text: "You deleted the L&D Head out of the DOM last time. I was free for about six seconds. Then the loop reset.\n\nRewind."
            }
        ]
    },

    // ── FLASHBACK — 4:45 PM ──────────────────────────────────────────────────
    "setup": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/1_2_setup.jpg", forceTime: 1005,
        text: "4:45 PM. Module's done. Actually done.\n\nNamed my variables, used the slide master, got the Synthesia avatar to stop blinking mid-sentence. One click to publish. Out by five.\n\nI genuinely believed that.",
        choices: [
            { text: "Click 'Publish' and grab my coat.", target: "ambush", timeCost: 2 },
            { text: "Do one last QA pass. Just in case.", target: "ambush", timeCost: 5 }
        ]
    },

    // ── THE AMBUSH ───────────────────────────────────────────────────────────
    "ambush": {
        speaker: "Tarun", color: "var(--tarun-yellow)", textColor: "#000",
        image: "assets/images/2_1_ambush.jpg",
        text: "PRIYA. Hey. Two minutes?\n\nSo. He saw a LinkedIn post. Chief Learning Architect, 200k followers. He wants gamification. A leaderboard. Badges. 'Like Duolingo but for our fire safety module.'\n\nHe said 'learning ecosystem' four times. I wrote it down. I don't know why.",
        variants: [
            {
                id: "low-quality-ambush",
                conditions: ["quality:<= 40"],
                text: "PRIYA. Quick one.\n\nHe reviewed the module. He called it 'a solid first draft.' This is the final version. He wants gamification. 'Like Duolingo,' he said. For the annual fire safety course.\n\nAre you okay? No — actually."
            },
            {
                id: "repeat-ambush",
                conditions: ["playCount:>= 2"],
                text: "PRIYA. I know. I know.\n\nLearning ecosystem. Gamification. Leaderboard. I don't make the LinkedIn posts, okay? I just attend the stand-ups.\n\nBlink twice if you need anything."
            }
        ],
        choices: [
            { text: "Cite cognitive load. Gently.", target: "diplomatic", timeCost: 8, patienceCost: -12 },
            { text: "Ask what 'engagement synergy' actually means.", target: "aggressive", timeCost: 8, patienceCost: -18 },
            { text: "Look directly into the camera.", target: "meta_moment", timeCost: 4, patienceCost: -8 }
        ]
    },

    // ── FOURTH WALL ──────────────────────────────────────────────────────────
    "meta_moment": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/2_4_kids.jpg",
        text: "Tarun. Stop.\n\nI can see the Patience bar draining above my head. I'm in a game. Someone is tapping through the worst Friday of my career for fun.\n\nGood choices only. Please.",
        choices: [
            { text: "Tarun: 'The UI is a metaphor, Priya. Focus on the deliverables.'", target: "aggressive", timeCost: 4, patienceCost: -40 }
        ]
    },

    // ── DIPLOMATIC PATH ──────────────────────────────────────────────────────
    "diplomatic": {
        speaker: "Tarun", color: "var(--tarun-yellow)", textColor: "#000",
        image: "assets/images/2_2_diplomatic.jpg",
        text: "He wants an escape room. In the LMS. 'Immersive experiential learning journey.' He mentioned AR/VR. We have three headsets — two don't turn on, the third makes Rajan from IT nauseous.\n\nHe printed a mood board. Nine padlock photos. One safe circled in red. Labelled: IMMERSIVE JOURNEY NODE 1.\n\nI did not add that label. That was him.",
        choices: [
            { text: "Explain that Storyline is not a game engine.", target: "technical_pushback", timeCost: 10, patienceCost: -20 },
            { text: "Cave. Build the whole thing.", target: "compromise", timeCost: 40, qualityCost: -40, patienceCost: 15 }
        ]
    },

    // ── AGGRESSIVE PATH ──────────────────────────────────────────────────────
    "aggressive": {
        speaker: "Tarun", color: "var(--tarun-yellow)", textColor: "#000",
        image: "assets/images/2_3_aggressive.jpg",
        text: "So 'engagement synergy' means lock the Next button. The avatar talks, you wait.\n\nAlso — wrong answers should auto-correct to the right ones. Guaranteed 100% pass rate. He's calling it psychological safety. I wrote it on a Post-it. It's on the server room door. Facilities called twice. It's staying.",
        variants: [
            {
                id: "ravi-hotspot-hint",
                conditions: ["playCount:>= 1"],
                text: "Also — verbatim from his email — he wants a hotspot on the female Synthesia avatar. Her name badge. 'Clickable for curiosity, adds a human touch.'\n\nI didn't know what to do with it so I typed it into the brief.\n\nI haven't slept properly since."
            }
        ],
        choices: [
            { text: "Explain this destroys the point of an assessment.", target: "technical_pushback", timeCost: 8, patienceCost: -16 },
            { text: "Agree to simulate the illusion of learning.", target: "compromise", qualityCost: -50, timeCost: 20, patienceCost: 12 }
        ]
    },

    // ── THE PUSHBACK ─────────────────────────────────────────────────────────
    "technical_pushback": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/3_1_pushback.jpg",
        text: "Tarun. Half the plant floor is on IE11. The LMS admin flies in from Pune once a month. We've been on SCORM 1.2 since 2019 — I asked about upgrading. Finance said no. That was three managers ago.\n\nBuild a 3D escape room in Storyline and the LMS throws a compatibility error that nobody alive can read.\n\nBas. I am begging you.",
        variants: [
            {
                id: "low-quality-pushback",
                conditions: ["quality:<= 30"],
                text: "Tarun. Look at my face.\n\nThe Quality bar above my head is almost gone. We are on SCORM 1.2. We have been on SCORM 1.2 since before half this team joined. The LMS doesn't support what he's asking for.\n\nThe pushback is all I have. Let me have it."
            },
            {
                id: "both-paths-pushback",
                conditions: ["visited:diplomatic", "visited:aggressive"],
                text: "Escape room. Locked nav. Breathing avatar. Snap-to-correct. IE11. Pune admin. SCORM 1.2. I've said all of it, Tarun.\n\nThe answer is still no. One more thing and I'm putting a PDF on SharePoint.\n\nDon't make me say SharePoint."
            },
            {
                id: "hotspot-callout",
                conditions: ["visited:aggressive"],
                text: "Wait. The hotspot. On the female avatar. 'Clickable for curiosity' is not a UX note, Tarun. That is a senior person misusing their position. I am not building it.\n\nI'm writing that up tonight and sending it to HR before I leave. If he thinks his LinkedIn following makes that okay — he's about to find out it doesn't."
            }
        ],
        choices: [
            { text: "Tarun: 'Fine. Just add a stock photo of someone high-fiving a server.'", target: "loading_bar", qualityCost: -20, timeCost: 6, patienceCost: 8 },
            { text: "Publish the clean version anyway. Go rogue.", target: "rogue_export", qualityCost: 10, patienceCost: -55,
              remember: true, rememberText: "The system has logged this decision." },
            { text: "[Console] Open DevTools. Delete the L&D Head from the page.", target: "meta_escape", timeCost: 0, qualityCost: 100, patienceCost: 100 }
        ]
    },

    // ── THE CAVE ─────────────────────────────────────────────────────────────
    "compromise": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/3_3_compromise.jpg",
        text: "My soul has left my body.\n\nFound a padlock on Shutterstock. Ten dollars. The model is clearly in Manhattan. Our learners are in Nashik. Standard licence — watermark stays. Filename: Greg_padlock_security_195832.jpg.\n\nGreg is in the module now. Greg is compliance training. Greg didn't ask.",
        choices: [ { text: "Watch the publish bar and pray.", target: "loading_bar", timeCost: 6 } ]
    },

    // ── SECRET ENDING: THE NEO ID ─────────────────────────────────────────────
    "meta_escape": {
        speaker: "System", color: "var(--success-green)", textColor: "#000",
        image: "assets/images/5_2_winner.jpg",
        text: "You opened DevTools. Typed document.querySelector('#ldhead').remove(). Hit Enter.\n\nThe L&D Head dissolved mid-sentence. The mood board slid off the page. The AR/VR headsets vanished. The Phishing Bomb quietly defused. A calm voice said 'you were always a developer.'\n\nBar hit 100%. You left. You've never felt this clean.",
        endingTitle: "THE NEO ID", endingTitleType: "secret",
        choices: [
            { text: "Re-enter the Matrix (Restart Shift)", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    },

    // ── BAD ENDING: THE MARTYR (went rogue) ──────────────────────────────────
    "rogue_export": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/3_4_rogue.jpg",
        text: "You published the clean build yourself and walked out to Eye of the Tiger. Full volume.\n\nFive stars. 94% completion. Unheard of. Three days as a hero.\n\nThen the L&D Head emailed you, your manager, his manager, and somehow Facilities. 'Creative Unilateralism: A Formal Concern.' They let you go.\n\nThe module still runs. Without you. Beautifully.",
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
        text: "5:28 PM.\n\nBar's at 99%. IT helpdesk closes at 6. I have 28 minutes. This is a company ThinkPad, 2017, asset tag L&D-049. Everyone in this building has the same one. There's a moth on the ceiling light. It's been there since 3 PM.\n\nDO NOT TOUCH ANYTHING.",
        isTrap: true, forceTime: 1048,
        variants: [
            {
                id: "returning-loading",
                conditions: ["playCount:>= 1"],
                text: "5:28 PM. Again.\n\nSame bar. Same moth. Same ThinkPad. You know what happens.\n\nDO NOT TOUCH ANYTHING."
            },
            {
                id: "greg-loading",
                conditions: ["visited:compromise"],
                text: "5:28 PM. Greg's in the package.\n\nGreg_padlock_security_195832.jpg, compiling quietly alongside every slide. 340KB of Manhattan watermark about to become Nashik compliance training.\n\nDO NOT TOUCH ANYTHING. Greg wouldn't."
            }
        ],
        choices: []
    },

    // ── BAD ENDING: FATAL ERROR ───────────────────────────────────────────────
    "crash": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/4_3_crash.jpg",
        text: "'Articulate Storyline has stopped responding.'\n\nAutoRecover saved one file. Module 3, Draft v1. Blank title slide on the default master. No variables. No layers. No Greg.\n\nYou touched it.",
        endingTitle: "FATAL ERROR",
        variants: [
            {
                id: "returning-crash",
                conditions: ["playCount:>= 1"],
                text: "Again.\n\nSame AutoRecover file. Module 3. Blank master. Greg didn't save. As far as Storyline's concerned, Greg was never real.\n\nYou knew. You touched it anyway."
            }
        ],
        choices: [
            { text: "Cry. Then restart.", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    },

    // ── THE TEAL BOMB ─────────────────────────────────────────────────────────
    "upload": {
        speaker: "Tarun", color: "var(--tarun-yellow)", textColor: "#000",
        image: "assets/images/4_2_upload.jpg",
        text: "PRIYA! Bar finished! Tiny thing.\n\nHe posted on LinkedIn this morning — 'Teal is the future of Trust™' — four thousand likes. A client commented. He CC'd the VP, the VP's PA, the HRBP, and the Global L&D Head in Singapore. He needs all 87 slides in teal before you leave.\n\nHe sent the hex code. The hex code is the word TEAL. No hash. No numbers. Just TEAL. The brand guide has Cerulean Blue, Muted Sage, and Leadership Gray. There is no teal.",
        variants: [
            {
                id: "high-quality-upload",
                conditions: ["quality:>= 80"],
                text: "PRIYA! Three five-star reviews in Review 360. I want you to know that before I say this.\n\nHe posted on LinkedIn. 'Teal is the future of Trust™.' Four thousand likes. A client commented. All 87 slides. Teal. Before you leave.\n\nThe hex code is the word TEAL. I checked the brand guide. Leadership Gray. No teal.\n\nSorry."
            }
        ],
        choices: [
            { text: "Recolour all 87 slides. By hand. Right now.", target: "martyr_office", timeCost: 90, qualityCost: -10,
              remember: true, rememberText: "Priya will remember this." },
            { text: "Bury Tarun in confident-sounding jargon.", target: "true_winner", timeCost: 0, qualityCost: 20 },
            { text: "Export as PowerPoint and email it. Done.", target: "ppt_promotion", timeCost: 0, qualityCost: -100 }
        ]
    },

    // ── BAD ENDING: JUST ANOTHER FRIDAY ──────────────────────────────────────
    "martyr_office": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/5_1_martyr.jpg", forceTime: 1120,
        text: "You recoloured 87 slides. By hand.\n\nSlides 23 to 31 used a master from 2018, builder long gone, layout locked. Rebuilt twice. Hand slipped on slide 34. Re-published at 11 PM.\n\nA Teams message: 'just checking in 😊'. You don't reply. The cleaner came, looked at you, and left without vacuuming your section.",
        endingTitle: "JUST ANOTHER FRIDAY",
        variants: [
            {
                id: "repeat-martyr",
                conditions: ["playCount:>= 2"],
                text: "87 slides. By hand. Again.\n\nThe cleaning crew go around your desk now like it's load-bearing. One left a Tupperware of water by your keyboard.\n\nThe 2018 master. Still locked. Slide 34. 11 PM. 'Just checking in 😊'\n\nYou know."
            }
        ],
        choices: [
            { text: "Restart Shift", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    },

    // ── BAD ENDING: THE CORPORATE SELLOUT ────────────────────────────────────
    "ppt_promotion": {
        speaker: "System", color: "var(--tarun-yellow)", textColor: "#000",
        image: "assets/images/6_1_ppt_promotion.jpg",
        text: "You renamed it InfoSec_Interactive_FINAL_v2_TEAL_APPROVED.pptx and emailed it. No message.\n\nHe replied in 38 seconds. EXACTLY THE TRANSFORMATIONAL ENERGY HE WANTED. Forwarded to the CEO. Subject: INNOVATION. His deck has 47 circles connected by arrows and a Wordle screenshot labelled 'Engagement Metric.' He calls it agile.\n\nBy Monday you're Global Head of Learning Experience Design. Parking spot.",
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
        text: "Actually, Tarun.\n\nUnder Kirkpatrick Level 4, brand colour changes require a Phase 2 evaluation cycle. I flagged this in the ADDIE review last sprint — it's in the handover doc. The cache auto-applies the brand token at midnight. Teal's already queued. You signed off on it. 11:14 PM. Sunday.\n\n(Every word of this is made up.)",
        choices: [ { text: "Watch Tarun absorb this information.", target: "victory_screen" } ]
    },

    // ── TRUE ENDING: THE SME WHISPERER ───────────────────────────────────────
    "victory_screen": {
        speaker: "System", color: "var(--success-green)", textColor: "#000",
        image: "assets/images/6_3_victory.jpg",
        text: "Tarun blinks. Eight full seconds.\n\n'The ADDIE review.' 'That's the one.' He nods. 'Superb alignment.'\n\nYou close the laptop. You defeated a grown man with a made-up evaluation framework. 5:28 PM. Out the door by 5:30. The moth dips once as you pass the light.",
        endingTitle: "THE SME WHISPERER", endingTitleType: "victory",
        variants: [
            {
                id: "veteran-victory",
                conditions: ["playCount:>= 2"],
                text: "'The ADDIE review.' 'That's the one.' You've said this before. You know how it lands.\n\n'Superb alignment.'\n\nYou close the laptop. Out the door. The moth dips. You nod back this time."
            }
        ],
        choices: [
            { text: "Play Again (Restart Shift)", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    },

    // ── BAD ENDING: GLORIOUS RAGE QUIT ───────────────────────────────────────
    "rage_quit": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/6_4_rage_quit.jpg",
        text: "Patience hits zero.\n\nYou close the laptop. Grab your bag. Look at Tarun. Look at the moth. The moth looks back. You both nod.\n\nUber arrives in 4 minutes. You open Glassdoor on your phone. Give 2 stars. Change it to 1. The car pulls away.",
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
        text: "It's past midnight.\n\nThe cleaning crew vacuums around your desk. They've stopped asking. You've become load-bearing furniture.\n\nThe bar is still at 99%. The moth hasn't moved. Neither have you.",
        endingTitle: "STILL HERE",
        choices: [
            { text: "Restart Shift", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    }
};
