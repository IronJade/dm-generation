import { Plugin, MarkdownView } from 'obsidian';
import { DungeonGeneratorSettings } from './settings/settings';
import { DEFAULT_SETTINGS } from './settings/defaults';
import { DungeonGeneratorSettingTab } from './settings/settingsTab';
import { DungeonGeneratorModal } from './ui/modal';
import { DungeonGenerator } from './generator/generator';
import { DungeonOptions, GeneratedDungeon } from './types';

export default class DungeonGeneratorPlugin extends Plugin {
    settings: DungeonGeneratorSettings;
    dungeonGenerator: DungeonGenerator;

    async onload() {
        await this.loadSettings();
        
        // Initialize the dungeon generator
        this.dungeonGenerator = new DungeonGenerator(this.settings);

        // Add ribbon icon
        this.addRibbonIcon('dice', 'Generate Dungeon', () => {
            new DungeonGeneratorModal(this.app, this).open();
        });

        // Add command to generate dungeon
        this.addCommand({
            id: 'generate-dungeon',
            name: 'Generate Dungeon Map',
            editorCallback: (editor, view) => {
                new DungeonGeneratorModal(this.app, this).open();
            }
        });

        // Add settings tab
        this.addSettingTab(new DungeonGeneratorSettingTab(this.app, this));
    }

    onunload() {
        // Cleanup when plugin is disabled
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }

    generateDungeon(options: DungeonOptions): GeneratedDungeon {
        return this.dungeonGenerator.generateDungeon(options);
    }
}

// Export additional types used by external files
export { DungeonGeneratorPlugin }