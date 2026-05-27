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
        text: "The e-learning software has been sitting at 99% for fourteen minutes. Fourteen.\n\nMy company ThinkPad (Asset Tag L&D-049) is gasping for air like an old diesel engine climbing a hill in July. Teams says my status is 'Away', but I haven't moved an inch.",
        choices: [ { text: "Next →", target: "intro_2", timeCost: 0 } ]
    },

    "intro_2": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/1_1_bsod.jpg",
        monologue: true,
        cutaway: "friday_eod_dragon",
        spotlight: "my boss wakes up from his weekly coma, reads a trending post on LinkedIn, and suddenly remembers he's a manager.",
        text: "If this loading bar crashes, my weekend is officially dead.\n\nTwo more minutes and I'm done. That's all I need. But it's Friday. And every single Friday, at exactly 5:00 PM, my boss wakes up from his weekly coma, reads a trending post on LinkedIn, and suddenly remembers he's a manager.",
        choices: [ { text: "Rewind to 4:45 PM →", target: "setup", timeCost: 0 } ]
    },

    // ── FLASHBACK — 4:45 PM ──────────────────────────────────────────────────
    "setup": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/1_2_setup.jpg", forceTime: 1005,
        cutaway: "synthesia_glitch",
        spotlight: "only glitched once on the fire safety slide—poking his own nose for three full seconds, straight to camera.",
        text: "4:45 PM. The module was actually done. Not 'draft two' done. Done done.\n\nThe AI-generated presenter we use for the training video only glitched once on the fire safety slide—poking his own nose for three full seconds, straight to camera. The clip is still in the review folder. We don't discuss it.\n\nI genuinely believed I was going to be home by five.",
        choices: [
            { text: "Hit Publish. Leave.", target: "ambush", timeCost: 2 },
            { text: "One last QA pass.", target: "ambush", timeCost: 5 }
        ]
    },

    // ── THE AMBUSH ───────────────────────────────────────────────────────────
    "ambush": {
        speaker: "Tarun", color: "var(--tarun-yellow)", textColor: "#000",
        image: "assets/images/2_1_ambush.jpg",
        cutaway: "tarun_nightmare",
        spotlight: "Why can't we make this Fire Safety module more like an Impact Ecosystem™?",
        text: "PRIYA — hey — do you have two minutes? Please.\n\nListen, I was just reading this article by a Global Chief Evangelist. Matlab, mind blown, bro. We need to completely sunset this linear architecture. Why can't we make this Fire Safety module more like an Impact Ecosystem™?",
        choices: [ { text: "Next →", target: "ambush_2", timeCost: 0 } ]
    },

    "ambush_2": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/2_1_ambush.jpg",
        monologue: true,
        text: "Let me translate that from Manager-Speak.\n\nHe saw a LinkedIn post from an influencer with 200k followers. Now he wants to turn our boring 10-minute fire safety slideshow into Duolingo. Complete with a passive-aggressive cartoon owl threatening factory workers if they don't click a fire extinguisher fast enough.",
        choices: [
            { text: "Push back politely.", target: "diplomatic", timeCost: 8, patienceCost: -12 },
            { text: "Call his bluff.", target: "aggressive", timeCost: 8, patienceCost: -18 },
            { text: "Break the fourth wall.", target: "meta_moment", timeCost: 4, patienceCost: -8 }
        ]
    },

    // ── PAUSE ─────────────────────────────────────────────────────────────────
    "meta_moment": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/2_4_kids.jpg",
        text: "I break character for a second and look straight at the screen. Yes, I'm talking to you—the person clicking the choices in this game.\n\nPlease. Just make good choices. My weekend plans are entirely in your hands.",
        choices: [ { text: "Next →", target: "meta_moment_2", timeCost: 0 } ]
    },

    "meta_moment_2": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/2_4_kids.jpg",
        text: "Right. Back to reality. Tarun is still staring at me, waiting for an answer.",
        choices: [
            { text: "Hear him out.", target: "aggressive", timeCost: 4, patienceCost: -40 }
        ]
    },

    // ── DIPLOMATIC PATH ──────────────────────────────────────────────────────
    "diplomatic": {
        speaker: "Tarun", color: "var(--tarun-yellow)", textColor: "#000",
        image: "assets/images/2_2_diplomatic.jpg",
        text: "So basically, I want an 'Escape Room' experience! I printed a mood board — nine stock photos of rusty padlocks and a digital safe with IMMERSIVE JOURNEY NODE 1 written on it in red marker. Let's make it like an IPL dashboard! High energy!",
        choices: [ { text: "Next →", target: "diplomatic_2", timeCost: 0 } ]
    },

    "diplomatic_2": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/2_2_diplomatic.jpg",
        monologue: true,
        text: "Translation: He wants me to build a digital maze that will completely crash the client's ancient HR portal, which runs on a local Gurgaon server held together by rubber bands and prayers.\n\nAlso, we have exactly two VR headsets in the entire cabinet. One is missing a lens, and the other is waiting on a gatepass approval from Rajan in IT since last August.",
        choices: [
            { text: "Explain the tech limits.", target: "technical_pushback", timeCost: 10, patienceCost: -20 },
            { text: "Surrender. Build it.", target: "compromise", timeCost: 40, qualityCost: -40, patienceCost: 15 }
        ]
    },

    // ── AGGRESSIVE PATH ──────────────────────────────────────────────────────
    "aggressive": {
        speaker: "Tarun", color: "var(--tarun-yellow)", textColor: "#000",
        image: "assets/images/2_3_aggressive.jpg",
        text: "So 'engagement synergy' means we need to foster psychological safety. Let's lock the 'Next' button until the avatar finishes talking completely. And wrong answers should correct themselves automatically. Ho jayega na? Superb!",
        choices: [ { text: "Next →", target: "aggressive_2", timeCost: 0 } ]
    },

    "aggressive_2": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/2_3_aggressive.jpg",
        monologue: true,
        text: "Translation: He wants to lock the screen so grown adults on the factory floor are legally forced to sit and watch an AI puppet slowly read text out loud. It's corporate waterboarding.",
        choices: [
            { text: "Argue the pedagogy.", target: "technical_pushback", timeCost: 8, patienceCost: -16 },
            { text: "Cave in. Build it.", target: "compromise", qualityCost: -50, timeCost: 20, patienceCost: 12 }
        ]
    },

    // ── THE PUSHBACK ─────────────────────────────────────────────────────────
    "technical_pushback": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/3_1_pushback.jpg",
        cutaway: "storyline_preview",
        spotlight: "By the time it loads, I could watch a snail complete his PhD.",
        text: "I looked at him. 'Tarun, the client's backend was built during the dot-com bubble. Half their plant floor is still running Internet Explorer. If I upload a heavy game file, it will crash their entire HR portal.'\n\nI'm not being dramatic. I'm just telling him what's actually there. By the time it loads, I could watch a snail complete his PhD.",
        choices: [
            { text: "Accept a dumb compromise.", target: "loading_bar", qualityCost: -20, timeCost: 6, patienceCost: 8 },
            { text: "Go rogue. Publish.", target: "rogue_export", qualityCost: 10, patienceCost: -55 },
            { text: "Email clients directly.", target: "meta_escape", timeCost: 0, qualityCost: 15, patienceCost: 50 }
        ]
    },

    // ── THE CAVE ─────────────────────────────────────────────────────────────
    "compromise": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/3_3_compromise.jpg",
        text: "I surrendered. I found a padlock on Shutterstock. Ten dollars. The guy in the photo is clearly in an American office — he's in a suit, there's a skyline, he's very New York.\n\nHis name is Greg. Greg is now representing a digital padlock for the client's compliance learners in Gurgaon. That's just where we are in life.",
        choices: [ { text: "Watch and pray.", target: "loading_bar", timeCost: 6 } ]
    },

    // ── SECRET ENDING: THE CLEAN EXIT ────────────────────────────────────────
    "meta_escape": {
        speaker: "System", color: "var(--success-green)", textColor: "#000",
        image: "assets/images/5_2_winner.jpg",
        text: "You bypassed Tarun completely. You opened a new email, attached the raw file, and sent it directly to the clients. Subject: Final Approved Module.\n\nYou hit send at 5:31 PM.\n\nTarun replied in forty seconds with three question marks. You had already left the building.",
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
        text: "You published the clean build yourself and walked out.\n\nThe module went live. Five stars on the first review, 94% completion — nobody gets that. You were a minor hero for about three days.\n\nThen the clients sent an email. Subject: Creative Unilateralism: A Formal Concern. Management let you go. The module is still running.",
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
        text: "5:28 PM. The bar is at 99%.\n\nCompany ThinkPad Asset tag L&D-049 is vibrating. There's a moth on the tube light above Priya's desk. It's been there since about three.\n\nDon't touch anything.",
        isTrap: true, forceTime: 1048,
        choices: []
    },

    // ── BAD ENDING: FATAL ERROR ───────────────────────────────────────────────
    "crash": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/4_3_crash.jpg",
        text: "You touched it.\n\nThe software has stopped responding. AutoRecover saved exactly one file — Draft v1. Title slide. No variables, no videos, no Greg. Just 'Security Awareness Training' in Calibri on a white background.\n\nYour weekend is over.",
        endingTitle: "FATAL ERROR",
        choices: [
            { text: "Cry. Restart.", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    },

    // ── THE TEAL BOMB ─────────────────────────────────────────────────────────
    "upload": {
        speaker: "Tarun", color: "var(--tarun-yellow)", textColor: "#000",
        image: "assets/images/4_2_upload.jpg",
        text: "PRIYA! It published, great news!\n\nOkay so — tiny thing — the client posted on LinkedIn this morning. 'Teal is the future of Trust™.' So I need you to change all 87 slides to teal before you leave tonight. I CC'd the clients!",
        choices: [ { text: "Next →", target: "upload_2", timeCost: 0 } ]
    },

    "upload_2": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/4_2_upload.jpg",
        monologue: true,
        text: "I checked the email. They sent the color code. It was literally just the word TEAL. Not a hex code. Just the word.\n\nI checked the brand guide — Leadership Gray, Cerulean Blue, Muted Sage. There is no teal anywhere.",
        choices: [
            { text: "Recolour by hand.", target: "martyr_office", timeCost: 90, qualityCost: -10 },
            { text: "Gaslight him.", target: "true_winner", timeCost: 0, qualityCost: 20 },
            { text: "Export as PPT.", target: "ppt_promotion", timeCost: 0, qualityCost: -100 }
        ]
    },

    // ── BAD ENDING: JUST ANOTHER FRIDAY ──────────────────────────────────────
    "martyr_office": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/5_1_martyr.jpg", forceTime: 1120,
        text: "87 slides. By hand. All of them.\n\nSlides 23 through 31 used a locked master template from 2018. You rebuilt those nine slides twice. It published at 11 PM.\n\nSomeone sent a Teams message — 'just checking in 😊' — and you watched it come in. The cleaner looked at you and vacuumed around your desk instead.",
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
        text: "You gave up. You exported the entire thing as a flat PowerPoint, named it Innovation_Hub.pptx, and emailed it to the clients with no message.\n\nTarun replied in 38 seconds: EXACTLY THE TRANSFORMATIONAL ENERGY HE WANTED. He calls the whole thing an 'agile pivot.'\n\nBy Monday, you are promoted to Global Head of LXD. Parking spot and everything.",
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
        text: "I looked him dead in the eye and said, 'Tarun, actually, under the National Corporate Synergy Act, altering a hue-matrix during an active evaluation cycle automatically voids the client's ISO compliance. The brand token auto-applies at midnight.'\n\nI made every single word of that up.",
        choices: [ { text: "Watch him process this.", target: "victory_screen" } ]
    },

    // ── TRUE ENDING: THE SME WHISPERER ───────────────────────────────────────
    "victory_screen": {
        speaker: "System", color: "var(--success-green)", textColor: "#000",
        image: "assets/images/6_3_victory.jpg",
        forceTime: 1050,
        text: "Tarun nodded for a very long time, absolutely terrified to admit he didn't know what any of that meant. 'Superb alignment,' he said.\n\nPriya closed the laptop at 5:28. Out the door by 5:30. The moth on the tube light dipped once as she walked past. You don't know why that made you feel better, but it did.",
        endingTitle: "THE SME WHISPERER", endingTitleType: "victory",
        choices: [
            { text: "Play Again", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    },

    // ── BAD ENDING: GLORIOUS RAGE QUIT ───────────────────────────────────────
    "rage_quit": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/6_4_rage_quit.jpg",
        text: "Patience hits zero.\n\nYou close the laptop very carefully, which somehow feels worse than slamming it. Grab your bag. Tarun's about to say something on your way out. You don't stop.\n\nThe Uber is four minutes away. You open Glassdoor. One star.",
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
        text: "It's midnight.\n\nThe cleaning crew is working around your desk. One of them has started skipping your section entirely — they nod when they come in and work around you like you're load-bearing furniture.\n\nThe bar is still at 99%.",
        endingTitle: "STILL HERE",
        choices: [
            { text: "Restart Shift", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    }
};
