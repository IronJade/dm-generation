import { CharacterClass, Spellcasting, AbilityName } from '../types';

export class SpellcastingUtils {
    /**
     * Spellcasting ability for different classes
     */
    private static spellcastingAbilities: Record<string, AbilityName> = {
        'Wizard': 'int',
        'Chronurgy Wizard': 'int',
        'Graviturgy Wizard': 'int',
        'Cleric': 'wis',
        'Druid': 'wis',
        'Circle of Stars Druid': 'wis',
        'Bard': 'cha',
        'College of Eloquence Bard': 'cha',
        'Paladin': 'cha',
        'Sorcerer': 'cha',
        'Warlock': 'cha',
        'Ranger': 'wis',
        'Artificer': 'int'
    };

    /**
     * Predefined spell lists by class and level
     */
    private static spellsByClassAndLevel: Record<string, Record<number, string[]>> = {
        'Wizard': {
            1: ['alarm', 'burning hands', 'charm person', 'color spray', 'comprehend languages', 'detect magic', 'disguise self', 'find familiar', 'fog cloud', 'grease', 'identify', 'mage armor', 'magic missile', 'shield', 'silent image', 'sleep', 'thunderwave'],
            2: ['arcane lock', 'blur', 'darkness', 'darkvision', 'detect thoughts', 'flaming sphere', 'hold person', 'invisibility', 'knock', 'levitate', 'magic weapon', 'mirror image', 'misty step', 'scorching ray', 'see invisibility', 'shatter', 'spider climb', 'web'],
            3: ['animate dead', 'bestow curse', 'blink', 'clairvoyance', 'counterspell', 'dispel magic', 'fireball', 'fly', 'gaseous form', 'haste', 'hypnotic pattern', 'lightning bolt', 'major image', 'protection from energy', 'slow', 'stinking cloud', 'tongues', 'water breathing'],
            4: ['arcane eye', 'banishment', 'black tentacles', 'blight', 'confusion', 'conjure minor elementals', 'dimension door', 'fabricate', 'fire shield', 'greater invisibility', 'ice storm', 'phantasmal killer', 'polymorph', 'stoneskin', 'wall of fire'],
            5: ['animate objects', 'bigby\'s hand', 'cloudkill', 'cone of cold', 'creation', 'dominate person', 'hold monster', 'legend lore', 'mislead', 'modify memory', 'passwall', 'scrying', 'telekinesis', 'teleportation circle', 'wall of force', 'wall of stone'],
            6: ['chain lightning', 'circle of death', 'contingency', 'create undead', 'disintegrate', 'eyebite', 'flesh to stone', 'globe of invulnerability', 'guards and wards', 'magic jar', 'mass suggestion', 'move earth', 'otiluke\'s freezing sphere', 'programmed illusion', 'true seeing'],
            7: ['delayed blast fireball', 'etherealness', 'finger of death', 'forcecage', 'mirage arcane', 'mordenkainen\'s magnificent mansion', 'mordenkainen\'s sword', 'plane shift', 'prismatic spray', 'project image', 'reverse gravity', 'sequester', 'simulacrum', 'symbol', 'teleport'],
            8: ['antimagic field', 'clone', 'control weather', 'demiplane', 'dominate monster', 'feeblemind', 'incendiary cloud', 'maze', 'mind blank', 'power word stun', 'sunburst'],
            9: ['astral projection', 'foresight', 'gate', 'imprisonment', 'meteor swarm', 'power word kill', 'prismatic wall', 'shapechange', 'time stop', 'true polymorph', 'weird', 'wish']
        },
        'Cleric': {
            1: ['bane', 'bless', 'command', 'create or destroy water', 'cure wounds', 'detect evil and good', 'detect magic', 'detect poison and disease', 'guiding bolt', 'healing word', 'inflict wounds', 'protection from evil and good', 'purify food and drink', 'sanctuary', 'shield of faith'],
            2: ['aid', 'augury', 'blindness/deafness', 'calm emotions', 'continual flame', 'enhance ability', 'find traps', 'gentle repose', 'hold person', 'lesser restoration', 'locate object', 'prayer of healing', 'protection from poison', 'silence', 'spiritual weapon', 'warding bond', 'zone of truth'],
            3: ['animate dead', 'beacon of hope', 'bestow curse', 'clairvoyance', 'create food and water', 'daylight', 'dispel magic', 'glyph of warding', 'magic circle', 'mass healing word', 'meld into stone', 'protection from energy', 'remove curse', 'revivify', 'sending', 'speak with dead', 'spirit guardians', 'tongues', 'water walk'],
            4: ['banishment', 'control water', 'death ward', 'divination', 'freedom of movement', 'guardian of faith', 'locate creature', 'stone shape'],
            5: ['commune', 'contagion', 'dispel evil and good', 'flame strike', 'geas', 'greater restoration', 'hallow', 'insect plague', 'legend lore', 'mass cure wounds', 'planar binding', 'raise dead', 'scrying'],
            6: ['blade barrier', 'create undead', 'find the path', 'forbiddance', 'harm', 'heal', 'heroes\' feast', 'planar ally', 'true seeing', 'word of recall'],
            7: ['conjure celestial', 'divine word', 'etherealness', 'fire storm', 'plane shift', 'regenerate', 'resurrection', 'symbol'],
            8: ['antimagic field', 'control weather', 'earthquake', 'holy aura'],
            9: ['astral projection', 'gate', 'mass heal', 'true resurrection']
        },
        'Druid': {
            1: ['animal friendship', 'charm person', 'create or destroy water', 'cure wounds', 'detect magic', 'detect poison and disease', 'entangle', 'faerie fire', 'fog cloud', 'goodberry', 'healing word', 'jump', 'longstrider', 'purify food and drink', 'speak with animals', 'thunderwave'],
            2: ['animal messenger', 'barkskin', 'darkvision', 'enhance ability', 'find traps', 'flame blade', 'flaming sphere', 'gust of wind', 'heat metal', 'hold person', 'lesser restoration', 'locate animals or plants', 'locate object', 'moonbeam', 'pass without trace', 'protection from poison', 'spike growth'],
            3: ['call lightning', 'conjure animals', 'daylight', 'dispel magic', 'meld into stone', 'plant growth', 'protection from energy', 'sleet storm', 'speak with plants', 'water breathing', 'water walk', 'wind wall'],
            4: ['blight', 'confusion', 'conjure minor elementals', 'conjure woodland beings', 'control water', 'dominate beast', 'freedom of movement', 'giant insect', 'hallucinatory terrain', 'ice storm', 'locate creature', 'polymorph', 'stone shape', 'stoneskin', 'wall of fire'],
            5: ['antilife shell', 'awaken', 'commune with nature', 'conjure elemental', 'contagion', 'geas', 'greater restoration', 'insect plague', 'mass cure wounds', 'planar binding', 'reincarnate', 'scrying', 'tree stride', 'wall of stone'],
            6: ['conjure fey', 'find the path', 'heal', 'heroes\' feast', 'move earth', 'sunbeam', 'transport via plants', 'wall of thorns', 'wind walk'],
            7: ['fire storm', 'mirage arcane', 'plane shift', 'regenerate', 'reverse gravity'],
            8: ['animal shapes', 'antipathy/sympathy', 'control weather', 'earthquake', 'feeblemind', 'sunburst'],
            9: ['foresight', 'shapechange', 'storm of vengeance', 'true resurrection']
        },
        'Bard': {
            1: ['animal friendship', 'bane', 'charm person', 'comprehend languages', 'cure wounds', 'detect magic', 'disguise self', 'faerie fire', 'feather fall', 'healing word', 'heroism', 'hideous laughter', 'identify', 'illusory script', 'longstrider', 'silent image', 'sleep', 'speak with animals', 'thunderwave', 'unseen servant'],
            2: ['animal messenger', 'blindness/deafness', 'calm emotions', 'cloud of daggers', 'crown of madness', 'detect thoughts', 'enhance ability', 'enthrall', 'heat metal', 'hold person', 'invisibility', 'knock', 'lesser restoration', 'locate animals or plants', 'locate object', 'magic mouth', 'phantasmal force', 'see invisibility', 'shatter', 'silence', 'suggestion', 'zone of truth'],
            3: ['bestow curse', 'clairvoyance', 'dispel magic', 'fear', 'feign death', 'glyph of warding', 'hypnotic pattern', 'leomund\'s tiny hut', 'major image', 'nondetection', 'plant growth', 'sending', 'speak with dead', 'speak with plants', 'stinking cloud', 'tongues'],
            4: ['compulsion', 'confusion', 'dimension door', 'freedom of movement', 'greater invisibility', 'hallucinatory terrain', 'locate creature', 'polymorph'],
            5: ['animate objects', 'awaken', 'dominate person', 'dream', 'geas', 'greater restoration', 'hold monster', 'legend lore', 'mass cure wounds', 'mislead', 'modify memory', 'planar binding', 'raise dead', 'scrying', 'seeming', 'teleportation circle'],
            6: ['eyebite', 'find the path', 'guards and wards', 'heroes\' feast', 'mass suggestion', 'otto\'s irresistible dance', 'programmed illusion', 'true seeing'],
            7: ['etherealness', 'forcecage', 'mirage arcane', 'mordenkainen\'s magnificent mansion', 'mordenkainen\'s sword', 'project image', 'regenerate', 'resurrection', 'symbol', 'teleport'],
            8: ['dominate monster', 'feeblemind', 'glibness', 'mind blank', 'power word stun'],
            9: ['foresight', 'power word kill', 'true polymorph']
        },
        'Sorcerer': {
            1: ['burning hands', 'charm person', 'color spray', 'comprehend languages', 'detect magic', 'disguise self', 'expeditious retreat', 'false life', 'feather fall', 'fog cloud', 'jump', 'mage armor', 'magic missile', 'ray of sickness', 'shield', 'silent image', 'sleep', 'thunderwave', 'witch bolt'],
            2: ['alter self', 'blindness/deafness', 'blur', 'darkness', 'darkvision', 'detect thoughts', 'enhance ability', 'enlarge/reduce', 'gust of wind', 'hold person', 'invisibility', 'knock', 'levitate', 'mirror image', 'misty step', 'scorching ray', 'see invisibility', 'shatter', 'spider climb', 'suggestion', 'web'],
            3: ['blink', 'clairvoyance', 'counterspell', 'daylight', 'dispel magic', 'fear', 'fireball', 'fly', 'gaseous form', 'haste', 'hypnotic pattern', 'lightning bolt', 'major image', 'protection from energy', 'sleet storm', 'slow', 'stinking cloud', 'tongues', 'water breathing', 'water walk'],
            4: ['banishment', 'blight', 'confusion', 'dimension door', 'dominate beast', 'greater invisibility', 'ice storm', 'polymorph', 'stoneskin', 'wall of fire'],
            5: ['animate objects', 'cloudkill', 'cone of cold', 'creation', 'dominate person', 'hold monster', 'insect plague', 'seeming', 'telekinesis', 'teleportation circle', 'wall of stone'],
            6: ['chain lightning', 'circle of death', 'disintegrate', 'eyebite', 'globe of invulnerability', 'mass suggestion', 'move earth', 'sunbeam', 'true seeing'],
            7: ['delayed blast fireball', 'etherealness', 'finger of death', 'fire storm', 'plane shift', 'prismatic spray', 'reverse gravity', 'teleport'],
            8: ['dominate monster', 'earthquake', 'incendiary cloud', 'power word stun', 'sunburst'],
            9: ['gate', 'meteor swarm', 'power word kill', 'time stop', 'wish']
        },
        'Warlock': {
            1: ['armor of agathys', 'arms of hadar', 'charm person', 'comprehend languages', 'expeditious retreat', 'hellish rebuke', 'hex', 'illusory script', 'protection from evil and good', 'unseen servant', 'witch bolt'],
            2: ['cloud of daggers', 'crown of madness', 'darkness', 'enthrall', 'hold person', 'invisibility', 'mirror image', 'misty step', 'ray of enfeeblement', 'shatter', 'spider climb', 'suggestion'],
            3: ['counterspell', 'dispel magic', 'fear', 'fly', 'gaseous form', 'hunger of hadar', 'hypnotic pattern', 'magic circle', 'major image', 'remove curse', 'tongues', 'vampiric touch'],
            4: ['banishment', 'blight', 'dimension door', 'hallucinatory terrain'],
            5: ['contact other plane', 'dream', 'hold monster', 'scrying'],
            6: ['arcane gate', 'circle of death', 'conjure fey', 'create undead', 'eyebite', 'flesh to stone', 'mass suggestion', 'true seeing'],
            7: ['etherealness', 'finger of death', 'forcecage', 'plane shift'],
            8: ['demiplane', 'dominate monster', 'feeblemind', 'glibness', 'power word stun'],
            9: ['astral projection', 'foresight', 'imprisonment', 'power word kill', 'true polymorph']
        },
        'Paladin': {
            1: ['bless', 'command', 'compelled duel', 'cure wounds', 'detect evil and good', 'detect magic', 'detect poison and disease', 'divine favor', 'heroism', 'protection from evil and good', 'purify food and drink', 'shield of faith'],
            2: ['aid', 'branding smite', 'find steed', 'lesser restoration', 'locate object', 'magic weapon', 'protection from poison', 'zone of truth'],
            3: ['aura of vitality', 'blinding smite', 'create food and water', 'crusader\'s mantle', 'daylight', 'dispel magic', 'elemental weapon', 'magic circle', 'remove curse', 'revivify'],
            4: ['aura of life', 'aura of purity', 'banishment', 'death ward', 'locate creature', 'staggering smite'],
            5: ['banishing smite', 'circle of power', 'destructive wave', 'dispel evil and good', 'geas', 'raise dead']
        },
        'Ranger': {
            1: ['alarm', 'animal friendship', 'cure wounds', 'detect magic', 'detect poison and disease', 'fog cloud', 'goodberry', 'hunter\'s mark', 'jump', 'longstrider', 'speak with animals'],
            2: ['animal messenger', 'barkskin', 'darkvision', 'find traps', 'lesser restoration', 'locate animals or plants', 'locate object', 'pass without trace', 'protection from poison', 'silence', 'spike growth'],
            3: ['conjure animals', 'daylight', 'nondetection', 'plant growth', 'protection from energy', 'speak with plants', 'water breathing', 'water walk', 'wind wall'],
            4: ['conjure woodland beings', 'freedom of movement', 'locate creature', 'stoneskin'],
            5: ['commune with nature', 'conjure volley', 'swift quiver', 'tree stride']
        },
        'Artificer': {
            1: ['alarm', 'cure wounds', 'detect magic', 'disguise self', 'expeditious retreat', 'faerie fire', 'false life', 'feather fall', 'grease', 'identify', 'jump', 'longstrider', 'purify food and drink', 'sanctuary', 'shield of faith'],
            2: ['aid', 'alter self', 'arcane lock', 'blur', 'continual flame', 'darkvision', 'enhance ability', 'enlarge/reduce', 'heat metal', 'invisibility', 'lesser restoration', 'levitate', 'magic mouth', 'magic weapon', 'protection from poison', 'rope trick', 'see invisibility', 'spider climb'],
            3: ['blink', 'catnap', 'create food and water', 'dispel magic', 'elemental weapon', 'flame arrows', 'fly', 'glyph of warding', 'haste', 'protection from energy', 'revivify', 'tiny servant', 'water breathing', 'water walk'],
            4: ['arcane eye', 'elemental bane', 'fabricate', 'freedom of movement', 'leomund\'s secret chest', 'mordenkainen\'s faithful hound', 'mordenkainen\'s private sanctum', 'otiluke\'s resilient sphere', 'stone shape', 'stoneskin'],
            5: ['animate objects', 'bigby\'s hand', 'creation', 'greater restoration', 'skill empowerment', 'transmute rock', 'wall of stone']
        }
    };

