// Ability Score Types
export type AbilityName = 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha';

// Ability Scores Interface
export interface AbilityScores {
    str: number;
    dex: number;
    con: number;
    int: number;
    wis: number;
    cha: number;
}

// Race Interface
export interface Race {
    name: string;
    abilityScoreAdjustments: Partial<AbilityScores>;
    traits: string[];
    size: "Tiny" | "Small" | "Medium" | "Large" | "Huge" | "Gargantuan";
    speed: number;
    languages: string[];
    additionalLanguages?: number;
}

// Class Interface
export interface CharacterClass {
    name: string;
    hitDie: 6 | 8 | 10 | 12;
    primaryAbility: AbilityName;
    savingThrows: AbilityName[];
    skills: string[];
    skillChoices: number;
    proficiencies: {
        weapons: string[];
        armor: string[];
        tools: string[];
    };
    subclasses?: {
        name: string;
        description: string;
        features: {
            level: number;
            name: string;
            description: string;
        }[];
    }[];
    features: {
        level: number;
        name: string;
        description: string;
    }[];
    spellcasting?: {
        ability: AbilityName;
        cantripsKnown?: number[];  // By level
        spellsKnown?: number[];   // By level for some classes
        prepareSpells?: boolean;  // For classes that prepare spells
    };
}

// Custom Parameter Interface
export interface CustomParameter {
    name: string;
    label: string;
    enabled: boolean;
    format: string;
}

// Spellcasting Interface
export interface Spellcasting {
    ability: string;
    saveDC: number;
    attackBonus: number;
    cantripsKnown: number;
    slots: Record<number, number>;
}

// Possible Alignments
export type Alignment = 
    | 'Lawful Good' 
    | 'Neutral Good' 
    | 'Chaotic Good'
    | 'Lawful Neutral' 
    | 'Neutral' 
    | 'Chaotic Neutral'
    | 'Lawful Evil' 
    | 'Neutral Evil' 
    | 'Chaotic Evil';

// Trait Interface
export interface Trait {
    name: string;
    desc: string;
    attack_bonus: number;
}

// Action Interface
export interface Action {
    name: string;
    desc: string;
    attack_bonus: number;
    damage_dice?: string;
    damage_bonus?: number;
}

// Possession Interface
export interface Possession {
    name: string;
    desc?: string;
}

// NPC Interface
export interface NPC {
    name: string;
    level: number;
    race: string;
    class: string;
    subclass?: string;
    alignment: Alignment;
    abilityScores: AbilityScores;
    abilityModifiers: Partial<AbilityScores>;
    hitPoints: number;
    proficiencyBonus: number;
    skills: Record<string, number>;
    traits: string[];
    possessions: (Possession | string)[];
    customParameters: {
        spellcasting?: Spellcasting;
        [key: string]: any;
    };
}

// Plugin Settings Interface
export interface NPCGeneratorSettings {
    races: Race[];
    classes: CharacterClass[];
    customParameters: CustomParameter[];
    statblockFormat: 'fantasyStatblock' | 'basic';
}

// NPC Generation Options
export interface NPCGenerationOptions {
    level?: number;
    race?: string;
    class?: string;
    subclass?: string;
    alignment?: Alignment;
    customParameters?: Record<string, any>;
}
