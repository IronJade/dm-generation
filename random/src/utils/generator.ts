import { Generator } from '../types';

/**
 * Generates random text based on the generator template
 * @param generator The generator configuration
 * @returns The generated text
 */
export function generateFromTemplate(generator: Generator): string {
    if (!generator || !generator.fields || !generator.format) {
        return "Error: Invalid generator format";
    }
    
    try {
        // Select random items from each field
        const selections: Record<string, string> = {};
        
        for (const [fieldName, items] of Object.entries(generator.fields)) {
            if (Array.isArray(items) && items.length > 0) {
                const randomIndex = Math.floor(Math.random() * items.length);
                selections[fieldName] = items[randomIndex];
            } else {
                selections[fieldName] = '[Empty]';
            }
        }
        
        // Format the result using the format string
        let result = generator.format;
        for (const [fieldName, value] of Object.entries(selections)) {
            result = result.replace(`{${fieldName}}`, value);
        }
        
        return result;
    } catch (error) {
        console.error('Error generating from template:', error);
        return "Error generating content";
    }
}

/**
 * Creates a copy of a generator
 * @param generator The generator to copy
 * @param newName Optional new name for the copied generator
 * @returns A deep copy of the generator
 */
export function duplicateGenerator(generator: Generator, newName?: string): Generator {
    const copy: Generator = JSON.parse(JSON.stringify(generator));
    
    if (newName) {
        copy.name = newName;
    } else {
        copy.name = `${generator.name} (Copy)`;
    }
    
    return copy;
}

/**
 * Validates a generator structure
 * @param generator The generator to validate
 * @returns True if the generator is valid, false otherwise
 */
export function validateGenerator(generator: any): boolean {
    if (!generator) return false;
    if (typeof generator.name !== 'string' || !generator.name.trim()) return false;
    if (typeof generator.format !== 'string' || !generator.format.trim()) return false;
    
    if (!generator.fields || typeof generator.fields !== 'object') return false;
    
    // Check that at least one field exists with at least one value
    let hasValidField = false;
    for (const fieldName in generator.fields) {
        const field = generator.fields[fieldName];
        if (Array.isArray(field) && field.length > 0) {
            hasValidField = true;
            break;
        }
    }
    
    return hasValidField;
}