const storyData = {
    // ── COLD OPEN — 5:28 PM ──
    "intro": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/1_1_bsod.jpg", forceTime: 1048,
        thoughtBubble: true,
        text: "5:28 PM.\n\nThat bar has been at 99% for sixteen minutes. Two minutes to leave. Ten-minute drive. The kids are at the lobby right now — they booked tickets to Titanic 2: Return of Jack with his Dad Sparrow. Non-refundable.\n\nI am not touching this bar. Let me walk you back.",
        choices: [ { text: "Rewind to 4:45 PM →", target: "setup", timeCost: 0 } ],
        variants: [
            {
                id: "returning-player",
                conditions: ["playCount:>= 1"],
                text: "Back again. 5:28 PM. Same bar, same 99%, same kids in a lobby with non-refundable tickets. Let's see if we do better this time. Or worse. I honestly don't know you yet. Rewind."
            },
            {
                id: "after-rogue",
                conditions: ["seenEnding:rogue_export"],
                text: "Oh. You're back. Last time you published the clean build behind everyone's back and I got a calendar invite called \"Quick Chat.\" That's HR for \"bring a box.\" The module's still live. Five stars. I am not. Anyway — 5:28 PM. Rewind."
            },
            {
                id: "after-meta-escape",
                conditions: ["seenEnding:meta_escape"],
                text: "You deleted my boss out of the DOM last time. I was free for about six seconds. Then the loop reset and the tickets re-booked themselves. Let's not do that again. Or do. I've stopped having opinions. Rewind."
            }
        ]
    },

    // ── FLASHBACK — 4:45 PM ──
    "setup": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/1_2_setup.jpg", forceTime: 1005,
        thoughtBubble: true,
        text: "4:45 PM. Finally, the module's done. Actually done.\n\nJust one click to publish. I'll be out by five, easy. Me and the kids are definitely watching Titanic 2: Return of Jack with his Dad Sparrow tonight…",
        choices: [
            { text: "Click 'Publish' and grab my coat.", target: "ambush", timeCost: 2 },
            { text: "Do one last QA pass. Just in case.", target: "ambush", timeCost: 5 }
        ]
    },

    // ── THE AMBUSH ──
    "ambush": {
        speaker: "Tarun", color: "var(--tarun-yellow)", textColor: "#000",
        image: "assets/images/2_1_ambush.jpg",
        text: "PRIYA! Got two minutes?\n\nSo — Superboss LinkedIn Ravi reviewed the module. From the airport lounge. He wants fourteen more slides. On password history. Starting from the actual cavemen who scratched the first passwords into rocks.\n\nHe drew a diagram. Of the rocks. He named the lead rock Mr. Cly End. He's already drafted his LinkedIn post about Mr. Cly End. I'm just the messenger, okay?",
        variants: [
            {
                id: "low-quality-ambush",
                conditions: ["quality:<= 40"],
                text: "PRIYA! Quick one.\n\nRavi reviewed the module. From the airport. Fourteen slides of feedback. Cavemen, a rock named Mr. Cly End, the whole saga. He called the current version \"learning-adjacent.\" I think that's a compliment? Hard to tell.\n\nAre you okay? You don't have to answer. But — are you. Genuinely."
            },
            {
                id: "repeat-ambush",
                conditions: ["playCount:>= 2"],
                text: "PRIYA. I know. I KNOW you know.\n\nThe fourteen slides. Mr. Cly End the rock. Look — I don't own the rock content. It's above my pay grade. I just carry Mr. Cly End from meeting to meeting. Ravi's emotionally invested. Keeps saying \"cornerstone\" and posting a flexed-bicep emoji.\n\nHow are you holding up. For real. Blink twice."
            }
        ],
        choices: [
            { text: "Cite cognitive load. Gently.", target: "diplomatic", timeCost: 8, patienceCost: -12 },
            { text: "Ask what 'engagement synergy' actually means.", target: "aggressive", timeCost: 8, patienceCost: -18 },
            { text: "Look directly into the camera.", target: "meta_moment", timeCost: 4, patienceCost: -8 }
        ]
    },

    // ── FOURTH WALL ──
    "meta_moment": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/2_4_kids.jpg",
        text: "Tarun. Stop.\n\nThere's a bar above my head called Patience and I can watch it drain in real time. I'm pretty sure I'm in a game right now. Someone is tapping through the worst Friday of my life for fun.\n\nMy kids are in a lobby with non-refundable movie tickets. Whoever's playing this — pick the good options. I'm asking nicely. I'm asking once.",
        choices: [
            { text: "Tarun: 'The UI is a metaphor, Priya. Focus on the deliverables.'", target: "aggressive", timeCost: 4, patienceCost: -40 }
        ]
    },

    // ── DIPLOMATIC PATH ──
    "diplomatic": {
        speaker: "Tarun", color: "var(--tarun-yellow)", textColor: "#000",
        image: "assets/images/2_2_diplomatic.jpg",
        text: "So Ravi watched a TED talk. On the flight.\n\nHe wants a 3D escape room where staff defuse a Phishing Bomb. He's calling it \"a Netflix experience for compliance.\" Bhai, he doesn't even have Netflix — he calls it \"the internet television.\"\n\nHe wants a Synthesia avatar of himself. Younger. More jaw. He printed a mood board: nine padlock photos and one safe circled in red, labelled IMMERSIVE JOURNEY NODE 1.\n\nI could not make this up.",
        choices: [
            { text: "Explain that Storyline is not a game engine.", target: "technical_pushback", timeCost: 10, patienceCost: -20 },
            { text: "Cave. Build the whole Phishing Bomb.", target: "compromise", timeCost: 40, qualityCost: -40, patienceCost: 15 }
        ]
    },

    // ── AGGRESSIVE PATH ──
    "aggressive": {
        speaker: "Tarun", color: "var(--tarun-yellow)", textColor: "#000",
        image: "assets/images/2_3_aggressive.jpg",
        text: "So \"engagement synergy\" means —\n\nLock the Next button until the avatar finishes talking. The avatar breathes between sentences. He likes that. It calms him.\n\nAlso, when someone gets a drag-and-drop wrong? It should auto-correct to the right answer. He's calling that \"psychological safety.\" I wrote it on a Post-it. The Post-it says \"outcome-positive gamification.\" It's on the server room door. Facilities called twice. It's staying up.",
        variants: [
            {
                id: "ravi-hotspot-hint",
                conditions: ["playCount:>= 1"],
                text: "Also — reading verbatim from his email here — he wants a hotspot on the female Synthesia avatar. On her name badge. \"Clickable for curiosity, adds a human touch.\"\n\nI've re-read it eleven times. I typed it into the brief because I didn't know what else to do with it. I haven't slept well since."
            }
        ],
        choices: [
            { text: "Explain this deletes the entire point of an assessment.", target: "technical_pushback", timeCost: 8, patienceCost: -16 },
            { text: "Agree to simulate the illusion of learning.", target: "compromise", qualityCost: -50, timeCost: 20, patienceCost: 12 }
        ]
    },

    // ── THE PUSHBACK ──
    "technical_pushback": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/3_1_pushback.jpg",
        text: "Tarun. Listen to me.\n\nLock the nav — people mute the tab and spam Next until it ends. Nobody learns anything. Build a 3D escape room — the LMS throws a SCORM error older than I am. Half our staff can't render a rounded corner, let alone Ravi's jaw.\n\nBas. I have a 5:50 movie. I am begging you.",
        variants: [
            {
                id: "low-quality-pushback",
                conditions: ["quality:<= 30"],
                text: "Tarun. Look at my face.\n\nThe Quality bar above my head is almost gone. I can feel it going. Running on spite and a Teams thread nobody's replied to since November. Lock the nav — we ship an expensive audio file. Build the escape room — the LMS files a noise complaint.\n\nThe pushback is all I have left. Let me have it."
            },
            {
                id: "both-paths-pushback",
                conditions: ["visited:diplomatic", "visited:aggressive"],
                text: "Escape room. Locked nav. Breathing avatar. Snap-to-correct drag-and-drop. I've heard every version, Tarun.\n\nThe LMS rejects 3D Storyline output. Old browsers can't load it. I am one email away from putting a PDF on SharePoint and calling it a day.\n\nDon't make me say the SharePoint thing. I will say it."
            },
            {
                id: "hotspot-callout",
                conditions: ["visited:aggressive"],
                text: "Wait. Back up.\n\nSnap-to-correct means nobody learns anything — you're just teaching people that wrong answers are fine because the system fixes it for them. The completion numbers look great. The actual phishing rate? Also great.\n\nBut the hotspot, Tarun. On the female avatar. \"Clickable for curiosity.\" That is not a UX request. That is a senior leader misusing his position. I am not building it. I'm writing it up and sending it to HR before I leave tonight. If Superboss LinkedIn Ravi thinks his follower count makes that okay — he is about to find out it does not."
            }
        ],
        choices: [
            { text: "Tarun: 'Fine. Just add a stock photo of someone high-fiving a server.'", target: "loading_bar", qualityCost: -20, timeCost: 6, patienceCost: 8 },
            { text: "Publish the clean version anyway. Go rogue.", target: "rogue_export", qualityCost: 10, patienceCost: -55,
              remember: true, rememberText: "The system has logged this decision." },
            { text: "[Console] Open DevTools. Delete Ravi from the page.", target: "meta_escape", timeCost: 0, qualityCost: 100, patienceCost: 100 }
        ]
    },

    // ── THE CAVE ──
    "compromise": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/3_3_compromise.jpg",
        text: "My soul has left my body.\n\nI'm putting invisible hotspots on a 2009 stock padlock. The watermark runs straight across the model's face. Filename: Greg_padlock_security_195832.jpg. Standard licence — watermark stays.\n\nGreg is in the module now. Greg is mandatory compliance training. Greg did not ask for any of this. Greg is, honestly, handling it better than me.",
        choices: [ { text: "Watch the publish bar and pray.", target: "loading_bar", timeCost: 6 } ]
    },

    // ── SECRET ENDING: THE NEO ID ──
    "meta_escape": {
        speaker: "System", color: "var(--success-green)", textColor: "#000",
        image: "assets/images/5_2_winner.jpg",
        text: "You opened DevTools.\n\nYou typed document.querySelector('#ravi').remove() and hit Enter. Superboss LinkedIn Ravi dissolved mid-word into Comic Sans. The mood board slid off the page. Mr. Cly End blinked out of existence. The Phishing Bomb quietly defused itself. A calm voice said \"you were always a developer.\"\n\nThe bar hit 100%. You made the movie. You've never felt this clean.",
        endingTitle: "THE NEO ID", endingTitleType: "secret",
        choices: [
            { text: "Re-enter the Matrix (Restart Shift)", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    },

    // ── BAD ENDING: THE MARTYR (went rogue) ──
    "rogue_export": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/3_4_rogue.jpg",
        text: "You published the clean build yourself and walked out to \"Eye of the Tiger.\" Full volume.\n\nYou made the movie. The module went live — five stars, 94% completion. Unheard of. You were a hero for exactly three days.\n\nThen Superboss LinkedIn Ravi emailed you, your manager, his manager, and somehow Facilities. Subject: \"Creative Unilateralism: A Formal Concern.\" Then he posted about it. They let you go.\n\nThe module still runs. Without you. Beautifully.",
        endingTitle: "THE MARTYR",
        choices: [
            { text: "Restart Shift", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    },

    // ── THE CANON TRAP ──
    "loading_bar": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/4_1_loading.jpg",
        text: "5:28 PM. There's the bar.\n\nStoryline's compiling. Nobody knows what it's doing. Been at 99% for sixteen minutes. The laptop fan sounds like a small plane taking off. There's a moth orbiting the ceiling light since 3 PM. The office is empty.\n\nDO NOT TOUCH ANYTHING.",
        isTrap: true, forceTime: 1048,
        variants: [
            {
                id: "returning-loading",
                conditions: ["playCount:>= 1"],
                text: "5:28 PM. Again.\n\nSame bar. 99%. The moth got here before you this time — already on the light when you sat down. You know how this goes. The fan. The empty office. The two minutes that aren't really two minutes.\n\nDO NOT TOUCH ANYTHING. You know exactly what happens."
            },
            {
                id: "greg-loading",
                conditions: ["visited:compromise"],
                text: "5:28 PM. Greg's in the package now.\n\nGreg_padlock_security_195832.jpg, compiling quietly alongside every slide. Bar's at 99%. Somewhere in that folder, Greg is a 340KB JPEG bravely waiting to become compliance training.\n\nThe moth hasn't moved. DO NOT TOUCH ANYTHING. Greg wouldn't. Greg waits."
            }
        ],
        choices: []
    },

    // ── BAD ENDING: FATAL ERROR ──
    "crash": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/4_3_crash.jpg",
        text: "You touched it.\n\n\"Articulate Storyline has stopped responding.\" AutoRecover saved exactly one file: Module 3, Draft v1. A blank title slide on the default master. No variables. No layers. No Greg. No Mr. Cly End.\n\nYour phone buzzes. It's the kids. You let it ring.",
        endingTitle: "FATAL ERROR",
        variants: [
            {
                id: "returning-crash",
                conditions: ["playCount:>= 1"],
                text: "Again. You touched it again.\n\nSame AutoRecover file. Module 3. Draft v1. Blank master. Mr. Cly End didn't save. As far as Storyline's concerned, Mr. Cly End was never real.\n\nYou saw this coming. Be honest. The phone's ringing. You know who it is."
            }
        ],
        choices: [
            { text: "Cry. Then restart.", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    },

    // ── THE TEAL BOMB ──
    "upload": {
        speaker: "Tarun", color: "var(--tarun-yellow)", textColor: "#000",
        image: "assets/images/4_2_upload.jpg",
        text: "PRIYA! Incredible delivery cadence! Tiny thing.\n\nSuperboss LinkedIn Ravi posted on LinkedIn this morning — \"Teal is the future of Trust™.\" Four thousand likes. A client commented. Now the client expects us to be teal. We are not teal. We've always been blue.\n\nHe needs all 87 slides switched to teal and re-published. Before you leave. He sent the hex code. The hex code is the word TEAL. No hash. No numbers. Just TEAL.\n\nI've read it four times.",
        variants: [
            {
                id: "high-quality-upload",
                conditions: ["quality:>= 80"],
                text: "PRIYA! The module has three five-star comments in Review 360 — I want you to know that. It makes this harder to say.\n\nSuperboss LinkedIn Ravi. LinkedIn. \"Teal is the future of Trust™,\" four thousand likes, a client in the replies. All 87 slides. Switched to teal. Re-published before you go.\n\nThe hex code he sent is the word TEAL. No hash, no numbers, just TEAL. I checked the brand guide. There is no teal in the brand guide.\n\nI'm so sorry."
            }
        ],
        choices: [
            { text: "Recolour all 87 slides. By hand. Right now.", target: "martyr_office", timeCost: 90, qualityCost: -10,
              remember: true, rememberText: "Priya will remember this." },
            { text: "Bury Tarun in confident-sounding nonsense.", target: "true_winner", timeCost: 0, qualityCost: 20 },
            { text: "Export it as a PowerPoint and email it. Done.", target: "ppt_promotion", timeCost: 0, qualityCost: -100 }
        ]
    },

    // ── BAD ENDING: JUST ANOTHER FRIDAY ──
    "martyr_office": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/5_1_martyr.jpg", forceTime: 1120,
        text: "You recoloured all 87 slides. By hand.\n\nSlides 23 to 31 used a master built in 2018 by someone who's long left the company, the industry, possibly the country. Layout was locked. You rebuilt them from scratch. Twice. Hand slipped on slide 34.\n\nRe-published at 6:40 PM. Granny took the kids. She sent three photos — the popcorn, both of them laughing, a lobby cutout of an iceberg in a top hat. \"They had a BLAST 💙\"\n\nBlue heart. Not even teal.",
        endingTitle: "JUST ANOTHER FRIDAY",
        variants: [
            {
                id: "repeat-martyr",
                conditions: ["playCount:>= 2"],
                text: "87 slides. By hand. Again.\n\nThe cleaning crew don't ask if you need anything anymore — they just go around your desk like it's load-bearing. One of them left a Tupperware of water by your keyboard. That one's genuinely worried.\n\nThe 2018 master. Still locked. Slides 23 to 31. Rebuilt twice. Slide 34. 6:40 PM. Granny's photos. The blue heart.\n\nYou know how this ends."
            }
        ],
        choices: [
            { text: "Restart Shift", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    },

    // ── BAD ENDING: THE CORPORATE SELLOUT ──
    "ppt_promotion": {
        speaker: "System", color: "var(--tarun-yellow)", textColor: "#000",
        image: "assets/images/6_1_ppt_promotion.jpg",
        text: "You renamed it 'InfoSec_Interactive_FINAL_v2_TEAL_APPROVED.pptx' and emailed it. No message.\n\nSuperboss LinkedIn Ravi replied in 38 seconds. All caps: EXACTLY THE TRANSFORMATIONAL ENERGY HE WANTED. He forwarded it to the CEO. Subject: INNOVATION. Then posted a carousel about \"shipping fast and breaking hierarchy.\"\n\nBy Monday, you're Global Head of Learning Experience Design. Parking spot included. You caught the 5:50 show. Cried at the iceberg. Probably not about the iceberg.",
        endingTitle: "THE CORPORATE SELLOUT",
        choices: [
            { text: "Restart Shift", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    },

    // ── THE GASLIGHT ──
    "true_winner": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/6_2_true_winner.jpg",
        text: "Actually, Tarun —\n\nThe LMS theme doesn't store a colour. It stores a brand token. I flagged this in Sprint 6: at midnight, the cache repaints every module to the live brand token automatically. Teal is already queued. Cascades overnight. Zero re-uploads.\n\nYou approved it. \"Sprint 6 Summary, Please Read Before EOD.\" You thumbs-upped it at 11:14 PM on a Sunday.\n\n(She holds eye contact. She made up every single word of this.)",
        choices: [ { text: "Watch Tarun absorb this information.", target: "victory_screen" } ]
    },

    // ── TRUE ENDING: THE SME WHISPERER ──
    "victory_screen": {
        speaker: "System", color: "var(--success-green)", textColor: "#000",
        image: "assets/images/6_3_victory.jpg",
        text: "Tarun blinks. Like an old browser loading a video layer.\n\n\"Sprint 6,\" he says. \"The token one.\" \"That's the one,\" you say. He nods for eight full seconds. Then: \"superb alignment.\"\n\nYou close the laptop. You just defeated a grown man with a brand variable that does not exist. It's 5:28. You're out the door by 5:30. You make the 5:50 show. Maya cries at the iceberg. You cry at Maya crying. The moth dips once as you pass the light — tiny salute.",
        endingTitle: "THE SME WHISPERER", endingTitleType: "victory",
        variants: [
            {
                id: "veteran-victory",
                conditions: ["playCount:>= 2"],
                text: "\"Sprint 6.\" \"The token one.\" You've said these exact words before. You know how they land.\n\nYou've seen the other paths — 87 slides, Greg, the Tupperware, the blue heart. You chose this one on purpose.\n\n\"Superb alignment,\" Tarun says. You close the laptop. You make the movie. The moth dips once. You nod back this time."
            }
        ],
        choices: [
            { text: "Play Again (Restart Shift)", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    },

    // ── BAD ENDING: GLORIOUS RAGE QUIT ──
    "rage_quit": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/6_4_rage_quit.jpg",
        text: "Patience hits zero.\n\nYou close the laptop like you're reading out a verdict. Grab your bag. Look at Tarun. Look at the teal email. Look at the moth. The moth looks back. You both nod.\n\nYou leave. Four Teams pings before you reach the lift. The last one just says \"re: the teal.\" You archive the whole channel without opening it.\n\nYou make the 5:50 show on principle alone. Maya saves you the aisle seat. You don't check your phone once.",
        endingTitle: "GLORIOUS RAGE QUIT",
        choices: [
            { text: "Restart Shift", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    },

    // ── BAD ENDING: MISSED THE MOVIE ──
    "martyr": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/6_5_martyr.jpg",
        text: "It's past 6 PM.\n\nStill at the desk. Still untangling whatever Superboss LinkedIn Ravi wanted. The movie started at 5:50. Granny took the kids — she texted a photo from the good seats: both of them mid-laugh, an iceberg in a top hat behind them.\n\n\"Don't worry, we got you a slushie 💙\"\n\nThe slushie is, of course, blue. The bar is still at 99%. The moth hasn't moved. Neither have you.",
        endingTitle: "MISSED THE MOVIE", forceTime: 1080,
        choices: [
            { text: "Restart Shift", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    }
};
