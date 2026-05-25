// ── CUTAWAY DATA ──────────────────────────────────────────────────────────────
// Drop images in assets/cutaways/ — hero panels: 420×280px | small panels: 200×170px
// Each cutaway: 1 hero image + 2 small images = 3 images total
const cutawayData = {

    "friday_eod_dragon": {
        titleLine1: "EVERY FRIDAY. 4:58 PM.",
        titleLine2: "Bilkul timed. Bilkul sadistic.",
        panels: [
            { src: "assets/cutaways/fri1.jpg", caption: "Monday – Thursday: Completely harmless." },
            { src: "assets/cutaways/fri2.jpg", caption: "Friday. 4:58 PM. Something stirs." },
            { src: "assets/cutaways/fri3.jpg", caption: "Your boss. Chinese dragon. On meth. LinkedIn Premium." }
        ]
    },

    "synthesia_glitch": {
        titleLine1: "THAT ONE TIME.",
        titleLine2: "Module 3. Slide 4. Fire Safety Protocol.",
        panels: [
            { src: "assets/cutaways/syn1.jpg", caption: "He was explaining fire exit procedures. Normally." },
            { src: "assets/cutaways/syn2.jpg", caption: "Then the video render glitched." },
            { src: "assets/cutaways/syn3.jpg", caption: "He poked his own nose. 3 full seconds. No one will speak of it." }
        ]
    },

    "tarun_nightmare": {
        titleLine1: "TARUN'S RECURRING NIGHTMARE.",
        titleLine2: "(He has never discussed this. Not once.)",
        panels: [
            { src: "assets/cutaways/tarun1.jpg", caption: "3 AM. A Tuesday." },
            { src: "assets/cutaways/tarun2.jpg", caption: "The pivot tables came." },
            { src: "assets/cutaways/tarun3.jpg", caption: "He ran. They had formulas." }
        ]
    },

    "storyline_preview": {
        titleLine1: "STORYLINE PREVIEW SPEED.",
        titleLine2: "Ek comparative study.",
        panels: [
            { src: "assets/cutaways/slow1.jpg", caption: "A snail completing his PhD." },
            { src: "assets/cutaways/slow2.jpg", caption: "A glacier forming." },
            { src: "assets/cutaways/slow3.jpg", caption: "Storyline's preview. Still loading." }
        ]
    }
};

