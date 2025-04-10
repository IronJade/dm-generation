import { Plugin } from 'obsidian';

import { 
    NPCGeneratorSettings, 
    NPC, 
    NPCGenerationOptions, 
    CharacterClass, 
    Race
} from './types';

import { defaultRaces, defaultClasses } from './data/defaults';
import { NPCGenerationUtils } from './utils/npc-generation';
import { PossessionsUtils } from './utils/possessions';
import { SpellcastingUtils } from './utils/spellcasting';
import { NPCGeneratorModal } from './ui/modal';
import { NPCGeneratorSettingsTab } from './ui/settings-tab';

export default class NPCGenerator extends Plugin {
    settings: NPCGeneratorSettings = {} as NPCGeneratorSettings;

    async onload() {
        // Load settings
        await this.loadSettings();
        
        // Add ribbon icon
        this.addRibbonIcon('dice', 'Generate NPC', () => {
            new NPCGeneratorModal(this.app, this).open();
        });

        // Add settings tab
        this.addSettingTab(new NPCGeneratorSettingsTab(this.app, this));
        
        // Add command to generate NPC
        this.addCommand({
            id: 'generate-npc',
            name: 'Generate NPC',
            callback: () => {
                new NPCGeneratorModal(this.app, this).open();
            }
        });
    }

    async loadSettings() {
        // Default settings
        const defaultSettings: NPCGeneratorSettings = {
            races: defaultRaces,
            classes: defaultClasses,
            customParameters: [],
            statblockFormat: "fantasyStatblock"
        };
        
        // Load saved settings
        const savedData = await this.loadData();
        
        // Create settings by merging defaults with saved data
        this.settings = {
            races: (savedData?.races?.length > 5) ? savedData.races : defaultSettings.races,
            classes: (savedData?.classes?.length > 5) ? savedData.classes : defaultSettings.classes,
            customParameters: savedData?.customParameters || [],
            statblockFormat: savedData?.statblockFormat || "fantasyStatblock"
        };
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }

    /**
     * Generate an NPC based on provided options
     * @param options Generation options
     * @returns Generated NPC
     */
    generateNPC(options: NPCGenerationOptions = {}): NPC {
        // Default options
        const defaults: NPCGenerationOptions = {
            level: Math.floor(Math.random() * 20) + 1,
            race: this.getRandomRace().name,
            class: this.getRandomClass().name,
            alignment: NPCGenerationUtils.generateAlignment(),
        };
    
        // Merge defaults with provided options
        const mergedOptions = { ...defaults, ...options };
    
        // Find selected race and class
        const race = this.settings.races.find(r => r.name === mergedOptions.race)!;
        const characterClass = this.settings.classes.find(c => c.name === mergedOptions.class)!;
        
        // In the method, update the subclass selection:
        let subclass = null;
        if (characterClass.subclasses && characterClass.subclasses.length > 0) {
            // If a specific subclass is requested, use that
            if (mergedOptions.subclass) {
                console.log(`Looking for subclass: ${mergedOptions.subclass}`);
                subclass = characterClass.subclasses.find(s => s.name === mergedOptions.subclass);
        
                // Log if we found the subclass or not
                if (subclass) {
                    console.log(`Found subclass: ${subclass.name}`);
                } else {
                    console.log(`Subclass not found: ${mergedOptions.subclass}`);
                }
            } 
            // Otherwise randomly select a subclass if level is high enough and no specific "None" was selected
            else if (mergedOptions.subclass !== 'None') {
                const subclassLevel = characterClass.name === "Wizard" ? 2 : 3;

                if (mergedOptions.level! >= subclassLevel) {
                    subclass = characterClass.subclasses[Math.floor(Math.random() * characterClass.subclasses.length)];
                    console.log(`Randomly selected subclass: ${subclass.name}`);
        }
    }
        }

        // Generate base ability scores
        let abilityScores = NPCGenerationUtils.generateAbilityScores();
        
        // Apply racial adjustments
        abilityScores = NPCGenerationUtils.applyRacialAdjustments(abilityScores, race);
        
        // Calculate ability modifiers
        const abilityModifiers = NPCGenerationUtils.calculateAbilityModifiers(abilityScores);

        // Calculate hit points
        const hitPoints = NPCGenerationUtils.calculateHitPoints(
            characterClass, 
            abilityModifiers.con ?? 0, 
            mergedOptions.level!
        );

        // Generate skills
        const skills = NPCGenerationUtils.generateSkills(
            characterClass, 
            abilityModifiers, 
            mergedOptions.level!
        );

        // Generate proficiency bonus
        const proficiencyBonus = NPCGenerationUtils.calculateProficiencyBonus(mergedOptions.level!);

        // Generate name
        const name = NPCGenerationUtils.generateName(race);

        // Generate possessions
        const possessions = PossessionsUtils.generatePossessions(characterClass);

        // Generate spellcasting (if applicable)
        const spellcasting = SpellcastingUtils.isSpellcaster(characterClass)
            ? SpellcastingUtils.generateSpellcasting(
                characterClass, 
                abilityModifiers, 
                mergedOptions.level!
            )
            : undefined;

        // Prepare custom parameters
        const customParameters: Record<string, any> = {};
        if (spellcasting) {
            customParameters.spellcasting = spellcasting;
        }

        // Return complete NPC object
        return {
            name,
            level: mergedOptions.level!,
            race: race.name,
            class: characterClass.name,
            subclass: subclass ? subclass.name : undefined,
            alignment: mergedOptions.alignment!,
            abilityScores,
            abilityModifiers,
            hitPoints,
            proficiencyBonus,
            skills,
            traits: race.traits,
            possessions,
            customParameters
        };
    }

