import { Race, CharacterClass } from '../types';

export const defaultRaces: Race[] = [
    { 
        name: "Human",
        abilityScoreAdjustments: { str: 1, dex: 1, con: 1, int: 1, wis: 1, cha: 1 },
        traits: ["Versatile"],
        size: "Medium",
        speed: 30,
        languages: ["Common"],
        additionalLanguages: 1
    },
    { 
        name: "Variant Human",
        abilityScoreAdjustments: { str: 1, dex: 1 },  // Player can choose any two
        traits: ["Versatile", "Skilled", "Feat"],
        size: "Medium",
        speed: 30,
        languages: ["Common"],
        additionalLanguages: 1
    },
    { 
        name: "Elf (High)",
        abilityScoreAdjustments: { dex: 2, int: 1 },
        traits: ["Darkvision", "Fey Ancestry", "Trance", "Keen Senses", "Elf Weapon Training", "Cantrip"],
        size: "Medium",
        speed: 30,
        languages: ["Common", "Elvish"],
        additionalLanguages: 1
    },
    { 
        name: "Elf (Wood)",
        abilityScoreAdjustments: { dex: 2, wis: 1 },
        traits: ["Darkvision", "Fey Ancestry", "Trance", "Keen Senses", "Elf Weapon Training", "Fleet of Foot", "Mask of the Wild"],
        size: "Medium",
        speed: 35,
        languages: ["Common", "Elvish"]
    },
    { 
        name: "Elf (Drow)",
        abilityScoreAdjustments: { dex: 2, cha: 1 },
        traits: ["Superior Darkvision", "Fey Ancestry", "Trance", "Keen Senses", "Drow Magic", "Sunlight Sensitivity", "Drow Weapon Training"],
        size: "Medium",
        speed: 30,
        languages: ["Common", "Elvish", "Undercommon"]
    },
    { 
        name: "Dwarf (Hill)",
        abilityScoreAdjustments: { con: 2, wis: 1 },
        traits: ["Darkvision", "Dwarven Resilience", "Dwarven Combat Training", "Stonecunning", "Dwarven Toughness"],
        size: "Medium",
        speed: 25,
        languages: ["Common", "Dwarvish"]
    },
    { 
        name: "Dwarf (Mountain)",
        abilityScoreAdjustments: { con: 2, str: 2 },
        traits: ["Darkvision", "Dwarven Resilience", "Dwarven Combat Training", "Stonecunning", "Dwarven Armor Training"],
        size: "Medium",
        speed: 25,
        languages: ["Common", "Dwarvish"]
    },
    { 
        name: "Halfling (Lightfoot)",
        abilityScoreAdjustments: { dex: 2, cha: 1 },
        traits: ["Lucky", "Brave", "Halfling Nimbleness", "Naturally Stealthy"],
        size: "Small",
        speed: 25,
        languages: ["Common", "Halfling"]
    },
    { 
        name: "Halfling (Stout)",
        abilityScoreAdjustments: { dex: 2, con: 1 },
        traits: ["Lucky", "Brave", "Halfling Nimbleness", "Stout Resilience"],
        size: "Small",
        speed: 25,
        languages: ["Common", "Halfling"]
    },
    { 
        name: "Dragonborn",
        abilityScoreAdjustments: { str: 2, cha: 1 },
        traits: ["Draconic Ancestry", "Breath Weapon", "Damage Resistance"],
        size: "Medium",
        speed: 30,
        languages: ["Common", "Draconic"]
    },
    { 
        name: "Gnome (Forest)",
        abilityScoreAdjustments: { int: 2, dex: 1 },
        traits: ["Darkvision", "Gnome Cunning", "Natural Illusionist", "Speak with Small Beasts"],
        size: "Small",
        speed: 25,
        languages: ["Common", "Gnomish"]
    },
    { 
        name: "Gnome (Rock)",
        abilityScoreAdjustments: { int: 2, con: 1 },
        traits: ["Darkvision", "Gnome Cunning", "Artificer's Lore", "Tinker"],
        size: "Small",
        speed: 25,
        languages: ["Common", "Gnomish"]
    },
    { 
        name: "Half-Elf",
        abilityScoreAdjustments: { cha: 2, dex: 1, wis: 1 }, // Player can choose any two besides CHA
        traits: ["Darkvision", "Fey Ancestry", "Skill Versatility"],
        size: "Medium",
        speed: 30,
        languages: ["Common", "Elvish"],
        additionalLanguages: 1
    },
    { 
        name: "Half-Orc",
        abilityScoreAdjustments: { str: 2, con: 1 },
        traits: ["Darkvision", "Menacing", "Relentless Endurance", "Savage Attacks"],
        size: "Medium",
        speed: 30,
        languages: ["Common", "Orc"]
    },
    { 
        name: "Tiefling",
        abilityScoreAdjustments: { cha: 2, int: 1 },
        traits: ["Darkvision", "Hellish Resistance", "Infernal Legacy"],
        size: "Medium",
        speed: 30,
        languages: ["Common", "Infernal"]
    },
    // Races from other sources
    { 
        name: "Aasimar (Protector)",
        abilityScoreAdjustments: { cha: 2, wis: 1 },
        traits: ["Darkvision", "Celestial Resistance", "Healing Hands", "Light Bearer", "Radiant Soul"],
        size: "Medium",
        speed: 30,
        languages: ["Common", "Celestial"]
    },
    { 
        name: "Aasimar (Scourge)",
        abilityScoreAdjustments: { cha: 2, con: 1 },
        traits: ["Darkvision", "Celestial Resistance", "Healing Hands", "Light Bearer", "Radiant Consumption"],
        size: "Medium",
        speed: 30,
        languages: ["Common", "Celestial"]
    },
    { 
        name: "Aasimar (Fallen)",
        abilityScoreAdjustments: { cha: 2, str: 1 },
        traits: ["Darkvision", "Celestial Resistance", "Healing Hands", "Light Bearer", "Necrotic Shroud"],
        size: "Medium",
        speed: 30,
        languages: ["Common", "Celestial"]
    },
    { 
        name: "Firbolg",
        abilityScoreAdjustments: { wis: 2, str: 1 },
        traits: ["Firbolg Magic", "Hidden Step", "Powerful Build", "Speech of Beast and Leaf"],
        size: "Medium",
        speed: 30,
        languages: ["Common", "Elvish", "Giant"]
    },
    { 
        name: "Goliath",
        abilityScoreAdjustments: { str: 2, con: 1 },
        traits: ["Stone's Endurance", "Powerful Build", "Mountain Born", "Natural Athlete"],
        size: "Medium",
        speed: 30,
        languages: ["Common", "Giant"]
    },
    { 
        name: "Tabaxi",
        abilityScoreAdjustments: { dex: 2, cha: 1 },
        traits: ["Darkvision", "Feline Agility", "Cat's Claws", "Cat's Talent"],
        size: "Medium",
        speed: 30,
        languages: ["Common"],
        additionalLanguages: 1
    },
    { 
        name: "Kenku",
        abilityScoreAdjustments: { dex: 2, wis: 1 },
        traits: ["Expert Forgery", "Mimicry", "Kenku Training"],
        size: "Medium",
        speed: 30,
        languages: ["Common", "Auran"]
    },
    { 
        name: "Triton",
        abilityScoreAdjustments: { str: 1, con: 1, cha: 1 },
        traits: ["Amphibious", "Control Air and Water", "Emissary of the Sea", "Guardians of the Depths"],
        size: "Medium",
        speed: 30,
        languages: ["Common", "Primordial"]
    },
    { 
        name: "Leonin",
        abilityScoreAdjustments: { str: 2, con: 1 },
        traits: ["Darkvision", "Claws", "Hunter's Instincts", "Daunting Roar"],
        size: "Medium",
        speed: 35,
        languages: ["Common"]
    },
    { 
        name: "Satyr",
        abilityScoreAdjustments: { cha: 2, dex: 1 },
        traits: ["Fey", "Magic Resistance", "Mirthful Leaps", "Reveler"],
        size: "Medium",
        speed: 35,
        languages: ["Common", "Elvish", "Sylvan"]
    },
    { 
        name: "Fairy",
        abilityScoreAdjustments: { dex: 2, cha: 1 },
        traits: ["Flight", "Fey", "Fairy Magic"],
        size: "Small",
        speed: 30,
        languages: ["Common", "Sylvan"]
    },
    { 
        name: "Harengon",
        abilityScoreAdjustments: { dex: 2, wis: 1 },
        traits: ["Hare-Trigger", "Leporine Senses", "Lucky Footwork", "Rabbit Hop"],
        size: "Medium",
        speed: 30,
        languages: ["Common"],
        additionalLanguages: 1
    }
];