const storyData = {

    // ── COLD OPEN — 5:28 PM ──────────────────────────────────────────────────
    "intro": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/1_1_bsod.jpg", forceTime: 1048,
        cutaway: "friday_eod_dragon",
        text: "Storyline ka publishing bar 99% pe hai. 14 minute se.\n\nTeams pe 'Away' set kiya 4:30 baje. Body? Abhi bhi yahan hai. Ek baar bhi nahi hili. ThinkPad ka fan aisa chal raha hai jaise koi bahut thaka hua jet engine hai — lekin woh chal raha hai, aur publish bhi hoga, bas do minute mein.\n\nAaj Friday hai. Sirf do minute chahiye. Bas.",
        choices: [ { text: "Rewind — 4:45 PM →", target: "setup", timeCost: 0 } ],
        variants: [
            {
                id: "returning-player",
                conditions: ["playCount:>= 1"],
                text: "Wapas aa gaye. 5:28. Same bar, 99%.\n\nAccha. Phir se try karte hain. Rewind."
            },
            {
                id: "after-rogue",
                conditions: ["seenEnding:rogue_export"],
                text: "Oh, wapas aaye.\n\nPichhli baar clean build khud publish kiya aur nikal gaye. Quick Chat ka calendar invite aaya — HR ka code word hai jab box laane bol rahe hon. Module abhi bhi live hai. Paanch star. Main wahan nahi hoon.\n\nRewind."
            },
            {
                id: "after-meta-escape",
                conditions: ["seenEnding:meta_escape"],
                text: "Pichhli baar DOM se delete kiya tha use. Chhe second free thi. Phir loop reset ho gaya.\n\nKuch aur try karte hain. Rewind."
            }
        ]
    },

    // ── FLASHBACK — 4:45 PM ──────────────────────────────────────────────────
    "setup": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/1_2_setup.jpg", forceTime: 1005,
        cutaway: "synthesia_glitch",
        text: "4:45 baj rahe the. Module actually done tha. Done-done — not 'QA aur karo' done, not 'stakeholder ne dekha nahi' done.\n\nSynthesia ka avatar bhi zyada drama nahi kar raha tha. Bas ek baar glitch kiya tha mid-sentence mein. Slide 4. Fire safety pe. Apni naak khud poke ki tune mein — teen second ke liye, pure camera pe.\n\nClip abhi bhi review folder mein hai. Koi baat nahi karega.\n\nMain 5 baje ghar jaane waali thi. Sach mein. Socha tha.",
        choices: [
            { text: "Publish karo aur coat uthao.", target: "ambush", timeCost: 2 },
            { text: "Ek last QA pass. Bas ek.", target: "ambush", timeCost: 5 }
        ]
    },

    // ── THE AMBUSH ───────────────────────────────────────────────────────────
    "ambush": {
        speaker: "Tarun", color: "var(--tarun-yellow)", textColor: "#000",
        image: "assets/images/2_1_ambush.jpg",
        cutaway: "tarun_nightmare",
        text: "PRIYA — hey — do you have two minutes? Please bhai.\n\nPehle uske baare mein thoda samajhna chahiye. Tarun. LinkedIn pe khud ko 'Learning Champion' likhta hai. Pivot table ka naam sun ke paseena aata hai. Ek baar ek simple Excel file dekh ke 'headache hai' bol ke meeting se nikal gaya tha. Woh meri attendance sheet thi.\n\nAaj woh ek LinkedIn post dekh ke aaya hai. Fire safety ko Duolingo banana chahta hai. 'Learning ecosystem' bola — teen baar. Main ginti thi.",
        variants: [
            {
                id: "low-quality-ambush",
                conditions: ["quality:<= 40"],
                text: "PRIYA — quick one.\n\nUsne module dekha. 'Solid first draft' bola. Yeh final version hai. Duolingo jaisa banana chahta hai. Fire safety ke liye.\n\nTum theek ho? Like, actually?"
            },
            {
                id: "repeat-ambush",
                conditions: ["playCount:>= 2"],
                text: "PRIYA. Haan, haan, jaanta hoon.\n\nGamification, learning ecosystem, leaderboard, Duolingo. Main yeh posts nahi likhta. Main sirf meetings attend karta hoon.\n\nEk minute chahiye? Bolo."
            }
        ],
        choices: [
            { text: "Cognitive load samjhao. Diplomatically.", target: "diplomatic", timeCost: 8, patienceCost: -12 },
            { text: "Poochho — 'engagement synergy' ka actually matlab kya hai.", target: "aggressive", timeCost: 8, patienceCost: -18 },
            { text: "Seedha camera mein dekho.", target: "meta_moment", timeCost: 4, patienceCost: -8 }
        ]
    },

    // ── FOURTH WALL ──────────────────────────────────────────────────────────
    "meta_moment": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/2_4_kids.jpg",
        text: "Tarun. Ek second.\n\nMere sir ke upar ek Patience bar hai. Dekh sakti hoon use neeche jaate hue jab tu bolta hai.\n\nLagta hai main ek game mein hoon. Jo honestly... aaj ke din ke liye quite accurate lagta hai actually.\n\nBas. Good options de. Please yaar.",
        choices: [
            { text: "Tarun: 'The UI is a metaphor, Priya. Deliverables pe focus karo.'", target: "aggressive", timeCost: 4, patienceCost: -40 }
        ]
    },

    // ── DIPLOMATIC PATH ──────────────────────────────────────────────────────
    "diplomatic": {
        speaker: "Tarun", color: "var(--tarun-yellow)", textColor: "#000",
        image: "assets/images/2_2_diplomatic.jpg",
        text: "Toh woh LMS mein ek escape room banana chahta hai. 'Immersive learning journey.' Usne mood board print kiya — nau padlock photos, aur ek safe ka photo jisme RED MARKER mein likha hai: IMMERSIVE JOURNEY NODE 1.\n\nMaine nahi likha. Woh usne kiya.\n\nTeen VR headsets hain hamare paas by the way. Do on nahi hote. Teesre se Rajan from IT ko nausea hota hai. Main sirf bata raha hoon sab.",
        choices: [
            { text: "Samjhao — Storyline game engine nahi hai.", target: "technical_pushback", timeCost: 10, patienceCost: -20 },
            { text: "Surrender. Poora cheez banao.", target: "compromise", timeCost: 40, qualityCost: -40, patienceCost: 15 }
        ]
    },

    // ── AGGRESSIVE PATH ──────────────────────────────────────────────────────
    "aggressive": {
        speaker: "Tarun", color: "var(--tarun-yellow)", textColor: "#000",
        image: "assets/images/2_3_aggressive.jpg",
        text: "Toh 'engagement synergy' ka matlab hai — okay sunna — Next button locked rahega jab tak avatar baat karna band na kare. Aur wrong answers automatically correct ho jaayenge. Isko woh 'psychological safety' bol raha hai.\n\nUsne yeh Post-it pe likha. Server room ke darwaze pe chipka diya. Facilities ne do baar call kiya. Abhi bhi hai woh wahan.",
        variants: [
            {
                id: "ravi-hotspot-hint",
                conditions: ["playCount:>= 1"],
                text: "Aur — yeh main directly uske email se padh raha hoon — woh female avatar pe ek hotspot chahta hai. Name badge pe. 'Clickable for curiosity, adds a human touch.'\n\nMaine brief mein type kar diya kyunki kuch aur samajh nahi aaya karna. Tab se neend theek se nahi aati."
            }
        ],
        choices: [
            { text: "Samjhao — isse assessment ka matlab khatam ho jaata hai.", target: "technical_pushback", timeCost: 8, patienceCost: -16 },
            { text: "Agree karo. Learning ki illusion simulate karo.", target: "compromise", qualityCost: -50, timeCost: 20, patienceCost: 12 }
        ]
    },

    // ── THE PUSHBACK ─────────────────────────────────────────────────────────
    "technical_pushback": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/3_1_pushback.jpg",
        cutaway: "storyline_preview",
        text: "Tarun, hum SCORM 1.2 pe hain. 2019 se. Finance ne upgrade nahi karne diya — teen managers pehle wala decision hai. LMS admin Pune se aata hai. Mahine mein ek baar.\n\nHalf plant floor abhi bhi IE11 pe hai. Matlab agar main yeh banaaon, LMS ek error dega jise is team mein koi fix nahi kar sakta.\n\nDramatic nahi ho rahi main. Woh bata rahi hoon jo actually wahan hai.",
        variants: [
            {
                id: "low-quality-pushback",
                conditions: ["quality:<= 30"],
                text: "Tarun. SCORM 1.2 hai 2019 se aur mera Quality bar almost khaali hai.\n\nAgar nav lock kiya toh log sound off kar ke click karenge aur 'done' bolenge. Agar escape room banaaya toh LMS run nahi kar sakta. Woh bata rahi hoon jo actually hai."
            },
            {
                id: "both-paths-pushback",
                conditions: ["visited:diplomatic", "visited:aggressive"],
                text: "Escape room. Locked nav. Rajan headset se sick ho jaata hai. Snap-to-correct. SCORM 1.2. Pune admin. Sab bol chuki hoon.\n\nAgar ek aur cheez laya woh toh main SharePoint pe PDF upload karke chali jaoongi. Is baar seriously."
            },
            {
                id: "hotspot-callout",
                conditions: ["visited:aggressive"],
                text: "Wait. Woh hotspot. Female avatar pe. Tarun, yeh design request nahi hai.\n\nYeh main HR ko likhke bhej rahi hoon aaj jaane se pehle. Followers kitne bhi hon — yeh theek nahi hai."
            }
        ],
        choices: [
            { text: "Tarun: 'Fine. Koi server ke saath high-five karta photo add karo.'", target: "loading_bar", qualityCost: -20, timeCost: 6, patienceCost: 8 },
            { text: "Clean version khud publish karo. Rogue mode.", target: "rogue_export", qualityCost: 10, patienceCost: -55,
              remember: true, rememberText: "System ne yeh decision note kar liya." },
            { text: "[Console] DevTools kholo. L&D Head ko page se delete karo.", target: "meta_escape", timeCost: 0, qualityCost: 100, patienceCost: 100 }
        ]
    },

    // ── THE CAVE ─────────────────────────────────────────────────────────────
    "compromise": {
        speaker: "Priya", color: "var(--priya-cyan)", textColor: "#000",
        image: "assets/images/3_3_compromise.jpg",
        text: "Shutterstock pe ek padlock mila. Das dollar. Photo mein banda clearly ek American office mein hai — suit pehna hai, woh bahut New York lag raha hai — lekin padlock hai, toh.\n\nFile ka naam hai Greg_padlock_security_195832.jpg. Greg ab compliance module mein hai. Nashik ke learners ke liye mandatory training. Yahi hai abhi.",
        choices: [ { text: "Publish bar dekhte hain. God se maango.", target: "loading_bar", timeCost: 6 } ]
    },

    // ── SECRET ENDING: THE NEO ID ─────────────────────────────────────────────
    "meta_escape": {
        speaker: "System", color: "var(--success-green)", textColor: "#000",
        image: "assets/images/5_2_winner.jpg",
        text: "Tumne DevTools khola. Likha document.querySelector('#ldhead').remove(). Enter kiya.\n\nWoh bas exist karna band kar diya. Mood board bhi. VR headsets bhi. IMMERSIVE JOURNEY NODE 1 wala safe bhi. Pandrah second baad bar 100% pe pahuncha — jaise permission ka wait kar raha tha.\n\nLaptop band kiya. Chale gaye.",
        endingTitle: "THE NEO ID", endingTitleType: "secret",
        choices: [
            { text: "Matrix mein wapas jaao (Restart Shift)", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    },

    // ── BAD ENDING: THE MARTYR (went rogue) ──────────────────────────────────
    "rogue_export": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/3_4_rogue.jpg",
        text: "Tumne clean build khud publish kiya aur chale gaye.\n\nModule live hua. Pehle review mein paanch star, 94% completion — yeh kabhi nahi hota, yaar. Teen din tak tum minor hero the.\n\nPhir L&D Head ka email aaya. Subject: Creative Unilateralism: A Formal Concern. Manager ko CC, unke manager ko bhi. LinkedIn pe post bhi kiya. Tumhe jaane diya.\n\nModule abhi bhi chal raha hai.",
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
        text: "5:28. Bar 99% pe hai.\n\nCompany ThinkPad, 2017. Asset tag L&D-049. Is floor ke sabke paas same model hai, sab yahi kar rahe hain — fan, heat, wait. Ek moth hai tube light ke upar desk ke. Teen baje se hai woh.\n\nKuch mat chhuo.",
        isTrap: true, forceTime: 1048,
        variants: [
            {
                id: "returning-loading",
                conditions: ["playCount:>= 1"],
                text: "5:28. Phir se. Same bar, same moth.\n\nTumhe pata hai kya hone wala hai.\n\nKuch mat chhuo."
            },
            {
                id: "greg-loading",
                conditions: ["visited:compromise"],
                text: "5:28. Greg package mein hai.\n\nGreg_padlock_security_195832.jpg, quietly compile ho raha hai baaki sab ke saath. Manhattan ke ek photo studio se 340KB — Nashik ki factory ke mandatory training ke liye.\n\nKuch mat chhuo. Greg intezaar kar sakta hai."
            }
        ],
        choices: []
    },

    // ── BAD ENDING: FATAL ERROR ───────────────────────────────────────────────
    "crash": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/4_3_crash.jpg",
        text: "Tune chhoo liya.\n\nArticulate Storyline has stopped responding. AutoRecover ne ek file save ki — Module 3, Draft v1. Title slide. Koi layers nahi, koi variables nahi, Greg nahi. Sirf 'Security Awareness Training' Calibri mein white background pe.\n\nYahi bana reh gaya.",
        endingTitle: "FATAL ERROR",
        variants: [
            {
                id: "returning-crash",
                conditions: ["playCount:>= 1"],
                text: "Phir chhoo liya.\n\nModule 3, Draft v1. Title slide. Greg gone — jahan tak Storyline ka sawal hai, Greg kabhi real tha hi nahi.\n\nTumhe pata tha yeh hone wala tha."
            }
        ],
        choices: [
            { text: "Rona. Phir restart.", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    },

    // ── THE TEAL BOMB ─────────────────────────────────────────────────────────
    "upload": {
        speaker: "Tarun", color: "var(--tarun-yellow)", textColor: "#000",
        image: "assets/images/4_2_upload.jpg",
        text: "PRIYA! Published ho gaya, great news!!\n\nOkay toh — ek tiny cheez — usne LinkedIn pe post kiya subah. 'Teal is the future of Trust™.' Char hazaar likes. Ek client ne comment kiya. Ab 87 slides teal karni hain aaj raat jaane se pehle. Usne VP ko CC kiya, VP ke PA ko, HRBP ko, aur Singapore ke Global L&D Head ko.\n\nColour code bheja usne. 'TEAL' likha hai. Hex code nahi. Sirf word. Brand guide mein dekha — Leadership Gray, Cerulean Blue, Muted Sage. Teal ka koi number nahi hai.",
        variants: [
            {
                id: "high-quality-upload",
                conditions: ["quality:>= 80"],
                text: "PRIYA! Review 360 pe teen five-star reviews aa gaye — yeh main pehle isliye bol raha hoon.\n\nUsne LinkedIn pe post kiya. Teal. Char hazaar likes. Client ne comment kiya. 87 slides, teal, jaane se pehle. Sabko CC kiya.\n\nColour code hai 'TEAL'. Brand guide mein dekha — Leadership Gray. Teal nahi hai. Bahut sorry."
            }
        ],
        choices: [
            { text: "87 slides. Haath se. Abhi.", target: "martyr_office", timeCost: 90, qualityCost: -10,
              remember: true, rememberText: "Priya yeh yaad rakhegi." },
            { text: "Tarun ko confident-sounding jargon mein dafan karo.", target: "true_winner", timeCost: 0, qualityCost: 20 },
            { text: "PowerPoint mein export karo aur email. Done.", target: "ppt_promotion", timeCost: 0, qualityCost: -100 }
        ]
    },

    // ── BAD ENDING: JUST ANOTHER FRIDAY ──────────────────────────────────────
    "martyr_office": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/5_1_martyr.jpg", forceTime: 1120,
        text: "87 slides. Haath se. Saari.\n\nSlides 23 se 31 ek locked master template mein the — 2018 wala. Jo banaya tha woh company chord gaye. Woh nau slides do baar rebuild kiye. Haath 34 pe slip kiya — teen baar karna pada. 11 baje publish hua.\n\nTeams pe message aaya — 'just checking in 😊' — aur tumne aate dekha. Reply nahi kiya. Cleaning wala aaya, ek second dekha, aur tumhare desk ke aas-paas vacuum kiya seedha.",
        endingTitle: "JUST ANOTHER FRIDAY",
        variants: [
            {
                id: "repeat-martyr",
                conditions: ["playCount:>= 2"],
                text: "87 slides. Haath se. Phir se.\n\nCleaning wala ab poochta nahi — bas nod karta hai aur around kaam karta hai. Kisi ne desk ke paas Tupperware mein paani rakha kisi time pe. Pata nahi kisne.\n\nSlide 34. 2018 wala master. 11 baje. 'Just checking in 😊'. Tumhe pata hai."
            }
        ],
        choices: [
            { text: "Restart Shift", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    },

    // ── BAD ENDING: THE CORPORATE SELLOUT ────────────────────────────────────
    "ppt_promotion": {
        speaker: "System", color: "var(--tarun-yellow)", textColor: "#000",
        image: "assets/images/6_1_ppt_promotion.jpg",
        text: "Tumne naam rakha InfoSec_Interactive_FINAL_v2_TEAL_APPROVED.pptx aur koi message nahi likhke email kar diya.\n\n38 second mein reply aaya. EXACTLY THE TRANSFORMATIONAL ENERGY HE WANTED. CEO ko forward kiya — subject: INNOVATION — aur LinkedIn pe post kiya. Uski khud ki deck mein saintaalis circles hain arrows se connected, ek Wordle ka screenshot jisko 'Engagement Metric' label kiya hai. Poori cheez ko woh 'agile pivot' kehta hai.\n\nSomvar tak tum Global Head of Learning Experience Design ho. Parking spot mila. Khud ka LinkedIn badge bhi.",
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
        text: "Tarun, actually — Kirkpatrick Level 4 ke under, active evaluation cycle mein brand colour change ek Phase 2 reset trigger karta hai. Main ne yeh ADDIE review mein flag kiya tha. Handover doc mein hai. LMS midnight ko brand token auto-apply karta hai — teal already queue mein hai. Tumne Sunday raat 11:14 baje sign off kiya tha.\n\nWoh Tarun ki taraf dekhi. Yeh sab usne abhi banaya tha.",
        choices: [ { text: "Tarun ko absorb hone dete hain.", target: "victory_screen" } ]
    },

    // ── TRUE ENDING: THE SME WHISPERER ───────────────────────────────────────
    "victory_screen": {
        speaker: "System", color: "var(--success-green)", textColor: "#000",
        image: "assets/images/6_3_victory.jpg",
        text: "'ADDIE review.' 'Wahi wala.' Woh bahut der tak sir hilaata raha. 'Superb alignment,' bola.\n\nLaptop 5:28 pe band kiya. 5:30 pe bahar thi. Tube light wala moth ek baar neeche aaya jaate waqt. Pata nahi kyun yeh achha laga. Laga.",
        endingTitle: "THE SME WHISPERER", endingTitleType: "victory",
        variants: [
            {
                id: "veteran-victory",
                conditions: ["playCount:>= 2"],
                text: "'ADDIE review.' 'Wahi wala.' Yeh pehle bhi hua hai. Pata hai kitni der tak woh sir hilayega.\n\nLaptop band kiya. Moth ek baar neeche aaya. Is baar tumne bhi nod kiya."
            }
        ],
        choices: [
            { text: "Play Again (Restart Shift)", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    },

    // ── BAD ENDING: GLORIOUS RAGE QUIT ───────────────────────────────────────
    "rage_quit": {
        speaker: "System", color: "var(--system-alert)", textColor: "#fff",
        image: "assets/images/6_4_rage_quit.jpg",
        text: "Patience zero ho gayi.\n\nLaptop bahut carefully band kiya — jo somehow slamming se bura lagta hai. Bag uthaya. Tarun kuch bolne wala tha. Ruka nahi.\n\nUber char minute door tha. Glassdoor khola. Do star. Actually ek.",
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
        text: "Raat ke 12 baj gaye.\n\nCleaning wala aapke desk ke around kaam kar raha hai. Ek woh tha jo seedha section skip karne laga — nod karta hai aate waqt aur around kaam karta hai jaise tum furniture ka hissa ho.\n\nBar abhi bhi 99% pe hai.",
        endingTitle: "STILL HERE",
        choices: [
            { text: "Restart Shift", action: "restart" },
            { text: "Main Menu", action: "mainmenu" }
        ]
    }
};
