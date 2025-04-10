import { Plugin, Notice } from 'obsidian';
import { RandomGeneratorSettings } from './types';
import { DEFAULT_SETTINGS } from './constants';
import { GeneratorModal } from './generator-modal';
import { RandomGeneratorSettingTab } from './settings-tab';
import { CSSLoader } from './utils/css-loader';
import { generateFromTemplate } from './utils/generator';

/**
 * Main plugin class
 */
export class RandomGeneratorPlugin extends Plugin {
    public settings: RandomGeneratorSettings;
    private cssLoader: CSSLoader;

    async onload(): Promise<void> {
        // Initialize CSS loader
        this.cssLoader = new CSSLoader(this.app);

        // Load settings first
        await this.loadSettings();

        // Add a ribbon icon for the generator
        this.addRibbonIcon('dice', 'Random Generator', () => {
            new GeneratorModal(this.app, this).open();
        });

        // Add a command to open the generator
        this.addCommand({
            id: 'open-random-generator',
            name: 'Open Random Generator',
            callback: () => {
                new GeneratorModal(this.app, this).open();
            }
        });

        // Add a command to insert a random generation at cursor position
        this.addCommand({
            id: 'insert-random-generation',
            name: 'Insert Random Generation',
            editorCallback: (editor) => {
                if (!this.settings.generators || this.settings.generators.length === 0) {
                    new Notice('No generators available');
                    return;
                }

                // Use the first generator by default
                const generator = this.settings.generators[0];
                const result = generateFromTemplate(generator);
                editor.replaceSelection(result);
            }
        });

        // Add settings tab
        this.addSettingTab(new RandomGeneratorSettingTab(this.app, this));

        // Add CSS - defer to avoid blocking plugin load
        setTimeout(() => {
            this.loadCSS();
        }, 0);
    }

    onunload(): void {
        // Clean up when the plugin is disabled
        this.cssLoader.unload();
    }

    /**
     * Load plugin settings
     */
    async loadSettings(): Promise<void> {
        try {
            const data = await this.loadData();
            this.settings = Object.assign({}, DEFAULT_SETTINGS, data);
            
            // Ensure generators is an array
            if (!Array.isArray(this.settings.generators)) {
                this.settings.generators = DEFAULT_SETTINGS.generators;
            }
            
            // Initialize custom CSS settings if they don't exist
            if (this.settings.customCSSEnabled === undefined) {
                this.settings.customCSSEnabled = false;
                this.settings.customCSSPath = '';
            }
        } catch (error) {
            console.error('Failed to load settings:', error);
            this.settings = Object.assign({}, DEFAULT_SETTINGS);
        }
    }

    /**
     * Save plugin settings
     */
    async saveSettings(): Promise<void> {
        try {
            await this.saveData(this.settings);
        } catch (error) {
            console.error('Failed to save settings:', error);
            new Notice('Failed to save settings');
        }
    }

    /**
     * Load CSS - either default or custom
     */
    loadCSS(): void {
        try {
            this.cssLoader.loadCSS(this.settings.customCSSEnabled, this.settings.customCSSPath);
        } catch (error) {
            console.error('Error in loadCSS:', error);
        }
    }
    
    /**
     * Get a copy of the default settings
     */
    getDefaultSettings(): RandomGeneratorSettings {
        return JSON.parse(JSON.stringify(DEFAULT_SETTINGS));
    }
}