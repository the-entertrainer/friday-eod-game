const storyData = {
    "start": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000", 
        image: "assets/images/1_1_bsod.jpg",
        text: "It is 5:28 PM on a Friday. My SCORM 1.2 package has been stuck on 'Publishing...' for exactly 14 minutes. If I stare at the Articulate Storyline progress bar any harder, my retinas will detach. Let's rewind to 4:00 PM, back when I still had hope.",
        choices: [ { text: "Flashback to 4:00 PM", target: "setup", timeCost: 0 } ]
    },
    "setup": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000", 
        image: "assets/images/1_2_setup.jpg",
        text: "It was 4:00 PM. The Information Security module was locked. No restricted navigation, no 40-page PDF attachments, just pure, clean adult learning theory. I was one click away from freedom.",
        choices: [ 
            { text: "Click 'Publish to LMS'.", target: "ambush", timeCost: 2 },
            { text: "Double-check your True/False variables.", target: "ambush", timeCost: 8 }
        ]
    },
    "ambush": {
        speaker: "Tarun", color: "var(--tarun-yellow)", textColor: "#000", 
        image: "assets/images/2_1_ambush.jpg",
        text: "Priya! My agile rockstar! Listen, the onshore SME, Dr. Ravi, reviewed the staging link. He feels the module lacks... 'gamified paradigm synergy.' Also, he wants to add 12 more slides about the history of passwords.",
        choices: [
            { text: "Cite 'Cognitive Overload' theory.", target: "diplomatic", timeCost: 10, patienceCost: -15 },
            { text: "What exactly is 'gamified synergy'?", target: "aggressive", timeCost: 10, patienceCost: -20 },
            { text: "Look directly at the camera and break the 4th wall.", target: "meta_moment", timeCost: 5, patienceCost: -10 }
        ]
    },
    "meta_moment": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000", 
        image: "assets/images/2_4_kids.jpg",
        text: "Wait a second. Tarun, why did a red number just float out of my head? And why is there a 'Patience' meter in the top right corner of my vision? Are we in a heavily formatted HTML5 browser game?",
        choices: [
            { text: "Tarun: 'Focus on the deliverables, Priya. The UI is just a metaphor.'", target: "aggressive", timeCost: 5, patienceCost: -30 }
        ]
    },
    "diplomatic": {
        speaker: "Tarun", color: "var(--tarun-yellow)", textColor: "#000", 
        image: "assets/images/2_2_diplomatic.jpg",
        text: "Cognitive what? Priya, learners don't read text. They want an *experience*. Dr. Ravi suggested we make the learner navigate a 3D digital escape room where they have to defuse a 'Phishing Bomb' by answering multiple-choice questions.",
        choices: [
            { text: "Explain that Storyline is not the Unreal Engine.", target: "technical_pushback", timeCost: 15, patienceCost: -25 },
            { text: "Cave in and build the 'Phishing Bomb'.", target: "compromise", timeCost: 45, qualityCost: -40, patienceCost: 20 }
        ]
    },
    "aggressive": {
        speaker: "Tarun", color: "var(--tarun-yellow)", textColor: "#000", 
        image: "assets/images/2_3_aggressive.jpg",
        text: "Synergy is when we lock the 'Next' button until the audio finishes! Look, Dr. Ravi says the current drag-and-drop activity is too hard. He wants us to change it so that even if they drag it to the wrong spot, it snaps to the right one anyway. 'Guaranteed 100% Pass Rate.'",
        choices: [
            { text: "Argue that this destroys the entire point of an assessment.", target: "technical_pushback", timeCost: 10, patienceCost: -20 },
            { text: "Agree to build an illusion of interactivity.", target: "compromise", qualityCost: -50, timeCost: 20, patienceCost: 15 }
        ]
    },
    "technical_pushback": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000", 
        image: "assets/images/3_1_pushback.jpg",
        text: "Tarun, if I lock the navigation, they will just play the module on mute while scrolling Instagram. If I build an escape room, the LMS will crash because they are still using Internet Explorer 11. I am begging you.",
        choices: [
            { text: "Tarun: 'Okay, just add a stock photo of a millennial high-fiving a firewall.'", target: "loading_bar", qualityCost: -20, timeCost: 15, patienceCost: 10 },
            { text: "Silently export the file anyway. (Rogue Path)", target: "rogue_export", qualityCost: 10, patienceCost: -60 },
            { text: "[Dev Tool Inject] Edit the DOM to delete Tarun.", target: "meta_escape", timeCost: 0, qualityCost: 100, patienceCost: 100 }
        ]
    },
    "compromise": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000", 
        image: "assets/images/3_3_compromise.jpg",
        text: "My soul is leaving my body. I am currently layering invisible hot-spots over a pixelated padlock icon. I am a glorified PowerPoint animator. I am pressing 'Publish'.",
        choices: [ { text: "Stare at the loading screen.", target: "loading_bar", timeCost: 10 } ]
    },
    "meta_escape": {
        speaker: "System", color: "var(--success-green)", textColor: "#000", 
        image: "assets/images/5_2_winner.jpg",
        text: "You accessed the game's JSON array. You changed `gameState.patience` to infinity. You spliced Tarun's node out of the finite state machine. The office slowly dissolves into raw JavaScript code. You are finally free. \n\n[SECRET ENDING: THE NEO ID]",
        choices: [ { text: "Re-enter the Matrix (Restart Shift)", action: "restart" } ]
    },
    "rogue_export": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff", 
        image: "assets/images/3_4_rogue.jpg",
        text: "You ignored the SME, exported the unadulterated version, and sprinted out the door. The learners actually loved the clean design! Unfortunately, Dr. Ravi CC'd your skip-level manager in a 6 AM email titled 'Lack of Stakeholder Alignment.' You are fired. \n\n[ENDING: THE MARTYR]",
        choices: [ { text: "Restart Shift", action: "restart" } ]
    },
    "loading_bar": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff", 
        image: "assets/images/4_1_loading.jpg",
        text: "It is now 5:15 PM. The SCORM package compiler is executing. The bar hits 99%. Your laptop fan sounds like a Boeing 747. A bead of sweat drips down your face. DO NOT CLICK ANYWHERE ON THE SCREEN.",
        isTrap: true, 
        choices: [] 
    },
    "crash": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff", 
        image: "assets/images/4_3_crash.jpg",
        text: "You clicked. You fool. The screen goes white. A generic prompt appears: 'Articulate Storyline has stopped responding.' The auto-recovery file is from Tuesday. \n\n[ENDING: FATAL ERROR]",
        choices: [ { text: "Cry. Then Restart Shift.", action: "restart" } ]
    },
    "upload": {
        speaker: "Tarun", color: "var(--tarun-yellow)", textColor: "#000", 
        image: "assets/images/4_2_upload.jpg",
        text: "Superb velocity, Priya! Oh, check your ping. Dr. Ravi just realized that 'Corporate Blue' isn't synergistic enough. He wants the primary hex code changed to 'Trustworthy Teal.' Across all 85 slides. Re-publish and upload to the LMS before you leave.",
        choices: [
            { text: "Manually open 85 slides and change the shapes.", target: "martyr_office", timeCost: 90, qualityCost: -10 },
            { text: "Gaslight the AVP with fake tech specs.", target: "true_winner", timeCost: 5, qualityCost: 20 },
            { text: "Just save it as a PowerPoint and email it.", target: "ppt_promotion", timeCost: 5, qualityCost: -100 }
        ]
    },
    "martyr_office": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff", 
        image: "assets/images/5_1_martyr.jpg",
        text: "You stayed. You manually swapped 85 slides to Teal. By the time you finished, the LMS went down for scheduled maintenance. You missed your movie. You are now structurally part of the office furniture. \n\n[ENDING: JUST ANOTHER FRIDAY]",
        choices: [ { text: "Restart Shift", action: "restart" } ]
    },
    "ppt_promotion": {
        speaker: "System", color: "var(--tarun-yellow)", textColor: "#000", 
        image: "assets/images/2_2_diplomatic.jpg",
        text: "You gave up. You exported it as a static PowerPoint and emailed it to Dr. Ravi. He replied: 'Wow! This is exactly the gamified synergy I was looking for! So easy to click next!' You are immediately promoted to Director of Strategy. You hate yourself. \n\n[ENDING: THE CORPORATE SELLOUT]",
        choices: [ { text: "Restart Shift", action: "restart" } ]
    },
    "true_winner": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000", 
        image: "assets/images/5_2_winner.jpg",
        text: "Actually Tarun, the SCORM wrapper is compiled on a polymorphic CSS framework. Once the LMS server cache clears at midnight GMT, the stylesheet hooks will dynamically force-override the blue arrays into Trustworthy Teal. It's an automated Web3 integration.",
        choices: [ { text: "Watch Tarun pretend to understand.", target: "victory_screen" } ]
    },
    "victory_screen": {
        speaker: "System", color: "var(--success-green)", textColor: "#000",
        image: "assets/images/5_2_winner.jpg",
        text: "Tarun nods slowly. 'Ah yes, the polymorphic hooks. Good work, Priya.' You weaponized his technical ignorance. You caught an Uber with no surge pricing. You are an E-Learning Goddess. \n\n[TRUE ENDING: THE SME WHISPERER]",
        choices: [ { text: "Play Again (Restart Shift)", action: "restart" } ]
    }
};