    /**
     * Get a random race from settings
     * @returns Race
     */
    private getRandomRace(): Race {
        return this.settings.races[
            Math.floor(Math.random() * this.settings.races.length)
        ];
    }

    /**
     * Get a random class from settings
     * @returns CharacterClass
     */
    private getRandomClass(): CharacterClass {
        return this.settings.classes[
            Math.floor(Math.random() * this.settings.classes.length)
        ];
    }

    /**
     * Format NPC statblock
     * @param npc NPC to format
     * @returns Formatted statblock string
     */
    formatStatblock(npc: NPC): string {
        if (this.settings.statblockFormat === 'fantasyStatblock') {
            return this.formatFantasyStatblock(npc);
        } else {
            return this.formatBasicStatblock(npc);
        }
    }

    /**
     * Format NPC using Fantasy Statblock format
     * @param npc NPC to format
     * @returns Formatted Fantasy Statblock string
     */
    private formatFantasyStatblock(npc: NPC): string {
    // Get class and race details
    const characterClass = this.settings.classes.find(c => c.name === npc.class);
    if (!characterClass) {
        throw new Error(`Class ${npc.class} not found`);
    }
    
    const race = this.settings.races.find(r => r.name === npc.race);
    if (!race) {
        throw new Error(`Race ${npc.race} not found`);
    }
    
    const hitDie = characterClass.hitDie || 8;
    
    // Calculate class-specific attack bonuses
    const strAttackBonus = (npc.abilityModifiers.str ?? 0) + npc.proficiencyBonus;
    const dexAttackBonus = (npc.abilityModifiers.dex ?? 0) + npc.proficiencyBonus;
    
    // Determine primary attack based on class and ability scores
    const isPrimaryStrength = (characterClass.primaryAbility === 'str' || 
                             (npc.abilityModifiers.str ?? 0) > (npc.abilityModifiers.dex ?? 0));
    
    const primaryAttackBonus = isPrimaryStrength ? strAttackBonus : dexAttackBonus;
    const primaryDamageBonus = isPrimaryStrength ? (npc.abilityModifiers.str ?? 0) : (npc.abilityModifiers.dex ?? 0);
    const attackType = isPrimaryStrength ? "Longsword" : "Shortsword";
    const attackDamage = isPrimaryStrength ? "1d8" : "1d6";
    const damageType = "slashing";
    
    // Calculate average damage
    const damageDie = parseInt(attackDamage.split('d')[1]);
    const averageDamage = Math.ceil(damageDie / 2) + 1 + primaryDamageBonus;
    
    // Determine languages
    const languageList = race.languages?.join(", ") || "Common";

    // Add subclass features separately from regular features
    const subclassContent = npc.subclass ? this.getSubclassFeatures(characterClass, npc.subclass, npc.level) : '';
    
    return `\`\`\`statblock
name: ${npc.name}
source: NPC Generator
size: ${race?.size || "Medium"}
type: humanoid
subtype: ${npc.race.toLowerCase()}
alignment: ${npc.alignment.toLowerCase()}
ac: ${10 + (npc.abilityModifiers.dex ?? 0)}
hp: ${npc.hitPoints}
hit_dice: ${npc.level}d${hitDie} + ${npc.level * (npc.abilityModifiers.con ?? 0)}
speed: ${race?.speed || 30} ft.
stats:
  - ${npc.abilityScores.str}
  - ${npc.abilityScores.dex}
  - ${npc.abilityScores.con}
  - ${npc.abilityScores.int}
  - ${npc.abilityScores.wis}
  - ${npc.abilityScores.cha}
saves:
  - strength: ${(npc.abilityModifiers.str ?? 0) + (characterClass?.savingThrows.includes('str') ? npc.proficiencyBonus : 0)}
  - dexterity: ${(npc.abilityModifiers.dex ?? 0) + (characterClass?.savingThrows.includes('dex') ? npc.proficiencyBonus : 0)}
  - constitution: ${(npc.abilityModifiers.con ?? 0) + (characterClass?.savingThrows.includes('con') ? npc.proficiencyBonus : 0)}
  - intelligence: ${(npc.abilityModifiers.int ?? 0) + (characterClass?.savingThrows.includes('int') ? npc.proficiencyBonus : 0)}
  - wisdom: ${(npc.abilityModifiers.wis ?? 0) + (characterClass?.savingThrows.includes('wis') ? npc.proficiencyBonus : 0)}
  - charisma: ${(npc.abilityModifiers.cha ?? 0) + (characterClass?.savingThrows.includes('cha') ? npc.proficiencyBonus : 0)}
skillsaves:
${Object.entries(npc.skills).filter(([_, value]) => value !== 0).map(([skill, bonus]) => 
`  - ${skill.toLowerCase()}: ${bonus}`).join('\n')}
damage_vulnerabilities: ""
damage_resistances: ""
damage_immunities: ""
condition_immunities: ""
senses: ${race?.traits.includes("Darkvision") ? "darkvision 60 ft., " : ""}passive Perception ${10 + (npc.skills['Perception'] ?? 0)}
languages: ${languageList}
cr: "${Math.max(1, Math.floor(npc.level / 4))}"
bestiary: true
traits:
${npc.traits.map(trait => `  - name: ${trait}
    desc: ${this.getTraitDescription(trait, npc.race)}
    attack_bonus: 0`).join('\n')}
${characterClass?.features?.filter(f => f.level <= npc.level).map(feature => 
`  - name: ${feature.name}
    desc: ${feature.description}
    attack_bonus: 0`).join('\n') || ''}
${subclassContent}
actions:
  - name: ${attackType}
    desc: "Melee Weapon Attack: +${primaryAttackBonus} to hit, reach 5 ft., one target. Hit: ${averageDamage} (${attackDamage} + ${primaryDamageBonus}) ${damageType} damage."
    attack_bonus: ${primaryAttackBonus}
    damage_dice: ${attackDamage}
    damage_bonus: ${primaryDamageBonus}
${npc.customParameters.spellcasting ? `spells:
  - "The ${npc.name} is a level ${npc.level} spellcaster. Its spellcasting ability is ${npc.customParameters.spellcasting.ability} (spell save DC ${npc.customParameters.spellcasting.saveDC}, +${npc.customParameters.spellcasting.attackBonus} to hit with spell attacks)."
  - Cantrips (at will): ${SpellcastingUtils.getCantrips(npc.class).slice(0, npc.customParameters.spellcasting.cantripsKnown).join(', ')}
${Object.entries(npc.customParameters.spellcasting.slots).filter(([_, slots]) => Number(slots) > 0).map(([level, slots]) => 
`  - ${this.getOrdinal(parseInt(level))} level (${slots} slots): ${SpellcastingUtils.getSpellsByClassAndLevel(npc.class, parseInt(level)).slice(0, Math.min(4, Number(slots) + 1)).join(', ')}`
).join('\n')}` : ''}
possessions:
${this.formatPossessions(npc.possessions)}\n\`\`\``;
}

// Get subclass features for statblock
private getSubclassFeatures(characterClass: CharacterClass, subclassName: string, level: number): string {
    console.log(`Getting features for subclass: ${subclassName}`);
    
    const subclass = characterClass.subclasses?.find(s => s.name === subclassName);
    if (!subclass) {
        console.log(`Subclass not found: ${subclassName}`);
        return '';
    }
    
    console.log(`Found subclass: ${subclass.name} with ${subclass.features.length} features`);
    
    return subclass.features
        .filter(feature => feature.level <= level)
        .map(feature => {
            // Sanitize the feature name and description
            const sanitizeName = feature.name.replace(/['"]/g, '');
            const sanitizeDesc = feature.description
                .replace(/['"]/g, '')
                .replace(/`/g, '')
                .replace(/\n/g, ' ');
            
            console.log(`Adding feature: ${sanitizeName}`);
            
            return `  - name: ${sanitizeName} (${subclassName})
    desc: ${sanitizeDesc}
    attack_bonus: 0`;
        }).join('\n');
}

    /**
     * Format possessions for statblock
     */
    private formatPossessions(possessions: any[]): string {
        return possessions.map(item => {
            if (typeof item === 'string') {
                return ` - name: ${item}`;
            } else if (typeof item === 'object' && item !== null) {
                if ('desc' in item && 'name' in item) {
                    return ` - name: ${item.name}\n   desc: ${item.desc}`;
                } else if ('name' in item) {
                    return ` - name: ${item.name}`;
                }
            }
            return ` - name: ${String(item)}`;
        }).join('\n');
    }

    /**
     * Format NPC using Basic Text format
     * @param npc NPC to format
     * @returns Formatted Basic Text string
     */
    private formatBasicStatblock(npc: NPC): string {
    // Get class and race details
    const characterClass = this.settings.classes.find(c => c.name === npc.class);
    if (!characterClass) {
        throw new Error(`Class ${npc.class} not found`);
    }
    
    const race = this.settings.races.find(r => r.name === npc.race);
    if (!race) {
        throw new Error(`Race ${npc.race} not found`);
    }
    
    const hitDie = characterClass.hitDie || 8;
    
    // Calculate class-specific attack bonuses
    const strAttackBonus = (npc.abilityModifiers.str ?? 0) + npc.proficiencyBonus;
    const dexAttackBonus = (npc.abilityModifiers.dex ?? 0) + npc.proficiencyBonus;
    
    // Determine primary attack based on class and ability scores
    const isPrimaryStrength = (characterClass.primaryAbility === 'str' || 
                             (npc.abilityModifiers.str ?? 0) > (npc.abilityModifiers.dex ?? 0));
    
    const primaryAttackBonus = isPrimaryStrength ? strAttackBonus : dexAttackBonus;
    const primaryDamageBonus = isPrimaryStrength ? (npc.abilityModifiers.str ?? 0) : (npc.abilityModifiers.dex ?? 0);
    const attackType = isPrimaryStrength ? "Longsword" : "Shortsword";
    const attackDamage = isPrimaryStrength ? "1d8" : "1d6";
    const damageType = "slashing";
    
    // Calculate average damage
    const damageDie = parseInt(attackDamage.split('d')[1]);
    const averageDamage = Math.ceil(damageDie / 2) + 1 + primaryDamageBonus;
    
    // Determine languages
    const languageList = race.languages?.join(", ") || "Common";

        // Basic text format
        return `name: ${npc.name}
source: NPC Generator
size: ${race?.size || "Medium"}
type: humanoid
subtype: ${npc.race.toLowerCase()}
alignment: ${npc.alignment.toLowerCase()}
ac: ${10 + (npc.abilityModifiers.dex ?? 0)}
hp: ${npc.hitPoints}
hit_dice: ${npc.level}d${hitDie} + ${npc.level * (npc.abilityModifiers.con ?? 0)}
speed: ${race?.speed || 30} ft.
stats:
  - ${npc.abilityScores.str}
  - ${npc.abilityScores.dex}
  - ${npc.abilityScores.con}
  - ${npc.abilityScores.int}
  - ${npc.abilityScores.wis}
  - ${npc.abilityScores.cha}
saves:
  - strength: ${(npc.abilityModifiers.str ?? 0) + (characterClass?.savingThrows.includes('str') ? npc.proficiencyBonus : 0)}
  - dexterity: ${(npc.abilityModifiers.dex ?? 0) + (characterClass?.savingThrows.includes('dex') ? npc.proficiencyBonus : 0)}
  - constitution: ${(npc.abilityModifiers.con ?? 0) + (characterClass?.savingThrows.includes('con') ? npc.proficiencyBonus : 0)}
  - intelligence: ${(npc.abilityModifiers.int ?? 0) + (characterClass?.savingThrows.includes('int') ? npc.proficiencyBonus : 0)}
  - wisdom: ${(npc.abilityModifiers.wis ?? 0) + (characterClass?.savingThrows.includes('wis') ? npc.proficiencyBonus : 0)}
  - charisma: ${(npc.abilityModifiers.cha ?? 0) + (characterClass?.savingThrows.includes('cha') ? npc.proficiencyBonus : 0)}
skillsaves:
${Object.entries(npc.skills).filter(([_, value]) => value !== 0).map(([skill, bonus]) => 
`  - ${skill.toLowerCase()}: ${bonus}`).join('\n')}
damage_vulnerabilities: ""
damage_resistances: ""
damage_immunities: ""
condition_immunities: ""
senses: ${race?.traits.includes("Darkvision") ? "darkvision 60 ft., " : ""}passive Perception ${10 + (npc.skills['Perception'] ?? 0)}
languages: ${languageList}
cr: "${Math.max(1, Math.floor(npc.level / 4))}"
bestiary: true
traits:
${npc.traits.map(trait => `  - name: ${trait}
    desc: ${this.getTraitDescription(trait, npc.race)}
    attack_bonus: 0`).join('\n')}
${characterClass?.features?.filter(f => f.level <= npc.level).map(feature => 
`  - name: ${feature.name}
    desc: ${feature.description}
    attack_bonus: 0`).join('\n') || ''}
${npc.subclass ? this.getSubclassFeatures(characterClass, npc.subclass, npc.level) : ''}
actions:
  - name: ${attackType}
    desc: "Melee Weapon Attack: +${primaryAttackBonus} to hit, reach 5 ft., one target. Hit: ${averageDamage} (${attackDamage} + ${primaryDamageBonus}) ${damageType} damage."
    attack_bonus: ${primaryAttackBonus}
    damage_dice: ${attackDamage}
    damage_bonus: ${primaryDamageBonus}
${npc.customParameters.spellcasting ? `spells:
  - "The ${npc.name} is a level ${npc.level} spellcaster. Its spellcasting ability is ${npc.customParameters.spellcasting.ability} (spell save DC ${npc.customParameters.spellcasting.saveDC}, +${npc.customParameters.spellcasting.attackBonus} to hit with spell attacks)."
  - Cantrips (at will): ${SpellcastingUtils.getCantrips(npc.class).slice(0, npc.customParameters.spellcasting.cantripsKnown).join(', ')}
${Object.entries(npc.customParameters.spellcasting.slots).filter(([_, slots]) => Number(slots) > 0).map(([level, slots]) => 
`  - ${this.getOrdinal(parseInt(level))} level (${slots} slots): ${SpellcastingUtils.getSpellsByClassAndLevel(npc.class, parseInt(level)).slice(0, Math.min(4, Number(slots) + 1)).join(', ')}`
).join('\n')}` : ''}
possessions:
${this.formatPossessions(npc.possessions)}`;
}

    /**
     * Get ordinal suffix for a number
     * @param n Number to format
     * @returns Number with ordinal suffix
     */
    private getOrdinal(n: number): string {
        const suffixes = ['th', 'st', 'nd', 'rd'];
        const remainder = n % 100;
        
        return n + (suffixes[(remainder - 20) % 10] || suffixes[remainder] || suffixes[0]);
    }

    /**
    * Get description for racial traits
    */
    private getTraitDescription(trait: string, race: string): string {
        const traitDescriptions: Record<string, string> = {
            // Basic traits
            "Darkvision": "Can see in dim light within 60 feet as if it were bright light, and in darkness as if it were dim light.",
            "Superior Darkvision": "Can see in dim light within 120 feet as if it were bright light, and in darkness as if it were dim light.",
            "Fey Ancestry": "Has advantage on saving throws against being charmed, and magic can't put it to sleep.",
            "Trance": "Doesn't need to sleep, but meditates semiconsciously for 4 hours a day.",
            "Keen Senses": "Has proficiency in the Perception skill.",
            "Dwarven Resilience": "Has advantage on saving throws against poison, and has resistance against poison damage.",
            "Stonecunning": "Has doubled proficiency bonus when making Intelligence (History) checks related to stonework.",
            "Dwarven Combat Training": "Has proficiency with the battleaxe, handaxe, light hammer, and warhammer.",
            "Lucky": "When rolling a 1 on an attack roll, ability check, or saving throw, can reroll the die and must use the new roll.",
            "Brave": "Has advantage on saving throws against being frightened.",
            "Halfling Nimbleness": "Can move through the space of any creature that is of a size larger than yours.",
            "Versatile": "Gains proficiency in one additional skill of your choice.",
            "Skilled": "Gains proficiency in one skill of your choice, one tool of your choice, and one language of your choice.",
            "Feat": "Gains one Feat of your choice.",
            
            // Elf traits
            "Elf Weapon Training": "Has proficiency with the longsword, shortsword, shortbow, and longbow.",
            "Cantrip": "Knows one cantrip of your choice from the wizard spell list.",
            "Fleet of Foot": "Base walking speed increases to 35 feet.",
            "Mask of the Wild": "Can attempt to hide even when only lightly obscured by foliage, heavy rain, falling snow, mist, and other natural phenomena.",
            "Drow Magic": "Knows the dancing lights cantrip. At 3rd level, can cast faerie fire once per day. At 5th level, can cast darkness once per day.",
            "Sunlight Sensitivity": "Has disadvantage on attack rolls and Wisdom (Perception) checks that rely on sight when you, the target of your attack, or whatever you are trying to perceive is in direct sunlight.",
            "Drow Weapon Training": "Has proficiency with rapiers, shortswords, and hand crossbows.",
            
            // Dwarf traits
            "Dwarven Toughness": "Hit point maximum increases by 1, and increases by 1 every time you gain a level.",
            "Dwarven Armor Training": "Has proficiency with light and medium armor.",
            
            // Halfling traits
            "Naturally Stealthy": "Can attempt to hide even when obscured only by a creature that is at least one size larger.",
            "Stout Resilience": "Has advantage on saving throws against poison, and has resistance against poison damage.",
            
            // Dragonborn traits
            "Draconic Ancestry": "Has draconic ancestry. Choose one type of dragon; your breath weapon and damage resistance are determined by the dragon type.",
            "Breath Weapon": "Can use your action to exhale destructive energy. Your draconic ancestry determines the size, shape, and damage type of the exhalation.",
            "Damage Resistance": "Has resistance to the damage type associated with your draconic ancestry.",
            
            // Gnome traits
            "Gnome Cunning": "Has advantage on all Intelligence, Wisdom, and Charisma saving throws against magic.",
            "Natural Illusionist": "Knows the minor illusion cantrip. Intelligence is your spellcasting ability for it.",
            "Speak with Small Beasts": "Can communicate simple ideas with Small or smaller beasts through sounds and gestures.",
            "Artificer's Lore": "Has doubled proficiency bonus when making Intelligence (History) checks related to magic items, alchemical objects, or technological devices.",
            "Tinker": "Has proficiency with artisan's tools (tinker's tools) and can use them to construct tiny clockwork devices.",
            
            // Half-orc traits
            "Menacing": "Has proficiency in the Intimidation skill.",
            "Relentless Endurance": "When reduced to 0 hit points but not killed outright, can drop to 1 hit point instead. Can't use this feature again until after a long rest.",
            "Savage Attacks": "When scoring a critical hit with a melee weapon attack, can roll one of the weapon's damage dice one additional time and add it to the extra damage.",
            
            // Tiefling traits
            "Hellish Resistance": "Has resistance to fire damage.",
            "Infernal Legacy": "Knows the thaumaturgy cantrip. At 3rd level, can cast hellish rebuke once per day. At 5th level, can cast darkness once per day.",
            
            // Aasimar traits
            "Celestial Resistance": "Has resistance to necrotic damage and radiant damage.",
            "Healing Hands": "As an action, can touch a creature and heal a total number of hit points equal to your level. Can't use this trait again until after a long rest.",
            "Light Bearer": "Knows the light cantrip.",
            "Radiant Soul": "Can unleash divine energy within yourself. Your eyes glimmer and two luminous, incorporeal wings emerge from your back.",
            "Radiant Consumption": "Can unleash divine energy within yourself, causing a searing light to radiate from you.",
            "Necrotic Shroud": "Can unleash divine energy within yourself, causing your eyes to turn into pools of darkness and two skeletal, ghostly wings to emerge from your back.",
            
            // Other races
            "Firbolg Magic": "Can cast detect magic and disguise self spells once per short rest.",
            "Hidden Step": "As a bonus action, can magically turn invisible until the start of your next turn or until you attack, make a damage roll, or force someone to make a saving throw.",
            "Powerful Build": "Counts as one size larger when determining your carrying capacity and the weight you can push, drag, or lift.",
            "Speech of Beast and Leaf": "Can communicate simple ideas with beasts and plants.",
            "Stone's Endurance": "Can focus to resist damage. When taking damage, can use your reaction to roll a d12, adding your Constitution modifier, and reduce the damage by that total.",
            "Mountain Born": "Has resistance to cold damage and are acclimated to high altitude.",
            "Natural Athlete": "Has proficiency in the Athletics skill.",
            "Feline Agility": "Your reflexes and agility allow you to move with a burst of speed.",
            "Cat's Claws": "Has retractable claws that are natural weapons, which can be used to make unarmed strikes.",
            "Cat's Talent": "Has proficiency in the Perception and Stealth skills.",
            "Expert Forgery": "Can duplicate other creatures' handwriting and craftwork.",
            "Mimicry": "Can mimic sounds you have heard, including voices.",
            "Kenku Training": "Has proficiency in two of the following skills of your choice: Acrobatics, Deception, Stealth, and Sleight of Hand.",
            "Amphibious": "Can breathe air and water.",
            "Control Air and Water": "Can cast fog cloud once per day. At 3rd level, can cast gust of wind once per day. At 5th level, can cast wall of water once per day.",
            "Emissary of the Sea": "Can communicate simple ideas with beasts that can breathe water.",
            "Guardians of the Depths": "Adapted to even the most extreme ocean depths.",
            "Claws": "Has retractable claws that are natural weapons, which can be used to make unarmed strikes.",
            "Hunter's Instincts": "Has proficiency in two of the following skills of your choice: Athletics, Perception, Stealth, or Survival.",
            "Daunting Roar": "As a bonus action, can let out an especially menacing roar.",
            "Fey": "Your creature type is fey, rather than humanoid.",
            "Magic Resistance": "Has advantage on saving throws against spells and other magical effects.",
            "Mirthful Leaps": "Whenever you make a long jump or high jump, you can roll a d8 and add the number rolled to the total distance in feet.",
            "Reveler": "Has proficiency in the Performance and Persuasion skills.",
            "Flight": "Has a flying speed of 30 feet. To use this speed, you can't be wearing medium or heavy armor.",
            "Fairy Magic": "Knows the druidcraft cantrip. Starting at 3rd level, can cast faerie fire once per day. Starting at 5th level, can cast enlarge/reduce once per day.",
            "Hare-Trigger": "Can add your proficiency bonus to your initiative rolls.",
            "Leporine Senses": "Has proficiency in the Perception skill.",
            "Lucky Footwork": "When you fail a Dexterity saving throw, you can use your reaction to roll a d4 and add it to the save.",
            "Rabbit Hop": "As a bonus action, can jump a number of feet equal to five times your proficiency bonus."
        };
    
        return traitDescriptions[trait] || `Racial trait of ${race}.`;
    }
}