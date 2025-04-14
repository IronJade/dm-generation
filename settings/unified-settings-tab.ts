import { App, PluginSettingTab, Setting, Notice } from 'obsidian';
import UnifiedGeneratorPlugin from '../main';
import { NPCGeneratorSettingTab } from '../npc/ui/settings-tab';
import { DungeonGeneratorSettingTab } from '../dungeon/settings/settingsTab';
import { RandomGeneratorSettingTab } from '../random/settings-tab';

export class UnifiedSettingsTab extends PluginSettingTab {
    plugin: UnifiedGeneratorPlugin;
    private activeTab: string = 'general';
    
    // Settings tab instances
    private npcSettingsTab: NPCGeneratorSettingTab;
    private dungeonSettingsTab: DungeonGeneratorSettingTab;
    private randomSettingsTab: RandomGeneratorSettingTab;

    constructor(app: App, plugin: UnifiedGeneratorPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;
        containerEl.empty();

        // Title
        containerEl.createEl('h1', { text: 'Unified Generator Settings' });

        // Create navigation tabs
        const navContainer = containerEl.createDiv('nav-container');
        navContainer.style.display = 'flex';
        navContainer.style.marginBottom = '20px';
        navContainer.style.borderBottom = '1px solid var(--background-modifier-border)';

        const createTab = (id: string, label: string) => {
            const tab = navContainer.createEl('button', { text: label });
            tab.style.padding = '8px 16px';
            tab.style.border = 'none';
            tab.style.background = 'none';
            tab.style.cursor = 'pointer';
            tab.style.borderRadius = '4px 4px 0 0';
            tab.style.marginRight = '4px';

            if (id === this.activeTab) {
                tab.style.borderBottom = '2px solid var(--interactive-accent)';
                tab.style.fontWeight = 'bold';
                tab.style.color = 'var(--interactive-accent)';
            }

            tab.addEventListener('click', () => {
                this.activeTab = id;
                this.display();
            });

            return tab;
        };

        // Create main tabs
        createTab('general', 'General');
        createTab('npc', 'NPC Generator');
        createTab('dungeon', 'Dungeon Generator');
        createTab('random', 'Random Generator');
        createTab('export', 'Export/Import');

        // Content container
        const contentContainer = containerEl.createDiv('content-container');
        contentContainer.style.maxHeight = '500px';
        contentContainer.style.overflowY = 'auto';
        contentContainer.style.padding = '10px';
        contentContainer.style.border = '1px solid var(--background-modifier-border)';
        contentContainer.style.borderRadius = '4px';

        // Initialize the settings tabs if they haven't been yet
        if (!this.npcSettingsTab) {
            this.npcSettingsTab = new NPCGeneratorSettingTab(this.app, this.plugin);
        }
        if (!this.dungeonSettingsTab) {
            this.dungeonSettingsTab = new DungeonGeneratorSettingTab(this.app, this.plugin);
        }
        if (!this.randomSettingsTab) {
            this.randomSettingsTab = new RandomGeneratorSettingTab(this.app, this.plugin);
        }

        // Display the active tab content
        switch (this.activeTab) {
            case 'general':
                this.displayGeneralSettings(contentContainer);
                break;
            case 'npc':
                // Using the containerEl trick to render in our container
                this.npcSettingsTab.containerEl = contentContainer;
                this.npcSettingsTab.display();
                break;
            case 'dungeon':
                this.dungeonSettingsTab.containerEl = contentContainer;
                this.dungeonSettingsTab.display();
                break;
            case 'random':
                this.randomSettingsTab.containerEl = contentContainer;
                this.randomSettingsTab.display();
                break;
            case 'export':
                this.displayExportImportSettings(contentContainer);
                break;
        }
    }