    /**
     * Predefined cantrips by class
     */
    private static cantrips: Record<string, string[]> = {
        'Wizard': ['acid splash', 'chill touch', 'dancing lights', 'fire bolt', 'light', 'mage hand', 'mending', 'message', 'minor illusion', 'prestidigitation', 'ray of frost', 'shocking grasp'],
        'Chronurgy Wizard': ['acid splash', 'chill touch', 'dancing lights', 'fire bolt', 'light', 'mage hand', 'mending', 'message', 'minor illusion', 'prestidigitation', 'ray of frost', 'shocking grasp'],
        'Graviturgy Wizard': ['acid splash', 'chill touch', 'dancing lights', 'fire bolt', 'light', 'mage hand', 'mending', 'message', 'minor illusion', 'prestidigitation', 'ray of frost', 'shocking grasp'],
        'Sorcerer': ['acid splash', 'chill touch', 'dancing lights', 'fire bolt', 'light', 'mage hand', 'mending', 'message', 'minor illusion', 'prestidigitation', 'ray of frost', 'shocking grasp', 'true strike'],
        'Cleric': ['guidance', 'light', 'mending', 'resistance', 'sacred flame', 'spare the dying', 'thaumaturgy', 'word of radiance'],
        'Druid': ['druidcraft', 'guidance', 'mending', 'poison spray', 'produce flame', 'resistance', 'shillelagh', 'thorn whip'],
        'Circle of Stars Druid': ['druidcraft', 'guidance', 'mending', 'poison spray', 'produce flame', 'resistance', 'shillelagh', 'thorn whip'],
        'Bard': ['dancing lights', 'light', 'mage hand', 'mending', 'message', 'minor illusion', 'prestidigitation', 'true strike', 'vicious mockery'],
        'College of Eloquence Bard': ['dancing lights', 'light', 'mage hand', 'mending', 'message', 'minor illusion', 'prestidigitation', 'true strike', 'vicious mockery'],
        'Warlock': ['chill touch', 'eldritch blast', 'mage hand', 'minor illusion', 'poison spray', 'prestidigitation', 'true strike'],
        'Artificer': ['acid splash', 'fire bolt', 'guidance', 'light', 'mage hand', 'mending', 'message', 'prestidigitation', 'ray of frost', 'resistance', 'shocking grasp', 'spare the dying', 'thorn whip'],
        'Ranger': ['druidcraft', 'guidance', 'mending', 'produce flame', 'resistance', 'shillelagh'],
        'Paladin': ['light', 'sacred flame', 'spare the dying', 'thaumaturgy']
    };

