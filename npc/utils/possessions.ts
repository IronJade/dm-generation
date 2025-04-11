import { CharacterClass, Possession } from '../types';

export class PossessionsUtils {
    /**
     * Base equipment for different classes
     */
    private static classEquipment: Record<string, string[]> = {
        'Fighter': [
            'Longsword', 
            'Shield', 
            'Chain mail', 
            'Backpack', 
            'Bedroll', 
            'Tinderbox', 
            '10 torches', 
            '10 days of rations', 
            'Waterskin', 
            '50 ft of rope'
        ],
        'Rogue': [
            'Shortsword', 
            'Shortbow with 20 arrows', 
            'Leather armor', 
            'Thieves\' tools', 
            'Backpack', 
            '50 ft of silk rope', 
            'Dark clothes', 
            'Hood', 
            'Belt pouch', 
            '10 days of rations'
        ],
        'Wizard': [
            'Spellbook', 
            'Quarterstaff', 
            'Component pouch', 
            'Scholar\'s pack', 
            'Backpack', 
            'Bottle of ink', 
            'Ink pen', 
            '10 sheets of parchment', 
            'Little bag of sand', 
            'Small knife'
        ],
        'Cleric': [
            'Mace', 
            'Scale mail', 
            'Shield', 
            'Holy symbol', 
            'Priest\'s pack', 
            'Backpack', 
            'Blanket', 
            '10 candles', 
            'Tinderbox', 
            'Alms box'
        ],
        'Barbarian': [
            'Greataxe', 
            'Two handaxes', 
            'Explorer\'s pack', 
            'Four javelins', 
            'Backpack', 
            'Bedroll', 
            'Mess kit', 
            'Tinderbox', 
            '10 days of rations', 
            'Waterskin'
        ]
    };

    /**
     * List of possible special items
     */
    private static specialItems: Possession[] = [
        { name: 'gold pocket watch', desc: 'valued at 10 Golds' },
        { name: 'intricately carved wood pipe' },
        { name: 'pouch half-filled with pipe weed that has a maple honey scent' },
        { name: 'Potion of Greater Healing' },
        { name: '1 Plats, 12 Golds, 17 Lecs, and 5 Silvs in a leather purse' },
        { name: 'mysterious key', desc: 'made of a strange blue metal' },
        { name: 'small trinket', desc: 'from their hometown' }
    ];

    /**
     * Generate possessions for an NPC
     * @param characterClass Character's class
     * @returns Array of possessions
     */
    static generatePossessions(characterClass: CharacterClass): (string | Possession)[] {
        // Start with base class equipment
        const baseEquipment = this.classEquipment[characterClass.name] || 
            this.classEquipment['Fighter'];
        
        // Decide if this NPC should have special items (25% chance)
        if (Math.random() >= 0.75) {
            return this.addSpecialItems(baseEquipment);
        }
        
        return baseEquipment;
    }

    /**
     * Add special items to base equipment
     * @param baseEquipment Base equipment list
     * @returns Enhanced equipment list
     */
    private static addSpecialItems(
        baseEquipment: (string | Possession)[]
    ): (string | Possession)[] {
        // Create a copy of special items to avoid modifying the original
        const availableSpecialItems = [...this.specialItems];
        
        // Determine number of special items (1-3)
        const numSpecialItems = Math.floor(Math.random() * 3) + 1;
        const specialItemsToAdd: Possession[] = [];
        
        for (let i = 0; i < numSpecialItems; i++) {
            // If no more special items, break
            if (availableSpecialItems.length === 0) break;
            
            // Select and remove a random special item
            const randomIndex = Math.floor(Math.random() * availableSpecialItems.length);
            specialItemsToAdd.push(availableSpecialItems.splice(randomIndex, 1)[0]);
        }
        
        // Combine base equipment with special items
        return [...baseEquipment, ...specialItemsToAdd];
    }

    /**
     * Format possessions for display
     * @param possessions List of possessions
     * @returns Formatted possession strings
     */
    static formatPossessions(
        possessions: (string | Possession)[]
    ): string[] {
        return possessions.map(item => {
            if (typeof item === 'string') return item;
            
            // If item is a Possession object
            return item.desc 
                ? `${item.name} (${item.desc})` 
                : item.name;
        });
    }
}
