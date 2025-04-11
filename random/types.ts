/**
 * Types for Random Generator Plugin
 */

export interface GeneratorField {
    [fieldName: string]: string[];
}

export interface Generator {
    name: string;
    description: string;
    format: string;
    fields: GeneratorField;
}

export interface RandomGeneratorSettings {
    generators: Generator[];
    customCSSEnabled: boolean;
    customCSSPath: string;
}