    /**
     * Display General Settings Tab
     */
    private displayGeneralSettings(containerEl: HTMLElement): void {
        const generalSection = containerEl.createDiv('general-section');

        // Section header with description
        const headerContainer = generalSection.createDiv('section-header');
        headerContainer.createEl('h2', { text: 'General Settings' });
        headerContainer.createEl('p', { 
            text: 'Configure general settings for the Unified Generator plugin.',
            cls: 'setting-item-description' 
        });

        new Setting(generalSection)
            .setName('Generator Plugin')
            .setDesc('This plugin combines the NPC Generator, Dungeon Generator, and Random Generator into a unified interface.')
            .setHeading();

        // Custom Defaults File setting
        new Setting(generalSection)
            .setName('Use Custom Defaults File')
            .setDesc('Use a custom JSON file for restoring default generators instead of the built-in defaults.')
            .addToggle(toggle => {
                toggle.setValue(this.plugin.useCustomDefaults)
                    .onChange(async (value) => {
                        this.plugin.useCustomDefaults = value;
                        await this.plugin.saveSettings();
                    });
            });

        // Custom Defaults File Path
        new Setting(generalSection)
            .setName('Custom Defaults File Path')
            .setDesc('Path to your custom defaults JSON file in the vault (relative to vault root)')
            .addText(text => {
                text.setPlaceholder('path/to/custom-defaults.json')
                    .setValue(this.plugin.customDefaultsPath)
                    .onChange(async (value) => {
                        this.plugin.customDefaultsPath = value;
                        await this.plugin.saveSettings();
                    });
            });

        new Setting(generalSection)
            .setName('About')
            .setDesc('This plugin provides tools for generating NPCs, dungeons, and random content for tabletop RPGs. Use the tabs above to configure each generator.');
    }

    /**
     * Display Export/Import Settings Tab
     */
    private displayExportImportSettings(containerEl: HTMLElement): void {
        const exportSection = containerEl.createDiv('export-import-section');

        // Section header with description
        const headerContainer = exportSection.createDiv('section-header');
        headerContainer.createEl('h2', { text: 'Export/Import Settings' });
        headerContainer.createEl('p', { 
            text: 'Export your current configuration as defaults files or import custom defaults.',
            cls: 'setting-item-description' 
        });

        // EXPORT SECTION
        exportSection.createEl('h3', { text: 'Export Current Settings' });
        
        // Export All Settings
        new Setting(exportSection)
            .setName('Export All Settings')
            .setDesc('Export all current generator settings as a unified defaults file')
            .addButton(button => button
                .setButtonText('Export All')
                .setCta()
                .onClick(async () => {
                    await this.exportAllSettings();
                }));

        // Export NPC Settings
        new Setting(exportSection)
            .setName('Export NPC Settings')
            .setDesc('Export only NPC generator settings as a defaults file')
            .addButton(button => button
                .setButtonText('Export NPC')
                .onClick(async () => {
                    await this.exportNPCSettings();
                }));

        // Export Dungeon Settings
        new Setting(exportSection)
            .setName('Export Dungeon Settings')
            .setDesc('Export only Dungeon generator settings as a defaults file')
            .addButton(button => button
                .setButtonText('Export Dungeon')
                .onClick(async () => {
                    await this.exportDungeonSettings();
                }));

        // Export Random Generator Settings
        new Setting(exportSection)
            .setName('Export Random Generator Settings')
            .setDesc('Export only Random generator settings as a defaults file')
            .addButton(button => button
                .setButtonText('Export Random')
                .onClick(async () => {
                    await this.exportRandomSettings();
                }));

        // IMPORT SECTION
        exportSection.createEl('h3', { text: 'Import Settings' });
        
        // Import Unified Defaults
        new Setting(exportSection)
            .setName('Import Unified Defaults File')
            .setDesc('Import a unified defaults file containing settings for all generators')
            .addText(text => text
                .setPlaceholder('path/to/unified-defaults.json')
                .setValue(''))
            .addButton(button => button
                .setButtonText('Import')
                .onClick(async (evt) => {
                    await this.importUnifiedSettings(evt);
                }));
                
        // Import NPC Defaults
        new Setting(exportSection)
            .setName('Import NPC Defaults')
            .setDesc('Import a defaults file containing only NPC generator settings')
            .addText(text => text
                .setPlaceholder('path/to/npc-defaults.json')
                .setValue(''))
            .addButton(button => button
                .setButtonText('Import')
                .onClick(async (evt) => {
                    await this.importNPCSettings(evt);
                }));
                
        // Import Dungeon Defaults
        new Setting(exportSection)
            .setName('Import Dungeon Defaults')
            .setDesc('Import a defaults file containing only Dungeon generator settings')
            .addText(text => text
                .setPlaceholder('path/to/dungeon-defaults.json')
                .setValue(''))
            .addButton(button => button
                .setButtonText('Import')
                .onClick(async (evt) => {
                    await this.importDungeonSettings(evt);
                }));
                
        // Import Random Defaults
        new Setting(exportSection)
            .setName('Import Random Defaults')
            .setDesc('Import a defaults file containing only Random generator settings')
            .addText(text => text
                .setPlaceholder('path/to/random-defaults.json')
                .setValue(''))
            .addButton(button => button
                .setButtonText('Import')
                .onClick(async (evt) => {
                    await this.importRandomSettings(evt);
                }));
    }

