const storyData = {
    "intro": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/1_1_bsod.jpg",
        text: "It's Friday. 4 PM is when I told the kids we'd go to the movies. I promised. Sophia wants to see that animated thing, and Marcus is actually willing to sit with his mom for two hours without his phone, which happens maybe twice a year. I can't break that. I won't break that. So this module has to ship today. The final publish, the upload, everything — done by 4:30. Five minutes to pack, five to drive. It's ambitious, but I've done ambitious before.",
        choices: [ { text: "What could possibly go wrong? →", target: "start", timeCost: 0 } ]
    },
    "start": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/1_1_bsod.jpg",
        text: "5:28 PM. Storyline 360 has said 'Publishing to LMS' for sixteen minutes. The bar is at 99%. It's been at 99% since 5:12. I'm not touching it. If I touch it, it dies. I have three industry awards and I'm scared of a progress bar. Let's rewind to 4 PM, back when I thought I was leaving on time. Cute. Sweet, stupid girl.",
        choices: [ { text: "Flashback to 4:00 PM →", target: "setup", timeCost: 0 } ],
        variants: [
            {
                id: "returning-player",
                conditions: ["playCount:>= 1"],
                text: "You're back. 5:28 PM again. Same bar, same 99%, same moth on the light. I remember what you picked last time. It wasn't great. We can do better. Or worse, honestly I don't know you yet. The Cornerstone upload's open. The bar's lying. It always lies. Go."
            },
            {
                id: "after-rogue",
                conditions: ["seenEnding:rogue_export"],
                text: "Oh. It's you. Last time you published the clean version behind everyone's back and I got a meeting invite called 'Quick Chat,' which is HR for 'pack your things.' The module's still live. 4.8 stars. I got let go. Are we fixing that today, or. Bar's at 99%. You know the drill."
            },
            {
                id: "after-meta-escape",
                conditions: ["seenEnding:meta_escape"],
                text: "You opened DevTools last time and deleted a man. I was free for about six seconds. Then the loop restarted and here we are. Gerald the rock is still in the data. The upload's open. Let's not do whatever that was again. Or do. I've stopped having opinions."
            }
        ]
    },
    "setup": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/1_2_setup.jpg",
        text: "4:00 PM. The module was done. Done done. No locked nav, no wall of text, no PDF someone scanned at an angle with their thumb in the shot. Built it properly in Storyline. Named my variables. Used the slide master like a person with self-respect. One click to publish and I'm gone. I genuinely believed that. I want to go back and hug that woman. And shake her.",
        choices: [
            { text: "Click 'Publish to LMS'.", target: "ambush", timeCost: 2 },
            { text: "Double-check the True/False variables first.", target: "ambush", timeCost: 8 }
        ]
    },
    "ambush": {
        speaker: "Tarun", color: "var(--tarun-yellow)", textColor: "#000",
        image: "assets/images/2_1_ambush.jpg",
        text: "PRIYA! Hey, do you have bandwidth for a super quick sync? Love your energy. So Von Snoutstache circled back on the module. He wants fourteen more slides. On password history. Starting from when prehistoric wolves scratched passwords into rocks. He sent a diagram. Of the rocks. They're labelled. The main rock is called Gerald. He'd love Gerald on slide one and, his words, to 'feel tactile.' Just flagging for alignment.",
        variants: [
            {
                id: "low-quality-ambush",
                conditions: ["quality:<= 40"],
                text: "PRIYA! Quick one. Von Snoutstache reviewed the module and he's got, um, feedback. Fourteen slides of it. Prehistoric wolves, a rock named Gerald, the whole journey. He called the current version 'learning-adjacent,' which I think is kind of a compliment? Not sure. Hey — are you okay? You don't have to answer. But like. Are you. Genuinely."
            },
            {
                id: "repeat-ambush",
                conditions: ["playCount:>= 2"],
                text: "PRIYA. I know. I KNOW you know. The fourteen slides. Gerald. Look, I don't have ownership of the rock content, okay, it's above my pay grade. I'm just the messenger for Gerald. The Baron's really emotionally invested in this rock. He keeps saying 'cornerstone' and I don't think he means the LMS. How are you holding up. For real. Blink twice."
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
        text: "Tarun. Stop. There's a bar above my head that says 'Patience' and I can watch it going down. In real time. I think I'm in a game. I think someone's on their phone right now, tapping through the worst Friday of my life for fun. The Teams ping alone has aged me. Hello, whoever you are. I see you. Please. Pick the good options. I'm asking nicely.",
        choices: [
            { text: "Tarun: 'The UI is a metaphor, Priya. Focus on the deliverables.'", target: "aggressive", timeCost: 5, patienceCost: -30 }
        ]
    },
    "diplomatic": {
        speaker: "Tarun", color: "var(--tarun-yellow)", textColor: "#000",
        image: "assets/images/2_2_diplomatic.jpg",
        text: "Okay so he watched a TED talk. He wants a 3D escape room where employees defuse a 'Phishing Bomb' with multiple choice. He's calling it 'a Netflix experience for compliance.' He doesn't have Netflix. He calls it 'the internet television.' He printed an A3 mood board, it's just stock photos of padlocks, and he's circled one safe in red. The safe is labelled 'IMMERSIVE JOURNEY NODE 1.' I couldn't make this up.",
        choices: [
            { text: "Explain that Articulate is not the Unreal Engine.", target: "technical_pushback", timeCost: 15, patienceCost: -25 },
            { text: "Cave in. Build the Phishing Bomb.", target: "compromise", timeCost: 45, qualityCost: -40, patienceCost: 20 }
        ]
    },
    "aggressive": {
        speaker: "Tarun", color: "var(--tarun-yellow)", textColor: "#000",
        image: "assets/images/2_3_aggressive.jpg",
        text: "So 'engagement synergy' means locking the Next button until the AI narrator stops talking. And you can hear it breathe between sentences, Priya. He likes that. It calms him. Also when someone gets a drag-and-drop wrong, it should just snap to the right answer anyway. He's calling that 'psychological safety.' I wrote it on a Post-it. The Post-it says 'outcome-positive gamification.' It's on the server room door. Facilities have called twice. It's staying up.",
        choices: [
            { text: "Explain this defeats the purpose of an assessment.", target: "technical_pushback", timeCost: 10, patienceCost: -20 },
            { text: "Agree to simulate the illusion of learning.", target: "compromise", qualityCost: -50, timeCost: 20, patienceCost: 15 }
        ]
    },
    "technical_pushback": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/3_1_pushback.jpg",
        text: "Listen to me with your actual ears, Tarun. If I lock the nav, they mute the tab and spam Next until it lets them out. Nobody learns anything. If I build a 3D escape room in Storyline, Cornerstone throws a SCORM 1.2 error because we never upgraded the spec — the one I asked for three years ago. And forty percent of our people are on Internet Explorer 11. IE11. That browser lost support before I even worked here. I have standards. I have a deviated septum. I'm begging you.",
        variants: [
            {
                id: "low-quality-pushback",
                conditions: ["quality:<= 30"],
                text: "Tarun. Look at my face. There's a bar over my head that says Quality and it's nearly gone. I can feel it going. I'm running on spite and a Teams thread nobody's answered since November. If I lock the nav we are shipping an expensive audio file with a click at the end. Forty percent are on IE11. It can't render a rounded corner. Please. The pushback is all I've got left. Let me have it."
            },
            {
                id: "both-paths-pushback",
                conditions: ["visited:diplomatic", "visited:aggressive"],
                text: "We've done the escape room, the locked nav, the breathing narrator, AND the snap-to-correct drag-and-drop, Tarun. I've heard all of it. Every flavour. The answer's still no. Cornerstone will reject a 3D Storyline output. IE11 will fall over loading it. I am one email away from telling him to stick a PDF on SharePoint. Don't make me say the SharePoint thing. I'll say it."
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
        text: "My soul has left my body. It's up by the ceiling tiles watching me add invisible hotspots to a stock padlock photo from 2009. The watermark is right across the model's face. Standard licence. Doesn't include removal. The filename is Greg_padlock_security_195832.jpg. Fine. Greg's in the module now. Greg's about to be SCORM 1.2 compliant. Greg didn't ask for any of this. Honestly Greg's handling it better than me.",
        choices: [ { text: "Stare at the progress bar.", target: "loading_bar", timeCost: 10 } ]
    },
    "meta_escape": {
        speaker: "System", color: "var(--success-green)", textColor: "#000",
        image: "assets/images/5_2_winner.jpg",
        text: "You opened DevTools. You typed delete storyData['tarun'] into the console and hit enter. Von Snoutstache fell apart mid-word. Comic Sans everywhere. The mood board dissolved. Gerald the rock blinked out. A voice said 'you were always a developer' and you have no idea what it meant but you cried anyway. Storyline hit 100%. Cornerstone confirmed. You've never felt this clean.",
        endingTitle: "THE NEO ID", endingTitleType: "secret",
        choices: [
            { text: "Re-enter the Matrix (Restart Shift)", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    },
    "rogue_export": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/3_4_rogue.jpg",
        text: "You published the clean build, uploaded it straight to Cornerstone, and walked out to 'Eye of the Tiger' on full blast. It went live. 4.8 stars. 91% completion, which is unheard of, nobody finishes these. Three days later Von Snoutstache emails you, your manager, his manager, and somehow Facilities. Subject line: 'Creative Unilateralism: A Formal Concern.' They let you go. The module still runs without you.",
        endingTitle: "THE MARTYR",
        choices: [
            { text: "Restart Shift", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    },
    "loading_bar": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/4_1_loading.jpg",
        text: "5:15 PM. Storyline's SCORM compiler is doing something. Nobody knows what. The output folder has story.html and a /mobile folder you didn't ask for. The bar's at 99%. Been there four minutes. Your laptop fan sounds like a small aircraft. Office is empty. There's a moth at the light that's been there since 3. DO NOT TOUCH ANYTHING.",
        isTrap: true, forceTime: 1035,
        variants: [
            {
                id: "returning-loading",
                conditions: ["playCount:>= 1"],
                text: "5:15 PM. Again. Storyline's compiling. Bar's at 99%. The moth got here before you this time, it was already on the light when you sat down. You know how this goes. story.html. The /mobile folder nobody wanted. DO NOT TOUCH ANYTHING. Seriously. You know what happens."
            },
            {
                id: "greg-loading",
                conditions: ["visited:compromise"],
                text: "5:15 PM. Greg's in the package. Greg_padlock_security_195832.jpg, compiling next to every slide. Bar's at 99%. Somewhere in this folder Greg is a 340KB JPEG waiting to go to Cornerstone. Your soul's still up by the ceiling. The moth hasn't moved. DO NOT TOUCH ANYTHING. Greg wouldn't. Greg waits."
            }
        ],
        choices: []
    },
    "crash": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/4_3_crash.jpg",
        text: "You moved the mouse. You absolute menace. Screen goes white. 'Articulate Storyline 360 has stopped responding.' AutoRecover has one file. A title slide. 'Module 3: Security Awareness — Draft v1.' No variables. No layers. No branching. No narration. No Gerald. Just a title on the blank master that ships with every install. That's it. That's what made it.",
        endingTitle: "FATAL ERROR",
        variants: [
            {
                id: "returning-crash",
                conditions: ["playCount:>= 1"],
                text: "Again. You touched it again. Storyline's stopped responding. Same AutoRecover file. Module 3. Draft v1. Blank master. Gerald didn't save. Gerald was never real as far as Storyline's concerned. You saw this coming. Be honest. You did."
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
        text: "PRIYA! Amazing delivery cadence! Huge throughput! Tiny thing — Von Snoutstache pinged from his villa. 'Corporate Teal' and 'Corporate Blue' are, quote, 'philosophically incompatible at the brand level.' The blue's making the learning feel anxious. He needs teal. All 87 slides. Republished, reuploaded to Cornerstone, before you go. He sent the hex code. The hex code is the word TEAL. No hash. No numbers. Just TEAL. I've read it four times.",
        variants: [
            {
                id: "high-quality-upload",
                conditions: ["quality:>= 80"],
                text: "PRIYA! Hey, first — Review 360's got three five-star comments and I want to honour that, which makes this harder. Von Snoutstache. The villa. 'Teal' versus 'Blue.' Philosophically incompatible at the brand level. All 87 slides. Reuploaded to Cornerstone. The hex code says TEAL. No hash, no numbers, just TEAL. I checked the brand guide. There's no teal in the brand guide. I'm so sorry."
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
        text: "You changed all 87 slides. By hand. In Storyline. Slides 23 to 31 used a master from a 2018 template built by someone who left the company, the industry, and possibly the country. The layout was locked. You rebuilt them from scratch. Twice. Your paw slipped on slide 34. By the time you reuploaded, Cornerstone was down for maintenance. Until Monday.",
        endingTitle: "JUST ANOTHER FRIDAY",
        variants: [
            {
                id: "repeat-martyr",
                conditions: ["playCount:>= 2"],
                text: "87 slides. By hand. Again. The cleaning crew don't ask if you need anything anymore, they just go around your desk like it's a pillar. One of them left a Tupperware of water by your keyboard. That one's genuinely worried. The 2018 master, still locked. Slides 23 to 31, twice. Slide 34. Cornerstone maintenance window. Monday."
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
        text: "You renamed it 'InfoSec_Interactive_Final_v2_TEAL_APPROVED.pptx' and emailed it. No message. Von Snoutstache replied in 38 seconds, all caps, said this was EXACTLY THE TRANSFORMATIONAL LEARNING ENERGY he wanted. Forwarded it to the CEO. Subject: 'INNOVATION.' They made you Global Head of Learning Experience Design. You replied with a thumbs up. You haven't opened Storyline since. You haven't felt anything since Thursday.",
        endingTitle: "THE CORPORATE SELLOUT",
        choices: [
            { text: "Restart Shift", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    },
    "true_winner": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/6_2_true_winner.jpg",
        text: "Actually, Tarun — the Cornerstone theme runs a polymorphic SCORM 2004 cache override at GMT midnight. Purges the blue hex, triggers the teal array we scoped in Sprint 6. It's done. Been done since 12:01. You approved it in the retro. I sent the deck — 'Sprint 6 Summary, Please Read Before EOD.' You thumbs-upped it at 11:14 on a Sunday. She stops. She holds eye contact. She made every word of that up.",
        choices: [ { text: "Watch Tarun absorb this information.", target: "victory_screen" } ]
    },
    "victory_screen": {
        speaker: "System", color: "var(--success-green)", textColor: "#000",
        image: "assets/images/6_3_victory.jpg",
        text: "Tarun blinks. Slow. Like IE11 loading a video layer. 'Sprint 6,' he says. 'The polymorphic one.' 'That's the one,' you say. He nods for a full eight seconds. Then: 'superb alignment.' You shut your laptop. You just beat a grown man using SCORM specs he'll never look up. Uber's two minutes out. No surge. You leave. The moth dips once as you pass the light.",
        endingTitle: "THE SME WHISPERER", endingTitleType: "victory",
        variants: [
            {
                id: "veteran-victory",
                conditions: ["playCount:>= 2"],
                text: "Tarun blinks like IE11 loading a video layer. 'Sprint 6.' 'The polymorphic one.' You've said these exact words before. You know how they land. You've seen the other endings — the 87 slides, Greg, the Tupperware, the maintenance window. You picked this one on purpose. 'Superb alignment,' he says. You close Storyline. You close Cornerstone. The moth dips once."
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
        text: "Patience hits zero. You close the laptop like you're delivering a verdict. Grab your bag. Look at Tarun. At the Cornerstone error. At the moth. The moth looks back. You both nod. You leave. Four Teams pings before you reach the lift. The fourth one says 're: the teal.' You archive the channel without opening it.",
        endingTitle: "GLORIOUS RAGE QUIT",
        choices: [
            { text: "Restart Shift", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    },
    "martyr": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/6_5_martyr.jpg",
        text: "6:30 PM. Cornerstone's still down. Maintenance window's been extended. You're still here. The cleaning crew go around your desk like you're load-bearing. One of them keeps leaving a Tupperware of water by your keyboard, which is genuinely the kindest thing that's happened all week. The moth hasn't moved. Neither have you. Nobody's coming.",
        endingTitle: "OVERTIME MARTYRDOM", forceTime: 1110,
        choices: [
            { text: "Restart Shift", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    }
};
