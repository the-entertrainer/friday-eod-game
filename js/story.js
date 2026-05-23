const storyData = {
    "start": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000", 
        image: "assets/images/1_1_bsod.jpg",
        text: "It is 5:28 PM on a Friday. My SCORM file just corrupted because my AVP, Tarun, wanted the training to have 'more masala.' Let's back up to how my life went off the rails.",
        choices: [ { text: "Flashback to 4:00 PM", target: "setup", timeCost: 0 } ]
    },
    "setup": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000", 
        image: "assets/images/1_2_setup.jpg",
        text: "It was 4:00 PM. The module was done. It was dry, it was legal, it was perfect. I was one click away from booking my Uber Auto.",
        choices: [ 
            { text: "Click Publish.", target: "ambush", timeCost: 2 },
            { text: "Sip some chai.", target: "ambush", timeCost: 5 }
        ]
    },
    "ambush": {
        speaker: "Tarun", color: "var(--tarun-yellow)", textColor: "#000", 
        image: "assets/images/2_1_ambush.jpg",
        text: "Priya! Super-star! Listen, I know the module is 'approved', but I feel it lacks... gamified synergy. Priya, do one thing...",
        choices: [
            { text: "Onshore approved this.", target: "diplomatic", timeCost: 5, patienceCost: -10 },
            { text: "What is gamified synergy?", target: "aggressive", timeCost: 5, patienceCost: -20 },
            { text: "Think about the kids...", target: "cutaway_kids", timeCost: 1 }
        ]
    },
    "cutaway_kids": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000", 
        image: "assets/images/2_4_kids.jpg",
        text: "If I get fired, we lose the flat. If I stay late, I'm a bad mother. The great middle-class trap!",
        choices: [ { text: "Snap back to reality.", action: "return_from_cutaway", timeCost: 0 } ]
    },
    "diplomatic": {
        speaker: "Tarun", color: "var(--tarun-yellow)", textColor: "#000", 
        image: "assets/images/2_2_diplomatic.jpg",
        text: "Engagement, Priya! Can we add a 3D avatar of the CEO welcoming them with folded hands?",
        choices: [
            { text: "No bandwidth for 3D.", target: "pushback", timeCost: 10, patienceCost: -15 },
            { text: "I will throw my laptop out the window.", target: "rage_quit", patienceCost: -100 }
        ]
    },
    "aggressive": {
        speaker: "Tarun", color: "var(--tarun-yellow)", textColor: "#000", 
        image: "assets/images/2_3_aggressive.jpg",
        text: "Just add a spinning wheel. They spin it, if they land on 'Phishing,' a sad trombone plays. Simple!",
        choices: [
            { text: "Software doesn't support Web3.", target: "pushback", timeCost: 10, patienceCost: -15 },
            { text: "Fine. I'll make the spinning wheel.", target: "compromise", qualityCost: -30, timeCost: 25, patienceCost: 20 }
        ]
    },
    "pushback": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000", 
        image: "assets/images/3_1_pushback.jpg",
        text: "Best I can do is a stock photo of a guy in a suit giving a thumbs up.",
        choices: [
            { text: "Add neon colors and photo.", target: "loading_bar", qualityCost: -25, timeCost: 15, patienceCost: 15 },
            { text: "Ignore him and export original.", target: "rogue_export", qualityCost: 10, patienceCost: -50 }
        ]
    },
    "compromise": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000", 
        image: "assets/images/3_3_compromise.jpg",
        text: "I have a Master's degree. I am currently making a 'Chakra of Compliance' for 10 virtual points.",
        choices: [ { text: "Click publish.", target: "loading_bar", timeCost: 5 } ]
    },
    "rage_quit": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff", 
        image: "assets/images/3_2_ragequit.jpg",
        text: "You flipped the desk. You told Tarun to synergize his own bandwidth. HR marked you as 'absconding'.",
        choices: [ { text: "Restart Shift", action: "restart" } ]
    },
    "rogue_export": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff", 
        image: "assets/images/3_4_rogue.jpg",
        text: "You ignored Tarun and went home. You got a formal HR warning for 'Lack of Agile Mindset'.",
        choices: [ { text: "Restart Shift", action: "restart" } ]
    },
    "loading_bar": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff", 
        image: "assets/images/4_1_loading.jpg",
        text: "Publishing... 99%. DO NOT CLICK ANYTHING. JUST WAIT.",
        isTrap: true, 
        choices: [] 
    },
    "crash": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff", 
        image: "assets/images/4_3_crash.jpg",
        text: "You clicked. The application has stopped responding. All changes lost.",
        choices: [ { text: "Force Quit and cry.", action: "restart" } ]
    },
    "upload": {
        speaker: "Tarun", color: "var(--tarun-yellow)", textColor: "#000", 
        image: "assets/images/4_2_upload.jpg",
        text: "Amazing. One tiny thing. The onshore client changed the brand color to Teal. Revert all 85 slides.",
        choices: [
            { text: "Change the colors to Teal.", target: "martyr", timeCost: 60, qualityCost: -10, patienceCost: 20 },
            { text: "Lie using technical jargon.", target: "true_winner", timeCost: 5, qualityCost: 20, patienceCost: 20 }
        ]
    },
    "martyr": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff", 
        image: "assets/images/5_1_martyr.jpg",
        text: "You stayed. By the time you finished, the client changed their mind back to Blue. You missed the movie.",
        choices: [ { text: "Restart Shift", action: "restart" } ]
    },
    "true_winner": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000", 
        image: "assets/images/5_2_winner.jpg",
        text: "Actually Tarun, the SCORM wrapper is built on a dynamic CSS framework. It syncs automatically at midnight. Happy weekend! \n\n[YOU WIN]",
        choices: [ { text: "Restart Shift", action: "restart" } ]
    }
};