    /**
     * Export all settings as a unified defaults file
     */
    private async exportAllSettings(): Promise<void> {
        try {
            // Create a defaults structure with all settings
            const unifiedDefaults = {
                npc: {
                    races: this.plugin.npcSettings.races,
                    classes: this.plugin.npcSettings.classes
                },
                dungeon: {
                    dungeonTypes: this.plugin.dungeonSettings.dungeonTypes,
                    defaultDungeonType: this.plugin.dungeonSettings.defaultDungeonType,
                    mapStyle: this.plugin.dungeonSettings.mapStyle
                },
                random: {
                    generators: this.plugin.randomSettings.generators
                }
            };
            
            // Create the export data and filename
            const exportData = JSON.stringify(unifiedDefaults, null, 2);
            const date = new Date();
            const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
            const exportPath = `unified-defaults-${dateStr}.json`;
            
            // Write to file
            const adapter = this.plugin.app.vault.adapter;
            await adapter.write(exportPath, exportData);
            
            new Notice(`Unified defaults exported to ${exportPath}`);
        } catch (error) {
            console.error('Failed to export unified defaults:', error);
            new Notice(`Failed to export unified defaults: ${error.message}`);
        }
    }

    /**
     * Export only NPC settings
     */
    private async exportNPCSettings(): Promise<void> {
        try {
            // Create a defaults structure with NPC settings
            const npcDefaults = {
                races: this.plugin.npcSettings.races,
                classes: this.plugin.npcSettings.classes
            };
            
            // Create the export data and filename
            const exportData = JSON.stringify(npcDefaults, null, 2);
            const date = new Date();
            const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
            const exportPath = `npc-defaults-${dateStr}.json`;
            
            // Write to file
            const adapter = this.plugin.app.vault.adapter;
            await adapter.write(exportPath, exportData);
            
            new Notice(`NPC defaults exported to ${exportPath}`);
        } catch (error) {
            console.error('Failed to export NPC defaults:', error);
            new Notice(`Failed to export NPC defaults: ${error.message}`);
        }
    }

    /**
     * Export only Dungeon settings
     */
    private async exportDungeonSettings(): Promise<void> {
        try {
            // Create a defaults structure with Dungeon settings
            const dungeonDefaults = {
                dungeonTypes: this.plugin.dungeonSettings.dungeonTypes,
                defaultDungeonType: this.plugin.dungeonSettings.defaultDungeonType,
                mapStyle: this.plugin.dungeonSettings.mapStyle
            };
            
            // Create the export data and filename
            const exportData = JSON.stringify(dungeonDefaults, null, 2);
            const date = new Date();
            const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
            const exportPath = `dungeon-defaults-${dateStr}.json`;
            
            // Write to file
            const adapter = this.plugin.app.vault.adapter;
            await adapter.write(exportPath, exportData);
            
            new Notice(`Dungeon defaults exported to ${exportPath}`);
        } catch (error) {
            console.error('Failed to export Dungeon defaults:', error);
            new Notice(`Failed to export Dungeon defaults: ${error.message}`);
        }
    }

    /**
     * Export only Random Generator settings
     */
    private async exportRandomSettings(): Promise<void> {
        try {
            // Create a defaults structure with Random Generator settings
            const randomDefaults = {
                generators: this.plugin.randomSettings.generators
            };
            
            // Create the export data and filename
            const exportData = JSON.stringify(randomDefaults, null, 2);
            const date = new Date();
            const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
            const exportPath = `random-defaults-${dateStr}.json`;
            
            // Write to file
            const adapter = this.plugin.app.vault.adapter;
            await adapter.write(exportPath, exportData);
            
            new Notice(`Random generator defaults exported to ${exportPath}`);
        } catch (error) {
            console.error('Failed to export Random generator defaults:', error);
            new Notice(`Failed to export Random generator defaults: ${error.message}`);
        }
    }

