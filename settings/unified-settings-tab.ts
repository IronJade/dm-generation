import { App, PluginSettingTab, Setting } from 'obsidian';
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

        new Setting(generalSection)
            .setName('About')
            .setDesc('This plugin provides tools for generating NPCs, dungeons, and random content for tabletop RPGs. Use the tabs above to configure each generator.');
    }
}