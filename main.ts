import { Plugin, Notice } from 'obsidian';
import { UnifiedSettingsTab } from './settings/unified-settings-tab';
import { UnifiedGeneratorModal } from './ui/unified-generator-modal';

// Import NPC generator related code
import { NPCGeneratorSettings } from './npc/types';
import { defaultRaces, defaultClasses } from './npc/data/defaults';
import { NPCGenerator } from './npc/generator';

// Import Dungeon generator related code
import { DungeonGeneratorSettings } from './dungeon/settings/settings';
import { DEFAULT_SETTINGS as DEFAULT_DUNGEON_SETTINGS } from './dungeon/settings/defaults';
import { DungeonGenerator } from './dungeon/generator/generator';

// Import Random generator related code
import { RandomGeneratorSettings } from './random/types';
import { DEFAULT_SETTINGS as DEFAULT_RANDOM_SETTINGS } from './random/constants';
import { CSSLoader } from './utils/css-loader';

// Default NPC settings
const DEFAULT_NPC_SETTINGS: NPCGeneratorSettings = {
    races: defaultRaces,
    classes: defaultClasses,
    customParameters: [],
    statblockFormat: "fantasyStatblock"
};

export default class UnifiedGeneratorPlugin extends Plugin {
    // Settings for each generator
    public npcSettings: NPCGeneratorSettings;
    public dungeonSettings: DungeonGeneratorSettings;
    public randomSettings: RandomGeneratorSettings;
    
    // Generator instances
    public npcGenerator: NPCGenerator;
    public dungeonGenerator: DungeonGenerator;
    private cssLoader: CSSLoader;

    async onload(): Promise<void> {
        // Initialize CSS loader
        this.cssLoader = new CSSLoader(this.app);

        // Load all settings
        await this.loadSettings();
        
        // Initialize generators
        this.npcGenerator = new NPCGenerator(this);
        this.dungeonGenerator = new DungeonGenerator(this.dungeonSettings);

        // Add a ribbon icon for the unified generator
        this.addRibbonIcon('dice', 'Unified Generator', () => {
            new UnifiedGeneratorModal(this.app, this).open();
        });

        // Add a command to open the unified generator
        this.addCommand({
            id: 'open-unified-generator',
            name: 'Open Unified Generator',
            callback: () => {
                new UnifiedGeneratorModal(this.app, this).open();
            }
        });

        // Add specialized commands for each generator
        this.addCommand({
            id: 'generate-npc',
            name: 'Generate NPC',
            callback: () => {
                const modal = new UnifiedGeneratorModal(this.app, this, 'npc');
                modal.open();
            }
        });

        this.addCommand({
            id: 'generate-dungeon',
            name: 'Generate Dungeon Map',
            callback: () => {
                const modal = new UnifiedGeneratorModal(this.app, this, 'dungeon');
                modal.open();
            }
        });

        this.addCommand({
            id: 'generate-random',
            name: 'Generate Random Content',
            callback: () => {
                const modal = new UnifiedGeneratorModal(this.app, this, 'random');
                modal.open();
            }
        });

        // Add settings tab
        this.addSettingTab(new UnifiedSettingsTab(this.app, this));

        // Add CSS with a delay to avoid blocking plugin load
        setTimeout(() => {
            this.loadCSS();
        }, 0);
    }

    onunload(): void {
        // Clean up when the plugin is disabled
        this.cssLoader.unload();
    }

    /**
     * Load all plugin settings
     */
    async loadSettings(): Promise<void> {
        try {
            const data = await this.loadData();
            
            // Load NPC generator settings
            this.npcSettings = Object.assign({}, DEFAULT_NPC_SETTINGS, data?.npcSettings);
            
            // Load dungeon generator settings
            this.dungeonSettings = Object.assign({}, DEFAULT_DUNGEON_SETTINGS, data?.dungeonSettings);
            
            // Load random generator settings
            this.randomSettings = Object.assign({}, DEFAULT_RANDOM_SETTINGS, data?.randomSettings);
            
            // Validate loaded settings
            this.validateSettings();
            
        } catch (error) {
            console.error('Failed to load settings:', error);
            // Initialize with defaults if loading fails
            this.npcSettings = Object.assign({}, DEFAULT_NPC_SETTINGS);
            this.dungeonSettings = Object.assign({}, DEFAULT_DUNGEON_SETTINGS);
            this.randomSettings = Object.assign({}, DEFAULT_RANDOM_SETTINGS);
        }
    }

    /**
     * Save all plugin settings
     */
    async saveSettings(): Promise<void> {
        try {
            await this.saveData({
                npcSettings: this.npcSettings,
                dungeonSettings: this.dungeonSettings,
                randomSettings: this.randomSettings
            });
        } catch (error) {
            console.error('Failed to save settings:', error);
            new Notice('Failed to save settings');
        }
    }

    /**
     * Validate loaded settings
     */
    private validateSettings(): void {
        // Ensure generators array exists for random generator
        if (!Array.isArray(this.randomSettings.generators)) {
            this.randomSettings.generators = DEFAULT_RANDOM_SETTINGS.generators;
        }
        
        // Initialize custom CSS settings if they don't exist
        if (this.randomSettings.customCSSEnabled === undefined) {
            this.randomSettings.customCSSEnabled = false;
            this.randomSettings.customCSSPath = '';
        }
    }

    /**
     * Load CSS - either default or custom
     */
    loadCSS(): void {
        try {
            this.cssLoader.loadCSS(this.randomSettings.customCSSEnabled, this.randomSettings.customCSSPath);
        } catch (error) {
            console.error('Error in loadCSS:', error);
        }
    }
}