    /**
     * Import unified settings from a file
     */
    private async importUnifiedSettings(evt: MouseEvent): Promise<void> {
        try {
            // Find the input element for the file path
            const settingItem = (evt.target as HTMLElement).closest('.setting-item');
            if (!settingItem) return;
            
            const importPathEl = settingItem.querySelector('input');
            if (!importPathEl) return;
            
            const importPath = importPathEl.value.trim();
            
            if (!importPath) {
                new Notice('Please enter a file path');
                return;
            }
            
            // Read the file
            const adapter = this.plugin.app.vault.adapter;
            
            const fileExists = await adapter.exists(importPath);
            if (!fileExists) {
                new Notice(`File not found: ${importPath}`);
                return;
            }
            
            const importData = await adapter.read(importPath);
            
            try {
                const importedDefaults = JSON.parse(importData);
                
                // Validate structure
                if (!importedDefaults || typeof importedDefaults !== 'object') {
                    new Notice('Invalid import file format');
                    return;
                }
                
                // Import NPC settings if available
                if (importedDefaults.npc) {
                    if (importedDefaults.npc.races && Array.isArray(importedDefaults.npc.races)) {
                        this.plugin.npcSettings.races = importedDefaults.npc.races;
                    }
                    
                    if (importedDefaults.npc.classes && Array.isArray(importedDefaults.npc.classes)) {
                        this.plugin.npcSettings.classes = importedDefaults.npc.classes;
                    }
                }
                
                // Import Dungeon settings if available
                if (importedDefaults.dungeon) {
                    if (importedDefaults.dungeon.dungeonTypes) {
                        this.plugin.dungeonSettings.dungeonTypes = importedDefaults.dungeon.dungeonTypes;
                    }
                    
                    if (importedDefaults.dungeon.defaultDungeonType) {
                        this.plugin.dungeonSettings.defaultDungeonType = importedDefaults.dungeon.defaultDungeonType;
                    }
                    
                    if (importedDefaults.dungeon.mapStyle) {
                        this.plugin.dungeonSettings.mapStyle = {
                            ...this.plugin.dungeonSettings.mapStyle,
                            ...importedDefaults.dungeon.mapStyle
                        };
                    }
                }
                
                // Import Random settings if available
                if (importedDefaults.random && importedDefaults.random.generators) {
                    this.plugin.randomSettings.generators = importedDefaults.random.generators;
                }
                
                // Save settings
                await this.plugin.saveSettings();
                
                // Set this imported file as the custom defaults
                this.plugin.customDefaultsPath = importPath;
                this.plugin.useCustomDefaults = true;
                await this.plugin.saveSettings();
                
                new Notice('Unified defaults imported successfully!');
                this.display(); // Refresh display
                
            } catch (jsonError) {
                console.error('Failed to parse import file:', jsonError);
                new Notice('Failed to parse import file: invalid JSON');
            }
            
        } catch (error) {
            console.error('Import error:', error);
            new Notice(`Failed to import unified defaults: ${error.message}`);
        }
    }

    /**
     * Import NPC settings from a file
     */
    private async importNPCSettings(evt: MouseEvent): Promise<void> {
        try {
            // Find the input element for the file path
            const settingItem = (evt.target as HTMLElement).closest('.setting-item');
            if (!settingItem) return;
            
            const importPathEl = settingItem.querySelector('input');
            if (!importPathEl) return;
            
            const importPath = importPathEl.value.trim();
            
            if (!importPath) {
                new Notice('Please enter a file path');
                return;
            }
            
            // Read the file
            const adapter = this.plugin.app.vault.adapter;
            
            const fileExists = await adapter.exists(importPath);
            if (!fileExists) {
                new Notice(`File not found: ${importPath}`);
                return;
            }
            
            const importData = await adapter.read(importPath);
            
            try {
                const importedDefaults = JSON.parse(importData);
                
                // Validate structure
                if (!importedDefaults || typeof importedDefaults !== 'object') {
                    new Notice('Invalid import file format');
                    return;
                }
                
                // Update NPC settings
                if (importedDefaults.races && Array.isArray(importedDefaults.races)) {
                    this.plugin.npcSettings.races = importedDefaults.races;
                }
                
                if (importedDefaults.classes && Array.isArray(importedDefaults.classes)) {
                    this.plugin.npcSettings.classes = importedDefaults.classes;
                }
                
                // Save settings
                await this.plugin.saveSettings();
                
                new Notice('NPC defaults imported successfully!');
                
                // Refresh display in NPC tab
                if (this.npcSettingsTab) {
                    this.activeTab = 'npc';
                    this.display();
                }
                
            } catch (jsonError) {
                console.error('Failed to parse import file:', jsonError);
                new Notice('Failed to parse import file: invalid JSON');
            }
            
        } catch (error) {
            console.error('Import error:', error);
            new Notice(`Failed to import NPC defaults: ${error.message}`);
        }
    }

