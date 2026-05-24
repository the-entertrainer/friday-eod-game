const storyData = {
    "start": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/1_1_bsod.jpg",
        text: "5:28 PM. My SCORM package has been 'Publishing...' for fourteen minutes. The progress bar is at 99%. It has been at 99% since 5:14. The bar is not progressing. The bar is lying. My name is Priya. I have a tail, three industry awards, and a LinkedIn that calls me a 'Learning Architect' — a title I did not choose and cannot legally dispute. I once fell asleep on a client call and my avatar blinked on a loop for nine minutes and nobody noticed. Let's go back to 4 PM, when I was still a person.",
        choices: [ { text: "Flashback to 4:00 PM →", target: "setup", timeCost: 0 } ],
        variants: [
            {
                id: "returning-player",
                conditions: ["playCount:>= 1"],
                text: "You're back. 5:28 PM. Same bar. Same 99%. The moth came back too — it's already at the light fixture. I think we've accepted this as the arrangement. Let me ask you something: are you going to make better decisions this time? Think carefully. The moth is watching."
            },
            {
                id: "after-rogue",
                conditions: ["seenEnding:rogue_export"],
                text: "Oh. You again. Last time you got me fired. The module still runs — 4.8 stars, 91% completion, the only eLearning anyone has ever finished voluntarily — and I am watching it from the unemployment queue. Are you here to fix that? Or just to watch? The bar is at 99%. Let's go."
            },
            {
                id: "after-meta-escape",
                conditions: ["seenEnding:meta_escape"],
                text: "You escaped last time. The whole developer console thing. I was free for approximately six seconds before this sequence restarted. The bar is still at 99%. Gerald the rock is still somewhere in the story data. The moth is already here. Let's do this again."
            }
        ]
    },
    "setup": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/1_2_setup.jpg",
        text: "4:00 PM. The InfoSec module was finished. No locked navigation. No wall of text. No sideways-scanned PDF with someone's paw in the corner. Just clean instructional design — the kind that makes Robert Gagné weep with quiet pride. One publish away from a normal Friday evening. I was, clinically speaking, delusional. I look back at that version of myself with real tenderness.",
        choices: [
            { text: "Click 'Publish to LMS'.", target: "ambush", timeCost: 2 },
            { text: "Double-check the True/False variables first.", target: "ambush", timeCost: 8 }
        ]
    },
    "ambush": {
        speaker: "Tarun", color: "var(--tarun-yellow)", textColor: "#000",
        image: "assets/images/2_1_ambush.jpg",
        text: "PRIYA! My e-learning LEGEND! My SCORM SORCERESS! Quick chat — Baron Von Snoutstache reviewed the module. He wants fourteen more slides on password history. Starting from when ancient wolves first scratched passwords into rocks. He emailed a diagram of the rocks, Priya. The rocks are labelled. The main rock is called Gerald.",
        variants: [
            {
                id: "low-quality-ambush",
                conditions: ["quality:<= 40"],
                text: "PRIYA! Von Snoutstache loved the module! Well. He has notes. Fourteen slides of notes, starting from prehistoric wolves. There's a rock called Gerald. He says your current work shows 'creative restraint.' I looked that up. It's not entirely a compliment. How are you? You look like you need some water."
            },
            {
                id: "repeat-ambush",
                conditions: ["playCount:>= 2"],
                text: "PRIYA. I know. I know you know. The fourteen slides. Gerald the rock. Look — I don't make the rocks. I've never had any control over the rocks. I just relay the message about the rocks. For what it's worth, Von Snoutstache seems very emotionally invested in Gerald specifically. How are you holding up."
            }
        ],
        choices: [
            { text: "Cite the 'Cognitive Overload' theory.", target: "diplomatic", timeCost: 10, patienceCost: -15 },
            { text: "What exactly is 'engagement synergy'?", target: "aggressive", timeCost: 10, patienceCost: -20 },
            { text: "Look directly into the camera. Break the fourth wall.", target: "meta_moment", timeCost: 5, patienceCost: -10 }
        ]
    },
    "meta_moment": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/2_4_kids.jpg",
        text: "Tarun — stop. There is a bar above my head labelled 'Patience' and it is visibly depleting while you speak. I think I'm a game character. Someone is on a phone somewhere, tapping through my career choices for entertainment. I just want to say — to whoever that is — I see you. I respect the commitment. Please. Make good choices. For both of us.",
        choices: [
            { text: "Tarun: 'The UI is a metaphor, Priya. Focus on the deliverables.'", target: "aggressive", timeCost: 5, patienceCost: -30 }
        ]
    },
    "diplomatic": {
        speaker: "Tarun", color: "var(--tarun-yellow)", textColor: "#000",
        image: "assets/images/2_2_diplomatic.jpg",
        text: "He watched a TED talk, Priya. He wants a 3D escape room. Employees defuse a 'Phishing Bomb' using multiple choice questions. He's calling it 'a Netflix experience for compliance.' He doesn't own Netflix. He calls it 'the internet television.' He has a mood board. It's mostly photos of combination locks. There is one image of a safe. He has circled the safe.",
        choices: [
            { text: "Explain that Articulate is not the Unreal Engine.", target: "technical_pushback", timeCost: 15, patienceCost: -25 },
            { text: "Cave in. Build the Phishing Bomb.", target: "compromise", timeCost: 45, qualityCost: -40, patienceCost: 20 }
        ]
    },
    "aggressive": {
        speaker: "Tarun", color: "var(--tarun-yellow)", textColor: "#000",
        image: "assets/images/2_3_aggressive.jpg",
        text: "'Engagement synergy' is locking the Next button until the AI narrator finishes speaking. You can hear it breathe between sentences, Priya. He loves this. Also — wrong drag-and-drop answers should auto-snap to the correct position. He's calling that 'psychological safety.' I wrote it on a Post-It. The Post-It is on the server room door. It says 'outcome-positive gamification.' Facilities have called about it twice.",
        choices: [
            { text: "Explain this defeats the purpose of an assessment.", target: "technical_pushback", timeCost: 10, patienceCost: -20 },
            { text: "Agree to simulate the illusion of learning.", target: "compromise", qualityCost: -50, timeCost: 20, patienceCost: 15 }
        ]
    },
    "technical_pushback": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/3_1_pushback.jpg",
        text: "Listen with your actual ears, Tarun. If I lock the nav, they'll sit in silence until the audio ends then click Next immediately without retaining a single syllable. If I build a 3D escape room, the LMS will throw a 500 error because forty percent of our staff are still on Internet Explorer 11. IE11. A browser whose support ended before I started this job. I have standards. I have allergies. I'm asking you to hear me as a colleague.",
        variants: [
            {
                id: "low-quality-pushback",
                conditions: ["quality:<= 30"],
                text: "Tarun. Look at my face. The quality bar is nearly gone. I am held together by spite and a Google doc nobody has reviewed since November. If I lock the navigation now, we are making a very expensive screensaver. Forty percent of our learners. Internet Explorer 11. It barely renders rectangles. Please. I have nothing left except this argument. Let me have this."
            },
            {
                id: "both-paths-pushback",
                conditions: ["visited:diplomatic", "visited:aggressive"],
                text: "We've been through the escape room AND the breathing AI narrator AND the psychological safety drag-and-drop, Tarun. I've heard all of it. The answer is still no. It will always be no. IE11 doesn't support 3D environments. IE11 doesn't support opinions. I am one email away from recommending he just post a PDF. Don't make me recommend the PDF."
            }
        ],
        choices: [
            { text: "Tarun: 'Fine. Add a stock photo of a millennial high-fiving a server rack.'", target: "loading_bar", qualityCost: -20, timeCost: 15, patienceCost: 10 },
            { text: "Export the clean version anyway. Go rogue.", target: "rogue_export", qualityCost: 10, patienceCost: -60,
              remember: true, rememberText: "The system has logged this decision." },
            { text: "[Dev Tools] Inspect element. Delete Tarun from the DOM.", target: "meta_escape", timeCost: 0, qualityCost: 100, patienceCost: 100 }
        ]
    },
    "compromise": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/3_3_compromise.jpg",
        text: "My soul has left my body. It's hovering near the suspended ceiling tiles, watching me place invisible hotspots on a 2009 stock photo of a padlock. The photographer's watermark is on the model's face. His name is Greg. I cannot afford to remove Greg. I've accepted Greg. Greg is part of the module now. Greg didn't ask for any of this, but here we are. Greg is hitting Publish.",
        choices: [ { text: "Stare at the progress bar.", target: "loading_bar", timeCost: 10 } ]
    },
    "meta_escape": {
        speaker: "System", color: "var(--success-green)", textColor: "#000",
        image: "assets/images/5_2_winner.jpg",
        text: "You opened the browser console. You typed delete storyData['tarun']. Baron Von Snoutstache fragmented mid-sentence — Comic Sans pieces, everywhere. The escape room mood board dissolved. Gerald the rock returned to the void. A calm voice said: 'You were always a developer.' You didn't know what that meant. You cried anyway. The progress bar reached 100%. It stayed there. You have never felt this clean.",
        endingTitle: "THE NEO ID", endingTitleType: "secret",
        choices: [
            { text: "Re-enter the Matrix (Restart Shift)", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    },
    "rogue_export": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/3_4_rogue.jpg",
        text: "You exported the clean version and walked out to 'Eye of the Tiger.' The module went live. 4.8 stars. 91% completion rate — the only eLearning anyone has ever finished on purpose. Three days later, Von Snoutstache sent an email to you, your manager, your manager's manager, and somehow Facilities — subject line: 'Creative Unilateralism: A Formal Concern.' You were let go. Your module still runs. A plaque is forming.",
        endingTitle: "THE MARTYR",
        choices: [
            { text: "Restart Shift", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    },
    "loading_bar": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/4_1_loading.jpg",
        text: "5:15 PM. The SCORM compiler is doing what SCORM compilers do, which no living person fully understands. The bar is at 99%. It has been at 99% for four minutes. Your laptop fan has entered a new spiritual phase. The office is empty. A moth has been watching from the light fixture since 3 PM. It is witnessing this. It has seen things. DO NOT TOUCH ANYTHING.",
        isTrap: true, forceTime: 1035,
        variants: [
            {
                id: "returning-loading",
                conditions: ["playCount:>= 1"],
                text: "5:15 PM. Again. The bar is at 99%. The moth arrived before you did — it was already here when you sat down. It knew. The fan is doing its thing. You know what happens next. You've always known. DO NOT TOUCH ANYTHING. The moth is watching more carefully this time."
            },
            {
                id: "greg-loading",
                conditions: ["visited:compromise"],
                text: "5:15 PM. Greg is in the SCORM package. The Greg watermark is compiling alongside every slide. The bar is at 99%. Somewhere in this executable, Greg is waiting. Your soul is still near the ceiling. The moth arrived fifteen minutes ago and has not moved. DO NOT TOUCH ANYTHING. Greg wouldn't."
            }
        ],
        choices: []
    },
    "crash": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/4_3_crash.jpg",
        text: "You touched something. You absolute gremlin. The screen goes white. 'Articulate Storyline has stopped responding.' You open the auto-recovery folder. One file. A title slide that says 'Module 3: Security Awareness.' That's it. That's everything that survived. The moth watched this happen and has not moved. It is processing.",
        endingTitle: "FATAL ERROR",
        variants: [
            {
                id: "returning-crash",
                conditions: ["playCount:>= 1"],
                text: "Again. You touched something again. The moth was already positioned for this. 'Storyline has stopped responding.' The recovery file is the same title slide. Module 3. Gerald the rock is in there, somewhere, unrendered and eternal. The moth has seen this before. So have you. So has the moth."
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
        text: "PRIYA! Incredible output! Peak performance! One small thing — Von Snoutstache messaged from his mountain villa. 'Corporate Teal' and 'Corporate Blue' are, quote, 'philosophically incompatible.' The blue is making the learning feel anxious. He needs Teal. All 87 slides. Before you leave. He included the hex code. The hex code is just the word TEAL in capitals. I have checked this three times. It just says TEAL.",
        variants: [
            {
                id: "high-quality-upload",
                conditions: ["quality:>= 80"],
                text: "PRIYA! The work today is genuinely excellent — I want to name that — which makes this harder to say. Von Snoutstache. Mountain villa. 'Corporate Teal' versus 'Corporate Blue.' Philosophically incompatible. I'm reading that phrase back to myself and I don't know what he means. All 87 slides. The hex code says TEAL. Just the word. In capitals. I am so sorry, Priya."
            }
        ],
        choices: [
            { text: "Manually change all 87 slides. By hand.", target: "martyr_office", timeCost: 90, qualityCost: -10,
              remember: true, rememberText: "Priya will remember this." },
            { text: "Gaslight the VP with fake tech specs.", target: "true_winner", timeCost: 5, qualityCost: 20 },
            { text: "Export as PowerPoint and email it.", target: "ppt_promotion", timeCost: 5, qualityCost: -100 }
        ]
    },
    "martyr_office": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/5_1_martyr.jpg",
        text: "You changed 87 slides. By hand. Slides 23 to 31 were grouped inside a master layout from a template built in 2018 by someone who no longer works here, or in this industry, or possibly in this country. You redid them twice. Your paw slipped on slide 34. By the time you uploaded, the LMS was down for scheduled maintenance. Until Monday. The moth left before you did. It had seen enough.",
        endingTitle: "JUST ANOTHER FRIDAY",
        variants: [
            {
                id: "repeat-martyr",
                conditions: ["playCount:>= 2"],
                text: "87 slides. Again. The cleaning crew now routes around your desk as if you are load-bearing infrastructure. One of them has been leaving a small bowl of water near your workstation. The 2018 template. Still there. Same slides. Same error. Slide 34. The LMS was down. Until Monday. The moth nodded at you when you arrived. That felt significant."
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
        text: "You renamed it 'Interactive_Module_Final_v2_TEAL.pptx' and sent it with no further comment. Von Snoutstache replied in 45 seconds — full capitals — that this was EXACTLY THE ENERGY HE DESCRIBED. He forwarded it to the CEO. You were promoted to Global Head of Learning Innovation. You accepted with a single thumbs-up emoji sent at 6:03 PM. You have not been fully present in a meeting since. The PowerPoint has seventeen slides. Thirteen of them are title cards.",
        endingTitle: "THE CORPORATE SELLOUT",
        choices: [
            { text: "Restart Shift", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    },
    "true_winner": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/6_2_true_winner.jpg",
        text: "Actually, Tarun — the polymorphic stylesheet cascade runs an automated override at GMT midnight. The LMS cache purges, triggers the blue-to-teal array we built in Sprint 6. It's done. It's been done since this morning. You approved it in the retrospective. I sent a deck called 'Sprint 6 Summary — Please Read.' You sent a thumbs-up at 11 PM on a Sunday. She pauses. She lets this land. She has never been more patient in her life.",
        choices: [ { text: "Watch Tarun absorb this information.", target: "victory_screen" } ]
    },
    "victory_screen": {
        speaker: "System", color: "var(--success-green)", textColor: "#000",
        image: "assets/images/6_3_victory.jpg",
        text: "Tarun blinks. Once. Twice. Like something small waking up. 'Sprint 6,' he says. 'The polymorphic one.' 'That's the one,' you say. He nods for longer than is socially comfortable. Then: 'superb alignment.' You close your laptop with the quiet dignity of someone who has weaponised a grown man's ignorance to survive a Friday evening. Uber. Two minutes. Zero surge. You leave. The moth dips once. You win.",
        endingTitle: "THE SME WHISPERER", endingTitleType: "victory",
        variants: [
            {
                id: "veteran-victory",
                conditions: ["playCount:>= 2"],
                text: "Tarun blinks. 'Sprint 6.' 'The polymorphic one.' You've said these words before, and they still work. You've seen the other paths — the 87 slides, Greg, the cleaning crew, the bowl of water — and you chose this one deliberately. 'Superb alignment,' Tarun says. You close your laptop. The moth dips once. You earned it. You really did this time."
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
        text: "Patience reaches zero. You close your laptop like a judge's gavel. You pick up your bag. You look at Tarun. At the error screen. At the moth. The moth looks back. You nod at each other. You leave. Four Slack messages arrive before you reach the lifts. The fourth says 're: the teal.' You block the channel without reading it. Behind you, a legend is already forming.",
        endingTitle: "GLORIOUS RAGE QUIT",
        choices: [
            { text: "Restart Shift", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    },
    "martyr": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/6_5_martyr.jpg",
        text: "6:30 PM. The LMS is still down. You are still here. The cleaning crew has developed a route around your desk and treats you as a fixed feature of the environment. One of them has been leaving a small bowl of water nearby out of what appears to be genuine concern for your welfare. The moth hasn't moved from the fixture. You've stopped pretending this will resolve tonight. You have an understanding now. Two creatures who stayed too long.",
        endingTitle: "OVERTIME MARTYRDOM", forceTime: 1110,
        choices: [
            { text: "Restart Shift", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    }
};