    /**
     * Determine if a class is a spellcaster
     * @param characterClass Character's class
     * @returns boolean
     */
    static isSpellcaster(characterClass: CharacterClass): boolean {
        return characterClass.name in this.spellcastingAbilities || 
               characterClass.name.includes('Wizard') || 
               characterClass.name.includes('Druid') || 
               characterClass.name.includes('Bard');
    }

    /**
     * Generate spellcasting information
     * @param characterClass Character's class
     * @param abilityModifiers Ability modifiers
     * @param level Character level
     * @returns Spellcasting object or null
     */
    static generateSpellcasting(
        characterClass: CharacterClass, 
        abilityModifiers: Partial<Record<AbilityName, number>>, 
        level: number
    ): Spellcasting | null {
        // Get the class's spellcasting ability
        let spellcastingAbility = this.spellcastingAbilities[characterClass.name];
        
        // Handle subclasses that inherit from parent class
        if (!spellcastingAbility) {
            if (characterClass.name.includes('Wizard')) {
                spellcastingAbility = 'int';
            } else if (characterClass.name.includes('Druid')) {
                spellcastingAbility = 'wis';
            } else if (characterClass.name.includes('Bard')) {
                spellcastingAbility = 'cha';
            } else {
                return null; // Not a spellcaster
            }
        }

        // Get ability modifier
        const modifier = abilityModifiers[spellcastingAbility] || 0;

        // Calculate spellcasting parameters
        const proficiencyBonus = Math.ceil(level / 4) + 1;
        const saveDC = 8 + proficiencyBonus + modifier;
        const attackBonus = proficiencyBonus + modifier;
        
        // Determine cantrips known based on class and level
        let cantripsKnown = 0;
        
        // Cantrips known varies by class
        switch (characterClass.name) {
            case 'Wizard':
            case 'Chronurgy Wizard':
            case 'Graviturgy Wizard':
                cantripsKnown = level < 4 ? 3 : level < 10 ? 4 : 5;
                break;
            case 'Cleric':
                cantripsKnown = level < 4 ? 3 : level < 10 ? 4 : 5;
                break;
            case 'Druid':
            case 'Circle of Stars Druid':
                cantripsKnown = level < 4 ? 2 : level < 10 ? 3 : 4;
                break;
            case 'Bard':
            case 'College of Eloquence Bard':
                cantripsKnown = level < 4 ? 2 : level < 10 ? 3 : 4;
                break;
            case 'Sorcerer':
                cantripsKnown = level < 4 ? 4 : level < 10 ? 5 : 6;
                break;
            case 'Warlock':
                cantripsKnown = level < 4 ? 2 : level < 10 ? 3 : 4;
                break;
            case 'Artificer':
                cantripsKnown = level < 10 ? 2 : 3;
                break;
            default:
                cantripsKnown = 2; // Default for other classes that might have cantrips
        }
        
        // Spell slots
        const slots: Record<number, number> = {};
        
        // Different slot progression for different classes
        if (['Wizard', 'Chronurgy Wizard', 'Graviturgy Wizard', 'Cleric', 'Druid', 'Circle of Stars Druid', 'Bard', 'College of Eloquence Bard', 'Sorcerer'].includes(characterClass.name)) {
            // Full spellcasters
            this.calculateFullCasterSlots(level, slots);
        } else if (['Paladin', 'Ranger'].includes(characterClass.name)) {
            // Half spellcasters
            this.calculateHalfCasterSlots(level, slots);
        } else if (['Artificer'].includes(characterClass.name)) {
            // Artificers round up when determining spellcaster level
            this.calculateHalfCasterSlots(Math.ceil(level / 2) * 2, slots);
        } else if (['Warlock'].includes(characterClass.name)) {
            // Warlocks have a unique slot progression (all slots are of highest level)
            this.calculateWarlockSlots(level, slots);
        }
        
        return {
            ability: spellcastingAbility.toUpperCase(),
            saveDC,
            attackBonus,
            cantripsKnown,
            slots
        };
    }