export const defaultClasses: CharacterClass[] = [
                { 
                    name: "Artificer", 
                    hitDie: 8, 
                    primaryAbility: "int", 
                    savingThrows: ["con", "int"], 
                    skills: ["Arcana", "History", "Investigation", "Medicine", "Nature", "Perception", "Sleight of Hand"],
                    skillChoices: 2,
                    proficiencies: {
                        weapons: ["Simple weapons", "Firearms"],
                        armor: ["Light armor", "Medium armor", "Shields"],
                        tools: ["Thieves' tools", "Tinker's tools", "One type of artisan's tools of your choice"]
                    },
                    spellcasting: {
                        ability: "int",
                        prepareSpells: true
                    },
                    features: [
                        { level: 1, name: "Magical Tinkering", description: "You have learned how to invest a spark of magic into mundane objects." },
                        { level: 1, name: "Spellcasting", description: "You have studied the workings of magic and how to cast spells, channeling the magic through objects." },
                        { level: 2, name: "Infuse Item", description: "You gain the ability to imbue mundane items with certain magical infusions." },
                        { level: 3, name: "Artificer Specialist", description: "You choose the type of specialist you are: Alchemist, Artillerist, Battle Smith, or Armorer." }
                    ]
                },
                { 
                    name: "Barbarian", 
                    hitDie: 12, 
                    primaryAbility: "str", 
                    savingThrows: ["str", "con"], 
                    skills: ["Animal Handling", "Athletics", "Intimidation", "Nature", "Perception", "Survival"],
                    skillChoices: 2,
                    proficiencies: {
                        weapons: ["Simple weapons", "Martial weapons"],
                        armor: ["Light armor", "Medium armor", "Shields"],
                        tools: []
                    },
                    features: [
                        { level: 1, name: "Rage", description: "In battle, you fight with primal ferocity. You can enter a rage as a bonus action." },
                        { level: 1, name: "Unarmored Defense", description: "While not wearing armor, your AC equals 10 + your Dexterity modifier + your Constitution modifier." },
                        { level: 2, name: "Reckless Attack", description: "You can throw aside all concern for defense to attack with fierce desperation." },
                        { level: 2, name: "Danger Sense", description: "You gain an uncanny sense of when things nearby aren't as they should be." }
                    ]
                },
                { 
                    name: "Bard", 
                    hitDie: 8, 
                    primaryAbility: "cha", 
                    savingThrows: ["dex", "cha"], 
                    skills: ["Acrobatics", "Animal Handling", "Arcana", "Athletics", "Deception", "History", "Insight", "Intimidation", "Investigation", "Medicine", "Nature", "Perception", "Performance", "Persuasion", "Religion", "Sleight of Hand", "Stealth", "Survival"],
                    skillChoices: 3,
                    proficiencies: {
                        weapons: ["Simple weapons", "Hand crossbows", "Longswords", "Rapiers", "Shortswords"],
                        armor: ["Light armor"],
                        tools: ["Three musical instruments of your choice"]
                    },
                    spellcasting: {
                        ability: "cha",
                        cantripsKnown: [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
                        spellsKnown: [4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 15, 16, 18, 19, 19, 20, 22, 22, 22]
                    },
                    features: [
                        { level: 1, name: "Bardic Inspiration", description: "You can inspire others through stirring words or music." },
                        { level: 1, name: "Spellcasting", description: "You have learned to untangle and reshape the fabric of reality in harmony with your wishes and music." },
                        { level: 2, name: "Jack of All Trades", description: "You can add half your proficiency bonus, rounded down, to any ability check you make that doesn't already include your proficiency bonus." },
                        { level: 2, name: "Song of Rest", description: "You can use soothing music or oration to help revitalize your wounded allies during a short rest." }
                    ]
                },
                { 
                    name: "Blood Hunter", 
                    hitDie: 10, 
                    primaryAbility: "str", 
                    savingThrows: ["dex", "int"], 
                    skills: ["Acrobatics", "Arcana", "Athletics", "History", "Insight", "Investigation", "Religion", "Survival"],
                    skillChoices: 3,
                    proficiencies: {
                        weapons: ["Simple weapons", "Martial weapons"],
                        armor: ["Light armor", "Medium armor", "Shields"],
                        tools: ["Alchemist's supplies"]
                    },
                    features: [
                        { level: 1, name: "Hunter's Bane", description: "You can track certain types of creatures with unnatural efficiency." },
                        { level: 1, name: "Blood Maledict", description: "You gain the ability to channel your vital essence into curses against your foes." },
                        { level: 2, name: "Crimson Rite", description: "You can imbue your weapon strikes with elemental energy." },
                        { level: 3, name: "Blood Hunter Order", description: "You commit to an order of blood hunter martial traditions." }
                    ]
                },
                { 
                    name: "Cleric", 
                    hitDie: 8, 
                    primaryAbility: "wis", 
                    savingThrows: ["wis", "cha"], 
                    skills: ["History", "Insight", "Medicine", "Persuasion", "Religion"],
                    skillChoices: 2,
                    proficiencies: {
                        weapons: ["Simple weapons"],
                        armor: ["Light armor", "Medium armor", "Shields"],
                        tools: []
                    },
                    spellcasting: {
                        ability: "wis",
                        cantripsKnown: [3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
                        prepareSpells: true
                    },
                    features: [
                        { level: 1, name: "Divine Domain", description: "Choose one domain related to your deity: Knowledge, Life, Light, Nature, Tempest, Trickery, or War." },
                        { level: 1, name: "Spellcasting", description: "As a conduit for divine power, you can cast cleric spells." },
                        { level: 2, name: "Channel Divinity", description: "You gain the ability to channel divine energy directly from your deity, using that energy to fuel magical effects." },
                        { level: 2, name: "Divine Domain Feature", description: "Your divine domain grants you additional abilities." }
                    ]
                },
                { 
                    name: "Druid", 
                    hitDie: 8, 
                    primaryAbility: "wis", 
                    savingThrows: ["int", "wis"], 
                    skills: ["Arcana", "Animal Handling", "Insight", "Medicine", "Nature", "Perception", "Religion", "Survival"],
                    skillChoices: 2,
                    proficiencies: {
                        weapons: ["Clubs", "Daggers", "Darts", "Javelins", "Maces", "Quarterstaffs", "Scimitars", "Sickles", "Slings", "Spears"],
                        armor: ["Light armor", "Medium armor", "Shields"],
                        tools: ["Herbalism kit"]
                    },
                    spellcasting: {
                        ability: "wis",
                        cantripsKnown: [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
                        prepareSpells: true
                    },
                    features: [
                        { level: 1, name: "Druidic", description: "You know Druidic, the secret language of druids." },
                        { level: 1, name: "Spellcasting", description: "Drawing on the divine essence of nature itself, you can cast spells to shape that essence to your will." },
                        { level: 2, name: "Wild Shape", description: "You can use your action to magically assume the shape of a beast that you have seen before." },
                        { level: 2, name: "Druid Circle", description: "You choose to identify with a circle of druids: the Circle of the Land or the Circle of the Moon." }
                    ]
                },
                { 
                    name: "Fighter", 
                    hitDie: 10, 
                    primaryAbility: "str", 
                    savingThrows: ["str", "con"], 
                    skills: ["Acrobatics", "Animal Handling", "Athletics", "History", "Insight", "Intimidation", "Perception", "Survival"],
                    skillChoices: 2,
                    proficiencies: {
                        weapons: ["Simple weapons", "Martial weapons"],
                        armor: ["All armor", "Shields"],
                        tools: []
                    },
                    features: [
                        { level: 1, name: "Fighting Style", description: "You adopt a particular style of fighting as your specialty." },
                        { level: 1, name: "Second Wind", description: "You have a limited well of stamina that you can draw on to protect yourself from harm." },
                        { level: 2, name: "Action Surge", description: "You can push yourself beyond your normal limits for a moment." },
                        { level: 3, name: "Martial Archetype", description: "You choose an archetype that you strive to emulate in your combat styles and techniques." }
                    ]
                },
                { 
                    name: "Monk", 
                    hitDie: 8, 
                    primaryAbility: "dex", 
                    savingThrows: ["str", "dex"], 
                    skills: ["Acrobatics", "Athletics", "History", "Insight", "Religion", "Stealth"],
                    skillChoices: 2,
                    proficiencies: {
                        weapons: ["Simple weapons", "Shortswords"],
                        armor: [],
                        tools: ["One type of artisan's tools or one musical instrument"]
                    },
                    features: [
                        { level: 1, name: "Unarmored Defense", description: "While you are wearing no armor and not wielding a shield, your AC equals 10 + your Dexterity modifier + your Wisdom modifier." },
                        { level: 1, name: "Martial Arts", description: "Your practice of martial arts gives you mastery of combat styles that use unarmed strikes and monk weapons." },
                        { level: 2, name: "Ki", description: "Your training allows you to harness the mystic energy of ki." },
                        { level: 2, name: "Unarmored Movement", description: "Your speed increases when you are not wearing armor or wielding a shield." }
                    ]
                },
                { 
                    name: "Paladin", 
                    hitDie: 10, 
                    primaryAbility: "str", 
                    savingThrows: ["wis", "cha"], 
                    skills: ["Athletics", "Insight", "Intimidation", "Medicine", "Persuasion", "Religion"],
                    skillChoices: 2,
                    proficiencies: {
                        weapons: ["Simple weapons", "Martial weapons"],
                        armor: ["All armor", "Shields"],
                        tools: []
                    },
                    spellcasting: {
                        ability: "cha",
                        prepareSpells: true
                    },
                    features: [
                        { level: 1, name: "Divine Sense", description: "The presence of strong evil registers on your senses like a noxious odor." },
                        { level: 1, name: "Lay on Hands", description: "Your blessed touch can heal wounds." },
                        { level: 2, name: "Fighting Style", description: "You adopt a style of fighting as your specialty." },
                        { level: 2, name: "Spellcasting", description: "You have learned to draw on divine magic through meditation and prayer." },
                        { level: 2, name: "Divine Smite", description: "When you hit a creature with a melee weapon attack, you can expend one spell slot to deal radiant damage." }
                    ]
                },
                { 
                    name: "Ranger", 
                    hitDie: 10, 
                    primaryAbility: "dex", 
                    savingThrows: ["str", "dex"], 
                    skills: ["Animal Handling", "Athletics", "Insight", "Investigation", "Nature", "Perception", "Stealth", "Survival"],
                    skillChoices: 3,
                    proficiencies: {
                        weapons: ["Simple weapons", "Martial weapons"],
                        armor: ["Light armor", "Medium armor", "Shields"],
                        tools: []
                    },
                    spellcasting: {
                        ability: "wis",
                        spellsKnown: [0, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11]
                    },
                    features: [
                        { level: 1, name: "Favored Enemy", description: "You have significant experience studying, tracking, hunting, and even talking to a certain type of enemy." },
                        { level: 1, name: "Natural Explorer", description: "You are particularly familiar with one type of natural environment and are adept at traveling and surviving in such regions." },
                        { level: 2, name: "Fighting Style", description: "You adopt a particular style of fighting as your specialty." },
                        { level: 2, name: "Spellcasting", description: "You have learned to use the magical essence of nature to cast spells, much as a druid does." }
                    ]
                },
                { 
                    name: "Rogue", 
                    hitDie: 8, 
                    primaryAbility: "dex", 
                    savingThrows: ["dex", "int"], 
                    skills: ["Acrobatics", "Athletics", "Deception", "Insight", "Intimidation", "Investigation", "Perception", "Performance", "Persuasion", "Sleight of Hand", "Stealth"],
                    skillChoices: 4,
                    proficiencies: {
                        weapons: ["Simple weapons", "Hand crossbows", "Longswords", "Rapiers", "Shortswords"],
                        armor: ["Light armor"],
                        tools: ["Thieves' tools"]
                    },
                    features: [
                        { level: 1, name: "Expertise", description: "Choose two of your skill proficiencies, or one of your skill proficiencies and your proficiency with thieves' tools." },
                        { level: 1, name: "Sneak Attack", description: "You know how to strike subtly and exploit a foe's distraction." },
                        { level: 1, name: "Thieves' Cant", description: "During your rogue training you learned thieves' cant, a secret mix of dialect, jargon, and code." },
                        { level: 2, name: "Cunning Action", description: "Your quick thinking and agility allow you to move and act quickly." }
                    ]
                },
                { 
                    name: "Sorcerer", 
                    hitDie: 6, 
                    primaryAbility: "cha", 
                    savingThrows: ["con", "cha"], 
                    skills: ["Arcana", "Deception", "Insight", "Intimidation", "Persuasion", "Religion"],
                    skillChoices: 2,
                    proficiencies: {
                        weapons: ["Daggers", "Darts", "Slings", "Quarterstaffs", "Light crossbows"],
                        armor: [],
                        tools: []
                    },
                    spellcasting: {
                        ability: "cha",
                        cantripsKnown: [4, 4, 4, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
                        spellsKnown: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 12, 13, 13, 14, 14, 15, 15, 15, 15]
                    },
                    features: [
                        { level: 1, name: "Sorcerous Origin", description: "Choose a sorcerous origin, which describes the source of your innate magical power." },
                        { level: 1, name: "Spellcasting", description: "An event in your past, or in the life of a parent or ancestor, left an indelible mark on you, infusing you with arcane magic." },
                        { level: 2, name: "Font of Magic", description: "You tap into a deep wellspring of magic within yourself." },
                        { level: 3, name: "Metamagic", description: "You gain the ability to twist your spells to suit your needs." }
                    ]
                },
                { 
                    name: "Warlock", 
                    hitDie: 8, 
                    primaryAbility: "cha", 
                    savingThrows: ["wis", "cha"], 
                    skills: ["Arcana", "Deception", "History", "Intimidation", "Investigation", "Nature", "Religion"],
                    skillChoices: 2,
                    proficiencies: {
                        weapons: ["Simple weapons"],
                        armor: ["Light armor"],
                        tools: []
                    },
                    spellcasting: {
                        ability: "cha",
                        cantripsKnown: [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
                        spellsKnown: [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15]
                    },
                    features: [
                        { level: 1, name: "Otherworldly Patron", description: "You have struck a bargain with an otherworldly being of your choice." },
                        { level: 1, name: "Pact Magic", description: "Your arcane research and the magic bestowed on you by your patron have given you facility with spells." },
                        { level: 2, name: "Eldritch Invocations", description: "In your study of occult lore, you have unearthed eldritch invocations, fragments of forbidden knowledge that imbue you with an abiding magical ability." },
                        { level: 3, name: "Pact Boon", description: "Your otherworldly patron bestows a gift upon you for your loyal service." }
                    ]
                },
                { 
                    name: "Wizard", 
                    hitDie: 6, 
                    primaryAbility: "int", 
                    savingThrows: ["int", "wis"], 
                    skills: ["Arcana", "History", "Insight", "Investigation", "Medicine", "Religion"],
                    skillChoices: 2,
                    proficiencies: {
                        weapons: ["Daggers", "Darts", "Slings", "Quarterstaffs", "Light crossbows"],
                        armor: [],
                        tools: []
                    },
                    spellcasting: {
                        ability: "int",
                        cantripsKnown: [3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
                        prepareSpells: true
                    },
                    features: [
                        { level: 1, name: "Arcane Recovery", description: "You have learned to regain some of your magical energy by studying your spellbook." },
                        { level: 1, name: "Spellcasting", description: "As a student of arcane magic, you have a spellbook containing spells that show the first glimmerings of your true power." },
                        { level: 2, name: "Arcane Tradition", description: "You choose an arcane tradition, shaping your practice of magic through one of eight schools." },
                        { level: 3, name: "Arcane Tradition Feature", description: "Your arcane tradition grants you additional abilities." }
                    ]
                }
];

// BARBARIAN SUBCLASSES
const barbarianClass = defaultClasses.find((c: CharacterClass) => c.name === "Barbarian");
if (barbarianClass) {
    barbarianClass.subclasses = [
        // PHB
        {
            name: "Path of the Berserker",
            description: "A primal path that focuses on unleashing unbridled rage and fury.",
            features: [
                { level: 3, name: "Frenzy", description: "You can go into a frenzy when you rage, granting an extra melee attack as a bonus action but causing exhaustion when the rage ends." },
                { level: 6, name: "Mindless Rage", description: "You can't be charmed or frightened while raging." },
                { level: 10, name: "Intimidating Presence", description: "You can use your action to frighten someone with your menacing presence." },
                { level: 14, name: "Retaliation", description: "When you take damage from a creature within 5 feet of you, you can use your reaction to make a melee weapon attack against that creature." }
            ]
        },
        {
            name: "Path of the Totem Warrior",
            description: "A spiritual path that channels the power and wisdom of various totem animals.",
            features: [
                { level: 3, name: "Spirit Seeker", description: "You gain the ability to cast the beast sense and speak with animals spells as rituals." },
                { level: 3, name: "Totem Spirit", description: "You choose a totem spirit (Bear, Eagle, or Wolf) and gain its feature." },
                { level: 6, name: "Aspect of the Beast", description: "You gain a magical benefit based on the totem animal of your choice." },
                { level: 10, name: "Spirit Walker", description: "You can cast the commune with nature spell as a ritual." },
                { level: 14, name: "Totemic Attunement", description: "You gain a powerful benefit based on your totem animal." }
            ]
        },
        // XGtE
        {
            name: "Path of the Zealot",
            description: "A barbarian who channels divine fury and fights with religious passion.",
            features: [
                { level: 3, name: "Divine Fury", description: "You can channel divine energy to deal extra damage when you rage." },
                { level: 3, name: "Warrior of the Gods", description: "The gods take special interest in you, making it difficult for you to stay dead." },
                { level: 6, name: "Fanatical Focus", description: "You can reroll a saving throw you fail while raging." },
                { level: 10, name: "Zealous Presence", description: "You can inspire allies with a battle cry that grants them advantage on attack rolls and saving throws." },
                { level: 14, name: "Rage Beyond Death", description: "You can continue fighting even after being reduced to 0 hit points." }
            ]
        },
        {
            name: "Path of Wild Magic",
            description: "A barbarian whose rage is powered by wild magic from the Feywild or similar magical sources.",
            features: [
                { level: 3, name: "Wild Surge", description: "When you enter rage, you roll on a Wild Magic table to create a magical effect." },
                { level: 6, name: "Magic Awareness", description: "You can use your action to detect the presence of magic." },
                { level: 10, name: "Bolstering Magic", description: "You can use your magic to empower yourself or an ally." },
                { level: 14, name: "Unstable Backlash", description: "When you are hit by an attack while raging, you can use your reaction to unleash wild magic." }
            ]
        },
        // TCoE
        {
            name: "Path of the Beast",
            description: "A barbarian who can transform parts of their body into bestial features.",
            features: [
                { level: 3, name: "Beast Sprit", description: "While raging, you can transform parts of your body into bestial features." },
                { level: 6, name: "Bestial Soul", description: "Your connection to the beast world grants you additional abilities." },
                { level: 10, name: "Infectious Fury", description: "Your rage can provoke supernatural violence in others." },
                { level: 14, name: "Call the Hunt", description: "You can call upon primal spirits to aid you and your allies." }
            ]
        }
    ];
}

// BARD SUBCLASSES
const bardClass = defaultClasses.find((c: CharacterClass) => c.name === "Bard");
if (bardClass) {
    bardClass.subclasses = [
        // PHB
        {
            name: "College of Lore",
            description: "Bards who study the gathered knowledge and lore of the multiverse.",
            features: [
                { level: 3, name: "Bonus Proficiencies", description: "You gain proficiency with three skills of your choice." },
                { level: 3, name: "Cutting Words", description: "You learn how to use your wit to distract, confuse, and otherwise sap the confidence and competence of others." },
                { level: 6, name: "Additional Magical Secrets", description: "You learn two spells of your choice from any class." },
                { level: 14, name: "Peerless Skill", description: "When you make an ability check, you can expend one use of Bardic Inspiration to add that roll to your result." }
            ]
        },
        {
            name: "College of Valor",
            description: "Bards who weave inspiring tales of battlefield heroism.",
            features: [
                { level: 3, name: "Bonus Proficiencies", description: "You gain proficiency with medium armor, shields, and martial weapons." },
                { level: 3, name: "Combat Inspiration", description: "A creature that has a Bardic Inspiration die from you can roll that die and add the number rolled to a weapon damage roll it just made." },
                { level: 6, name: "Extra Attack", description: "You can attack twice, instead of once, whenever you take the Attack action on your turn." },
                { level: 14, name: "Battle Magic", description: "When you use your action to cast a bard spell, you can make one weapon attack as a bonus action." }
            ]
        },
        // XGtE
        {
            name: "College of Glamour",
            description: "Bards who draw power from the Feywild, weaving enchantments and dazzling performances.",
            features: [
                { level: 3, name: "Mantle of Inspiration", description: "You can inspire allies with a magical aura of beauty and charm." },
                { level: 3, name: "Enthralling Performance", description: "You can charm creatures with your performance." },
                { level: 6, name: "Mantle of Majesty", description: "You can command creatures with your magical presence." },
                { level: 14, name: "Unbreakable Majesty", description: "You become immune to being charmed and can frighten creatures that try to attack you." }
            ]
        },
        {
            name: "College of Whispers",
            description: "Bards who use their magic to manipulate and exploit the darkest desires of others.",
            features: [
                { level: 3, name: "Psychic Blades", description: "You can magically create spectral blades of psychic energy." },
                { level: 3, name: "Words of Terror", description: "You can plant fear in a creature's mind." },
                { level: 6, name: "Mantle of Whispers", description: "You can steal the shadow of a recently deceased humanoid." },
                { level: 14, name: "Shadow Lore", description: "You can magically manipulate a creature's memories." }
            ]
        },
        // TCoE
        {
            name: "College of Creation",
            description: "Bards who tap into the Song of Creation, wielding primordial musical magic.",
            features: [
                { level: 3, name: "Note of Potential", description: "You can inspire creativity and potential in your allies." },
                { level: 3, name: "Performance of Creation", description: "You can create a Tiny object using musical performance." },
                { level: 6, name: "Animating Performance", description: "You can bring an object to life to fight for you." },
                { level: 14, name: "Creative Crescendo", description: "You can create multiple objects or animate larger creatures." }
            ]
        },
        {
            name: "College of Eloquence",
            description: "Bards who are masters of speech and linguistic manipulation.",
            features: [
                { level: 3, name: "Silver Tongue", description: "Your words become more persuasive and precise." },
                { level: 3, name: "Unsettling Words", description: "You can use Bardic Inspiration to reduce a creature's ability check or attack roll." },
                { level: 6, name: "Unfailing Inspiration", description: "Your Bardic Inspiration becomes more reliable." },
                { level: 14, name: "Universal Speech", description: "You can speak and understand any language momentarily." }
            ]
        }
    ];
}

// CLERIC SUBCLASSES
const clericClass = defaultClasses.find((c: CharacterClass) => c.name === "Cleric");
if (clericClass) {
    clericClass.subclasses = [
        // PHB
        {
            name: "Life Domain",
            description: "Clerics who serve gods of healing, life, and rejuvenation.",
            features: [
                { level: 1, name: "Bonus Proficiency", description: "You gain proficiency with heavy armor." },
                { level: 1, name: "Disciple of Life", description: "Your healing spells are more effective." },
                { level: 2, name: "Channel Divinity: Preserve Life", description: "You can heal multiple creatures within 30 feet of you." },
                { level: 6, name: "Blessed Healer", description: "The healing spells you cast on others heal you as well." },
                { level: 8, name: "Divine Strike", description: "Once on each of your turns when you hit a creature with a weapon attack, you can cause the attack to deal extra radiant damage." },
                { level: 17, name: "Supreme Healing", description: "When you would normally roll one or more dice to restore hit points with a spell, you instead use the highest number possible for each die." }
            ]
        },
        {
            name: "Light Domain",
            description: "Clerics who serve gods of light, radiance, and illumination.",
            features: [
                { level: 1, name: "Bonus Cantrip", description: "You know the light cantrip." },
                { level: 1, name: "Warding Flare", description: "You can interpose divine light between yourself and an attacking enemy." },
                { level: 2, name: "Channel Divinity: Radiance of the Dawn", description: "You can harness sunlight to burn away darkness and deal radiant damage to your foes." },
                { level: 6, name: "Improved Flare", description: "You can use your Warding Flare feature to protect others." },
                { level: 8, name: "Potent Spellcasting", description: "You add your Wisdom modifier to the damage you deal with any cleric cantrip." },
                { level: 17, name: "Corona of Light", description: "You can activate an aura of sunlight that lasts for 1 minute." }
            ]
        },
        {
            name: "Knowledge Domain",
            description: "Clerics who serve gods of knowledge, learning, and understanding.",
            features: [
                { level: 1, name: "Blessings of Knowledge", description: "You learn two languages and gain proficiency and expertise in two skills." },
                { level: 2, name: "Channel Divinity: Knowledge of the Ages", description: "You can gain proficiency in a skill or tool of your choice for 10 minutes." },
                { level: 6, name: "Channel Divinity: Read Thoughts", description: "You can read the thoughts of certain creatures." },
                { level: 8, name: "Potent Spellcasting", description: "You add your Wisdom modifier to the damage you deal with any cleric cantrip." },
                { level: 17, name: "Visions of the Past", description: "You can call up visions of the past that relate to an object you hold." }
            ]
        },
        {
            name: "Nature Domain",
            description: "Clerics who serve gods of nature, wilderness, and natural cycles.",
            features: [
                { level: 1, name: "Acolyte of Nature", description: "You learn one druid cantrip and gain proficiency in one skill." },
                { level: 1, name: "Bonus Proficiency", description: "You gain proficiency with heavy armor." },
                { level: 2, name: "Channel Divinity: Charm Animals and Plants", description: "You can use your Channel Divinity to charm animals and plants." },
                { level: 6, name: "Dampen Elements", description: "When you or a creature within 30 feet takes acid, cold, fire, lightning, or thunder damage, you can use your reaction to grant resistance." },
                { level: 8, name: "Divine Strike", description: "Once on each of your turns, you can deal extra damage to a target you hit with a weapon attack." },
                { level: 17, name: "Master of Nature", description: "You gain the ability to command animals and plant creatures." }
            ]
        },
        {
            name: "Tempest Domain",
            description: "Clerics who serve gods of storms, sea, and sky.",
            features: [
                { level: 1, name: "Bonus Proficiencies", description: "You gain proficiency with martial weapons and heavy armor." },
                { level: 1, name: "Wrath of the Storm", description: "When a creature within 5 feet hits you, you can use your reaction to deal lightning or thunder damage." },
                { level: 2, name: "Channel Divinity: Destructive Wrath", description: "You can use your Channel Divinity to maximize lightning or thunder damage." },
                { level: 6, name: "Thunderbolt Strike", description: "When you deal lightning damage to a Large or smaller creature, you can push it up to 10 feet." },
                { level: 8, name: "Divine Strike", description: "Once on each of your turns, you can deal extra damage to a target you hit with a weapon attack." },
                { level: 17, name: "Stormborn", description: "You gain a flying speed equal to your current walking speed whenever you are not underground or indoors." }
            ]
        },
        {
            name: "Trickery Domain",
            description: "Clerics who serve gods of trickery, deception, and mischief.",
            features: [
                { level: 1, name: "Blessing of the Trickster", description: "You can give one creature advantage on Stealth checks." },
                { level: 2, name: "Channel Divinity: Invoke Duplicity", description: "You create an illusory duplicate of yourself." },
                { level: 6, name: "Channel Divinity: Cloak of Shadows", description: "You can make yourself invisible until the end of your next turn." },
                { level: 8, name: "Divine Strike", description: "Once on each of your turns, you can deal extra damage to a target you hit with a weapon attack." },
                { level: 17, name: "Improved Duplicity", description: "You can create up to four duplicates of yourself, and you can move any number of them with a single bonus action." }
            ]
        },
        {
            name: "War Domain",
            description: "Clerics who serve gods of war, combat, and valor.",
            features: [
                { level: 1, name: "Bonus Proficiencies", description: "You gain proficiency with martial weapons and heavy armor." },
                { level: 1, name: "War Priest", description: "When you use the Attack action, you can make a weapon attack as a bonus action." },
                { level: 2, name: "Channel Divinity: Guided Strike", description: "You gain a +10 bonus to an attack roll." },
                { level: 6, name: "Channel Divinity: War God's Blessing", description: "When a creature within 30 feet makes an attack roll, you can use your reaction to grant a +10 bonus to that roll." },
                { level: 8, name: "Divine Strike", description: "Once on each of your turns, you can deal extra damage to a target you hit with a weapon attack." },
                { level: 17, name: "Avatar of Battle", description: "You gain resistance to bludgeoning, piercing, and slashing damage from nonmagical attacks." }
            ]
        },
        // XGE
        {
            name: "Forge Domain",
            description: "Clerics who serve gods of creation and artisan crafts.",
            features: [
                { level: 1, name: "Bonus Proficiencies", description: "You gain proficiency with heavy armor and smith's tools." },
                { level: 1, name: "Blessing of the Forge", description: "You can imbue magic into a nonmagical weapon or armor." },
                { level: 2, name: "Channel Divinity: Artisan's Blessing", description: "You can create simple items using divine magic." },
                { level: 6, name: "Soul of the Forge", description: "You gain resistance to fire damage and bonus AC while wearing heavy armor." },
                { level: 8, name: "Divine Strike", description: "Once on each of your turns, you can deal extra fire damage to a target you hit with a weapon attack." },
                { level: 17, name: "Saint of Forge and Fire", description: "You gain additional fire-based abilities and resistances." }
            ]
        },
        {
            name: "Grave Domain",
            description: "Clerics who maintain the boundary between life and death.",
            features: [
                { level: 1, name: "Circle of Mortality", description: "You have enhanced healing abilities for dying creatures." },
                { level: 1, name: "Eyes of the Grave", description: "You can detect undead creatures." },
                { level: 2, name: "Channel Divinity: Path to the Grave", description: "You can make a creature vulnerable to the next attack against it." },
                { level: 6, name: "Sentinel at Death's Door", description: "You can protect allies from dropping to 0 hit points." },
                { level: 8, name: "Potent Spellcasting", description: "You add your Wisdom modifier to cantrip damage." },
                { level: 17, name: "Keeper of Souls", description: "You can harvest the life essence of dying creatures." }
            ]
        },
        // TCoE
        {
            name: "Order Domain",
            description: "Clerics who serve gods of law, civilization, and organized society.",
            features: [
                { level: 1, name: "Bonus Proficiencies", description: "You gain heavy armor proficiency and one skilled or martial weapon." },
                { level: 1, name: "Voice of Authority", description: "When you cast a spell on an ally, they can use a reaction to attack." },
                { level: 2, name: "Channel Divinity: Order's Demand", description: "You can compel creatures to do your bidding." },
                { level: 6, name: "Channel Divinity: Order's Command", description: "Your commands become more potent." },
                { level: 8, name: "Divine Strike", description: "Once on each of your turns, you can deal extra psychic damage to a target you hit with a weapon attack." },
                { level: 17, name: "Order's Wrath", description: "Your allies deal extra damage to creatures you mark." }
            ]
        },
        {
            name: "Peace Domain",
            description: "Clerics who maintain harmony and protect communities from conflict.",
            features: [
                { level: 1, name: "Emblems of Peace", description: "You gain proficiency in the Insight and Performance skills." },
                { level: 1, name: "Implement of Peace", description: "You can protect allies by reducing damage they take." },
                { level: 2, name: "Channel Divinity: Emboldening Bond", description: "You can magically connect allies to support each other." },
                { level: 6, name: "Balm of Peace", description: "You can move without provoking opportunity attacks while healing nearby allies." },
                { level: 8, name: "Potent Spellcasting", description: "You add your Wisdom modifier to cantrip damage." },
                { level: 17, name: "Expansive Bond", description: "Your Emboldening Bond becomes more powerful and far-reaching." }
            ]
        },
        {
            name: "Twilight Domain",
            description: "Clerics who serve gods of twilight, boundaries, and the transition between day and night.",
            features: [
                { level: 1, name: "Bonus Proficiencies", description: "You gain martial weapons and heavy armor proficiency." },
                { level: 1, name: "Eyes of Night", description: "You gain enhanced darkvision and can grant darkvision to allies." },
                { level: 2, name: "Channel Divinity: Twilight Sanctuary", description: "You create a sanctuary of protective twilight." },
                { level: 6, name: "Steps of Night", description: "You gain the ability to move in darkness without penalty." },
                { level: 8, name: "Divine Strike", description: "Once on each of your turns, you can deal extra cold or radiant damage to a target you hit with a weapon attack." },
                { level: 17, name: "Twilight Shroud", description: "You can create a protective shroud of twilight that grants benefits to allies." }
            ]
        }
    ];
}

// DRUID SUBCLASSES
const druidClass = defaultClasses.find((c: CharacterClass) => c.name === "Druid");
if (druidClass) {
    druidClass.subclasses = [
        // PHB
        {
            name: "Circle of the Land",
            description: "Druids who are connected to ancient traditions and natural magic of specific terrains.",
            features: [
                { level: 2, name: "Bonus Cantrip", description: "You learn an additional druid cantrip of your choice." },
                { level: 2, name: "Natural Recovery", description: "You can recover expended spell slots during a short rest." },
                { level: 2, name: "Circle Spells", description: "Your mystical connection to the land infuses you with the ability to cast certain spells." },
                { level: 6, name: "Land's Stride", description: "Moving through nonmagical difficult terrain costs you no extra movement." },
                { level: 10, name: "Nature's Ward", description: "You can't be charmed or frightened by elementals or fey, and you are immune to poison and disease." },
                { level: 14, name: "Nature's Sanctuary", description: "Creatures of the natural world sense your connection to nature and are hesitant to attack you." }
            ]
        },
        {
            name: "Circle of the Moon",
            description: "Druids who channel the power of the wilderness to transform into powerful beasts.",
            features: [
                { level: 2, name: "Combat Wild Shape", description: "You can use Wild Shape as a bonus action, and you can transform into more powerful beasts than other druids." },
                { level: 2, name: "Circle Forms", description: "You can transform into beasts with higher challenge ratings than normal." },
                { level: 6, name: "Primal Strike", description: "Your attacks in beast form count as magical for overcoming resistance and immunity to nonmagical attacks." },
                { level: 10, name: "Elemental Wild Shape", description: "You can expend two uses of Wild Shape to transform into an air, earth, fire, or water elemental." },
                { level: 14, name: "Thousand Forms", description: "You can cast the Alter Self spell at will." }
            ]
        },
        // XGtE
        {
            name: "Circle of Dreams",
            description: "Druids connected to the Feywild, wielding magic that soothes and protects.",
            features: [
                { level: 2, name: "Balm of the Summer Court", description: "You can heal allies and create a magical, healing sanctuary." },
                { level: 6, name: "Hearth of Moonlight and Shadow", description: "You can create a magical refuge that protects and conceals your allies." },
                { level: 10, name: "Hidden Paths", description: "You can teleport through magical paths known only to you." },
                { level: 14, name: "Walker in Dreams", description: "You can send a magical messenger to communicate across great distances." }
            ]
        },
        {
            name: "Circle of the Shepherd",
            description: "Druids who protect and communicate with the beasts and spirits of nature.",
            features: [
                { level: 2, name: "Speech of the Woods", description: "You can communicate with beasts and spirits." },
                { level: 2, name: "Spirit Totem", description: "You can summon a protective spirit that aids you and your allies." },
                { level: 6, name: "Mighty Summoner", description: "Your summoned creatures become more powerful." },
                { level: 10, name: "Guardian Spirit", description: "Your Spirit Totem becomes more potent and protective." },
                { level: 14, name: "Faithful Summons", description: "When you are reduced to 0 hit points, nature immediately comes to your aid." }
            ]
        },
        {
            name: "Circle of Spores",
            description: "Druids who embrace the cycle of life and death through fungal and decomposition magic.",
            features: [
                { level: 2, name: "Circle Spells", description: "You learn additional spells related to decay and necromancy." },
                { level: 2, name: "Halo of Spores", description: "You can use spores to damage creatures near you." },
                { level: 6, name: "Symbiotic Entity", description: "You can enhance your combat abilities by becoming infused with fungal energy." },
                { level: 10, name: "Fungal Infestation", description: "When a humanoid dies near you, you can animate its corpse as a zombie." },
                { level: 14, name: "Spreading Spores", description: "You can spread your spores over a larger area." }
            ]
        },
        // TCoE
        {
            name: "Circle of Stars",
            description: "Druids who draw power from celestial constellations and cosmic magic.",
            features: [
                { level: 2, name: "Star Map", description: "You create a magical star map that enhances your abilities." },
                { level: 2, name: "Starry Form", description: "You can transform into a constellation-like form with various magical effects." },
                { level: 6, name: "Cosmic Omen", description: "You can invoke cosmic omens to aid or hinder creatures." },
                { level: 10, name: "Twinkling Constellation", description: "Your Starry Form becomes more powerful." },
                { level: 14, name: "Full of Stars", description: "You gain additional protective abilities from the cosmic forces." }
            ]
        },
        {
            name: "Circle of Wildfire",
            description: "Druids who understand the destructive and renewal aspects of fire in nature.",
            features: [
                { level: 2, name: "Summon Wildfire Spirit", description: "You can summon a magical spirit that represents the consuming and reformative power of fire." },
                { level: 2, name: "Enhanced Bond", description: "Your connection with your Wildfire Spirit grows stronger." },
                { level: 6, name: "Cauterizing Flames", description: "You can use fire to heal and damage simultaneously." },
                { level: 10, name: "Blazing Revival", description: "When you are reduced to 0 hit points, your Wildfire Spirit can save you." },
                { level: 14, name: "Timely Destruction", description: "Your fire magic becomes more precise and powerful." }
            ]
        }
    ];
}

// FIGHTER SUBCLASSES
const fighterClass = defaultClasses.find((c: CharacterClass) => c.name === "Fighter");
if (fighterClass) {
    fighterClass.subclasses = [
        // PHB
        {
            name: "Champion",
            description: "A simple but powerful archetype that focuses on weapon combat through improved critical hits and superior physical attributes.",
            features: [
                { level: 3, name: "Improved Critical", description: "Your weapon attacks score a critical hit on a roll of 19 or 20." },
                { level: 7, name: "Remarkable Athlete", description: "You can add half your proficiency bonus to any Strength, Dexterity, or Constitution check you make that doesn't already use your proficiency bonus." },
                { level: 10, name: "Additional Fighting Style", description: "You can choose a second option from the Fighting Style class feature." },
                { level: 15, name: "Superior Critical", description: "Your weapon attacks score a critical hit on a roll of 18-20." },
                { level: 18, name: "Survivor", description: "At the start of each of your turns, you regain hit points if you have no more than half of your hit points left." }
            ]
        },
        {
            name: "Battle Master",
            description: "A skilled warrior who uses combat maneuvers and tactical acumen to control the battlefield.",
            features: [
                { level: 3, name: "Combat Superiority", description: "You learn special combat maneuvers fueled by superiority dice." },
                { level: 3, name: "Student of War", description: "You gain proficiency with one type of artisan's tools of your choice." },
                { level: 7, name: "Know Your Enemy", description: "If you spend at least 1 minute observing or interacting with another creature outside combat, you can learn certain information about its capabilities." },
                { level: 10, name: "Improved Combat Superiority", description: "Your superiority dice turn into d10s." },
                { level: 15, name: "Relentless", description: "When you roll initiative and have no superiority dice remaining, you regain one superiority die." },
                { level: 18, name: "Improved Combat Superiority", description: "Your superiority dice turn into d12s." }
            ]
        },
        {
            name: "Eldritch Knight",
            description: "An arcane warrior who combines martial prowess with magical ability, focusing on abjuration and evocation spells.",
            features: [
                { level: 3, name: "Spellcasting", description: "You learn to cast wizard spells alongside your martial abilities." },
                { level: 3, name: "Weapon Bond", description: "You learn a ritual that creates a magical bond between yourself and one weapon." },
                { level: 7, name: "War Magic", description: "When you use your action to cast a cantrip, you can make one weapon attack as a bonus action." },
                { level: 10, name: "Eldritch Strike", description: "When you hit a creature with a weapon attack, that creature has disadvantage on the next saving throw it makes against a spell you cast before the end of your next turn." },
                { level: 15, name: "Arcane Charge", description: "You gain the ability to teleport up to 30 feet to an unoccupied space you can see when you use your Action Surge." },
                { level: 18, name: "Improved War Magic", description: "When you use your action to cast a spell, you can make one weapon attack as a bonus action." }
            ]
        },
        // XGtE
        {
            name: "Arcane Archer",
            description: "A fighter who combines archery with arcane magic to create supernatural arrow effects.",
            features: [
                { level: 3, name: "Arcane Shot", description: "You learn special magical shots to enhance your ranged attacks." },
                { level: 3, name: "Arcane Archer Spells", description: "You gain additional wizard spells that enhance your archery." },
                { level: 7, name: "Additional Magical Shot", description: "You learn additional magical arrow techniques." },
                { level: 10, name: "Ever-Ready Shot", description: "You can use Arcane Shot more frequently." },
                { level: 15, name: "Deadly Arrow", description: "Your Arcane Shots become more potent and dangerous." },
                { level: 18, name: "Piercing Shot", description: "You can fire an arrow that can penetrate multiple targets." }
            ]
        },
        {
            name: "Cavalier",
            description: "A fighter specializing in mounted combat and battlefield control.",
            features: [
                { level: 3, name: "Bonus Proficiency", description: "You gain proficiency with animal handling and one type of gaming set." },
                { level: 3, name: "Born to the Saddle", description: "You have advantages when mounted and can quickly mount or dismount." },
                { level: 7, name: "Unwavering Mark", description: "You can mark enemies and gain combat advantages against them." },
                { level: 10, name: "Warding Maneuver", description: "You can protect yourself or an ally from incoming attacks." },
                { level: 15, name: "Hold the Line", description: "You can prevent enemies from moving away from you." },
                { level: 18, name: "Vigilant Defender", description: "You can make additional opportunity attacks." }
            ]
        },
        {
            name: "Samurai",
            description: "A fighter who embodies martial discipline and cultural traditions of honor.",
            features: [
                { level: 3, name: "Bonus Proficiency", description: "You gain proficiency in one skill and one type of artisan's tools." },
                { level: 3, name: "Fighting Spirit", description: "You can bolster yourself in battle with incredible resolve." },
                { level: 7, name: "Elegant Courtier", description: "You gain advantages in social interactions and additional language proficiency." },
                { level: 10, name: "Tireless Spirit", description: "Your Fighting Spirit can be used more frequently." },
                { level: 15, name: "Rapid Strike", description: "You can make additional attacks when you have advantage." },
                { level: 18, name: "Strength Before Death", description: "You can continue fighting even after being reduced to 0 hit points." }
            ]
        },
        // TCoE
        {
            name: "Psi Warrior",
            description: "A fighter who harnesses psionic energy to enhance combat abilities.",
            features: [
                { level: 3, name: "Psionic Power", description: "You gain the ability to use psionic energy to enhance your attacks and defenses." },
                { level: 3, name: "Telekinetic Adept", description: "You can use telekinesis to move objects and creatures." },
                { level: 7, name: "Telekinetic Thrust", description: "You can use your psionic abilities to push or pull enemies." },
                { level: 10, name: "Guarded Mind", description: "You gain resistance to psychic damage and immunity to the charmed condition." },
                { level: 15, name: "Bulwark of Force", description: "You can create a protective telekinetic barrier." },
                { level: 18, name: "Improved Psionic Power", description: "Your psionic abilities become more powerful and versatile." }
            ]
        },
        {
            name: "Rune Knight",
            description: "A fighter who harnesses magical runes to enhance their combat abilities.",
            features: [
                { level: 3, name: "Bonus Proficiencies", description: "You gain proficiency with smith's tools and giant language." },
                { level: 3, name: "Rune Carver", description: "You can imbue your equipment with magical runes that grant special abilities." },
                { level: 7, name: "Additional Rune", description: "You learn additional magical runes to enhance your abilities." },
                { level: 10, name: "Great Stature", description: "You can magically increase your size in battle." },
                { level: 15, name: "Runic Shield", description: "You can protect allies by redirecting attacks." },
                { level: 18, name: "Rune Master", description: "Your runes become more powerful and versatile." }
            ]
        }
    ];
}

// MONK SUBCLASSES
const monkClass = defaultClasses.find((c: CharacterClass) => c.name === "Monk");
if (monkClass) {
    monkClass.subclasses = [
        // PHB
        {
            name: "Way of the Open Hand",
            description: "Monks who study the ancient arts of unarmed combat and self-perfection.",
            features: [
                { level: 3, name: "Open Hand Technique", description: "You can manipulate your opponent's ki when you harness your own." },
                { level: 6, name: "Wholeness of Body", description: "You gain the ability to heal yourself." },
                { level: 11, name: "Tranquility", description: "You can enter a special meditation that surrounds you with an aura of peace." },
                { level: 17, name: "Quivering Palm", description: "You gain the ability to set up lethal vibrations in someone's body." }
            ]
        },
        {
            name: "Way of Shadow",
            description: "Monks who follow the path of stealth and deception.",
            features: [
                { level: 3, name: "Shadow Arts", description: "You can use your ki to duplicate the effects of certain spells." },
                { level: 6, name: "Shadow Step", description: "You gain the ability to step from one shadow into another." },
                { level: 11, name: "Cloak of Shadows", description: "You have learned to become one with the shadows." },
                { level: 17, name: "Opportunist", description: "You can exploit a creature's momentary distraction." }
            ]
        },
        {
            name: "Way of the Four Elements",
            description: "Monks who harness the power of the four elements.",
            features: [
                { level: 3, name: "Disciple of the Elements", description: "You learn magical disciplines that harness the power of the four elements." },
                { level: 3, name: "Elemental Attunement", description: "You can use your action to briefly control elemental forces." },
                { level: 6, name: "Additional Elemental Disciplines", description: "You learn an additional elemental discipline of your choice." },
                { level: 11, name: "Additional Elemental Disciplines", description: "You learn another elemental discipline of your choice." },
                { level: 17, name: "Additional Elemental Disciplines", description: "You learn another elemental discipline of your choice." }
            ]
        },
        // XGtE
        {
            name: "Way of the Drunken Master",
            description: "Monks who use unpredictable, seemingly clumsy movements to confuse and outmaneuver opponents.",
            features: [
                { level: 3, name: "Bonus Proficiencies", description: "You gain proficiency with the Performance skill and brewer's supplies." },
                { level: 3, name: "Drunken Technique", description: "Your movement becomes erratic and unpredictable." },
                { level: 6, name: "Tipsy Sway", description: "You can redirect attacks and move without provoking opportunity attacks." },
                { level: 11, name: "Drunkard's Luck", description: "You can reroll a saving throw or ability check." },
                { level: 17, name: "Intoxicated Frenzy", description: "You can make additional attacks against multiple targets." }
            ]
        },
        {
            name: "Way of the Kensei",
            description: "Monks who turn weapons into extensions of their martial arts prowess.",
            features: [
                { level: 3, name: "Kensei Weapons", description: "You gain proficiency and special abilities with specific weapons." },
                { level: 3, name: "One with the Blade", description: "You can imbue your kensei weapons with additional capabilities." },
                { level: 6, name: "Precise Strike", description: "You can increase your weapon attacks' accuracy and damage." },
                { level: 11, name: "Warrior's Mercy", description: "You can choose to deal non-lethal damage more effectively." },
                { level: 17, name: "Complete Kensei", description: "Your weapon mastery reaches its ultimate form." }
            ]
        },
        {
            name: "Way of the Sun Soul",
            description: "Monks who channel spiritual energy into devastating ranged attacks.",
            features: [
                { level: 3, name: "Radiant Sun Bolt", description: "You can launch searing bolts of magical radiant energy." },
                { level: 6, name: "Searing Arc Strike", description: "You can use your ki to empower your radiant attacks." },
                { level: 11, name: "Searing Sunburst", description: "You can create a powerful burst of radiant energy." },
                { level: 17, name: "Sun Shield", description: "You can create a protective aura of radiant energy." }
            ]
        },
        // TCoE
        {
            name: "Way of Mercy",
            description: "Monks who balance the ability to heal and harm, acting as medical practitioners and executioners.",
            features: [
                { level: 3, name: "Implements of Mercy", description: "You gain proficiency with the Insight and Medicine skills." },
                { level: 3, name: "Hand of Healing", description: "You can use your ki to heal wounds." },
                { level: 6, name: "Hand of Harm", description: "You can use your ki to inflict necrotic damage." },
                { level: 11, name: "Emissary of Mercy", description: "Your healing and harming abilities become more potent." },
                { level: 17, name: "Improved Mercy", description: "You gain ultimate control over life and death." }
            ]
        },
        {
            name: "Way of the Astral Self",
            description: "Monks who can manifest an astral version of themselves, combining spiritual and physical combat.",
            features: [
                { level: 3, name: "Arms of the Astral Self", description: "You can summon spectral arms that enhance your unarmed strikes." },
                { level: 6, name: "Visage of the Astral Self", description: "You can manifest a spectral visage that grants additional abilities." },
                { level: 11, name: "Body of the Astral Self", description: "You can manifest a full astral body that increases your combat capabilities." },
                { level: 17, name: "Complete Astral Self", description: "Your astral self becomes a powerful manifestation of your inner being." }
            ]
        }
    ];
}

// PALADIN SUBCLASSES
const paladinClass = defaultClasses.find((c: CharacterClass) => c.name === "Paladin");
if (paladinClass) {
    paladinClass.subclasses = [
        // PHB
        {
            name: "Oath of Devotion",
            description: "Paladins who uphold the highest ideals of justice, virtue, and order.",
            features: [
                { level: 3, name: "Tenets of Devotion", description: "You are held to a high standard of conduct, embodying virtues of honesty, courage, compassion, and justice." },
                { level: 3, name: "Channel Divinity: Sacred Weapon", description: "You can use your Channel Divinity to imbue a weapon with divine power." },
                { level: 3, name: "Channel Divinity: Turn the Unholy", description: "You can use your Channel Divinity to cause an evil creature to flee." },
                { level: 7, name: "Aura of Devotion", description: "You and friendly creatures within range are immune to being charmed while in the aura." },
                { level: 15, name: "Purity of Spirit", description: "You are under the constant effect of a protection from evil and good spell." },
                { level: 20, name: "Holy Nimbus", description: "You can radiate an aura of pure light that damages and repels evil creatures." }
            ]
        },
        {
            name: "Oath of the Ancients",
            description: "Paladins who swear to preserve the light of creation and protect life and beauty.",
            features: [
                { level: 3, name: "Tenets of the Ancients", description: "Your oath is to the light, to life, to the good that preserves all things." },
                { level: 3, name: "Channel Divinity: Nature's Wrath", description: "You can invoke the power of nature to bind a creature in place." },
                { level: 3, name: "Channel Divinity: Turn the Faithless", description: "You can use your Channel Divinity to frighten otherworldly creatures." },
                { level: 7, name: "Aura of Warding", description: "You and friendly creatures within range have resistance to spell damage." },
                { level: 15, name: "Undying Sentinel", description: "You gain resistance to bludgeoning, piercing, and slashing damage from nonmagical attacks." },
                { level: 20, name: "Elder Champion", description: "You become an embodiment of the light, gaining incredible might and nature's resilience." }
            ]
        },
        {
            name: "Oath of Vengeance",
            description: "Paladins who seek righteous retribution against those who have committed grievous sins.",
            features: [
                { level: 3, name: "Tenets of Vengeance", description: "Your focus is on punishing those who have committed terrible crimes." },
                { level: 3, name: "Channel Divinity: Abjure Enemy", description: "You can use your Channel Divinity to frighten a foe." },
                { level: 3, name: "Channel Divinity: Vow of Enmity", description: "You can use your Channel Divinity to declare a special hatred for a particular enemy." },
                { level: 7, name: "Relentless Avenger", description: "You can move quickly to pursue your foes." },
                { level: 15, name: "Soul of Vengeance", description: "When an enemy under your Vow of Enmity makes an attack, you can use your reaction to attack." },
                { level: 20, name: "Avenging Angel", description: "You transform into a powerful angelic being of vengeance." }
            ]
        },
        // XGtE
        {
            name: "Oath of Conquest",
            description: "Paladins who seek to dominate and subjugate, spreading fear and order through might.",
            features: [
                { level: 3, name: "Tenets of Conquest", description: "Your oath focuses on the imposition of order through strength and fear." },
                { level: 3, name: "Channel Divinity: Conquering Presence", description: "You can use your Channel Divinity to inspire terror in your enemies." },
                { level: 3, name: "Channel Divinity: Guided Strike", description: "You can use your Channel Divinity to enhance your attack precision." },
                { level: 7, name: "Aura of Conquest", description: "Enemies in your aura become frightened and move more slowly." },
                { level: 15, name: "Scornful Rebuke", description: "Creatures that damage you suffer psychic damage." },
                { level: 20, name: "Invincible Conqueror", description: "You become a terrifying avatar of conquest." }
            ]
        },
        {
            name: "Oath of Redemption",
            description: "Paladins dedicated to protecting the weak and offering mercy to those who seek redemption.",
            features: [
                { level: 3, name: "Tenets of Redemption", description: "You believe in the possibility of redemption for even the most fallen." },
                { level: 3, name: "Channel Divinity: Emissary of Peace", description: "You can use your Channel Divinity to calm hostile creatures." },
                { level: 3, name: "Channel Divinity: Rebuke the Violent", description: "You can use your Channel Divinity to punish attackers." },
                { level: 7, name: "Aura of the Guardian", description: "You can protect allies by taking damage in their place." },
                { level: 15, name: "Protective Spirit", description: "You gain the ability to heal yourself when protecting others." },
                { level: 20, name: "Emissary of Redemption", description: "You become a beacon of peace, redirecting harm from others to yourself." }
            ]
        },
        // TCoE
        {
            name: "Oath of the Crown",
            description: "Paladins who serve a monarch or kingdom, dedicating themselves to law and order.",
            features: [
                { level: 3, name: "Tenets of the Crown", description: "Your oath is to the ideals of civilization, order, and the rule of law." },
                { level: 3, name: "Channel Divinity: Champion Challenge", description: "You can challenge a creature to single combat." },
                { level: 3, name: "Channel Divinity: Turn the Tide", description: "You can bolster your allies' defenses." },
                { level: 7, name: "Divine Allegiance", description: "You can redirect damage from allies to yourself." },
                { level: 15, name: "Unyielding Spirit", description: "You gain advantages against effects that would incapacitate you." },
                { level: 20, name: "Exalted Champion", description: "You become a supreme defender of your cause." }
            ]
        },
        {
            name: "Oath of Glory",
            description: "Paladins who seek to achieve legendary status and inspire others through heroic deeds.",
            features: [
                { level: 3, name: "Tenets of Glory", description: "Your oath is to achieve greatness and inspire others through your heroic actions." },
                { level: 3, name: "Channel Divinity: Peerless Athlete", description: "You can enhance your physical abilities dramatically." },
                { level: 3, name: "Channel Divinity: Inspiring Smite", description: "When you use Divine Smite, you can inspire nearby allies." },
                { level: 7, name: "Aura of Alacrity", description: "You and your allies can move more quickly." },
                { level: 15, name: "Glorious Defense", description: "You can redirect attacks that would miss you to another target." },
                { level: 20, name: "Living Legend", description: "You become a mythical hero, gaining extraordinary abilities." }
            ]
        }
    ];
}

// RANGER SUBCLASSES
const rangerClass = defaultClasses.find((c: CharacterClass) => c.name === "Ranger");
if (rangerClass) {
    rangerClass.subclasses = [
        // PHB
        {
            name: "Hunter",
            description: "Rangers who specialize in tracking and eliminating specific types of enemies.",
            features: [
                { level: 3, name: "Hunter's Prey", description: "You gain a special ability to hunt different types of prey." },
                { level: 7, name: "Defensive Tactics", description: "You learn special defensive techniques against various threats." },
                { level: 11, name: "Multiattack", description: "You gain the ability to make multiple attacks against your chosen prey." },
                { level: 15, name: "Superior Hunter's Defense", description: "You learn an advanced defensive technique." }
            ]
        },
        {
            name: "Beast Master",
            description: "Rangers who form a powerful bond with an animal companion.",
            features: [
                { level: 3, name: "Ranger's Companion", description: "You gain an animal companion that fights alongside you." },
                { level: 7, name: "Exceptional Training", description: "Your animal companion becomes more capable in combat." },
                { level: 11, name: "Bestial Fury", description: "Your animal companion can attack multiple times." },
                { level: 15, name: "Share Spells", description: "You can cast spells through your animal companion." }
            ]
        },
        // XGtE
        {
            name: "Gloom Stalker",
            description: "Rangers who excel at ambushes and operating in darkness.",
            features: [
                { level: 3, name: "Dread Ambusher", description: "You gain enhanced abilities for first-round combat and moving in darkness." },
                { level: 3, name: "Umbral Sight", description: "You gain enhanced darkvision and can become nearly invisible in darkness." },
                { level: 7, name: "Iron Mind", description: "You gain mental resilience against certain effects." },
                { level: 11, name: "Stalker's Flurry", description: "You can continue attacking after a missed strike." },
                { level: 15, name: "Shadowy Dodge", description: "You can magically avoid attacks in dim or dark conditions." }
            ]
        },
        {
            name: "Horizon Walker",
            description: "Rangers who patrol the boundaries between planes and protect against extraplanar threats.",
            features: [
                { level: 3, name: "Planar Sense", description: "You can detect the presence of planar portals and extraplanar creatures." },
                { level: 3, name: "Horde Breaker", description: "You can attack multiple creatures with your initial attack." },
                { level: 7, name: "Ethereal Step", description: "You can briefly shift to the Ethereal Plane." },
                { level: 11, name: "Distant Strike", description: "You can teleport between attacks." },
                { level: 15, name: "Spectral Defense", description: "You gain resistance to damage from planar beings." }
            ]
        },
        {
            name: "Monster Slayer",
            description: "Rangers specialized in hunting and defeating powerful supernatural creatures.",
            features: [
                { level: 3, name: "Hunter's Sense", description: "You can analyze a creature's supernatural abilities." },
                { level: 3, name: "Slayer's Prey", description: "You can mark a creature as your primary target." },
                { level: 7, name: "Supernatural Defense", description: "You gain advantages against supernatural creatures." },
                { level: 11, name: "Magic-User's Nemesis", description: "You can interfere with a creature's spellcasting." },
                { level: 15, name: "Slayer's Counter", description: "You can immediately counterattack a marked creature." }
            ]
        },
        // TCoE
        {
            name: "Fey Wanderer",
            description: "Rangers who have been touched by the magical essence of the Feywild.",
            features: [
                { level: 3, name: "Fey Wanderer's Magic", description: "You gain additional magical abilities from the Feywild." },
                { level: 3, name: "Wanderer's Rapport", description: "You can magically charm and communicate with creatures." },
                { level: 7, name: "Beguiling Twist", description: "You can redirect charm effects and gain benefits from them." },
                { level: 11, name: "Fey Reinforcements", description: "You can summon fey creatures to aid you." },
                { level: 15, name: "Heart of the Wild", description: "You become more resistant to magical manipulation." }
            ]
        },
        {
            name: "Swarmkeeper",
            description: "Rangers who have formed a mystical bond with a swarm of tiny creatures.",
            features: [
                { level: 3, name: "Gathered Swarm", description: "You can control a magical swarm that assists you in combat." },
                { level: 3, name: "Swarm's Movement", description: "Your swarm can manipulate the battlefield and help you move." },
                { level: 7, name: "Writhing Tide", description: "You can use your swarm to enhance your mobility." },
                { level: 11, name: "Mighty Swarm", description: "Your swarm becomes more powerful and versatile." },
                { level: 15, name: "Swarming Dispersal", description: "You can use your swarm to avoid damage and reposition." }
            ]
        }
    ];
}

// ROGUE SUBCLASSES
const rogueClass = defaultClasses.find((c: CharacterClass) => c.name === "Rogue");
if (rogueClass) {
    rogueClass.subclasses = [
        // PHB
        {
            name: "Thief",
            description: "Rogues who excel at stealth, burglary, and using items with great skill.",
            features: [
                { level: 3, name: "Fast Hands", description: "You can use the bonus action granted by your Cunning Action to make a Dexterity (Sleight of Hand) check, use your thieves' tools, or use an object." },
                { level: 3, name: "Second-Story Work", description: "You gain the ability to climb faster than normal and jump farther." },
                { level: 9, name: "Supreme Sneak", description: "You have advantage on a Dexterity (Stealth) check if you move no more than half your speed on the same turn." },
                { level: 13, name: "Use Magic Device", description: "You have learned enough about the workings of magic that you can improvise the use of items even when they are not intended for you." },
                { level: 17, name: "Thief's Reflexes", description: "You have become adept at laying ambushes and quickly escaping danger. You can take two turns during the first round of any combat." }
            ]
        },
        {
            name: "Assassin",
            description: "Rogues who specialize in disguise and eliminating targets quickly and efficiently.",
            features: [
                { level: 3, name: "Bonus Proficiencies", description: "You gain proficiency with the disguise kit and the poisoner's kit." },
                { level: 3, name: "Assassinate", description: "You are at your deadliest when you get the drop on your enemies." },
                { level: 9, name: "Infiltration Expertise", description: "You can create false identities for yourself that are nearly impossible to detect." },
                { level: 13, name: "Impostor", description: "You gain the ability to unerringly mimic another person's speech, writing, and behavior." },
                { level: 17, name: "Death Strike", description: "When you attack and hit a creature that is surprised, it must make a Constitution saving throw. On a failed save, it takes double the damage of your attack." }
            ]
        },
        {
            name: "Arcane Trickster",
            description: "Rogues who enhance their skills with magic, focusing on illusion and enchantment.",
            features: [
                { level: 3, name: "Spellcasting", description: "You augment your roguish skills with the ability to cast spells." },
                { level: 3, name: "Mage Hand Legerdemain", description: "You can make your mage hand invisible, and you can perform additional tasks with it." },
                { level: 9, name: "Magical Ambush", description: "If you are hidden from a creature when you cast a spell on it, the creature has disadvantage on any saving throw it makes against the spell this turn." },
                { level: 13, name: "Versatile Trickster", description: "You gain the ability to distract targets with your mage hand." },
                { level: 17, name: "Spell Thief", description: "You gain the ability to magically steal the knowledge of how to cast a spell from another spellcaster." }
            ]
        },
        // XGtE
        {
            name: "Inquisitive",
            description: "Rogues who are masters of investigation, perception, and uncovering the truth.",
            features: [
                { level: 3, name: "Ear for Deceit", description: "You develop a keen ability to detect lies and inconsistencies." },
                { level: 3, name: "Eye for Detail", description: "You gain enhanced perception and investigative skills." },
                { level: 9, name: "Insightful Fighting", description: "You can gain advantages by thoroughly analyzing an opponent." },
                { level: 13, name: "Steady Eye", description: "You can carefully search an area with incredible efficiency." },
                { level: 17, name: "Unerring Eye", description: "You can automatically detect magical deceptions and illusions." }
            ]
        },
        {
            name: "Mastermind",
            description: "Rogues who excel at manipulation, strategy, and controlling the battlefield.",
            features: [
                { level: 3, name: "Master of Intrigue", description: "You gain proficiency in disguise kit, forgery kit, and additional languages." },
                { level: 3, name: "Master of Tactics", description: "You can use the Help action as a bonus action, and can do so at greater range." },
                { level: 9, name: "Insightful Manipulator", description: "You can discern a creature's capabilities and motivations." },
                { level: 13, name: "Misdirection", description: "You can redirect an attack meant for you to another creature." },
                { level: 17, name: "Soul of Deceit", description: "You become incredibly difficult to read or magically deceive." }
            ]
        },
        {
            name: "Scout",
            description: "Rogues who are experts at exploration, survival, and reconnaissance.",
            features: [
                { level: 3, name: "Skirmisher", description: "You gain improved mobility and can move without provoking opportunity attacks." },
                { level: 3, name: "Survivalist", description: "You gain additional skills related to survival and exploration." },
                { level: 9, name: "Superior Mobility", description: "Your movement speed increases significantly." },
                { level: 13, name: "Ambush Master", description: "You become exceptionally good at setting up and executing surprise attacks." },
                { level: 17, name: "Sudden Strike", description: "You can make additional attacks against surprised or unaware targets." }
            ]
        },
        // TCoE
        {
            name: "Phantom",
            description: "Rogues who have a mystical connection to death and can steal skills from fallen creatures.",
            features: [
                { level: 3, name: "Whispers of the Dead", description: "You can gain proficiency in a skill or tool when a creature dies near you." },
                { level: 3, name: "Wails from the Grave", description: "You can deal additional necrotic damage when you use Sneak Attack." },
                { level: 9, name: "Tokens of the Departed", description: "You can create spectral tokens from recently deceased creatures." },
                { level: 13, name: "Ghost Walk", description: "You can briefly become incorporeal." },
                { level: 17, name: "Death's Friend", description: "You gain enhanced abilities related to death and spectral energy." }
            ]
        },
        {
            name: "Soulknife",
            description: "Rogues who manifest psychic blades and use telepathic abilities.",
            features: [
                { level: 3, name: "Psychic Blades", description: "You can manifest magical blades of psychic energy." },
                { level: 3, name: "Psychic Telepathy", description: "You gain the ability to communicate telepathically." },
                { level: 9, name: "Soul Blades", description: "Your psychic blades become more versatile and powerful." },
                { level: 13, name: "Terrifying Blades", description: "You can use your psychic blades to frighten enemies." },
                { level: 17, name: "Reckless Strike", description: "You can unleash devastating psychic attacks at the cost of increased vulnerability." }
            ]
        }
    ];
}

// SORCERER SUBCLASSES
const sorcererClass = defaultClasses.find((c: CharacterClass) => c.name === "Sorcerer");
if (sorcererClass) {
    sorcererClass.subclasses = [
        // PHB
        {
            name: "Draconic Bloodline",
            description: "Sorcerers with magical powers derived from draconic ancestry.",
            features: [
                { level: 1, name: "Draconic Resilience", description: "Your dragon heritage gives you enhanced durability." },
                { level: 1, name: "Dragon Ancestor", description: "You choose a type of dragon that influences your magical abilities." },
                { level: 6, name: "Elemental Affinity", description: "You gain increased power with spells of your draconic ancestry's element." },
                { level: 14, name: "Dragon Wings", description: "You can sprout draconic wings and fly." },
                { level: 18, name: "Draconic Presence", description: "You can create an aura of awe or fear based on your dragon type." }
            ]
        },
        {
            name: "Wild Magic",
            description: "Sorcerers whose magic is unpredictable and chaotic.",
            features: [
                { level: 1, name: "Wild Magic Surge", description: "Your spellcasting can trigger unpredictable magical effects." },
                { level: 6, name: "Bend Luck", description: "You can manipulate luck to aid allies or hinder enemies." },
                { level: 14, name: "Controlled Chaos", description: "You gain more control over your wild magic." },
                { level: 18, name: "Spell Bombardment", description: "You can potentially deal extra damage with your spells." }
            ]
        },
        // XGtE
        {
            name: "Storm Sorcery",
            description: "Sorcerers who have an innate connection to the power of elemental storms.",
            features: [
                { level: 1, name: "Wind Speaker", description: "You can understand and speak Primordial dialect of Auran." },
                { level: 1, name: "Storm Magic", description: "When you are in a area of stormy weather, you gain additional magical benefits." },
                { level: 6, name: "Heart of the Storm", description: "You gain resistance to lightning and thunder damage." },
                { level: 14, name: "Storm's Fury", description: "You can unleash destructive lightning when attacked." },
                { level: 18, name: "Wind Soul", description: "You gain powerful storm-related abilities and immunities." }
            ]
        },
        {
            name: "Divine Soul",
            description: "Sorcerers who have a magical connection to a divine being or celestial power.",
            features: [
                { level: 1, name: "Divine Magic", description: "You can add spells from the cleric spell list to your sorcerer spell list." },
                { level: 1, name: "Favored by the Gods", description: "You can reroll a saving throw or attack roll when you are in desperate need." },
                { level: 6, name: "Empowered Healing", description: "You can reroll damage or healing dice to maximize their effectiveness." },
                { level: 14, name: "Otherworldly Wings", description: "You can sprout spectral wings that grant you flight." },
                { level: 18, name: "Unearthly Recovery", description: "You can heal yourself when critically wounded." }
            ]
        },
        {
            name: "Shadow Magic",
            description: "Sorcerers who draw power from the Shadowfell and the magic of darkness.",
            features: [
                { level: 1, name: "Eyes of the Dark", description: "You gain enhanced darkvision and magical darkness abilities." },
                { level: 1, name: "Strength of the Grave", description: "When reduced to 0 hit points, you can potentially survive." },
                { level: 6, name: "Hound of Ill Omen", description: "You can summon a spectral hound to hunt your enemies." },
                { level: 14, name: "Shadow Walk", description: "You can teleport between areas of dim light or darkness." },
                { level: 18, name: "Umbral Form", description: "You can transform into a shadowy, incorporeal form." }
            ]
        },
        // TCoE
        {
            name: "Aberrant Mind",
            description: "Sorcerers who have been touched by otherworldly, alien intelligences.",
            features: [
                { level: 1, name: "Telepathic Speech", description: "You gain telepathic communication abilities." },
                { level: 1, name: "Aberrant Spells", description: "You can add additional spells from an expanded list to your sorcerer spell list." },
                { level: 6, name: "Psionic Sorcery", description: "You can cast spells without verbal or somatic components." },
                { level: 14, name: "Revelation in Flesh", description: "You can transform yourself with alien mutations." },
                { level: 18, name: "Warping Imperative", description: "You can force creatures to make difficult choices through psychic manipulation." }
            ]
        },
        {
            name: "Clockwork Soul",
            description: "Sorcerers connected to the mechanics of order and predictability from Mechanus.",
            features: [
                { level: 1, name: "Clockwork Magic", description: "You gain additional spells that represent mathematical precision and order." },
                { level: 1, name: "Restore Balance", description: "You can manipulate luck and probability to aid allies or hinder enemies." },
                { level: 6, name: "Bastion of Law", description: "You can protect allies from chaos and randomness." },
                { level: 14, name: "Tinkered Mind", description: "You gain resistance to being charmed or frightened." },
                { level: 18, name: "Promethean Soul", description: "You can restore order and perfection through powerful magical abilities." }
            ]
        }
    ];
}

// WARLOCK SUBCLASSES
const warlockClass = defaultClasses.find((c: CharacterClass) => c.name === "Warlock");
if (warlockClass) {
    warlockClass.subclasses = [
        // PHB
        {
            name: "Archfey Patron",
            description: "Warlocks who have made a pact with a powerful fey creature of the Feywild.",
            features: [
                { level: 1, name: "Expanded Spell List", description: "You gain additional spells related to the Archfey." },
                { level: 1, name: "Fey Presence", description: "You can magically charm or frighten creatures." },
                { level: 6, name: "Misty Escape", description: "You can vanish in a cloud of mist when in danger." },
                { level: 10, name: "Beguiling Defenses", description: "You become immune to being charmed." },
                { level: 14, name: "Dark Delirium", description: "You can send a creature into a magical dream state." }
            ]
        },
        {
            name: "Fiend Patron",
            description: "Warlocks who have made a pact with a powerful fiendish entity from the Lower Planes.",
            features: [
                { level: 1, name: "Expanded Spell List", description: "You gain additional spells related to the Fiend." },
                { level: 1, name: "Dark One's Blessing", description: "You gain temporary hit points when you reduce an enemy to 0 hit points." },
                { level: 6, name: "Dark One's Own Luck", description: "You can add a d10 to an ability check or saving throw." },
                { level: 10, name: "Fiendish Resilience", description: "You gain resistance to a damage type of your choice." },
                { level: 14, name: "Hurl Through Hell", description: "You can send an enemy on a horrific journey through the Nine Hells." }
            ]
        },
        {
            name: "Great Old One Patron",
            description: "Warlocks who have made a pact with an incomprehensible otherworldly being.",
            features: [
                { level: 1, name: "Expanded Spell List", description: "You gain additional spells related to the Great Old One." },
                { level: 1, name: "Awakened Mind", description: "You can communicate telepathically." },
                { level: 6, name: "Entropic Ward", description: "You can ward yourself against an attack." },
                { level: 10, name: "Thought Shield", description: "Your mind becomes difficult to read and you gain psychic resistance." },
                { level: 14, name: "Create Thrall", description: "You can magically charm a humanoid." }
            ]
        },
        // XGtE
        {
            name: "Celestial Patron",
            description: "Warlocks who have made a pact with a powerful celestial being of light and healing.",
            features: [
                { level: 1, name: "Expanded Spell List", description: "You gain additional spells related to healing and radiant magic." },
                { level: 1, name: "Healing Light", description: "You can use your magical energy to heal allies." },
                { level: 6, name: "Radiant Soul", description: "You gain bonus radiant damage and resistance to radiant damage." },
                { level: 10, name: "Celestial Resistance", description: "You gain additional protective abilities." },
                { level: 14, name: "Searing Vengeance", description: "When you are reduced to 0 hit points, you can deal radiant damage and potentially stand back up." }
            ]
        },
        {
            name: "Hexblade Patron",
            description: "Warlocks who have made a pact with a sentient magical weapon from the Shadowfell.",
            features: [
                { level: 1, name: "Expanded Spell List", description: "You gain additional spells related to combat and curses." },
                { level: 1, name: "Hexblade's Curse", description: "You can curse an enemy, gaining combat advantages." },
                { level: 1, name: "Hex Warrior", description: "You can use your Charisma for weapon attacks and damage." },
                { level: 6, name: "Accursed Specter", description: "You can create a spectre from a creature you kill." },
                { level: 10, name: "Armor of Hexes", description: "Your Hexblade's Curse becomes more powerful." },
                { level: 14, name: "Master of Hexes", description: "Your curse can jump to additional targets." }
            ]
        },
        // TCoE
        {
            name: "Fathomless Patron",
            description: "Warlocks who have made a pact with an ancient, mysterious entity of the deep ocean.",
            features: [
                { level: 1, name: "Expanded Spell List", description: "You gain additional spells related to water and the depths." },
                { level: 1, name: "Tentacle of the Deeps", description: "You can summon a spectral tentacle to attack or assist you." },
                { level: 6, name: "Gift of the Sea", description: "You gain swimming capabilities and underwater adaptations." },
                { level: 10, name: "Soul of the Deeps", description: "You gain resistance to cold damage and additional underwater abilities." },
                { level: 14, name: "Guardian of the Deeps", description: "You can call upon the power of the depths to protect yourself and allies." }
            ]
        },
        {
            name: "Undead Patron",
            description: "Warlocks who have made a pact with an undead entity or powerful being associated with death.",
            features: [
                { level: 1, name: "Expanded Spell List", description: "You gain additional spells related to necromancy and death." },
                { level: 1, name: "Form of Dread", description: "You can transform into a terrifying spectral form." },
                { level: 6, name: "Grave Touched", description: "You gain resistance to necrotic damage and other undead-related benefits." },
                { level: 10, name: "Mortal Husk", description: "You can resist being reduced to 0 hit points." },
                { level: 14, name: "Spirit Projection", description: "You can project your spirit form separately from your body." }
            ]
        }
    ];
}

// WIZARD SUBCLASSES
const wizardClass = defaultClasses.find((c: CharacterClass) => c.name === "Wizard");
if (wizardClass) {
    wizardClass.subclasses = [
        // PHB
        {
            name: "School of Evocation",
            description: "Wizards who specialize in channeling powerful elemental energies to destroy opponents.",
            features: [
                { level: 2, name: "Evocation Savant", description: "The gold and time you must spend to copy an evocation spell into your spellbook is halved." },
                { level: 2, name: "Sculpt Spells", description: "You can create pockets of relative safety within the effects of your evocation spells." },
                { level: 6, name: "Potent Cantrip", description: "Your damaging cantrips affect even creatures that avoid the brunt of the effect." },
                { level: 10, name: "Empowered Evocation", description: "You can add your Intelligence modifier to the damage roll of any wizard evocation spell you cast." },
                { level: 14, name: "Overchannel", description: "You can increase the power of your simpler spells at the cost of your own vitality." }
            ]
        },
        {
            name: "School of Abjuration",
            description: "Wizards who specialize in protective magic and warding against attacks and other spells.",
            features: [
                { level: 2, name: "Abjuration Savant", description: "The gold and time you must spend to copy an abjuration spell into your spellbook is halved." },
                { level: 2, name: "Arcane Ward", description: "You can weave abjuration magic around yourself for protection." },
                { level: 6, name: "Projected Ward", description: "When a creature you can see within 30 feet takes damage, you can use your reaction to cause your Arcane Ward to absorb that damage." },
                { level: 10, name: "Improved Abjuration", description: "When you cast an abjuration spell that requires you to make an ability check as part of casting that spell, you add your proficiency bonus to that ability check." },
                { level: 14, name: "Spell Resistance", description: "You have advantage on saving throws against spells, and you have resistance against damage dealt by spells." }
            ]
        },
        {
            name: "School of Divination",
            description: "Wizards who master the ability to see into the past, present, and future.",
            features: [
                { level: 2, name: "Divination Savant", description: "The gold and time you must spend to copy a divination spell into your spellbook is halved." },
                { level: 2, name: "Portent", description: "Glimpses of the future allow you to replace attack rolls, saving throws, or ability checks." },
                { level: 6, name: "Expert Divination", description: "When you cast a divination spell of 2nd level or higher using a spell slot, you regain one expended spell slot of a lower level." },
                { level: 10, name: "The Third Eye", description: "You can use your action to increase your powers of perception." },
                { level: 14, name: "Greater Portent", description: "You gain the ability to use your Portent feature three times rather than twice between rests." }
            ]
        },
        {
            name: "School of Enchantment",
            description: "Wizards who specialize in spells that affect the minds of others.",
            features: [
                { level: 2, name: "Enchantment Savant", description: "The gold and time you must spend to copy an enchantment spell into your spellbook is halved." },
                { level: 2, name: "Hypnotic Gaze", description: "You can entrance a creature with your magical gaze." },
                { level: 6, name: "Instinctive Charm", description: "When a creature you can see within 30 feet makes an attack roll against you, you can use your reaction to divert the attack." },
                { level: 10, name: "Split Enchantment", description: "When you cast an enchantment spell of 1st level or higher that targets only one creature, you can have it target a second creature." },
                { level: 14, name: "Alter Memories", description: "You can modify a creature's memories after successfully charming it." }
            ]
        },
        {
            name: "School of Illusion",
            description: "Wizards who create phantom images and trick the senses.",
            features: [
                { level: 2, name: "Illusion Savant", description: "The gold and time you must spend to copy an illusion spell into your spellbook is halved." },
                { level: 2, name: "Improved Minor Illusion", description: "You learn the Minor Illusion cantrip. If you already know this cantrip, you learn a different wizard cantrip of your choice." },
                { level: 6, name: "Malleable Illusions", description: "When you cast an illusion spell that has a duration of 1 minute or longer, you can use your action to change the nature of that illusion." },
                { level: 10, name: "Illusory Self", description: "You can create an illusory duplicate of yourself as an instant, almost instinctive reaction to danger." },
                { level: 14, name: "Illusory Reality", description: "You can make an illusion real for a brief moment." }
            ]
        },
        {
            name: "School of Necromancy",
            description: "Wizards who study the magic of life and death, with power over undead.",
            features: [
                { level: 2, name: "Necromancy Savant", description: "The gold and time you must spend to copy a necromancy spell into your spellbook is halved." },
                { level: 2, name: "Grim Harvest", description: "You gain the ability to reap life energy from creatures you kill with your spells." },
                { level: 6, name: "Undead Thralls", description: "You add the animate dead spell to your spellbook. When you cast animate dead, you can target one additional corpse or pile of bones, creating another zombie or skeleton." },
                { level: 10, name: "Inured to Undeath", description: "You have resistance to necrotic damage, and your hit point maximum can't be reduced." },
                { level: 14, name: "Command Undead", description: "You can use magic to bring undead under your control, even those created by other wizards." }
            ]
        },
        {
            name: "School of Transmutation",
            description: "Wizards who modify energy and matter with magic.",
            features: [
                { level: 2, name: "Transmutation Savant", description: "The gold and time you must spend to copy a transmutation spell into your spellbook is halved." },
                { level: 2, name: "Minor Alchemy", description: "You can temporarily alter the physical properties of one nonmagical object." },
                { level: 6, name: "Transmuter's Stone", description: "You can create a transmuter's stone that stores transmutation magic." },
                { level: 10, name: "Shapechanger", description: "You add the polymorph spell to your spellbook, if it is not there already. You can cast polymorph without expending a spell slot." },
                { level: 14, name: "Master Transmuter", description: "You can use your transmuter's stone to perform powerful magical transformations." }
            ]
        },
        // XGtE
        {
            name: "School of War Magic",
            description: "Wizards who blend arcane might with combat prowess.",
            features: [
                { level: 2, name: "Arcane Deflection", description: "You can use your reaction to reduce damage or improve a saving throw." },
                { level: 2, name: "Tactical Wit", description: "You gain a bonus to initiative rolls." },
                { level: 6, name: "Power Surge", description: "You can store magical energy to enhance your spells." },
                { level: 10, name: "Durable Magic", description: "You gain additional protection while concentrating on a spell." },
                { level: 14, name: "Deflecting Shroud", description: "When you use Arcane Deflection, you can harm nearby creatures." }
            ]
        },
        {
            name: "School of Bladesinging",
            description: "Wizards who combine intricate blade dance with arcane magic, originating from elven culture.",
            features: [
                { level: 2, name: "Training in War and Song", description: "You gain proficiency with light armor and one type of one-handed melee weapon." },
                { level: 2, name: "Bladesong", description: "You can enter a magical dance that enhances your combat abilities." },
                { level: 6, name: "Extra Attack", description: "You can attack twice when you take the Attack action." },
                { level: 10, name: "Song of Defense", description: "You can use your Bladesong to absorb damage." },
                { level: 14, name: "Song of Victory", description: "Your Bladesong provides additional combat benefits." }
            ]
        },
        // TCoE
        {
            name: "Order of Scribes",
            description: "Wizards who are masters of magical research and arcane writing.",
            features: [
                { level: 2, name: "Wizardly Quill", description: "You can magically create a special quill that aids in spellcasting and research." },
                { level: 2, name: "Awakened Spellbook", description: "Your spellbook becomes a sentient magical object." },
                { level: 6, name: "Manifest Mind", description: "You can create a magical projection of your mind." },
                { level: 10, name: "Spell Storing", description: "You can store a spell in your spellbook for later use." },
                { level: 14, name: "Copy Spell", description: "You can change the damage type of your spells instantly." }
            ]
        },
        {
            name: "Chronurgy Magic",
            description: "Wizards who manipulate the flow of time itself.",
            features: [
                { level: 2, name: "Chronal Shift", description: "You can manipulate probability to reroll a creature's attack roll, ability check, or saving throw." },
                { level: 2, name: "Temporal Awareness", description: "You can add your Intelligence modifier to initiative rolls." },
                { level: 6, name: "Momentary Presence", description: "You can briefly remove yourself from time to avoid damage." },
                { level: 10, name: "Arcane Abeyance", description: "You can store a spell in a mote of arcane energy." },
                { level: 14, name: "Convergent Future", description: "You can manipulate multiple potential futures." }
            ]
        },
        {
            name: "Graviturgy Magic",
            description: "Wizards who manipulate gravity and physical forces.",
            features: [
                { level: 2, name: "Adjust Density", description: "You can magically alter the weight of a creature or object." },
                { level: 2, name: "Gravity Sense", description: "You can detect and analyze gravitational forces." },
                { level: 6, name: "Invert Gravity", description: "You can manipulate gravitational forces to lift or suppress objects and creatures." },
                { level: 10, name: "Violent Attraction", description: "You can cause creatures to be drawn together or repelled." },
                { level: 14, name: "Event Horizon", description: "You gain ultimate control over gravitational forces." }
            ]
        }
    ];
}