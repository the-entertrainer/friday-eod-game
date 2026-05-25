const storyData = {
    "intro": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/1_1_bsod.jpg", forceTime: 1048,
        thoughtBubble: true,
        text: "5:28 PM. That bar's been at 99% for sixteen minutes.\n\nMaya texted — 'Mom we're at the lobby 😊' — Titanic 2: Return of Jack with his Dad Sparrow starts at 5:50. I have two minutes.\n\nNot. Touching. The bar.",
        choices: [ { text: "Rewind to 4:45 PM →", target: "setup", timeCost: 0 } ],
        variants: [
            {
                id: "returning-player",
                conditions: ["playCount:>= 1"],
                text: "Back again. Same bar. Same 99%. Same lobby.\n\nLet's see. Rewind."
            },
            {
                id: "after-rogue",
                conditions: ["seenEnding:rogue_export"],
                text: "Oh. You're back.\n\nLast time you went rogue and I got a calendar invite called Quick Chat — that's HR for 'bring a box.' Module's still live. Five stars. I'm not.\n\nRewind."
            },
            {
                id: "after-meta-escape",
                conditions: ["seenEnding:meta_escape"],
                text: "You deleted my boss out of the DOM last time. I was free for six seconds. Then the tickets re-booked themselves.\n\nRewind."
            }
        ]
    },

    "setup": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/1_2_setup.jpg", forceTime: 1005,
        thoughtBubble: true,
        text: "4:45 PM. Module's done. Actually done.\n\nOne click to publish. Out by five. Me and the kids are watching Titanic 2: Return of Jack with his Dad Sparrow tonight.\n\nI genuinely believed that.",
        choices: [
            { text: "Click 'Publish' and grab my coat.", target: "ambush", timeCost: 2 },
            { text: "Do one last QA pass. Just in case.", target: "ambush", timeCost: 5 }
        ]
    },

    "ambush": {
        speaker: "Tarun", color: "var(--tarun-yellow)", textColor: "#000",
        image: "assets/images/2_1_ambush.jpg",
        text: "PRIYA. Hey. Two minutes?\n\nSo. Ravi reviewed the module. Airport lounge. He wants fourteen more slides — password history, going back to cavemen. He sent a diagram of the rocks. He named one of them. The rock is called Mr. Cly End. He's already drafted the LinkedIn post.\n\nI'm just — yeah.",
        variants: [
            {
                id: "low-quality-ambush",
                conditions: ["quality:<= 40"],
                text: "PRIYA. Quick one.\n\nRavi reviewed the module. Fourteen slides of feedback. Cavemen, a rock named Mr. Cly End. He called it 'learning-adjacent.'\n\nAre you okay? No — actually."
            },
            {
                id: "repeat-ambush",
                conditions: ["playCount:>= 2"],
                text: "PRIYA. I know. I know.\n\nFourteen slides. Mr. Cly End. I just carry the rock from meeting to meeting. Ravi keeps saying 'cornerstone.' Flexed bicep emoji.\n\nBlink twice if you need anything."
            }
        ],
        choices: [
            { text: "Cite cognitive load. Gently.", target: "diplomatic", timeCost: 8, patienceCost: -12 },
            { text: "Ask what 'engagement synergy' actually means.", target: "aggressive", timeCost: 8, patienceCost: -18 },
            { text: "Look directly into the camera.", target: "meta_moment", timeCost: 4, patienceCost: -8 }
        ]
    },

    "meta_moment": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/2_4_kids.jpg",
        text: "Tarun. Stop.\n\nI can see the Patience bar draining above my head. I'm in a game. My kids are in a lobby right now.\n\nWhoever's playing this — good choices only. Please.",
        choices: [
            { text: "Tarun: 'The UI is a metaphor, Priya. Focus on the deliverables.'", target: "aggressive", timeCost: 4, patienceCost: -40 }
        ]
    },

    "diplomatic": {
        speaker: "Tarun", color: "var(--tarun-yellow)", textColor: "#000",
        image: "assets/images/2_2_diplomatic.jpg",
        text: "So Ravi watched a TED talk. On the flight.\n\nHe wants a 3D escape room. Staff defuse a Phishing Bomb. He's calling it a Netflix experience for compliance. He doesn't have Netflix — he calls it the internet television.\n\nHe printed a mood board. Nine padlock photos. One safe circled in red. Labelled: IMMERSIVE JOURNEY NODE 1.",
        choices: [
            { text: "Explain that Storyline is not a game engine.", target: "technical_pushback", timeCost: 10, patienceCost: -20 },
            { text: "Cave. Build the whole Phishing Bomb.", target: "compromise", timeCost: 40, qualityCost: -40, patienceCost: 15 }
        ]
    },

    "aggressive": {
        speaker: "Tarun", color: "var(--tarun-yellow)", textColor: "#000",
        image: "assets/images/2_3_aggressive.jpg",
        text: "So 'engagement synergy' means lock the Next button. The avatar breathes between sentences. He likes that.\n\nAlso — wrong answers should auto-correct to the right one. He's calling it psychological safety.\n\nI wrote it on a Post-it. It's on the server room door. Facilities called twice. It's staying.",
        variants: [
            {
                id: "ravi-hotspot-hint",
                conditions: ["playCount:>= 1"],
                text: "Also — verbatim from his email — he wants a hotspot on the female Synthesia avatar. Her name badge. 'Clickable for curiosity.'\n\nI didn't know what to do with it so I typed it into the brief.\n\nI haven't slept properly since."
            }
        ],
        choices: [
            { text: "Explain this deletes the entire point of an assessment.", target: "technical_pushback", timeCost: 8, patienceCost: -16 },
            { text: "Agree to simulate the illusion of learning.", target: "compromise", qualityCost: -50, timeCost: 20, patienceCost: 12 }
        ]
    },

    "technical_pushback": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/3_1_pushback.jpg",
        text: "Tarun. Lock the nav and people mute the tab and click Next till it ends. No one learns anything.\n\nBuild the escape room — the LMS throws a SCORM error from 2009. Half our staff can't render a rounded corner, let alone Ravi's jaw.\n\nBas. 5:50 movie. Begging you.",
        variants: [
            {
                id: "low-quality-pushback",
                conditions: ["quality:<= 30"],
                text: "Tarun. Look at my face.\n\nThe Quality bar is almost gone. Running on spite and a Teams thread nobody's replied to since November.\n\nThe pushback is all I have. Let me have it."
            },
            {
                id: "both-paths-pushback",
                conditions: ["visited:diplomatic", "visited:aggressive"],
                text: "Escape room. Locked nav. Breathing avatar. Snap-to-correct. I've heard everything, Tarun.\n\nThe LMS rejects 3D output. Old browsers can't load it.\n\nOne more thing and I'm putting a PDF on SharePoint. Don't make me say SharePoint."
            },
            {
                id: "hotspot-callout",
                conditions: ["visited:aggressive"],
                text: "Wait. Back up.\n\nSnap-to-correct means wrong answers become right. Completion rate looks great. Phishing rate also looks great.\n\nBut the hotspot. On the female avatar. 'Clickable for curiosity' is not a UX note, Tarun. I'm writing that up tonight, before I leave. That's done."
            }
        ],
        choices: [
            { text: "Tarun: 'Fine. Just add a stock photo of someone high-fiving a server.'", target: "loading_bar", qualityCost: -20, timeCost: 6, patienceCost: 8 },
            { text: "Publish the clean version anyway. Go rogue.", target: "rogue_export", qualityCost: 10, patienceCost: -55,
              remember: true, rememberText: "The system has logged this decision." },
            { text: "[Console] Open DevTools. Delete Ravi from the page.", target: "meta_escape", timeCost: 0, qualityCost: 100, patienceCost: 100 }
        ]
    },

    "compromise": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/3_3_compromise.jpg",
        text: "My soul's left my body.\n\nAdding hotspots to a 2009 stock padlock. Watermark's across the model's face. Standard licence — stays. Filename: Greg_padlock_security_195832.jpg.\n\nGreg is in the module now. Greg is compliance training. Greg didn't ask.",
        choices: [ { text: "Watch the publish bar and pray.", target: "loading_bar", timeCost: 6 } ]
    },

    "meta_escape": {
        speaker: "System", color: "var(--success-green)", textColor: "#000",
        image: "assets/images/5_2_winner.jpg",
        text: "You opened DevTools. Typed document.querySelector('#ravi').remove(). Hit Enter.\n\nRavi dissolved into Comic Sans. The mood board slid off. Mr. Cly End blinked out. The Phishing Bomb defused.\n\nBar hit 100%. You made the movie. You've never felt this clean.",
        endingTitle: "THE NEO ID", endingTitleType: "secret",
        choices: [
            { text: "Re-enter the Matrix (Restart Shift)", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    },

    "rogue_export": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/3_4_rogue.jpg",
        text: "You published the clean build and walked out to Eye of the Tiger. Full volume.\n\nFive stars. 94% completion. Three days as a hero.\n\nThen Ravi emailed you, your manager, his manager, and somehow Facilities. 'Creative Unilateralism: A Formal Concern.' Then he posted about it. They let you go.\n\nThe module still runs. Without you. Beautifully.",
        endingTitle: "THE MARTYR",
        choices: [
            { text: "Restart Shift", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    },

    "loading_bar": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/4_1_loading.jpg",
        text: "5:28 PM.\n\nBar's at 99%. Sixteen minutes. Laptop fan sounds like a small plane taking off. There's a moth on the ceiling light — been there since 3 PM.\n\nDO NOT TOUCH ANYTHING.",
        isTrap: true, forceTime: 1048,
        variants: [
            {
                id: "returning-loading",
                conditions: ["playCount:>= 1"],
                text: "5:28 PM. Again.\n\nSame bar. Same moth. You know what happens.\n\nDO NOT TOUCH ANYTHING."
            },
            {
                id: "greg-loading",
                conditions: ["visited:compromise"],
                text: "5:28 PM. Greg's in the package.\n\nGreg_padlock_security_195832.jpg, compiling quietly. 340KB JPEG about to become compliance training.\n\nDO NOT TOUCH ANYTHING. Greg wouldn't."
            }
        ],
        choices: []
    },

    "crash": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/4_3_crash.jpg",
        text: "You touched it.\n\n'Articulate Storyline has stopped responding.' AutoRecover saved one file. Module 3, Draft v1. Blank title slide. No variables. No Greg. No Mr. Cly End.\n\nPhone's buzzing. It's the kids. You let it ring.",
        endingTitle: "FATAL ERROR",
        variants: [
            {
                id: "returning-crash",
                conditions: ["playCount:>= 1"],
                text: "Again.\n\nSame file. Module 3. Blank master. Mr. Cly End didn't save. As far as Storyline's concerned, never real.\n\nPhone's ringing. You know who."
            }
        ],
        choices: [
            { text: "Cry. Then restart.", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    },

    "upload": {
        speaker: "Tarun", color: "var(--tarun-yellow)", textColor: "#000",
        image: "assets/images/4_2_upload.jpg",
        text: "PRIYA! Tiny thing.\n\nRavi posted — 'Teal is the future of Trust™' — four thousand likes. A client commented. He needs all 87 slides switched to teal and re-published before you leave.\n\nHe sent the hex code. The hex code is the word TEAL. No hash. No numbers. Just TEAL.",
        variants: [
            {
                id: "high-quality-upload",
                conditions: ["quality:>= 80"],
                text: "PRIYA! The module has three five-star reviews. I want you to know that before I say this.\n\nRavi. LinkedIn. 'Teal is the future of Trust™.' A client commented. All 87 slides. Teal. Before you leave.\n\nThe hex code is the word TEAL. I checked the brand guide. There's no teal.\n\nSorry."
            }
        ],
        choices: [
            { text: "Recolour all 87 slides. By hand. Right now.", target: "martyr_office", timeCost: 90, qualityCost: -10,
              remember: true, rememberText: "Priya will remember this." },
            { text: "Bury Tarun in confident-sounding nonsense.", target: "true_winner", timeCost: 0, qualityCost: 20 },
            { text: "Export it as a PowerPoint and email it. Done.", target: "ppt_promotion", timeCost: 0, qualityCost: -100 }
        ]
    },

    "martyr_office": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/5_1_martyr.jpg", forceTime: 1120,
        text: "You recoloured 87 slides. By hand.\n\nSlides 23 to 31 — master from 2018, builder long gone, layout locked. Rebuilt twice. Hand slipped on slide 34. Re-published at 6:40 PM.\n\nGranny sent three photos. Both kids laughing, iceberg in a top hat. 'They had a BLAST 💙'\n\nBlue heart. Not even teal.",
        endingTitle: "JUST ANOTHER FRIDAY",
        variants: [
            {
                id: "repeat-martyr",
                conditions: ["playCount:>= 2"],
                text: "87 slides. By hand. Again.\n\nThe cleaning crew go around your desk now. One left a Tupperware of water by your keyboard.\n\nThe 2018 master. Still locked. Slides 23 to 31. Twice. Slide 34. 6:40 PM. The blue heart.\n\nYou know."
            }
        ],
        choices: [
            { text: "Restart Shift", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    },

    "ppt_promotion": {
        speaker: "System", color: "var(--tarun-yellow)", textColor: "#000",
        image: "assets/images/6_1_ppt_promotion.jpg",
        text: "You renamed it InfoSec_Interactive_FINAL_v2_TEAL_APPROVED.pptx and emailed it. No message.\n\nRavi replied in 38 seconds. EXACTLY THE TRANSFORMATIONAL ENERGY HE WANTED. Forwarded to the CEO. Subject: INNOVATION.\n\nBy Monday you're Global Head of Learning Experience Design. Parking spot. You caught the 5:50 show. Cried at the iceberg.",
        endingTitle: "THE CORPORATE SELLOUT",
        choices: [
            { text: "Restart Shift", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    },

    "true_winner": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/6_2_true_winner.jpg",
        text: "Actually, Tarun.\n\nThe LMS theme doesn't store a colour. It stores a brand token. At midnight the cache repaints every module to the live brand token automatically. Teal's already queued. You approved it — Sprint 6 Summary, 11:14 PM on a Sunday. Thumbs up.\n\n(Every word of this is made up.)",
        choices: [ { text: "Watch Tarun absorb this information.", target: "victory_screen" } ]
    },

    "victory_screen": {
        speaker: "System", color: "var(--success-green)", textColor: "#000",
        image: "assets/images/6_3_victory.jpg",
        text: "Tarun blinks. Eight full seconds.\n\n'Sprint 6.' 'The token one.' 'That's the one.' He nods. 'Superb alignment.'\n\nYou close the laptop. 5:28. Out the door by 5:30. 5:50 show. Maya cries at the iceberg. You cry at Maya crying. The moth dips once as you pass the light.",
        endingTitle: "THE SME WHISPERER", endingTitleType: "victory",
        variants: [
            {
                id: "veteran-victory",
                conditions: ["playCount:>= 2"],
                text: "'Sprint 6.' 'The token one.' You've said this before. You know how it lands.\n\n'Superb alignment.'\n\nYou close the laptop. You make the movie. The moth dips. You nod back this time."
            }
        ],
        choices: [
            { text: "Play Again (Restart Shift)", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    },

    "rage_quit": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/6_4_rage_quit.jpg",
        text: "Patience hits zero.\n\nYou close the laptop. Grab your bag. Look at Tarun. At the moth. The moth looks back. You both nod.\n\nFour Teams pings before the lift. Last one says 're: the teal.' You archive the channel without opening it.\n\nYou make the 5:50 show. Maya saved you the aisle seat. You don't check your phone once.",
        endingTitle: "GLORIOUS RAGE QUIT",
        choices: [
            { text: "Restart Shift", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    },

    "martyr": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/6_5_martyr.jpg",
        text: "Past 6 PM.\n\nMovie started at 5:50. Granny took the kids — she sent a photo from the good seats. Both of them laughing. Iceberg in a top hat.\n\n'Don't worry, we got you a slushie 💙'\n\nBlue. The bar's still at 99%. The moth hasn't moved. Neither have you.",
        endingTitle: "MISSED THE MOVIE", forceTime: 1080,
        choices: [
            { text: "Restart Shift", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    }
};
