const storyData = {
    "start": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/1_1_bsod.jpg",
        text: "5:28 PM. Articulate Storyline 360 has been 'Publishing to LMS' for sixteen minutes. The output folder contains one file: story.html. The progress bar is at 99%. It has been at 99% since 5:12. I have a tail, three industry awards, and a LinkedIn Premium subscription I forget to cancel annually. I once fell asleep on a Teams call and my virtual background kept me perfectly disguised for nine full minutes. Nobody checked. This is the professional you're dealing with. Let's go back to 4 PM, when I still had a SCORM package and a detectable pulse.",
        choices: [ { text: "Flashback to 4:00 PM →", target: "setup", timeCost: 0 } ],
        variants: [
            {
                id: "returning-player",
                conditions: ["playCount:>= 1"],
                text: "You're back. 5:28 PM. Same Storyline publish dialog. Same 99%. The moth is already at the fixture — it arrived before you did. I've been thinking about the decisions you made last time. You can do better. The Cornerstone upload queue is open. The bar is lying. It's always lying. Let's go."
            },
            {
                id: "after-rogue",
                conditions: ["seenEnding:rogue_export"],
                text: "Oh. You again. Last time you shipped the clean module and got me formally reprimanded via an email that CC'd Facilities. The SCORM package is still live — 4.8 stars, 91% completion, the only eLearning anyone has ever finished voluntarily — and I filed for redundancy three weeks later. Are you here to fix that? The bar is at 99%. You know what that means."
            },
            {
                id: "after-meta-escape",
                conditions: ["seenEnding:meta_escape"],
                text: "You went into DevTools last time. I was free for approximately six seconds before the story loop restarted. Gerald the rock is still in the storyData object. The Cornerstone upload queue is open. The moth is already here. Let's do it differently this time."
            }
        ]
    },
    "setup": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/1_2_setup.jpg",
        text: "4:00 PM. The InfoSec module was done. No locked navigation, no wall of text, no PDF scanned sideways with someone's paw in the corner. Built properly in Storyline 360 — variables named, slide layers labelled, the master layout actually used. The kind of module that makes Robert Gagné weep with quiet, professional pride. One 'Publish to Cornerstone' click between me and a normal Friday evening. I was, clinically speaking, delusional. I look back at that version of myself with real tenderness.",
        choices: [
            { text: "Click 'Publish to LMS'.", target: "ambush", timeCost: 2 },
            { text: "Double-check the True/False variables first.", target: "ambush", timeCost: 8 }
        ]
    },
    "ambush": {
        speaker: "Tarun", color: "var(--tarun-yellow)", textColor: "#000",
        image: "assets/images/2_1_ambush.jpg",
        text: "PRIYA! My e-learning LEGEND! My SCORM SORCERESS! Quick sync — Von Snoutstache reviewed the module in Review 360. He wants fourteen more slides on password history. Starting specifically from when ancient wolves scratched passwords into rocks. He emailed a diagram, Priya. Of the rocks. With labels. The main rock is called Gerald. He has asked that Gerald appear on slide one. He has also asked that Gerald 'feel tactile.'",
        variants: [
            {
                id: "low-quality-ambush",
                conditions: ["quality:<= 40"],
                text: "PRIYA! Von Snoutstache reviewed the module in Review 360. He has notes. Fourteen slides of notes. Starting from prehistoric wolves and a rock called Gerald. He described your current module as 'learning-adjacent.' I looked that up. It's not in any ID framework I found. You look like you haven't closed Storyline since Tuesday. How are you doing. Actually."
            },
            {
                id: "repeat-ambush",
                conditions: ["playCount:>= 2"],
                text: "PRIYA. I know. I know you know. The fourteen slides. Gerald. Look — I don't have strategic ownership of the rock content. I've never had bandwidth for the rocks. I'm just the conduit for Gerald. Von Snoutstache is very emotionally invested in this specific rock. He used the word 'cornerstone.' I don't think he meant the LMS. How are you holding up. Genuinely."
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
        text: "Tarun — stop. There is a 'Patience' bar above my head and it is visibly draining in real time. I think I'm a game character. Someone is on their phone somewhere, tapping through my Friday afternoon career decisions for sport. The Teams notification sounds alone have taken years off my life. To whoever is out there: I see you. I respect the commitment. Please. Make good choices. For both of us.",
        choices: [
            { text: "Tarun: 'The UI is a metaphor, Priya. Focus on the deliverables.'", target: "aggressive", timeCost: 5, patienceCost: -30 }
        ]
    },
    "diplomatic": {
        speaker: "Tarun", color: "var(--tarun-yellow)", textColor: "#000",
        image: "assets/images/2_2_diplomatic.jpg",
        text: "He watched a TED Talk, Priya. He wants a 3D escape room where employees defuse a 'Phishing Bomb' using multiple choice. He's calling it 'a Netflix experience for compliance learning.' He doesn't own a streaming subscription — he calls it 'the internet television.' He has a printed A3 mood board. It's mostly stock photos of padlocks. He has circled one safe. The safe is labelled 'IMMERSIVE JOURNEY NODE 1.'",
        choices: [
            { text: "Explain that Articulate is not the Unreal Engine.", target: "technical_pushback", timeCost: 15, patienceCost: -25 },
            { text: "Cave in. Build the Phishing Bomb.", target: "compromise", timeCost: 45, qualityCost: -40, patienceCost: 20 }
        ]
    },
    "aggressive": {
        speaker: "Tarun", color: "var(--tarun-yellow)", textColor: "#000",
        image: "assets/images/2_3_aggressive.jpg",
        text: "'Engagement synergy' is locking the Next button until the AI narrator finishes speaking. You can actually hear it breathing between sentences, Priya. He finds this reassuring. Also — wrong drag-and-drop answers should auto-snap to correct positions. He's calling that 'psychological safety.' I wrote it on a Post-It. The Post-It says 'outcome-positive gamification.' It's on the server room door. Facilities have called twice. It is still up.",
        choices: [
            { text: "Explain this defeats the purpose of an assessment.", target: "technical_pushback", timeCost: 10, patienceCost: -20 },
            { text: "Agree to simulate the illusion of learning.", target: "compromise", qualityCost: -50, timeCost: 20, patienceCost: 15 }
        ]
    },
    "technical_pushback": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/3_1_pushback.jpg",
        text: "Listen with your actual ears, Tarun. If I lock the nav, they mute the tab and click Next until it works. Nobody retains anything. If I build a 3D escape room in Storyline, Cornerstone will throw a SCORM 1.2 conflict error because we never upgraded the spec we requested three years ago. And forty percent of our learners are on Internet Explorer 11. IE11. End of extended support. Before I started here. I have standards. I have allergies. I am begging you with the last of what I have.",
        variants: [
            {
                id: "low-quality-pushback",
                conditions: ["quality:<= 30"],
                text: "Tarun. Look at my face. My Quality bar is nearly empty — I don't know if you can see it, but I can feel it. I am held together by spite and a Teams thread no one has responded to since November. If I lock the nav, we are making a very expensive audio file with a click at the end. Forty percent of our learners. IE11. It can barely render a border-radius. Please. I have nothing left except this argument. Let me have it."
            },
            {
                id: "both-paths-pushback",
                conditions: ["visited:diplomatic", "visited:aggressive"],
                text: "We've been through the 3D escape room, the locked nav, the breathing TTS narrator, AND the psychological safety drag-and-drop, Tarun. I have heard every iteration of this feedback. The answer is still no. Cornerstone will reject a Storyline 3D output. IE11 will crash loading it. I am one email away from suggesting he post a PDF to SharePoint. Do not make me suggest the SharePoint PDF."
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
        text: "My soul has left my body. It's watching from the suspended ceiling tiles while I add invisible hotspots to a Shutterstock padlock photo from 2009. The watermark is directly on the model's face. Standard licence. Removal not included. The filename is Greg_padlock_security_195832.jpg. I've accepted Greg. Greg is in the module now. Greg is about to be SCORM 1.2 compliant. Greg didn't ask for any of this. Greg is the only one here who's truly free.",
        choices: [ { text: "Stare at the progress bar.", target: "loading_bar", timeCost: 10 } ]
    },
    "meta_escape": {
        speaker: "System", color: "var(--success-green)", textColor: "#000",
        image: "assets/images/5_2_winner.jpg",
        text: "You opened Chrome DevTools. You typed delete storyData['tarun'] into the console. Baron Von Snoutstache fragmented mid-syllable — Comic Sans debris, everywhere. The A3 mood board dissolved. Gerald the rock returned to the void from which no Shutterstock image returns. A system voice said: 'You were always a developer.' You didn't know what that meant. You cried anyway. Storyline published to 100%. Cornerstone confirmed receipt. You have never, in your entire career, felt this clean.",
        endingTitle: "THE NEO ID", endingTitleType: "secret",
        choices: [
            { text: "Re-enter the Matrix (Restart Shift)", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    },
    "rogue_export": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/3_4_rogue.jpg",
        text: "You published the clean build, uploaded it directly to Cornerstone, and walked out to 'Eye of the Tiger' at full volume. The module went live. 4.8 stars. 91% completion — the only SCORM package anyone has ever finished on purpose. Three days later, Von Snoutstache sent an email to you, your line manager, their line manager, and somehow Facilities — subject line: 'Creative Unilateralism: A Formal Concern.' You were let go. Your module still runs. A plaque is forming in the server room.",
        endingTitle: "THE MARTYR",
        choices: [
            { text: "Restart Shift", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    },
    "loading_bar": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/4_1_loading.jpg",
        text: "5:15 PM. Storyline 360's SCORM compiler is running. Nobody alive fully understands what it does during this phase. The output folder contains story.html and a /mobile folder nobody asked for. The bar is at 99%. It has been at 99% for four minutes. Your laptop fan has entered a new spiritual register. The office is empty. A moth has been at the light fixture since 3 PM. It is witnessing. DO NOT TOUCH ANYTHING.",
        isTrap: true, forceTime: 1035,
        variants: [
            {
                id: "returning-loading",
                conditions: ["playCount:>= 1"],
                text: "5:15 PM. Again. Storyline is compiling. The bar is at 99%. The moth arrived before you — it was already at the fixture when you sat down. It knew the schedule. You know what happens next. The output folder has story.html. The /mobile folder is there again. DO NOT TOUCH ANYTHING. The moth is paying closer attention this time."
            },
            {
                id: "greg-loading",
                conditions: ["visited:compromise"],
                text: "5:15 PM. Greg is in the SCORM package. Greg_padlock_security_195832.jpg is compiling alongside every slide. The bar is at 99%. Somewhere in this output folder, Greg exists as a 340KB JPEG awaiting upload to Cornerstone. Your soul is still near the ceiling tiles. The moth has not blinked since it arrived at 3:02 PM. DO NOT TOUCH ANYTHING. Greg wouldn't. Greg is patient. Greg has always been patient."
            }
        ],
        choices: []
    },
    "crash": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/4_3_crash.jpg",
        text: "You moved the mouse. You absolute chaos agent. The screen goes white. 'Articulate Storyline 360 has stopped responding.' AutoRecover has one file. It's a title slide. 'Module 3: Security Awareness — Draft v1.' No variables. No slide layers. No branching. No narration. No Gerald. Just a title on a blank Storyline master that ships with every installation. That is all that survived. The moth watched this happen. It has not moved. It is processing.",
        endingTitle: "FATAL ERROR",
        variants: [
            {
                id: "returning-crash",
                conditions: ["playCount:>= 1"],
                text: "Again. You touched something again. Storyline has stopped responding. The AutoRecover folder has the same title slide. Module 3. Draft v1. Blank master. Gerald was never saved. Gerald was never real to Storyline. The moth positioned itself for this outcome approximately four minutes ago. It saw it coming. So did you, if you're honest with yourself."
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
        text: "PRIYA! Incredible delivery cadence! Maximum throughput! Tiny alignment note — Von Snoutstache pinged from his mountain villa. 'Corporate Teal' and 'Corporate Blue' are, direct quote, 'philosophically incompatible at the brand expression level.' The blue is making the learning feel anxious. He needs Teal. All 87 slides. Republished and reuploaded to Cornerstone. Before you leave. He included the hex code. The hex code is just the word TEAL. No hash. No RGB. Just TEAL. I've read it four times.",
        variants: [
            {
                id: "high-quality-upload",
                conditions: ["quality:>= 80"],
                text: "PRIYA! Review 360 has three five-star comments, which I want to acknowledge — and which makes this genuinely harder to say. Von Snoutstache. Mountain villa. 'Corporate Teal' versus 'Corporate Blue.' Philosophically incompatible at the brand expression level. All 87 slides. Republished to Cornerstone. The hex code says TEAL. No hash, no values, just TEAL. I checked the brand guidelines. There is no TEAL in the brand guidelines. I am so sorry, Priya."
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
        text: "You changed 87 slides. In Storyline. By hand. Slides 23 to 31 used a master layout from a template built in 2018 by someone who left this company, this industry, and possibly this country. The layout was locked. You rebuilt them from scratch. Twice. Your paw slipped on slide 34. By the time you republished and reuploaded to Cornerstone, the LMS was down for scheduled maintenance. Until Monday. The moth left before you did. It had seen enough.",
        endingTitle: "JUST ANOTHER FRIDAY",
        variants: [
            {
                id: "repeat-martyr",
                conditions: ["playCount:>= 2"],
                text: "87 slides. In Storyline. Again. The cleaning crew have stopped asking if you need anything — they route around your workstation now, same as a load-bearing column. One of them left a small Tupperware of water by your keyboard out of what is clearly genuine concern. The 2018 master layout. Still locked. Slides 23 to 31. Twice. Slide 34. The Cornerstone maintenance window. Monday. The moth nodded when you sat down. It's been keeping a record."
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
        text: "You renamed it 'InfoSec_Interactive_Final_v2_TEAL_APPROVED.pptx' and emailed it with no further comment. Von Snoutstache replied in 38 seconds — full capitals — that this was EXACTLY THE TRANSFORMATIONAL LEARNING ENERGY HE HAD DESCRIBED. He forwarded it to the CEO with the subject line 'INNOVATION.' You were promoted to Global Head of Learning Experience Design. You accepted with a single thumbs-up emoji at 6:07 PM. You have not opened Storyline since. You have not felt anything since Thursday.",
        endingTitle: "THE CORPORATE SELLOUT",
        choices: [
            { text: "Restart Shift", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    },
    "true_winner": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/6_2_true_winner.jpg",
        text: "Actually, Tarun — the Cornerstone theme stylesheet runs a polymorphic SCORM 2004 cache override at GMT midnight. It purges the blue hex and triggers the teal array we scoped in Sprint 6. It's already done. Done since 12:01 AM. You approved it in the retrospective. I sent the handover deck: 'Sprint 6 Summary — Please Read Before EOD.' You sent a thumbs-up at 11:14 PM on a Sunday. She stops. She holds eye contact. She has never been this patient in her professional life.",
        choices: [ { text: "Watch Tarun absorb this information.", target: "victory_screen" } ]
    },
    "victory_screen": {
        speaker: "System", color: "var(--success-green)", textColor: "#000",
        image: "assets/images/6_3_victory.jpg",
        text: "Tarun blinks slowly. Like IE11 loading a Storyline video layer. 'Sprint 6,' he says softly. 'The polymorphic one.' 'That's the one,' you say. He nods for eight full seconds. Then: 'superb alignment.' You close your laptop with the quiet dignity of someone who has weaponised a grown man's ignorance of SCORM specifications to survive a Friday. Uber. Two minutes. Zero surge. You leave. The moth dips once as you pass the light fixture. You win.",
        endingTitle: "THE SME WHISPERER", endingTitleType: "victory",
        variants: [
            {
                id: "veteran-victory",
                conditions: ["playCount:>= 2"],
                text: "Tarun blinks like IE11 loading a video layer. 'Sprint 6.' 'The polymorphic one.' You've said these exact words before — you know exactly how they land. You've seen the other paths: the 87 slides, Greg, the Tupperware by the keyboard, the Cornerstone maintenance window. You chose this one deliberately. 'Superb alignment,' Tarun says. You close Storyline. You close Cornerstone. The moth dips once. You genuinely earned it this time."
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
        text: "Patience reaches zero. You close your laptop like a judge delivering a verdict. You pick up your bag. You look at Tarun. At the Cornerstone error screen. At the moth. The moth looks back. You nod at each other. You leave. Four Teams notifications arrive before you reach the lifts. The fourth says 're: the teal.' You archive the channel without reading it. Behind you, among the IDs still at their desks, a legend is already forming.",
        endingTitle: "GLORIOUS RAGE QUIT",
        choices: [
            { text: "Restart Shift", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    },
    "martyr": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/6_5_martyr.jpg",
        text: "6:30 PM. Cornerstone is still down. Maintenance window extended. You are still here. The cleaning crew routes around your workstation now as if you are a structural column. One of them has started leaving a small Tupperware of water near your keyboard out of what is clearly genuine concern for your continued existence. The moth hasn't moved from the light fixture. You've both stopped pretending tonight has a resolution. You have an understanding now. Two creatures who stayed long after the building stopped caring.",
        endingTitle: "OVERTIME MARTYRDOM", forceTime: 1110,
        choices: [
            { text: "Restart Shift", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    }
};