    /**
     * Calculate spell slots for full casters
     * @param level Character level
     * @param slots Slots object to populate
     */
    private static calculateFullCasterSlots(level: number, slots: Record<number, number>): void {
        // Full caster slot progression (wizard, cleric, druid, bard, sorcerer)
        if (level >= 1) {
            slots[1] = level === 1 ? 2 : level === 2 ? 3 : 4;
        }
        if (level >= 3) {
            slots[2] = level === 3 ? 2 : 3;
        }
        if (level >= 5) {
            slots[3] = level === 5 ? 2 : 3;
        }
        if (level >= 7) {
            slots[4] = level === 7 ? 1 : level <= 8 ? 2 : 3;
        }
        if (level >= 9) {
            slots[5] = level === 9 ? 1 : level <= 17 ? 2 : 3;
        }
        if (level >= 11) {
            slots[6] = level <= 18 ? 1 : 2;
        }
        if (level >= 13) {
            slots[7] = level <= 19 ? 1 : 2;
        }
        if (level >= 15) {
            slots[8] = 1;
        }
        if (level >= 17) {
            slots[9] = 1;
        }
    }

    /**
     * Calculate spell slots for half casters
     * @param level Character level
     * @param slots Slots object to populate
     */
    private static calculateHalfCasterSlots(level: number, slots: Record<number, number>): void {
        // Half caster slot progression (paladin, ranger)
        // Half casters get spell slots at level 2
        if (level >= 2) {
            slots[1] = level === 2 ? 2 : 3;
        }
        if (level >= 5) {
            slots[2] = level <= 6 ? 2 : 3;
        }
        if (level >= 9) {
            slots[3] = level <= 10 ? 2 : 3;
        }
        if (level >= 13) {
            slots[4] = level <= 14 ? 1 : level <= 16 ? 2 : 3;
        }
        if (level >= 17) {
            slots[5] = level <= 18 ? 1 : 2;
        }
    }

