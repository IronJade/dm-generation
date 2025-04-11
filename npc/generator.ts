import UnifiedGeneratorPlugin from '../main';
import { 
    AbilityName, 
    AbilityScores, 
    Alignment,
    NPC, 
    NPCGenerationOptions
} from './types';
import { NPCGenerationUtils } from './utils/npc-generation';
import { PossessionsUtils } from './utils/possessions';
import { SpellcastingUtils } from './utils/spellcasting';

export class NPCGenerator {
    private plugin: UnifiedGeneratorPlugin;

    constructor(plugin: UnifiedGeneratorPlugin) {
        this.plugin = plugin;
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
        const race = this.plugin.npcSettings.races.find(r => r.name === mergedOptions.race)!;
        const characterClass = this.plugin.npcSettings.classes.find(c => c.name === mergedOptions.class)!;
        
        // Check for subclass
        let subclass: { name: string; description: string; features: { level: number; name: string; description: string; }[]; } | null = null;
        if (characterClass.subclasses && characterClass.subclasses.length > 0) {
            // If a specific subclass is requested, use that
            if (mergedOptions.subclass) {
                subclass = characterClass.subclasses.find(s => s.name === mergedOptions.subclass) || null;
            } 
            // Otherwise randomly select a subclass if level is high enough and no specific "None" was selected
            else if (mergedOptions.subclass !== 'None') {
                const subclassLevel = characterClass.name === "Wizard" ? 2 : 3;

                if (mergedOptions.level! >= subclassLevel) {
                    subclass = characterClass.subclasses[Math.floor(Math.random() * characterClass.subclasses.length)];
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
     */
    private getRandomRace() {
        return this.plugin.npcSettings.races[
            Math.floor(Math.random() * this.plugin.npcSettings.races.length)
        ];
    }

    /**
     * Get a random class from settings
     */
    private getRandomClass() {
        return this.plugin.npcSettings.classes[
            Math.floor(Math.random() * this.plugin.npcSettings.classes.length)
        ];
    }

    /**
     * Format NPC statblock
     */
    formatStatblock(npc: NPC): string {
        if (this.plugin.npcSettings.statblockFormat === 'fantasyStatblock') {
            return this.formatFantasyStatblock(npc);
        } else {
            return this.formatBasicStatblock(npc);
        }
    }

    /**
     * Format NPC using Fantasy Statblock format
     */
    private formatFantasyStatblock(npc: NPC): string {
        // Get class and race details
        const characterClass = this.plugin.npcSettings.classes.find(c => c.name === npc.class);
        if (!characterClass) {
            throw new Error(`Class ${npc.class} not found`);
        }
        
        const race = this.plugin.npcSettings.races.find(r => r.name === npc.race);
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

    /**
     * Helper method for formatting
     */
    private getSubclassFeatures(characterClass: any, subclassName: string, level: number): string {
        const subclass = characterClass.subclasses?.find((s: any) => s.name === subclassName);
        if (!subclass) {
            return '';
        }
        
        return subclass.features
            .filter((feature: any) => feature.level <= level)
            .map((feature: any) => {
                // Sanitize the feature name and description
                const sanitizeName = feature.name.replace(/['"]/g, '');
                const sanitizeDesc = feature.description
                    .replace(/['"]/g, '')
                    .replace(/`/g, '')
                    .replace(/\n/g, ' ');
                                
                return `  - name: ${sanitizeName} (${subclassName})
    desc: ${sanitizeDesc}
    attack_bonus: 0`;
            }).join('\n');
    }

    // Other helper methods for formatting
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
     */
    private formatBasicStatblock(npc: NPC): string {
        // Implementation similar to formatFantasyStatblock but with simpler formatting
        // ...implementation...
        return "Basic statblock format"; // Simplified for brevity
    }

    private getOrdinal(n: number): string {
        const suffixes = ['th', 'st', 'nd', 'rd'];
        const remainder = n % 100;
        
        return n + (suffixes[(remainder - 20) % 10] || suffixes[remainder] || suffixes[0]);
    }

    private getTraitDescription(trait: string, race: string): string {
        const traitDescriptions: Record<string, string> = {
            // Different trait descriptions
            "Darkvision": "Can see in dim light within 60 feet as if it were bright light, and in darkness as if it were dim light.",
            // More traits...
        };
        
        return traitDescriptions[trait] || `Racial trait of ${race}.`;
    }
}