    /**
     * Import Dungeon settings from a file
     */
    private async importDungeonSettings(evt: MouseEvent): Promise<void> {
        try {
            // Find the input element for the file path
            const settingItem = (evt.target as HTMLElement).closest('.setting-item');
            if (!settingItem) return;
            
            const importPathEl = settingItem.querySelector('input');
            if (!importPathEl) return;
            
            const importPath = importPathEl.value.trim();
            
            if (!importPath) {
                new Notice('Please enter a file path');
                return;
            }
            
            // Read the file
            const adapter = this.plugin.app.vault.adapter;
            
            const fileExists = await adapter.exists(importPath);
            if (!fileExists) {
                new Notice(`File not found: ${importPath}`);
                return;
            }
            
            const importData = await adapter.read(importPath);
            
            try {
                const importedDefaults = JSON.parse(importData);
                
                // Validate structure
                if (!importedDefaults || typeof importedDefaults !== 'object') {
                    new Notice('Invalid import file format');
                    return;
                }
                
                // Update Dungeon settings
                if (importedDefaults.dungeonTypes) {
                    this.plugin.dungeonSettings.dungeonTypes = importedDefaults.dungeonTypes;
                }
                
                if (importedDefaults.defaultDungeonType) {
                    this.plugin.dungeonSettings.defaultDungeonType = importedDefaults.defaultDungeonType;
                }
                
                if (importedDefaults.mapStyle) {
                    this.plugin.dungeonSettings.mapStyle = {
                        ...this.plugin.dungeonSettings.mapStyle,
                        ...importedDefaults.mapStyle
                    };
                }
                
                // Save settings
                await this.plugin.saveSettings();
                
                new Notice('Dungeon defaults imported successfully!');
                
                // Refresh display in Dungeon tab
                if (this.dungeonSettingsTab) {
                    this.activeTab = 'dungeon';
                    this.display();
                }
                
            } catch (jsonError) {
                console.error('Failed to parse import file:', jsonError);
                new Notice('Failed to parse import file: invalid JSON');
            }
            
        } catch (error) {
            console.error('Import error:', error);
            new Notice(`Failed to import Dungeon defaults: ${error.message}`);
        }
    }

    /**
     * Import Random Generator settings from a file
     */
    private async importRandomSettings(evt: MouseEvent): Promise<void> {
        try {
            // Find the input element for the file path
            const settingItem = (evt.target as HTMLElement).closest('.setting-item');
            if (!settingItem) return;
            
            const importPathEl = settingItem.querySelector('input');
            if (!importPathEl) return;
            
            const importPath = importPathEl.value.trim();
            
            if (!importPath) {
                new Notice('Please enter a file path');
                return;
            }
            
            // Read the file
            const adapter = this.plugin.app.vault.adapter;
            
            const fileExists = await adapter.exists(importPath);
            if (!fileExists) {
                new Notice(`File not found: ${importPath}`);
                return;
            }
            
            const importData = await adapter.read(importPath);
            
            try {
                const importedDefaults = JSON.parse(importData);
                
                // Validate structure
                if (!importedDefaults || typeof importedDefaults !== 'object') {
                    new Notice('Invalid import file format');
                    return;
                }
                
                // Update Random settings
                if (importedDefaults.generators && Array.isArray(importedDefaults.generators)) {
                    this.plugin.randomSettings.generators = importedDefaults.generators;
                }
                
                // Save settings
                await this.plugin.saveSettings();
                
                new Notice('Random generator defaults imported successfully!');
                
                // Refresh display in Random tab
                if (this.randomSettingsTab) {
                    this.activeTab = 'random';
                    this.display();
                }
                
            } catch (jsonError) {
                console.error('Failed to parse import file:', jsonError);
                new Notice('Failed to parse import file: invalid JSON');
            }
            
        } catch (error) {
            console.error('Import error:', error);
            new Notice(`Failed to import Random generator defaults: ${error.message}`);
        }
    }
}