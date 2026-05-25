const storyData = {

    // ── COLD OPEN — 5:28 PM ──────────────────────────────────────────────────
    "intro": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/1_1_bsod.jpg", forceTime: 1048,
        text: "Storyline's been publishing for fourteen minutes. I'm at 99%.\n\nI set my Teams to Away at 4:30. My body is still here, obviously. I haven't moved. I've barely blinked. I just need two more minutes and I can actually leave.\n\nI'm not touching the bar.",
        choices: [ { text: "Rewind to 4:45 PM →", target: "setup", timeCost: 0 } ],
        variants: [
            {
                id: "returning-player",
                conditions: ["playCount:>= 1"],
                text: "You're back. 5:28 again. Same bar at 99%, same everything.\n\nOkay. Rewind."
            },
            {
                id: "after-rogue",
                conditions: ["seenEnding:rogue_export"],
                text: "Oh, you're back. Last time you published the clean build yourself and walked out. I got a calendar invite called Quick Chat — that's what HR calls it when they want you to bring a box.\n\nThe module's still live. Five stars. I'm not there anymore. Rewind."
            },
            {
                id: "after-meta-escape",
                conditions: ["seenEnding:meta_escape"],
                text: "You removed him from the DOM last time. I was free for about six seconds before the loop reset.\n\nLet's try something else. Rewind."
            }
        ]
    },

    // ── FLASHBACK — 4:45 PM ──────────────────────────────────────────────────
    "setup": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/1_2_setup.jpg", forceTime: 1005,
        text: "4:45. Module's done. Like actually done — not 'draft two' done, not 'stakeholders haven't seen it yet' done. Done done.\n\nThe Synthesia avatar's not cutting off mid-word anymore. The branching works. I was going to be home by 5. I genuinely thought that.",
        choices: [
            { text: "Click 'Publish' and grab my coat.", target: "ambush", timeCost: 2 },
            { text: "Do one last QA pass. Just in case.", target: "ambush", timeCost: 5 }
        ]
    },

    // ── THE AMBUSH ───────────────────────────────────────────────────────────
    "ambush": {
        speaker: "Tarun", color: "var(--tarun-yellow)", textColor: "#000",
        image: "assets/images/2_1_ambush.jpg",
        text: "PRIYA — hey — do you have like two minutes?\n\nSo he saw a LinkedIn post. Guy called himself a Chief Learning Architect, which I don't think is a real job title, but. He wants the module to be more like Duolingo. For fire safety. He said 'learning ecosystem' and I wrote it down and I'm honestly not sure why I did that.",
        variants: [
            {
                id: "low-quality-ambush",
                conditions: ["quality:<= 40"],
                text: "PRIYA — quick one.\n\nHe looked at the module. Called it a 'solid first draft.' This is the final version. He wants it to be more like Duolingo. For fire safety.\n\nAre you okay? Like, actually."
            },
            {
                id: "repeat-ambush",
                conditions: ["playCount:>= 2"],
                text: "PRIYA. I know. I know.\n\nGamification, learning ecosystem, leaderboard, Duolingo. I don't write these posts. I just end up in these meetings.\n\nBlink if you need a minute."
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
        text: "Tarun. There's a bar above my head that says Patience and I can watch it going down while you're talking.\n\nI think I'm in a game. Which would explain a lot about today, honestly.\n\nJust — good options. That's all I'm asking.",
        choices: [
            { text: "Tarun: 'The UI is a metaphor, Priya. Focus on the deliverables.'", target: "aggressive", timeCost: 4, patienceCost: -40 }
        ]
    },

    // ── DIPLOMATIC PATH ──────────────────────────────────────────────────────
    "diplomatic": {
        speaker: "Tarun", color: "var(--tarun-yellow)", textColor: "#000",
        image: "assets/images/2_2_diplomatic.jpg",
        text: "So he wants an escape room. In the LMS. He's calling it an immersive learning journey. He printed a mood board — nine photos of padlocks and one picture of a safe that has IMMERSIVE JOURNEY NODE 1 written on it in red marker. I didn't write that. That was him.\n\nWe have three VR headsets, by the way. Two are dead. The third one makes Rajan from IT sick. I'm just saying all of this out loud.",
        choices: [
            { text: "Explain that Storyline is not a game engine.", target: "technical_pushback", timeCost: 10, patienceCost: -20 },
            { text: "Cave. Build the whole thing.", target: "compromise", timeCost: 40, qualityCost: -40, patienceCost: 15 }
        ]
    },

    // ── AGGRESSIVE PATH ──────────────────────────────────────────────────────
    "aggressive": {
        speaker: "Tarun", color: "var(--tarun-yellow)", textColor: "#000",
        image: "assets/images/2_3_aggressive.jpg",
        text: "Right, so 'engagement synergy' is — okay — it means the Next button is locked until the avatar finishes talking. Also, wrong answers should just correct themselves automatically. He's calling that psychological safety.\n\nI wrote it on a Post-it. It's on the server room door now. Facilities has called twice about it. It's staying.",
        variants: [
            {
                id: "ravi-hotspot-hint",
                conditions: ["playCount:>= 1"],
                text: "Also — I'm reading this directly from his email — he wants a hotspot on the female avatar. On her name badge. 'Clickable for curiosity, adds a human touch.'\n\nI typed it into the brief because I didn't know what else to do with it. I haven't slept well since."
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
        text: "Tarun, we're on SCORM 1.2. We've been on SCORM 1.2 since 2019 because Finance said no when I asked, and that was three managers ago. The LMS admin comes from Pune once a month. Half the plant floor is still on IE.\n\nIf I build this in Storyline, the LMS will throw an error that nobody on this team knows how to fix. I'm not being dramatic. I'm telling you what's actually there.",
        variants: [
            {
                id: "low-quality-pushback",
                conditions: ["quality:<= 30"],
                text: "Tarun. We've been on SCORM 1.2 since 2019 and the Quality bar above my head is almost empty.\n\nIf I lock the nav, people click through with the sound off and call it done. If I build the escape room, the LMS can't run it. I'm just telling you what's actually there."
            },
            {
                id: "both-paths-pushback",
                conditions: ["visited:diplomatic", "visited:aggressive"],
                text: "Escape room. Locked nav. Rajan gets sick from the headset. Snap-to-correct. SCORM 1.2. Pune admin. I've said all of it.\n\nIf he comes back with one more thing I'm uploading a PDF to SharePoint and I mean it this time."
            },
            {
                id: "hotspot-callout",
                conditions: ["visited:aggressive"],
                text: "Wait. The hotspot. On the female avatar. That's not a design request, Tarun.\n\nI'm writing that up and sending it to HR before I leave tonight. He can have all the followers he wants — it doesn't make it okay."
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
        text: "I found a padlock on Shutterstock for ten dollars. The guy in the photo is clearly in an American office — he's wearing a suit, there's a skyline, he's very New York — but it's a padlock, so.\n\nThe filename is Greg_padlock_security_195832.jpg. Greg is in the compliance module now. That's just where we are.",
        choices: [ { text: "Watch the publish bar and pray.", target: "loading_bar", timeCost: 6 } ]
    },

    // ── SECRET ENDING: THE NEO ID ─────────────────────────────────────────────
    "meta_escape": {
        speaker: "System", color: "var(--success-green)", textColor: "#000",
        image: "assets/images/5_2_winner.jpg",
        text: "You opened DevTools. Typed document.querySelector('#ldhead').remove(). Pressed Enter.\n\nHe just stopped existing. The mood board went with him. The VR headsets. The IMMERSIVE JOURNEY NODE 1 safe. About fifteen seconds later the bar hit 100%, like it had been waiting for permission.\n\nYou closed the laptop and left.",
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
        text: "You published the clean build yourself and walked out.\n\nThe module went live. Five stars on the first review, 94% completion — nobody finishes these things, that basically never happens. You were a minor hero for about three days.\n\nThen the L&D Head sent an email. Subject: Creative Unilateralism: A Formal Concern. CC'd your manager, his manager. He posted about it too. They let you go.\n\nThe module is still running.",
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
        text: "5:28. Bar's at 99%.\n\nCompany ThinkPad, 2017. Asset tag L&D-049. Everyone on this floor has the same one, and they're all doing this — the fan, the heat, the waiting. There's a moth on the tube light above the desk. It's been there since about 3.\n\nDon't touch anything.",
        isTrap: true, forceTime: 1048,
        variants: [
            {
                id: "returning-loading",
                conditions: ["playCount:>= 1"],
                text: "5:28. Again. Same bar, same moth.\n\nYou know what happens.\n\nDon't touch anything."
            },
            {
                id: "greg-loading",
                conditions: ["visited:compromise"],
                text: "5:28. Greg's in the package now.\n\nGreg_padlock_security_195832.jpg, compiling quietly alongside everything else. 340KB from a photo studio in Manhattan about to become mandatory training for a factory in Nashik.\n\nDon't touch anything. Greg can wait."
            }
        ],
        choices: []
    },

    // ── BAD ENDING: FATAL ERROR ───────────────────────────────────────────────
    "crash": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/4_3_crash.jpg",
        text: "You touched it.\n\nArticulate Storyline has stopped responding. AutoRecover saved one file — Module 3, Draft v1. Title slide. No layers, no variables, no Greg. Just 'Security Awareness Training' in Calibri on a white background.\n\nThat's what made it.",
        endingTitle: "FATAL ERROR",
        variants: [
            {
                id: "returning-crash",
                conditions: ["playCount:>= 1"],
                text: "You touched it again.\n\nModule 3, Draft v1. Title slide. Greg's gone — as far as Storyline's concerned, Greg was never real.\n\nYou knew this was going to happen."
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
        text: "PRIYA! It published, great news!\n\nOkay so — tiny thing — he posted on LinkedIn this morning. 'Teal is the future of Trust™.' Four thousand likes, a client saw it, and now he needs all 87 slides changed to teal before you leave tonight. He CC'd the VP, the VP's PA, the HRBP, and the Global L&D Head in Singapore.\n\nHe sent the colour code. It's the word TEAL. Not a hex code. Just the word. I checked the brand guide — Leadership Gray, Cerulean Blue, Muted Sage. No teal.",
        variants: [
            {
                id: "high-quality-upload",
                conditions: ["quality:>= 80"],
                text: "PRIYA! Three five-star reviews in Review 360 already, and I want you to know that before I say the next part.\n\nHe posted on LinkedIn. Teal. Four thousand likes. A client commented. All 87 slides, teal, before you leave. He CC'd basically everyone.\n\nThe colour code is the word TEAL. I checked the brand guide. Leadership Gray. No teal. I'm really sorry."
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
        text: "You did all 87 slides by hand.\n\nSlides 23 through 31 used a locked master template from 2018. The person who built it left the company years ago. You rebuilt those nine slides twice. Your hand slipped on 34 and you had to do it a third time. It published at 11 PM.\n\nSomeone sent a Teams message — 'just checking in 😊' — and you watched it come in. The cleaning guy looked at you for a second and vacuumed around your desk instead.",
        endingTitle: "JUST ANOTHER FRIDAY",
        variants: [
            {
                id: "repeat-martyr",
                conditions: ["playCount:>= 2"],
                text: "87 slides. By hand. Again.\n\nThe cleaning guy doesn't ask anymore — he just nods and works around you. Someone left a Tupperware of water near your keyboard at some point. You don't know who.\n\nSlide 34. The 2018 master. 11 PM. 'Just checking in 😊'. You already know."
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
        text: "You renamed it InfoSec_Interactive_FINAL_v2_TEAL_APPROVED.pptx and emailed it with no message.\n\nHe replied in 38 seconds. EXACTLY THE TRANSFORMATIONAL ENERGY HE WANTED. Forwarded it to the CEO — subject: INNOVATION — and posted about it. His own deck has forty-seven circles connected by arrows and a Wordle screenshot he's labelled 'Engagement Metric.' He calls the whole thing an agile pivot.\n\nBy Monday, you're Global Head of Learning Experience Design. You have a parking spot now.",
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
        text: "Tarun, actually — under Kirkpatrick Level 4, a brand colour change during an active evaluation cycle triggers a Phase 2 reset. I flagged this in the ADDIE review. It's in the handover doc. The LMS auto-applies the brand token at midnight, so teal is already queued. You signed off at 11:14 PM on a Sunday.\n\nShe looks at him. She made all of that up.",
        choices: [ { text: "Watch Tarun absorb this information.", target: "victory_screen" } ]
    },

    // ── TRUE ENDING: THE SME WHISPERER ───────────────────────────────────────
    "victory_screen": {
        speaker: "System", color: "var(--success-green)", textColor: "#000",
        image: "assets/images/6_3_victory.jpg",
        text: "'The ADDIE review.' 'That's the one.' He nods for a very long time. 'Superb alignment,' he says.\n\nYou close the laptop at 5:28 and you're out the door by 5:30. The moth on the tube light dips once as you walk past. You don't know why that makes you feel better, but it does.",
        endingTitle: "THE SME WHISPERER", endingTitleType: "victory",
        variants: [
            {
                id: "veteran-victory",
                conditions: ["playCount:>= 2"],
                text: "'The ADDIE review.' 'That's the one.' You've said this before. You know exactly how long he's going to nod.\n\nYou close the laptop. The moth dips once on your way out. You nod back this time."
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
        text: "It's midnight.\n\nThe cleaning crew's working around your desk. One of them has started just skipping your section — they nod when they come in and work around you like you're part of the furniture.\n\nThe bar's still at 99%.",
        endingTitle: "STILL HERE",
        choices: [
            { text: "Restart Shift", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    }
};
