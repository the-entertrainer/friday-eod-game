const storyData = {
    "start": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/1_1_bsod.jpg",
        text: "5:28 PM. My SCORM package has been 'Publishing...' for 14 minutes. I am a certified instructional designer with three industry awards and a LinkedIn that auto-generates responses like 'I'm humbled and honoured.' I have a tiny tail. I once fell asleep on a client call and no one noticed because my avatar blinked on cue. I mention this because it is deeply relevant to my current mental state. Let's go back to 4 PM, when I was still a functioning animal.",
        choices: [ { text: "Flashback to 4:00 PM", target: "setup", timeCost: 0 } ]
    },
    "setup": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/1_2_setup.jpg",
        text: "4:00 PM. Clean. Organised. The InfoSec module was a masterpiece of cognitive architecture — no locked navigation, no wall of text, no PDF attachment scanned sideways with someone's paw in the corner. Just pure instructional design so elegant it could make Robert Gagné weep. I was one click away from freedom. I was delusional, but I was happy.",
        choices: [
            { text: "Click 'Publish to LMS'.", target: "ambush", timeCost: 2 },
            { text: "Double-check your True/False variables.", target: "ambush", timeCost: 8 }
        ]
    },
    "ambush": {
        speaker: "Tarun", color: "var(--tarun-yellow)", textColor: "#000",
        image: "assets/images/2_1_ambush.jpg",
        text: "PRIYA! My e-learning LEGEND! My SCORM SORCERESS! My cost-effective single point of failure! QUICK CHAT — Baron Von Snoutstache reviewed the module. He says it lacks, and I'm reading from his actual email, 'immersive transformational journey-based engagement synergy.' Also he wants 14 more slides on password history. Starting from when ancient wolves first scratched passwords into rocks. He's very passionate about the rocks.",
        choices: [
            { text: "Cite 'Cognitive Overload' theory.", target: "diplomatic", timeCost: 10, patienceCost: -15 },
            { text: "What exactly is 'engagement synergy'?", target: "aggressive", timeCost: 10, patienceCost: -20 },
            { text: "Look directly at the camera. Break the 4th wall.", target: "meta_moment", timeCost: 5, patienceCost: -10 }
        ]
    },
    "meta_moment": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/2_4_kids.jpg",
        text: "WAIT. Tarun, pause. A glowing number literally just floated out of my head. There is a bar at the top of my field of vision that says 'Patience' and it is draining in real time. I think — I think I am a game character. I think someone is sitting somewhere tapping their phone making my life choices for sport. Is this what the humans felt in the Matrix? Because honestly? Respect.",
        choices: [
            { text: "Tarun: 'Focus on the deliverables, Priya. The UI is a metaphor.'", target: "aggressive", timeCost: 5, patienceCost: -30 }
        ]
    },
    "diplomatic": {
        speaker: "Tarun", color: "var(--tarun-yellow)", textColor: "#000",
        image: "assets/images/2_2_diplomatic.jpg",
        text: "Overload, shmerload. Look, Von Snoutstache wants learners to feel TRANSPORTED. He saw a TED talk. He wants a fully navigable 3D escape room where employees defuse a 'Phishing Bomb' using multiple choice questions. He is calling it 'a Netflix experience for compliance.' He does not own a Netflix account. He describes all streaming as 'the internet television box.' He is very confident.",
        choices: [
            { text: "Explain that Articulate is not the Unreal Engine.", target: "technical_pushback", timeCost: 15, patienceCost: -25 },
            { text: "Cave in. Build the Phishing Bomb.", target: "compromise", timeCost: 45, qualityCost: -40, patienceCost: 20 }
        ]
    },
    "aggressive": {
        speaker: "Tarun", color: "var(--tarun-yellow)", textColor: "#000",
        image: "assets/images/2_3_aggressive.jpg",
        text: "Synergy is locking the NEXT button until the AI narrator finishes! You can HEAR it breathing between sentences, but Von Snoutstache loves it. Also he says your drag-and-drop is 'cognitively violent.' He wants wrong answers to automatically snap to the correct position. He calls this 'psychological safety.' I call it a participation trophy for a fire safety quiz. He used the phrase 'outcome-positive gamification.' I wrote it down.",
        choices: [
            { text: "Argue this defeats the purpose of an assessment.", target: "technical_pushback", timeCost: 10, patienceCost: -20 },
            { text: "Agree to simulate the illusion of learning.", target: "compromise", qualityCost: -50, timeCost: 20, patienceCost: 15 }
        ]
    },
    "technical_pushback": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/3_1_pushback.jpg",
        text: "TARUN. Listen with your actual ears. If I lock the navigation, they will stare at the wall until the audio stops then click Next immediately. If I build a 3D escape room, the LMS will throw a 500 error because half our learners are on Internet Explorer 11. Internet. Explorer. ELEVEN. That browser's support ended before I started this job. I have standards. I have allergies. I am begging you with my entire being.",
        choices: [
            { text: "Tarun: 'Fine. Just add a stock photo of a millennial high-fiving a server rack.'", target: "loading_bar", qualityCost: -20, timeCost: 15, patienceCost: 10 },
            { text: "Export the clean version anyway. Go rogue.", target: "rogue_export", qualityCost: 10, patienceCost: -60 },
            { text: "[Dev Tools] Inspect element. Delete Tarun from the DOM.", target: "meta_escape", timeCost: 0, qualityCost: 100, patienceCost: 100 }
        ]
    },
    "compromise": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/3_3_compromise.jpg",
        text: "My soul has left my body and is hovering near the suspended ceiling tiles, looking down at me with quiet disappointment. I am placing invisible hotspots on a stock photo of a padlock from 2009. The model has a watermark on their face. I cannot afford to remove it. The watermark's name is Greg. I have accepted Greg. I am hitting Publish.",
        choices: [ { text: "Stare at the loading screen.", target: "loading_bar", timeCost: 10 } ]
    },
    "meta_escape": {
        speaker: "System", color: "var(--success-green)", textColor: "#000",
        image: "assets/images/5_2_winner.jpg",
        text: "You opened the browser console. You typed `storyData.ambush = null`. You set `gameState.patience = Infinity`. You typed `delete storyData.tarun`. Baron Von Snoutstache fragmented into a shower of Comic Sans. The walls of the open-plan office pixelated and dissolved. A calm voice said: 'You were always a developer.' You didn't know what that meant. You cried anyway. You are finally, completely free.",
        endingTitle: "THE NEO ID", endingTitleType: "secret",
        choices: [
            { text: "Re-enter the Matrix (Restart Shift)", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    },
    "rogue_export": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/3_4_rogue.jpg",
        text: "You exported the clean version. You walked out to 'Eye of the Tiger' in your earbuds. The module went live. Learners gave it 4.8 stars. Completion rate: 91%. Three days later, Von Snoutstache sent an email to you, your manager, your manager's manager, and for reasons that remain unexplained, Facilities — subject line: 'Creative Unilateralism: A Formal Concern.' You were let go. Your module still runs. It's the only one anyone has ever finished voluntarily.",
        endingTitle: "THE MARTYR",
        choices: [
            { text: "Restart Shift", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    },
    "loading_bar": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/4_1_loading.jpg",
        text: "5:15 PM. The SCORM compiler is doing whatever SCORM compilers do, which no one alive truly understands. The bar has reached 99%. Your laptop fan has entered a new phase of existence. The office is empty. A moth is watching you from the light fixture. It has been there all day. It is witnessing this. DO NOT TOUCH ANYTHING.",
        isTrap: true, forceTime: 1035,
        choices: []
    },
    "crash": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/4_3_crash.jpg",
        text: "You touched something. You absolute chaos gremlin. The screen goes white. 'Articulate Storyline has stopped responding.' You check the auto-recovery folder. The last save is from before the branching. Before the narration. Before any of the good decisions. It's just a title slide that says 'Module 3: Security Awareness.' That's all that survived. The moth watched this happen. It feels nothing.",
        endingTitle: "FATAL ERROR",
        choices: [
            { text: "Cry. Then Restart Shift.", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    },
    "upload": {
        speaker: "Tarun", color: "var(--tarun-yellow)", textColor: "#000",
        image: "assets/images/4_2_upload.jpg",
        text: "PRIYA! INCREDIBLE OUTPUT! PEAK VELOCITY! One small note — Von Snoutstache just messaged from his mountain villa. Turns out 'Corporate Teal' and 'Corporate Blue' are philosophically incompatible and the blue is, I quote, 'making the learning feel anxious.' He needs Teal. Across all 87 slides. Re-published and re-uploaded before you leave. He included the hex code. The hex code is just the word TEAL in all caps. TEAL.",
        choices: [
            { text: "Manually open 87 slides and change every shape.", target: "martyr_office", timeCost: 90, qualityCost: -10 },
            { text: "Gaslight the VP with fake tech specs.", target: "true_winner", timeCost: 5, qualityCost: 20 },
            { text: "Export as PowerPoint and email it.", target: "ppt_promotion", timeCost: 5, qualityCost: -100 }
        ]
    },
    "martyr_office": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/5_1_martyr.jpg",
        text: "You changed 87 slides. Slide by slide. Shape by shape. Slides 23 through 31 were grouped inside a master layout from a template made in 2018 by someone who no longer works here. You redid them twice. Your paw slipped on 34. By the time you uploaded, the LMS was down for scheduled maintenance until Monday. The moth watched the entire thing. It left before you did.",
        endingTitle: "JUST ANOTHER FRIDAY",
        choices: [
            { text: "Restart Shift", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    },
    "ppt_promotion": {
        speaker: "System", color: "var(--tarun-yellow)", textColor: "#000",
        image: "assets/images/6_1_ppt_promotion.jpg",
        text: "You renamed it 'Interactive_Module_Final_v2_TEAL.pptx' and emailed it with no further comment. Von Snoutstache replied in 45 seconds: 'THIS IS EXACTLY THE ENERGY I DESCRIBED!!!! THE CLICK-THROUGH IS SO INTUITIVE!!!! PARADIGM ACHIEVED!!!!!' He forwarded it to the CEO. You were promoted to Global Head of Learning Innovation. You have not felt anything since Thursday.",
        endingTitle: "THE CORPORATE SELLOUT",
        choices: [
            { text: "Restart Shift", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    },
    "true_winner": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/6_2_true_winner.jpg",
        text: "Actually, Tarun, the SCORM package runs on a polymorphic stylesheet cascade engine. At GMT midnight, the LMS server cache purges, triggering the blue-to-teal override array we embedded in Sprint 6. It's automated. It's a Web3 integration. We scoped it. You approved it in the retrospective. I sent you a deck titled 'Sprint 6 Summary — Please Read.' You sent a thumbs up emoji at 11 PM.",
        choices: [ { text: "Watch Tarun process this information.", target: "victory_screen" } ]
    },
    "victory_screen": {
        speaker: "System", color: "var(--success-green)", textColor: "#000",
        image: "assets/images/6_3_victory.jpg",
        text: "Tarun blinks slowly, like a lizard absorbing warmth. 'Sprint 6,' he repeats quietly. 'The polymorphic one.' 'That's the one,' you say. He nods for an uncomfortable amount of time. Then he says 'superb alignment.' You close your laptop with the quiet dignity of someone who has weaponised a grown animal's ignorance against him to survive a Friday. You open Uber. Two minutes. Zero surge pricing. You leave. You win. This is the true ending.",
        endingTitle: "THE SME WHISPERER", endingTitleType: "victory",
        choices: [
            { text: "Play Again (Restart Shift)", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    },
    "rage_quit": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/6_4_rage_quit.jpg",
        text: "Your Patience bar empties completely. You say nothing. You close your laptop like a judge delivering a verdict. You pick up your bag. You look at Tarun. You look at the LMS error screen. You look at the moth. The moth looks back. You nod at the moth. You walk out. Four Slack notifications arrive before you reach the lift. The fourth one says 'also re: the teal.' You block the channel. You are already a myth.",
        endingTitle: "GLORIOUS RAGE QUIT",
        choices: [
            { text: "Restart Shift", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    },
    "martyr": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/6_5_martyr.jpg",
        text: "6:30 PM. The LMS is still down. You are still here. The cleaning crew has developed a route around your desk and treats you as a fixed feature of the environment. One of them has started leaving a small bowl of water nearby out of genuine concern. You have accepted this. The moth is still at the light fixture. You feel like you understand each other now. You are both just trying to get through this.",
        endingTitle: "OVERTIME MARTYRDOM", forceTime: 1110,
        choices: [
            { text: "Restart Shift", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    }
};