    /**
     * Calculate spell slots for warlocks
     * @param level Character level
     * @param slots Slots object to populate
     */
    private static calculateWarlockSlots(level: number, slots: Record<number, number>): void {
        // Warlocks have a unique slot progression
        const slotLevel = level <= 2 ? 1 : level <= 4 ? 2 : level <= 6 ? 3 : level <= 8 ? 4 : 5;
        const numSlots = level === 1 ? 1 : level <= 2 ? 2 : level <= 10 ? 2 : level <= 16 ? 3 : 4;
        
        slots[slotLevel] = numSlots;
    }

    /**
     * Get spells for a given class and spell level
     * @param className Class name
     * @param spellLevel Spell level
     * @returns Array of spell names
     */
    static getSpellsByClassAndLevel(className: string, spellLevel: number): string[] {
        // Handle subclasses
        let baseClass = className;
        if (className.includes('Wizard')) {
            baseClass = 'Wizard';
        } else if (className.includes('Druid')) {
            baseClass = 'Druid';
        } else if (className.includes('Bard')) {
            baseClass = 'Bard';
        }
        
        return this.spellsByClassAndLevel[baseClass]?.[spellLevel] || [];
    }

    /**
     * Get cantrips for a given class
     * @param className Class name
     * @returns Array of cantrip names
     */
    static getCantrips(className: string): string[] {
        return this.cantrips[className] || [];
    }
}