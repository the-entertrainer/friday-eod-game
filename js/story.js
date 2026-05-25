const storyData = {
    // ── COLD OPEN — 5:28 PM, the present. Two minutes to leave. ──
    "intro": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/1_1_bsod.jpg", forceTime: 1048,
        text: "5:28 PM. Two minutes. If I'm out the door by 5:30, I make it — ten-minute drive, the kids, the 5:50 show. Maya picked it: 'Titanic 2: Return of Jack with his dad Sparrow.' I asked how there's a sequel. She said, 'Mom, it's about her granddaughter, obviously.' Tickets booked. Non-refundable. And Articulate has said 'Publishing' for sixteen minutes. The bar's at 99%. It's been at 99% since 5:12. I am not touching it. How did a one-click publish eat my whole afternoon? Let me walk you back.",
        choices: [ { text: "Rewind to 4:45 PM →", target: "setup", timeCost: 0 } ],
        variants: [
            {
                id: "returning-player",
                conditions: ["playCount:>= 1"],
                text: "You're back. 5:28 PM again. Same bar, same 99%, same two kids in a lobby holding tickets to a movie about a boat's granddaughter. I remember last time. We didn't leave on time. Let's see if we do better. Or worse. Honestly I don't know you yet. Rewind."
            },
            {
                id: "after-rogue",
                conditions: ["seenEnding:rogue_export"],
                text: "Oh. It's you. Last time you published the clean version behind everyone's back and I got a calendar invite called 'Quick Chat,' which is HR for 'bring a box.' The module's still live, by the way. Five stars. I am not. Anyway — 5:28 PM. Two minutes. Rewind."
            },
            {
                id: "after-meta-escape",
                conditions: ["seenEnding:meta_escape"],
                text: "You opened the browser console last time and deleted my boss out of existence. I was free for about six seconds. Then the loop reset and the tickets re-booked themselves. Let's not do whatever that was again. Or do. I've stopped having opinions. Rewind."
            }
        ]
    },

    // ── FLASHBACK — 4:45 PM. The false confidence. ──
    "setup": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/1_2_setup.jpg", forceTime: 1005,
        text: "4:45 PM. The module was done. Done done. No locked navigation, no wall of text, no PDF someone scanned at an angle with their thumb in the shot. I built it properly in Storyline — named my variables, used the slide master like a woman with self-respect. One tidy Synthesia avatar doing the intro, a clean Rise version for mobile. One click to publish and I'm gone by five. I genuinely believed that. I want to go back and hug that woman. And then shake her.",
        choices: [
            { text: "Click 'Publish' and grab my coat.", target: "ambush", timeCost: 2 },
            { text: "Do one last QA pass first. Just in case.", target: "ambush", timeCost: 5 }
        ]
    },

    // ── THE AMBUSH — Tarun delivers Superboss LinkedIn Ravi's first 'feedback'. ──
    "ambush": {
        speaker: "Tarun", color: "var(--tarun-yellow)", textColor: "#000",
        image: "assets/images/2_1_ambush.jpg",
        text: "PRIYA! Hey — got two minutes for a hyper-quick sync? Love the hustle. So Superboss LinkedIn Ravi circled back on the module from the airport lounge. He wants fourteen more slides. On password history. Starting from, quote, 'the cavemen who scratched their first passwords into rocks.' He sent a diagram. Of the rocks. They're labelled. The lead rock is named Mr. Cly End. He wants Mr. Cly End on slide one — he's already drafted the LinkedIn post about Mr. Cly End. Just flagging for alignment!",
        variants: [
            {
                id: "low-quality-ambush",
                conditions: ["quality:<= 40"],
                text: "PRIYA! Quick one. Superboss LinkedIn Ravi reviewed the module between flights and he's got, um, feedback. Fourteen slides of it. Cavemen, a rock named Mr. Cly End, the whole saga. He called the current version 'learning-adjacent,' which I think is meant to be a compliment? Hard to tell. Hey — are you okay? You don't have to answer. But, like. Are you. Genuinely."
            },
            {
                id: "repeat-ambush",
                conditions: ["playCount:>= 2"],
                text: "PRIYA. I know. I KNOW you know. The fourteen slides. Mr. Cly End the rock. Look, I don't own the rock content, okay? It's above my pay grade. I'm just the guy who carries Mr. Cly End between meetings. Superboss LinkedIn Ravi's emotionally invested. He keeps saying the word 'cornerstone' and posting a flexed-bicep emoji. How are you holding up. For real. Blink twice."
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
        text: "Tarun. Stop. There's a bar above my head labelled 'Patience' and I can watch it draining. In real time. I'm fairly sure I'm in a game, and someone's tapping through the worst Friday of my life for fun. Hi. Yes — you. My kids are in a lobby right now holding tickets to a movie about the Titanic's granddaughter. Please pick the good options. I'm asking nicely. I'm asking once.",
        choices: [
            { text: "Tarun: 'The UI is a metaphor, Priya. Focus on the deliverables.'", target: "aggressive", timeCost: 4, patienceCost: -40 }
        ]
    },

    // ── DIPLOMATIC PATH — Superboss LinkedIn Ravi's 'Netflix experience'. ──
    "diplomatic": {
        speaker: "Tarun", color: "var(--tarun-yellow)", textColor: "#000",
        image: "assets/images/2_2_diplomatic.jpg",
        text: "Okay, so Superboss LinkedIn Ravi watched a TED talk on the flight. He wants a 3D escape room where staff defuse a 'Phishing Bomb' using multiple choice. He's calling it 'a Netflix experience for compliance.' He doesn't have Netflix — he calls it 'the internet television.' He also wants a Synthesia avatar of himself narrating, but younger, and with, quote, 'more jaw.' He printed a mood board: nine stock photos of padlocks and one safe circled in red, labelled 'IMMERSIVE JOURNEY NODE 1.' I could not make this up.",
        choices: [
            { text: "Explain that Storyline is not a game engine.", target: "technical_pushback", timeCost: 10, patienceCost: -20 },
            { text: "Cave. Build the whole Phishing Bomb, slide by slide.", target: "compromise", timeCost: 40, qualityCost: -40, patienceCost: 15 }
        ]
    },

    // ── AGGRESSIVE PATH — 'engagement synergy' decoded. ──
    "aggressive": {
        speaker: "Tarun", color: "var(--tarun-yellow)", textColor: "#000",
        image: "assets/images/2_3_aggressive.jpg",
        text: "So 'engagement synergy' means locking the Next button until Superboss LinkedIn Ravi's Synthesia avatar finishes talking. And you can hear it breathe between sentences. He likes that. It calms him. Also, when someone gets a drag-and-drop wrong, it should just snap to the right answer anyway — he's calling that 'psychological safety.' I wrote it on a Post-it. The Post-it says 'outcome-positive gamification.' It's stuck to the server room door. Facilities have called twice. It's staying up.",
        variants: [
            {
                id: "ravi-hotspot-hint",
                conditions: ["playCount:>= 1"],
                text: "So 'engagement synergy' — and I'm reading verbatim from his email here — means wrong answers should auto-correct to the right one, quote, 'because we don't want learners feeling bad.' That's not learning, that's a participation trophy for clicking. Oh, and — tiny thing, almost an afterthought in the email — he wants a hotspot on the female Synthesia avatar. On her name badge. Quote: 'clickable for curiosity, adds a human touch.' I've re-read it eleven times. I'm still getting nothing. I typed it into the brief as written because I didn't know what else to do with it. I haven't slept well since."
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
        text: "Listen to me with your actual ears, Tarun. If I lock the navigation, people mute the tab and spam Next until it lets them out. Nobody learns anything. If I build a 3D escape room in Storyline, the LMS throws a SCORM error so old nobody alive can read it. And a chunk of our staff are still on a browser that lost support before I was hired — it can't render a rounded corner, let alone Superboss LinkedIn Ravi's jaw. I have standards. I have a deviated septum. And I have a 5:50 movie. I'm begging you.",
        variants: [
            {
                id: "low-quality-pushback",
                conditions: ["quality:<= 30"],
                text: "Tarun. Look at my face. There's a bar over my head that says 'Quality' and it's almost gone. I can feel it going. I'm running on spite and a Teams thread no one's replied to since November. If I lock the nav, we ship an expensive audio file with a click at the end. If I build the escape room, the LMS files a noise complaint. Please. The pushback is genuinely all I have left. Let me have it."
            },
            {
                id: "both-paths-pushback",
                conditions: ["visited:diplomatic", "visited:aggressive"],
                text: "We've done the escape room, the locked nav, the breathing avatar AND the snap-to-correct drag-and-drop, Tarun. I've heard every flavour. The answer is still no. The LMS will reject a 3D Storyline output. The old browsers will fall over loading it. I am one email away from putting a PDF on SharePoint and calling it a day. Don't make me say the SharePoint thing. I will say it."
            },
            {
                id: "hotspot-callout",
                conditions: ["visited:aggressive"],
                text: "Let's start with the snap-to-correct. If a wrong answer instantly becomes right, you've built a box people click through without reading. That's not psychological safety — that's evidence destruction. You've made it impossible to know whether anyone actually understood anything. The completion rate will be great. The phishing rate will also be great. Now — the hotspot. On the female avatar's name badge. I need you to stop talking and listen. A senior leader using his position to put interactive triggers on a digital woman's body and filing it under 'curiosity' is not a UX note. It is a misuse of power. It is exactly the kind of thing that gets quietly normalised until someone gets hurt. I am not building it. I am writing it up. I am sending it to HR tonight, before this movie, and if Superboss LinkedIn Ravi thinks his LinkedIn following makes that acceptable, he is going to find out very clearly that it does not."
            }
        ],
        choices: [
            { text: "Tarun: 'Fine. Just add a stock photo of someone high-fiving a server.'", target: "loading_bar", qualityCost: -20, timeCost: 6, patienceCost: 8 },
            { text: "Publish the clean version anyway. Go rogue.", target: "rogue_export", qualityCost: 10, patienceCost: -55,
              remember: true, rememberText: "The system has logged this decision." },
            { text: "[Console] Open DevTools. Delete Superboss LinkedIn Ravi from the page.", target: "meta_escape", timeCost: 0, qualityCost: 100, patienceCost: 100 }
        ]
    },

    // ── THE CAVE ──
    "compromise": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/3_3_compromise.jpg",
        text: "My soul has left my body. It's up by the ceiling tiles, watching me add invisible hotspots to a 2009 stock padlock. The watermark runs straight across the model's face. Standard licence — doesn't cover removal. The filename is Greg_padlock_security_195832.jpg. So. Greg's in the module now. Greg's about to be mandatory compliance training. Greg didn't ask for any of this. Honestly, Greg's handling it better than I am.",
        choices: [ { text: "Watch the publish bar and pray.", target: "loading_bar", timeCost: 6 } ]
    },

    // ── SECRET: THE NEO ID ──
    "meta_escape": {
        speaker: "System", color: "var(--success-green)", textColor: "#000",
        image: "assets/images/5_2_winner.jpg",
        text: "You opened DevTools. You typed document.querySelector('#ravi').remove() into the console and hit Enter. Superboss LinkedIn Ravi dissolved mid-word into Comic Sans. The mood board slid off the page. Mr. Cly End the rock blinked out of the data. The Phishing Bomb quietly defused itself. A calm voice said, 'you were always a developer,' and you have no idea what it meant but you cried anyway. The bar hit 100%. You made the movie with time to spare. You've never felt this clean.",
        endingTitle: "THE NEO ID", endingTitleType: "secret",
        choices: [
            { text: "Re-enter the Matrix (Restart Shift)", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    },

    // ── BAD: THE MARTYR (went rogue) ──
    "rogue_export": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/3_4_rogue.jpg",
        text: "You published the clean build, pushed it live yourself, and walked out to 'Eye of the Tiger' at full volume. You made the movie. The module went live — five stars, 94% completion, which is unheard of, nobody finishes these. You were a hero for exactly three days. Then Superboss LinkedIn Ravi emailed you, your manager, his manager, and somehow Facilities. Subject line: 'Creative Unilateralism: A Formal Concern.' Then he posted about it. They let you go. The module still runs. Without you. Beautifully.",
        endingTitle: "THE MARTYR",
        choices: [
            { text: "Restart Shift", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    },

    // ── THE CANON TRAP — the publish bar. ──
    "loading_bar": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/4_1_loading.jpg",
        text: "5:28 PM. There it is. Storyline's compiler is doing... something. Nobody knows what. The bar's at 99%. Been there sixteen minutes. Your laptop fan sounds like a small aircraft attempting takeoff. The office is empty. There's a moth that's been orbiting the ceiling light since 3 PM and is, frankly, more committed than half the org. Whatever you do — DO NOT TOUCH ANYTHING.",
        isTrap: true, forceTime: 1048,
        variants: [
            {
                id: "returning-loading",
                conditions: ["playCount:>= 1"],
                text: "5:28 PM. Again. Storyline's compiling. Bar's at 99%. The moth beat you here this time — already on the light when you sat down. You know how this goes. The fan. The empty office. The two minutes that aren't really two minutes. DO NOT TOUCH ANYTHING. Seriously. You know exactly what happens."
            },
            {
                id: "greg-loading",
                conditions: ["visited:compromise"],
                text: "5:28 PM. Greg's in the package now — Greg_padlock_security_195832.jpg, compiling next to every slide. The bar's at 99%. Somewhere in this folder Greg is a 340KB JPEG bravely waiting to become compliance training. Your soul's still up by the ceiling tiles. The moth hasn't moved. DO NOT TOUCH ANYTHING. Greg wouldn't. Greg waits."
            }
        ],
        choices: []
    },

    // ── BAD: FATAL ERROR ──
    "crash": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/4_3_crash.jpg",
        text: "You moved the mouse. You absolute menace. The screen goes white. 'Articulate Storyline has stopped responding.' AutoRecover saved exactly one file: a single title slide. 'Module 3: Security Awareness — Draft v1.' No variables. No layers. No branching. No Synthesia avatar. No Greg. No Mr. Cly End. Just a title sitting on the blank master that ships with every install. That's it. That's what it chose to save. Your phone buzzes. It's the kids. You let it ring.",
        endingTitle: "FATAL ERROR",
        variants: [
            {
                id: "returning-crash",
                conditions: ["playCount:>= 1"],
                text: "Again. You touched it again. Storyline's stopped responding. Same AutoRecover file. Module 3. Draft v1. Blank master. Mr. Cly End didn't save. As far as Storyline's concerned, Mr. Cly End was never real. You saw this coming. Be honest. You did. The phone's ringing. You know who it is."
            }
        ],
        choices: [
            { text: "Cry. Then restart.", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    },

    // ── THE TEAL BOMB — Tarun delivers Superboss LinkedIn Ravi's final demand. ──
    "upload": {
        speaker: "Tarun", color: "var(--tarun-yellow)", textColor: "#000",
        image: "assets/images/4_2_upload.jpg",
        text: "PRIYA! Incredible delivery cadence! Tiny thing. Superboss LinkedIn Ravi posted on LinkedIn this morning — 'Teal is the future of Trust™' — and it did four thousand likes, and then a client commented, and now the client expects us to BE teal. We are not teal. The brand guide is blue. We have always been blue. But Superboss LinkedIn Ravi tagged the company, so reality has to catch up. He needs all 87 slides switched to teal and re-published before you leave. He sent the hex code. The hex code is the word 'TEAL.' No hash. No numbers. Just TEAL. I've read it four times.",
        variants: [
            {
                id: "high-quality-upload",
                conditions: ["quality:>= 80"],
                text: "PRIYA! Hey — first, the module's got three five-star comments in Review 360 and I want to honour that, which honestly makes this harder. So. Superboss LinkedIn Ravi. LinkedIn. 'Teal is the future of Trust™,' four thousand likes, a client in the replies. All 87 slides. Switched to teal. Re-published before you go. The hex code he sent is the word 'TEAL.' No hash, no numbers, just TEAL. I checked the brand guide. There is no teal in the brand guide. I'm so sorry."
            }
        ],
        choices: [
            { text: "Recolour all 87 slides. By hand. Right now.", target: "martyr_office", timeCost: 90, qualityCost: -10,
              remember: true, rememberText: "Priya will remember this." },
            { text: "Bury Tarun in confident-sounding nonsense.", target: "true_winner", timeCost: 0, qualityCost: 20 },
            { text: "Export it as a PowerPoint and email it. Done.", target: "ppt_promotion", timeCost: 0, qualityCost: -100 }
        ]
    },

    // ── BAD: JUST ANOTHER FRIDAY (did it by hand, missed the movie) ──
    "martyr_office": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/5_1_martyr.jpg", forceTime: 1120,
        text: "You recoloured all 87 slides. By hand. Slides 23 to 31 used a master built in 2018 by someone who has since left the company, the industry, and possibly the country. The layout was locked. You rebuilt them from scratch. Twice. Your hand slipped on slide 34. By the time it re-published it was 6:40. Your phone has three photos from Granny: the kids, the popcorn, a lobby cut-out of an iceberg in a top hat. Caption: 'they had a BLAST 💙.' Blue heart. Not even teal.",
        endingTitle: "JUST ANOTHER FRIDAY",
        variants: [
            {
                id: "repeat-martyr",
                conditions: ["playCount:>= 2"],
                text: "87 slides. By hand. Again. The cleaning crew don't ask if you need anything anymore — they just go around your desk like it's load-bearing. One of them left a Tupperware of water by your keyboard. That one's genuinely worried. The 2018 master, still locked. Slides 23 to 31, twice. Slide 34. 6:40 PM. Granny's photos. The blue heart. You know how this one ends."
            }
        ],
        choices: [
            { text: "Restart Shift", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    },

    // ── BAD (funny): THE CORPORATE SELLOUT ──
    "ppt_promotion": {
        speaker: "System", color: "var(--tarun-yellow)", textColor: "#000",
        image: "assets/images/6_1_ppt_promotion.jpg",
        text: "You renamed it 'InfoSec_Interactive_FINAL_v2_TEAL_APPROVED.pptx' and emailed it. No message. Superboss LinkedIn Ravi replied in 38 seconds, all caps: EXACTLY THE TRANSFORMATIONAL ENERGY HE WANTED. He forwarded it to the CEO with the subject 'INNOVATION,' then posted a carousel about 'shipping fast and breaking hierarchy.' By Monday you're Global Head of Learning Experience Design. You have a parking spot. You caught the 5:50 show. You cried at the iceberg. You're not totally sure it was about the iceberg.",
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
        text: "Actually, Tarun — the LMS theme doesn't store a colour. It stores a brand token. I flagged this in the Sprint 6 retro: at midnight the theme cache repaints every published module to the live brand token automatically. Teal's already queued. It cascades overnight, all 87 slides, zero re-uploads. You approved it — I sent the deck, 'Sprint 6 Summary, Please Read Before EOD.' You thumbs-upped it at 11:14 PM on a Sunday. (She holds eye contact. She has made up every single word of this.)",
        choices: [ { text: "Watch Tarun absorb this information.", target: "victory_screen" } ]
    },

    // ── TRUE VICTORY: THE SME WHISPERER ──
    "victory_screen": {
        speaker: "System", color: "var(--success-green)", textColor: "#000",
        image: "assets/images/6_3_victory.jpg",
        text: "Tarun blinks. Slowly. Like an old browser loading a video layer. 'Sprint 6,' he says. 'The token one.' 'That's the one,' you say. He nods for a full eight seconds. Then: 'superb alignment.' You close the laptop. You just defeated a grown man with a brand variable that does not exist. It's 5:28. You're out the door by 5:30. You make the 5:50 show. Maya cries at the iceberg. You cry at Maya crying. The moth dips once as you pass the light — like a tiny salute.",
        endingTitle: "THE SME WHISPERER", endingTitleType: "victory",
        variants: [
            {
                id: "veteran-victory",
                conditions: ["playCount:>= 2"],
                text: "Tarun blinks like an old browser loading a video layer. 'Sprint 6.' 'The token one.' You've said these exact words before. You know precisely how they land. You've seen the other endings — the 87 slides, Greg, the Tupperware, the blue heart. You chose this one on purpose. 'Superb alignment,' he says. You close the laptop. You make the movie. The moth dips once. You nod back this time.",
            }
        ],
        choices: [
            { text: "Play Again (Restart Shift)", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    },

    // ── BAD (funny): GLORIOUS RAGE QUIT (patience hit zero) ──
    "rage_quit": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/6_4_rage_quit.jpg",
        text: "Patience hits zero. You close the laptop like you're reading out a verdict. You grab your bag. You look at Tarun. At the teal email. At the moth. The moth looks back. You both nod. You leave. Four Teams pings before you reach the lift. The last one just says 're: the teal.' You archive the entire channel without opening it and you make the 5:50 movie on principle alone. Maya saves you the aisle seat. You don't check your phone once.",
        endingTitle: "GLORIOUS RAGE QUIT",
        choices: [
            { text: "Restart Shift", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    },

    // ── BAD: MISSED THE MOVIE (time overflow ≥ 5:30) ──
    "martyr": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/6_5_martyr.jpg",
        text: "It's gone 6 PM. You're still at the desk, still untangling whatever Superboss LinkedIn Ravi wanted this time. The movie started at 5:50. Granny took the kids — she texted a photo from the good seats: both of them mid-laugh, an iceberg in a top hat behind them. 'Don't worry, we got you a slushie 💙.' You stare at it. The slushie is, of course, blue. The publish bar is still at 99%. The moth hasn't moved. Neither have you.",
        endingTitle: "MISSED THE MOVIE", forceTime: 1080,
        choices: [
            { text: "Restart Shift", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    }
};
