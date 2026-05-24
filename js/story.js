const storyData = {
    "start": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/1_1_bsod.jpg",
        text: "It is 5:28 PM on a Friday. My SCORM 1.2 package has been edge-guarding the 'Publishing...' screen for a solid 14 minutes. 3.5 years as a Certified Instructional Design Specialist, and nothing prepared my soul for this digital purgatory. If I stare at this Articulate Storyline progress bar any harder, my eyeballs will spontaneously combust. Let's rewind to 4:00 PM, back when my will to live was still intact.",
        choices: [ { text: "Flashback to 4:00 PM", target: "setup", timeCost: 0 } ]
    },
    "setup": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/1_2_setup.jpg",
        text: "4:00 PM. The InfoSec module was a masterpiece. No forced sequential navigation, no 40-page PDF brain-dumps. Just raw, unadulterated adult learning theory that would make any Training & Quality manager weep tears of joy. I was one click away from the weekend.",
        choices: [
            { text: "Click 'Publish to LMS'.", target: "ambush", timeCost: 2 },
            { text: "Double-check your True/False variables.", target: "ambush", timeCost: 8 }
        ]
    },
    "ambush": {
        speaker: "Tarun", color: "var(--tarun-yellow)", textColor: "#000",
        image: "assets/images/2_1_ambush.jpg",
        text: "Priya! My agile rockstar ninja! Listen, our beloved onshore SME, Dr. Ravi, took a dump on the staging link. He feels the module lacks 'gamified paradigm synergy'—whatever the hell that means. Oh, and he wants to jam in 12 more slides about the riveting history of passwords dating back to the paleolithic era.",
        choices: [
            { text: "Cite 'Cognitive Overload' theory.", target: "diplomatic", timeCost: 10, patienceCost: -15 },
            { text: "What exactly is 'gamified synergy'?", target: "aggressive", timeCost: 10, patienceCost: -20 },
            { text: "Look directly at the camera and break the 4th wall.", target: "meta_moment", timeCost: 5, patienceCost: -10 }
        ]
    },
    "meta_moment": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/2_4_kids.jpg",
        text: "Hold the f*** up. Tarun, why did a red number just float out of my skull? And why is there a 'Patience' meter depleting in my peripheral vision? Is my actual life just some torturous HTML5 browser game for burned-out corporate trainers?",
        choices: [
            { text: "Tarun: 'Focus on the deliverables, Priya. The UI is just a metaphor.'", target: "aggressive", timeCost: 5, patienceCost: -30 }
        ]
    },
    "diplomatic": {
        speaker: "Tarun", color: "var(--tarun-yellow)", textColor: "#000",
        image: "assets/images/2_2_diplomatic.jpg",
        text: "Cognitive overload? Bro, learners don't read. They want an *experience*. Dr. Ravi had a wet dream about making the learner navigate a 3D digital escape room where they defuse a 'Phishing Bomb' by answering true/false questions. Make it pop!",
        choices: [
            { text: "Explain that Storyline is not the Unreal Engine.", target: "technical_pushback", timeCost: 15, patienceCost: -25 },
            { text: "Cave in and build the 'Phishing Bomb'.", target: "compromise", timeCost: 45, qualityCost: -40, patienceCost: 20 }
        ]
    },
    "aggressive": {
        speaker: "Tarun", color: "var(--tarun-yellow)", textColor: "#000",
        image: "assets/images/2_3_aggressive.jpg",
        text: "Synergy is when we hold them hostage by locking the 'Next' button until the robotic Synthesia audio completely finishes! Look, Dr. Ravi thinks your drag-and-drop is too mentally taxing. He wants it idiot-proofed: even if they drag it to the garbage, it snaps to the right answer. We need that 'Guaranteed 100% Pass Rate' for the metrics!",
        choices: [
            { text: "Argue that this destroys the entire point of an assessment.", target: "technical_pushback", timeCost: 10, patienceCost: -20 },
            { text: "Agree to build an illusion of interactivity.", target: "compromise", qualityCost: -50, timeCost: 20, patienceCost: 15 }
        ]
    },
    "technical_pushback": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/3_1_pushback.jpg",
        text: "Tarun, you absolute muppet, if I lock the navigation, they're just going to mute the tab and doomscroll Instagram. If I try to build a bloody 3D escape room in Storyline, Concentrix's ancient LMS will violently shut down because half these users are still on Internet Explorer 11. I am begging you to use your brain.",
        choices: [
            { text: "Tarun: 'Okay, just add a stock photo of a millennial high-fiving a firewall.'", target: "loading_bar", qualityCost: -20, timeCost: 15, patienceCost: 10 },
            { text: "Silently export the file anyway. (Rogue Path)", target: "rogue_export", qualityCost: 10, patienceCost: -60 },
            { text: "[Dev Tool Inject] Edit the DOM to delete Tarun.", target: "meta_escape", timeCost: 0, qualityCost: 100, patienceCost: 100 }
        ]
    },
    "compromise": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/3_3_compromise.jpg",
        text: "My soul is officially astral projecting into the sun. I am currently layering invisible hot-spots over a deep-fried pixelated padlock icon. I am nothing but a glorified, overpaid PowerPoint animator. May God have mercy on my clicking finger. Hitting 'Publish'.",
        choices: [ { text: "Stare at the loading screen.", target: "loading_bar", timeCost: 10 } ]
    },
    "meta_escape": {
        speaker: "System", color: "var(--success-green)", textColor: "#000",
        image: "assets/images/5_2_winner.jpg",
        text: "You hacked the game's JSON array. You hardcoded `gameState.patience` to infinity and permanently deleted Tarun's useless ass from the finite state machine. The beige office walls dissolve into raw, glorious JavaScript code. You transcend the corporate training matrix.",
        endingTitle: "THE NEO ID", endingTitleType: "secret",
        choices: [ { text: "Re-enter the Matrix (Restart Shift)", action: "restart" } ]
    },
    "rogue_export": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/3_4_rogue.jpg",
        text: "You gave the SME the mental middle finger, exported the clean version, and hauled ass to the pub. Plot twist: the learners actually loved the un-shittified design! Unfortunately, Dr. Ravi CC'd your skip-level manager in a sweaty 6 AM email titled 'Lack of Stakeholder Alignment.' Enjoy unemployment, hero.",
        endingTitle: "THE MARTYR",
        choices: [ { text: "Restart Shift", action: "restart" } ]
    },
    "loading_bar": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/4_1_loading.jpg",
        text: "5:15 PM. The SCORM package is doing its dark magic. The progress bar edges up to 99%. Your laptop fan is screaming like a Boeing 747 engine sucking in a flock of geese. A cold sweat drops down your spine. FOR THE LOVE OF GOD, DO NOT CLICK THE SCREEN.",
        isTrap: true, forceTime: 1035,
        choices: []
    },
    "crash": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/4_3_crash.jpg",
        text: "You clicked. You absolute baboon. The screen fades to a horrifying milky white. 'Articulate Storyline has stopped responding.' You frantically search the auto-recovery folder. The last save is from Tuesday. Your weekend is dead.",
        endingTitle: "FATAL ERROR",
        choices: [ { text: "Cry. Then Restart Shift.", action: "restart" } ]
    },
    "upload": {
        speaker: "Tarun", color: "var(--tarun-yellow)", textColor: "#000",
        image: "assets/images/4_2_upload.jpg",
        text: "Superb velocity, Priya! Oh, check your ping—Dr. Ravi just had another brain fart. He decided 'Corporate Blue' isn't making him feel synergistic enough. He needs the primary hex code swapped to 'Trustworthy Teal.' Across all 85 slides. Just squeeze that in and re-publish before you peace out, yeah?",
        choices: [
            { text: "Manually open 85 slides and change the shapes.", target: "martyr_office", timeCost: 90, qualityCost: -10 },
            { text: "Gaslight the AVP with fake tech specs.", target: "true_winner", timeCost: 5, qualityCost: 20 },
            { text: "Just save it as a PowerPoint and email it.", target: "ppt_promotion", timeCost: 5, qualityCost: -100 }
        ]
    },
    "martyr_office": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/5_1_martyr.jpg",
        text: "You caved. You sat there and manually swapped 85 godforsaken slides to Teal. By the time you finished, the LMS went down for scheduled maintenance, taking your sanity with it. You missed your Friday plans. You are now structurally fused to your ergonomic chair.",
        endingTitle: "JUST ANOTHER FRIDAY",
        choices: [ { text: "Restart Shift", action: "restart" } ]
    },
    "ppt_promotion": {
        speaker: "System", color: "var(--tarun-yellow)", textColor: "#000",
        image: "assets/images/6_1_ppt_promotion.jpg",
        text: "You completely gave up. You just exported the bitch as a static PowerPoint and chucked it into Dr. Ravi's inbox. He replied: 'Wow! This is exactly the gamified synergy I envisioned! Clicking Next is so intuitive!' You are immediately promoted to Director of Strategy. You loathe your own reflection.",
        endingTitle: "THE CORPORATE SELLOUT",
        choices: [ { text: "Restart Shift", action: "restart" } ]
    },
    "true_winner": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/6_2_true_winner.jpg",
        text: "Actually Tarun, my guy, the SCORM wrapper is compiled on a polymorphic CSS framework. Once the LMS server flushes its cache at midnight GMT, the stylesheet hooks will dynamically force-override the blue arrays into his precious Trustworthy Teal. It's a proprietary Web3 automated integration.",
        choices: [ { text: "Watch Tarun pretend to understand.", target: "victory_screen" } ]
    },
    "victory_screen": {
        speaker: "System", color: "var(--success-green)", textColor: "#000",
        image: "assets/images/6_3_victory.jpg",
        text: "Tarun nods slowly, trying to look smart. 'Ah yes, the polymorphic hooks. Superb work, Priya.' You successfully weaponized his blatant technical ignorance. You booked an Uber with zero surge pricing. You are an E-Learning God.",
        endingTitle: "THE SME WHISPERER", endingTitleType: "victory",
        choices: [ { text: "Play Again (Restart Shift)", action: "restart" } ]
    },
    "rage_quit": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/6_4_rage_quit.jpg",
        text: "Your patience bottoms out. Without a single word, you slam the laptop shut with enough force to crack the casing, grab your bag, and walk the f*** out. Tarun fires off four frantic Slack messages. You leave them on read.",
        endingTitle: "GLORIOUS RAGE QUIT",
        choices: [ { text: "Restart Shift", action: "restart" } ]
    },
    "martyr": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/6_5_martyr.jpg",
        text: "It's 6:30 PM. The LMS is still coughing up timeout errors. You're still here. You're *always* still here. The cleaning staff is mopping around your chair in sympathetic silence. She doesn't even make eye contact anymore.",
        endingTitle: "OVERTIME MARTYRDOM", forceTime: 1110,
        choices: [ { text: "Restart Shift", action: "restart" } ]
    }
};
